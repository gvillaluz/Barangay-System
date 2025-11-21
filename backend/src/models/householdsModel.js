import pool from "../config/db.js";

export const getHouseholdsDescending = async () => {
    const query = `
        SELECT
            h.*,
            r.id AS resident_head_id,
            r.first_name AS resident_first_name,
            r.last_name AS resident_last_name
        FROM households h
        LEFT JOIN residents r
            ON h.household_no = r.household_no
            AND r.relationship = 'Head'
        ORDER BY h.id DESC
    `;
    const [result] = await pool.query(query);
    return result;
}

export const insertHousehold = async (conn, householdData) => {
    const query = "INSERT INTO households (household_no, socio_economic_classification, senior_citizens, pwds, solo_parents, indigents, address) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const [result] = await conn.query(query, householdData);

    return result;
}

export const updateHouseholdHead = async (conn, values) => {
    const query = `
        UPDATE households 
        SET household_no = ?
        WHERE id = ?
    `;

    const [result] = await conn.query(query, values);

    return result;
}

export const updateHouseholdById = async (setFields, values) => {
    const query = `
        UPDATE households
        SET ${setFields}
        WHERE id = ?
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const getHouseholdByNo = async (household_no) => {
    const query = `SELECT id, address FROM households WHERE household_no = ?`;

    const [result] = await pool.query(query, [household_no]);
    
    return result;
}