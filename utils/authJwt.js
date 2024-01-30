const jwt = require("jsonwebtoken");

const { secret } = require('../config/constants');

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

   token = token && token.split(" ")[1]
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token,secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: "Unauthorized! 22222"
      });
    }
    req.userId = decoded.id;
    req.Permissions = decoded.permissions;
    next();
  });
};
isAdmin = (req, res, next) => {
  // User.findByPk(req.userId).then(user => {
  //   user.getRoles().then(roles => {
  //     for (let i = 0; i < roles.length; i++) {
  //       if (roles[i].name === "admin") {
  //         next();
  //         return;
  //       }
  //     }
  //     res.status(403).send({
  //       message: "Require Admin Role!"
  //     });
  //     return;
  //   });
  // });
};
isModerator = (req, res, next) => {
  // User.findByPk(req.userId).then(user => {
  //   user.getRoles().then(roles => {
  //     for (let i = 0; i < roles.length; i++) {
  //       if (roles[i].name === "moderator") {
  //         next();
  //         return;
  //       }
  //     }
  //     res.status(403).send({
  //       message: "Require Moderator Role!"
  //     });
  //   });
  // });
};
isModeratorOrAdmin = (req, res, next) => {
  // User.findByPk(req.userId).then(user => {
  //   user.getRoles().then(roles => {
  //     for (let i = 0; i < roles.length; i++) {
  //       if (roles[i].name === "moderator") {
  //         next();
  //         return;
  //       }
  //       if (roles[i].name === "admin") {
  //         next();
  //         return;
  //       }
  //     }
  //     res.status(403).send({
  //       message: "Require Moderator or Admin Role!"
  //     });
  //   });
  // });
};
const hasRole = (permission) => {
  return (req, res, next) => {
    const access =  req.Permissions.find(per=>per.InternalName==permission)
    if (access) {
      return next();
    }
  //  console.error('You do not have the authorization to access this.');
    //return sendErrorResponse(res, 403, 'You do not have the authorization to access this');
    return res.status(403).send({
        message: "Unauthorized No Roles!"
      });
    //next();
  }
}
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  hasRole:hasRole
  
};
module.exports = authJwt;



