import { getDocumentRecordsInDesc, createDocumentRecord, updateDocumentRecordById, deleteDocumentRecordById } from "../models/documentsModel.js";
import AppError from "../utils/errors.js";
import { hasNullValues } from "../utils/validationUtils.js";

const getDocumentRecords = async () => {
    const records = await getDocumentRecordsInDesc();

    return records;
}

const createRecord = async (data) => {
    if (!data)
        throw new AppError("No document data provided.", 404);

    const newDocument = [
        data.doc_type,
        data.resident_name,
        data.purpose,
        data.status
    ]

    const newRecord = await createDocumentRecord(newDocument);

    if (!newRecord.insertId || !newRecord.affectedRows)
        throw new AppError("Failed to insert new document record.", 404);

    return newRecord.insertId;
}

const updateDocumentRecord = async (newData, id) => {
    if (!newData || hasNullValues(newData))
        throw new AppError("Invalid document record provided.", 404);

    if (!id)
        throw new AppError("No document id provided.", 404);

    const newRecord = [
        newData.doc_type,
        newData.resident_name,
        newData.purpose,
        newData.status
    ]

    const result = await updateDocumentRecordById(newRecord, id)

    if (!result.affectedRows || result.affectedRows <= 0)
        throw new AppError("Failed to update document record.", 404);

    return id;
}

const deleteDocumentRecord = async (id) => {
    if (!id)
        throw new AppError("No document id provided.", 404);

    const result = await deleteDocumentRecordById(id);

    if (!result.affectedRows || result.affectedRows <= 0)
        throw new AppError("Failed to delete document record.", 404);
}

export default { getDocumentRecords, createRecord, updateDocumentRecord, deleteDocumentRecord }