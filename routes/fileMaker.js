var request = require('request');
const keys = require('../config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const fmHostURI = keys.fmHostURI;
const fmFileName = keys.fmFileName;
const fmLoginPass = keys.fmLoginPass; //login:password base 64 format
const fmLayoutName = keys.fmLayoutName;

//POST request, to get access token from FM data API
function getToken(){
    var optionsGetToken = {
        url: `${fmHostURI}/fmi/data/v1/databases/${fmFileName}/sessions`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${fmLoginPass}`
        }
    };
    return new Promise((resolve, reject) => {
        request.post(optionsGetToken, (error, response, body) => { 
            if (error || response.statusCode !== 200 || !body){
                console.log("error is : ", error);
                reject(error);
            }else {
                resolve(JSON.parse(body).response.token);
            }
        });
    })
}

    
//POST request, send student_info to FileMake via FM data API
module.exports = async function PostDataToFM(student_info) {
    const token = await getToken();
    var url = `${fmHostURI}/fmi/data/v1/databases/${fmFileName}/layouts/${fmLayoutName}/records/`;
    var optionsPostData = {
      method: 'post',
      body: student_info,
      json: true,
      url: url,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    return new Promise((resolve, reject) => {
        request(optionsPostData, function (err, res, body) {
            if (err) {
              console.error('error posting json: ', err)
              reject(err);
            }else{
                var headers = res.headers;
                var statusCode = res.statusCode;
                console.log('headers: ', headers);
                console.log('statusCode: ', statusCode);
                console.log('body: ', body);
                resolve(statusCode);
            }
          })
    })
}

