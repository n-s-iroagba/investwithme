import { SuccessCallback } from "./api";

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
  
  export const setAuthTokenAndNavigate: SuccessCallback<any> = (data,navigate,navUrl) => {
    localStorage.setItem('cAssocKJwtToken', data);
  };
  export function isLargeScreen() {
    const screenWidth = window.innerWidth;
    // Define your threshold for what constitutes a large screen, for example, 1024px
    const largeScreenWidth = 1024;
    
    return screenWidth >= largeScreenWidth;
  }

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
export function getTimeSinceFirstVisit(): number | null {
  // Check if localStorage is supported
  if (typeof Storage !== "undefined") {
    const firstVisitTime = localStorage.getItem('firstVsitTime');
    console.log('time I first logged in'+firstVisitTime) 
    // Check if the user has visited before
    if (!firstVisitTime) {
      // User is visiting for the first time
      const currentTime = new Date();
      // Save the current time in localStorage
      localStorage.setItem('firstVsitTime', currentTime.toString());
      console.log('First visit time set to: ' + currentTime);
      return null; // No time difference since it's the first visit
    } else {
      // User has visited before
      const currentTime = new Date();
      const previousVisitTime = new Date(firstVisitTime);
      const timeDifference = currentTime.getTime() - previousVisitTime.getTime();
      console.log('time-difference',+ timeDifference)
      
      // Convert time difference from milliseconds to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      
      if (daysDifference <= 2) {
        console.log('Time since first visit (in days): ' + daysDifference);
        return 172800000-timeDifference;
      } else {
        console.log('Subsequent visit is more than 2 days from first visit.');
        return null; // Return null if more than 2 days have passed
      }
    }
  } else {
    // Browser doesn't support localStorage
    console.log('Sorry, your browser does not support local storage.');
    return null;
  }
}
export const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};