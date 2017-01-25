var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

var arrUsers = [];

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");  
});

io.sockets.on('connection', function (socket) {
  //console.log("Co nguoi connect ne - " + getDateTime());
  socket.on('register_user', function (_userName, _email) {
    var user = new User(_userName, _email);

    var found = false;
    for(var i = 0; i < arrUsers.length; i++) {
        if (arrUsers[i].userName == _userName) {
            found = true;
            break;
        }
    }

    if (!found) {
      arrUsers.push(user);
      socket.un = _userName;
      socket.emit('response_register', {retCode: 0, errorMsg:"SUCCESS", result:arrUsers});
    }else{
      socket.emit('response_register', {retCode: 1, errorMsg:"USER_ALREADY_EXITS", result: []});
    }
    //io.sockets.emit('response_register', { noidung: data+" dang nhap ne" });
  });
  
  //io.sockets.emit('serverguitinnhan', { noidung: "okbaby" });
  
  /*socket.on('servernhantinnhan', function (data) {
  // emit toi tat ca moi nguoi
  io.sockets.emit('serverguitinnhan', { noidung: data });
  
  // emit tới máy nguoi vừa gửi
  socket.emit('serverguitinnhan', { noidung: data });
  });
  */
  
});
function User(_userName, _email){
   this.userName = _userName;
   this.email = _email;
}
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] == obj) {
            return true;
        }
    }

    return false;
}
