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
        return {message: "Member added successfully"};
      } else {
        // This is the first user with the business_id, so they can be admin
        await admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
          role: data.role,
          account_type: data.account_type,
          deactivated: deactivated === undefined ? false : deactivated,
        });
        return {message: "Admin added successfully"};
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

// create user
exports.createUser = functions.https.onCall(async (data, context) => {
  const {email, password} = data;
  try {
    const userRecord = await admin.auth().createUser({email, password});
    // return user id
    return {uid: userRecord.uid};
  } catch (error) {
    // Handle error
    return error;
  }
});

// create business partnersship
exports.createBusinessPartner = functions.firestore
    .document("businesses/{businessId}")
    .onCreate(async (snap, context) => {
      const businessData = snap.data();
      const businessId = context.params.businessId;

      // account type
      const accountType = businessData.account_type;

      // if user is a logisitcs return from function
      if (accountType === "Logistics") return console.log("Logistics found!");

      // default logistics business id
      const logisticsBusinessId = "hKayAtQjkdIaCK2MpSEi";

      // Add the admin as a business partner
      const partnerData = {
        merchant_business_id: businessId,
        logistics_business_id: logisticsBusinessId,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        edited_at: admin.firestore.FieldValue.serverTimestamp(),
        deactivated: false,
      };

      try {
        // create document in business_partners
        await admin
            .firestore().collection("business_partners").add(partnerData);
        console.log("Partnership created successfully");
      } catch (error) {
        // Handle error
        console.log("Error: ", error.message);
      }
    });

// create waybill activity
exports.createWaybillActivty = functions.firestore
    .document("waybills/{waybillId}")
    .onCreate(async (snap) => {
      const waybillDoc = snap.data();
      const waybillId = snap.id;

      console.log("Waybill Doc:", waybillDoc);

      // recent activity fields
      const recentActivity = {
        merchant_business_id: waybillDoc.merchant_business_id,
        logistics_business_id: waybillDoc.logistics_business_id,
        is_increment: waybillDoc.is_increment,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        edited_at: admin.firestore.FieldValue.serverTimestamp(),
        activity_type: "Waybill",
        waybill_id: waybillId,
      };

      try {
        // create document in recent_activities
        await admin
            .firestore().collection("recent_activities").add(recentActivity);
        console.log("recent activity added successfully");
      } catch (error) {
        // Handle error
        console.log("Error: ", error.message);
      }
    });
