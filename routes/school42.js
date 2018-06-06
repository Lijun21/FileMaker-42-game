var request = require('request');
var keys = require('../config');
var path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => {
        // I should probably use react for fron-end??....
        res.sendFile(path.join('public', 'home.html'));
    });
    
    app.post('/api/login', middleware42, (req, res) => {
        var options = {
            url: `https://api.intra.42.fr/v2/users/${req.body.login}`,
            headers: {
                'Authorization': `Bearer ${res.locals.token}`
            }
        };
        var studentData = request.get(options, function(error, response, body){
            if (!error && response.statusCode == 200){
                var info = JSON.parse(body);
                res.send(`<!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <title>Data you need</title>
                    <style>
                        label, input {
                            display: block;
                        }
                    </style>
                </head>
                <body>
                    <h1>This is ${info.first_name}</h1>
                    <img src = ${info.image_url}>  
                    <ul>
                        <li>Student ID/login: ${info.id}/${info.login}</li>
                        <li>Full Name: ${info.displayname}</li>
                        <li>Phone: ${info.phone}</li>
                        <li>Correction Point: ${info.correction_point}</li>
                    </ul>
                    <a href=${info.url}>More Info</a>
                </body>
                </html>`)
            }else{
                res.send('error');
                console.log(error);
            }
        });
    });
}


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
