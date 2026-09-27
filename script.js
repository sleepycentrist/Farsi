let vocabulary = [];
let currentIndex = 0;

const parameters = new URLSearchParams(window.location.search);
const selectedTopic = parameters.get('category');

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const progress = document.getElementById('progress');
const revealButton = document.getElementById('reveal');
const nextButton = document.getElementById('next');

revealButton.addEventListener('click', revealAnswer);
nextButton.addEventListener('click', nextQuestion);

async function loadVocabulary() {
  if (!Object.hasOwn(topicNames, selectedTopic)) {
    question.textContent = 'Choose a topic from the homepage first.';
    return;
  }

  document.getElementById('topic-title').textContent =
    topicNames[selectedTopic];

  try {
    const response = await fetch('questions.json');

    if (!response.ok) {
      throw new Error('File request failed: ' + response.status);
    }

    const allVocabulary = await response.json();

    vocabulary = allVocabulary.filter(function (entry) {
      return entry.category === selectedTopic;
    });

    if (vocabulary.length === 0) {
      question.textContent =
        'No words in this topic yet. Check the category labels in your JSON.';
      return;
    }

    showQuestion();
  } catch (error) {
    question.textContent = 'Could not load vocabulary: ' + error.message;
  }
}

function showQuestion() {
  const current = vocabulary[currentIndex];

  question.textContent = 'What does ' + current.farsi + ' mean?';

  progress.textContent =
    'Card ' + (currentIndex + 1) + ' of ' + vocabulary.length;

  answer.textContent = '';
  revealButton.disabled = false;
  nextButton.disabled = true;
}

function revealAnswer() {
  answer.textContent = vocabulary[currentIndex].english;
  revealButton.disabled = true;
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