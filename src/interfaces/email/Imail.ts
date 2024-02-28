import { MailInformation } from "./Imail-information";
import { File } from "../file/Ifile";

export interface Email extends MailInformation{
        
        apiKey: string;
        from: string;
        to: string;
        subject?: string;
        text?: string;
        html?: string;
        attachments?: File[];
        
};