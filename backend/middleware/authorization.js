const connection = require("../database/db");

// This function checks if the user has permission
const authorization = (string) => {
  return (req, res, next) => {
    query = `SELECT permissions.permission FROM roles join permission_role ON roles.role_id = permission_role.role join permissions on permission_role.permission = permissions.Permission_id where roles.role_id = ?`;
    const data = [req.token.role];
    connection.query(query, data, (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        const found = result.find((permission) => {
          return permission.permission == string;
        });
        if (!found) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized`,
          });
        } else {
          next();
        }
      }
    });
  };
};

module.exports = authorization;
