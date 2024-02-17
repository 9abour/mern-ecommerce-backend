import {NextFunction, Response} from "express";
import handleSendResponse from "./handleSendResponse";
import { STATUS_TEXT } from "../enums/statusTexts.enums";
import saveUser from "../controllers/auth/helpers/saveUser";
import {INewUser} from "../types/user.types";
import nodemailer from "nodemailer"

const sendVerificationTokenMail = async (
    res: Response,
    user: INewUser,
    verificationToken: string,
    next: NextFunction
) => {
  const verificationLink = `http://localhost:5000/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.TRANSPORTER_EMAIL,
    to: user.email,
    subject: "Verify Your Email Address",
    text: `Please click on the following link to verify your email address: ${verificationLink}`,
  }


  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD
    }
  });

  transport.sendMail(mailOptions, async (err) => {
    if (err) return next(handleSendResponse(res, null, [err.message], 400, STATUS_TEXT.ERROR))

    await saveUser(user);
    handleSendResponse(
        res,
        { msg: "Please check your email for verification." },
        null,
        201,
        STATUS_TEXT.SUCCESSFUL,
    );
    res.redirect("/login");
  })
};

export default sendVerificationTokenMail;