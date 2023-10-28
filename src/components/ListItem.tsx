export default function ListItem({ email = {}, ...props }: { email?: EmailType, [key: string]: any }) {
    return <a
        href={"/emails/" + email.id}
        autoFocus
        tabIndex={0}
        key={email.id}
        {...props}
        className={"focus-watch font-medium flex flex-row px-8 py-4 gap-4 rounded-none border-b dark:border-none border-gray-200 focus:bg-white focus:dark:bg-gray-800 focus:shadow focus:outline-none transition " + (email.opened ? "font-normal " : "font-semibold ") + (props.className || "")}
    >
        <div className="flex-grow-0 w-2/12 flex flex-row gap-2">
            <div className="flex-grow dotdotdot">
                {email.sender}
            </div>
            {email.threadCount && <div className="flex-grow-0 text-gray-400 font-normal">
                ({email.threadCount})
            </div>}
        </div>
        <div className="flex-grow w-0 text-gray-400 dotdotdot">
            <span className="text-black dark:text-white">{email.subject}</span>
            <span className="font-normal">
                {email.body && " - "}
                {email.body}
            </span>
        </div>

        <div className="flex-grow-0 font-normal w-24">{email.date}</div>
    </a>;
}