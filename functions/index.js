const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.setRole = functions.https.onCall(async (data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: data.admin,
      role: data.role,
      account_type: data.account_type,
    });
  }).then(() => {
    return {
      message: "Role successfully updated",
    };
  }).catch((error) => {
    return error;
  });
});
