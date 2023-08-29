import { Router } from "express";
import InvoiceService from '../controllers/invoiceService';

// Export the base-router
const baseRouter = Router();
// Setup routers

baseRouter.get('/invoice/get', InvoiceService.get);


// Export default.
export default baseRouter;
