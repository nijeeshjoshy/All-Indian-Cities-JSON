import * as fs from 'fs'
import * as request from 'request';
import * as cheerio from 'cheerio';
import * as Promise from 'bluebird';


var getPinCode =  function (url,cb){
    request(url, function(error, response, html){
        //console.log(response)
       if(error)
        return cb(null)

        var $ = cheerio.load(html);
        var pin;
        var json = {pincode:''}
        
        $('.extrtable').filter(function(){
            var data = $(this)
            pin = data.find('tr').next().find('b').text()
            cb(pin);
        })
    });
}
export = getPinCode;