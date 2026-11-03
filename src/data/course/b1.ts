import { mk, type Unit } from "./types";
const { g, r, w } = mk("B1");

export const units: Unit[] = [
g("pp-vs-ps", "Present Perfect vs Past Simple", "Present Perfect или Past Simple",
`Past Simple — законченное действие в конкретный момент прошлого (yesterday, in 2015, last week, when I was a child).
Present Perfect — результат важен сейчас или период ещё не закончен (today, this week, already, yet, just, since, for).
I lost my keys (когда-то, история). I've lost my keys (и сейчас их нет!). since — с какого момента (since 2020), for — сколько времени (for three years).`,
`I've lived here for five years.|Я живу здесь пять лет (и сейчас).
I lived in Omsk for five years.|Я жил в Омске пять лет (больше не живу).
Have you finished yet? — I finished an hour ago.|Ты уже закончил? — Я закончил час назад.
She has just left.|Она только что ушла.`,
[["I ___ him since we were children.", "have known", ["knew", "have known", "know"]], ["We ___ to Spain last summer.", "went", ["have gone", "went", "have been"]], ["Have you done your homework ___?", "yet", ["already", "yet", "ago"]], ["She has worked here ___ 2019.", "since"], ["They have been married ___ ten years.", "for"]]),

g("pp-continuous", "Present Perfect Continuous", "Present Perfect Continuous",
`Подчёркивает длительность действия, которое началось в прошлом и продолжается (или только что закончилось и виден результат).
Формула: have / has been + -ing. How long have you been learning English? I've been waiting for an hour.
Глаголы состояния (know, like, believe) в этом времени не используются: I've known her for years.`,
`I've been studying all day.|Я занимаюсь весь день.
It has been raining since morning.|Дождь идёт с утра.
Why are you tired? — I've been running.|Почему ты устал? — Я бегал.
How long have you been waiting?|Сколько ты уже ждёшь?`,
[["She ___ been working here for a year.", "has", ["have", "has", "is"]], ["How long have you been ___ (learn) Spanish?", "learning"], ["Choose the correct sentence:", "I've known him for years.", ["I've been knowing him for years.", "I've known him for years.", "I know him for years."]], ["My hands are dirty because I've been ___ (paint).", "painting"]]),

g("past-perfect", "Past Perfect", "Предпрошедшее время",
`Past Perfect показывает, что одно действие произошло раньше другого в прошлом. Формула: had + 3-я форма.
When I arrived, the film had already started. (сначала начался фильм, потом я пришёл)
Часто с already, before, by the time, after.`,
`When we got to the station, the train had left.|Когда мы пришли на вокзал, поезд уже ушёл.
She had never seen the sea before that trip.|До той поездки она никогда не видела моря.
After he had finished work, he went home.|Закончив работу, он пошёл домой.
I realised I had forgotten my passport.|Я понял, что забыл паспорт.`,
[["By the time I came, they ___ eaten everything.", "had", ["have", "had", "were"]], ["He was sad because he had ___ (lose) his job.", "lost"], ["When she called, I ___ already gone to bed.", "had", ["had", "have", "was"]], ["They ___ never been abroad before 2010.", "had"]]),

g("second-conditional", "Second Conditional", "Второй тип условных предложений",
`Нереальное или маловероятное условие в настоящем/будущем: If + Past Simple, would + глагол.
If I had more money, I would travel. (Но денег мало.)
С to be часто используют were для всех лиц: If I were you, I would apologise — На твоём месте я бы извинился.`,
`If I won the lottery, I would buy a house.|Если бы я выиграл в лотерею, я купил бы дом.
If she lived nearer, we would see her more often.|Если бы она жила ближе, мы бы виделись чаще.
What would you do if you lost your job?|Что бы ты делал, если бы потерял работу?
If I were you, I'd take the job.|На твоём месте я бы согласился на эту работу.`,
[["If I ___ rich, I would help everyone.", "were", ["am", "were", "will be"]], ["If he studied more, he ___ pass.", "would", ["will", "would", "can"]], ["If I ___ (know) the answer, I'd tell you.", "knew"], ["What would you do if you ___ a ghost?", "saw", ["see", "saw", "seen"]]]),

g("passive", "Passive voice (present & past)", "Страдательный залог",
`Пассив используем, когда важно действие, а не тот, кто его совершил. Формула: be + 3-я форма.
Present: English is spoken all over the world. Past: The bridge was built in 1900.
Исполнителя можно указать через by: The book was written by Tolstoy.`,
`Cars are made in this factory.|На этом заводе делают машины.
The window was broken yesterday.|Окно разбили вчера.
The letters are delivered every morning.|Письма доставляют каждое утро.
This song was written by the Beatles.|Эту песню написали «Битлз».`,
[["Paper ___ made from wood.", "is", ["is", "are", "was"]], ["The museum was ___ (open) in 1852.", "opened"], ["These photos were taken ___ my father.", "by", ["from", "by", "with"]], ["Choose the passive:", "The cake was eaten.", ["They ate the cake.", "The cake was eaten.", "The cake ate."]]]),

g("relative-clauses", "Relative clauses", "Придаточные определительные",
`who — для людей, which — для предметов и животных, that — для обоих (в разговоре), where — для мест, whose — «чей».
The woman who lives next door is a doctor. The phone which I bought is broken. This is the café where we met.
Если who/which/that — дополнение, его можно опустить: The film (that) I saw was great.`,
`The man who called you is my boss.|Мужчина, который тебе звонил, — мой начальник.
I like books which make me think.|Мне нравятся книги, которые заставляют думать.
That's the hotel where we stayed.|Это отель, где мы останавливались.
She's the girl whose dog bit me.|Это девушка, чья собака меня укусила.`,
[["The girl ___ won the prize is my cousin.", "who", ["who", "which", "where"]], ["This is the house ___ I was born.", "where", ["which", "where", "who"]], ["I lost the watch ___ you gave me.", "which/that", ["who", "which", "where"]], ["He's the man ___ car was stolen.", "whose"]]),

g("reported-speech", "Reported speech", "Косвенная речь",
`При пересказе после said / told время обычно «сдвигается назад»: am → was, do → did, will → would, have done → had done, can → could.
"I'm tired," she said. → She said (that) she was tired.
tell требует объекта: He told me… ; say — без объекта: He said… Вопросы: She asked if I was OK. / He asked where I lived.`,
`"I like pizza." → He said he liked pizza.|«Я люблю пиццу». → Он сказал, что любит пиццу.
"I will call." → She said she would call.|«Я позвоню». → Она сказала, что позвонит.
"Are you OK?" → He asked if I was OK.|«Ты в порядке?» → Он спросил, в порядке ли я.
"Where do you live?" → She asked where I lived.|«Где ты живёшь?» → Она спросила, где я живу.`,
[["\"I am busy.\" → She said she ___ busy.", "was", ["is", "was", "were"]], ["He ___ me that he was leaving.", "told", ["said", "told", "asked"]], ["\"I can swim.\" → He said he ___ swim.", "could"], ["\"Do you like jazz?\" → She asked ___ I liked jazz.", "if/whether", ["that", "if", "what"]]]),

g("gerund-infinitive", "Gerund or infinitive", "Герундий или инфинитив",
`После некоторых глаголов идёт -ing: enjoy, avoid, finish, mind, suggest, keep, give up. I enjoy reading.
После других — to + глагол: want, decide, hope, plan, agree, promise, refuse. She decided to leave.
После предлогов всегда -ing: I'm interested in learning. Some verbs change meaning: stop smoking (бросить) vs stop to smoke (остановиться, чтобы покурить).`,
`I enjoy cooking for friends.|Мне нравится готовить для друзей.
We decided to stay at home.|Мы решили остаться дома.
He gave up smoking.|Он бросил курить.
I'm good at drawing.|Я хорошо рисую.`,
[["She avoids ___ in the rain.", "driving", ["to drive", "driving", "drive"]], ["They hope ___ next year.", "to win", ["winning", "to win", "win"]], ["I'm tired of ___ (wait).", "waiting"], ["He promised ___ (help) me.", "to help"]]),

g("used-to", "used to", "used to — раньше (бывало)",
`used to + глагол — привычки и состояния в прошлом, которых больше нет: I used to smoke (раньше курил, теперь нет).
Отрицание: didn't use to; вопрос: Did you use to…?
Не путать с be used to + -ing — «привыкнуть к»: I'm used to getting up early.`,
`I used to live in a village.|Раньше я жил в деревне.
She didn't use to like coffee.|Раньше она не любила кофе.
Did you use to play an instrument?|Ты раньше играл на музыкальном инструменте?
I'm used to working at night.|Я привык работать по ночам.`,
[["When I was a child, I ___ to be afraid of dogs.", "used", ["use", "used", "was used"]], ["Did you ___ to wear glasses?", "use", ["used", "use", "using"]], ["He is used to ___ (drive) on the left.", "driving"], ["We ___ use to have a car. (отриц.)", "didn't/did not"]]),

r("remote-work", "Working from Home", "Работа из дома",
`Since 2020, millions of people have started working from home. For many it was a big change. Some workers say they have become more productive because they don't waste time travelling and there are fewer interruptions. They also enjoy the flexibility: they can take children to school or go for a run at lunchtime. However, remote work has disadvantages too. Many people feel lonely and miss chatting with colleagues. Others find it hard to stop working in the evening, because the office is also their living room. Experts suggest creating a clear routine, having a separate workspace and taking regular breaks. Today many companies use a hybrid model, with two or three days in the office and the rest at home.`,
`С 2020 года миллионы людей начали работать из дома. Для многих это было большой переменой. Некоторые сотрудники говорят, что стали продуктивнее, потому что не тратят время на дорогу и их реже отвлекают. Им также нравится гибкость: можно отвести детей в школу или пробежаться в обед. Однако у удалённой работы есть и недостатки. Многие чувствуют себя одиноко и скучают по общению с коллегами. Другим трудно остановиться вечером, потому что офис — это одновременно и гостиная. Эксперты советуют выработать чёткий распорядок, иметь отдельное рабочее место и регулярно делать перерывы. Сегодня многие компании используют гибридную модель: два-три дня в офисе, остальное — дома.`,
"productive=продуктивный; waste time=тратить время зря; interruptions=отвлечения; flexibility=гибкость; disadvantages=недостатки; lonely=одинокий; routine=распорядок; hybrid=гибридный",
[["Why do some people feel more productive?", ["They earn more.", "No travelling and fewer interruptions.", "Their boss checks them."], 1], ["What is one disadvantage?", ["Feeling lonely", "Long journeys", "Expensive lunches"], 0], ["What is a hybrid model?", ["Only office work", "Some days in the office, some at home", "Working at night"], 1]]),

r("social-media", "Teenagers and Social Media", "Подростки и соцсети",
`A recent survey asked a thousand teenagers how they felt about social media. Most of them said they spent more than three hours a day on their phones. Many admitted that they often compared themselves with others online and felt worse afterwards. On the other hand, a lot of teenagers said social media helped them stay in touch with friends and discover new interests. Interestingly, almost half of them said they would like to spend less time online, but they found it difficult. Psychologists recommend switching off notifications and keeping phones out of the bedroom at night. "The goal isn't to ban technology," one expert explained, "but to use it consciously."`,
`Недавний опрос спросил тысячу подростков, как они относятся к соцсетям. Большинство сказали, что проводят в телефоне больше трёх часов в день. Многие признались, что часто сравнивают себя с другими в интернете и потом чувствуют себя хуже. С другой стороны, многие подростки сказали, что соцсети помогают им поддерживать связь с друзьями и открывать новые интересы. Интересно, что почти половина хотели бы проводить меньше времени онлайн, но им это трудно. Психологи советуют отключать уведомления и не держать телефон в спальне ночью. «Цель не в том, чтобы запретить технологии, — объяснил один эксперт, — а в том, чтобы пользоваться ими осознанно».`,
"survey=опрос; admitted=признали; compared=сравнивали; stay in touch=поддерживать связь; discover=открывать; notifications=уведомления; ban=запрещать; consciously=осознанно",
[["How much time do most teenagers spend on phones?", ["less than an hour", "more than three hours", "about one hour"], 1], ["What is a positive side of social media?", ["Staying in touch with friends", "Better sleep", "Higher marks"], 0], ["What do psychologists recommend?", ["Deleting all apps", "Switching off notifications", "Using phones only at night"], 1]]),

r("volunteer", "A Year as a Volunteer", "Год волонтёрства",
`After finishing university, Katya didn't know what to do, so she decided to spend a year volunteering in Peru. She worked at a small school in the mountains, teaching English to children. At first, life was difficult. There was no hot water, the internet was slow and she hadn't learnt much Spanish. But the children were so curious and friendly that she soon forgot about the problems. She learnt to cook local dishes and even climbed Machu Picchu. "That year changed me," she says. "I used to worry about small things. Now I know what really matters." Today Katya works for a charity and helps other young people find volunteering projects abroad.`,
`Окончив университет, Катя не знала, чем заняться, поэтому решила провести год волонтёром в Перу. Она работала в маленькой школе в горах, преподавая детям английский. Сначала жизнь была трудной. Не было горячей воды, интернет был медленным, а испанский она выучила плохо. Но дети были такими любознательными и дружелюбными, что вскоре она забыла о проблемах. Она научилась готовить местные блюда и даже поднялась на Мачу-Пикчу. «Тот год изменил меня, — говорит она. — Раньше я переживала из-за мелочей. Теперь я знаю, что действительно важно». Сегодня Катя работает в благотворительной организации и помогает другим молодым людям находить волонтёрские проекты за границей.`,
"volunteering=волонтёрство; curious=любознательный; local dishes=местные блюда; climbed=поднялась; used to worry=раньше переживала; matters=имеет значение; charity=благотворительная организация; abroad=за границей",
[["What did Katya do in Peru?", ["studied Spanish", "taught English", "worked in a hotel"], 1], ["Which was NOT a problem?", ["no hot water", "slow internet", "unfriendly children"], 2], ["What does she do now?", ["works for a charity", "teaches in Peru", "is a tour guide"], 0]]),

r("history-tea", "The Story of Tea", "История чая",
`Tea is the second most popular drink in the world after water. According to a Chinese legend, it was discovered nearly five thousand years ago, when some leaves fell into the emperor's cup of hot water. For centuries tea was drunk mainly in Asia. It was brought to Europe by Dutch traders in the seventeenth century and quickly became fashionable in Britain. At first it was so expensive that it was kept in locked boxes. In Russia, tea arrived by land from China and was transported on camels. That's why the samovar, a large metal pot for boiling water, became a symbol of Russian hospitality. Today over three billion cups of tea are drunk every day.`,
`Чай — второй по популярности напиток в мире после воды. Согласно китайской легенде, его открыли почти пять тысяч лет назад, когда несколько листьев упали в чашку горячей воды императора. Веками чай пили в основном в Азии. В Европу его привезли голландские торговцы в семнадцатом веке, и он быстро вошёл в моду в Британии. Сначала он был так дорог, что его хранили в запертых шкатулках. В Россию чай пришёл по суше из Китая, его перевозили на верблюдах. Поэтому самовар — большой металлический сосуд для кипячения воды — стал символом русского гостеприимства. Сегодня каждый день выпивают более трёх миллиардов чашек чая.`,
"legend=легенда; leaves=листья; emperor=император; centuries=века; traders=торговцы; fashionable=модный; locked=запертый; camels=верблюды; hospitality=гостеприимство",
[["How was tea discovered, according to the legend?", ["A farmer planted it.", "Leaves fell into the emperor's water.", "Traders brought it."], 1], ["Who brought tea to Europe?", ["Russian merchants", "Dutch traders", "Chinese monks"], 1], ["How did tea reach Russia?", ["by sea", "by land on camels", "by train"], 1]]),

r("smart-city", "Life Without a Car", "Жизнь без машины",
`In Copenhagen, more people go to work by bicycle than by car. The city has spent millions on wide bike lanes, bridges only for cyclists and traffic lights that give bikes priority. As a result, the air is cleaner and people are healthier. Many residents say cycling is simply the fastest way to get around. Of course, the city is flat, which helps. Critics say this model wouldn't work in cities with long winters or hills. Supporters reply that people in Copenhagen cycle in rain and snow too, and that good infrastructure matters more than the weather. If other cities followed this example, traffic jams might become a thing of the past.`,
`В Копенгагене на работу на велосипеде ездит больше людей, чем на машине. Город потратил миллионы на широкие велодорожки, мосты только для велосипедистов и светофоры, дающие приоритет велосипедам. В результате воздух чище, а люди здоровее. Многие жители говорят, что велосипед — просто самый быстрый способ передвижения. Конечно, город плоский, и это помогает. Критики говорят, что такая модель не сработала бы в городах с долгой зимой или холмами. Сторонники отвечают, что в Копенгагене ездят и в дождь, и в снег, а хорошая инфраструктура важнее погоды. Если бы другие города последовали этому примеру, пробки могли бы уйти в прошлое.`,
"bike lanes=велодорожки; priority=приоритет; as a result=в результате; residents=жители; flat=плоский, равнинный; critics=критики; infrastructure=инфраструктура; traffic jams=пробки",
[["How do most people in Copenhagen go to work?", ["by car", "by bicycle", "by metro"], 1], ["What do critics say?", ["Bikes are expensive.", "It wouldn't work in hilly or cold cities.", "Bike lanes are dangerous."], 1], ["According to supporters, what matters most?", ["the weather", "good infrastructure", "the price of petrol"], 1]]),

w("opinion-essay", "Opinion Essay", "Эссе-мнение",
"Is it better to live in a city or in the countryside? Give your opinion with two or three reasons.",
"Что лучше: жить в городе или в деревне? Выскажите мнение и приведите 2–3 аргумента.", 120,
`Many people dream of a quiet life in the countryside, but in my opinion, living in a city is better.
Firstly, cities offer more opportunities. There are more jobs, universities and courses, so it is easier to build a career. Secondly, life in a city is more convenient. Public transport, shops and hospitals are close, and you don't need a car for everything. Finally, cities are full of culture: theatres, museums and concerts are always nearby.
Of course, cities can be noisy and polluted. However, parks and weekend trips can solve this problem. To sum up, I believe the advantages of city life are greater than the disadvantages.`,
["Вступление с вашим мнением", "2–3 аргумента со связками (Firstly, Secondly, Finally)", "Контраргумент (However / Of course)", "Заключение (To sum up)", "Абзацы"],
"In my opinion,…=По моему мнению…; Firstly,…=Во-первых…; Moreover,…=Более того…; However,…=Однако…; On the other hand,…=С другой стороны…; To sum up,…=Подводя итог…"),

w("complaint", "A Formal Complaint", "Официальная жалоба",
"You bought headphones online, but they arrived broken. Write a formal email to the shop asking for a refund.",
"Вы купили наушники онлайн, но они пришли сломанными. Напишите официальное письмо в магазин с просьбой вернуть деньги.", 100,
`Dear Sir or Madam,
I am writing to complain about a pair of headphones which I ordered from your website on 3 March (order number 45821).
When the parcel arrived, I noticed that the left headphone was not working and the box had been damaged. I have tried them with two different phones, but there is still no sound.
I would be grateful if you could give me a full refund or send a replacement as soon as possible. I have attached a photo of the damage.
I look forward to hearing from you.
Yours faithfully,
Anna Petrova`,
["Формальное обращение (Dear Sir or Madam)", "Цель письма в первом предложении", "Детали: дата, номер заказа, проблема", "Чёткая просьба", "Формальное завершение (Yours faithfully)", "Без сокращений (I am, а не I'm)"],
"I am writing to complain about…=Пишу, чтобы пожаловаться на…; I noticed that…=Я заметил(а), что…; I would be grateful if you could…=Буду признателен, если вы…; a full refund=полный возврат денег; I look forward to hearing from you=Жду вашего ответа; Yours faithfully,=С уважением,"),

w("story", "A Short Story", "Короткий рассказ",
"Write a story that begins: 'It was the strangest day of my life.' Use past tenses.",
"Напишите рассказ, начинающийся словами 'It was the strangest day of my life.' Используйте прошедшие времена.", 120,
`It was the strangest day of my life. I was walking to work when I noticed an old man feeding pigeons. As I passed, he looked at me and said my name. I had never seen him before! I stopped and asked how he knew me. He smiled and gave me a small envelope. Inside there was a photo of me as a child, standing next to a young man — it was him. Suddenly I remembered: he was my grandfather's best friend, who had moved abroad fifty years earlier. We spent the whole afternoon talking in a café, and I was late for work for the first time ever.`,
["Past Simple для событий", "Past Continuous для фона", "Past Perfect хотя бы раз", "Слова времени: suddenly, then, later", "Неожиданная концовка"],
"Suddenly,…=Вдруг…; At that moment…=В тот момент…; I had never… before=Я никогда раньше не…; A few minutes later…=Через несколько минут…; In the end,…=В конце концов…"),

w("review", "A Film Review", "Рецензия на фильм",
"Write a review of a film or series you watched recently. Describe the plot briefly and say whether you recommend it.",
"Напишите рецензию на недавно просмотренный фильм или сериал. Кратко опишите сюжет и скажите, рекомендуете ли вы его.", 110,
`I recently watched "The Martian", a science fiction film directed by Ridley Scott. It tells the story of an astronaut who is left alone on Mars after a storm. He has to find a way to grow food and contact Earth.
What I liked most was the humour. Although the situation is terrible, the main character makes jokes all the time. The special effects are impressive and the music is great. The only weak point is that the film is a little too long.
Overall, I would definitely recommend it to anyone who enjoys space adventures and stories about never giving up.`,
["Название, жанр, режиссёр", "Краткий сюжет без спойлеров", "Плюсы и минусы", "Рекомендация и для кого"],
"It tells the story of…=Он рассказывает историю…; What I liked most was…=Больше всего мне понравилось…; The only weak point is…=Единственный минус…; Although…=Хотя…; I would definitely recommend it to…=Я бы определённо посоветовал его…"),
];
