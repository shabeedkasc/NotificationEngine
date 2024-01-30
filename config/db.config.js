
const param={user:'postgres',host:'localhost',port:5432,password:'12345678',database:'NotificationDb'};
//const param={user:'portal_user',host:'localhost',port:5432,password:'12345678',database:'portaldb' master password abcd1234.};
const cs = 'postgres://'+param.user+':'+param.password+'@'+param.host+':'+param.port+'/'+param.database;
module.exports = {
connectionString:cs,
development: {
  debug: false,
  client: 'pg',
  connection: {
    host : param.host,
    port : param.port,
    user : param.user,
    password : param.password,
    database : param.database
  },
  pool: {
   // min: 2,
   min:10,
   // max: 10
   max:10
  },
 
},
staging: {
  client: 'pg',
  connection: {
    database: 'my_db',
    user:     'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
 
},

production: {
  client: 'pg',
  connection: {
    database: 'my_db',
    user:     'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
 
}
  
};