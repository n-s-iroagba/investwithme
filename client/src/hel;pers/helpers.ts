export function navigateToInvestOrLogin(navigate: (path: string) => void) {
    // Check if user is logged in (you need to implement this logic)
    const isLoggedIn = !!localStorage.getItem('jwtToken'); // Assuming the JWT token is stored in localStorage
    
    if (isLoggedIn) {
      // Navigate to the invest route
      navigate('/invest');
    } else {
      // Navigate to the login route
      navigate('/login');
    }
  }

export const chooseVisitView = (navigate: (path: string) => void) => {
    const isMember = !!localStorage.getItem('memberCookie');
    const isLoggedIn = !!localStorage.getItem('jwtToken')
    if (isMember && !isLoggedIn) {
      navigate('/login'); // Navigate to the login page
    }
    if (isLoggedIn) {
      navigate('/dashboard'); 
    }
  };
  



//  export const checkAboutToInvest = async (investorId: string, navigate: (path: string)=>void,setSpinner:(spinner:boolean)=> void) => {
//     const aboutToInvest = localStorage.getItem('cassockabouttocashout')
//     if (aboutToInvest) {
  
//       navigate('/make-payment');
//     } 
//     else {
//       try {
//         // Replace 'YOUR_API_ENDPOINT' with your actual endpoint
//         const response = await axios.post(`${YOUR_API_ENDPOINT}/investors/${investorId}/check-about-to-invest`);
//         if (response.investmentStatus){
//             setSpinner(false)
//             localStorage.setItem('cassockabouttocashout', response.investmentStatus)
//         }
//       } catch (error) {
//         alert ('error getting your investment status please check your network connection and try again')
//         navigate('/')
//       }
//     }
//   };
  
//   export default checkAboutToInvest;
  