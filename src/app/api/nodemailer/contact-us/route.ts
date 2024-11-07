import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { subject, message, userId, userName, userEmail } = await req.json();

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `${userName} <${userEmail}>`,
            to: process.env.EMAIL_TO,
            subject: `Talent Hive Inquiry: ${subject}`,
            text: `
Dear Talent Hive Support Team,

My name is ${userName} (${userEmail}), and I am reaching out regarding the following:

Subject: ${subject}

Message:
${message}

I would appreciate any assistance or information you could provide on this matter. I look forward to hearing back from you at your earliest convenience.

Thank you for your attention.

Best regards,
${userName}
User ID: ${userId}
Email: ${userEmail}
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error sending email', error }), {
            status: 500,
        });
    }
}
