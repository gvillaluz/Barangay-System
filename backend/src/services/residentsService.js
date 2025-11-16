import { getHouseholdByNo } from "../models/householdsModel";
import { getAllResidents, insertResident, updateResidentById } from "../models/residentsModel";
import AppError from "../utils/errors";

const getResidents = async () => {
    const residents = await getAllResidents();

    if (!residents.affectedRows || residents.length <= 0)
        throw new AppError("Failed to fetch all residents.", 404);

    return residents;
}

const createResident = async (residentData, file) => {
    const householdInfo = await getHouseholdByNo(residentData.household_no);

    if (!householdInfo)
        throw new AppError("Invalid household number.", 404);

    const resident = [
        residentData.first_name,
        residentData.last_name,
        residentData.middle_name,
        new Date(residentData.date_of_birth),
        residentData.gender,
        residentData.civil_status,
        residentData.place_of_birth,
        residentData.relationship,
        householdInfo.address,
        residentData.household_no,
        householdInfo.id,
        residentData.phone,
        residentData.email,
        file.path
    ]

    const insertResult = await insertResident(resident);

    if (insertResult.affectedRows <= 0 || !insertResult.insertId)
        throw new AppError("Failed to save resident data.", 404);

    return insertResult.insertId;
}

const updateResident = async (residentData, file, residentId) => {
    const keys = Object.keys(residentData);

    const setFields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => residentData[key]);

    values.push(residentId);

    const result = await updateResidentById(setFields, values);

    if (!result.affectedRows)
        throw new AppError("Failed to update household.", 404);

    return residentId;
}

export default { getResidents, createResident }