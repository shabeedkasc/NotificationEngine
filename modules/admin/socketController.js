const { IsSSO, Permissions, QueueUrl, secret } = require('../../config/constants');
const authJwt = require("../../utils/authJwt");
const logError = require("../../utils/logger/errorFunction");

const cors = require("cors");
const jwt = require("jsonwebtoken");

//MiniOrange AUTH
const fs = require("fs");
const { decode } = require('querystring');

//const MoJWT = require("../../jwt-connector");

// backend\modules\admin\RSA256Cert.crt
const amqp = require("amqplib");

module.exports = (app, service, io) => {
  var channel, connection, gSocket;
  connectQueue()  // call the connect function

  async function connectQueue() {
    try {
      connection = await amqp.connect(QueueUrl);
      channel = await connection.createChannel()
      await channel.assertQueue("CommitteeQueue", { durable: true })

      channel.consume("CommitteeQueue", async (data1) => {
       
       // console.log(`${Buffer.from(data1.content)}`);
       var data = JSON.parse(data1.content);
       var sender=data1.properties.userId;
       var SourceApp=data1.properties.appId;
       await service.socketService.AddMessage(sender,data,SourceApp,"webPortal");
       
      // console.log(data1);
        var onlineUsersList = await service.socketService.GetOnlineUsers("WEBPORTAL");
        var userListRQ = [...data.users];
        if (Array.isArray(data.users) && userListRQ.length > 0) {


          //console.log(userListRQ.length);
          //  if(userListRQ.length>0)
          //{
          //for (var milNo in userListRQ)
          userListRQ.forEach(function (milNo) {
            try {

              var userCodeList = Array.from(onlineUsersList).filter(e => e.EmployeeNumber == milNo);
             
             
              if (userCodeList.length > 0) {
                try {

                  Array.from(userCodeList).forEach(function (user) {

                    io.to(user.Code).emit(data.eventName, { message: data.body });
                  });

                } catch (error) {
                  console.error("Error during acknowledgment:", error);
                }

              }

            }
            catch (error) {
              console.log(error)

            }
          });


        }else
        {
          io.sockets.emit(data.eventName, { message: data.body });
         
        }
       
        channel.ack(data1);

      })
    } catch (error) {
      console.log(error);
    }
  }


  // var targetSocketIds = [];
  // setInterval(function(){

  //   Array.from(targetSocketIds).map((item,index)=>{
  //     console.log('item ='+item);
  //     io.to(item).emit('receive_message', 'Hello, this is a private message!'+item);})

  //   },30000);

  io.on('connection', async (socket) => {
    var token = socket.handshake.query.token;
    gSocket = socket;
    var AppName = socket.handshake.query.AppName;

    var employeeNumber;
    if (!token) {

      socket.disconnect(true);
      return;
    }

    switch (AppName) {
      case 'WEBPORTAL': {
        token = token.replace('Bearer ', '');
        await jwt.verify(token, secret, async (err, deocded) => {
          if (err) {
            socket.disconnect(true);
            return;
          }
          employeeNumber = deocded.id;

        });
      }
    }
    // if(AppName=='WEBPORTAL')
    // {
    //   token=token.replace('Bearer ','');    
    //     await jwt.verify(token,secret,async(err,deocded)=>{
    //       if(err)
    //       {
    //         socket.disconnect(true);
    //         return;
    //       }
    //       employeeNumber=deocded.id;

    //     });

    // }
    if (employeeNumber) {

      await service.socketService.AddOnlineUser(employeeNumber, socket.id, AppName);

    }

    // socket.broadcast.emit("receive_message", 'hii');
    // console.log('A shabeed connected to committee namespace');
    // socket.on("send_message", (data) => {
    //   console.log('A user hii to committee namespace');
    //   socket.broadcast.emit("receive_message", 'hii');
    // });
    // Other committee-related socket events
    socket.on('disconnecting', () => {
      const rooms = Object.keys(socket.rooms);
      console.log('Client disconnecting from rooms:', rooms);
      // Your cleanup logic...
  });
    socket.on('disconnect', async () => {
      await service.socketService.DisConnectOnlineUser(socket.id);
     // console.log('User disconnected ');
    });
  });


}