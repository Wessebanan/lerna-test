const express = require('express')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//const bodyParser = require('body-parser');
const querystring = require('querystring');


const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const port = 8080

const http = new XMLHttpRequest();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ "message" : "secret."})
})

app.get('/readme', (req, res) => {
    res.json({"message" : "readme."})
})

app.get('/hello', (req, res) => {
    http.open('GET', 'http://localhost:3000/dev/hello', false);
    http.send();
    res.send(http.responseText);
    
})

app.get('/retrieve', (req, res) => {
    let id = 0;
    if (req.query.id !== undefined) {
        id = req.query.id;
    }
    http.open('GET', 'http://localhost:3000/dev/retrieve?id='+id.toString(), false);
    http.send();
    res.send(http.responseText);
})

app.post('/store', (req, res) => {
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    http.open('POST', 'http://localhost:3000/dev/store', false);
    http.send(JSON.stringify(req.body));    
    res.send(http.responseText);
})


app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256'});
    res.send(token);
})

app.listen(port, 
    () => console.log(`Ready on port ${port}!`))

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