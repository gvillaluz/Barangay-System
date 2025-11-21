import incidentsService from "../services/incidentsService.js";

export const getIncidentRecords = async (req, res) => {
    try {
        const records = await incidentsService.getIncidentRecordDesc();

        return res.status(200).json({
            success: true, 
            message: "Incident records fetched successfully.",
            records
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const createIncidentRecord = async (req, res) => {
    try {
        const incidentId = await incidentsService.createIncidentRecord(req.body);

        return res.status(201).json({
            success: true,
            message: "Incident record saved successfully.",
            incidentId
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const updateIndidentRecord = async (req, res) => {
    try {
        const incidentId = await incidentsService.updateIncident(req.body, req.params.id);

        return res.status(201).json({
            success: true,
            message: "Incident record updated successfully.",
            incidentId
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const deleteIncidentRecord = async (req, res) => {
    try {
        await incidentsService.deleteIncidentRecord(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Incident record deleted successfully."
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}