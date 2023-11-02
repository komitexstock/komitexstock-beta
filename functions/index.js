const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// function to update role
exports.setRole = functions.https.onCall(async (data, context) => {
  return admin.auth().getUserByEmail(data.email).then(async (user) => {
    // if user is not logged in
    if (context.auth.uid === null) {
      throw new Error("Not authorized");
    }
    // if role token has not been set
    if (user.customClaims.role === undefined) {
      // Check if there are other users with the same business_id
      const usersSnapshot = await admin.firestore().collection("users")
          .where("business_id", "==", data.business_id)
          .get();
      if (usersSnapshot.size > 1) {
        // users with same business_id exist, so user can't be adminu
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: false,
          role: data.role,
          account_type: data.account_type,
          deactivated: false,
        });
      } else {
        // This is the first user with the business_id, so they can be admin
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
          role: data.role,
          account_type: data.account_type,
          deactivated: false,
        });
      }
    }
    // if user is not a manager throw error
    if (user.customClaims.role !== "Manager") {
      throw new Error("Not authorized");
    }
    // set token
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: false,
      role: data.role,
      account_type: data.account_type,
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
