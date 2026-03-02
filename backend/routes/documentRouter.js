import { Router } from "express";
import { authMiddleware } from "../middelware/authMiddleware.js";
import { createDocument, deleteDocument, getDocuments } from "../controllers/controller.js";

const documentRouter = Router();

documentRouter.post('/create', authMiddleware, createDocument)
documentRouter.get('/my-documents', authMiddleware, getDocuments);
documentRouter.get('/delete/:id', authMiddleware, deleteDocument);

export default documentRouter;