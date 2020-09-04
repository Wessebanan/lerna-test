const express = require('express')
const jwt = require('jsonwebtoken');
const fs = require('fs')

const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ "message" : "playful secrets"})
})

app.get('/readme', (req, res) => {
    res.json({"message" : "readme"})
})

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    res.send(token);
})

app.listen(port, 
    () => console.log(`Simple Express app listening on port ${port}!`))

function isAuthenticated(req, res, next) {
   
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        console.log(req.headers)
        console.log(token)
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        console.log(privateKey)
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {

            // if there has been an error...
            if (err) {
                console.log(err.Error)
                // shut them out!
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}