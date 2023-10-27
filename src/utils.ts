export function formatDate(date: Date, timezone = "America/Los_Angeles") {
    const now = new Date();
    const sameYear = now.getFullYear() === date.getFullYear();
    const sameMonth = sameYear && now.getMonth() === date.getMonth();
    const sameDay = sameMonth && now.getDate() === date.getDate();

    if (sameDay) {
        // 07:30 PM
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: timezone,
        });
    } else if (sameYear) {
        // 15 Oct
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            timeZone: timezone,
        });
    } else {
        // 15 Oct 2019
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: timezone,
        });
    }
}