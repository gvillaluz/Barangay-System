import pool from "../config/db.js";

export const getDocumentRecordsInDesc = async () => {
    const query = `SELECT * FROM documents ORDER BY id DESC`;

    const [result] = await pool.query(query);
    return result;
}

export const createDocumentRecord = async (values) => {
    const query = `
        INSERT INTO documents (doc_type, resident_name, purpose, status) 
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const updateDocumentRecordById = async (values) => {
     const query = `
        UPDATE documents 
        SET doc_type=?, resident_name=?, purpose=?, status=? 
        WHERE id=?`;

    const [result] = await pool.query(query, values);
    return result;
}

export const deleteDocumentRecordById = async (id) => {
    const query = `DELETE FROM documents WHERE id = ?`;

    const [result] = await pool.query(query, [id]);
    return result;
}