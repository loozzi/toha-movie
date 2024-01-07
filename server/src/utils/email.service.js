const nodemailer = require('nodemailer')

const sendEmail = async ({ host, port, auth, to, subject, body }) => {
	const tranporter = nodemailer.createTransport({
		host, port, auth, secure: true
	})

	await tranporter.sendMail({
		from: auth.user,
		to: to,
		subject: subject,
		html: body
	})
}

const generateTemplateOTP = (otp) => {
	return {
		subject: 'TohaMovie - OTP verification code',
		body:
			`
			<div style="width: 500px; margin: 0 auto;">
				<div style="display:flex; border-bottom: 1px solid #aaa; padding-bottom: 16px;">
					<h1>Verification account</h1>   
				</div>
				<p>Your OTP code is: </p>
				<h2><strong>${otp}</strong></h2>
				<p>Please enter this OTP code to verify your account.</p>
				<p>This OTP will epxire later <strong>30</strong> minutes.</p>
    	</div>
		`
	}
}

module.exports = {
	hostSendOTP: async (to, otp) => {
		const { subject, body } = generateTemplateOTP(otp)
		await sendEmail({
			host: process.env.EMAIL_HOST,
			port: 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			},
			to,
			subject,
			body
		})
	},
	hostSendResetPassword: async (to, token) => {
		console.log("todo")
	}
}