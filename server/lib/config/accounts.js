Meteor.startup(function() {

  // Add Facebook configuration entry
  // ServiceConfiguration.configurations.update(
  //   { service: "facebook" },
  //   { $set: {
  //       appId: "1095320987144959",
  //       secret: "7759a2557af11d4586b2cbb949f50782"
  //     }
  //   },
  //   { upsert: true }
  // );
  
  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: "987179303955-c1sukmf6281g67ogomanhrbesskn1v4c.apps.googleusercontent.com",
        client_email: "andresa.garciah621@gmail.com",
        secret: "Owz0lXFf_HLxiNdJRcqcF_08"
      }
    },
    { upsert: true }
  );

});

