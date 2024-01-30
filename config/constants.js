module.exports = {
  
    IsSSO: false,
    
    //getLocation: () => {
    // return 'Munich';
   	// },
    secret:    "asdfg4ee56#-asdfg4ee56-asdfg4ee56",
    IIssecret: "asdfg4ee56#-asdfg4ee56-asdfg4ee56",
    // OracleApiUrl: "http://stg-oraapi.hnsci.ae/oracle/GetDataFromOracle",
    OracleApiUrl: "http://10.10.203.187/oracle/GetDataFromOracle",
    QueueUrl: "amqp://localhost:5672",
    FolderSepertor:"/",
    //PublicFolderPath:  "/usr/portalStage/frontend/public/",
    // PublicFolderPath :"/usr/portalStage/frontend/Dynamic/",
    PublicFolderPath :"/usr/portalStage/frontend/FrontendFiles/Dynamic/",
    // AttachmentFolderPath: "/usr/portalStage/Attachments/",
    AttachmentFolderPath: "/usr/portalStage/backend/BackendFiles/Attachments/",
    ExportFolderPath: "/usr/portalStage/export/",

    Permissions: {
      SurveyAdmin: 'SurveyAdmin',
      CalenderAdmin:'CalenderAdmin',
      ITAdmin:'ITAdmin',
      VIPMeetingRoomAdmin:'VIPMeetingRoomAdmin',
      NewsAdmin:'NewsAdmin',
      PublicationAdmin:'PublicationAdmin',
      NotificationAdmin:'NotificationAdmin',
      OfferAdmin:'OfferAdmin',
      CalenderAdmin:'CalenderAdmin',
      AnnouncementsAdmin:'AnnouncementsAdmin',
      SharedFilesAdmin:'SharedFilesAdmin',
      MeetingRoomAdmin: 'MeetingRoomAdmin'
      
    },

    
  };
