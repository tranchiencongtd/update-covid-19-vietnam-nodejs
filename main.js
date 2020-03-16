// jshint esvdrsion: 6

 const express = require('express');
 const bodyParser = require('body-parser');
 const request = require('request');
 const ejs = require('ejs');

 const app = express();

 app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static('public'));

 app.get('/', function(req,res) {
  let options = {
    url: 'https://code.junookyo.xyz/api/ncov-moh/data.json',
    method: 'GET'
  }

  let casesGlobal, deathsGlobal, recoveredGlobal;
  let casesVietnam, deathsVietnam, recoveredVietnam;
  let status;
  request(options, function(error, response, body) {
    let dataBody = JSON.parse(body);  
    console.log(dataBody);
    
    // Global
    casesGlobal = dataBody.data.global.cases;
    deathsGlobal = dataBody.data.global.deaths;
    recoveredGlobal = dataBody.data.global.recovered;
    // VietNam
    casesVietnam = dataBody.data.vietnam.cases;
    deathsVietnam = dataBody.data.vietnam.deaths;
    recoveredVietnam = dataBody.data.vietnam.recovered;
    //status
    status = dataBody.success;
    
    if(status == true) {
      res.render('home', {
        casesG : casesGlobal,
        deathsG : deathsGlobal,
        reG : recoveredGlobal,
        casesVN : casesVietnam,
        deathsVN : deathsVietnam,
        reVN : recoveredVietnam
      });
    } else {
      res.render('fail.ejs');
    }
  });

 });
 
 app.listen(3000, function() {
  console.log('Server started on port 3000');
 });
