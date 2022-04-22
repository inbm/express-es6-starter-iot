import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import cars from './routes/cars.route'
import users from './routes/users.route'
import purifiers from './routes/purifiers.route'
import connectToDb from './db/connect'
import multer from 'multer'
import FCM from "fcm-node"
import gson from "gson"

import fs from 'fs'
import readline from 'readline'
import {google} from 'googleapis'
import { doubleclickbidmanager } from "googleapis/build/src/apis/doubleclickbidmanager";

import {Mamal} from './mamal';

const cat = new Mamal("cat");
cat.echoName();

// var a = "[{\"name\":\"inbm\"}, {\"name\":\"lee\"}]";
// var b = JSON.parse(a);



// b.forEach(c=>{
//     console.log(c.name);
// });
// console.log("---->" + a["name"]);c


var upload = multer({ dest: 'uploads/' });

const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
console.log('db start');
 //connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

console.log('use end');

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
  }


  app.use(myLogger);



app.get('/jsp', (req, res) => {
    res.send('<tr>fffff</tr>');
});

var id = 'inbm001';

app.get('/' + id, (req, res) => {
    res.send(id);
});




app.use('/test', (req, res)=>{

    var exec = require('child_process').exec, child;

    var body = req.body.lyrics;

    

    child = exec('java -jar -Dfile.encoding=UTF-8 dokeum.jar ' + encodeURI(body),
    function (error, stdout, stderr){
        //console.log('stdout: ' + stdout);

        if(error !== null){
        console.log('exec error: ' + error);
        }

        res.send(stdout);
        res.end();
        // console.log('stderr: ' + stderr);

        
    });
    //res.send(body);
})

app.use('/users', users);
app.use('/cars', cars);
app.use('/purifiers', purifiers);


app.get('/todos', function(req, res){
    res.send(db.todos.find());
})


app.post('/photo', upload.any(), function (req, res, next) {
    // req.body는 텍스트 필드를 포함합니다.
    console.log(req.body);
    req.files.forEach( c=>{
        console.log(c.originalname + ":" + c.path);
        pushMessage();
    });
    res.send('test');
    
  })


  var serverKey = 'AAAAD-S-xTQ:APA91bHgVqtORke4oGgGBr5KlmOOgIpEFrb5o3yM0JB9LliJomy7zeAn9pvgwHk_lcXCYiVlbbiw39B6sqiX2zPJVJv-CYr5hwyU-xMJEhS0up-0girqluh6sYDd19cQbCufv2T5HgXL';
var client_token = 'ca1_HFnXHiU:APA91bG6i0mbMTFLMyvKOng_pAAx76sECTwa7oKZBXMREUhldR99W3yPfgYVVDEFGW_Cc2U5mzFgOz9psPFDruICC-yrrEz6UKZNNc7KWObcEfHuGgBzICzRA1aMZUHY7joJcjD3AgKE';


var push_data = {
    // 수신대상
    to: client_token,
    // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
    notification: {
        title: "Hello Node",
        body: "http://www.naver.com",
        sound: "default",
        //click_action: "FCM_PLUGIN_ACTIVITY",
        click_action: "http://www.naver.com",
        icon: "fcm_push_icon"
    },
    // 메시지 중요도
    priority: "high",
    // App 패키지 이름
    restricted_package_name: "com.inbm.constructuremanagement",
    // App에게 전달할 데이터
    data: {
        link: 'http://www.naver.com',
        num2: 3000
    }
};

function pushMessage(){
    var fcm = new FCM(serverKey);
    fcm.send(push_data, function(err, res){

        if(err){
            console.error("-----" + err);
        }

        console.log(res);
    });

    

}

//Index route
app.get('/member', (req, res) => {
    res.send('test');
});


function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});

    console.log(sheets.spreadsheets.sheets);
    // sheets.spreadsheets.values.get({
    //   spreadsheetId: '1QOuDzRI8pXoQb2z7RIbbHe6dNUknXJl6V34XNtY19x8',
    //   range: 'Class Data!A2:E',
    // }, (err, res) => {
    //   if (err) return console.log('The API returned an error: ' + err);
    //   const rows = res.data.values;
    //   if (rows.length) {
    //     console.log('Name, Major:');
    //     // Print columns A and E, which correspond to indices 0 and 4.
    //     rows.map((row) => {
    //       console.log(`${row[0]}, ${row[4]}`);
    //     });
    //   } else {
    //     console.log('No data found.');
    //   }
    // });
  }


  const TOKEN_PATH = 'token.json';
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

  function authorize(credentials, callback) { 
      console.log(credentials);
      const {client_secret, client_id, redirect_uris} = credentials; 
      const oAuth2Client = new google.auth.OAuth2( client_id, client_secret, redirect_uris[0]); 
      // Check if we have previously stored a token. 
      fs.readFile(TOKEN_PATH, (err, token) => { 
          if (err) return getNewToken(oAuth2Client, callback); 
          oAuth2Client.setCredentials(JSON.parse(token)); 
          callback(oAuth2Client); 
        }); 
    }

    function getNewToken(oAuth2Client, callback) { 
        const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES, }); 
        console.log('Authorize this app by visiting this url:', authUrl); 
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout, }); 
        rl.question('Enter the code from that page here: ', (code) => { rl.close(); 
            oAuth2Client.getToken(code, (err, token) => { 
                if (err) return console.error('Error while trying to retrieve access token', err); 
                oAuth2Client.setCredentials(token); 
                // Store the token to disk for later program executions 
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                     if (err) return console.error(err); 
                     console.log('Token stored to', TOKEN_PATH); }); 
                     callback(oAuth2Client); 
                    }); 
                }); 
            }




app.get('/naver', async (req, res) => {
    
 
// spreadsheet key is the long id in the sheets URL
    // const doc = new GoogleSpreadsheet('1QOuDzRI8pXoQb2z7RIbbHe6dNUknXJl6V34XNtY19x8');
    
    // // // use service account creds
    // await doc.useServiceAccountAuth({
    // client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // private_key: process.env.GOOGLE_PRIVATE_KEY,
    // });
    // // // OR load directly from json file if not in secure environment
    // // await doc.useServiceAccountAuth(require('./creds-from-google.json'));
    // // // OR use API key -- only for read-only access to public sheets
    // doc.useApiKey('AIzaSyCMq6yW3feKxw1AJvfNrMkMGP2n9tp44fU');
    
    // await doc.loadInfo(); // loads document properties and worksheets
    // console.log(doc.title);
    // await doc.updateProperties({ title: 'renamed doc' });
    
    // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    // console.log(sheet.title);
    // console.log(sheet.rowCount);
    
    // // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    //await newSheet.delete();

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    const TOKEN_PATH = 'token.json';


    fs.readFile('./credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), listMajors);
      });

 

});


_test();

function _test(){
    console.log('test---------------------')
}



app.listen(port, () => {
    logger.info('server started - ', port);
});