# LockLogger

This is a logging utility you _probably_ don't want - it is written exclusively
to debug clients where Electron is reporting a "screen lock" status that we
cannot quite explain.

It's quite simple: It'll observe Electron's `powerMonitor` while also constantly
polling to see if the `logonui` process is running. It'll then write changes
to a log file.
