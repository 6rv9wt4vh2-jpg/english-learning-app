import { mkL } from "./types";
const L = mkL("B2");
export const lessons = [
L("remote", "dialogue", "Working from home", "Удалённая работа", `
A: So, now that you've been working from home for a year, would you go back to the office full-time? | Ты уже год работаешь из дома. Вернулся бы в офис на полный день?
B: Honestly, no. I save almost two hours a day on commuting, which makes a huge difference. | Честно, нет. Я экономлю почти два часа в день на дороге, а это огромная разница.
A: Don't you miss your colleagues, though? | Но разве ты не скучаешь по коллегам?
B: I do, to be fair. That's why I go in on Wednesdays for team meetings. | Скучаю, если честно. Поэтому по средам я хожу на командные встречи.
A: I've found it hard to switch off. My laptop is always within reach. | Мне трудно отключаться. Ноутбук всегда под рукой.
B: That's the downside. I've set myself a rule: no emails after seven. | В этом и минус. Я завёл правило: никаких писем после семи.
`, [["How much time does he save on commuting?", ["Thirty minutes", "Almost two hours a day", "A whole day a week"], 1], ["Why does he go to the office on Wednesdays?", ["For team meetings", "Because the internet is better", "His manager insists"], 0], ["What rule has he set?", ["No calls before nine", "No emails after seven", "No work at weekends"], 1]],
["commuting", "colleagues", "downside"], { A: "Emma", B: "James" }),
L("negotiation", "dialogue", "Negotiating a deal", "Переговоры о сделке", `
A: We're very interested in your product, but the price is a little higher than we expected. | Нас очень интересует ваш продукт, но цена немного выше, чем мы ожидали.
B: I understand. If you were to place a larger order, we could offer a discount. | Понимаю. Если вы разместите более крупный заказ, мы сможем предложить скидку.
A: What sort of discount are we talking about? | О какой скидке идёт речь?
B: For orders over five hundred units, we'd be willing to reduce the price by eight percent. | Для заказов свыше пятисот единиц мы готовы снизить цену на восемь процентов.
A: That's reasonable. Could you also guarantee delivery within three weeks? | Это разумно. Можете также гарантировать доставку в течение трёх недель?
B: Provided the order is confirmed by the end of the month, that shouldn't be a problem. | Если заказ будет подтверждён до конца месяца, это не проблема.
`, [["What is the buyer's concern?", ["Quality", "Price", "Colour"], 1], ["What discount is offered for over 500 units?", ["Five percent", "Eight percent", "Fifteen percent"], 1], ["What is the condition for fast delivery?", ["Paying in advance", "Confirming by the end of the month", "Ordering online"], 1]],
["discount", "percent", "guarantee"], { A: "Buyer", B: "Supplier" }),
L("podcast", "dialogue", "Podcast: sleep science", "Подкаст: наука о сне", `
A: Today we're talking about sleep. Doctor Patel, how much sleep do adults really need? | Сегодня говорим о сне. Доктор Патель, сколько сна на самом деле нужно взрослым?
B: Most adults need between seven and nine hours, yet a third of people regularly get less than six. | Большинству взрослых нужно от семи до девяти часов, но треть людей регулярно спит меньше шести.
A: What are the consequences of not getting enough? | Каковы последствия недосыпа?
B: In the short term, poor concentration and irritability. In the long term, a higher risk of heart disease. | В краткосрочной перспективе — плохая концентрация и раздражительность. В долгосрочной — более высокий риск болезней сердца.
A: Any practical advice for our listeners? | Есть практические советы для слушателей?
B: Keep a consistent schedule, even at weekends, and avoid screens for an hour before bed. | Соблюдайте постоянный режим, даже в выходные, и избегайте экранов за час до сна.
`, [["How much sleep do most adults need?", ["Five to six hours", "Seven to nine hours", "Ten hours"], 1], ["What is a long-term risk?", ["Heart disease", "Poor eyesight", "Weight loss"], 0], ["What does she advise?", ["Sleeping longer at weekends", "A consistent schedule", "Drinking warm milk"], 1]],
["third", "concentration", "consistent"], { A: "Host", B: "Dr Patel" }),
L("lecture", "monologue", "Lecture: urban gardens", "Лекция: городские сады", `
N: Over the past decade, urban gardening has grown from a niche hobby into a global movement. | За последнее десятилетие городское садоводство выросло из нишевого хобби в глобальное движение.
N: Rooftops, abandoned lots and even balconies are being transformed into productive green spaces. | Крыши, заброшенные участки и даже балконы превращаются в продуктивные зелёные пространства.
N: Apart from providing fresh food, these gardens help to cool cities during heatwaves. | Помимо свежих продуктов, эти сады помогают охлаждать города во время жары.
N: They also bring neighbours together, which reduces social isolation. | Они также объединяют соседей, что уменьшает социальную изоляцию.
N: Critics argue, however, that soil in cities is often contaminated and must be tested carefully. | Однако критики утверждают, что городская почва часто загрязнена и её нужно тщательно проверять.
`, [["What has urban gardening become?", ["A niche hobby", "A global movement", "A government programme"], 1], ["How do gardens help during heatwaves?", ["They cool cities", "They provide shade for cars", "They store water"], 0], ["What concern do critics raise?", ["High costs", "Contaminated soil", "Lack of space"], 1]],
["decade", "heatwaves", "contaminated"]),
L("news", "monologue", "News report: transport strike", "Новости: забастовка транспорта", `
N: Commuters across the capital are facing severe disruption today as train drivers begin a forty-eight-hour strike. | Пассажиры по всей столице сталкиваются с серьёзными сбоями: машинисты начали 48-часовую забастовку.
N: The union says the action is over pay and working conditions. | Профсоюз заявляет, что акция связана с оплатой и условиями труда.
N: Only a limited service will run on most lines, and passengers are advised to travel only if necessary. | На большинстве линий будет ограниченное движение, пассажирам советуют ездить только в случае необходимости.
N: Talks between the union and management are expected to resume on Monday. | Переговоры профсоюза и руководства, как ожидается, возобновятся в понедельник.
`, [["How long is the strike?", ["24 hours", "48 hours", "A week"], 1], ["What is the dispute about?", ["Safety", "Pay and working conditions", "New trains"], 1], ["When will talks resume?", ["Today", "On Friday", "On Monday"], 2]],
["disruption", "union", "resume"]),
L("story", "monologue", "A travel mishap", "Неудача в путешествии", `
N: I'd been looking forward to the trip for months, so when my flight was cancelled I was furious. | Я месяцами ждал эту поездку, поэтому, когда рейс отменили, я был в ярости.
N: The airline offered to rebook me, but the next available seat was two days later. | Авиакомпания предложила пересадку, но следующее свободное место было только через два дня.
N: Instead, I took an overnight train, which turned out to be one of the highlights of the holiday. | Вместо этого я поехал ночным поездом, и это оказалось одним из лучших моментов отпуска.
N: I shared a compartment with a retired teacher who told me about places that weren't in any guidebook. | Я ехал в купе с учительницей на пенсии, которая рассказала о местах, которых нет ни в одном путеводителе.
`, [["How did the speaker feel when the flight was cancelled?", ["Relieved", "Furious", "Indifferent"], 1], ["When was the next available seat?", ["The same evening", "The next morning", "Two days later"], 2], ["Who did he meet on the train?", ["A retired teacher", "A tour guide", "An old friend"], 0]],
["furious", "overnight", "compartment"]),
L("dict1", "dictation", "Dictation: climate change", "Диктант: изменение климата", `
N: Climate change is one of the most pressing issues of our time. | Изменение климата — одна из самых острых проблем нашего времени.
N: Rising temperatures are causing more frequent floods and droughts. | Повышение температуры вызывает более частые наводнения и засухи.
N: Governments have pledged to cut emissions, but progress has been slow. | Правительства обещали сократить выбросы, но прогресс был медленным.
N: Individuals can also make a difference by changing their habits. | Отдельные люди тоже могут что-то изменить, меняя свои привычки.
`, [["What has progress on emissions been like?", ["Fast", "Slow", "Non-existent"], 1]], ["droughts", "emissions"]),
L("dict2", "dictation", "Dictation: learning languages", "Диктант: изучение языков", `
N: Learning a foreign language requires patience and regular practice. | Изучение иностранного языка требует терпения и регулярной практики.
N: Research suggests that short daily sessions are more effective than long weekly ones. | Исследования показывают, что короткие ежедневные занятия эффективнее длинных еженедельных.
N: Making mistakes is an essential part of the process. | Ошибки — неотъемлемая часть процесса.
N: Above all, try to use the language in real situations. | Прежде всего старайтесь использовать язык в реальных ситуациях.
`, [["What is more effective, according to research?", ["Long weekly sessions", "Short daily sessions", "Studying only grammar"], 1]], ["patience", "essential"]),
];
