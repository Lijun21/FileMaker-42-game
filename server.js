const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const keys = require('./config');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./routes/school42')(app);


app.listen(8000, () => {
    console.log('server started on port 8000');
})


