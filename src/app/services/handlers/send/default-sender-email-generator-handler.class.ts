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


            this._transporter.verify((err) => {
                if (err) {
                    throw err;
                }

                options.e?.forEach(async (to) => {
                    try {
                        await this._transporter.sendMail({
                            to: to as string,
                            from: 'Sample Sender<m.cabana@ieg-america.com>',
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
            host: 'mail.ieg-america.com',
            port: 465,
            secure: true,
            auth: {
                user: '<YOUR_EMAIL_HERE>',
                pass: '<YOUR_PASS_HERE>',
            },
        })
    }
}