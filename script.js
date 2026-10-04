let vocabulary = [];
let currentIndex = 0;

const parameters = new URLSearchParams(window.location.search);
const requestedTopic = parameters.get('category');
const selectedTopic = ({kitchen: 'home', places: 'directions', actions: 'verbs'})[requestedTopic] || requestedTopic;

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const progress = document.getElementById('progress');
const revealButton = document.getElementById('reveal');
const nextButton = document.getElementById('next');

const finglishButton = document.getElementById('show-finglish');
const persianButton = document.getElementById('show-persian');
const bothButton = document.getElementById('show-both');

let displayMode = 'finglish';

finglishButton.classList.add('active');

revealButton.addEventListener('click', revealAnswer);
nextButton.addEventListener('click', nextQuestion);

finglishButton.addEventListener('click', function () {
  changeDisplayMode('finglish');
});

persianButton.addEventListener('click', function () {
  changeDisplayMode('persian');
});

bothButton.addEventListener('click', function () {
  changeDisplayMode('both');
});

function changeDisplayMode(newMode) {
  displayMode = newMode;

  finglishButton.classList.toggle(
    'active',
    displayMode === 'finglish'
  );

  persianButton.classList.toggle(
    'active',
    displayMode === 'persian'
  );

  bothButton.classList.toggle(
    'active',
    displayMode === 'both'
  );

  if (vocabulary.length) showQuestion();
}

async function loadVocabulary() {
  if (!Object.hasOwn(topicNames, selectedTopic)) {
    question.textContent = 'Choose a topic from the homepage first.';
    return;
  }

  document.getElementById('topic-title').textContent =
    topicNames[selectedTopic];

  try {
    const allVocabulary = await loadPracticeCards();

    vocabulary = allVocabulary.filter(function (entry) {
      return entry.category === selectedTopic;
    });

    if (vocabulary.length === 0) {
      question.textContent =
        'No words in this topic yet. Check the category labels in your JSON.';
      return;
    }

    document.querySelector('.display-controls').hidden = selectedTopic === 'verbs';
    showQuestion();
  } catch (error) {
    question.textContent = 'Could not load vocabulary: ' + error.message;
  }
}

function showQuestion() {
  const current = vocabulary[currentIndex];
  question.textContent = cardQuestion(current, displayMode);

  progress.textContent =
    'Card ' + (currentIndex + 1) + ' of ' + vocabulary.length;

  answer.textContent = '';
  revealButton.disabled = false;
  nextButton.disabled = false;
}

function revealAnswer() {
  answer.textContent = cardAnswer(vocabulary[currentIndex], displayMode);
  revealButton.disabled = false;
  nextButton.disabled = false;
}

function nextQuestion() {
  currentIndex = currentIndex + 1;

  if (currentIndex >= vocabulary.length) {
    currentIndex = 0;
  }

  showQuestion();
}

loadVocabulary();