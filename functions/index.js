const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

// function to update role
exports.setRole = onCall(async (request) => {
  return admin.auth().getUserByEmail(request.data.email).then(async (user) => {
    // if user is not logged in
    if (request.auth.uid === null) {
      throw new Error("No auth data present");
    }
    console.log("Write user claims: ", user.customClaims);
    // if role token has not been set
    if (user.customClaims.role === undefined) {
      console.log("New User");
      // Check if there are other users with the same business_id
      const usersSnapshot = await admin.firestore().collection("users")
          .where("business_id", "==", request.data.business_id)
          .get();
      if (usersSnapshot.size > 1) {
        // users with same business_id exist, so user can't be adminu
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: false,
          role: request.data.role,
          account_type: request.data.account_type,
          deactivated: false,
        });
      } else {
        // This is the first user with the business_id, so they can be admin
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
          role: request.data.role,
          account_type: request.data.account_type,
          deactivated: false,
        });
      }
    }
    console.log("Auth user claims: ", request.auth.token);
    // if user is not a manager throw error
    if (request.auth.token.role !== "Manager") {
      throw new Error("Only managers can edit roles");
    }
    // if user is not a manager throw error
    if (user.customClaims.admin) {
      throw new Error("Cannot edit admin");
    }
    // set token
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      role: request.data.role,
      account_type: request.data.account_type,
      deactivated: false,
    });
  }).then(() => {
    return {
      message: "Role successfully updated",
    };
  }).catch((error) => {
    return error;
  });
});
