import { injectable } from 'tsyringe';
import { IEmailGeneratorOptions } from '../../../../abstraction';
import {
    EmailGeneratorHandlerBase,
    IEmailGeneratorHandlerContext,
    IInterpolationEmailGeneratorHandler
} from '../../../../abstraction/services/handlers';

import fs from 'fs';
import handlebars from 'handlebars';

@injectable()
export class ReservationInterpolationEmailGeneratorHandler
    extends EmailGeneratorHandlerBase
    implements IInterpolationEmailGeneratorHandler
{
    handle(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        return this.interpolate(options, context);
    }

    interpolate(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        const { t: template } = options;
        if (template === 'reservation') {
            const templateContent = fs.readFileSync(
                `templates/${template}.mjml`,
                'utf8'
            );
            const interpolateTemplateContent =
                handlebars.compile(templateContent);
            const interpolatedTemplateContent = interpolateTemplateContent({
                Text: {
                    MerchantName: 'Sample Merchant',
                    MainText:
                        "Thank you! I'm baby pop-up seitan butcher tousled palo santo pour-over austin viral. Wayfarers waistcoat cred migas 8-bit asymmetrical heirloom. IPhone offal retro DIY mlkshk pok pok semiotics messenger bag artisan vegan bitters af tumblr irony vexillologist. Gentrify vexillologist yuccie put a bird on it tumblr craft beer farm-to-table brooklyn hella skateboard meh post-ironic listicle.",
                    ReservationLabel: 'Reservation',
                    ReferenceFieldLabel: 'Reference',
                    ReferenceDetailsSectionLabel: 'Reservation Details',
                    ReferenceDetailsLoungeFieldLabel: 'Lounge',
                    ReferenceDetailsDateTimeFieldLabel: 'Date & Time',
                    ReferenceDetailsPassengerSectionLabel: 'Passenger',
                    ReferenceDetailsNameFieldLabel: 'Name',
                    ReferenceDetailsCommentsFieldLabel: 'Comments',
                    ManageReservationButtonLabel: 'Manage my reservation',
                    PurchaseSummarySectionLabel: 'Purchase Summary',
                    PurchaseSummaryTablePaymentSubTotalLabel: 'Subtotal',
                    PurchaseSummaryTablePaymentTotalLabel: 'Total',
                    PoweredByFooterLabel: 'Powered by Company',
                    ReferenceDetailsFlightFieldLabel: 'Flight Number'
                },
                UseBanner: true,
                BannerSrc: 'https://via.placeholder.com/600x100',
                Lounge: {
                    Label: 'Lounge A'
                },
                Reservation: {
                    Reference: '123456',
                    Date: 'Thursday, November 11, 2021 2:26 PM',
                    Flight: 'AC 1234',
                    HasNote: true,
                    Note: 'Some extra comments provided by the user.'
                },
                User: {
                    FirstName: 'John',
                    LastName: 'Doe'
                },
                CallbackUrl: 'https://google.ca',
                HasBarCode: true,
                BarCodeSrc:
                    'https://ih1.redbubble.net/image.894362037.5490/flat,1000x1000,075,f.u7.jpg',
                Purchase: {
                    HasItemSubTotals: true,
                    HasTaxes: true,
                    Currency: 'CAD',
                    Amount: '44.00',
                    ItemSubTotal: {
                        Currency: 'CAD',
                        Amount: '42.50'
                    },
                    TaxSubTotal: {
                        Currency: 'CAD',
                        Amount: '1.50'
                    },
                    Taxes: [
                        {
                            Label: 'GST',
                            Currency: 'CAD',
                            Amount: '1.50'
                        }
                    ],
                    Items: [
                        {
                            Quantity: 1,
                            Label: 'Lounge Access',
                            Currency: 'CAD',
                            Amount: '42.50'
                        }
                    ]
                }
            });

            context = { ...context, template: interpolatedTemplateContent };

            return { options, context, output: `Interpolated ${options.t}` };
        }

        return { options, context };
    }
}
