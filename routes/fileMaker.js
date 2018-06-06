var request = require('request');

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

//use fake SSL auth to inspect the communications between client and a server.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const host_URI = 'https://e1z4r1p8.42.us.org';
const databaseName = 'FMstudentProfile';
const login_pw = 'bGlqdW46MTIzNA==';
const layoutName = 'studentProfile';

function getToken(){
    var optionsGetToken = {
        url: `${host_URI}/fmi/data/v1/databases/${databaseName}/sessions`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${login_pw}`
        }
    };

    return new Promise((resolve, reject) => {
        request.post(optionsGetToken, (error, response, body) => { 
            if (error || response.statusCode !== 200 || !body){
                reject(error);
            }else {
                resolve(JSON.parse(body).response.token);
            }
        });
    })
}

async function PostDataToFM() {
    const token = await getToken();
    var url = `${host_URI}/fmi/data/v1/databases/${databaseName}/layouts/${layoutName}/records/`;
    var optionsPostData = {
      method: 'post',
      body: postData,
      json: true,
      url: url,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
}

PostDataToFM();