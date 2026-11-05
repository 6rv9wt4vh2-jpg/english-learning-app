import { mkL } from "./types";
const L = mkL("A2");
export const lessons = [
L("weekend", "dialogue", "Last weekend", "Прошлые выходные", `
A: Hi Mark, did you have a good weekend? | Привет, Марк, хорошо провёл выходные?
B: Yes, thanks. On Saturday I went to the cinema with my sister. | Да, спасибо. В субботу я ходил в кино с сестрой.
A: What did you see? | Что смотрели?
B: A comedy. It was really funny. What about you? | Комедию. Было очень смешно. А ты?
A: I stayed at home on Saturday because it was raining. | В субботу я сидела дома, потому что шёл дождь.
B: And on Sunday? | А в воскресенье?
A: On Sunday I visited my grandparents in the country. | В воскресенье я навестила бабушку с дедушкой за городом.
`, [["Who did Mark go to the cinema with?", ["His friend", "His sister", "His mother"], 1], ["Why did the woman stay at home?", ["She was ill", "It was raining", "She was tired"], 1], ["What did she do on Sunday?", ["Visited her grandparents", "Went shopping", "Played tennis"], 0]],
["cinema", "funny", "raining"], { A: "Kate", B: "Mark" }),
L("doctor", "dialogue", "At the doctor's", "У врача", `
A: Good morning. What's the problem? | Доброе утро. Что вас беспокоит?
B: I've got a headache and a sore throat. | У меня болит голова и горло.
A: How long have you felt like this? | Как давно вы так себя чувствуете?
B: Since Tuesday. I also have a temperature. | Со вторника. И ещё у меня температура.
A: I think it's a cold. Drink a lot of water and rest. | Думаю, это простуда. Пейте много воды и отдыхайте.
B: Should I take any medicine? | Мне нужно принимать лекарство?
A: Take these tablets three times a day after meals. | Принимайте эти таблетки три раза в день после еды.
`, [["What is wrong with the patient?", ["A broken arm", "A headache and a sore throat", "A stomach ache"], 1], ["Since when?", ["Monday", "Tuesday", "Friday"], 1], ["How often should he take the tablets?", ["Once a day", "Twice a day", "Three times a day"], 2]],
["headache", "Tuesday", "tablets"], { A: "Doctor", B: "Patient" }),
L("directions", "dialogue", "Asking the way", "Как пройти", `
A: Excuse me, is there a bank near here? | Извините, здесь поблизости есть банк?
B: Yes, there's one on Green Street. | Да, есть один на Грин-стрит.
A: How do I get there? | Как туда добраться?
B: Go straight on and turn left at the traffic lights. | Идите прямо и поверните налево на светофоре.
B: The bank is opposite the post office. | Банк напротив почты.
A: Is it far? | Это далеко?
B: No, it's about five minutes on foot. | Нет, около пяти минут пешком.
`, [["What is the person looking for?", ["A bank", "A hotel", "A post office"], 0], ["Where should he turn left?", ["At the church", "At the traffic lights", "At the park"], 1], ["How far is it?", ["Five minutes on foot", "Fifteen minutes by bus", "Very far"], 0]],
["bank", "left", "opposite"], { A: "Tourist", B: "Local" }),
L("holiday", "monologue", "My holiday in Spain", "Мой отпуск в Испании", `
N: Last summer I went to Spain with my friends. | Прошлым летом я ездил в Испанию с друзьями.
N: We stayed in a small hotel near the beach. | Мы жили в маленьком отеле у пляжа.
N: The weather was hot and sunny every day. | Погода каждый день была жаркой и солнечной.
N: We swam in the sea and ate a lot of delicious food. | Мы плавали в море и ели много вкусной еды.
N: One day we visited an old castle in the mountains. | Однажды мы посетили старый замок в горах.
N: It was the best holiday of my life. | Это был лучший отпуск в моей жизни.
`, [["Who did the speaker travel with?", ["Family", "Friends", "Alone"], 1], ["Where was the hotel?", ["In the city centre", "Near the beach", "In the mountains"], 1], ["What did they visit one day?", ["A museum", "A castle", "A zoo"], 1]],
["beach", "sunny", "castle"]),
L("airport", "monologue", "Airport announcement", "Объявление в аэропорту", `
N: This is the final call for flight BA 245 to Rome. | Это последний вызов на рейс BA 245 в Рим.
N: Passengers should go to gate twelve immediately. | Пассажиры должны немедленно пройти к выходу двенадцать.
N: The gate will close in ten minutes. | Выход закроется через десять минут.
N: Please have your passport and boarding pass ready. | Пожалуйста, приготовьте паспорт и посадочный талон.
`, [["Where is the flight going?", ["Rome", "Madrid", "Paris"], 0], ["Which gate?", ["Two", "Twelve", "Twenty"], 1], ["When will the gate close?", ["In five minutes", "In ten minutes", "In an hour"], 1]],
["Rome", "twelve", "passport"]),
L("plans", "monologue", "Plans for the summer", "Планы на лето", `
N: This summer I'm going to learn to drive. | Этим летом я собираюсь научиться водить.
N: I'm going to take lessons twice a week. | Я буду брать уроки два раза в неделю.
N: In August my family is going to visit Scotland. | В августе моя семья собирается поехать в Шотландию.
N: We're going to rent a car and travel around. | Мы возьмём машину напрокат и будем путешествовать.
N: I hope the weather will be good! | Надеюсь, погода будет хорошей!
`, [["What is the speaker going to learn?", ["To swim", "To drive", "To cook"], 1], ["How often are the lessons?", ["Once a week", "Twice a week", "Every day"], 1], ["Where is the family going in August?", ["Ireland", "Wales", "Scotland"], 2]],
["drive", "twice", "rent"]),
L("dict1", "dictation", "Dictation: my best friend", "Диктант: мой лучший друг", `
N: My best friend is called Daniel. | Моего лучшего друга зовут Дэниел.
N: We met at school when we were eight. | Мы познакомились в школе, когда нам было восемь.
N: He is funny, kind and very clever. | Он весёлый, добрый и очень умный.
N: We usually play football together on Saturdays. | Обычно мы играем в футбол вместе по субботам.
N: I can always talk to him about my problems. | Я всегда могу поговорить с ним о своих проблемах.
`, [["When did they meet?", ["At university", "At school, aged eight", "Last year"], 1]], ["clever", "football"]),
L("dict2", "dictation", "Dictation: a recipe", "Диктант: рецепт", `
N: First, break two eggs into a bowl. | Сначала разбейте два яйца в миску.
N: Add a little milk, salt and pepper. | Добавьте немного молока, соли и перца.
N: Heat some butter in a pan. | Разогрейте немного масла на сковороде.
N: Cook the eggs for three minutes and serve with bread. | Готовьте яйца три минуты и подавайте с хлебом.
`, [["How many eggs do you need?", ["One", "Two", "Three"], 1]], ["bowl", "butter"]),
];
