const bcrypt = require("bcrypt");

const password = "memememememe";
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
    .then(hash => {
        console.log("Hash generated:", hash);
    })
    .catch(err => {
        console.error("bcrypt error:", err);
    });

