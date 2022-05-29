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
const getAllItemsByStoreID = (req, res) => {

  let data = req.params.id;

  const query = `SELECT * FROM item WHERE is_deleted=0 AND store_id=? `;

  connection.query(query,data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "All Items in store",
      results: results,
    });
  });
};
const deleteItemById = (req, res) => {

  const query = `UPDATE item SET is_deleted = 1   WHERE  id = ?`;
  const data = req.params.id;
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    // result are the data returned by mysql server
    if (results.affectedRows != 0) {
      res.status(201).json({
        success: true,
        massage: "item deleted successfully",
        results: results,
      });
    } else {
      res.status(200).json({
        success: false,
        massage: "something happens while deleting item",
      });
    }
  });
};


module.exports = {
  createNewItem,
  getAllItemsByStoreID,
  deleteItemById
};
