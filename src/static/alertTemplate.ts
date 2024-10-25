export const alertTemplate = (
  coin: string,
  price: number,
  alertName: string,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${alertName} alert Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 20px;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        color: #333333;
        font-size: 24px;
        margin-bottom: 20px;
      }
      .content {
        color: #555555;
        font-size: 16px;
      }
      .content p {
        line-height: 1.5;
      }
      .price-info {
        margin: 20px 0;
        font-weight: bold;
      }
      .price-info span {
        color: #28a745; /* Green color for positive increase */
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #999999;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        📈 ${alertName} Alert Notification
      </div>
      <div class="content">
        <p>Dear User,</p>
        <p>
          This is an notification regarding the alert for the ${coin}, the new price of ${coin} is ${price}.
          Here's the update:
        </p>
        <p>
          This increase may have an impact on your portfolio, so please review
          your investments accordingly.
        </p>
        <p>Best regards,<br />The Crypto Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Crypto Team. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
