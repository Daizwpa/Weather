/*
 * @Author: Ziad Bennadji 
 * @Date: 2019-08-24 17:15:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-01 23:44:06
 * @Role: main file of weather app
 */
var request = require('request');
var fs = require('fs');
var yargs = require('yargs');

var args = require('./commandLine.js')(yargs);

var info = fs.readFileSync('city.list.json');//read json citye file
info = JSON.parse(info);

request('http://ip-api.com/json/', function (error, response, body) {// get loctions
  if(error) throw error;// Print the error if one occurred
  if(200 != response.statusCode) console.log(response.statusCode);
  body = JSON.parse(body);
  /* get id of the city */
  var id = null;
  for(let i = 0; i<info.city.length; i++){
    if(info.city[i].name ==  body.city){
      id=  info.city[i].id 
      break;
    }
  }
  console.log(id)
  /**get temperature */
  var site = 'http://api.openweathermap.org/data/2.5/forecast?id='+ id+ '&APPID=a678bc5a3ea8c997787a5e6f760ac4de' ;
  request(site, function (error, response, body) {
    if(error) throw error; // Print the error if one occurred
    if(200 != response.statusCode) console.log(response.statusCode);
    
    body =  JSON.parse(body);// read json of weather
    console.log('city:', body.city.name);
    console.log('temp:', convertKToC(body.list[0].main.temp) , '°C')
  
  });

});

function convertKToC(K){
  if(typeof K == "number")
    return K-273.15 ;
}