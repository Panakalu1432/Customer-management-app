const db = require('../db');



exports.createCustomer = (req, res) => {
  const { first_name, last_name, phone_number } = req.body;

  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
  const params = [first_name, last_name, phone_number];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, first_name, last_name, phone_number });
  });
};




exports.getCustomers = (req, res) => {
  const sql = "SELECT * FROM customers";

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
};


exports.getCustomerById = (req, res) => {
  const sql = "SELECT * FROM customers WHERE id = ?";

  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Customer not found" });
    res.json(row);
  });
};



exports.updateCustomer = (req, res) => {
  const { first_name, last_name, phone_number } = req.body;

  const sql = `UPDATE customers SET first_name=?, last_name=?, phone_number=? WHERE id=?`;
  
  const params = [first_name, last_name, phone_number, req.params.id];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });

    if (this.changes === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ id: req.params.id, first_name, last_name, phone_number });
  });
};

// DELETE customer
exports.deleteCustomer = (req, res) => {

  const sql = `DELETE FROM customers WHERE id=?`;

  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    
    if (this.changes === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  });
};
