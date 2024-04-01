const getOrdinalSuffix = (number)=>{
    const ones = number % 10;
    const tens = Math.floor(number / 10) % 10;
  
    if (tens !== 1) {
      switch (ones) {
        case 1:
          return number + 'st';
        case 2:
          return number + 'nd';
        case 3:
          return number + 'rd';
        default:
          return number + 'th';
      }
    } else {
      return number + 'th'; 
    }
  }

const getVerificationEmailContent = (verificationUrl,TOKEN_EXPIRATION_TIME,COMPANY_NAME) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body class="text-center">
    <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
    <p  class="text-center">Thank you for signing up. To complete your registration, please click the button below to verify your email address.</p>
    <p  class="text-center">
      <a href="${verificationUrl}" class="btn btn-primary">Verify Your Email</a>
    </p>
    <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
    <p>${verificationUrl}</p>
    <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
    <p>Sincerely,</p>
    <p>${COMPANY_NAME} Team</p>
  </body>
  </html>`;
  }
module.exports = {getOrdinalSuffix, getVerificationEmailContent}