import { getHouseholdsDescending, insertHousehold, updateHouseholdById, updateHouseholdHead } from "../models/householdsModel.js";
import { insertListOfResidents } from "../models/residentsModel.js";
import pool from "../config/db.js";
import AppError from "../utils/errors.js";

const getHouseholdsInDesc = async () => await getHouseholdsDescending();

const createHouseholdAndResidents = async (data, files) => {
    const conn = await pool.getConnection();

    try {
        const householdData = JSON.parse(data.household);
        const residents = JSON.parse(data.residents);

        if (files && files.length > 0) {
            residents.forEach((res, i) => {
                res.photo = files[i] ? `/uploads/residents/${files[i].filename}` : null;
            });;
        }

        const household = [
            null,
            householdData.socio_economic_classification,
            householdData.senior_citizen,
            householdData.pwds,
            householdData.solo_parents,
            householdData.indigents,
            householdData.address
        ]
    
        await conn.beginTransaction();

        const householdResult = await insertHousehold(conn, household);

        if (!householdResult.insertId)
            throw new AppError("Failed to save household.", 500);

        const householdNo = `HH-${householdResult.insertId}`;

        const updateHouseholdResult = await updateHouseholdHead(conn, [householdNo, householdResult.insertId]);

        if (!updateHouseholdResult.affectedRows)
            throw new AppError("Failed to update household head.", 404);

        const values = residents.map(r => [
            r.first_name,
            r.last_name,
            r.middle_name,
            r.date_of_birth, 
            r.gender,
            r.civil_status,
            r.place_of_birth,
            r.relationship,
            householdData.address,
            householdNo,
            householdResult.insertId,
            r.phone_number,
            r.email,
            r.photo
        ])

        const residentResult = await insertListOfResidents(conn, values);

        if (!residentResult.affectedRows || residentResult.affectedRows !== residents.length)
            throw new AppError("Failed to save all residents.", 404);

        await conn.commit();

        return householdResult.insertId;

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        await conn.release();
    }
}

const updateHousehold = async (changes, householdId) => {
    const keys = Object.keys(changes);

    const setFields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => changes[key]);

    values.push(householdId);

    const result = await updateHouseholdById(setFields, values);

    if (!result.affectedRows)
        throw new AppError("Failed to update household.", 404);

    return householdId;
}

export default { getHouseholdsInDesc, createHouseholdAndResidents, updateHousehold }