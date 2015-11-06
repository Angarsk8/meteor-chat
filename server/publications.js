Meteor.publish("currentUserData", function() {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            "services": 1
        }
    });
})


// {
//     "_id": "acywZresLdDJ28bBr",
//     "createdAt": ISODate("2015-11-05T23:01:07.257Z"),
//     "services": {
//         "password": {
//             "bcrypt": "$2a$10$WRwXMZT1nJtZQuOKNFRuYu830S3jGCuZXUDk4iZe.1YhsfZzOszVG"
//         },
//         "google": {
//             "accessToken": "ya29.IwKKazsoESQFNFnU5RFGkH8krRQ-vHYnFLvg5ciH4bzdYrAPsC-VssgF9yAjCgoEam0SIg",
//             "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlMzRkYWU0MDkwMmZlNzNhNTlhMTc2NDJjM2U3ODBiNDA0MWRiODUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6Inl6RENpQkN3aDV3UThvUXV3RFJIYUEiLCJhdWQiOiI5ODcxNzkzMDM5NTUtYzFzdWttZjYyODFnNjdvZ29tYW5ocmJlc3NrbjF2NGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcwMTA0Njc4Mzk1NjUxNDg3NjkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiOTg3MTc5MzAzOTU1LWMxc3VrbWY2MjgxZzY3b2dvbWFuaHJiZXNza24xdjRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJhbmRyZXNhLmdhcmNpYWg2MjFAZ21haWwuY29tIiwiaWF0IjoxNDQ2NzY1Mzg2LCJleHAiOjE0NDY3Njg5ODZ9.CD7oRWrEoG9YUBQrU08ruyNvAzqTXQTX0nmvzAXnaV3gEte70JA_IgMgaTcCEvbG0CHpwVwD_ocVbe9x4o3tlPeU8cV8kLfWIFWLOpNfMxf1RB4L2dTntU7snpBAk5tjX2ZeXTc-OypU7AooKUVxunUTtuvlKn8jVY7n-G590MaTNy09HzSM_NVBlWxY-OCxFCMBNCbNQ0wNmEX-J_z-MJTG01jhgDsSG6N4MSJLHr4mdOVbXW_2t0sRvhXSrQMkQHEXFm54Yo3MQCJ0wr_--FCicnbDzqeZXmDAxy7A-Y1Qb7C1BSbAjdasaqdGoAVjnupq-Op61gMu9u_o5V6n8w",
//             "expiresAt": 1446768985669,
//             "scope": ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
//             "id": "117010467839565148769",
//             "email": "andresa.garciah621@gmail.com",
//             "verified_email": true,
//             "name": "Andrés Alejandro García Hurtado",
//             "given_name": "Andrés Alejandro",
//             "family_name": "García Hurtado",
//             "picture": "https://lh4.googleusercontent.com/--d69UIpm_u8/AAAAAAAAAAI/AAAAAAAAACE/2OkU_SdqNEs/photo.jpg",
//             "locale": "en",
//             "gender": "male"
//         },
//         "facebook": {
//             "accessToken": "CAANR3ALkbeoBAPhqc6BqJTxE02fjY0Ib3ibBicD478fUKoCIUtVZCqHllc1pHD8Fh66MM2RZAQsVfF3qcM1Fx9cSmWHvLKC9a05jaC9rwBmNjKnSlLRYtuNmCfExYeTe5K4rZBeEZAx5tyaXfbZC9o4pjoRyURgoHQMZCLh5FQuPDkg5ioP24to9JAL6FcKR3bXdHzo6ikQQZDZD",
//             "expiresAt": 1451932310302,
//             "id": "10207705181768293",
//             "email": "andresa.garciah621@gmail.com",
//             "name": "Andrés Alejandro García",
//             "first_name": "Andrés Alejandro",
//             "last_name": "García",
//             "link": "https://www.facebook.com/app_scoped_user_id/10207705181768293/",
//             "gender": "male",
//             "locale": "es_ES",
//             "age_range": {
//                 "min": 21
//             }
//         },
//         "resume": {
//             "loginTokens": [{
//                 "when": ISODate("2015-11-05T23:24:21.066Z"),
//                 "hashedToken": "NDEw9pfKaDMVTZus6m4FsjCQA1tvzIY04AzF7az46pc="
//             }]
//         }
//     },
//     "username": "agarcia038",
//     "emails": [{
//         "address": "andresa.garciah621@gmail.com",
//         "verified": false
//     }],
//     "profile": {
//         "name": "Andrés Alejandro García Hurtado"
//     }
// }
// } {
//     "_id": "GkhfJwsCccLpzXSid",
//     "createdAt": ISODate("2015-11-05T23:14:23.884Z"),
//     "services": {
//         "google": {
//             "accessToken": "ya29.IwKKazsoESQFNFnU5RFGkH8krRQ-vHYnFLvg5ciH4bzdYrAPsC-VssgF9yAjCgoEam0SIg",
//             "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlMzRkYWU0MDkwMmZlNzNhNTlhMTc2NDJjM2U3ODBiNDA0MWRiODUifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6Inl6RENpQkN3aDV3UThvUXV3RFJIYUEiLCJhdWQiOiI5ODcxNzkzMDM5NTUtYzFzdWttZjYyODFnNjdvZ29tYW5ocmJlc3NrbjF2NGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcwMTA0Njc4Mzk1NjUxNDg3NjkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiOTg3MTc5MzAzOTU1LWMxc3VrbWY2MjgxZzY3b2dvbWFuaHJiZXNza24xdjRjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJhbmRyZXNhLmdhcmNpYWg2MjFAZ21haWwuY29tIiwiaWF0IjoxNDQ2NzY1Mzg2LCJleHAiOjE0NDY3Njg5ODZ9.CD7oRWrEoG9YUBQrU08ruyNvAzqTXQTX0nmvzAXnaV3gEte70JA_IgMgaTcCEvbG0CHpwVwD_ocVbe9x4o3tlPeU8cV8kLfWIFWLOpNfMxf1RB4L2dTntU7snpBAk5tjX2ZeXTc-OypU7AooKUVxunUTtuvlKn8jVY7n-G590MaTNy09HzSM_NVBlWxY-OCxFCMBNCbNQ0wNmEX-J_z-MJTG01jhgDsSG6N4MSJLHr4mdOVbXW_2t0sRvhXSrQMkQHEXFm54Yo3MQCJ0wr_--FCicnbDzqeZXmDAxy7A-Y1Qb7C1BSbAjdasaqdGoAVjnupq-Op61gMu9u_o5V6n8w",
//             "expiresAt": 1446768985669,
//             "scope": ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
//             "id": "117010467839565148769",
//             "email": "andresa.garciah621@gmail.com",
//             "verified_email": true,
//             "name": "Andrés Alejandro García Hurtado",
//             "given_name": "Andrés Alejandro",
//             "family_name": "García Hurtado",
//             "picture": "https://lh4.googleusercontent.com/--d69UIpm_u8/AAAAAAAAAAI/AAAAAAAAACE/2OkU_SdqNEs/photo.jpg",
//             "locale": "en",
//             "gender": "male"
//         },
//         "resume": {
//             "loginTokens": []
//         }
//     },
//     "profile": {
//         "name": "Andrés Alejandro García Hurtado"
//     }
// } {
//     "_id": "GMAzfbXaxgM8Nxiyu",
//     "createdAt": ISODate("2015-11-05T23:18:49.480Z"),
//     "services": {
//         "facebook": {
//             "accessToken": "CAANR3ALkbeoBAPhqc6BqJTxE02fjY0Ib3ibBicD478fUKoCIUtVZCqHllc1pHD8Fh66MM2RZAQsVfF3qcM1Fx9cSmWHvLKC9a05jaC9rwBmNjKnSlLRYtuNmCfExYeTe5K4rZBeEZAx5tyaXfbZC9o4pjoRyURgoHQMZCLh5FQuPDkg5ioP24to9JAL6FcKR3bXdHzo6ikQQZDZD",
//             "expiresAt": 1451932310302,
//             "id": "10207705181768293",
//             "email": "andresa.garciah621@gmail.com",
//             "name": "Andrés Alejandro García",
//             "first_name": "Andrés Alejandro",
//             "last_name": "García",
//             "link": "https://www.facebook.com/app_scoped_user_id/10207705181768293/",
//             "gender": "male",
//             "locale": "es_ES",
//             "age_range": {
//                 "min": 21
//             }
//         },
//         "resume": {
//             "loginTokens": []
//         }
//     },
//     "profile": {
//         "name": "Andrés Alejandro García"
//     }
// }
