import nodemailer from 'nodemailer';
import { User } from '../entities/userEntity';
import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

interface EmailOptions{
    to: string;
    subject: string;
    text?: string;
    html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> =>{
    try{
        const info = await transporter.sendMail({
            from: `${process.env.GMAIL_USER}`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
        console.log('Message sent: %s', info.messageId)

    }catch(error){
        console.error('Error sending email:', error)
    }
}

export const sendNewUserEmailNotification = async (newUser: User): Promise<void> =>{
    const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

    if(!recipientEmail){
        console.error('ADMIN_NOTIFICATION_EMAIL not set in environment variable. Cannot send new user notification')
        return;
    }

    if(!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD){
        console.error('Gmail credentials not set in environment variables. Cannot send email.')
        return;
    }

    const subject =    'New User Registered in you Application';
    const htmlBody = `
     <h1>New User Registration!</h1>
    <p>A new user has just signed up for your application.</p>
    <ul>
      <li><strong>ID:</strong> ${newUser.id}</li>
      <li><strong>Email:</strong> ${newUser.email}</li>
      ${newUser.firstName? `<li><strong>Username:</strong> ${newUser.firstName} ${newUser.lastName}</li>` : ''}
      <li><strong>Registered At:</strong> ${new Date().toLocaleString()}</li>
    </ul>
    <p>Cheers,</p>
    <p>Your Application Bot</p>
    `;
      const textBody = `
    New User Registration!
    A new user has just signed up for your application.
    - ID: ${newUser.id}
    - Email: ${newUser.email}
    ${newUser.firstName ? `- Username: ${newUser.firstName}` : ''}
    - Registered At: ${new Date().toLocaleString()}
    Cheers,
    Your Application Bot
  `;

    await sendEmail({
    to: recipientEmail,
    subject: subject,
    text: textBody,
    html: htmlBody,
  });
}
