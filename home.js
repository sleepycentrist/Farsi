const menu = document.getElementById('topics');

for (const category in topicNames) {
  const link = document.createElement('a');
  link.className = 'topic';
  link.href = 'practice.html?category=' + category;
  link.textContent = topicNames[category];
  menu.appendChild(link);
}
