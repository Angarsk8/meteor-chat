Meteor.startup(function() {

  // Add Facebook configuration entry
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "934430313311722",
        secret: "56287ecb0c2d8cb54c613460f9a9959f"
      }
    },
    { upsert: true }
  );
  
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

