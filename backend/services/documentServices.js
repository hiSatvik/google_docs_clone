import pool from "../models/db.js";

export const createnewDocument = async (title, content, ownerId) => {
    const safecontent = content ? JSON.stringify(content) : JSON.stringify("");
    const query = "INSERT INTO documents (title, content, owner_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, safecontent, ownerId];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error("Failed to create document: " + error.message);
    }
}

export const getDocumentsByUserId = async (ownerId) => {
    const query = `
        SELECT *
        FROM documents
        WHERE owner_id = $1
        AND is_deleted = false
        ORDER BY updated_at DESC
    `;

    const result = await pool.query(query, [ownerId]);
    return result.rows;
};

export const deleteDocumentById = async (id, ownerId) => {
    const query = `
        UPDATE documents
        SET is_deleted = true
        WHERE id = $1 AND owner_id = $2
        RETURNING *
    `;
    const result = await pool.query(query, [id, ownerId]);
    return result.rows[0];
};