const moment = require('moment');
const socketDal = require('./socketDal')();



const socketService = {
  /**
   * Gets profile detail
   * @param {String} id - profile identification number
   */
  getDetailProfile: (id) => adminDal.getDetailProfile(id),

  /**
   * Creates profile
   * @param {Object} body - profile information
   */
  GetOnlineUsers: async (ApplicationName) => {
   
   
    var result = await socketDal.GetOnlineUsers(ApplicationName);
    return result;
  },
  AddOnlineUser: async (employeeNumber,socketId,applicationName) => {
   
    const CreatedDate = moment().format();
    var result = await socketDal.AddOnlineUser(employeeNumber,socketId,CreatedDate,applicationName);
    return result;
  },

  AddMessage: async (SenderEmpNumber,Content,SourceApp,DestApp) => {
   
    const CreatedDate = moment().format();
    var result = await socketDal.AddMessage(SenderEmpNumber,Content,CreatedDate,SourceApp,DestApp);
    return result;
  },
  DisConnectOnlineUser: async (socketId) => {   
    const CreatedDate = moment().format();
    var result = await socketDal.DisConnectOnlineUser(socketId,CreatedDate);
    return result;
  },
  
}


module.exports = socketService;