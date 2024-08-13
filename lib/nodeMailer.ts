import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.elo-law-ethiopia.com",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASS,
  },
  secure: true,
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailOptions = (
  name: string,
  email: string,
  phone: string,
  message: string,
  subject: string
) => {
  return {
    from: process.env.GOOGLE_APP_USER,
    to: "eferemh@yahoo.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name} \n Email: ${email} \n Phone Number: ${phone} \n Subject: ${subject} \n\n Message: ${message}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html style="background-color:#f3f4f6" dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">New contact form report!<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div></div><body><style>
    @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      mso-font-alt: 'Verdana';
      src: url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    }

    * {
      font-family: 'Roboto', Verdana;
    }
  </style><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;width:300px;height:100%;margin-top:3rem;margin-bottom:3rem;border-width:1px;border-color:#acacace4;border-style:solid;border-radius:0.125rem"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;display:flex;align-items:flex-start;justify-content:center;text-align:center;padding-bottom:1.5rem"><tbody><tr style="width:100%"><td><img alt="Logo" src="https://www.elo-law-ethiopia.com/images/Logo.png" style="display:block;outline:none;border:none;text-decoration:none;padding-top:2.5rem;padding-bottom:2rem;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;width:100px;height:100px;border-radius:100%;"/><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto"><tbody><tr style="width:100%"><td><table align="center" width="100%" class="text-gray" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;font-size:1.875rem;line-height:2.25rem;letter-spacing:0.05em;font-weight:300;padding-left:1.5rem;padding-right:1.5rem;margin-bottom:1.75rem"><tbody><tr style="width:100%"><td>Contact Report</td></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:1.25rem;margin:0px;display:flex;flex-direction:column;padding-left:1.5rem;padding-right:1.5rem;justify-content:flex-start;text-align:start;align-items:flex-start;min-width:500px"><tbody><tr style="width:100%"><td><p class="text-gray " style="font-size:1.125rem;line-height:1.75rem;margin:0px;display:inline;font-weight:300;width:100%">Name:<p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:600;display:inline;margin-left:1.25rem">${name}</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0.5rem;margin-bottom:0px;padding-top:0px;padding-bottom:0px;height:1px;border-width:0px;border-radius:0.125rem;background-color:#1926552b;min-width:350px"><tbody><tr style="width:100%"><td></td></tr></tbody></table></p><p class="text-gray " style="font-size:1.125rem;line-height:1.75rem;margin:0px;margin-top:0.75rem;display:inline;font-weight:300;width:100%">Email:<a href="mailto:${email}" style="color:#067df7;text-decoration:none;font-weight:600;display:inline;margin-left:1.25rem;font-size:0.875rem;line-height:1.25rem" target="_blank">${email}</a><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0.5rem;margin-bottom:0px;padding-top:0px;padding-bottom:0px;height:1px;border-width:0px;border-radius:0.125rem;background-color:#1926552b;min-width:350px"><tbody><tr style="width:100%"><td></td></tr></tbody></table></p><p class="text-gray " style="font-size:1.125rem;line-height:1.75rem;margin:0px;margin-top:0.75rem;display:inline;font-weight:300;width:100%">Phone:<p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:600;display:inline;margin-left:1.25rem">${phone}</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0.5rem;margin-bottom:0px;padding-top:0px;padding-bottom:0px;height:1px;border-width:0px;border-radius:0.125rem;background-color:#1926552b;min-width:350px"><tbody><tr style="width:100%"><td></td></tr></tbody></table></p><p class="text-gray " style="font-size:1.125rem;line-height:1.75rem;margin:0px;margin-top:0.75rem;display:inline;font-weight:300;width:100%">Subject:<p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:600;display:inline;margin-left:1.25rem">${subject}</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0.5rem;margin-bottom:0px;padding-top:0px;padding-bottom:0px;height:1px;border-width:0px;border-radius:0.125rem;background-color:#1926552b;min-width:350px"><tbody><tr style="width:100%"><td></td></tr></tbody></table></p><p style="font-size:14px;line-height:24px;margin:0px;width:100%;display:flex;align-items:flex-start"><p class="text-gray" style="font-size:1.125rem;line-height:1.75rem;margin:16px 0;margin-bottom:0.5rem;margin-top:0px;font-weight:300">Message:</p><p style="font-size:14px;line-height:24px;margin:16px 0;font-weight:600;margin-top:0px;max-width:350px">${message}</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-top:0.5rem;margin-bottom:0px;padding-top:0px;padding-bottom:0px;height:1px;border-width:0px;border-radius:0.125rem;background-color:#1926552b;min-width:350px"><tbody><tr style="width:100%"><td></td></tr></tbody></table></p></td></tr></tbody></table><code style="font-size:0.75rem;line-height:1rem;color:rgb(107,114,128);margin-top:1.25rem">This email was sent by the contact form on your website.</code></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>`,
  };
};
