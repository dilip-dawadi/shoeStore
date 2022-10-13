import { createTransport } from "nodemailer";

export const sendEmail = async (email, subject, text) => {
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
        const info = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
            html: `<html>
            <head>
            </head>
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
        });
        console.log("Message sent: %s", info);
        return { status: 200 };
    } catch (error) {
        return { status: error.responseCode };
    }
};