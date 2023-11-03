const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

  // function to update role
exports.setRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    // deactivated
    const deactivated = data.deactivated;
    // if user is not logged in
    if (!context.auth.uid) {
      throw new Error("Not auth data present");
    }
    console.log("Auth user claims: ", context.auth.token);
    console.log("Write user claims: ", user.customClaims);
    // if role token has not been set
    if (user.customClaims === undefined) {
      console.log("New User");
      // Check if there are other users with the same business_id
      const usersSnapshot = await admin.firestore().collection("users")
          .where("business_id", "==", data.business_id)
          .get();
      console.log("Snapshot Size: ", usersSnapshot.size);
      if (usersSnapshot.size > 1) {
        // users with same business_id exist, so user can't be admin
        await admin.auth().setCustomUserClaims(user.uid, {
          admin: false,
          role: data.role,
          account_type: data.account_type,
          deactivated: deactivated === undefined ? false : deactivated,
        });
        return {message: "Role added successfully"};
      } else {
        // This is the first user with the business_id, so they can be admin
        await admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
          role: data.role,
          account_type: data.account_type,
          deactivated: deactivated === undefined ? false : deactivated,
        });
        return {message: "Role added successfully"};
      }
    }
    // if user is not a manager throw error
    if (context.auth.token.role !== "Manager") {
      throw new Error("Only managers can edit roles");
    }
    // if user is not a manager throw error
    if (user.customClaims.admin) {
      throw new Error("Cannot edit admin");
    }
    // set token
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      role: data.role,
      account_type: data.account_type,
      deactivated: deactivated === undefined ? false : deactivated,
    });
    // revoke user id, to force them to sign in again
    await admin.auth().revokeRefreshTokens(user.uid);
    return {message: "Role updated successfully"};
  } catch (error) {
    // throw new Error("Failed to set role: " + error.message);
    return error;
  }
});

// function to listen for changes in role
// or listen if user is deactivated
exports.signOutUserOnRoleChange = functions.firestore
    .document("users/{userId}").onUpdate((change, context) => {
      const data = change.after.data();
      const previousData = change.before.data();
      // if role or deactivated changed
      const roleChanged = data.role !== previousData.role;
      const deactivatedChanged = data.deactivated !== previousData.deactivated;

      if (roleChanged || deactivatedChanged) {
        const userId = context.params.userId;
        // Find the user by their UID
        return admin.auth().getUser(userId)
            .then((user) => {
              // Force the user to sign out
              return admin.auth().revokeRefreshTokens(userId);
            })
            .catch((error) => {
              console.error("Error fetching user:", error);
            });
      }
      return null;
    });
