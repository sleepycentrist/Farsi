const DAILY_QUESTION_COUNT = 20;

let dailyVocabulary = [];
let currentIndex = 0;
let displayMode = 'finglish';


const question = document.getElementById('question');
const answer = document.getElementById('answer');
const progress = document.getElementById('progress');

const revealButton = document.getElementById('reveal');
const nextButton = document.getElementById('next');

const finglishButton = document.getElementById('show-finglish');
const persianButton = document.getElementById('show-persian');
const bothButton = document.getElementById('show-both');


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

  if (dailyVocabulary.length > 0) {
    showQuestion();
  }
}


async function loadDailyVocabulary() {
  try {
    const response = await fetch('questions.json');

    if (!response.ok) {
      throw new Error('File request failed: ' + response.status);
    }

    const allVocabulary = await response.json();

    const mixedVocabulary = shuffle(allVocabulary);

    dailyVocabulary = mixedVocabulary.slice(
      0,
      DAILY_QUESTION_COUNT
    );

    showQuestion();
  } catch (error) {
    question.textContent =
      'Could not load vocabulary: ' + error.message;
  }
}


function showQuestion() {
  const current = dailyVocabulary[currentIndex];
  let displayedWord;

  if (displayMode === 'persian') {
    displayedWord = current.persian || current.farsi;
  } else if (displayMode === 'both' && current.persian) {
    displayedWord =
      current.persian + ' — ' + current.farsi;
  } else {
    displayedWord = current.farsi;
  }

  question.textContent =
    'What does ' + displayedWord + ' mean?';

  progress.textContent =
    'Question ' +
    (currentIndex + 1) +
    ' of ' +
    dailyVocabulary.length;

  answer.textContent = '';

  revealButton.disabled = false;
  nextButton.disabled = false;
}


function revealAnswer() {
  const current = dailyVocabulary[currentIndex];

  answer.textContent = current.english;
}


function nextQuestion() {
  currentIndex = currentIndex + 1;

  if (currentIndex >= dailyVocabulary.length) {
    finishPractice();
    return;
  }

  showQuestion();
}


function finishPractice() {
  progress.textContent = '20 of 20 complete';
  question.textContent = 'Daily practice complete!';
  answer.textContent = 'آفرین! Âfarin!';

  revealButton.disabled = true;
  nextButton.disabled = true;
}


loadDailyVocabulary();