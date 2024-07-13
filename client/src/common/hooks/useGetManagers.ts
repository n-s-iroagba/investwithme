import { useEffect, useState } from "react";
import { getManagers } from "../../features/manager/helpers/managerApiHelpers";
import { ManagerDto } from "../../../../common/managerType";
import { sortManagers } from "../../features/manager/helpers/managerHelpers";

const useGetManagers = (): { managers: ManagerDto[], errorMessage: string } => {
    const [managers, setManagers] = useState<ManagerDto[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers(); 
        const sortedManagers = sortManagers( managerData)
        setManagers(sortedManagers);

        console.log(managerData)
      } catch (error) {
        console.error(error);
        setErrorMessage('Error retrieving managers')
      }
    };

    useEffect(() => {
    
      fetchManagerData();
    }, []);
  
    return {
      managers,
      errorMessage
    };
  };
  
  export default useGetManagers;