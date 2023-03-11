
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// To Parse the data to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// including Routes 
const registeringRoute = require('./main/routes/registering_Rout')
const medicalExaminationRegistraionRoute = require('./main/routes/medicalExaminationRegistration_Rout')
const birthRegistrationRoute = require('./main/routes/birthRegistration_Rout')
const totalyDailyMilkRoute = require('./main/routes/totalDailyMilkProduction_Rout')
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Starting 

app.use('/registering', registeringRoute)
app.use('/medicalExaminationRegistraion', medicalExaminationRegistraionRoute)
app.use('/birthRegistration', birthRegistrationRoute)
app.use('/totalyDailyMilk', totalyDailyMilkRoute)


var server = app.listen(8080, function(){

    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})