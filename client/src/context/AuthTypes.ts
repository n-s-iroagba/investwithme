export interface AdminData {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
  }

  export interface InvestorData {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    dateOfBirth: string;
    gender:string;
    country:string
    bank:string;
    referralCode:string
  }
export interface NewPasswordData{
  password: string;
  confirmPassword: string;
}
export interface AuthContextType {
    adminData:AdminData
    newPasswordData:NewPasswordData,
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>,
    submitting: boolean;
    isPasswordsMatch: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    investorData:InvestorData;
    setAdminData: React.Dispatch<React.SetStateAction<AdminData>>;
    setInvestorData: React.Dispatch<React.SetStateAction<InvestorData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handlePasswordChange: (
    data:AdminData|InvestorData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<InvestorData|AdminData|NewPasswordData>>
    ) => void;
    handleConfirmPasswordsChange: (
        data:AdminData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<InvestorData|AdminData|NewPasswordData>> 
    ) => void;
    checkIfPasswordsMatch: (
      password: string,
      confirmatoryPassword: string
    ) => boolean;
    setReferralToken:(token:string) => void;
    showPassword: () => void;
    handleSubmit:(data:AdminData,event: React.FormEvent<HTMLFormElement>,domain:string,callback:()=>void)=>void;
    handleChange:(data:AdminData, event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,setState: React.Dispatch<React.SetStateAction<InvestorData|AdminData|NewPasswordData>> )=>void
    handleChangePassword:(data: NewPasswordData, event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
   
  }