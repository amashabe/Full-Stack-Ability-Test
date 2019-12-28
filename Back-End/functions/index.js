const functions = require('firebase-functions');
const app = require('express')();

const { getAllUsers, createUser } = require('./handlers/userhandler')

app.get("/getusers", getAllUsers);
app.post("/newuser", createUser);


exports.api = functions.region("europe-west1").https.onRequest(app);