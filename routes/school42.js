var request = require('request');
var keys = require('../config');
var path = require('path');
var PostDataToFM = require('./fileMaker');


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send(`<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Fill out this Form</title>
            <style>
                label, input {
                    display: block;
                }
            </style>
        </head>
        <body>
            <h1>Fetch data from 42 public data to FileMaker</h1>
            <h2>Enter the login name to add it's data to import list</h2>
            <form action="/api/login" method="post">
        
                <label for="login">Login</label>
                <input type="text" id="login" name="login" required />
        
                <button>Send</button>
        
            </form>
        </body>
        </html>
        `);
    });
    
    app.post('/api/login', middleware42, (req, res) => {
        var options = {
            url: `https://api.intra.42.fr/v2/users/${req.body.login}`,
            headers: {
                'Authorization': `Bearer ${res.locals.token}`
            }
        };
        //GET request to 42 api, fetch student info data
        var studentData = request.get(options, async function(error, response, body){
            if (!error && response.statusCode == 200){
                var info = JSON.parse(body);
                var student_info = new Object();
                student_info.id = info.id;
                student_info.first_name = info.first_name;
                student_info.last_name = info.last_name;
                student_info.email = info.email;
                student_info.phone = info.phone;
                student_info.image_url = info.image_url;
                
                var postData = {
                    "fieldData": JSON.stringify(student_info),
                    "portalData": {}
                }
                console.log(postData);
                //function to post student info to FileMaker via data API
                const status = await PostDataToFM(postData);
                if (status == 500){
                    res.send(`status code is: ${status}, means: the server is unable to store the representation needed to complete the request.
                    This is what would happen when we use school Mac desktop as a server, Lol...
                    Try another student login who may contain less public student info, 
                    <a href="http://localhost:8000">Add another one</a>`);
                }else{
                    res.send(`<h2>This is The sutdent info has been added to your player table with status code ${status}</h2>
                            <a href="http://localhost:8000">Add another one</a>`)
                }
            }else{
                res.send('error');
                console.log(error);
            }
        });
    });
}

//POST request to 42 api, to generate acess token 
function middleware42 (req, res, next){
    var endpoint = `https://api.intra.42.fr/oauth/token?grant_type=client_credentials&client_id=${keys.clientID42}&client_secret=${keys.clientSecret42}`;
    request.post( endpoint, (error, response, body) => {
        const token = JSON.parse(body).access_token;
            if (error || !token){
                console.log('error', error);
                res.send("There is no certain person, please enter a valid login name");
            }else {
                res.locals.token = token;
                next();
            }
    });
};









