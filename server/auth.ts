import { Request,Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Investor } from './types/investorTypes'
import { Admin } from './types/adminTypes'
const JWT_SECRET = 'ababanna'

export const encryptPassword = (password:string) => {
  return bcrypt.hash(password, 10)
}
export const decodeJWT = (token:string) => {
  return jwt.verify(token, JWT_SECRET);
}

export const createLoginJWT = (user:Investor) => {
  return jwt.sign({ id: user.
    id, email: user.email, username: user.firstName, role: 'investor', verified:user.isVerified, hasInvested: user.hasInvested }, JWT_SECRET);
}
export const createAdminLoginJWT = (user:Admin) => {
  return jwt.sign({ username: user.name, email: user.email, verified: user.isVerified, role: 'admin', }, JWT_SECRET);
}

export const generateEmailVerificationToken = (id:number) => {
  const token = jwt.sign({ id: id, timeOfCreation: new Date() }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return token;
};
export const generatePasswordResetToken = (id: number, email: string, role: string) => {
  return jwt.sign({ id: id, email: email, timeOfCreation: new Date(), role: role }, JWT_SECRET);
}

export const createNewPasswordToken = (id:number, email: string) => {
  return jwt.sign({ id: id, email: email, }, JWT_SECRET);
}

export const isAdmin =(req:Request, res:Response, next: any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded?decoded.role:'';
    if (role === 'admin'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};

export const isInvestor =(req:Request, res:Response, next:any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded.role;
    if (role === 'investor'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};




