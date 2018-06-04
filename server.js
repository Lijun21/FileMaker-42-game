var express = require('express');
var bodyParser = require('body-parser');

var schoolRoutes = require("./routes/school42");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/school42')(app);


app.listen(8000, () => {
    console.log('server started on port 8000');
})


