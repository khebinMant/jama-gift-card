const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { to, message, gifter } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa tu servicio de correo preferido
    auth: {
      user: 'muyapp2020@gmail.com',
      pass: 'ugqc cwoz sxen qvjr',
    },
  });
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #e6f7ff;
          }
          .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background: linear-gradient(to bottom, #a0e7e5, #e6f7ff);
              padding: 20px;
              text-align: center;
          }
          .header h1 {
              color: #007b8f;
              font-size: 24px;
          }
          .message {
              padding: 20px;
              text-align: center;
          }
          .message p {
              font-size: 18px;
              color: #4d4d4d;
              line-height: 1.5;
          }
          .gift-box {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              border-radius: 10px;
              margin: 20px;
          }
          .gift-box img {
            display:flex;
            flex-direction:column;
            margin:auto;
            justify-content:center;
            align-items:center;
             width: 70%;
             height: auto;
             margin-bottom: 20px;
          }
          .gift-box p {
              font-size: 20px;
              color: #007b8f;
              font-weight: bold;
          }
          .cta-button {
              background-color: cyan;
              color: #007b8f;
              padding: 15px 30px;
              font-size: 18px;
              text-align: center;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
        .message-mini{
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #007b8f;
        }
            .message-order{
              padding: 10px;
              text-align: center;
              font-size: 18px;
              color: black;
        }
          .footer {
              background-color: #e6f7ff;
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #007b8f;
          }
          .wave {
              background-image: url('https://example.com/path-to-waves.png');
              background-repeat: no-repeat;
              background-size: cover;
              height: 100px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>Alguien te aprecia mucho 🩵 </h1>
          </div>
          <div class="message">
              <p> ${gifter} te ha regalado un delicioso detalle para que lo disfrutes!</p>

              <p> <b>${message}</b> </p>
          </div>
          <div class="gift-box">
              <img src="https://github.com/khebinMant/jama-gift-card/blob/main/src/img/1.png?raw=true" alt="Regalo" />
              <img src="https://github.com/khebinMant/jama-gift-card/blob/main/src/img/2.png?raw=true" alt="Regalo" />
              <img src="https://github.com/khebinMant/jama-gift-card/blob/main/src/img/4.png?raw=true" alt="Regalo" />
            <p>¡Disfruta tu regalo!</p>
          </div>
                    <p class="message-mini">Puedes canjearlo en cualquiera de nuestros Locales a nivel nacional</p>
                            <p class="message-order">N# Orden: 0080878</p>
          <div class="wave"></div>
          <div class="footer">
              <p>¡Que tengas un excelente día lleno de sorpresas!</p>
          </div>
      </div>
  </body>
  </html>
    `;

  const mailOptions = {
    from: 'muyapp2020@gmail.com',
    to: to,
    subject: 'Tenemos una sorpresa para ti!',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado exitosamente' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};