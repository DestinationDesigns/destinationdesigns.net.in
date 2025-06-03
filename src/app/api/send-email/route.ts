import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    
    let emailContent = '';
    let subject = '';

    if (type === 'career') {
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const position = formData.get('position');
      const resume = formData.get('resume') as File;
      const portfolio = formData.get('portfolio') as File;

      subject = `New Career Application - ${position}`;
      emailContent = `
        New Career Application Received:
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Position: ${position}
      `;

      // Send email with attachments
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@destinationdesigns.net.in',
        subject: subject,
        text: emailContent,
        attachments: [
          {
            filename: resume.name,
            content: Buffer.from(await resume.arrayBuffer())
          },
          {
            filename: portfolio.name,
            content: Buffer.from(await portfolio.arrayBuffer())
          }
        ]
      });
    } else if (type === 'contact') {
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const message = formData.get('message');

      subject = 'New Contact Form Submission';
      emailContent = `
        New Contact Form Submission:
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `;

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@destinationdesigns.net.in',
        subject: subject,
        text: emailContent
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 