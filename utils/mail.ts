import nodemailer from 'nodemailer'

export const TEMPERATURE_THRESHOLD = 25

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: '',
        pass: '',
    },
})

export async function sendAlertEmail(temperature: number) {
    const mailOptions = {
        from: '',
        to: '',
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
