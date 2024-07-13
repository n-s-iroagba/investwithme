import { useState, useEffect } from 'react';
import { ManagerDto } from "../../../../../common/managerType";
import { getManagers } from "../../manager/helpers/managerApiHelpers";
import { findManagerById } from "../../manager/helpers/managerHelpers";
import { getAvailableCurrencies } from "../utils/apiUtills";

const useGetInvestmentCreationData = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [managers, setManagers] = useState<ManagerDto[]>([]);
    const [selectedManager, setSelectedManager] = useState<ManagerDto | null>(null);

    const fetchManagerData = async () => {
        try {
            const tempManagers: ManagerDto[] = await getManagers();
            console.log(tempManagers)
            setManagers(tempManagers);
            const tempCurrencies= await getAvailableCurrencies();
            setCurrencies(tempCurrencies);

            const managerId = localStorage.getItem('cassockNewInvestmentInitmanagerId');
            setSelectedManager(findManagerById(tempManagers, Number(managerId)));
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchManagerData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return {
        currencies,
        managers,
        selectedManager,
        setSelectedManager,
        errorMessage,
        setErrorMessage
    };
}

export default useGetInvestmentCreationData;





