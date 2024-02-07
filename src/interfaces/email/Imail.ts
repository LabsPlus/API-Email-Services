import { MailInformation } from "./Imail-information";

export interface Mail extends MailInformation{
        
        from: string;
        to: string;
        subject: string;
        text: string;
        html: string;
        attachments: any[];
        
};

