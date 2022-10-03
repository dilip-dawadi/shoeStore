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
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
            html: `<div
			style="
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  flex-direction: column;
                width: 99%;
                margin: 0 auto;
			  background-color: #f5f5f5;
			  padding: 30px;
			  border-radius: 10px;
			  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			">
					<div>
						<div variant="h6" style="text-align: center; letter-spacing: 2px; margin: 10px auto;">Welcome to Rhino spot resport and kalij farm
						</div>
							<div variant="body1" style="text-align: center; letter-spacing: 2px; color: gray; margin: 30px auto;">Click Here 👇 and ${subject}</div>
							<div variant="body1" style="text-align: center; letter-spacing: 1px; color: gray; margin: 20px auto;">${text}</div>
							<div variant="body1" style="text-align: center; letter-spacing: 2px; margin: 10px auto;">Thank you for choosing us</div>
						</div>
					</div>`,
        });
    } catch (error) {
        return error;
    }
};