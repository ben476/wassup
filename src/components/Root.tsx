export default function Root({ children }: { children: JSX.Element | JSX.Element[] }) {
    return <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Wassup</title>
            <link id="preload" rel="prerender" href="/" />
            <script type="module" src="/static/client.js" defer></script>
            <link rel="stylesheet" href="/static/style.css" />
        </head>
        {children}
    </html>
}  