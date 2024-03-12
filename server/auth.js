const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'ababanna'

 const createJWT =(user)=>{
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
}

const decodeJWT = (token)=>{
    return jwt.verify(token, 'yourSecretKey');
}
const encryptPassword = (password)=>{
    console.log(bcrypt.hash(password, 10))
   return bcrypt.hash(password, 10)
}
const createVerificationJWT =(user)=>{
    return jwt.sign({ email: user.email,isVerified:'yet-to-be' }, JWT_SECRET);
}
const generateEmailVerificationToken = (email) => {
    return jwt.sign({ email }, 'yourSecretKey', { expiresIn: '10m' });
  }
module.exports ={generateEmailVerificationToken,createJWT,decodeJWT,encryptPassword,createVerificationJWT}
