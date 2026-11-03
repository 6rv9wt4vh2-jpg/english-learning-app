import { mk, type Unit } from "./types";
const { g, r, w } = mk("C1");

export const units: Unit[] = [
g("inversion", "Inversion for emphasis", "Инверсия для выразительности",
`После отрицательных и ограничительных выражений в начале предложения порядок слов становится вопросительным: Never have I seen such chaos.
Типичные выражения: Never, Rarely, Seldom, Hardly … when, No sooner … than, Not only … but also, Under no circumstances, Only then / Only after, Little did I know.
Это формальный, книжный стиль — уместен в эссе и речах.`,
`Never have I felt so embarrassed.|Никогда я не чувствовал себя так неловко.
No sooner had we arrived than it started to rain.|Едва мы приехали, как пошёл дождь.
Not only is she clever, but she is also kind.|Она не только умна, но и добра.
Under no circumstances should you open this door.|Ни при каких обстоятельствах не открывайте эту дверь.`,
[["Rarely ___ such a talented student.", "have I met", ["I have met", "have I met", "I met"]], ["No sooner had he sat down ___ the phone rang.", "than", ["when", "than", "that"]], ["Little ___ I know what was going to happen.", "did"], ["Not only ___ late, but he also forgot the tickets.", "was he", ["he was", "was he", "he is"]]]),

g("advanced-conditionals", "Alternatives to if", "Альтернативы if",
`Инверсия вместо if (формально): Had I known… = If I had known…; Were she to resign… = If she resigned…; Should you need help… = If you need help…
Другие связки: provided / providing (that), as long as, on condition that — «при условии»; unless — «если не»; otherwise — «иначе»; but for — «если бы не».`,
`Had I known, I would have called.|Знай я об этом, я бы позвонил.
Should you have any questions, please contact us.|Если у вас возникнут вопросы, свяжитесь с нами.
You can borrow it as long as you return it.|Можешь взять, если вернёшь.
But for your help, we would have failed.|Если бы не твоя помощь, мы бы провалились.`,
[["___ you require assistance, call reception.", "Should", ["Had", "Should", "Were"]], ["___ I been there, I would have helped.", "Had", ["Had", "Should", "Were"]], ["We'll go ___ it rains. (если не)", "unless", ["unless", "provided", "otherwise"]], ["___ he to win, it would be a miracle.", "Were"]]),

g("participle-clauses", "Participle clauses", "Причастные обороты",
`Причастные обороты делают текст сжатым: Walking home, I met Anna (= When I was walking…).
Perfect participle — предшествующее действие: Having finished the report, she left.
Passive participle: Built in 1890, the house needs repairs. Подлежащее обоих частей должно совпадать — иначе ошибка (dangling participle).`,
`Feeling tired, he went to bed early.|Чувствуя усталость, он рано лёг спать.
Having lost the key, we couldn't get in.|Потеряв ключ, мы не смогли войти.
Written in simple language, the book is easy to read.|Написанная простым языком, книга легко читается.
Not knowing what to say, I kept quiet.|Не зная, что сказать, я промолчал.`,
[["___ the email, she closed her laptop.", "Having sent", ["Sending", "Having sent", "Sent"]], ["___ in 1889, the tower is a symbol of Paris.", "Built", ["Building", "Built", "Having built"]], ["___ (not / know) the way, we asked a local.", "Not knowing"], ["Choose the correct sentence:", "Walking in the park, I saw a fox.", ["Walking in the park, a fox appeared.", "Walking in the park, I saw a fox.", "Walked in the park, I saw a fox."]]]),

g("subjunctive", "Subjunctive & formal structures", "Сослагательное наклонение",
`После suggest, recommend, insist, demand, it is essential / vital that используется базовая форма глагола без -s (формальный стиль): I suggest that he see a doctor. It is vital that she be informed.
It's (high) time + Past Simple — «давно пора»: It's time we left.
would rather + Past Simple о другом человеке: I'd rather you didn't smoke here.`,
`The board insisted that he resign.|Совет настоял на его отставке.
It is essential that every student attend.|Крайне важно, чтобы каждый студент присутствовал.
It's high time you found a job.|Тебе давно пора найти работу.
I'd rather you told me the truth.|Я бы предпочёл, чтобы ты сказал мне правду.`,
[["The doctor recommended that she ___ more.", "rest", ["rests", "rest", "rested"]], ["It's high time we ___ home.", "went", ["go", "went", "will go"]], ["I'd rather you ___ (not / tell) anyone.", "didn't tell/did not tell"], ["It is vital that he ___ on time.", "be", ["is", "be", "will be"]]]),

g("nominalisation", "Nominalisation", "Номинализация (академический стиль)",
`В академическом и деловом стиле действия часто превращают в существительные: The government decided… → The government's decision…; Prices increased sharply → There was a sharp increase in prices.
Это делает текст объективнее и плотнее. Типичные суффиксы: -tion, -ment, -ance/-ence, -ity, -al.`,
`The company expanded rapidly. → The rapid expansion of the company…|Компания быстро росла. → Быстрый рост компании…
They failed to agree. → Their failure to agree…|Они не смогли договориться. → Их неспособность договориться…
We analysed the data. → Analysis of the data showed…|Мы проанализировали данные. → Анализ данных показал…
People are concerned. → There is growing concern…|Люди обеспокоены. → Растёт обеспокоенность…`,
[["decide → ___", "decision"], ["fail → ___", "failure", ["failing", "failure", "failment"]], ["Unemployment rose. → There was a ___ in unemployment.", "rise", ["rise", "rising", "rose"]], ["refuse → ___", "refusal"]]),

g("hedging", "Hedging & cautious language", "Осторожные формулировки",
`В научных и дипломатичных текстах избегают категоричности. Средства: модальные (may, might, could), глаголы (appear, seem, tend to, suggest), наречия (arguably, apparently, presumably, to some extent), безличные конструкции (It could be argued that…, There is evidence to suggest…).`,
`The results suggest that diet may play a role.|Результаты указывают, что питание, возможно, играет роль.
It could be argued that the policy has failed.|Можно утверждать, что политика провалилась.
Prices tend to rise in winter.|Цены, как правило, растут зимой.
This is arguably his best novel.|Это, пожалуй, его лучший роман.`,
[["Choose the most cautious:", "The data appear to indicate a link.", ["The data prove a link.", "The data appear to indicate a link.", "There is definitely a link."]], ["It ___ be argued that cities are too crowded.", "could", ["must", "could", "will"]], ["Older people ___ to sleep less.", "tend", ["tend", "seem", "appear"]], ["This is ___ the most important discovery of the decade. (пожалуй)", "arguably"]]),

g("collocations", "Advanced collocations", "Устойчивые сочетания (C1)",
`Носители говорят не «make a decision bigger», а используют устойчивые пары: make a decision, take a risk, pay attention, raise awareness, bear in mind, draw a conclusion, meet a deadline, reach a compromise, highly unlikely, deeply concerned, bitterly disappointed.
Ошибки в коллокациях сразу выдают неносителя — учите их блоками.`,
`We need to raise awareness of the problem.|Нужно повысить осведомлённость о проблеме.
Bear in mind that the shop closes at six.|Учтите, что магазин закрывается в шесть.
They finally reached a compromise.|Они наконец достигли компромисса.
It's highly unlikely that he'll come.|Крайне маловероятно, что он придёт.`,
[["We must ___ the deadline.", "meet", ["make", "meet", "do"]], ["She was ___ disappointed by the result.", "bitterly", ["strongly", "bitterly", "highly"]], ["It's important to ___ attention to details.", "pay"], ["What conclusion can we ___ from this?", "draw", ["take", "draw", "make"]]]),

g("discourse-markers", "Discourse markers", "Дискурсивные маркеры",
`Маркеры организуют речь и показывают отношение: Admittedly (надо признать), Nevertheless (тем не менее), Consequently (следовательно), On the contrary (напротив), As far as … is concerned (что касается…), That said (при этом), In other words (иначе говоря), By the same token (по той же причине).
Not «moreover» everywhere — подбирайте по смыслу.`,
`Admittedly, the plan has risks. Nevertheless, it's worth trying.|Надо признать, у плана есть риски. Тем не менее стоит попробовать.
As far as cost is concerned, it's affordable.|Что касается стоимости, она доступна.
He isn't lazy. On the contrary, he works too hard.|Он не ленив. Напротив, он слишком много работает.
That said, I still have doubts.|При этом у меня всё ещё есть сомнения.`,
[["Sales fell sharply. ___, several shops closed.", "Consequently", ["Consequently", "Nevertheless", "On the contrary"]], ["I don't dislike him. ___, I admire him.", "On the contrary", ["Consequently", "On the contrary", "Admittedly"]], ["___, the hotel was expensive, but the service was perfect. (надо признать)", "Admittedly"], ["As far as I'm ___, the matter is closed.", "concerned"]]),

r("attention-economy", "The Attention Economy", "Экономика внимания",
`In an age of information abundance, the scarcest resource is no longer information itself but human attention. This insight, first articulated by the economist Herbert Simon in the 1970s, underpins the business model of today's technology giants. Platforms that appear to be free are, in effect, selling our attention to advertisers, and they have become extraordinarily skilled at capturing it. Infinite scrolling, autoplay and variable rewards such as unpredictable likes exploit the same psychological mechanisms as slot machines. Critics contend that this has measurable consequences: shorter attention spans, increased anxiety and a public discourse that rewards outrage over nuance. Defenders counter that users are not passive victims and that the same tools enable unprecedented access to education and connection. Whichever view one takes, it is hard to deny that the question of who controls our attention has become one of the defining political issues of the century.`,
`В эпоху изобилия информации самым дефицитным ресурсом стала уже не сама информация, а человеческое внимание. Эта идея, впервые сформулированная экономистом Гербертом Саймоном в 1970-х годах, лежит в основе бизнес-модели нынешних технологических гигантов. Платформы, которые кажутся бесплатными, по сути продают наше внимание рекламодателям и научились невероятно умело его захватывать. Бесконечная лента, автовоспроизведение и непредсказуемые вознаграждения вроде лайков используют те же психологические механизмы, что и игровые автоматы. Критики утверждают, что это имеет измеримые последствия: сокращение концентрации внимания, рост тревожности и публичный дискурс, вознаграждающий возмущение, а не нюансы. Защитники возражают, что пользователи — не пассивные жертвы и что те же инструменты открывают беспрецедентный доступ к образованию и общению. Какой бы точки зрения ни придерживаться, трудно отрицать, что вопрос о том, кто контролирует наше внимание, стал одним из определяющих политических вопросов века.`,
"abundance=изобилие; scarcest=самый дефицитный; articulated=сформулировал; underpins=лежит в основе; in effect=по сути; exploit=эксплуатируют; contend=утверждают; outrage=возмущение; nuance=нюанс; unprecedented=беспрецедентный",
[["According to the text, what is the scarcest resource today?", ["information", "human attention", "money"], 1], ["What do infinite scrolling and slot machines have in common?", ["They are both illegal.", "They use similar psychological mechanisms.", "They were invented by Simon."], 1], ["What do defenders argue?", ["Users are not passive victims.", "Platforms should be banned.", "Attention spans are growing."], 0]]),

r("placebo", "The Puzzle of the Placebo", "Загадка плацебо",
`Few phenomena in medicine are as perplexing as the placebo effect. Patients given sugar pills, believing them to be genuine medication, frequently report significant improvements in pain, nausea and even fatigue. More intriguingly still, recent studies have found that placebos can work even when patients are told openly that the pills contain no active ingredient. Researchers attribute this to the power of expectation and ritual: the act of being cared for, of taking a pill at a fixed time, appears to trigger the brain's own pain-relieving chemicals. The effect has its dark twin, however. The so-called nocebo effect occurs when negative expectations produce real symptoms; patients warned about possible side effects are considerably more likely to experience them. Understanding these mechanisms could transform not only how drugs are tested, but how doctors communicate with patients.`,
`Немногие явления в медицине столь загадочны, как эффект плацебо. Пациенты, получающие сахарные таблетки и считающие их настоящим лекарством, часто сообщают о заметном уменьшении боли, тошноты и даже усталости. Ещё любопытнее то, что недавние исследования показали: плацебо может действовать, даже когда пациентам открыто говорят, что в таблетках нет действующего вещества. Исследователи объясняют это силой ожидания и ритуала: сам факт заботы, приём таблетки в определённое время, по-видимому, запускают выработку собственных обезболивающих веществ мозга. Однако у эффекта есть тёмный двойник. Так называемый эффект ноцебо возникает, когда негативные ожидания вызывают реальные симптомы: пациенты, предупреждённые о возможных побочных эффектах, значительно чаще их испытывают. Понимание этих механизмов может изменить не только то, как испытывают лекарства, но и то, как врачи общаются с пациентами.`,
"perplexing=озадачивающий; genuine=настоящий; nausea=тошнота; fatigue=усталость; intriguingly=любопытно; active ingredient=действующее вещество; attribute=объясняют, приписывают; trigger=запускать; side effects=побочные эффекты; considerably=значительно",
[["What is surprising about recent studies?", ["Placebos never work.", "Placebos work even when patients know they are fake.", "Placebos cause addiction."], 1], ["What explains the placebo effect, according to researchers?", ["expectation and ritual", "sugar", "genetics"], 0], ["What is the nocebo effect?", ["Negative expectations producing real symptoms", "A stronger placebo", "A new drug"], 0]]),

r("urban-rewilding", "Rewilding Our Cities", "Возвращение дикой природы в города",
`For most of the twentieth century, urban planning treated nature as decoration at best and as an obstacle at worst. Rivers were buried in concrete channels, wetlands were drained and parks were mown into uniform lawns. A growing movement known as urban rewilding seeks to reverse this. In Seoul, a motorway was demolished to restore the Cheonggyecheon stream, which now cools the surrounding district by several degrees in summer. In London, beavers have been reintroduced to manage flooding, while cities across Europe are letting verges grow wild to support pollinators. Proponents argue that the benefits extend far beyond biodiversity: green spaces reduce stress, absorb rainwater and make neighbourhoods more resilient to heatwaves. Sceptics point to the cost and to residents who prefer tidy lawns. Yet as climate pressures mount, the question is increasingly not whether cities can afford to rewild, but whether they can afford not to.`,
`Большую часть двадцатого века градостроительство относилось к природе в лучшем случае как к украшению, а в худшем — как к помехе. Реки заключали в бетонные каналы, болота осушали, а парки выкашивали до однообразных газонов. Растущее движение под названием «городской ревайлдинг» стремится обратить это вспять. В Сеуле снесли автомагистраль, чтобы восстановить ручей Чхонгечхон, который теперь летом охлаждает окрестный район на несколько градусов. В Лондоне вновь заселили бобров, чтобы они помогали бороться с наводнениями, а города по всей Европе позволяют обочинам зарастать, поддерживая опылителей. Сторонники утверждают, что польза выходит далеко за рамки биоразнообразия: зелёные пространства снижают стресс, впитывают дождевую воду и делают районы устойчивее к жаре. Скептики указывают на расходы и на жителей, предпочитающих аккуратные газоны. Тем не менее по мере роста климатического давления вопрос всё чаще звучит не так: могут ли города позволить себе ревайлдинг, а так: могут ли они позволить себе обойтись без него.`,
"at best=в лучшем случае; obstacle=препятствие; drained=осушены; reverse=обратить вспять; demolished=снесли; reintroduced=вновь заселили; verges=обочины; pollinators=опылители; resilient=устойчивый; mount=нарастать",
[["What happened in Seoul?", ["A stream was buried.", "A motorway was removed to restore a stream.", "Beavers were introduced."], 1], ["Why were beavers reintroduced in London?", ["to attract tourists", "to manage flooding", "to eat insects"], 1], ["What is the main point of the final sentence?", ["Rewilding is too expensive.", "Cities may not be able to afford NOT to rewild.", "Lawns are better."], 1]]),

r("translation", "Lost in Translation", "Трудности перевода",
`Every translator knows that some words resist translation. The Portuguese "saudade", a bittersweet longing for something absent, or the Russian "toska", which Nabokov claimed no English word could render in all its shades, are classic examples. Yet the real difficulty often lies not in exotic vocabulary but in everyday pragmatics. A British "not bad" may express genuine enthusiasm; an American "interesting" can be a polite rejection. Directness, too, varies enormously: what sounds refreshingly honest in Moscow may come across as rude in London, while British understatement can strike Russians as evasive. Machine translation has become remarkably fluent at the level of sentences, but it still struggles with irony, implication and cultural subtext. For this reason, many linguists argue that the translator's role is shifting from converting words to mediating between cultures.`,
`Каждый переводчик знает, что некоторые слова сопротивляются переводу. Португальское «саудади» — светлая грусть по тому, чего нет рядом, — или русская «тоска», которую, по словам Набокова, ни одно английское слово не может передать во всех оттенках, — классические примеры. Однако настоящая трудность часто кроется не в экзотической лексике, а в повседневной прагматике. Британское «not bad» может выражать искренний восторг; американское «interesting» может быть вежливым отказом. Прямота тоже сильно различается: то, что в Москве звучит освежающе честно, в Лондоне может показаться грубым, а британская сдержанность может казаться русским уклончивостью. Машинный перевод стал удивительно гладким на уровне предложений, но всё ещё плохо справляется с иронией, подтекстом и культурным контекстом. Поэтому многие лингвисты считают, что роль переводчика смещается от перевода слов к посредничеству между культурами.`,
"resist=сопротивляются; bittersweet=горько-сладкий; longing=тоска, стремление; render=передать; shades=оттенки; pragmatics=прагматика; understatement=преуменьшение, сдержанность; evasive=уклончивый; subtext=подтекст; mediating=посредничество",
[["Where does the real difficulty of translation often lie?", ["in exotic words", "in everyday pragmatics", "in grammar"], 1], ["How might British understatement seem to Russians?", ["rude", "evasive", "enthusiastic"], 1], ["What does machine translation still struggle with?", ["sentence grammar", "irony and subtext", "spelling"], 1]]),

r("failure", "In Praise of Failure", "Похвала неудаче",
`Silicon Valley has turned failure into something of a slogan: "fail fast, fail often". Beneath the cliché lies a serious idea. Studies of scientists and entrepreneurs suggest that early setbacks, far from being purely damaging, can predict later success — provided that people interpret them as information rather than as verdicts on their worth. The psychologist Carol Dweck famously distinguished between a "fixed mindset", in which ability is seen as innate, and a "growth mindset", in which it is seen as something developed through effort. Those with a growth mindset tend to persist after mistakes and seek out challenges. Critics, however, warn against romanticising failure. For many people, failing has real costs — debt, unemployment, lost years — that a slogan cannot erase. The lesson, perhaps, is not that failure is good, but that how we respond to it matters more than the failure itself.`,
`Кремниевая долина превратила неудачу почти в лозунг: «ошибайся быстро, ошибайся часто». За этим клише скрывается серьёзная мысль. Исследования учёных и предпринимателей показывают, что ранние неудачи, вовсе не будучи исключительно вредными, могут предсказывать будущий успех — при условии, что люди воспринимают их как информацию, а не как приговор своей ценности. Психолог Кэрол Дуэк известна тем, что разграничила «фиксированное мышление», при котором способности считаются врождёнными, и «мышление роста», при котором их считают развиваемыми через усилия. Люди с мышлением роста обычно не сдаются после ошибок и ищут сложные задачи. Однако критики предостерегают от романтизации неудач. Для многих провал имеет реальную цену — долги, безработица, потерянные годы, — которую лозунг не сотрёт. Урок, возможно, не в том, что неудача — это хорошо, а в том, что наша реакция на неё важнее самой неудачи.`,
"beneath=под, за; setbacks=неудачи; verdicts=приговоры; innate=врождённый; persist=упорствовать; romanticising=романтизация; erase=стереть; cliché=клише; entrepreneurs=предприниматели",
[["When can early setbacks predict success?", ["When they are seen as information.", "When they are ignored.", "Always."], 0], ["What is a growth mindset?", ["Belief that ability is innate", "Belief that ability develops through effort", "Fear of mistakes"], 1], ["What do critics warn against?", ["romanticising failure", "studying psychology", "starting companies"], 0]]),

w("discursive", "Discursive Essay", "Аргументативное эссе",
"'Governments should tax unhealthy food.' To what extent do you agree?",
"«Правительства должны облагать налогом вредную еду». В какой степени вы согласны?", 250,
`Rising rates of obesity have prompted many governments to consider taxing sugary and processed foods. While such a measure is not without drawbacks, I would argue that, as part of a broader strategy, it is largely justified.
The principal argument in favour is that price shapes behaviour. Evidence from countries that have introduced sugar taxes, such as Mexico and the UK, indicates a measurable fall in consumption. Moreover, the revenue raised can be reinvested in public health campaigns or subsidies for fresh produce, thereby addressing the problem from both sides.
Admittedly, critics raise legitimate concerns. Such taxes are regressive, hitting low-income households hardest, and they may be perceived as paternalistic interference in personal choice. Nevertheless, these objections can be mitigated if the tax is accompanied by measures that make healthy food more affordable.
In conclusion, a tax on unhealthy food is no panacea, but, provided it is carefully designed, it can be an effective tool for improving public health.`,
["Чёткий тезис (to what extent)", "Аргументы с доказательствами", "Признание контраргументов (Admittedly)", "Опровержение (Nevertheless)", "Номинализация и осторожные формулировки", "Сбалансированное заключение"],
"I would argue that…=Я бы утверждал, что…; The principal argument in favour is…=Главный аргумент «за» — …; Evidence indicates…=Данные указывают…; Admittedly,…=Надо признать…; these objections can be mitigated=эти возражения можно смягчить; is no panacea=не панацея"),

w("proposal", "A Proposal", "Предложение (proposal)",
"Your city council invites proposals for improving public spaces. Write a proposal describing your idea, its benefits and how it could be implemented.",
"Городской совет принимает предложения по улучшению общественных пространств. Опишите идею, её пользу и способ реализации.", 230,
`Proposal: Transforming Riverside Car Park into a Community Garden
Purpose
This proposal outlines a plan to convert the under-used car park on Riverside Street into a community garden.
Current situation
The car park is rarely more than a third full, yet it occupies one of the most attractive locations in the city. The area currently lacks green space, and residents have repeatedly expressed a desire for somewhere to relax.
Proposed changes
I propose replacing the tarmac with raised vegetable beds, wildflower meadows and seating areas. A small pavilion could host workshops on gardening and sustainable living.
Benefits
Not only would the garden improve the appearance of the riverside, but it would also encourage social interaction and provide educational opportunities for local schools.
Implementation
The project could be funded through a combination of council grants and local sponsorship, with volunteers maintaining the garden.
I am confident that this initiative would significantly enhance quality of life in the area.`,
["Заголовок и разделы", "Описание текущей проблемы", "Конкретные предложения", "Польза (инверсия Not only would…)", "Финансирование и реализация", "Убедительное заключение"],
"This proposal outlines…=Это предложение описывает…; I propose…=Я предлагаю…; Not only would…, but…=Это не только…, но и…; could be funded through…=могло бы финансироваться за счёт…; I am confident that…=Я уверен, что…; enhance quality of life=повысить качество жизни"),

w("formal-letter", "Letter to an Editor", "Письмо в редакцию",
"A newspaper published an article claiming that learning foreign languages is pointless because of machine translation. Write a letter to the editor responding to it.",
"Газета опубликовала статью о том, что учить языки бессмысленно из-за машинного перевода. Напишите письмо в редакцию.", 220,
`Dear Editor,
I am writing in response to last Monday's article, "Why Bother Learning Languages?", which argued that machine translation has made language learning obsolete. While I acknowledge the impressive progress of translation software, I believe the article's conclusion is fundamentally mistaken.
Firstly, language is not merely a code for exchanging information. Learning another language gives us access to a different way of thinking, to humour, literature and nuance that no app can fully convey. Secondly, research consistently links bilingualism with cognitive benefits, including improved concentration and a later onset of dementia.
Furthermore, relationships are built on direct communication. Few people would wish to conduct a friendship, let alone a romance, through a phone screen.
Far from being pointless, language learning is arguably more valuable than ever in an increasingly interconnected world.
Yours faithfully,
Elena Volkova`,
["Ссылка на статью и цель письма", "Уважительное несогласие (While I acknowledge…)", "2–3 развёрнутых аргумента", "Продвинутая лексика и связки", "Сильный финал"],
"I am writing in response to…=Пишу в ответ на…; While I acknowledge…=Признавая…; fundamentally mistaken=в корне ошибочный; let alone=не говоря уже о; Far from being…=Отнюдь не будучи…; arguably=пожалуй, можно утверждать"),

w("review-c1", "A Critical Review", "Критическая рецензия",
"Write a review of a book you have read, assessing its strengths and weaknesses and who would benefit from reading it.",
"Напишите рецензию на прочитанную книгу, оценив сильные и слабые стороны и кому она будет полезна.", 220,
`Yuval Noah Harari's "Sapiens" sets itself a breathtakingly ambitious goal: to tell the entire history of humankind in under five hundred pages. Remarkably, it largely succeeds.
The book's greatest strength lies in its ability to make complex ideas accessible. Harari's central claim — that our species dominates the planet because of its unique capacity to believe in shared fictions such as money, nations and religions — is both provocative and illuminating. His prose is lively, peppered with memorable examples and dry humour.
That said, the book is not without flaws. In his eagerness to construct a grand narrative, Harari occasionally oversimplifies, and specialists have criticised some of his more sweeping generalisations. Readers looking for rigorous academic analysis may find it frustrating.
Overall, "Sapiens" is a thought-provoking introduction to big-picture history. It is ideal for curious general readers, though it should be treated as a starting point for further reading rather than the final word.`,
["Сильное вступление с общей оценкой", "Сильные стороны с примерами", "Слабые стороны (That said / is not without flaws)", "Для кого книга", "Взвешенный итог"],
"sets itself the goal of…=ставит перед собой цель…; Its greatest strength lies in…=Её главная сила — в…; is not without flaws=не лишена недостатков; oversimplifies=чрезмерно упрощает; thought-provoking=заставляющий задуматься; a starting point rather than the final word=отправная точка, а не последнее слово"),
];
