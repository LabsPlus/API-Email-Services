export interface MailInformation {
        
        cc?: string[];
        bcc?: string[];
        replyTo?: string;
        inReplyTo?: string;
        references?: string;
        envelope?: any;
        messageId?: string;
        date?: string;
        headers?: any;
        priority?: string;
        dsn?: any;
};