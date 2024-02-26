import React, { createContext, useState } from "react";

import { doPasswordsMatch } from "../helpers/helpers";
import { postData } from "../helpers/api";
import { AdminData,AuthContextType} from "./AuthTypes";





export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passwordValidityMessage, setPasswordValidityMessage] = useState<string[]>([]);
  const [passwordType, setPasswordType] = useState<string>('password');
  const [submitting, setSubmitting] = useState<string>('not-submitting');
  const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    secretCode: ''
  });



  const handleSubmit = async (data:AdminData, event: React.FormEvent<HTMLFormElement>, domain:string, navigateToVerifyEmailPage:()=>void) => {
    const form = event.currentTarget;
    const password = data.password
    const confirmPassword = data.confirmPassword
    const passwordCorrect = checkIfUserEnteredPasswordCorrectly(password)
    const passwordMatch = checkIfPasswordsMatch(password, confirmPassword)
    if (form.checkValidity() === false || !passwordCorrect || !passwordMatch) {
        event.preventDefault();
        event.stopPropagation();
    }
    setValidated(true);
    setSubmitting('submitting')
    try {
        const response  = await postData(domain,data)
        if (response.statusText==='Created') {
        localStorage.setItem('cassockUnverifiedUserDetails',JSON.stringify(response.data.data))
        navigateToVerifyEmailPage()  
        }
    } catch (error:any) {
        setSubmitting('');
        console.error(error)
        setErrorMessage('Sorry it seems we can not register you at this moment')
    }
};

const checkIfUserEnteredPasswordCorrectly = (password:string) => {
  if (password === '') {
    setPasswordValidityMessage(['no number in provided password', 'no uppercase letter in provided', 'no lowercase in provided', 'password is less than 8 characters']);
    return false;
  } else if (Array.isArray(passwordValidityMessage) && passwordValidityMessage.length === 0) {
    return false;
  }
  return true;
};

const checkIfPasswordsMatch = (password:string,confirmPassword:string) => {
  if (!doPasswordsMatch(password, confirmPassword)) {
    setIsPasswordsMatch(false);
    return false;
  } else {
    setIsPasswordsMatch(true);
    return true;
  }
};


const handlePasswordChange = (
    data:AdminData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleChange(data,e);
    validatePassword(e.target.value);
  };

  const handleChange = (data:AdminData ,e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setAdminData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password:string) => {
    let tempPasswordState:string[] = []
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;
  
    if (!hasNumber) {
      tempPasswordState.push('no number in password provided')
    }
    if (!hasUppercase) {
      tempPasswordState.push('no uppercase letter in password provided')
    }
    if (!hasLowercase) {
      tempPasswordState.push('no lowercase letter in password provided')
    }
    if (length < 7) {
      tempPasswordState.push('password is less than 8 characters')
    }
    setPasswordValidityMessage(tempPasswordState)
  }

  const handleConfirmPasswordsChange = (data:AdminData, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(data,e);
    if (!doPasswordsMatch(data.password, e.target.value)) {
      setIsPasswordsMatch(false);
    } else {
      setIsPasswordsMatch(true);
    }
  };

  const showPassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  
  const authContextValue: AuthContextType = {
    adminData,
    submitting,
    isPasswordsMatch,
    errorMessage,
    setErrorMessage,
    validated,
    setValidated,
    handlePasswordChange,
    handleConfirmPasswordsChange,
    checkIfPasswordsMatch,
    showPassword,
    handleSubmit,
    handleChange,
    passwordType,
    passwordValidityMessage
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType|undefined>(undefined);
