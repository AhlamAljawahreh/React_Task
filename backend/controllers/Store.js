const connection = require("../database/db");

const createNewStore = async (req, res) => {
  const { name} = req.body;
  const user_id = req.token.userId; 

  const query = `INSERT INTO store (name, user_id) VALUES (?,?)`;
  let data = [name, user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(200).json({
        success: false,
        massage: `Failed to create store ${name}`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `store ${name} created`,
      results: results,
    });
  });
};

module.exports = {
  createNewStore,
};
