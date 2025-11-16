import { createContext, useContext, useState } from "react";
import { hasNullValue } from '../../../utils/validation';
import { createHousehold } from "../../../api/householdsApi";

export const HouseholdContext = createContext();

export const HouseholdProvider = ({ children }) => {
    const household = {
        socio_economic_class: '',
        senior_citizen: 0,
        pwds: 0,
        solo_parents: 0,
        indigents: 0,
        address: ''
    }

    const [newHousehold, setNewHousehold] = useState(household);
    const [initialResidents, setInitialResidents] = useState([]);
    const [householdError, setHouseholdError] = useState("");
    const [hasHead, setHasHead] = useState(false);
    const [step, setStep] = useState(1);

    const handleBack = () => setStep((prev) => prev - 1);
    const handleNext = () => {
        if (hasNullValue(newHousehold)) {
            setHouseholdError("Some values are empty.");
            return;
        }

        setHouseholdError("");
        setStep((prev) => prev + 1);
    }

    const handleSaveResident = (resident) => {
        setInitialResidents((prev) => ([...prev, resident]));
        if (resident.relationship === "Head") setHasHead(true);
    }

    const handleDeleteResident = (index) => {
        if (initialResidents[index].relationship === "Head") setHasHead(false);
        setInitialResidents((prev) => prev.filter((r, i) => i !== index));
    }

    const onClose = () => {
        setStep(1);
        setNewHousehold(household);
        setInitialResidents([]);
    }

    const saveHousehold = async () => {
        try {
            const payload = {
                newHousehold,
                initialResidents
            }

            const response = await createHousehold(payload);
            console.log(response.data);
        } catch (err) {
            console.log("ERROR IN SAVING : " + err)
        }
    }

    const value = {
        newHousehold,
        setNewHousehold,
        initialResidents,
        setInitialResidents,
        handleSaveResident,
        householdError,
        handleBack,
        handleNext,
        step,
        onClose,
        handleDeleteResident,
        hasHead,
        saveHousehold
    }

    return <HouseholdContext.Provider value={value}>
        { children }
    </HouseholdContext.Provider>
}

export const useHouseholdContext = () => useContext(HouseholdContext);