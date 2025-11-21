import pool from "../config/db.js";

export const getAllResidents = async () => {
    const query = `SELECT * FROM residents`;

    const [result] = await pool.query(query);

    return result;
}

export const insertResident = async (residentData) => {
    const query = `
        INSERT INTO residents (first_name, last_name, middle_name, date_of_birth, gender, civil_status, place_of_birth, relationship, address, household_no, household_id, phone, email, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, residentData);

    return result;
}

export const insertListOfResidents = async (conn, residents) => {
    const query = `
        INSERT INTO residents (first_name, last_name, middle_name, date_of_birth, gender, civil_status, place_of_birth, relationship, address, household_no, household_id, phone, email, photo) 
        VALUES ?
    `;

    const [result] = await conn.query(query, [residents]);

    return result;
}

export const updateResidentById = async (setFields, values) => {
    const query = `
        UPDATE residents
        SET ${setFields}
        WHERE id = ?
    `;

    const [result] = await pool.query(query, values);
    return result;
}

export const deleteResidentById = async (id) => {
    const query = `DELETE FROM residents WHERE id = ?`;

    const [result] = await pool.query(query, [id]);
    return result;
}