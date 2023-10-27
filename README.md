# Wassup - Dead Simple Email Client

A modern remake of [Sup](https://github.com/sup-heliotrope/sup) as a web app.

## Features

- [x] No client-side JavaScript needed! (Optional 100-lines used for keybindings, and is navigatable with a mouse or <kbd>tab</kbd>, <kbd>shift</kbd>+<kbd>tab</kbd>, and <kbd>enter</kbd> regardless)
- [x] Loading spinners with no JavaScript through HTML streaming magic!
- [x] Instant navigation using preloading - feels like a SPA!
- [x] No UI framework! (Okay, I'm using Tailwind CSS, but that's basically the same as writing it yourself).
- [x] Light _and dark_ mode!

## Roadmap

- [ ] Fix quality of life issues:
  - [ ] The escape key sometimes needs to be pressed twice to go back.
  - [ ] Allow keyboard scrolling for emails - the current keybindings are for navigation, so I'll add more for scrolling.
  - [ ] Render emails in the same document rather than an iframe for better performance, dark mode support, and accessibility.
  - [ ] Persist emails in a database rather than in memory for only an hour (this was for convenience if you wanted to run it yourself).
  - [ ] Fetch individual emails rather than all of them at startup.
- [ ] Of course, make it a full-fledged app that can also send emails via SMTP.
- [ ] Now that we have a unique-looking email client, turn it into a unique-looking email service, perhaps as a paid addon to our free and open-source email client. I'm pretty surprised at how quick and lightweight the app turned out (apart from the one-time load at the start), so I'm sure some people (myself included) would be interested in taking it for a spin. Since the client uses standard protocols like IMAP, all we would need to do is set up an email server with something like mailcow, point the client to it, and profit! Of course, there will be things such as account and subscription management, payments, and so on, but these are all on the beaten path (if not already implemented at Kagi), and I'm sure they'll be on the milder side of our troubles.
