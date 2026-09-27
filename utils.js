function shuffle(items) {
  const mixed = [...items];

  for (let i = mixed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }

  return mixed;
}