var request = require('request');

//use fake SSL auth to inspect the communications between client and a server.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const host_URI = 'https://e1z4r1p8.42.us.org';
const databaseName = 'FMstudentProfile';
// const login_pw = 'bGlqdW46MTIzNA==';

// var optionsGetToken = {
//     url: `${host_URI}/fmi/data/v1/databases/${databaseName}/sessions`,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${login_pw}`
//     }
// };

// request.post(optionsGetToken, (error, response, body) => { 
//     if (error || response.statusCode !== 200 || !body){
//         console.log('error', error);
//         res.send("something went wrong with you api request");
//     }else {
//         const token = JSON.parse(body).response.token;   
//         console.log(token);
//     }
// });



//I need to us async await to make this two piece connected, also I need a form to trigger this.......
const layoutName = 'studentProfile';
var postData = {
    "fieldData": {
        "id": "66666666",
        "email": "6666lwang@student.42.us.org",
        "login": "6666lwang",
        "first_name": "6666lijun",
        "last_name": "wang",
        "url": "ksdf",
        "phone": "626719858",
        "displayname": "lijun wang66668",
        "image_url": "ssdf",
        "correction_point": "66668",
        "wallet": "66668",
        "projects": "hahhha"
    },
    "portalData": {}
}
  
  var url = `${host_URI}/fmi/data/v1/databases/${databaseName}/layouts/${layoutName}/records/`;
  var optionsPostData = {
    method: 'post',
    body: postData,
    json: true,
    url: url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 542a6651616faa79d42bf0feba54ef5aa7ccd1fd7cd46787df7c`
    }
  }
  request(optionsPostData, function (err, res, body) {
    if (err) {
      console.error('error posting json: ', err)
      throw err
    }
    var headers = res.headers
    var statusCode = res.statusCode
    console.log('headers: ', headers)
    console.log('statusCode: ', statusCode)
    console.log('body: ', body)
  })