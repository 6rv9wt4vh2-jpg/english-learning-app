import glob,json,re,os
out='/workspace/english-app/src/data/decks'
os.makedirs(out,exist_ok=True)
meta={'a1':'Oxford 3000 A1','a2':'Oxford 3000 A2','b1':'Oxford 3000 B1','b2plus':'Oxford 5000 B2 (extra)','c1':'Oxford 5000 C1'}
pref={'a1':'a1','a2':'a2','b1':'b1','b2plus':'b2x','c1':'c1'}
for deck,p in pref.items():
    files=sorted(glob.glob(f'/workspace/oxford/done/{p}_*.txt'))
    cards=[]
    for f in files:
        for line in open(f,encoding='utf8'):
            line=line.strip()
            if not line: continue
            parts=line.split('|')
            assert len(parts)==5,(f,line)
            en,pos,ru,ex,exru=[x.strip() for x in parts]
            en=re.sub(r'(?<=[a-z])\d$','',en)
            cards.append(dict(id=f'{deck}-{len(cards)+1:04d}',en=en,pos=pos,ru=ru,example=ex,exampleRu=exru))
    body=',\n'.join('  '+json.dumps(c,ensure_ascii=False) for c in cards)
    open(f'{out}/{deck}.ts','w',encoding='utf8').write(f'import type {{ DeckCard }} from "@/lib/decks";\n\n// {meta[deck]}: {len(cards)} cards\nexport const cards: DeckCard[] = [\n{body}{',' if cards else ''}\n];\n')
    print(deck,len(cards))
