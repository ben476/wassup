import { webcrypto } from "crypto";
import { NextFunction, Request, Response } from 'express';

const states: Record<string, State> = {};

export function cookieStateMiddleware(req: Request, res: Response, next: NextFunction) {
    let { id } = req.cookies;

    if (!id) {
        id = webcrypto.randomUUID();
        res.cookie("id", id);
    }

    // create a new session if one doesn't exist
    if (!states[id]) {
        states[id] = {
            lastUsed: Date.now(),
            id,
        };
    }

    expireState(id);

    req.state = states[id];

    next();
}

function expireState(id: any) {
    const lastUsed = Date.now();
    states[id].lastUsed = lastUsed;

    // delete session if it hasn't been used in an hour
    setTimeout(() => {
        if (states[id].lastUsed === lastUsed) {
            delete states[id];
        }
    }, 1000 * 60 * 60);
}

export function resetState(req: Request) {
    const { id } = req.cookies;

    states[id] = {
        lastUsed: Date.now(),
        id,
    };
    req.state = states[id];

    return id;
}