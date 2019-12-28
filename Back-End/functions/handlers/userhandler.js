const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true })

const { validateUserData } = require('../handlers/validators');

exports.getAllUsers = ((request, response) => {
    admin.firestore().collection('/user').get()
        .then(data => {
            let users = [];
            data.forEach((doc) => {
                users.push(doc.data())
            });
            return response.json(users)
        })
        .catch(err => console.error(err))
})

exports.createUser = ((request, response) => {
    const newUser = {
        full_names: request.body.full_names,
        email_address: request.body.email_address,
        phone_numbers: request.body.phone_numbers,
        start_date: request.body.start_date,
        end_date: request.body.end_date,
    }

    const {valid, errors} = validateUserData(newUser);

    if (!valid) return response.status(400).json(errors);

    admin.firestore().collection("/user").add(newUser)
        .then(doc => {
            response.json(doc)
            admin.firestore().collection("/user").doc(doc.id).update({
                userId: doc.id
            }).then(() => {
                console.log(doc.id, " updated");
            });
        })
        .catch(err => {
            response.status(500).json({ error: 'something went wrong' });
            console.error(err)
        })
})