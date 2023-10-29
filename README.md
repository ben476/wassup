# Wassup - Dead Simple Email Client

A modern remake of [Sup](https://github.com/sup-heliotrope/sup) as a web app. Tested with Gmail and Outlook.

Built using:

- Typescript
- Node.js
- Express
- Tailwind CSS
- IMAP

## Features

- [x] No client-side JavaScript needed! (Optional 100-lines of vanilla JS used for keybindings, and is navigatable with a mouse or <kbd>tab</kbd>, <kbd>shift</kbd>+<kbd>tab</kbd>, and <kbd>enter</kbd> regardless)
- [x] Responsive design - works on mobile!
- [x] Loading spinners with no JavaScript through HTML streaming magic!
- [x] Instant navigation using bfcache and preloading - feels like a SPA! (500ms artificial TTFB is completely unnoticeable).
- [x] No UI framework! (Okay, I'm using Tailwind CSS, but that's basically the same as writing it yourself).

## Running

```sh
npm install
npm start
```

## Limitations

- [ ] Poor offline experience - it's kind of inconvenient to turn an MPA into a PWA. I might as well make it a SPA.
- [ ] Dependent on device memory pressure - if the browser decides to clear bfcache or doesn't want to prefetch pages...
- [ ] One big IMAP download at the start - to be fair, I'm not seeing any other client avoid this.

## Roadmap

- [ ] Fix quality of life issues:
  - [ ] WebKit caching behaviour - doesn't support `<link rel="prefetch">`, so I rely on `fetch()` instead for preloading. However, if the user navigates before the fetch finishes, the request is not cached/reused and starts again, unlike `<link rel="prefetch">` in Chrome and Firefox
  - [ ] Loading spinner doesn't work on WebKit - it only starts rendering while the emails are streaming.
  - [x] ~~Allow keyboard scrolling for emails - the current keybindings are for navigation, so I'll add more for scrolling.~~ Arrow keys work. I was binding them to do the same things as <kbd>j</kbd> and <kbd>k</kbd> for some reason.
  - [ ] Render emails in the same document rather than an iframe for better performance, dark mode support, and accessibility.
  - [ ] Persist emails in a database rather than in memory for only an hour (this was for convenience if you wanted to run it yourself).
  - [ ] Reduce upfront IMAP download cost.
- [ ] Add OAuth support for Gmail and Outlook.
- [ ] Of course, make it a full-fledged app that can also send emails via SMTP.
- [ ] Now that we have a unique-looking email client, turn it into a unique-looking email service, perhaps as a paid addon to our free and open-source email client. I'm pretty surprised at how quick and lightweight the app turned out (apart from the one-time load at the start), so I'm sure some people (myself included) would be interested in taking it for a spin. Since the client uses standard protocols like IMAP, all we would need to do is set up an email server with something like mailcow, point the client to it, and profit! Of course, there will be things like account and subscription management, payments, and so on. But these are all well on the beaten path (if in the context of a Kagi product, probably already implemented as well), and I'm sure they'll be on the milder side of our troubles.
