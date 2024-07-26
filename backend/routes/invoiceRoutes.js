const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticateJWT, authorizeRoles, errorHandler } = require('../middlewares');

// Routes that require authentication
router.use(authenticateJWT);

// Routes that require admin role
router.post('/', invoiceController.createInvoice);
router.get('/',  invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.put('/:id', authorizeRoles('admin'), invoiceController.updateInvoice);
router.delete('/:id', authorizeRoles('admin'), invoiceController.deleteInvoice);
// Get invoices by user
router.get('/user/:userId', invoiceController.getInvoicesByUser);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
