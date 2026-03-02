//////////////////////////////////////
/***********   Auth Controller   *************/
/////////////////////////////////////

import { login, register } from "../services/authServices.js";

export const regiterController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await register(email, password, name);
        return res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await login(email, password);

        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//////////////////////////////////////
/***********   Document Controller   *************/
/////////////////////////////////////

import { createnewDocument, getDocumentsByUserId, deleteDocumentById } from "../services/documentServices.js";

export const createDocument = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;
    console.log("Create ducment route");
    console.log("req.user:", req.user);
    console.log("userId:", userId);

    try {
        const document = await createnewDocument(title, content, userId);
        return res.status(201).json({ success: true, document });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getDocuments = async (req, res) => {
    const userId = req.user.userId;
    try {
        const documents = await getDocumentsByUserId(userId);
        console.log(documents);
        return res.status(200).json({ success: true, documents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const deleteDocument = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const document = await deleteDocumentById(id, userId);

        if (!document) {
            return res.status(404).json({
                success: false,
                error: "Document not found or not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};