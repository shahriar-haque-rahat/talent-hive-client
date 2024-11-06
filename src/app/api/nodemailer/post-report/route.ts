import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { message, userId, userName, userEmail, postId, postUserId, postUserName, postUserEmail } = await req.json();

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
            subject: 'New Report',
            text: `
                A new report has been submitted.

                Reported Post ID: ${postId}
                Reporter: ${userName} (${userEmail}) (ID: ${userId})
                Post Owner Info: ${postUserName} (${postUserEmail}) (ID: ${postUserId})

                Report Message:
                ${message}

                Please review this report at your earliest convenience.
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
