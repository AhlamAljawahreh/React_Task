const connection = require("../database/db");

const createNewStore = async (req, res) => {
  const { name, image, description } = req.body;
  const owner = req.token.userId; 

  const query = `INSERT INTO store (name,owner,image,description) VALUES (?,?,?,?)`;
  let data = [name, owner, image, description];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(200).json({
        success: false,
        massage: `Failed to create store ${name}`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: `store ${name} created`,
      results: results,
    });
  });
};
/*************************************** */
const getAllStores =(req,res)=>{
 
   const query = `SELECT store.id,name,userName, email, password, country, phoneNumber,role,image,description FROM store INNER JOIN users ON store.owner=users.id WHERE store.is_deleted=0 ; `;
   connection.query(query, (err, results) => {
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
       massage: "All Stores",
       results: results,
     });
 });
 }
module.exports = {
  createNewStore,
  getAllStores
};
