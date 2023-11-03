const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// function to set role
exports.setRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    // decativated value
    const deactivated = data.deactivated;
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
    return {message: "Role updated successfully"};
  } catch (error) {
    // throw new Error("Failed to set role: " + error.message);
    return error;
  }
});

