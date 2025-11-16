import { getHouseholdsDescending, insertHousehold, updateHouseholdById, updateHouseholdHead } from "../models/householdsModel";
import { insertListOfResidents } from "../models/residentsModel";
import pool from "../config/db";
import AppError from "../utils/errors";

const getHouseholdsInDesc = async () => await getHouseholdsDescending();

const createHouseholdAndResidents = async (data) => {
    const { household, residents } = data;
    const conn = pool.getConnection();

    try {
        await conn.beginTransaction();
    
        const householdResult = await insertHousehold(conn, household);

        console.log(householdResult);

        if (!householdResult.insertId)
            throw new AppError("Failed to save household.", 500);

        const householdNo = `HH-${householdResult.insertId}`;

        const values = residents.map(r => [
            r.firstname,
            r.lastname,
            r.middlename,
            r.date_of_birth, 
            r.gender,
            r.civil_status,
            r.place_of_birth,
            r.relationship,
            household.address,
            householdNo,
            householdResult.insertId,
            r.phone_number,
            r.email,
            r.photo
        ])

        const residentResult = await insertListOfResidents(conn, values);

        if (!residentResult.affectedRows || residentResult.affectedRows !== residents.length)
            throw new AppError("Failed to save all residents.", 404);

        const headIndex = residents.findIndex(r => r.relationship === "Head");

        if (headIndex === -1) throw new AppError("No head of household found among residents.", 400);

        const householdHead = residentResult.insertId + headIndex;

        const [updateHouseholdResult] = await updateHouseholdHead(conn, [householdHead, householdResult.insertId]);

        if (!updateHouseholdResult.affectedRows)
            throw new AppError("Failed to update household head.", 404);

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