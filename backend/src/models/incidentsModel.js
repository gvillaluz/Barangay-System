import pool from "../config/db.js";

export const getIncidentRecord = async () => {
    const query = `SELECT * FROM incidents ORDER BY date DESC`;

    const [result] = await pool.query(query);
    return result;
}

export const insertIncidentRecord = async (values) => {
    const query = `
        INSERT INTO incidents (date, type, persons_involved, resolution_status, mediation_records, outcome) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const updateIncidentRecordById = async (setFields, values) => {
    const query = `
        UPDATE incidents
        SET ${setFields}
        WHERE id = ?
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const deleteIncidentRecordById = async (id) => {
    const query = `DELETE FROM incidents WHERE id = ?`;

    const [result] = await pool.query(query, [id]);
    return result;
}