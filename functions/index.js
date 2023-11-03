const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// function to update role
exports.setRole = functions.https.onCall(async (data, context) => {
  return admin.auth().getUserByEmail(data.email).then(async (user) => {
    // deactivated
    const deactivated = data.deactivated;
    // if user is not logged in
    if (!context.auth.uid) {
      return {message: "Not auth data present"};
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
        // users with same business_id exist, so user can't be adminu
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: false,
          role: data.role,
          account_type: data.account_type,
          deactivated: deactivated === undefined ? false : deactivated,
        }).then(() => {
          return {message: "Role added successfully"};
        }).catch((error) => {
          return error;
        });
      } else {
        // This is the first user with the business_id, so they can be admin
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
          role: data.role,
          account_type: data.account_type,
          deactivated: deactivated === undefined ? false : deactivated,
        }).then(() => {
          return {message: "Role added successfully"};
        }).catch((error) => {
          return error;
        });
      }
    }
    // if user is not a manager throw error
    if (context.auth.token.role !== "Manager") {
      return {message: "Only managers can edit roles"};
    }
    // if user is not a manager throw error
    if (user.customClaims.admin) {
      return {message: "Cannot edit admin"};
    }
    // set token
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      role: data.role,
      account_type: data.account_type,
      deactivated: deactivated === undefined ? false : deactivated,
    }).then(async () => {
      // revoke user id, to force them to sign in again
      await admin.auth().revokeRefreshTokens(user.uid);
      return {message: "Role updated successfully"};
    }).catch((error) => {
      return error;
    });
  }).catch((error) => {
    return error;
  });
});
