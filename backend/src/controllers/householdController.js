import { getHouseholdsDescending } from "../models/householdsModel";
import householdService from "../services/householdsService";

export const getHouseholds = async (req, res) => {
    try {
        const households = await householdService.getHouseholdsInDesc();
        return res.status(200).json({
            success: true,
            message: "Households fetched successfully.",
            households
        })
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const createHousehold = async (req, res) => {
    try {
        const householdId = await householdService.createHouseholdAndResidents(req.body);

        return res.status(200).json({
            success: true,
            message: "Household and residents inserted successfully.",
            householdId
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const updateHousehold = async (req, res) => {
    try {
        const householdId = await householdService.updateHousehold(req.body, req.params.id);

        return res.status(201).json({
            success: true, 
            message: "Household updated successfully.",
            householdId
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}

export const deleteHouseholdById = async (req, res) => {
    try {

    } catch (err) {
        return res.status(200).json({
            success: false,
            message: err.message
        });
    }
}