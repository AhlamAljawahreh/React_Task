const connection = require("../database/db");

const createNewItem = async (req, res) => {
  const { title, description, price, store_id } = req.body;

  const query = `INSERT INTO item (title, description, price , store_id) VALUES (?,?,?,?)`;
  let data = [title, description, price, store_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(200).json({
        success: false,
        massage: `Failed to create Item ${title}`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `item ${title} created`,
      results: results,
    });
  });
};

module.exports = {
  createNewItem,
};
