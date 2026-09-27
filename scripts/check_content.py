"""Check the app's lesson data before publishing."""
import json
import re
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parents[1]
topics = set(re.findall(r'"([a-z-]+)":', (root / 'topics.js').read_text()))
for filename in ('questions.json', 'sentences.json'):
    rows = json.loads((root / filename).read_text())
    assert isinstance(rows, list) and rows, f'{filename}: empty or invalid data'
    ids = [row['id'] for row in rows]
    assert len(ids) == len(set(ids)), f'{filename}: duplicate IDs'
    for row in rows:
        if filename == 'questions.json':
            assert row['farsi'].strip() and row['english'].strip(), row['id']
            assert row['category'] in topics, row['id']
        else:
            assert row['prompt'].strip() and row['explanation'].strip(), row['id']
            assert row['tiles'] and row['acceptedAnswers'], row['id']
            for answer in row['acceptedAnswers']:
                assert Counter(answer) == Counter(row['tiles']), row['id']
    print(f'{filename}: {len(rows)} entries checked')

verbs = json.loads((root / 'verbs.json').read_text())
assert len({v['id'] for v in verbs}) == len(verbs), 'Duplicate verb IDs'
for verb in verbs:
    for key in ('meaning', 'infinitive', 'presentStem', 'pastStem'):
        assert isinstance(verb[key], str) and verb[key].strip(), (verb['id'], key)
    assert set(verb['forms']) == {'present', 'presentContinuous', 'past', 'pastContinuous', 'future', 'must'}, verb['id']
    for tense, forms in verb['forms'].items():
        if not forms and verb['id'] in {'be', 'have', 'be-located', 'can'} and tense in {'presentContinuous', 'pastContinuous'}:
            continue  # Existing bank intentionally omits these continuous forms.
        assert set(forms) == {'i', 'you', 'heShe', 'we', 'youPlural', 'they'}, verb['id']
        for variants in forms.values():
            assert isinstance(variants, list) and variants and all(isinstance(v,str) and v.strip() for v in variants), verb['id']
print(f'verbs.json: {len(verbs)} verbs checked')
