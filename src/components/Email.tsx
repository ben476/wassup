export default function Email({ email = {}, ...props }: { email?: EmailType, [key: string]: any }) {
    return <details className="group" open={email.open} {...props}>
        <summary
            className="px-8 py-2 border-y dark:border-none font-semibold text-base text-gray-800 dark:text-white focus-watch marker:rotate-0 open:marker:rotate-90 rounded focus:bg-white focus:dark:bg-gray-800 focus:shadow focus:outline-none transition"
            autoFocus={email.open}
            tabIndex={0}
        >
            {email.sender}
            <span className="text-gray-500">{" "}{email.date}</span>

            <span
                className="dotdotdot text-gray-500 text-sm w-1/2 block group-open:hidden"
            >
                {email.body}
            </span>
        </summary>
        <base target="_parent" />
        <div className='w-full px-6'>
            <iframe className={`w-full h-full text-gray-800 dark:text-gray-50 divide-y message-view-${email.id}`} src={`/emails/${email.threadId}/${email.id}/html`} sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin" tabIndex={-1} />
            <script dangerouslySetInnerHTML={{
                __html: `
                {
                    const iframe = document.querySelector(".message-view-${email.id}");
                    iframe.onload = function() {
                        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 20 + "px";
                    }
                }
        ` }} />
        </div>
    </details>;
}