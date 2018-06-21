var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const host_URI = 'https://10.114.1.8';
const databaseName = 'Lijun_TicTacToe';
const login_pw = 'bGlqdW46MTIzNA=='; //login:password base 64 format
const layoutName = 'Player';

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

module.exports = async function PostDataToFM(student_info) {
    const token = await getToken();
    var url = `${host_URI}/fmi/data/v1/databases/${databaseName}/layouts/${layoutName}/records/`;
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

