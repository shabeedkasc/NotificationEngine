

const { pgdb } = require('../../config/index');
const pg = require('pg');
const logError = require("../../utils/logger/errorFunction");



module.exports = () => ({
  /**
   * Create Online User
   * @param {object} user - user object
   */

  AddOnlineUser: async (employeeNumber,socketId,CreatedDate,applicationName) => {
    try {      
      
        var user = await pgdb('public.OnlineUsers')
                   .insert({
                    EmployeeNumber:employeeNumber,
                    Code:socketId,
                    OnlineDate :CreatedDate,
                    ApplicationName:applicationName
                   });
                 
           user = await pgdb('OnlineUsersArchives')
                   .insert({
                    EmployeeNumber:employeeNumber,
                    LoginDate:CreatedDate,
                    Code:socketId,
                    ApplicationName:applicationName                   
                   });
                  

    } catch (error) {
     
      return logError(error.message, error.stack,"socketDal.js", "/Admin/AddOnlineUser");

    }    
  },
  AddMessage: async (SenderEmpNumber,Content,CreatedDate,SourceApp,DestApp) => {
    try {      
      
        var user = await pgdb('public.Messages')
                   .insert({
                    SenderEmpNumber:SenderEmpNumber,
                    Content:Content,
                    CreatedDate :CreatedDate,
                    SourceApp:SourceApp,
                    DestApp:DestApp
                   });
                 
          

    } catch (error) {
     
      return logError(error.message, error.stack,"socketDal.js", "/Admin/AddOnlineUser");

    }    
  },
  DisConnectOnlineUser: async (socketId,CreatedDate) => {
    try {      
      await pgdb('OnlineUsersArchives')
                   .update({                
                    LogOutDate:CreatedDate                   
                   }).where('Code',socketId);
       await pgdb('OnlineUsers').where('Code',socketId).del();
                   
         

    } catch (error) {
      return logError(error.message, error.stack,"socketDal.js", "/Admin/DisConnectOnlineUser");

    }    
  },


  GetOnlineUsers: async (ApplicationName) => {
    try {      
      var user = await pgdb('public.OnlineUsers').select('EmployeeNumber', 'Code','OnlineDate').where("ApplicationName",ApplicationName);      
      return user;

    } catch (error) {
      return logError(error.message, error.stack,"socketDal.js", "/Admin/GetUserByUserName");
    }

  },

  GetOnlineUsersEmployeeNumber: async () => {
    try {
      var user = await pgdb('OnlineUsers').distinct('EmployeeNumber').select('EmployeeNumber');      
      return user;

    } catch (error) {
      return logError(error.message, error.stack,"socketDal.js", "/Admin/GetOnlineUsersEmployeeNumber");
    }

  },


});
