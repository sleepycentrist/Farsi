let exercises = [];
let exerciseIndex = 0;
let selectedTiles = [];

const prompt = document.getElementById('sentence-prompt');
const progress = document.getElementById('sentence-progress');
const wordBank = document.getElementById('word-bank');
const sentenceBox = document.getElementById('sentence-answer');
const feedback = document.getElementById('sentence-feedback');

const checkButton = document.getElementById('check-sentence');
const resetButton = document.getElementById('reset-sentence');
const nextButton = document.getElementById('next-sentence');

checkButton.addEventListener('click', checkSentence);
resetButton.addEventListener('click', showExercise);
nextButton.addEventListener('click', nextExercise);

async function loadExercises() {
  try {
    const response = await fetch('sentences.json');

    if (!response.ok) {
      throw new Error('File request failed: ' + response.status);
    }

    exercises = await response.json();

    if (exercises.length === 0) {
      throw new Error('No exercises found');
    }

    showExercise();
  } catch (error) {
    prompt.textContent = 'Could not load exercises: ' + error.message;
  }
}

function showExercise() {
  selectedTiles = [];

  const exercise = exercises[exerciseIndex];

  prompt.textContent = exercise.prompt;
  progress.textContent =
    'Sentence ' + (exerciseIndex + 1) + ' of ' + exercises.length;

  resetButton.disabled = false;
  renderTiles();
}

function renderTiles() {
  const exercise = exercises[exerciseIndex];

  wordBank.innerHTML = '';
  sentenceBox.innerHTML = '';
  feedback.textContent = '';
  nextButton.disabled = true;

  exercise.tiles.forEach(function (word, tileIndex) {
    if (!selectedTiles.includes(tileIndex)) {
      const button = document.createElement('button');
      button.textContent = word;

      button.addEventListener('click', function () {
        selectedTiles.push(tileIndex);
        renderTiles();
      });

      wordBank.appendChild(button);
    }
  });

  selectedTiles.forEach(function (tileIndex, position) {
    const button = document.createElement('button');
    button.textContent = exercise.tiles[tileIndex];

    button.addEventListener('click', function () {
      selectedTiles.splice(position, 1);
      renderTiles();
    });

    sentenceBox.appendChild(button);
  });

  checkButton.disabled =
    selectedTiles.length !== exercise.tiles.length;
}

function checkSentence() {
  const exercise = exercises[exerciseIndex];

  const chosenWords = selectedTiles.map(function (tileIndex) {
    return exercise.tiles[tileIndex];
  });

  const isCorrect = exercise.acceptedAnswers.some(function (answer) {
    return (
      answer.length === chosenWords.length &&
      answer.every(function (word, position) {
        return word === chosenWords[position];
      })
    );
  });

  if (isCorrect) {
    feedback.textContent = 'Correct! ' + exercise.explanation;
    nextButton.disabled = false;
  } else {
    feedback.textContent =
      'That order does not match an accepted answer for this exercise. Try rearranging the tiles.';
    nextButton.disabled = true;
  }
}

function nextExercise() {
  exerciseIndex = exerciseIndex + 1;

  if (exerciseIndex >= exercises.length) {
    exerciseIndex = 0;
  }

  showExercise();
}

loadExercises();