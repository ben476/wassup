import ReactDOMServer from "react-dom/server";
import { webcrypto } from "crypto";
import { Response } from "express";

const injectionToken = webcrypto.randomUUID();

export function Outlet() {
    return injectionToken;
}

const injectionReplacement = ReactDOMServer.renderToString(<Outlet />);

export function inject(element: JSX.Element, next: any) {
    const html = ReactDOMServer.renderToString(element)
    const splits = html.split(injectionReplacement);

    return async (req: any, res: Response) => {
        res.write(splits[0]);

        try {
            await next(req, res);
        } catch (e) {
            console.log(e);
            res.write(`<meta http-equiv="Refresh" content="0; url='/?error=${encodeURIComponent(e.message)}'" />`);
        }
        res.write(splits[1]);
        res.end();
    }
}