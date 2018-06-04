var express = require('express');
var keys = require('./config');

var app = express();

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
      <meta charset="utf-8">
      <title>Fill out this Form</title>
        <style>
            label, input {
                display: block;
            }
        </style>
    </head>
    <body>
        <h1>What's his or her login?</h1>
    
        <form action="/api/login" method="post">
    
            <label for="login">Login</label>
            <input type="text" id="login" name="login" required />
    
            <button>Send</button>
    
        </form>
    </body>
    </html>`)
})

app.listen(8000, () => {
    console.log('server started on port 8000');
})


