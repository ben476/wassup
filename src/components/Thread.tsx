export default function Thread({ children, title }: { children?: JSX.Element | JSX.Element[], title?: string }) {
    return <div className="flex-grow overflow-scroll">
        <h1 className="text-4xl m-8 font-semibold text-gray-800 dark:text-gray-50">
            {title || "Thread"}
        </h1>
        {children}
    </div>;
}