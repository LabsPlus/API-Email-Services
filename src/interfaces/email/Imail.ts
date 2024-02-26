import { MailInformation } from "./Imail-information";

interface Attachment {
        fileName: string;
        fileContent: string | Buffer; 
    }
export interface Email extends MailInformation{
        
        apiKey: string;
        from: string;
        to: string;
        subject: string;
        text: string;
        html: string;
        attachments: Attachment[];
        
};
export interface EmailProps{
        
        apiKey: string;
        from: string;
        to: string;
        subject: string;
        text: string ;
        attachments: Attachment[];
        
};