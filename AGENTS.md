# Farsi lesson maintenance

The repository is https://github.com/sleepycentrist/Farsi, branch main.

When the user adds lesson notes:
1. Preserve their meaning in dated sections of notes/Core-Farsi-Memory.md; clarify errors without treating example sentences as personal facts.
2. In the original farsi project workspace, Core-Farsi-Memory.md is the lesson intake file. Reconcile its changes with this repository copy; do not overwrite divergent changes. Never edit synced sources/ files.
3. Add useful new vocabulary to questions.json and reviewed sentence exercises to sentences.json, following their existing schemas and topics.js categories. Avoid duplicates, preserve existing IDs and exercises, and check every accepted answer uses exactly the supplied tiles.
4. Run python3 scripts/check_content.py.
5. Fetch origin, check for remote changes, and reconcile before committing. Stage only the relevant lesson files. The user has authorized saving lesson updates and pushing them to GitHub. Never force-push or include unrelated work. If authentication, permissions or conflicts block publication, report that clearly.
6. Confirm the notes and GitHub update separately from live-site deployment. Do not claim the website was published unless verified.

The hourly Codex follow-up is a backup for saved file changes. It does not receive arbitrary notes from other chats. Manual end-of-lesson requests should perform the same steps immediately.
