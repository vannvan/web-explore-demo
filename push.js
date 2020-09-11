#!/usr/bin/env node

/*
* @Author: wanwan
* @Date:   2019-07-15 18:16:58
* @Last Modified by:   vannvan
* @Last Modified time: 2019-08-02 09:44:47
*/


function dateToStr(datetime){
        var dateTime = new Date(datetime);
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth()+1;//js从0开始取
        var date = dateTime.getDate();
        var hour = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        month = month < 10 ? '0' + month: month;
        date = date < 10 ? '0' + date: date;
        hour = hour < 10 ? '0' + hour: hour;
        minutes = minutes < 10 ? '0' + minutes: minutes;
        second = second < 10 ? '0' + second: second;
        return year+"/"+month+"/"+date+" "+hour+":"+minutes+":"+second;
    }
var name = process.argv[2] || dateToStr(new Date());
var shell = require("shelljs");
var exec = shell.exec;
var echo = shell.echo;
if (exec('node readFile .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}

if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
if (exec('git push').code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}
// exec(`echo git success ${name}`);

//绿色字体
echo('-e',"\033[0;32m git success \033[0m"+`${name}`);
