const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'ababanna'

const encryptPassword = (password) => {
  return bcrypt.hash(password, 10)
}
const decodeJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
}

const createLoginJWT = (user) => {
  return jwt.sign({ id: user.id, email: user.email, username: user.firstName, role: 'investor', verified: !user.verificationCode ? true : false, hasInvested: user.hasInvested }, JWT_SECRET);
}
const createAdminLoginJWT = (user) => {
  return jwt.sign({ username: user.name, email: user.email, verified: !user.verificationCode ? true : false, role: 'admin', }, JWT_SECRET);
}

const generateEmailVerificationToken = (id) => {
  return jwt.sign({ id: id, timeOfCreation: new Date() }, JWT_SECRET);
}

const generatePasswordResetToken = (id, email, role) => {
  return jwt.sign({ id: id, email: email, timeOfCreation: new Date(), role: role }, JWT_SECRET);
}

const createNewPasswordToken = (id, email) => {
  return jwt.sign({ id: id, email: email, }, JWT_SECRET);
}

module.exports = {
  generatePasswordResetToken,
  decodeJWT,
  generateEmailVerificationToken,
  createLoginJWT,
  encryptPassword,
  createNewPasswordToken,
  createAdminLoginJWT
}
