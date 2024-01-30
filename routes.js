

const socketService = require('./modules/admin/index');



module.exports = (app, io) => {
  
  socketService.adminRoutes(app, socketService, io); 
  
};
