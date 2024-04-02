const CLIENT_DOMAIN = 'http://localhost:3000/'
const SERVER_DOMAIN = 'http://localhost:8000/'

const COMPANY_NAME = 'Cassock wealth Investment'

const COMPANY_VERIFICATION_EMAIL = 'iroagba97@gmail'
const COMPANY_REFERRAL_EMAIL = 'iroagba97@gmail'

const TOKEN_EXPIRATION_TIME = '10 minutes'

 const VERIFY_EMAIL_REDIRECT_ROUTE = CLIENT_DOMAIN+'verify-email' 
 const ADMIN_CLIENT_DASHBOARD_ROUTE = CLIENT_DOMAIN+'admin/dashboard'
 const ADMIN_CLIENT_CHANGE_PASSWORD_ROUTE = CLIENT_DOMAIN +'admin/change-password'
 const EMAIL_VERIFICATION_ERROR_ROUTE = CLIENT_DOMAIN + 'email-verification-error'
 const SERVER_VERIFY_EMAIL_ROUTE = SERVER_DOMAIN+'verify-email'
 const REQUEST_PASSWORD_RESET = CLIENT_DOMAIN+'password-reset'
 const JWT_SECRET = 'ababanna'

 const CLIENT_DASHBOARD_ROUTE = CLIENT_DOMAIN+'dashboard'

 const ALREADY_VERIFIED_ROUTE = CLIENT_DOMAIN+'already-verified'

 const INVESTMENT_TENURE = 14

 const PROMO_PERCENT = 0.15
 const REFERRAL_BONUS_PERCENT = 0.15
 module.exports={
    COMPANY_REFERRAL_EMAIL,
    COMPANY_VERIFICATION_EMAIL,
    TOKEN_EXPIRATION_TIME, 
    COMPANY_NAME, 
    SERVER_VERIFY_EMAIL_ROUTE,
    VERIFY_EMAIL_REDIRECT_ROUTE,
    ADMIN_CLIENT_DASHBOARD_ROUTE,
    ADMIN_CLIENT_CHANGE_PASSWORD_ROUTE,
    EMAIL_VERIFICATION_ERROR_ROUTE,
    CLIENT_DASHBOARD_ROUTE,
    ALREADY_VERIFIED_ROUTE,
    EMAIL_VERIFICATION_ERROR_ROUTE,
    ADMIN_CLIENT_DASHBOARD_ROUTE,
    REQUEST_PASSWORD_RESET,
    JWT_SECRET,
    PROMO_PERCENT,
    REFERRAL_BONUS_PERCENT,
    INVESTMENT_TENURE
}
