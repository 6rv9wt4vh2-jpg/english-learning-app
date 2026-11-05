import { mkL } from "./types";
const L = mkL("B1");
export const lessons = [
L("interview", "dialogue", "A job interview", "Собеседование", `
A: Thanks for coming in. Could you tell me a little about yourself? | Спасибо, что пришли. Расскажите немного о себе.
B: Sure. I've been working in customer service for three years, mainly in a hotel. | Конечно. Я три года работаю в сфере обслуживания клиентов, в основном в отеле.
A: Why do you want to leave your current job? | Почему вы хотите уйти с текущей работы?
B: I'd like more responsibility, and I'm interested in working for an international company. | Я хотел бы больше ответственности, и мне интересно работать в международной компании.
A: How do you deal with difficult customers? | Как вы справляетесь с трудными клиентами?
B: I stay calm, listen carefully and try to find a solution quickly. | Я сохраняю спокойствие, внимательно слушаю и стараюсь быстро найти решение.
A: Great. We'll let you know by Friday. | Отлично. Мы сообщим вам до пятницы.
`, [["How long has the candidate worked in customer service?", ["One year", "Three years", "Five years"], 1], ["Why does he want to leave?", ["The pay is low", "He wants more responsibility", "He is moving abroad"], 1], ["When will he hear back?", ["By Monday", "By Wednesday", "By Friday"], 2]],
["hotel", "responsibility", "calm"], { A: "Interviewer", B: "Candidate" }),
L("flat", "dialogue", "Renting a flat", "Аренда квартиры", `
A: Hello, I'm calling about the flat advertised online. Is it still available? | Здравствуйте, я звоню по поводу квартиры из объявления. Она ещё свободна?
B: Yes, it is. It's a two-bedroom flat on the third floor. | Да. Это двухкомнатная квартира на третьем этаже.
A: How much is the rent? | Какая арендная плата?
B: It's nine hundred pounds a month, and bills are included. | Девятьсот фунтов в месяц, коммунальные услуги включены.
A: Is it close to public transport? | Она рядом с общественным транспортом?
B: Yes, the underground station is a two-minute walk away. | Да, до станции метро две минуты пешком.
A: Could I come and see it tomorrow evening? | Можно прийти посмотреть завтра вечером?
B: Of course. How about six thirty? | Конечно. Как насчёт половины седьмого?
`, [["Which floor is the flat on?", ["First", "Second", "Third"], 2], ["Are bills included?", ["Yes", "No", "Only electricity"], 0], ["When will they meet?", ["Tomorrow at 6:30", "Today at 6:30", "Tomorrow at 9:00"], 0]],
["available", "included", "underground"], { A: "Caller", B: "Landlord" }),
L("complaint", "dialogue", "A hotel complaint", "Жалоба в отеле", `
A: Excuse me, I'm afraid there's a problem with my room. | Извините, боюсь, у меня проблема с номером.
B: I'm sorry to hear that. What seems to be the problem? | Мне жаль это слышать. В чём дело?
A: The air conditioning isn't working, and it's very noisy because the room faces the street. | Кондиционер не работает, и очень шумно, потому что номер выходит на улицу.
B: I do apologise. Let me see if we have another room. | Приношу извинения. Давайте посмотрим, есть ли другой номер.
B: We have a quieter room on the fifth floor with a view of the garden. | У нас есть более тихий номер на пятом этаже с видом на сад.
A: That sounds perfect, thank you. | Звучит отлично, спасибо.
`, [["What is NOT working?", ["The shower", "The air conditioning", "The TV"], 1], ["Why is the room noisy?", ["It faces the street", "There's a party", "It's near the lift"], 0], ["What does the new room overlook?", ["The sea", "The street", "The garden"], 2]],
["afraid", "noisy", "garden"], { A: "Guest", B: "Receptionist" }),
L("museum", "monologue", "Museum tour", "Экскурсия по музею", `
N: Welcome to the City Museum. The tour will take about an hour. | Добро пожаловать в Городской музей. Экскурсия займёт около часа.
N: We'll start on the ground floor with the history of the city. | Мы начнём на первом этаже с истории города.
N: Then we'll go upstairs to see the paintings. | Затем поднимемся наверх посмотреть картины.
N: Please don't take photos with a flash, as it can damage the pictures. | Пожалуйста, не фотографируйте со вспышкой: это может повредить картины.
N: The café and gift shop are next to the main entrance. | Кафе и сувенирный магазин рядом с главным входом.
`, [["How long is the tour?", ["Thirty minutes", "About an hour", "Two hours"], 1], ["What is on the ground floor?", ["Paintings", "The history of the city", "The café"], 1], ["Why are flash photos not allowed?", ["They disturb visitors", "They can damage the pictures", "It's too expensive"], 1]],
["hour", "paintings", "damage"]),
L("habits", "monologue", "Healthy habits", "Полезные привычки", `
N: A few years ago I decided to change my lifestyle. | Несколько лет назад я решил изменить образ жизни.
N: I used to eat a lot of fast food and I never did any exercise. | Раньше я ел много фастфуда и вообще не занимался спортом.
N: Now I cycle to work instead of driving, which takes about twenty minutes. | Теперь я езжу на работу на велосипеде вместо машины, это занимает около двадцати минут.
N: I've also started cooking at home, so I know exactly what I'm eating. | Ещё я начал готовить дома, поэтому точно знаю, что ем.
N: I feel much more energetic, and I sleep better too. | Я чувствую себя гораздо бодрее и лучше сплю.
`, [["What did the speaker use to do?", ["Eat fast food", "Go running", "Cook every day"], 0], ["How does he get to work now?", ["By car", "By bike", "On foot"], 1], ["What is one result of the change?", ["He sleeps better", "He earns more", "He has more free time"], 0]],
["exercise", "cycle", "energetic"]),
L("radio", "monologue", "Weather forecast", "Прогноз погоды", `
N: And now the weather. Tomorrow will start cloudy in the north, with some light rain. | А теперь погода. Завтра на севере будет облачно, местами небольшой дождь.
N: In the south it will be mostly dry, with sunny spells in the afternoon. | На юге в основном сухо, днём временами солнечно.
N: Temperatures will reach eighteen degrees in London. | Температура в Лондоне достигнет восемнадцати градусов.
N: However, strong winds are expected along the coast in the evening. | Однако вечером на побережье ожидается сильный ветер.
`, [["What will the north have in the morning?", ["Snow", "Light rain", "Sunshine"], 1], ["What temperature in London?", ["Eight degrees", "Eighteen degrees", "Twenty-eight degrees"], 1], ["Where are strong winds expected?", ["In the mountains", "In the city", "Along the coast"], 2]],
["cloudy", "eighteen", "coast"]),
L("dict1", "dictation", "Dictation: social media", "Диктант: соцсети", `
N: Many people spend several hours a day on social media. | Многие проводят в соцсетях по несколько часов в день.
N: It helps us keep in touch with friends who live far away. | Они помогают поддерживать связь с друзьями, которые живут далеко.
N: However, it can also make us feel anxious or lonely. | Однако они также могут вызывать тревогу или одиночество.
N: It is a good idea to turn off your phone before going to bed. | Хорошая идея — выключать телефон перед сном.
`, [["What is one advantage mentioned?", ["Keeping in touch with friends", "Earning money", "Learning languages"], 0]], ["touch", "lonely"]),
L("dict2", "dictation", "Dictation: travelling by train", "Диктант: поездка на поезде", `
N: I prefer travelling by train because it is more comfortable than flying. | Я предпочитаю поезд, потому что это удобнее, чем самолёт.
N: You can read, work or simply look out of the window. | Можно читать, работать или просто смотреть в окно.
N: Although tickets can be expensive, booking early saves money. | Хотя билеты бывают дорогими, ранняя покупка экономит деньги.
N: It is also better for the environment. | Это также лучше для окружающей среды.
`, [["How can you save money?", ["Travel at night", "Book early", "Buy a return ticket"], 1]], ["comfortable", "environment"]),
];
