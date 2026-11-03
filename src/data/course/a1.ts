import { mk, type Unit } from "./types";
const { g, r, w } = mk("A1");

export const units: Unit[] = [
g("to-be", "Verb to be", "Глагол to be (am / is / are)",
`Глагол to be означает «быть, являться». В русском его часто опускают («Я врач»), а в английском он обязателен: I am a doctor.
I → am; he / she / it → is; we / you / they → are.
Отрицание: добавляем not (I am not, she isn't, they aren't). Вопрос: ставим глагол перед подлежащим — Are you ready? Is he at home?`,
`I am a student.|Я студент.
She is from Moscow.|Она из Москвы.
We aren't tired.|Мы не устали.
Are you at home?|Ты дома?`,
[["She ___ my sister.", "is", ["am", "is", "are"]], ["They ___ in London.", "are", ["is", "are", "am"]], ["I ___ hungry.", "am"], ["___ he a teacher?", "is", ["Is", "Are", "Am"]], ["We ___ not late.", "are"]]),

g("present-simple", "Present Simple", "Настоящее простое время",
`Present Simple описывает привычки, факты и регулярные действия: I work every day.
С he / she / it к глаголу добавляется -s или -es: she works, he watches, it goes.
Отрицание и вопрос — через do / does: I don't like tea. Does she live here? После does глагол без -s!`,
`I drink coffee every morning.|Я пью кофе каждое утро.
He plays football on Sundays.|Он играет в футбол по воскресеньям.
They don't eat meat.|Они не едят мясо.
Does she speak English?|Она говорит по-английски?`,
[["He ___ in a bank.", "works", ["work", "works", "working"]], ["We ___ like cold weather.", "don't", ["don't", "doesn't", "not"]], ["___ your brother play chess?", "Does", ["Do", "Does", "Is"]], ["She ___ (watch) TV every evening.", "watches"], ["I ___ (live) in Kazan.", "live"]]),

g("articles", "Articles a / an / the", "Артикли a / an / the",
`Артикль a / an — «один, какой-то», с исчисляемыми существительными в единственном числе при первом упоминании. an — перед гласным звуком: an apple, an hour.
the — «тот самый, конкретный», когда понятно, о чём речь: I have a cat. The cat is black.
Перед именами, городами и странами (обычно) артикля нет: Anna, Paris, Russia.`,
`I have a dog.|У меня есть собака.
She eats an orange.|Она ест апельсин.
The sun is hot.|Солнце горячее.
Close the door, please.|Закрой дверь, пожалуйста.`,
[["I need ___ umbrella.", "an", ["a", "an", "the"]], ["He is ___ engineer.", "an", ["a", "an", "—"]], ["Look at ___ moon!", "the", ["a", "an", "the"]], ["She has ___ car.", "a"]]),

g("plurals", "Plural nouns", "Множественное число существительных",
`Обычно добавляем -s: book → books. После s, sh, ch, x — -es: box → boxes, watch → watches.
Согласная + y → -ies: city → cities. Неправильные формы нужно запомнить: man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice.`,
`two books|две книги
three boxes|три коробки
many cities|много городов
five children|пятеро детей`,
[["one child, two ___", "children", ["childs", "children", "childrens"]], ["one baby, two ___", "babies"], ["one bus, two ___", "buses", ["bus", "buss", "buses"]], ["one man, three ___", "men"]]),

g("have-got", "have / has got", "have / has got — иметь",
`Чтобы сказать «у меня есть», используем have got (британский вариант) или просто have.
I / you / we / they have got; he / she / it has got.
Отрицание: I haven't got a car. Вопрос: Have you got a pen? — Yes, I have.`,
`I have got two brothers.|У меня два брата.
She has got blue eyes.|У неё голубые глаза.
We haven't got a garden.|У нас нет сада.
Has he got a phone?|У него есть телефон?`,
[["She ___ got a cat.", "has", ["have", "has", "is"]], ["___ you got a bike?", "Have", ["Has", "Have", "Do"]], ["They ___ got any money. (отриц.)", "haven't/have not"], ["My dad ___ got a red car.", "has"]]),

g("there-is", "There is / There are", "There is / there are — есть, находится",
`Конструкция there is / there are говорит, что что-то где-то есть. Перевод обычно начинаем с места: There is a park near my house — Рядом с моим домом есть парк.
there is + единственное число, there are + множественное. Вопрос: Is there…? Are there…? Отрицание: There isn't / There aren't.`,
`There is a bank on this street.|На этой улице есть банк.
There are two windows in the room.|В комнате два окна.
Is there a café here?|Здесь есть кафе?
There aren't any eggs.|Яиц нет.`,
[["There ___ a cat in the garden.", "is", ["is", "are", "be"]], ["There ___ many people here.", "are", ["is", "are", "am"]], ["___ there a toilet?", "Is", ["Are", "Is", "Do"]], ["There ___ any milk. (отриц.)", "isn't/is not"]]),

g("can", "Modal verb can", "Модальный глагол can",
`can — «могу, умею». Он одинаков для всех лиц (без -s!), а после него идёт глагол без to: She can swim.
Отрицание: can't (cannot). Вопрос: Can you help me? — Yes, I can. / No, I can't.`,
`I can speak English.|Я умею говорить по-английски.
He can't drive.|Он не умеет водить.
Can you open the window?|Можешь открыть окно?
Birds can fly.|Птицы умеют летать.`,
[["She can ___ the piano.", "play", ["play", "plays", "to play"]], ["___ you swim?", "Can", ["Do", "Can", "Are"]], ["I ___ hear you. It's too loud. (отриц.)", "can't/cannot"], ["He can ___ (cook) very well.", "cook"]]),

g("present-continuous", "Present Continuous", "Настоящее длительное время",
`Present Continuous описывает действие прямо сейчас: I am reading. Формула: am / is / are + глагол-ing.
Правописание: make → making, sit → sitting, lie → lying.
Слова-подсказки: now, right now, at the moment, Look!`,
`I am cooking dinner now.|Я сейчас готовлю ужин.
She is talking on the phone.|Она говорит по телефону.
They aren't watching TV.|Они не смотрят телевизор.
What are you doing?|Что ты делаешь?`,
[["Look! It ___ raining.", "is", ["is", "are", "does"]], ["We are ___ (have) lunch now.", "having"], ["What ___ you doing?", "are", ["do", "are", "is"]], ["He is ___ (swim) in the sea.", "swimming"]]),

g("prepositions-time", "Prepositions of time", "Предлоги времени in / on / at",
`at — точное время и праздники: at 7 o'clock, at night, at the weekend.
on — дни и даты: on Monday, on 5 May, on my birthday.
in — месяцы, годы, времена года, части дня: in July, in 2020, in summer, in the morning.`,
`The film starts at 8 pm.|Фильм начинается в 8 вечера.
I see her on Fridays.|Я вижусь с ней по пятницам.
He was born in 1995.|Он родился в 1995 году.
We go skiing in winter.|Зимой мы катаемся на лыжах.`,
[["My birthday is ___ June.", "in", ["in", "on", "at"]], ["See you ___ Monday!", "on", ["in", "on", "at"]], ["I get up ___ 7 o'clock.", "at"], ["She works ___ the evening.", "in"]]),

g("possessives", "Possessive adjectives", "Притяжательные местоимения",
`my — мой, your — твой/ваш, his — его, her — её, its — его/её (о предметах и животных), our — наш, their — их.
Они стоят перед существительным: my book, their house. Внимание: its (притяжательное) ≠ it's (it is).
Также есть 's: Anna's phone — телефон Анны.`,
`This is my brother.|Это мой брат.
Her name is Olga.|Её зовут Ольга.
The dog wants its food.|Собака хочет свою еду.
That is Tom's car.|Это машина Тома.`,
[["Peter loves ___ job.", "his", ["his", "her", "its"]], ["We like ___ new flat.", "our", ["us", "our", "we"]], ["Is this ___ bag, Kate?", "your", ["you", "your", "yours"]], ["The children play with ___ toys.", "their"]]),

r("my-family", "My Family", "Моя семья",
`My name is Anna. I am twenty-five years old and I live in Saint Petersburg. I have a small family. My mother is a teacher and my father is a doctor. I have one brother. His name is Ivan. He is eighteen and he is a student. We have a cat. Her name is Murka and she is very lazy. On Sundays we have lunch together. My mother cooks soup and we talk a lot. I love my family.`,
`Меня зовут Анна. Мне двадцать пять лет, и я живу в Санкт-Петербурге. У меня небольшая семья. Моя мама — учитель, а папа — врач. У меня один брат. Его зовут Иван. Ему восемнадцать, он студент. У нас есть кошка. Её зовут Мурка, и она очень ленивая. По воскресеньям мы обедаем вместе. Мама варит суп, и мы много разговариваем. Я люблю свою семью.`,
"small=маленький; teacher=учитель; doctor=врач; lazy=ленивый; together=вместе; cooks=готовит",
[["How old is Anna?", ["18", "25", "35"], 1], ["What is her father's job?", ["teacher", "student", "doctor"], 2], ["What do they do on Sundays?", ["go to the cinema", "have lunch together", "play football"], 1]]),

r("my-day", "My Day", "Мой день",
`Tom gets up at seven o'clock. He has a shower and eats breakfast: eggs, bread and tea. At eight he takes the bus to work. He works in an office in the city centre. He has lunch at one o'clock in a small café. He finishes work at five. In the evening he goes to the gym or reads a book. He goes to bed at eleven. Tom likes his day, but he loves Saturdays because he doesn't work.`,
`Том встаёт в семь часов. Он принимает душ и завтракает: яйца, хлеб и чай. В восемь он едет на автобусе на работу. Он работает в офисе в центре города. Он обедает в час в маленьком кафе. Он заканчивает работу в пять. Вечером он ходит в спортзал или читает книгу. Он ложится спать в одиннадцать. Тому нравится его день, но он обожает субботы, потому что не работает.`,
"gets up=встаёт; has a shower=принимает душ; takes the bus=едет на автобусе; finishes=заканчивает; gym=спортзал; goes to bed=ложится спать",
[["How does Tom go to work?", ["by car", "by bus", "on foot"], 1], ["Where does he have lunch?", ["at home", "in the office", "in a café"], 2], ["Why does he love Saturdays?", ["He doesn't work.", "He goes to the gym.", "He sees his mother."], 0]]),

r("my-town", "My Town", "Мой город",
`I live in a small town near the sea. There is one main street with shops, a bank and a post office. There are two schools and a big park. In summer there are many tourists because the beach is beautiful. In winter the town is quiet. There isn't a cinema, but there is a nice library. My favourite place is the old bridge. I go there in the evening and look at the sea.`,
`Я живу в маленьком городке у моря. Там одна главная улица с магазинами, банком и почтой. Есть две школы и большой парк. Летом много туристов, потому что пляж красивый. Зимой город тихий. Кинотеатра нет, но есть хорошая библиотека. Моё любимое место — старый мост. Я хожу туда вечером и смотрю на море.`,
"near=рядом с; main street=главная улица; post office=почта; tourists=туристы; quiet=тихий; bridge=мост",
[["Where is the town?", ["in the mountains", "near the sea", "near a forest"], 1], ["What is NOT in the town?", ["a library", "a cinema", "a bank"], 1], ["When is the town quiet?", ["in summer", "in winter", "at the weekend"], 1]]),

r("at-the-cafe", "At the Café", "В кафе",
`Waiter: Good morning! What would you like?
Maria: Can I have a cappuccino, please?
Waiter: Small or large?
Maria: Large, please. And a croissant.
Waiter: Anything else?
Maria: No, thank you. How much is it?
Waiter: That's five pounds fifty.
Maria: Here you are.
Waiter: Thank you. Have a nice day!`,
`Официант: Доброе утро! Что вы хотели бы?
Мария: Можно капучино, пожалуйста?
Официант: Маленький или большой?
Мария: Большой, пожалуйста. И круассан.
Официант: Что-нибудь ещё?
Мария: Нет, спасибо. Сколько с меня?
Официант: Пять фунтов пятьдесят.
Мария: Вот, пожалуйста.
Официант: Спасибо. Хорошего дня!`,
"What would you like?=Что желаете?; Can I have…=Можно мне…; Anything else?=Что-нибудь ещё?; How much is it?=Сколько стоит?; Here you are=Вот, пожалуйста",
[["What does Maria drink?", ["tea", "cappuccino", "orange juice"], 1], ["What size is it?", ["small", "medium", "large"], 2], ["How much does she pay?", ["£5.50", "£15", "£4.50"], 0]]),

r("weekend", "A Weekend in the Country", "Выходные за городом",
`Every summer my friends and I go to the country for the weekend. We have a little wooden house near a lake. On Saturday morning we swim and go fishing. In the afternoon we play volleyball. In the evening we make a fire and cook sausages. We sing songs and look at the stars. There is no internet there, but nobody is bored. On Sunday we go back to the city, tired but happy.`,
`Каждое лето мы с друзьями уезжаем за город на выходные. У нас есть маленький деревянный дом у озера. В субботу утром мы купаемся и ловим рыбу. Днём играем в волейбол. Вечером разводим костёр и жарим сосиски. Мы поём песни и смотрим на звёзды. Интернета там нет, но никому не скучно. В воскресенье мы возвращаемся в город уставшие, но счастливые.`,
"country=деревня, за городом; wooden=деревянный; lake=озеро; go fishing=ловить рыбу; make a fire=разводить костёр; bored=скучающий",
[["Where is the house?", ["near a lake", "in the city", "near the sea"], 0], ["What do they do in the evening?", ["play volleyball", "make a fire", "watch films"], 1], ["Is there internet?", ["Yes, fast internet.", "No.", "Only on Sunday."], 1]]),

w("about-me", "About Me", "Обо мне",
"Write about yourself: your name, age, city, job or studies, and what you like.",
"Напишите о себе: имя, возраст, город, работа или учёба и что вам нравится.", 40,
`Hi! My name is Dmitry and I am thirty years old. I live in Novosibirsk with my wife. I am a programmer and I work from home. I like music, books and good coffee. At the weekend I play football with my friends. I want to speak English well because I love travelling.`,
["Имя и возраст", "Город", "Работа или учёба", "2–3 увлечения", "Использован глагол to be и Present Simple"],
"My name is…=Меня зовут…; I am … years old=Мне … лет; I live in…=Я живу в…; I work as…=Я работаю…; I like…=Мне нравится…; In my free time…=В свободное время…"),

w("my-room", "My Room", "Моя комната",
"Describe your room. What is there? What colour is it? Do you like it?",
"Опишите свою комнату. Что в ней есть? Какого она цвета? Она вам нравится?", 40,
`My room is not very big, but it is light and cosy. The walls are white. There is a bed, a desk and a big window. There are many books on the shelf. There is a green plant near the window. I do my homework at the desk. I love my room because it is quiet.`,
["Размер и цвет", "There is / there are минимум 3 раза", "Предлоги места (on, near, in)", "Ваше отношение"],
"There is…=Есть… (ед. ч.); There are…=Есть… (мн. ч.); on the shelf=на полке; near the window=у окна; cosy=уютный; light=светлый"),

w("postcard", "A Holiday Postcard", "Открытка с отдыха",
"Write a postcard to a friend from your holiday. Where are you? What is the weather like? What are you doing?",
"Напишите открытку другу с отдыха. Где вы? Какая погода? Чем занимаетесь?", 35,
`Dear Kate,
I'm in Sochi with my family! The weather is hot and sunny. Our hotel is near the beach. Every day we swim in the sea and eat ice cream. Right now I'm sitting in a café and writing this card. See you soon!
Love, Olga`,
["Обращение Dear… и подпись", "Погода", "Present Continuous: что вы делаете сейчас", "Прощание"],
"Dear…=Дорогой/ая…; The weather is…=Погода…; I'm having a great time=Я отлично провожу время; See you soon=До скорой встречи; Love,=С любовью,"),

w("daily-routine", "My Daily Routine", "Мой распорядок дня",
"Describe a typical day: when you get up, eat, work or study, and go to bed.",
"Опишите обычный день: когда встаёте, едите, работаете или учитесь, ложитесь спать.", 45,
`I usually get up at half past six. I have breakfast and drink green tea. At eight o'clock I go to work by metro. I work in a shop from nine to six. I have lunch at one. In the evening I cook dinner and watch a series. I go to bed at about eleven.`,
["Минимум 5 действий", "Время с at", "Слова usually / often / sometimes", "Present Simple"],
"I usually…=Я обычно…; at half past six=в половине седьмого; then=потом; after that=после этого; in the evening=вечером"),
];
