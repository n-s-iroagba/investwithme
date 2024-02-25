export interface AdminData {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
  }

export interface AuthContextType {
    adminData:AdminData
    submitting: string;
    isPasswordsMatch: boolean;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handlePasswordChange: (
    data:AdminData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      tempPasswordState: string[],
      validatePassword: (password: string, array: string[], setpasswordValidityMessage: React.Dispatch<React.SetStateAction<string[]>>) => void
    ) => void;
    handleConfirmPasswordsChange: (
        data:AdminData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      passwordsMatch: (password: string, confirmatoryPassword: string) => boolean
    ) => void;
    checkIfPasswordsMatch: (
      password: string,
      confirmatoryPassword: string
    ) => boolean;
    showPassword: () => void;
    navigateToVerifyEmailPage:()=>void;
    handleSubmit:(data:AdminData,event: React.FormEvent<HTMLFormElement>,domain:string)=>void;
    handleChange:(data:AdminData, event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
   
  }