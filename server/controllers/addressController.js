const db = require('../db');

exports.createAddress = (req, res) => {
  const { id } = req.params; 
  const { address_details, city, state, pin_code } = req.body;

  if (!address_details || !city || !state || !pin_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [id, address_details, city, state, pin_code];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ 
      id: this.lastID, 
      customer_id: id, 
      address_details, city, state, pin_code 
    });
  });
};



exports.getSearchResult = (req, res) => {

   const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City query is required" });
  }

  const sql = "SELECT * FROM addresses WHERE city LIKE ?";
  db.all(sql, [`%${city}%`], (err, rows) => {
    if (err) {
      console.error("Error searching addresses:", err.message);
      return res.status(500).json({ error: "Failed to search addresses" });
    }
    res.json(rows);
  });
};



// GET all addresses for a customer
exports.getAddressesByCustomer = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM addresses WHERE customer_id = ?";

  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
};

// UPDATE address
exports.updateAddress = (req, res) => {
  const { addressId } = req.params;
  const { address_details, city, state, pin_code } = req.body;

  const sql = `UPDATE addresses 
               SET address_details=?, city=?, state=?, pin_code=? 
               WHERE id=?`;
  const params = [address_details, city, state, pin_code, addressId];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ id: addressId, address_details, city, state, pin_code });
  });
};

// DELETE address
exports.deleteAddress = (req, res) => {
  const { addressId } = req.params;
  const sql = `DELETE FROM addresses WHERE id=?`;

  db.run(sql, [addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ message: "Address deleted successfully" });
  });
};
