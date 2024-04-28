import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";

import {
  EMAIL_FROM,
  NEWSLETTER_CONFIRM_RESEND_INTERVAL_MINUTES,
} from "@/utils/consts";

export const sendEmail = async (
  fromAddress: string,
  toAddress: string,
  subject: string,
  bodyHtml: string
) => {
  try {
    const ses = new aws.SES({
      region: "eu-central-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID!,
        secretAccessKey: process.env.AWS_SECRET!,
      },
      apiVersion: "latest",
    });

    const transporter = nodemailer.createTransport({
      SES: { ses, aws },
      sendingRate: 14, // max 14 messages/second
    });

    return transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject,
      html: bodyHtml,
    });
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://smashing.tools";

export const sendConfirmationEmail = async (
  toAddress: string,
  verification_token: string
) => {
  const confirmLink = `${siteUrl}/newsletter/confirm?token=${verification_token}`;
  const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Confirm newsletter subscription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <p>Hi there,</p>
    <p>Thanks for signing up for smashing.tools weekly newsletter!</p>
    <p>Before we can send you any newsletter though, We need you to confirm your subscription by clicking this link:</p>
    <p><a target="_blank" rel="noopener noreferrer nofollow" href="${confirmLink}">${confirmLink}</a></p>
    <p>We don't send spam, and you can unsubscribe at any time.</p>
    <hr>
    <p><a target="_blank" rel="noopener noreferrer nofollow" href="https://smashing.tools">smashing.tools</a></p>
</body>
</html>
`;
  const sendEmailResult = await sendEmail(
    EMAIL_FROM,
    toAddress,
    "Confirm newsletter subscription",
    html
  );
  console.log("sendEmailResult", sendEmailResult);

  return sendEmailResult;
};

export const canResendConfirmationEmail = (
  lastSentDate: string | Date | null
) => {
  if (!lastSentDate) {
    return {
      canResend: true,
      remainingSeconds: 0,
    };
  }

  // eslint-disable-next-line no-param-reassign
  lastSentDate = new Date(lastSentDate);

  const canResend =
    new Date().getTime() - lastSentDate.getTime() >
    NEWSLETTER_CONFIRM_RESEND_INTERVAL_MINUTES * 60 * 1000;

  const remainingSeconds = Math.ceil(
    (NEWSLETTER_CONFIRM_RESEND_INTERVAL_MINUTES * 60 * 1000 -
      (new Date().getTime() - lastSentDate.getTime())) /
      1000
  );

  return { canResend, remainingSeconds };
};
