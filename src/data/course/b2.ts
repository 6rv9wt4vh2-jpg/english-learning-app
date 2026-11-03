import { mk, type Unit } from "./types";
const { g, r, w } = mk("B2");

export const units: Unit[] = [
g("third-conditional", "Third & mixed conditionals", "Третий и смешанный тип условных",
`Третий тип — нереальное прошлое, сожаление или упрёк: If + Past Perfect, would have + 3-я форма. If I had left earlier, I wouldn't have missed the train.
Смешанный тип — прошлое условие и настоящий результат: If I had studied medicine, I would be a doctor now.
Или наоборот — постоянное качество и прошлый результат: If I weren't so shy, I would have spoken to her.`,
`If you had told me, I would have helped.|Если бы ты мне сказал, я бы помог.
She wouldn't have failed if she had prepared.|Она бы не провалилась, если бы подготовилась.
If I had taken that job, I would live in London now.|Если бы я тогда согласился на ту работу, я бы сейчас жил в Лондоне.
If he were more careful, he wouldn't have crashed.|Будь он внимательнее, он бы не разбился.`,
[["If I had known, I ___ come.", "would have", ["would", "would have", "will have"]], ["If we ___ (take) a taxi, we would have arrived on time.", "had taken"], ["If she had saved money, she ___ be rich now.", "would", ["would", "would have", "had"]], ["They wouldn't have lost if they ___ harder.", "had tried", ["tried", "had tried", "would try"]]]),

g("modals-deduction", "Modals of deduction", "Модальные глаголы предположения",
`Настоящее: must (наверняка), might / may / could (возможно), can't (не может быть): She must be at work. He can't be serious!
Прошлое: модальный + have + 3-я форма: They must have forgotten. She might have missed the bus. He can't have seen us.`,
`The lights are off — they must be asleep.|Свет выключен — наверное, они спят.
She might be stuck in traffic.|Возможно, она стоит в пробке.
You can't have finished already!|Не может быть, что ты уже закончил!
He must have lost his keys.|Он, должно быть, потерял ключи.`,
[["He's been working 12 hours. He ___ be exhausted.", "must", ["must", "can't", "might not"]], ["That ___ be Anna — she's in Paris.", "can't", ["must", "can't", "may"]], ["The road is wet. It must have ___ (rain).", "rained"], ["I'm not sure, but she ___ have taken the earlier train.", "might/may/could", ["must", "might", "can't"]]]),

g("passive-advanced", "Advanced passive", "Пассив: сложные формы",
`Пассив во всех временах: is being built, has been sold, will be announced, should be done.
Безличные конструкции: It is said that… / He is said to be… (говорят, что он…), It is believed that…, She is thought to have left.
have something done — сделать что-то не самому: I had my hair cut.`,
`The road is being repaired.|Дорогу сейчас ремонтируют.
The results will be announced tomorrow.|Результаты объявят завтра.
He is said to be a millionaire.|Говорят, он миллионер.
We had our flat renovated.|Нам сделали ремонт в квартире.`,
[["The new bridge ___ built at the moment.", "is being", ["is being", "has been", "is"]], ["The winner will ___ announced tonight.", "be"], ["She is believed ___ left the country.", "to have", ["to", "to have", "having"]], ["I need to have my car ___ (repair).", "repaired"]]),

g("wish", "wish / if only", "Конструкции с wish",
`Сожаление о настоящем: wish + Past Simple — I wish I had more time (жаль, что у меня мало времени).
Сожаление о прошлом: wish + Past Perfect — I wish I hadn't said that.
Раздражение или желание изменить чужое поведение: wish + would — I wish you would stop talking. If only — то же, но эмоциональнее.`,
`I wish I lived by the sea.|Жаль, что я не живу у моря.
I wish I hadn't eaten so much.|Зря я столько съел.
If only I had listened to you!|Если бы только я тебя послушал!
I wish it would stop raining.|Хоть бы дождь перестал.`,
[["I wish I ___ speak French.", "could", ["can", "could", "would"]], ["She wishes she ___ (not / sell) her car.", "hadn't sold/had not sold"], ["I wish you ___ stop interrupting me!", "would", ["will", "would", "had"]], ["If only I ___ taller!", "were", ["am", "were", "had been"]]]),

g("narrative-tenses", "Future continuous & perfect", "Future Continuous и Future Perfect",
`Future Continuous — процесс в момент в будущем: This time tomorrow I'll be flying to Rome. Also polite questions: Will you be using the car tonight?
Future Perfect — действие завершится к моменту в будущем: By 2030 I will have finished my degree. By the time you arrive, we'll have eaten.`,
`At 10 tomorrow I'll be taking an exam.|Завтра в 10 я буду сдавать экзамен.
By June she will have saved enough money.|К июню она накопит достаточно денег.
Don't call at 8 — we'll be having dinner.|Не звони в 8 — мы будем ужинать.
Will you have finished by Friday?|Ты закончишь к пятнице?`,
[["This time next week I'll be ___ (lie) on a beach.", "lying"], ["By the end of the year we ___ moved house.", "will have", ["will", "will have", "will be"]], ["Don't come at 9 — I'll ___ working.", "be", ["be", "have", "been"]], ["By 2030 scientists will have ___ (find) a cure.", "found"]]),

g("linking", "Linking words of contrast & purpose", "Связки противопоставления и цели",
`Противопоставление: although / even though + предложение; despite / in spite of + существительное или -ing; however — в начале нового предложения; whereas — «тогда как».
Цель: to / in order to + глагол; so that + предложение; so as not to.`,
`Although it was raining, we went out.|Хотя шёл дождь, мы пошли гулять.
Despite the rain, we went out.|Несмотря на дождь, мы пошли гулять.
He's rich. However, he isn't happy.|Он богат. Однако он не счастлив.
I left early so that I wouldn't miss the train.|Я вышел рано, чтобы не опоздать на поезд.`,
[["___ being tired, she kept working.", "Despite", ["Although", "Despite", "However"]], ["___ he had studied, he failed.", "Although", ["Despite", "Although", "In spite of"]], ["I'm saving money in order ___ buy a flat.", "to"], ["Speak slowly so ___ everyone can understand.", "that"]]),

g("inversion-emphasis", "Cleft sentences for emphasis", "Выделительные конструкции",
`Чтобы выделить часть предложения, используем It is/was … that/who: It was Anna who called (именно Анна).
What-cleft: What I need is a holiday (что мне нужно — так это отпуск). All I want is… (всё, чего я хочу…).
Эмфатическое do/does/did: I do like it! (я правда люблю это).`,
`It was my brother who broke the window.|Именно мой брат разбил окно.
What I love about Paris is the food.|Что я люблю в Париже — так это еду.
All I need is some sleep.|Всё, что мне нужно, — немного поспать.
I did lock the door, I promise!|Я правда запер дверь, обещаю!`,
[["___ was in 2015 that we met.", "It", ["It", "What", "This"]], ["___ I don't understand is why he left.", "What", ["That", "What", "It"]], ["It was Tom ___ told me the news.", "who/that"], ["You're wrong — I ___ send the email! (эмфатическое)", "did", ["do", "did", "have"]]]),

g("verb-patterns", "Verb + object + infinitive", "Сложное дополнение",
`После want, expect, ask, tell, advise, allow, encourage, persuade — объект + to: She wants me to help. He told us to wait.
После make и let — объект + глагол без to: They made me sign. Let him go.
После verbs of perception (see, hear, watch) — объект + глагол или -ing: I saw her leave / leaving.`,
`My parents want me to become a lawyer.|Родители хотят, чтобы я стал юристом.
The doctor advised him to rest.|Врач посоветовал ему отдохнуть.
She made us wait for an hour.|Она заставила нас ждать час.
I heard someone singing.|Я слышал, как кто-то пел.`,
[["My boss asked me ___ stay late.", "to", ["to", "for", "—"]], ["They made him ___ the form again.", "fill", ["to fill", "fill", "filling"]], ["I'd like you ___ (meet) my parents.", "to meet"], ["Let me ___ (help) you.", "help"]]),

r("ai-jobs", "Will Robots Take Our Jobs?", "Отберут ли роботы нашу работу?",
`Every major technological revolution has raised fears of mass unemployment. When machines appeared in factories in the nineteenth century, some workers even destroyed them in protest. Yet, in the long run, technology has created more jobs than it has eliminated. Today, artificial intelligence is reviving the same anxiety, and this time white-collar professions such as translators, accountants and lawyers seem to be at risk. Economists are divided. Optimists argue that AI will take over repetitive tasks, freeing people to focus on creative and interpersonal work. Pessimists warn that the transition could be painfully fast, leaving millions without the skills they need. What most experts agree on is that lifelong learning will be essential. Those who are prepared to adapt are likely to benefit; those who are not may be left behind.`,
`Каждая крупная технологическая революция вызывала страх массовой безработицы. Когда в девятнадцатом веке на фабриках появились машины, некоторые рабочие даже ломали их в знак протеста. Однако в долгосрочной перспективе технологии создали больше рабочих мест, чем уничтожили. Сегодня искусственный интеллект возрождает ту же тревогу, и на этот раз под угрозой, похоже, «офисные» профессии — переводчики, бухгалтеры и юристы. Экономисты расходятся во мнениях. Оптимисты утверждают, что ИИ возьмёт на себя рутинные задачи, освободив людей для творческой работы и работы с людьми. Пессимисты предупреждают, что переход может оказаться болезненно быстрым и оставить миллионы людей без нужных навыков. В чём согласно большинство экспертов, так это в том, что обучение на протяжении всей жизни будет необходимым. Те, кто готов адаптироваться, скорее всего выиграют; те, кто не готов, могут остаться позади.`,
"unemployment=безработица; in the long run=в долгосрочной перспективе; eliminated=уничтожили; reviving=возрождает; white-collar=офисный, «белые воротнички»; repetitive=однообразный; transition=переход; lifelong learning=обучение всю жизнь; left behind=остаться позади",
[["What happened in the 19th century?", ["Workers welcomed machines.", "Some workers destroyed machines.", "Unemployment disappeared."], 1], ["What do optimists believe?", ["AI will free people for creative work.", "AI will destroy all jobs.", "AI is a passing trend."], 0], ["What do most experts agree on?", ["AI should be banned.", "Lifelong learning is essential.", "Only lawyers are at risk."], 1]]),

r("sleep-science", "The Science of Sleep", "Наука о сне",
`For decades sleep was regarded as a passive state, a kind of pause in which nothing much happened. Research has overturned this view. While we sleep, the brain is remarkably active: it sorts and stores memories, clears away waste products and regulates hormones that control appetite and mood. Studies have shown that people who sleep less than six hours a night are more likely to catch colds, gain weight and make poor decisions. Despite this, sleep is often the first thing we sacrifice when we are busy. Scientists suggest a few simple rules: go to bed at the same time each night, avoid screens for an hour before sleeping and keep the bedroom cool and dark. Perhaps the most surprising finding is that a short nap of twenty minutes can significantly improve concentration.`,
`Десятилетиями сон считался пассивным состоянием, своего рода паузой, во время которой мало что происходит. Исследования опровергли эту точку зрения. Пока мы спим, мозг удивительно активен: он сортирует и сохраняет воспоминания, выводит продукты обмена и регулирует гормоны, контролирующие аппетит и настроение. Исследования показали, что люди, спящие меньше шести часов в сутки, чаще простужаются, набирают вес и принимают неудачные решения. Несмотря на это, сон — это обычно первое, чем мы жертвуем, когда заняты. Учёные предлагают несколько простых правил: ложиться спать в одно и то же время, не смотреть в экраны за час до сна и держать спальню прохладной и тёмной. Пожалуй, самое удивительное открытие — короткий двадцатиминутный сон днём может значительно улучшить концентрацию.`,
"regarded as=считался; overturned=опровергли; remarkably=удивительно; waste products=продукты обмена; appetite=аппетит; sacrifice=жертвовать; nap=короткий дневной сон; significantly=значительно",
[["How was sleep seen in the past?", ["as an active process", "as a passive state", "as dangerous"], 1], ["What can happen if you sleep less than six hours?", ["You catch colds more easily.", "You become taller.", "You remember more."], 0], ["What is the surprising finding?", ["Long naps are best.", "A 20-minute nap improves concentration.", "Screens help sleep."], 1]]),

r("fast-fashion", "The True Cost of Fast Fashion", "Настоящая цена быстрой моды",
`A T-shirt can now cost less than a sandwich, but its real price is paid elsewhere. The fashion industry is responsible for around ten per cent of global carbon emissions and is one of the largest consumers of water. Producing a single pair of jeans can require several thousand litres. Moreover, many garments are made in factories where workers earn very little and conditions are unsafe. Because clothes are so cheap, we buy far more than we need and throw them away after only a few wears. Some consumers are fighting back: second-hand shopping, clothing swaps and repair workshops are becoming increasingly popular. Several brands have also launched recycling schemes, although critics claim that these are often more about marketing than real change.`,
`Футболка сейчас может стоить меньше бутерброда, но её настоящая цена оплачивается в другом месте. Индустрия моды отвечает примерно за десять процентов мировых выбросов углерода и является одним из крупнейших потребителей воды. Производство одной пары джинсов может потребовать несколько тысяч литров. Более того, многие вещи шьют на фабриках, где работники получают очень мало, а условия небезопасны. Поскольку одежда такая дешёвая, мы покупаем гораздо больше, чем нужно, и выбрасываем её, надев всего несколько раз. Некоторые покупатели сопротивляются: секонд-хенд, обмен одеждой и мастерские по ремонту становятся всё популярнее. Ряд брендов также запустили программы переработки, хотя критики утверждают, что это часто скорее маркетинг, чем реальные перемены.`,
"elsewhere=в другом месте; carbon emissions=выбросы углерода; consumers=потребители; garments=предметы одежды; unsafe=небезопасный; second-hand=подержанный; swaps=обмены; recycling schemes=программы переработки",
[["What share of carbon emissions comes from fashion?", ["about 1%", "about 10%", "about 50%"], 1], ["Why do we throw clothes away quickly?", ["They are cheap, so we buy too many.", "They are made of paper.", "Fashion changes every day."], 0], ["What do critics say about recycling schemes?", ["They are perfect.", "They are often marketing.", "They are illegal."], 1]]),

r("language-learning", "Why Adults Can Learn Languages", "Почему взрослые могут учить языки",
`It is widely believed that children learn languages effortlessly while adults struggle. The truth is more nuanced. Children do have an advantage when it comes to pronunciation: those who start young are more likely to sound like native speakers. However, adults often make faster progress in the early stages because they can use strategies, understand grammar rules and draw on their knowledge of other languages. What matters most, researchers say, is not age but exposure and motivation. An adult who reads, listens and speaks every day will usually outperform a child who has two lessons a week. The key is consistency: twenty minutes daily is far more effective than three hours once a week.`,
`Принято считать, что дети учат языки без усилий, а взрослым это даётся с трудом. На самом деле всё сложнее. У детей действительно есть преимущество в произношении: те, кто начинает рано, чаще звучат как носители. Однако взрослые часто быстрее продвигаются на начальном этапе, потому что умеют использовать стратегии, понимают грамматические правила и опираются на знание других языков. Важнее всего, по словам исследователей, не возраст, а погружение и мотивация. Взрослый, который каждый день читает, слушает и говорит, обычно обгонит ребёнка с двумя уроками в неделю. Ключ — регулярность: двадцать минут каждый день гораздо эффективнее, чем три часа раз в неделю.`,
"effortlessly=без усилий; struggle=с трудом справляться; nuanced=неоднозначный, со множеством нюансов; native speakers=носители языка; draw on=опираться на; exposure=контакт с языком, погружение; outperform=превзойти; consistency=регулярность",
[["Where do children have an advantage?", ["grammar", "pronunciation", "vocabulary"], 1], ["What matters most according to researchers?", ["age", "exposure and motivation", "talent"], 1], ["Which is more effective?", ["3 hours once a week", "20 minutes every day", "a month abroad once a year"], 1]]),

r("museum-heist", "The Museum Mystery", "Загадка музея",
`On a quiet Sunday morning in 1911, the Mona Lisa disappeared from the Louvre. At first nobody noticed; the guards assumed it had been taken away to be photographed. Only the next day did the museum realise it had been stolen. The police questioned hundreds of people, including the poet Guillaume Apollinaire and the young painter Pablo Picasso, but no one was charged. For two years the painting seemed to have vanished. Then, in 1913, an Italian man called Vincenzo Peruggia tried to sell it to an art dealer in Florence. It turned out that he had worked at the Louvre and had simply hidden in a cupboard overnight, walking out with the painting under his coat. Ironically, the theft made the Mona Lisa the most famous painting in the world.`,
`Тихим воскресным утром 1911 года из Лувра исчезла «Мона Лиза». Сначала никто не заметил: охранники решили, что её унесли фотографировать. Только на следующий день в музее поняли, что её украли. Полиция допросила сотни людей, включая поэта Гийома Аполлинера и молодого художника Пабло Пикассо, но никому не предъявили обвинений. Два года казалось, что картина бесследно исчезла. Затем, в 1913 году, итальянец Винченцо Перуджа попытался продать её торговцу произведениями искусства во Флоренции. Оказалось, что он работал в Лувре и просто спрятался на ночь в шкафу, а потом вышел с картиной под пальто. Как ни парадоксально, именно кража сделала «Мону Лизу» самой знаменитой картиной в мире.`,
"disappeared=исчезла; assumed=предположили; questioned=допросили; charged=обвинён; vanished=бесследно исчезла; art dealer=торговец искусством; It turned out=оказалось; cupboard=шкаф; Ironically=по иронии судьбы; theft=кража",
[["Why didn't the guards notice at first?", ["They were asleep.", "They thought it was being photographed.", "It was a holiday."], 1], ["Who was the thief?", ["Picasso", "a former Louvre worker", "an art dealer"], 1], ["What was the result of the theft?", ["The painting was destroyed.", "The painting became world-famous.", "The Louvre closed."], 1]]),

w("for-against", "For and Against Essay", "Эссе «за и против»",
"Should university education be free for everyone? Discuss the advantages and disadvantages.",
"Должно ли высшее образование быть бесплатным для всех? Обсудите плюсы и минусы.", 180,
`Whether university education should be free is a question that divides societies. While there are strong arguments on both sides, the issue deserves careful consideration.
On the one hand, free education gives equal opportunities to talented students from poorer families. Without tuition fees, young people choose courses based on their interests rather than future salaries. Furthermore, a highly educated population benefits the whole economy.
On the other hand, someone has to pay. Free universities are funded by taxes, which means that people who never studied also contribute. Critics also argue that when something is free, students may value it less and take longer to graduate.
In conclusion, although free education is costly, I believe its long-term benefits outweigh the disadvantages, provided that the system is managed efficiently.`,
["Нейтральное вступление", "Абзац «за» с 2+ аргументами", "Абзац «против» с 2+ аргументами", "Заключение с вашей позицией", "Связки: On the one hand, Furthermore, Critics argue, In conclusion", "Формальный стиль"],
"On the one hand,…=С одной стороны…; On the other hand,…=С другой стороны…; Furthermore,…=Кроме того…; Critics argue that…=Критики утверждают, что…; outweigh=перевешивать; provided that…=при условии, что…; In conclusion,…=В заключение…"),

w("report", "A Report", "Отчёт",
"Your manager asked you to write a report on how to improve staff wellbeing in your company. Include findings and recommendations.",
"Руководитель попросил вас написать отчёт о том, как улучшить самочувствие сотрудников. Укажите результаты и рекомендации.", 170,
`Introduction
The aim of this report is to assess staff wellbeing and suggest ways of improving it. The information is based on an online survey completed by 85 employees.
Findings
Most employees are satisfied with their salary, but 60% reported feeling stressed because of heavy workloads. Many complained about the lack of a quiet space for breaks. Several staff members also mentioned that they rarely receive feedback.
Recommendations
I would recommend introducing flexible working hours, as this would help staff balance work and family life. It would also be advisable to turn the unused meeting room into a relaxation area. Finally, managers should hold short monthly one-to-one meetings with their teams.
Conclusion
If these changes are implemented, staff are likely to feel more motivated and productive.`,
["Заголовки разделов", "Цель отчёта во введении", "Факты/цифры в Findings", "Рекомендации с would recommend / It would be advisable", "Безличный формальный стиль"],
"The aim of this report is to…=Цель этого отчёта — …; The information is based on…=Информация основана на…; reported feeling…=сообщили, что чувствуют…; I would recommend…=Я бы рекомендовал…; It would be advisable to…=Было бы целесообразно…; are likely to=скорее всего"),

w("cover-letter", "A Cover Letter", "Сопроводительное письмо",
"Write a cover letter applying for a job you would like. Explain your experience and why you are suitable.",
"Напишите сопроводительное письмо на желаемую вакансию. Расскажите об опыте и почему вы подходите.", 160,
`Dear Ms Taylor,
I am writing to apply for the position of Marketing Assistant advertised on your website.
I have recently graduated in Economics and have spent the last year working as an intern at a digital agency, where I was responsible for running social media campaigns for three clients. As a result of my work, one client's online sales increased by 25%.
I believe I would be well suited to this role because I am creative, organised and comfortable working with data. I am also fluent in Russian and English, which could be useful for your international projects.
I would welcome the opportunity to discuss my application in an interview. Thank you for considering it.
Yours sincerely,
Pavel Smirnov`,
["Название позиции и источник", "Конкретный опыт с результатом (цифры)", "Почему вы подходите", "Просьба о собеседовании", "Yours sincerely при известном имени"],
"I am writing to apply for…=Пишу, чтобы откликнуться на…; I was responsible for…=Я отвечал за…; As a result,…=В результате…; I would be well suited to…=Я хорошо подошёл бы для…; I would welcome the opportunity to…=Буду рад возможности…; Yours sincerely,=Искренне Ваш,"),

w("article", "Magazine Article", "Статья в журнал",
"Write an article for a magazine: 'The best piece of advice I have ever received'.",
"Напишите статью для журнала: «Лучший совет, который я когда-либо получал».", 160,
`Have you ever been given advice that changed your life? I have — and it came from a very unexpected person.
When I was nineteen, I was terrified of failing. I refused to try anything I wasn't already good at. One day my grandmother, who had started painting at the age of seventy, watched me give up on a guitar lesson after ten minutes. "You don't have to be good to start," she said, "but you have to start to be good."
Those words stayed with me. Since then I've learnt to swim, run a marathon and speak two foreign languages — badly at first, of course!
So next time you hesitate, remember my grandmother. What's the worst that could happen?`,
["Цепляющий заголовок или вопрос к читателю", "Живой, неформальный стиль", "Личная история", "Прямая речь", "Финал, обращённый к читателю"],
"Have you ever…?=Вы когда-нибудь…?; It came from…=Это исходило от…; Those words stayed with me=Эти слова остались со мной; Since then…=С тех пор…; What's the worst that could happen?=Что самое худшее может случиться?"),
];
