import { getIncidentRecord, insertIncidentRecord, updateIncidentRecordById, deleteIncidentRecordById } from "../models/incidentsModel.js";
import AppError from "../utils/errors.js";

const getIncidentRecordDesc = async () => {
    const incidents = await getIncidentRecord();

    return incidents;
}

const createIncidentRecord = async (incidentData) => {
    if (!incidentData)
        throw new AppError("No incident information provided.", 404);

    const values = [
        incidentData.date,
        incidentData.type,
        incidentData.persons_involved,
        incidentData.resolution_status,
        incidentData.mediation_records,
        incidentData.outcome
    ]

    const incidentInsert = await insertIncidentRecord(values);

    if (!incidentInsert.affectedRows || !incidentInsert.insertId)
        throw new AppError("Failed to insert incident information.", 404);

    return incidentInsert.insertId;
}

const updateIncident = async (changes, incidentId) => {
    const keys = Object.keys(changes);

    const setFields = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => changes[key]);

    values.push(incidentId);

    const result = await updateIncidentRecordById(setFields, values);

    if (!result.affectedRows)
        throw new AppError("Failed to update household.", 404);

    return incidentId;
}

const deleteIncidentRecord = async (id) => {
    if (!id)
        throw new AppError("No incident id provided.", 404);

    const result = await deleteIncidentRecordById(id);

    if (!result.affectedRows)
        throw new AppError("Failed to delete incident.", 404);
}

export default { getIncidentRecordDesc, createIncidentRecord, updateIncident, deleteIncidentRecord }