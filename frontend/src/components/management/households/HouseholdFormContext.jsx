import { createContext, useContext, useState } from "react";

export const HouseholdContext = createContext();

export const HouseholdProvider = ({ children }) => {
    const household = {
        socio_economic_class: "",
        senior_citizen: 0,
        pwds: 0,
        solo_parents: 0,
        indigents: 0
    }

    const [newHousehold, setNewHousehold] = useState(household);

    const [initialResidents, setInitialResidents] = useState([]);

    const value = {
        newHousehold,
        setNewHousehold,
        initialResidents,
        setInitialResidents
    }

    return <HouseholdContext.Provider value={value}>
        { children }
    </HouseholdContext.Provider>
}

export const useHouseholdContext = () => useContext(HouseholdContext);