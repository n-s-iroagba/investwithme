import React, { createContext, useState } from "react";

import { doPasswordsMatch } from "../helpers/helpers";
import { postData } from "../helpers/api";
import { AdminData, AuthContextType, InvestorData } from "./AuthTypes";

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
  const [investorData, setInvestorData] = useState<InvestorData>({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    bank: '',
    timezone: '',
    referralCode:''
  })

  const handleSubmit = async (data: AdminData | InvestorData, event: React.FormEvent<HTMLFormElement>, domain: string, navigateToVerifyEmailPage: () => void) => {
    event.preventDefault();
    const form = event.currentTarget
    const password = data.password
    const confirmPassword = data.confirmPassword
    const passwordCorrect = checkIfUserEnteredPasswordCorrectly(password)
    const passwordMatch = checkIfPasswordsMatch(password, confirmPassword)
    let secretCodeMatch: boolean = false;
    let shouldSubmit:boolean = true //flag to check if form details are good enough to be submitted
    if ('secretCode' in data) {
      secretCodeMatch = data.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY ? true : false
    }
    if (form.checkValidity() === false || !passwordCorrect || !passwordMatch || !secretCodeMatch) {
      event.preventDefault();
      setValidated(true)
      shouldSubmit=false
      event.stopPropagation();
    }

    if (shouldSubmit){
    setSubmitting('submitting')
    try {
      const response = await postData(domain, data)
      if (response.statusText === 'Created') {
        console.log(response.data)
        localStorage.setItem('cassockEmailVerificationToken', JSON.stringify(response.data))
        navigateToVerifyEmailPage()
      }
    } catch (error: any) {
    setErrorMessage('we are sorry, we cannot register you at this time')
      setSubmitting('');
      console.error(error)
      if ('secretCode' in data && !secretCodeMatch){
        setErrorMessage('The secret code provided is wrong')
      }
    }
    }
  };

  const checkIfUserEnteredPasswordCorrectly = (password: string) => {
    if (password === '') {
      setPasswordValidityMessage(['no number in provided password', 'no uppercase letter in provided', 'no lowercase in provided', 'password is less than 8 characters']);
      return false;
    } else if (Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0) {
      return false;
    }
    return true;
  };

  const checkIfPasswordsMatch = (password: string, confirmPassword: string) => {
    if (!doPasswordsMatch(password, confirmPassword)) {
      setIsPasswordsMatch(false);
      return false;
    } else {
      setIsPasswordsMatch(true);
      return true;
    }
  };

  const handlePasswordChange = (
    data: AdminData | InvestorData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<InvestorData | AdminData>>
  ) => {
    handleChange(data, e, setState);
    validatePassword(e.target.value);
  };

  const handleChange = (data: AdminData | InvestorData, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<InvestorData | AdminData>>) => {
    e.preventDefault();
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password: string) => {
    let tempPasswordState: string[] = []
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

  const handleConfirmPasswordsChange = (data: AdminData | InvestorData, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<InvestorData | AdminData>>) => {
    handleChange(data, e, setState);
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
    setAdminData,
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
    passwordValidityMessage,
    setInvestorData,
    investorData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
