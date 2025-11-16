import pool from "../config/db";

export const getHouseholdsDescending = async () => {
    const [result] = await pool.query("SELECT * FROM households ORDER BY id DESC");
    return result;
}

export const insertHousehold = async (conn, householdData) => {
    const query = "INSERT INTO (household_no, head_of_family, socio_econimic_classification, senior_citizen, pwds, solo_parents, indigents) VALUES ?";

    const [result] = await conn.query(query, householdData);

    return result;
}

export const updateHouseholdHead = async (conn, values) => {
    const query = "UPDATE households SET head_of_family = ? WHERE household_id = ?";

    const [result] = await conn.query(query, values);

    return result;
}

export const updateHouseholdById = async (setFields, values) => {
    const query = `
        UPDATE households
        SET ${setFields}
        WHERE household_id = ?
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const getHouseholdByNo = async (household_no) => {
    const query = `SELECT id, address FROM households WHERE household_no = ?`;

    const [result] = await pool.query(query, [household_no]);
    
    return result;
}