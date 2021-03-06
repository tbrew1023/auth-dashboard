const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp()

const db = admin.firestore()

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
        var customClaims = {};

      if((authUser.email === "tbrew@hbrconsulting.com") || (authUser.email === "tbrew1023@gmail.com")) {
        customClaims = {
            customer: true,
            admin: true
        };
      }
      else {
        customClaims = {
            customer: true,
        };
      }

    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }


  }

  return db.collection("roles").doc(user.uid).set({
    email: user.email,
    subscriber: true
  }).catch(error => {
    console.log(error)
  })

});

exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.admin) return


  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

    return db.collection("roles").doc(data.uid).update({
      role: data.role
    })

  } catch (error) {
    console.log(error)
  }

});
