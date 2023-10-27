
export default function ClearPlaceholder() {
    return <style dangerouslySetInnerHTML={{
        __html: `
.placeholder {
    display: none;
}
`
    }} />;
}
