import {Injectable} from "@tsed/di";
import nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
transporter:nodemailer.Transporter;
    constructor() {
     this.transporter = nodemailer.createTransport({
          host: "mail.privateemail.com",
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: "admin@rishika.xyz",
            pass: "9874434334",
          },
        });
    }
    async sendEmail(userEmail:string, certificateId:string) {
       
        
        let mailOptions = {
          from: 'admin@rishika.xyz',
          to: userEmail,
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };
        
        this.transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }

}
