var express = require('express'); // import express ; we will use expressjs as our server

// download the crypto modules from npmjs.com
var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

// initialize expressjs
var app = express();

var port = 3000; // runging port

app.use(express.json());

// function that return the base64 ENCODED code
var encryptStringWithRsaPublicKey = (toEncrypt, relativeOrAbsolutePathToPublicKey) => {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    // var encryptedData = publicKey.encrypt( , buffer);
    var encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);
    // console.log(buffer.encode());
    return encrypted.toString("base64");
};

// listen to port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// our get rest api that return the base64 ENCODED code
app.get('/', (req, res) => {
    res.send(encryptStringWithRsaPublicKey("Your initiator password", "./ProductionCertificate.cer")) // server cal
});