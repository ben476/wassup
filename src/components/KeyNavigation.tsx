export default function KeyNavigation(props: {
    escape?: boolean;
    enter?: boolean;
    up?: boolean;
    down?: boolean;
    children?: JSX.Element | JSX.Element[];
}) {
    const fullEnabled = {
        escape: true,
        enter: true,
        up: true,
        down: true,
        ...props,
    }
    return <body
        className="min-h-[100dvh] max-h-[100dvh] bg-gray-50 dark:bg-gray-950 dark:text-white flex flex-col-reverse w-full"
    >
        <footer
            className="w-full text-center shadow-2xl py-2 xs:py-4 bg-white dark:bg-gray-800 grid gap-2 xs:gap-4 grid-flow-row grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1"
        >
            <div>
                <button
                    id="escape-button"
                    className="h-10 w-20 p-0 mx-3 btn-key-colors"
                    disabled={!fullEnabled.escape}
                    tabIndex={-1}
                >
                    Esc
                </button>
                Back
            </div>
            <div>
                <button
                    id="enter-button"
                    className="h-10 w-20 p-0 mx-3 btn-key-colors"
                    disabled={!fullEnabled.enter}
                    tabIndex={-1}
                >
                    Enter
                </button>
                Open
            </div>
            <div>
                <button
                    className="h-10 w-10 p-0 mx-3 btn-key-colors"
                    tabIndex={-1}
                    disabled={!fullEnabled.up}
                    id="up-button"
                >
                    J
                </button>
                Up
            </div>
            <div>
                <button
                    className="h-10 w-10 p-0 mx-3 btn-key-colors"
                    tabIndex={-1}
                    disabled={!fullEnabled.down}
                    id="down-button"
                >
                    K
                </button>
                Down
            </div>
        </footer>
        {props.children}
    </body>;
}