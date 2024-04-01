const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'ababanna'

 const createLoginJWT =(user,role)=>{
    return jwt.sign({ name: user.firstName|user.name, role:role,hasInvested:user.hasInvested }, JWT_SECRET);
}

const decodeJWT = (token)=>{
    return jwt.verify(token, JWT_SECRET);
}

const encryptPassword = (password)=>{
   return bcrypt.hash(password, 10)
}

const createVerificationJWT =(id)=>{
    return jwt.sign({ id:id, status:'email-verification'}, JWT_SECRET);
}

const generateEmailVerificationToken = (email) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '10m' });
  }





// Helper functions (replace with your implementation)
function verifyPasswordResetToken(token) {
    // Implement logic to verify and decode the password reset token using a secret key
  }
  
  function generatePasswordResetToken(userId) {
    // Implement logic to generate a new password change token for the user
  }
module.exports ={generatePasswordResetToken, verifyPasswordResetToken,verifyPasswordResetToken,generateEmailVerificationToken,createLoginJWT,decodeJWT,encryptPassword,createVerificationJWT}
