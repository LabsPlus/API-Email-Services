import { MailInformation } from "./Imail-information";

export interface Email extends MailInformation{
        
        apiKey: string;
        from: string;
        to: string;
        subject: string;
        text: string;
        html: string;
        attachments: any[];
        
};

