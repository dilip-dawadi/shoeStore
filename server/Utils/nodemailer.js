import { createTransport } from "nodemailer";

export const createMailTransporter = async () => {
  try {
    const transporter = createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    return transporter;
  } catch (error) {
    return { status: error.responseCode };
  }
};

export const sendVerificationEmail = async (email, subject, text) => {
  try {
    const transporter = await createMailTransporter();
    const mailOptions = {
      from: `"Mern Shoes" <${process.env.USER}>`, // sender address
      to: email,
      subject: subject,
      text: text,
      html: `<html>
            <body>
                <div class="topper" style="
                            background-color: #FE3E69;
                            width: 100%;
                            height: 100%;
                            color: white;
                            font-family: sans-serif;
                            padding: 5px;
                            border-radius: 12px;
                            text-align: center;">
                    <h1 style="padding: 5px 0px 0px 0px;">${subject}</h1>
                    <p style="padding: 0px 0px 10px 0px;">
                    Thank you for registering with us. Please click on the link below to verify your email address. Note: This link will expire in 24 hours</p>
                    <a href=${text} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;">Verify Account</a>
                    <p style="padding: 10px 0px 0px 0px;">If you did not register with us, please ignore this email.</p>
                <hr style="border-top: 1px solid #fff; border-left: 0px, marginTop:5px">
                <div class="footer content" style="margin: 0 auto;width: fit-content;">
                    <p
                        style="margin-left: auto;margin-right: auto;color: white;font-size: small;">
                        Shoe Store, Your dream footwear store. Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.</p>
                        <p style="margin-left: auto;margin-right: auto; padding: 0px 0px 10px 0px;color: white;font-size: small;">Explore our collection of shoes, sandals, boots, sneakers, and more.</p>
                        <p><a href=${process.env.BASE_URL} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;"> Shoes Store For You</a></p>
                </div>
                <p style="padding: 10px 0px 10px 0px"> &copy; 2022 Shoe Store. All rights reserved.</p>
            </div>
            </body>
        </html>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent" + info.response);
    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { status: error.responseCode };
  }
};

export const CheckoutEmail = async (subject, user, total, cart, products) => {
  try {
    const transporter = await createMailTransporter();
    const mailOptions = {
      from: `"Mern Shoes" <${process.env.USER}>`, // sender address
      to: user.email,
      subject: subject,
      text: "Thank you for shopping with us",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Summary</title>
                <style>
                    .main {
                        background-color: #FE3E69;
                        width: 90%;
                        height: 100%;
                        margin: auto;
                        color: white;
                        font-family: sans-serif;
                        padding: 10px;
                        border-radius: 12px;
                        text-align: center;
                    }
                    .table {
                        width: 70%;
                        margin: auto;
                        border-collapse: collapse;
                        border: 1px solid white;
                        border-radius: 12px;
                        text-align: center;
                    }
                    .table-child {
                        border: 1px solid white; border-collapse: collapse; padding: 8px 5px
                    }
                    .table-head {
                        border: 1px solid white; border-collapse: collapse; padding: 10px
                    }
                    @media only screen and (max-width: 600px) {
                        .main {
                            width: 95%;
                            margin: auto;
                        }
                        .table {
                            width: 98%;
                            margin: auto;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="main">
                    <h1>Order Confirmation</h1>
                    <p>                        
                        Dear ${
                          user.name
                        }, Thank you for shopping with us. Use your order id ${
        user._id
      } to track your order.
                    </p>
                    <p>
                    The total amount of your order is ${total}$.
                    </p>
                    <h2>Order Summary</h2>
                    <table class="table">
                        <tr class="table-head">
                            <th class="table-child">Product Name</th>
                            <th class="table-child">Quantity</th>
                            <th class="table-child">Price</th>
                            <th class="table-child">Address</th>    
                        </tr>
                        <tr class="table-head">
                            <td class="table-child">${products.map((item) => {
                              return `${item.title}`;
                            })}</td>
                            <td class="table-child">${products.map((item) => {
                              const quantity = cart.find(
                                (cartItem) =>
                                  cartItem.cartId === item._id.toString()
                              ).quantity;
                              return `${quantity}`;
                            })}</td>
                            <td class="table-child">${products.map((item) => {
                              return `${item.price}`;
                            })}</td>
                            <td class="table-child">${user.address}</td>
                        </tr>
                    </table>
                <p style="padding: 10px 0px 0px 0px;">Thank you for shopping with us. Your order has been received and is being processed. You will receive a confirmation email once your order has shipped.</p>
                <p style="padding: 10px 0px 0px 0px;">If you did not place this order, please ignore this email.</p>
                <hr style="border-top: 1px solid #fff; border-left: 0px, marginTop:5px" />
                <div class="footer content" style="margin: 0 auto;width: fit-content;">
                    <p style="margin-left: auto;margin-right: auto;color: white;font-size: small;">
                        Shoe Store, Your dream footwear store. Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.</p>
                    <p style="margin-left: auto;margin-right: auto; padding: 0px 0px 10px 0px;color: white;font-size: small;">Explore our collection of shoes, sandals, boots, sneakers, and more.</p>
                    <p><a href=${
                      process.env.BASE_URL
                    } style="color: white; padding: 10px 20px 10px 20px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;"> Shoes Store For You</a></p>
                </div>
                <p style="padding: 10px 0px 10px 0px"> &copy; 2022 Shoe Store. All rights reserved.</p>
            </div>
            </body>
            </html>`,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};
