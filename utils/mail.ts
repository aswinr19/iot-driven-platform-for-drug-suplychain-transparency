import nodemailer from 'nodemailer'

export const TEMPERATURE_THRESHOLD = 25

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.NEXT_PUBLIC_SENDER_MAIL_ID,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
    },
})

export async function sendAlertEmail(temperature: number) {
    const mailOptions = {
        from: process.env.NEXT_PUBLIC_SENDER_MAIL_ID,
        to: process.env.NEXT_PUBLIC_RECEIVER_MAIL_ID,
        subject: 'High Temperature Alert in Drug Supply Chain',
        text: `Alert: The current temperature (${temperature}°C) has exceeded the threshold of ${TEMPERATURE_THRESHOLD}°C.`,
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log('Alert email sent successfully')
    } catch (err) {
        console.log(`error sending email alert :( - details ${err}`)
    }
}
