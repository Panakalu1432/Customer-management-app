// server/routes/customers.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/', customerController.createCustomer);
router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomerById);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
