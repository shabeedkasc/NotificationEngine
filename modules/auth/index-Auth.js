var express      = require('express'),
    bodyParser   = require('body-parser'),
    cors = require('cors');

var app = express();
// app.use(function(req,res,next){
// res.setHeader('Access-Control-Allow-Origin','*');
// res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
// res.setHeader('Access-Control-Allow-Headers','Content-Type');
// res.setHeader('Access-Control-Allow-Credentials',true);
// next();
// })


app.use(cors());

var corsOptions = {
  //origin: "http://localhost:3000"
  //origin:[ "http://portal.dev.local:3000/",'10.10.203.185',"http://portal.dev.local/"]
  origin: "*"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//MiniOrange AUTH
const fs = require("fs");
const MoJWT = require('./jwt-connector');
const miniOrangeSSOURL =
"https://ebsauth.dev.local/moas/broker/login/jwt/1?client_id=n1n7VIyQ4j0gZ9JO&redirect_uri=http://portal.dev.local/";


// start authentication request
app.get("/auth", async (req, res, next) =>  {
  res.redirect(miniOrangeSSOURL);
  });

  
  
  app.get("/",  (req, res, next) => {
    var id_token = req.query.id_token // console.log(req);

    // var cert = fs.readFileSync("cert.crt");
    var jwtBuilder = new MoJWT.JWTBuilder();
    // console.log("Parts " + id_token.split(".").length);
    jwtBuilder.parseJwt(id_token); // initialize the token using parseJwt

    jwtBuilder.setSecret(fs.readFileSync("../ldap-adfs-express-CORS/RSA256Cert9999.crt",'utf8')); // Set the certificate downloaded from miniOrange dashboard
    var verified = jwtBuilder.verifyJwt(); // Verify the signed token
    if (!verified) res.send("Error Occurred while verifying JWT Token");
    var payload = jwtBuilder.getPayload(); // If the token is valid, use getPayload to read the data from the token.

    var empno = payload.usernane;
    
    res.send({"emp_no":empno})    

    });
          
  

  
  
  app.listen(9999, () => {
    console.log("Listen on the port 9999...");
  });