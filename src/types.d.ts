interface EmailType {
    id?: number | string;
    threadId?: number | string;
    sender?: ReactNode;
    senderEmail?: ReactNode;
    subject?: ReactNode;
    body?: ReactNode;
    bodyHTML?: ReactNode;
    date?: ReactNode;
    threadCount?: number;
    key?: string;
    opened?: boolean;
    open?: boolean;
}

interface State {
    client?: ImapClient;
    mailbox?: Mailbox;
    threads?: Record<string, Thread>;
    lastUsed: number;
    id: string;
}

declare namespace Express {
    export interface Request {
        state?: State;
    }
}

interface Member {
    html: string;
    text: string;
}

// Type definitions for mailparser
interface ParsedMessage {
    uid: number;
    opened: boolean;
    headers: Map<string, string>;
    subject: string;
    from: Member;
    to: Member;
    cc: string;
    bcc: string;
    date: Date;
    messageId: string;
    inReplyTo: string;
    references: string[] | string;
    html: string;
    text: string;
    textAsHtml: string;
    attachments: any[];
}

interface Thread {
    id: string | number;
    messages: ParsedMessage[];
    subject: string;
    members: string[];
}

// Type definitions for emailjs-imap-client
interface ImapClientOptions {
    host: string;
    port: number;
    logLevel?: "info" | "debug" | "warn" | "error";
    auth: {
        user: string;
        pass: string;
    };
    useSecureTransport: boolean;
    requireTLS: boolean;
    requireSSL: boolean;
    ignoreTLS?: boolean;
}

interface Message {
    "#": number;
    uid: number;
    flags: string[];
    body: string;
}

interface ImapClient {
    constructor(host: string, port: number, options: ImapClientOptions): void;
    connect(): Promise<void>;
    listMessages(
        mailbox: string,
        range: string,
        fields: string[]
    ): Promise<Message[]>;
    selectMailbox(mailbox: string): Promise<Mailbox>;
}

interface Mailbox {
    exists: number;
    recent: number;
    unseen: number;
    uidNext: number;
    uidValidity: number;
}