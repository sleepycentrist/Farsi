# Farsi practice

Vocabulary and sentence practice, with lesson notes kept alongside the app.

- `notes/Core-Farsi-Memory.md`: master study notes and dated lessons.
- `questions.json`: vocabulary cards.
- `sentences.json`: sentence exercises.
- `topics.js`: supported vocabulary categories.

## Adding a lesson

Send lesson notes in the connected Codex Farsi task. Say “lesson finished” for an immediate update of the notes, practice content and GitHub. An hourly follow-up in that task checks saved notes for changes as a backup. It requires the workspace, GitHub credentials and execution environment to be available; failures should be reported rather than silently ignored.

Notes are not automatically parsed into exercises: the Codex update reviews the language and creates entries that match the app's format. Validate before publishing:

```
python3 scripts/check_content.py
```

GitHub Pages publishes https://sleepycentrist.github.io/Farsi/ from the root of the main branch. This was verified through the GitHub API on 27 September 2026. Pushing lesson updates to main triggers publishing; check the Pages build and live data before reporting deployment complete.
