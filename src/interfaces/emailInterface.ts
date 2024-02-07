import { File } from './attachmentInterface';
export interface Email {
    destination: string,
    subject: string,
    content: string,
    attachment: File;
}