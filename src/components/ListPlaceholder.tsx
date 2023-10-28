import ListItem from "./ListItem.js";

export default function ListPlaceholder() {
    return <div className="animate-in placeholder transition absolute w-full">
        {Array.from({ length: 30 }).map((_, i) => <ListItem className="animate-pulse placeholder pointer-events-none" email={{
            sender: <div className="bg-gray-200 dark:bg-gray-700 text-transparent w-2/3 block rounded-full">A</div>,
            subject: <div className="bg-gray-200 dark:bg-gray-700 text-transparent w-2/3 block rounded-full">A</div>,
            date: <div className="bg-gray-200 dark:bg-gray-700 text-transparent w-24 block rounded-full">A</div>,
        }}
            tabIndex={-1}
            key={i}
        />)}
    </div>;
}
