import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import { Investor,Referral,Notification } from '../types/investorTypes';
import { Admin } from '../types/adminTypes';

import { 
  generatePasswordResetToken, 
  decodeJWT, 
  generateEmailVerificationToken, 
  createLoginJWT, 
  encryptPassword, 
  createNewPasswordToken, 
  createAdminLoginJWT 
} from '../auth';
import { customError } from '../helpers';
import { 
  REFERRAL_BONUS_PERCENT, 
  ALREADY_VERIFIED_ROUTE, 
  EMAIL_VERIFICATION_ERROR_ROUTE, 
  ADMIN_CLIENT_DASHBOARD_ROUTE, 
  NEW_PASSWORD_URL, 
  CLIENT_DASHBOARD_ROUTE, 
  EMAIL_VERIFICATION_ROUTE 
} from '../config';
import { sendVerificationEmail, sendReferalCompletedMail, sendPasswordResetEmail } from '../mailService'





export  const createAdmin= async (req: Request, res: Response): Promise<Response> => {
    try {
      let { name, email, password } = req.body as {
        name:string,
        email:string,
        password:string
      };
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        throw customError( 'Admin already exists',409);
      }

      password = await encryptPassword(password);
      const admin = await Admin.create({ name, email, password });
      const verificationToken = generateEmailVerificationToken(admin.id);
      admin.verificationToken = verificationToken;
      await admin.save();

      await sendVerificationEmail(admin, verificationToken);
      return res.status(201).json(verificationToken);
    } catch (error:any) {
      console.error('error in createAdmin function', error)
      return res.status(error.status).json(error);
    }
  }

  export  const  createInvestor= async (req: Request, res: Response) => {
    try {
      let { firstName, lastName, dateOfBirth, email, password, gender, country, bank, referralCode } = req.body;

      const existingInvestor = await Investor.findOne({ where: { email } });

      if (existingInvestor) {
        throw customError( 'Investor already exists',409);
      }

      password = await encryptPassword(password);
      const newInvestor = await Investor.create({ firstName, lastName, dateOfBirth, email, password, gender, country, bank });
      newInvestor.referralCode = newInvestor.id + 2222;

      const token = generateEmailVerificationToken( newInvestor.id);
      newInvestor.verificationToken = token;
     
      if (referralCode) {
        const refereeInvestor = await Investor.findOne({ where: { referralCode: referralCode } });
        if (refereeInvestor) {
          newInvestor.referrerId = refereeInvestor.id;
          await Referral.create({referrerId: refereeInvestor.id,referredId:newInvestor.id});
          await Notification.create({ investorId: refereeInvestor.id, title: 'Referral Registration', message: `Thank you!\n You just referred ${newInvestor.firstName} ${newInvestor.lastName}. You'd earn ${REFERRAL_BONUS_PERCENT*100}% on the first deposit` });
          await sendReferalCompletedMail(refereeInvestor, newInvestor);
        } 
      }

      await newInvestor.save();
      await sendVerificationEmail(newInvestor, token);

      return res.status(201).json(token);
    } catch (error:any) {
      console.error('Error registerInvestor function:', error);
      res.status(error.status).json(error)
    }
  }

  export  const login= async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
  
    try {
      let user:any= await Admin.findOne({ where: { email } });
      let userType = 'admin';
  
      if (!user) {
        user = await Investor.findOne({ where: { email } });
        userType = 'investor';
      }
      
      if (!user) {
        throw  customError('user not found',404);
      }

      if (!user.isVerified) {
        const token = generateEmailVerificationToken( user);
       user.verificationToken = token
       user.save()

        await sendVerificationEmail(user,token);
        return res.status(201).json(token);
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {

      let loginToken;

      if (userType === 'investor') {
      loginToken = createLoginJWT(user)
      }else{
        loginToken = createAdminLoginJWT(user)
      }

      return res.status(200).json({user:userType, token:loginToken})
      
      }else{
        throw customError('wrong password',403);
      }
    } catch (error:any) {
      console.error('error in login function',error);
      return res.status(error.status).json(error);
    }
  }
  
  export  const verifyMail= async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
      const decoded:any = decodeJWT(token);
      if (!decoded) {
        return res.status(401).redirect(EMAIL_VERIFICATION_ERROR_ROUTE);
      }
      const creationTimeMs = new Date(decoded.timeOfCreation).getTime();
      const currentTimeMs = Date.now();
      const expirationTimeMs = creationTimeMs + (10 * 60 * 1000); // Adding 10 minutes in milliseconds
      
      if (currentTimeMs >= expirationTimeMs) {
        return res.status(401).redirect(`${EMAIL_VERIFICATION_ROUTE}/?token=${token}`);
      }

      let user:any = await Admin.findOne({ where: { verificationToken: token } });
      let userType = 'admin';
      if (!user) {
        user = await Investor.findOne({ where: { verificationToken: token } });
        userType = 'investor';

        if (!user) {
          throw new Error('Illegal request, no such user');
        }
      }
      if (user.isVerified) {
        return res.redirect(ALREADY_VERIFIED_ROUTE);
      }
      user.isVerified= true ;
      await user.save();

      let redirectRoute = userType === 'admin' ? ADMIN_CLIENT_DASHBOARD_ROUTE : CLIENT_DASHBOARD_ROUTE;
      const jwToken = userType === 'admin' ? createAdminLoginJWT(user) : createLoginJWT(user);

      return res.redirect(`${redirectRoute}/?token=${jwToken}`);
    } catch (error:any) {
      console.error('Error verifying email:', error);
      return res.status(error.status).json(error);
    }
  }

 export const resendVerificationToken= async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      let user:Admin|Investor|null= await Admin.findByPk(id);
      if (!user) {
        user = await Investor.findByPk(id);
        if (!user) {
          throw new Error('illegal request no such user')
        }
      }
      const newToken = generateEmailVerificationToken( user.id);
      user.verificationToken = newToken;
      user.save();
      await sendVerificationEmail(user, newToken); 
      return res.status(200).json(newToken); 
    } catch (error) {
      res.status(500).json(error);
    }
  }

  export  const  requestPasswordReset=async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
  
    try {
      let user:Admin|Investor|null= await Admin.findOne({ where: { email } });
      let role = 'admin';
  
      if (!user) {
        user = await Investor.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        } else {
          role = 'investor';
        }
      }
  
      const resetToken = generatePasswordResetToken(user.id, user.email, role);
      user.changePasswordToken = resetToken;
      await user.save();
  
      await sendPasswordResetEmail(user, resetToken);
  
      return res.status(200).send(resetToken);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  
  export  const confirmMailForPasswordChange= async (req: Request, res: Response) => {
    const { token } = req.params;
    console.log(token)
    try {

      let user:Admin|Investor|null = await Admin.findOne({ where: { changePasswordToken: token } });

      if (!user) {
        user = await Investor.findOne({ where: {changePasswordToken: token } })
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
      }

      const newtoken = createNewPasswordToken(user.id,user.email)

      return res.redirect(`${NEW_PASSWORD_URL}/?token=${newtoken}`)

    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  export  const changePassword= async (req: Request, res: Response): Promise<Response> => {
    const {id}= req.params
    let { password } = req.body;
    try {
      let user:any = await Admin.findByPk(id)
      let role = 'admin'
      if (!user) {
        
        user = await Investor.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }else{
          role = 'investor'
        }
      }
      password = await encryptPassword(password)
      user.password = password
      if (!user.isVerified) {
        const token = generateEmailVerificationToken( user.id);

       user.verificationToken=token
       await user.save()
        await sendVerificationEmail(user,token);
        return res.status(201).json(token);
      }
      let loginToken;
      if (role == 'investor'){
        loginToken = createLoginJWT(user) 
      }else{
      loginToken = createAdminLoginJWT(user)
      }
      
   
      return res.status(200).json(loginToken)

    } catch (error) {
      console.error('Error changePassword :', error);
      return res.status(500).json(error);
    }
  }



