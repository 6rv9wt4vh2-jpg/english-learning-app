import { mk, type Unit } from "./types";
const { g, r, w } = mk("A2");

export const units: Unit[] = [
g("past-simple", "Past Simple", "Прошедшее простое время",
`Past Simple — законченное действие в прошлом с указанием времени: yesterday, last week, in 2019, ago.
Правильные глаголы: + -ed (worked, played, stopped). Неправильные — 2-я форма: go → went, see → saw, buy → bought.
Отрицание и вопрос — через did, глагол в начальной форме: I didn't go. Did you see it?`,
`I visited my grandmother last weekend.|Я навестил бабушку в прошлые выходные.
We went to Italy two years ago.|Мы ездили в Италию два года назад.
She didn't call me.|Она мне не позвонила.
Did you enjoy the film?|Тебе понравился фильм?`,
[["Yesterday I ___ a new phone.", "bought", ["buy", "bought", "buyed"]], ["They ___ (play) tennis last Sunday.", "played"], ["___ you see Tom yesterday?", "Did", ["Do", "Did", "Was"]], ["He didn't ___ to school.", "go", ["went", "go", "goes"]], ["We ___ (stop) at a café.", "stopped"]]),

g("past-continuous", "Past Continuous", "Прошедшее длительное время",
`Past Continuous — процесс в определённый момент прошлого: At 8 pm I was watching TV.
Формула: was / were + -ing. Часто вместе с Past Simple: длинное действие прерывается коротким — I was walking when it started to rain.`,
`I was sleeping at midnight.|В полночь я спал.
They were having dinner when I called.|Они ужинали, когда я позвонил.
What were you doing at 5?|Что ты делал в 5?
It wasn't raining.|Дождя не было.`,
[["I ___ reading when the phone rang.", "was", ["was", "were", "did"]], ["They ___ playing football.", "were", ["was", "were", "are"]], ["She was cooking when he ___ (arrive).", "arrived"], ["What were you ___ (do) at 9?", "doing"]]),

g("comparatives", "Comparatives and superlatives", "Сравнительная и превосходная степень",
`Короткие прилагательные: + -er / the + -est: cheap → cheaper → the cheapest; big → bigger → the biggest; easy → easier → the easiest.
Длинные: more / the most: interesting → more interesting → the most interesting.
Исключения: good → better → the best; bad → worse → the worst; far → further → the furthest. Сравнение: than — My car is faster than yours.`,
`Moscow is bigger than Kazan.|Москва больше Казани.
This book is more interesting than that one.|Эта книга интереснее той.
It's the best day of my life!|Это лучший день в моей жизни!
Today is worse than yesterday.|Сегодня хуже, чем вчера.`,
[["An elephant is ___ than a horse.", "bigger", ["biger", "bigger", "more big"]], ["This is the ___ film I've ever seen.", "best", ["good", "better", "best"]], ["Maths is ___ difficult than English.", "more"], ["Russia is the ___ (large) country in the world.", "largest"]]),

g("going-to-will", "Future: going to vs will", "Будущее: going to и will",
`be going to — планы и намерения, решённые заранее, и прогноз по признакам: I'm going to study medicine. Look at the clouds — it's going to rain.
will — спонтанное решение в момент речи, обещание, мнение о будущем: I'll help you! I think he will win.`,
`We're going to buy a house next year.|Мы собираемся купить дом в следующем году.
The phone is ringing. — I'll answer it.|Телефон звонит. — Я отвечу.
I promise I'll call you.|Обещаю, я позвоню.
I think it will be sunny tomorrow.|Думаю, завтра будет солнечно.`,
[["Look at that sky! It ___ rain.", "is going to", ["will", "is going to", "goes"]], ["I'm thirsty. — I ___ get you some water.", "'ll/will", ["'ll", "am going to", "go"]], ["We are going ___ visit Paris in May.", "to"], ["I promise I ___ be late.", "won't/will not"]]),

g("present-perfect", "Present Perfect (experience)", "Present Perfect: опыт",
`Present Perfect связывает прошлое с настоящим. Формула: have / has + 3-я форма глагола (done, seen, been).
Используем для опыта без точного времени: I have been to London. Have you ever eaten sushi?
ever — когда-нибудь (в вопросах), never — никогда. Если есть точное время (yesterday, in 2010) — нужен Past Simple.`,
`I have visited Spain twice.|Я дважды бывал в Испании.
She has never seen snow.|Она никогда не видела снега.
Have you ever ridden a horse?|Ты когда-нибудь ездил на лошади?
We haven't tried Thai food.|Мы не пробовали тайскую еду.`,
[["I have ___ this film three times.", "seen", ["saw", "seen", "see"]], ["___ she ever been to Japan?", "Has", ["Have", "Has", "Did"]], ["They have never ___ (eat) oysters.", "eaten"], ["I ___ to Rome in 2018.", "went", ["have gone", "went", "have been"]]]),

g("countable", "Countable/uncountable: some, any, much, many", "Исчисляемые и неисчисляемые",
`Исчисляемые можно посчитать (apple, chair), неисчисляемые — нет (water, money, information, advice).
some — в утверждениях, any — в вопросах и отрицаниях. many — с исчисляемыми, much — с неисчисляемыми: How many eggs? How much milk?
a lot of подходит для обоих.`,
`There is some milk in the fridge.|В холодильнике есть немного молока.
Have you got any questions?|У вас есть вопросы?
How much money do you need?|Сколько денег тебе нужно?
I don't have many friends here.|У меня здесь немного друзей.`,
[["How ___ water do you drink?", "much", ["much", "many", "a"]], ["There aren't ___ apples left.", "any", ["some", "any", "much"]], ["How ___ people came?", "many"], ["Would you like ___ tea?", "some", ["any", "some", "many"]]]),

g("adverbs-frequency", "Adverbs of frequency", "Наречия частотности",
`always (всегда), usually (обычно), often (часто), sometimes (иногда), rarely (редко), never (никогда).
Ставятся перед основным глаголом, но после to be: I often read. She is always late.
Вопрос о частоте: How often do you…? Ответ: once a week, twice a month, every day.`,
`I always brush my teeth twice a day.|Я всегда чищу зубы дважды в день.
He is never angry.|Он никогда не злится.
We sometimes eat out.|Мы иногда едим вне дома.
How often do you go swimming?|Как часто ты ходишь плавать?`,
[["Choose the correct order:", "She is always tired.", ["She always is tired.", "She is always tired.", "Always she is tired."]], ["Choose the correct order:", "I usually walk to work.", ["I walk usually to work.", "Usually I walk work.", "I usually walk to work."]], ["How ___ do you visit your parents?", "often"], ["I ___ eat meat — I'm vegetarian.", "never", ["always", "often", "never"]]]),

g("should-must", "should, must, have to", "should, must, have to",
`should — совет: You should see a doctor. (Тебе стоит…)
must — сильная необходимость или правило от говорящего: I must finish this today. mustn't — запрет: You mustn't smoke here.
have to — необходимость из-за внешних обстоятельств: I have to wear a uniform. don't have to — нет необходимости: You don't have to come.`,
`You should drink more water.|Тебе стоит пить больше воды.
You mustn't park here.|Здесь нельзя парковаться.
I have to get up early tomorrow.|Мне завтра надо рано вставать.
You don't have to pay — it's free.|Платить не нужно — это бесплатно.`,
[["You look tired. You ___ go to bed.", "should", ["should", "mustn't", "don't have to"]], ["It's Sunday. I ___ go to work.", "don't have to", ["mustn't", "don't have to", "should"]], ["Passengers ___ smoke on the plane.", "mustn't", ["don't have to", "mustn't", "should"]], ["She has ___ wear glasses for reading.", "to"]]),

g("first-conditional", "First Conditional", "Первый тип условных предложений",
`Реальное условие в будущем: If + Present Simple, will + глагол.
If it rains, we will stay at home. Обратите внимание: после if НЕ ставим will, хотя по-русски «если пойдёт дождь».
Части можно менять местами: We'll stay at home if it rains.`,
`If you study, you will pass the exam.|Если будешь учиться, сдашь экзамен.
If I see her, I'll tell her.|Если увижу её, скажу ей.
She won't come if she is busy.|Она не придёт, если будет занята.
What will you do if you miss the bus?|Что будешь делать, если опоздаешь на автобус?`,
[["If it ___ tomorrow, we'll go to the beach.", "is sunny", ["will be sunny", "is sunny", "sunny"]], ["If you hurry, you ___ catch the train.", "will", ["will", "would", "are"]], ["If I ___ (have) time, I'll call you.", "have"], ["They won't come if you ___ invite them.", "don't", ["won't", "don't", "didn't"]]]),

r("first-job", "My First Job", "Моя первая работа",
`When I was sixteen, I got my first job in a small bakery. I worked there every Saturday from six in the morning until two in the afternoon. At first it was hard because I had to get up so early. My job was to sell bread and cakes and to clean the tables. The owner, Mr Brown, was strict but kind. He taught me how to talk to customers politely. I earned only a little money, but I was very proud. I bought my first bike with it. Now, many years later, I still remember the smell of fresh bread.`,
`Когда мне было шестнадцать, я устроился на первую работу в маленькую пекарню. Я работал там каждую субботу с шести утра до двух часов дня. Сначала было тяжело, потому что приходилось вставать так рано. Моей работой было продавать хлеб и пирожные и убирать столы. Владелец, мистер Браун, был строгим, но добрым. Он научил меня вежливо разговаривать с покупателями. Я зарабатывал совсем немного, но очень гордился. На эти деньги я купил свой первый велосипед. Сейчас, много лет спустя, я до сих пор помню запах свежего хлеба.`,
"bakery=пекарня; at first=сначала; owner=владелец; strict=строгий; customers=покупатели; earned=заработал; proud=гордый; smell=запах",
[["How old was the writer?", ["fifteen", "sixteen", "eighteen"], 1], ["Why was the job hard at first?", ["The owner was rude.", "He had to get up early.", "The money was bad."], 1], ["What did he buy with the money?", ["a bike", "a phone", "cakes"], 0]]),

r("travel-blog", "A Trip to Scotland", "Поездка в Шотландию",
`Last spring my sister and I spent a week in Scotland. We flew to Edinburgh and stayed in a small hotel in the old town. The city was beautiful, with its castle on a hill and narrow streets. On the third day we rented a car and drove to the Highlands. The mountains were amazing, but the weather changed every hour: sun, rain, wind and sun again! We tried haggis, the national dish, and it was better than we expected. If you go to Scotland, take a good raincoat!`,
`Прошлой весной мы с сестрой провели неделю в Шотландии. Мы прилетели в Эдинбург и остановились в маленькой гостинице в старом городе. Город был красивым — с замком на холме и узкими улочками. На третий день мы арендовали машину и поехали в Хайленд. Горы были потрясающими, но погода менялась каждый час: солнце, дождь, ветер и снова солнце! Мы попробовали хаггис, национальное блюдо, и он оказался лучше, чем мы ожидали. Если поедете в Шотландию, возьмите хороший дождевик!`,
"spent=провели; castle=замок; narrow=узкий; rented=арендовали; amazing=потрясающий; dish=блюдо; expected=ожидали; raincoat=дождевик",
[["How long was the trip?", ["a weekend", "a week", "a month"], 1], ["What was the weather like in the Highlands?", ["always sunny", "very changeable", "snowy"], 1], ["What did they think of haggis?", ["It was terrible.", "Better than expected.", "They didn't try it."], 1]]),

r("healthy-life", "Healthy Habits", "Полезные привычки",
`Doctors say that small habits can make a big difference to our health. First, you should drink enough water — about two litres a day. Second, try to walk at least thirty minutes every day. You don't have to go to the gym; walking to work or taking the stairs is enough. Third, sleep is very important. Most adults need seven or eight hours. Finally, eat more fruit and vegetables and less sugar. If you change one habit this month, you will feel better soon.`,
`Врачи говорят, что маленькие привычки могут сильно повлиять на здоровье. Во-первых, нужно пить достаточно воды — около двух литров в день. Во-вторых, старайтесь ходить пешком хотя бы тридцать минут каждый день. В спортзал ходить не обязательно: достаточно ходить на работу пешком или подниматься по лестнице. В-третьих, очень важен сон. Большинству взрослых нужно семь-восемь часов. Наконец, ешьте больше фруктов и овощей и меньше сахара. Если вы измените одну привычку в этом месяце, скоро почувствуете себя лучше.`,
"habits=привычки; difference=разница; enough=достаточно; at least=по крайней мере; the stairs=лестница; adults=взрослые; sugar=сахар",
[["How much water should you drink?", ["one litre", "two litres", "five litres"], 1], ["Do you have to go to the gym?", ["Yes, every day.", "No, walking is enough.", "Only at weekends."], 1], ["How much sleep do most adults need?", ["5–6 hours", "7–8 hours", "10 hours"], 1]]),

r("email-friend", "An Email from Abroad", "Письмо из-за границы",
`Hi Sasha,
Sorry I haven't written for so long! I've been really busy since I moved to Toronto. My new job is great and my colleagues are very friendly. I've already found a nice flat near a park. The only problem is the weather — it's much colder here than in Moscow, and there's a lot of snow. Next month I'm going to visit Niagara Falls. Have you ever been there? Why don't you come and visit me in summer? It will be fun!
Write soon,
Lena`,
`Привет, Саша!
Прости, что так долго не писала! Я очень занята с тех пор, как переехала в Торонто. Новая работа отличная, а коллеги очень дружелюбные. Я уже нашла хорошую квартиру возле парка. Единственная проблема — погода: здесь намного холоднее, чем в Москве, и очень много снега. В следующем месяце я собираюсь съездить к Ниагарскому водопаду. Ты когда-нибудь там был? Почему бы тебе не приехать ко мне летом? Будет весело!
Пиши скорее,
Лена`,
"moved=переехала; colleagues=коллеги; already=уже; flat=квартира; colder=холоднее; Falls=водопад; Why don't you…=Почему бы тебе не…",
[["Where does Lena live now?", ["Moscow", "Toronto", "New York"], 1], ["What is the problem?", ["her job", "the weather", "her flat"], 1], ["What is she going to do next month?", ["visit Niagara Falls", "go back to Moscow", "change jobs"], 0]]),

r("lost-phone", "The Lost Phone", "Потерянный телефон",
`Last Friday Mark was travelling home by train. He was reading a book and listening to music. When the train arrived at his station, he jumped up and ran out. Ten minutes later, he realised that his phone wasn't in his pocket. He was very worried because all his photos were on it. He went back to the station and asked at the information desk. A woman smiled and gave him the phone. A young girl had found it on the seat and brought it to the desk. Mark was so happy that he bought the girl a big box of chocolates.`,
`В прошлую пятницу Марк ехал домой на поезде. Он читал книгу и слушал музыку. Когда поезд прибыл на его станцию, он вскочил и выбежал. Через десять минут он понял, что телефона нет в кармане. Он очень волновался, потому что на нём были все его фотографии. Он вернулся на станцию и спросил в справочном бюро. Женщина улыбнулась и отдала ему телефон. Молодая девушка нашла его на сиденье и принесла к стойке. Марк был так рад, что купил девушке большую коробку конфет.`,
"jumped up=вскочил; realised=понял; pocket=карман; worried=обеспокоенный; information desk=справочное бюро; seat=сиденье",
[["What was Mark doing on the train?", ["sleeping", "reading and listening to music", "talking on the phone"], 1], ["Where was the phone found?", ["on the platform", "on the seat", "in his bag"], 1], ["What did Mark give the girl?", ["money", "flowers", "chocolates"], 2]]),

w("informal-email", "Email to a Friend", "Письмо другу",
"Write an email to a friend about your last weekend. What did you do? Who were you with? Did you enjoy it?",
"Напишите письмо другу о прошедших выходных. Что делали? С кем? Понравилось ли?", 70,
`Hi Max,
How are you? I had a great weekend! On Saturday I went to the cinema with my cousin. We watched a new comedy and laughed a lot. After that we had pizza in a little Italian restaurant. On Sunday it was raining, so I stayed at home, cleaned my flat and read a book. In the evening I called my parents. What did you do at the weekend? Write back soon!
Best wishes,
Ivan`,
["Приветствие и вопрос «как дела»", "Past Simple (минимум 5 глаголов)", "Слова-связки: then, after that, so", "Вопрос другу", "Неформальное прощание"],
"How are you?=Как дела?; I had a great weekend=Я отлично провёл выходные; After that…=После этого…; so=поэтому; Write back soon!=Напиши скорее!; Best wishes,=Всего наилучшего,"),

w("past-holiday", "My Best Holiday", "Мой лучший отпуск",
"Describe your best holiday. Where did you go? What did you see and do? Why was it special?",
"Опишите свой лучший отпуск. Куда ездили? Что видели и делали? Чем он был особенным?", 80,
`My best holiday was in Georgia three years ago. I went there with two friends. We stayed in Tbilisi for four days and then travelled to the mountains. The views were fantastic and the people were very friendly. We ate khachapuri every day and tried Georgian wine. One evening a family invited us to dinner and we sang songs together. It was special because I felt at home in a new country.`,
["Где и когда", "С кем", "Минимум 3 действия в Past Simple", "Сравнительная степень или превосходная", "Почему особенный"],
"three years ago=три года назад; The views were…=Виды были…; We stayed in…=Мы остановились в…; It was special because…=Это было особенным, потому что…; I'll never forget…=Я никогда не забуду…"),

w("future-plans", "My Plans", "Мои планы",
"Write about your plans for next year. Use going to for plans and will for predictions.",
"Напишите о планах на следующий год. Используйте going to для планов и will для предположений.", 70,
`Next year is going to be busy. First, I'm going to start an English course because I want to get a better job. I'm also going to save money for a trip to Japan. I think it will be expensive, but I really want to see Tokyo. My sister is going to get married in June, so I'm going to help her with the wedding. I hope it will be a happy year.`,
["Минимум 3 плана с going to", "1–2 предположения с will / I think … will", "Причины (because)", "Логичный порядок: first, also, finally"],
"I'm going to…=Я собираюсь…; I think it will…=Думаю, это будет…; I hope…=Надеюсь…; because I want to…=потому что я хочу…; First,…=Сначала…"),

w("recommend-place", "Recommend a Place", "Посоветуйте место",
"A friend is visiting your city. Recommend three places to visit and explain why.",
"Друг приезжает в ваш город. Посоветуйте три места и объясните почему.", 70,
`If you come to Kazan, you should visit the Kremlin first. It's the most famous place in the city and the views are beautiful. Then you should walk along Bauman Street — there are lots of cafés and shops. You must try chak-chak, a sweet local dessert! Finally, if the weather is good, go to the river in the evening. It's quieter than the centre and very romantic.`,
["Три места", "should / must для советов", "Сравнения (more…, the most…)", "First conditional с if"],
"You should visit…=Тебе стоит посетить…; It's the most famous…=Это самое известное…; You must try…=Обязательно попробуй…; If the weather is good,…=Если погода будет хорошей,…; Don't miss…=Не пропусти…"),
];
