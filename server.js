const express = require('express');
let bodyParser = require('body-parser');
const http = require('http');

const socketIO = require('socket.io');
const logger = require("./utils/logger/logger");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  let cors = require('cors');
  app.use(cors());
  // Add a route to handle preflight requests
app.options('*', cors());
// Other configurations and routes...



// server.listen(8082, () => {
//   console.log('Server is running on port 8082');
// });
//var router=express.Router();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




// io.on('connection', (socket) => {
//     console.log(`A user connected - Socket ID: ${socket.id}`);
//     const employeeName = socket.handshake.query.employeename;
//     console.log(`A user connected - Socket ID: ${socket.id}, Employee Name: ${employeeName}`);
  
//     // Additional handling for connected clients
//   });

  var router=express.Router();
require('./routes')(router,io);
app.use('/api',router);

server.listen(8081, "127.0.0.1", function () {
    // var server = app.listen( "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
})

app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})


app.use(function (err, req, res, next) {
    // console.error(err.message);
    // res.io = io;
    if (!err.statusCode) {err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
    }

    //next();
});
// io.on('connection', (socket) => {
//     console.log(`A user connected - Socket ID: ${socket.id}`);
//     // Additional handling for connected clients
//   });
  