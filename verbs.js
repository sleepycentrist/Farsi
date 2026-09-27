function checkVerb(choice) {
  const feedback = document.getElementById('verb-feedback');

  if (choice === 'khâhad raft') {
    feedback.textContent =
      'Correct! Khâhad agrees with he/she. Raft is the past stem, which stays unchanged in the future construction.';
  } else if (choice === 'miravad') {
    feedback.textContent =
      'Miravad is the present form: he/she goes. Try the explicit future form.';
  } else {
    feedback.textContent =
      'Raft on its own means he/she went. The future needs another word before it.';
  }
}