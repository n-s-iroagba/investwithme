function findManagerWithHighestMinInvestment(managers, amount) {
  let highestMinInvestmentManager = null;
  let highestMinInvestment = -Infinity;

  for (const manager of managers) {
    if (manager.minimumInvestmentAmount <= amount && manager.minimumInvestmentAmount > highestMinInvestment) {
      highestMinInvestment = manager.minimumInvestmentAmount;
      highestMinInvestmentManager = manager;
    }
  }

  return highestMinInvestmentManager;
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

  const getNewPasswordEmailContent = (verificationUrl,TOKEN_EXPIRATION_TIME,COMPANY_NAME) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change your password</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
  <body class="text-center">
    <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
    <p  class="text-center">Thank you made a request to change your password. Kindly click the link or buttion below to change your password.</p>
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
  const formatEndDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };
  
  const checkInvestmentStatus = async (investment) => {
    try {
      const currentDate = new Date();
      const investmentDate = new Date(investment.investmentDate);
      const threeDaysLater = new Date(investmentDate);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  
      if (investment.amountDeposited < investment.amount && currentDate > threeDaysLater) {
        investment.isPaused = true;
        await investment.save();
        console.log('Investment paused successfully.');
      } else {
        console.log('Investment does not meet the criteria for pausing.');
      }
    } catch (error) {
      console.error('Error checking investment status:', error);
    }
  };

  

module.exports = {findManagerWithHighestMinInvestment, getVerificationEmailContent,getNewPasswordEmailContent,formatEndDate,checkInvestmentStatus}