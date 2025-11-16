import residentsService from "../services/residentsService";

export const getResidents = async (req, res) => {
    try {
        const rows = await residentsService.getResidents();

        const baseURL = `${req.protocol}://${req.get('host')}/`;
        const residentsWithPhoto = rows.map(r => ({
            ...r,
            photo: r.photo ? baseURL + r.photo : null
        }));

        return res.status(200).json({
            success: true, 
            message: "Residents fetched successfully.",
            residentsWithPhoto
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const createResident = async (req, res) => {
    try {
        const residentId = await residentsService.createResident(req.body, req.file);

        return res.status(201).json({
            success: true,
            message: "Resident created successfully.",
            residentId
        });
    } catch (err) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
}

export const updateResident = async (req, res) => {
    try {
        
    } catch (err) {
        return res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
}