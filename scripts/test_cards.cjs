const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function context(category) {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {textContent:'',disabled:true,hidden:false,classList:{add(){},toggle(){}},addEventListener(){}});
    return elements.get(id);
  }
  return vm.createContext({URLSearchParams, window:{location:{search:'?category='+category}},document:{getElementById:element,querySelector:element},fetch:async name=>({ok:true,json:async()=>JSON.parse(read(name))}),console});
}
async function run() {
  for (const category of ['time','family','food','verbs','actions','kitchen','places','endings','clothing']) {
    const c=context(category);
    for(const f of ['topics.js','cards.js','script.js'])vm.runInContext(read(f),c);
    await vm.runInContext('loadVocabulary()',c);
    vm.runInContext('revealAnswer()',c);
    const answer=vm.runInContext('answer.textContent',c);
    assert(answer.length>0,category);
    if (category==='verbs'||category==='actions') {
      assert.match(answer,/Present stem:/); assert.match(answer,/Command:/);
      assert.equal(vm.runInContext('vocabulary.length',c),72);
      assert(!vm.runInContext('question.textContent',c).includes('raftan'));
    }
    const count=vm.runInContext('vocabulary.length',c);
    for(let i=0;i<count;i++)vm.runInContext('nextQuestion(); revealAnswer()',c);
    assert.equal(vm.runInContext('currentIndex',c),0);
  }
  const c=context('');
  for(const f of ['utils.js','cards.js','daily.js'])vm.runInContext(read(f),c);
  await vm.runInContext('loadDailyVocabulary()',c);
  assert.equal(vm.runInContext('dailyVocabulary.length',c),20);
  for(let i=0;i<20;i++)vm.runInContext('revealAnswer(); nextQuestion()',c);
  assert.equal(vm.runInContext('question.textContent',c),'Daily practice complete!');
  const words=JSON.parse(read('questions.json'));
  assert.equal(words.filter(x=>x.english.toLowerCase()==='today').length,1);
  assert(!words.some(x=>['society','kitchen','places','actions'].includes(x.category)));
  for(const id of ['vocab-0380','vocab-0200','vocab-0488','vocab-0516','vocab-0414'])assert(!words.some(x=>x.id===id));
  const box=words.find(x=>x.id==='vocab-0515');
  assert.match(vm.runInContext('cardAnswer',c)(box,'both'),/Plural:.*جعبه/);
  const weekly=JSON.parse(read('weekly-phrases.json'));
  assert.equal(weekly.phrases.length,10);
  assert.match(read('index.html'),/<details class="weekly-phrases">/);
  for(const phrase of weekly.phrases)assert(read('index.html').includes(phrase.farsi));
  console.log('Topic navigation, 72 root cards, plural answers, daily completion and weekly phrases passed.');
}
run().catch(e=>{console.error(e);process.exitCode=1});
