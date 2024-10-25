export const generatePriceIncreaseTemplate = (
  coin: string,
  previousPrice: number,
  currentPrice: number,
  percentageIncrease: number,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Price Increase Notification</title>
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
        📈 Price Increase Notification
      </div>
      <div class="content">
        <p>Dear User,</p>
        <p>
          We wanted to inform you that the price of the ${coin} has changed by ${percentageIncrease} within last hour.
          Here's the update:
        </p>
        <div class="price-info">
          <p>Previous Price: <span id="previous-price">$${previousPrice}</span></p>
          <p>Current Price: <span id="current-price">$${currentPrice}</span></p>
          <p>Percentage Increase: <span id="percentage-increase">${percentageIncrease}%</span></p>
        </div>
        <p>
          This increase may have an impact on your portfolio, so please review
          your investments accordingly.
        </p>
        <p>Best regards,<br />Crypto Portfolio</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Crypto Team. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
