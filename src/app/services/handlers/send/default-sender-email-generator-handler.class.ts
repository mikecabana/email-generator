import { singleton } from "tsyringe";
import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, IEmailGeneratorHandlerContext, ISenderEmailGeneratorHandler } from "../../../../abstraction/services/handlers";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

@singleton()
export class DefaultSenderEmailGeneratorHandler extends EmailGeneratorHandlerBase implements ISenderEmailGeneratorHandler {

    private _transporter: Mail;

    constructor() {
        super();
        this._transporter = this.createTransporter();
    }

    handle(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        return this.send(options, context);
    }

    send(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        if (options.e && options.e.length > 0) {

            if (!context.html) {
                return { options, context, output: 'Counld not send test email. No HTML in context.' };
            }

            this._transporter.verify((err) => {
                if (err) {
                    throw err;
                }

                options.e?.forEach(async (to) => {
                    try {
                        await this._transporter.sendMail({
                            to: to as string,
                            from: `Sample Sender<${process.env.EMAIL_USER}>`,
                            subject: 'Sample Email Generated',
                            html: context.html,
                        });
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                })
            })

            return { options, context, output: 'Send test emails' };
        }
        return { options, context };
    }

    private createTransporter(): Mail {
        if (this._transporter) {
            return this._transporter;
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
    }
}