import { ReactNode } from "react";

export default function List({ children }: { children?: ReactNode | ReactNode[] }) {
    return <div className="flex-grow overflow-scroll relative" id="emails">
        {children}
    </div>
}
