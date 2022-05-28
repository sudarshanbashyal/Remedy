import { MailData } from "@sendgrid/helpers/classes/mail";
import sendGrid, { MailDataRequired, ResponseError } from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const SUBJECT_VERIFICATION = "Verification";
const SUBJECT_PASSWORD_RESET = "Password Reset";

const {
	SENDGRID_API_KEY,
	SENDGRID_VERIFICATION_TEMPLATE_ID,
	SENDGRID_SENDER_EMAIL,
} = process.env;
if (SENDGRID_API_KEY) {
	sendGrid.setApiKey(SENDGRID_API_KEY);
}

export const sendVerificationEmail = async (
	email: string,
	firstName: string,
	lastName: string
) => {
	try {
		const msg: MailData = {
			to: email,
			from: SENDGRID_SENDER_EMAIL || "",
			templateId: SENDGRID_VERIFICATION_TEMPLATE_ID,
			subject: SUBJECT_VERIFICATION,
			dynamicTemplateData: {
				first_name: firstName,
				last_name: lastName,
			},
		};

		const mailResponse = await sendGrid.send(msg as MailDataRequired);
		console.log(mailResponse);
	} catch (error) {
		let err = error as ResponseError;

		console.log(err.response.body);
	}
};
