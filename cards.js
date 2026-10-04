// Topic and daily practice share verb recall from the full verb bank.
async function loadPracticeCards() {
  const responses = await Promise.all(['questions.json', 'verbs.json'].map(path => fetch(path, {cache: 'no-cache'})));
  if (responses.some(response => !response.ok)) throw new Error('Could not load practice cards.');
  const [words, verbs] = await Promise.all(responses.map(response => response.json()));
  return words.concat(verbs.map(verb => ({
    id: 'verb-' + verb.id, category: 'verbs', kind: 'verb',
    farsi: verb.infinitive, english: verb.meaning,
    presentStem: verb.presentStem, pastStem: verb.pastStem,
    imperative: verb.imperative, present: verb.forms.present.i.join(' / ')
  })));
}
function wordInMode(entry, mode) {
  if (mode === 'persian') return entry.persian || entry.farsi;
  if (mode === 'both' && entry.persian) return entry.persian + ' — ' + entry.farsi;
  return entry.farsi;
}
function cardQuestion(entry, mode) {
  if (entry.kind === 'verb') return 'How do you say “' + entry.english + '”? Recall the infinitive, stems, command and present form.';
  return 'What does ' + wordInMode(entry, mode) + ' mean?';
}
function cardAnswer(entry, mode) {
  if (entry.kind === 'verb') return [
    'Infinitive: ' + entry.farsi, 'Past stem: ' + entry.pastStem,
    'Present stem: ' + entry.presentStem, 'Command: ' + entry.imperative,
    'Present (I): ' + entry.present
  ].join('\n');
  return entry.english + (entry.plural ? '\nPlural: ' + wordInMode(entry.plural, mode) : '');
}
