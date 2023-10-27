export default function Index({ error }: { error?: string }) {
    return (
        <div
            className="min-h-[100dvh] max-h-[100dvh] bg-gray-50 dark:bg-gray-900 dark:text-white flex flex-col w-full items-center"
        >
            <div className="m-12 dark:text-gray-100" style={{ marginRight: '-1vw' }}>
                <h1 className="text-7xl md:text-8xl font-semibold">Dead</h1>
                <h1 className="text-7xl md:text-8xl font-semibold">Simple</h1>
                <h1 className="text-7xl md:text-8xl font-semibold">Email</h1>
            </div>
            <div className="w-full overflow-x-clip relative flex-grow">
                <svg
                    className="fill-gray-800 dark:fill-gray-200 absolute left-0 -top-32 rotate-45"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="MailOutlineIcon"
                    style={{
                        marginLeft: 'calc(20vw - 30vh)',
                        height: 'calc(20vh + 20vw)',
                        marginTop: '-5vh',
                        maxHeight: '30vh',
                    }}
                >
                    <path
                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
                    ></path>
                </svg>
                <svg
                    className="fill-gray-800 dark:fill-gray-200 absolute right-0 -top-32 -rotate-12"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CreateIcon"
                    style={{
                        marginRight: 'calc(20vw - 25vh)',
                        height: 'calc(20vh + 20vw)',
                        marginTop: '-5vh',
                        maxHeight: '30vh',
                    }}
                >
                    <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    ></path>
                </svg>
            </div>
            <div className="w-full max-w-xs flex-grow-0 mb-12">
                <form
                    className="bg-white dark:bg-gray-800 text-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    action="/"
                    method="post"
                >
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="host">
                            IMAP host
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="host"
                            name="host"
                            type="text"
                            placeholder="Hostname"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="host">
                            IMAP port
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="port"
                            name="port"
                            type="number"
                            placeholder="993"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
                            htmlFor="current-password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="current-password"
                            name="password"
                            type="password"
                            placeholder="******************"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            className="w-4 h-4"
                            checked
                            id="tls"
                            name="tls"
                            type="checkbox"
                            value="tls"
                        />
                        <label className="ml-2 text-sm text-gray-700 dark:text-gray-300 font-bold" htmlFor="tls"> Use TLS </label>
                    </div>
                    {error && <p className="text-red-500 italic mb-3">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="btn-key-colors font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Open
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}