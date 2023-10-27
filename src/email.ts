import ImapClientModule from "emailjs-imap-client";
import { Request } from "express";
import mailparser from "mailparser";

const { default: ImapClient } = ImapClientModule;



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function getClient(
    host: string,
    port: number,
    user: string,
    password: string,
    secure: boolean
): Promise<[ImapClient, Mailbox]> {
    const client: ImapClient = new ImapClient(host, port, {
        logLevel: "info",
        auth: {
            user: user,
            pass: password,
        },
        useSecureTransport: secure,
        requireTLS: secure,
        requireSSL: secure,
    });

    await client.connect();

    // Mailbox must be fetch here to check if the connection is valid
    const mailbox: Mailbox = await client.selectMailbox("INBOX");

    return [client, mailbox];
}

export async function listThreads(req: Request) {
    const { client, mailbox } = req.state;
    const messages = await client.listMessages("INBOX", `1:${mailbox.exists}`, [
        "uid",
        "flags",
        "body[]",
    ]);

    const parsedMessages: ParsedMessage[] = await Promise.all(
        messages.map(async (message) => {
            const res = await mailparser.simpleParser(message["body[]"]);
            res.uid = message.uid;
            res.opened = message.flags.includes("\\Seen");
            return res;
        })
    );

    /*
      Start looking for threads
      Each message has a list of other messages it references
      The newest message in the thread will reference all the other messages in the thread
      */

    const messagesTable = {};

    for (const message of parsedMessages) {
        messagesTable[message.messageId] = message;
    }

    const threads: ParsedMessage[][] = [];

    // Iterate from newest to oldest
    for (let i = parsedMessages.length - 1; i >= 0; i--) {
        const message = parsedMessages[i];
        const messageId = message.messageId;

        // If not already in a thread
        if (messageId && messagesTable[messageId]) {
            const thread = [message];
            delete messagesTable[messageId];

            // Add all referenced messages to the thread
            for (const reference of message.references ?? []) {
                if (messagesTable[reference]) {
                    thread.push(messagesTable[reference]);
                    delete messagesTable[reference];
                }
            }

            thread.sort((a, b) => a.date.getTime() - b.date.getTime());
            threads.push(thread);
        }
    }

    // Index threads by their newest message id
    const threadTable: Record<string, Thread> = {};

    for (const thread of threads) {
        const members = new Set<string>(thread.map((m) => m.from.text));
        const id = thread[thread.length - 1].uid;
        const subject = thread[thread.length - 1].subject;

        threadTable[id] = {
            id,
            members: Array.from(members),
            subject,
            messages: thread,
        };
    }

    if (req.state) req.state.threads = threadTable;

    return threadTable;
}
