import { getHouseholdByNo } from "../models/householdsModel.js";
import { deleteResidentById, getAllResidents, insertResident, updateResidentById } from "../models/residentsModel.js";
import AppError from "../utils/errors.js";

const getResidents = async () => {
    const residents = await getAllResidents();

    return residents;
}

const createResident = async (data, file) => {
    if (!data) 
        throw new AppError("No resident data provided", 404);

    if (!file)
        throw new AppError("No image provided.", 404);

    const householdInfo = await getHouseholdByNo(data.household_no);

    console.log(householdInfo[0])

    const household = householdInfo[0];

    if (!householdInfo.length === 0)
        throw new AppError("Invalid household number.", 404);

    const photoPath = `uploads/residents/${file.filename}`;

    const resident = [
        data.first_name,
        data.last_name,
        data.middle_name,
        data.date_of_birth,
        data.gender,
        data.civil_status,
        data.place_of_birth,
        data.relationship,
        household.address,
        data.household_no,
        household.id,
        data.phone,
        data.email,
        photoPath
    ]

    const insertResult = await insertResident(resident);

    if (insertResult.affectedRows <= 0 || !insertResult.insertId)
        throw new AppError("Failed to save resident data.", 404);

    return insertResult.insertId;
}

const updateResident = async (data, file, residentId) => {
    const residentData = JSON.parse(data);

    if (!residentData || !residentId)
        throw new AppError("No resident data or resident id provided.", 404);

    if (file) 
        residentData.photo = file.path;

    const keys = Object.keys(residentData);

    const setFields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => residentData[key]);

    values.push(residentId);

    const result = await updateResidentById(setFields, values);

    if (!result.affectedRows)
        throw new AppError("Failed to update household.", 404);

    return residentId;
}

const deleteResident = async (id) => {
    if (!id) 
        throw new AppError("Invalid resident id.", 404);

    const result = await deleteResidentById(id);

    if (!result.affectedRows)
        throw new AppError("Failed to delete resident", 404);
}

export default { getResidents, createResident, updateResident, deleteResident }