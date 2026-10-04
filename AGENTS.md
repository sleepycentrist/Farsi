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

GitHub Pages is configured to publish from main, root /, at https://sleepycentrist.github.io/Farsi/. Verify the latest Pages build and live JSON after each push. GitHub authentication was completed as sleepycentrist on 27 September 2026. The GitHub CLI is available at ../.tools/gh_2.101.0_macOS_arm64/bin/gh relative to this repository; Git is configured to use its credentials.

## Current local app folder and three-file routing
The canonical working folder is /Users/hannemortazavi/Desktop/Farsi-game, the user's active VS Code folder. Do not publish from the earlier farsi-app clone in the ChatGPT workspace. The GitHub CLI remains at /Users/hannemortazavi/.codex/.chatgpt-projects/g-p-6977e368bd548191b880b8924bc512d1/.tools/gh_2.101.0_macOS_arm64/bin/gh.
Inspect the latest saved schemas before edits. Route standalone vocabulary to questions.json, complete tile exercises to sentences.json, and infinitives/stems/conjugation tables to verbs.json. Check all three; update only where relevant. Reuse existing verbs (cook and prepare already exist). Preserve the six tense groups and six person keys in verb forms. Never invent forms by blindly concatenating stems.
The user actively edits this folder. Check changes before and after edits. Never stage or publish their unfinished app edits automatically. If lesson changes overlap uncommitted user changes, defer publication and explain the conflict. Never overwrite on-disk edits or assume unsaved editor buffers are available.

When adding lessons, refresh weekly-phrases.json with exactly ten useful recent phrases, translations and Persian script; update the matching static weekly-phrases section in index.html and its visible date. Keep them identical so the box works without JavaScript and always reflects the curated latest lesson. Preserve layout and other sections.

## Vocabulary organisation
Keep one base-word card; put plurals in a `plural` object with `farsi` and `persian`. Teach possessive/object endings in `endings`, not as separate possessed-word cards. Do not re-add basic personal pronouns or the removed society category. Kitchen belongs to home; places belongs to directions.
`cards.js` derives root/command/present recall from verbs.json automatically. Additional reviewed root-only entries in questions.json use category `verbs`, kind `verb`, and presentStem, pastStem, imperative, present. Never duplicate a verb already supplied by verbs.json or add individual conjugations to noun topics. Full conjugation exercises remain separate.
Run `node scripts/test_cards.cjs` as well as the content check. Keep the weekly phrases inside the compact native details disclosure, closed by default.
