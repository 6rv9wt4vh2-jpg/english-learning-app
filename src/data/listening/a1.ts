import { mkL } from "./types";
const L = mkL("A1");
export const lessons = [
L("meet", "dialogue", "Nice to meet you", "Приятно познакомиться", `
A: Hello! My name is Anna. What's your name? | Привет! Меня зовут Анна. Как тебя зовут?
B: Hi, Anna. I'm Tom. Nice to meet you. | Привет, Анна. Я Том. Приятно познакомиться.
A: Nice to meet you too. Where are you from? | Мне тоже приятно. Откуда ты?
B: I'm from London. And you? | Я из Лондона. А ты?
A: I'm from Moscow. I'm a student. | Я из Москвы. Я студентка.
B: Me too! I study at the university here. | Я тоже! Я учусь здесь в университете.
`, [["Where is Tom from?", ["Moscow", "London", "Paris"], 1], ["What is Anna?", ["A teacher", "A doctor", "A student"], 2], ["Where does Tom study?", ["At school", "At the university", "At home"], 1]],
["name", "London", "student"], { A: "Anna", B: "Tom" }),
L("cafe", "dialogue", "At the café", "В кафе", `
A: Good morning. What would you like? | Доброе утро. Что вы хотите?
B: A coffee with milk, please. | Кофе с молоком, пожалуйста.
A: Small or large? | Маленький или большой?
B: Large, please. And a cheese sandwich. | Большой, пожалуйста. И бутерброд с сыром.
A: That's five pounds, please. | С вас пять фунтов.
B: Here you are. Thank you! | Вот, пожалуйста. Спасибо!
`, [["What does the customer drink?", ["Tea", "Coffee with milk", "Orange juice"], 1], ["What size?", ["Small", "Medium", "Large"], 2], ["How much is it?", ["Five pounds", "Nine pounds", "Two pounds"], 0]],
["milk", "Large", "cheese"], { A: "Waiter", B: "Customer" }),
L("family", "monologue", "My family", "Моя семья", `
N: Hi, I'm Lucy. I'm ten years old. | Привет, я Люси. Мне десять лет.
N: I live with my mum, my dad and my brother. | Я живу с мамой, папой и братом.
N: My brother's name is Sam. He is seven. | Моего брата зовут Сэм. Ему семь.
N: My mum is a nurse and my dad is a teacher. | Моя мама медсестра, а папа учитель.
N: We have a black cat. Her name is Kitty. | У нас есть чёрная кошка. Её зовут Китти.
`, [["How old is Lucy?", ["Seven", "Ten", "Twelve"], 1], ["What is Lucy's dad?", ["A nurse", "A doctor", "A teacher"], 2], ["What pet do they have?", ["A dog", "A cat", "A fish"], 1]],
["brother", "nurse", "black"]),
L("day", "monologue", "My day", "Мой день", `
N: I get up at seven o'clock every day. | Я встаю в семь часов каждый день.
N: I have breakfast and then I go to work by bus. | Я завтракаю, а потом еду на работу на автобусе.
N: I start work at nine. | Я начинаю работу в девять.
N: I have lunch at one o'clock with my friends. | Я обедаю в час со своими друзьями.
N: In the evening I watch TV and read a book. | Вечером я смотрю телевизор и читаю книгу.
N: I go to bed at eleven. | Я ложусь спать в одиннадцать.
`, [["How does the speaker go to work?", ["By car", "By bus", "On foot"], 1], ["When does work start?", ["At seven", "At nine", "At one"], 1], ["What time does the speaker go to bed?", ["At ten", "At eleven", "At twelve"], 1]],
["seven", "bus", "lunch"]),
L("shop", "dialogue", "In a clothes shop", "В магазине одежды", `
A: Can I help you? | Могу я вам помочь?
B: Yes, how much is this T-shirt? | Да, сколько стоит эта футболка?
A: It's twelve pounds. | Двенадцать фунтов.
B: Do you have it in blue? | У вас есть такая синяя?
A: Yes, here you are. What size are you? | Да, вот, пожалуйста. Какой у вас размер?
B: Medium. Can I try it on? | Средний. Можно примерить?
A: Of course. The changing room is over there. | Конечно. Примерочная вон там.
`, [["How much is the T-shirt?", ["Ten pounds", "Twelve pounds", "Twenty pounds"], 1], ["What colour does the customer want?", ["Red", "Black", "Blue"], 2], ["What size?", ["Small", "Medium", "Large"], 1]],
["twelve", "blue", "try"], { A: "Shop assistant", B: "Customer" }),
L("station", "monologue", "Train announcement", "Объявление на вокзале", `
N: Good afternoon, ladies and gentlemen. | Добрый день, дамы и господа.
N: The train to Oxford leaves from platform four. | Поезд до Оксфорда отправляется с четвёртой платформы.
N: It leaves at ten past three. | Он отправляется в десять минут четвёртого.
N: The train is ten minutes late. | Поезд опаздывает на десять минут.
N: We are sorry for the delay. | Приносим извинения за задержку.
`, [["Where is the train going?", ["London", "Oxford", "Cambridge"], 1], ["Which platform?", ["Two", "Four", "Ten"], 1], ["Is the train on time?", ["Yes", "No, it is late", "It is cancelled"], 1]],
["Oxford", "four", "late"]),
L("dict1", "dictation", "Dictation: my home", "Диктант: мой дом", `
N: I live in a small flat. | Я живу в маленькой квартире.
N: There are two rooms and a kitchen. | Там две комнаты и кухня.
N: My bedroom is next to the bathroom. | Моя спальня рядом с ванной.
N: I like my home very much. | Мне очень нравится мой дом.
`, [["How many rooms are there?", ["One", "Two", "Three"], 1]], ["small", "kitchen"]),
L("dict2", "dictation", "Dictation: the weather", "Диктант: погода", `
N: Today it is sunny and warm. | Сегодня солнечно и тепло.
N: I don't need my coat. | Мне не нужно пальто.
N: Tomorrow it will rain. | Завтра будет дождь.
N: Take an umbrella with you. | Возьми с собой зонт.
`, [["What is the weather like tomorrow?", ["Sunny", "Rainy", "Snowy"], 1]], ["sunny", "umbrella"]),
];
