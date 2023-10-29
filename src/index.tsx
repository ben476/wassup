import cookieParser from 'cookie-parser';
import express, { Request } from 'express';
import DOMPurify from 'isomorphic-dompurify';
import ReactDOMServer from 'react-dom/server';
import ClearPlaceholder from "./components/ClearPlaceholder.js";
import Email from './components/Email.js';
import List from './components/List.js';
import ListItem from "./components/ListItem.js";
import ListPlaceholder from './components/ListPlaceholder.js';
import KeyNavigation from './components/KeyNavigation.js';
import Root from './components/Root.js';
import Thread from './components/Thread.js';
import { getClient, listThreads } from './email.js';
import { Outlet, inject } from './injection.js';
import { resetState, cookieStateMiddleware } from './state.js';
import { formatDate, privateCache } from './utils.js';
import Index from './components/Index.js';

const app = express();

app.use('/static', express.static('static', {
    maxAge: 10 * 60 * 1000
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieStateMiddleware);

app.get('/emails', privateCache, inject(<Root>
    <KeyNavigation escape={false}>
        <List>
            <ListPlaceholder />
            <Outlet />
        </List>
    </KeyNavigation>
</Root>, async (req: Request, res) => {
    if (!req.state?.client) {
        res.redirect("/");
        return;
    }

    // Whatever we do here (even though we're using async) will be rendered in the Outlet, 
    // but without blocking anything already rendered from being sent to the client
    req.state.threads ||= await listThreads(req);
    const threadsObj = req.state.threads;
    const threads = Object.values(threadsObj).sort((a, b) =>
        b.messages[b.messages.length - 1].date.getTime() -
        a.messages[a.messages.length - 1].date.getTime()
    )

    // Set styles to remove the placeholder now that we have data
    res.write(ReactDOMServer.renderToString(<ClearPlaceholder />));

    for (const thread of threads) {
        res.write(ReactDOMServer.renderToString(<ListItem email={{
            id: thread.id,
            sender: thread.members.join(", "),
            subject: thread.subject,
            body: thread.messages[thread.messages.length - 1].text,
            date: formatDate(thread.messages[thread.messages.length - 1].date),
            threadCount: thread.messages.length > 1 ? thread.messages.length : undefined,
            opened: thread.messages[thread.messages.length - 1].opened
        }} />));
    }
}))

// Used to make plain text prettier and links open in a new tab
const emailHelper = `<base target="_blank" />
<style>
    body {
        font-family: Inter,system-ui,Avenir,Helvetica,Arial,sans-serif
    }

    @media (prefers-color-scheme: dark) {
        body {
            color: #eee;
        }
    }
</style>`

app.get('/emails/:id', privateCache, (req, res) => {
    const thread = req.state?.threads?.[req.params.id];

    if (!thread) {
        res.redirect("/");
        return;
    }

    res.send(ReactDOMServer.renderToString(<Root>
        <KeyNavigation>
            <Thread title={thread.subject}>
                {thread.messages.map((message: ParsedMessage, i) => {
                    // Sanitize the email and make it look nicer
                    let { html } = message;

                    if (html.includes("<head>")) {
                        html = html.replace("<head>", "<head>" + emailHelper);
                    } else {
                        html = emailHelper + html;
                    }

                    return <Email email={{
                        id: message.uid,
                        threadId: thread.id,
                        sender: message.from.text,
                        subject: message.subject,
                        body: message.text,
                        bodyHTML: DOMPurify.sanitize(html, { FORCE_BODY: true, ADD_ATTR: ['target'], ADD_TAGS: ['base'] }),
                        date: formatDate(message.date),
                        opened: message.opened,
                        open: i === thread.messages.length - 1
                    }} key={i} />
                })}
            </Thread>
        </KeyNavigation>
    </Root>
    ));
})

// Connect to IMAP server
app.post("/", async (req, res) => {
    const { host, port, username, password, tls } = req.body;

    try {
        resetState(req);
        const [client, mailbox] = await getClient(host, parseInt(port), username, password, !!tls);
        req.state.client = client;
        req.state.mailbox = mailbox;
    } catch (e) {
        res.send(ReactDOMServer.renderToString(<Root>
            <Index error={e.message} />
        </Root>));
        return;
    }

    res.redirect("/emails");
});

// Render home page
app.get("/", async (req, res) => {
    // check for error query param
    if (req.query.error) {
        res.send(ReactDOMServer.renderToString(<Root>
            <Index error={req.query.error.toString()} />
        </Root>));
        return;
    }
    res.send(ReactDOMServer.renderToString(<Root>
        <Index />
    </Root>));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});