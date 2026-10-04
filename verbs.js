let verbs = [];
let queue = [];
let index = 0;
let current;
const personLabels = {i: 'I — man', you: 'you — to', heShe: 'he/she — u', we: 'we — mâ', youPlural: 'you (plural/polite) — shomâ', they: 'they — ânhâ'};
const tenseLabels = {present: 'Present', presentContinuous: 'Present continuous', past: 'Simple past', pastContinuous: 'Past continuous', future: 'Future', must: 'Must / have to'};
const byId = id => document.getElementById(id);
const verbSelect = byId('verb-select');
const tenseSelect = byId('tense-select');

function makeQueue() {
  const chosen = verbs.filter(v => verbSelect.value === 'all' || v.id === verbSelect.value);
  // Interleave shuffled rounds: each verb appears once before another round begins.
  const groups = chosen.map(verb => shuffle(Object.entries(verb.forms).flatMap(([tense, people]) =>
    tenseSelect.value !== 'all' && tenseSelect.value !== tense ? [] :
      Object.entries(people).filter(([, answers]) => answers.length).map(([person, answers]) => ({verb, tense, person, answers}))
  )));
  queue = [];
  while (groups.some(g => g.length)) {
    queue.push(...shuffle(groups.filter(g => g.length).map(g => g.pop())));
  }
  index = 0;
  showVerb();
}
function showVerb() {
  current = queue[index];
  byId('verb-feedback').textContent = '';
  byId('verb-options').replaceChildren();
  byId('next-verb').disabled = !current;
  if (!current) {
    byId('verb-cue').textContent = 'No practice forms for this selection.';
    byId('verb-progress').textContent = '';
    byId('verb-person').textContent = '';
    byId('verb-form').textContent = '';
    return;
  }
  byId('verb-progress').textContent = `Question ${index + 1} of ${queue.length} · ${new Set(queue.map(q => q.verb.id)).size} verbs`;
  byId('verb-cue').textContent = `${current.verb.meaning} — ${current.verb.infinitive}`;
  byId('verb-person').textContent = `Person: ${personLabels[current.person]}`;
  byId('verb-form').textContent = `Form: ${tenseLabels[current.tense]}`;
  const correct = current.answers[0];
  const pool = [...new Set(Object.values(current.verb.forms).flatMap(people => Object.values(people).flat()))]
    .filter(answer => !current.answers.includes(answer));
  shuffle([correct, ...shuffle(pool).slice(0, 3)]).forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => {
      if (current.answers.includes(answer)) {
        byId('verb-feedback').textContent = `Correct! ${tenseLabels[current.tense]} for ${personLabels[current.person]}: ${current.answers.join(' / ')}.`;
        byId('verb-options').querySelectorAll('button').forEach(b => b.disabled = true);
      } else {
        byId('verb-feedback').textContent = 'Try again—check both the person and the tense.';
        button.disabled = true;
      }
    });
    byId('verb-options').appendChild(button);
  });
}
byId('next-verb').addEventListener('click', () => { if (++index >= queue.length) makeQueue(); else showVerb(); });
byId('shuffle-verbs').addEventListener('click', makeQueue);
verbSelect.addEventListener('change', makeQueue);
tenseSelect.addEventListener('change', makeQueue);
(async () => {
  try {
    const response = await fetch('verbs.json');
    if (!response.ok) throw new Error(`File request failed: ${response.status}`);
    verbs = await response.json();
    if (!Array.isArray(verbs) || !verbs.length) throw new Error('No verbs found');
    verbs.forEach(verb => {
      const option = document.createElement('option');
      option.value = verb.id;
      option.textContent = `${verb.meaning} — ${verb.infinitive}`;
      verbSelect.appendChild(option);
    });
    [verbSelect, tenseSelect, byId('shuffle-verbs')].forEach(el => el.disabled = false);
    makeQueue();
  } catch (error) {
    byId('verb-cue').textContent = `Could not load verbs: ${error.message}. Please reload to try again.`;
  }
})();
