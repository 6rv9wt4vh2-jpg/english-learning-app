import type { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Greetings & Introductions",
    titleRu: "Приветствия и знакомство",
    description: "Learn basic greetings, polite phrases, and how to introduce yourself.",
    descriptionRu: "Базовые приветствия, вежливые фразы и представление себя.",
    level: "A1",
    wordIds: [
      "w001","w002","w003","w004","w005","w006","w007","w008","w009","w010",
      "w011","w012","w013","w014","w015","w016","w017","w018","w097","w101","w103","w107",
    ],
    sections: [
      {
        title: "Основные приветствия",
        content:
          "В английском приветствие зависит от времени суток и ситуации. Hello и Hi — универсальные. Good morning — утром, Good evening — вечером. Good night говорят при прощании перед сном.",
        examples: [
          { en: "Hello! How are you?", ru: "Здравствуйте! Как дела?" },
          { en: "Hi! Nice to meet you.", ru: "Привет! Приятно познакомиться." },
          { en: "Good morning!", ru: "Доброе утро!" },
        ],
      },
      {
        title: "Как представиться",
        content:
          "Чтобы назвать себя, используйте: My name is… или I'm…. Спросите имя собеседника: What's your name? После знакомства часто говорят Nice to meet you.",
        examples: [
          { en: "My name is Anna. What's your name?", ru: "Меня зовут Анна. Как вас зовут?" },
          { en: "I'm Dmitry. Nice to meet you.", ru: "Я Дмитрий. Приятно познакомиться." },
        ],
      },
      {
        title: "Вежливость",
        content:
          "Please — при просьбе. Thank you / Thanks — благодарность. Sorry — извинение. You're welcome — «пожалуйста» в ответ на «спасибо».",
        examples: [
          { en: "Can you help me, please?", ru: "Можете помочь, пожалуйста?" },
          { en: "Thank you! — You're welcome.", ru: "Спасибо! — Пожалуйста." },
        ],
      },
    ],
    exercises: [
      {
        question: "How do you say «Доброе утро»?",
        questionRu: "Как сказать «Доброе утро»?",
        options: ["Good night", "Good morning", "Good evening", "Hello night"],
        correctIndex: 1,
      },
      {
        question: "What do you say when you meet someone new?",
        questionRu: "Что говорят при знакомстве?",
        options: ["Good night", "See you", "Nice to meet you", "I'm sorry"],
        correctIndex: 2,
      },
      {
        question: "Choose the polite request:",
        questionRu: "Выберите вежливую просьбу:",
        options: ["Help me!", "Can you help me, please?", "You help now.", "Help?"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "lesson-2",
    title: "Family & People",
    titleRu: "Семья и люди",
    description: "Talk about family members and describe people.",
    descriptionRu: "Слова о родственниках и описание людей.",
    level: "A1",
    wordIds: [
      "w019","w020","w021","w022","w023","w024","w025","w026","w027","w028",
      "w029","w030","w031","w032","w033","w034","w035","w036","w099","w105","w106",
    ],
    sections: [
      {
        title: "Члены семьи",
        content:
          "Mother / mom, father / dad, sister, brother, parents, grandparents (бабушка и дедушка). Son и daughter — сын и дочь. Husband и wife — муж и жена.",
        examples: [
          { en: "I have two brothers and one sister.", ru: "У меня два брата и одна сестра." },
          { en: "My parents live in Moscow.", ru: "Мои родители живут в Москве." },
        ],
      },
      {
        title: "Говорим о семье",
        content:
          "Структура have / has: I have a sister. She has a son. Для возраста: He is 10 years old. Для описания: My brother is tall / young / kind.",
        examples: [
          { en: "She has one child.", ru: "У неё один ребёнок." },
          { en: "My grandmother is old but active.", ru: "Моя бабушка пожилая, но активная." },
        ],
      },
      {
        title: "Притяжательные местоимения",
        content:
          "my — мой, your — твой/ваш, his — его, her — её, our — наш, their — их. Пример: This is my family. Their house is big.",
        examples: [
          { en: "This is my father.", ru: "Это мой отец." },
          { en: "Their daughter likes books.", ru: "Их дочь любит книги." },
        ],
      },
    ],
    exercises: [
      {
        question: "What is the English for «родители»?",
        questionRu: "Как по-английски «родители»?",
        options: ["parent", "parents", "people", "family"],
        correctIndex: 1,
      },
      {
        question: "Choose the correct sentence:",
        questionRu: "Выберите правильное предложение:",
        options: ["She have a brother.", "She has a brother.", "She haves a brother.", "She having a brother."],
        correctIndex: 1,
      },
      {
        question: "«Дочь» in English is…",
        questionRu: "«Дочь» по-английски — …",
        options: ["son", "child", "daughter", "sister"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "lesson-3",
    title: "Food & Drinks",
    titleRu: "Еда и напитки",
    description: "Useful words for meals, ordering food, and talking about taste.",
    descriptionRu: "Слова для еды, заказа в кафе и описания вкуса.",
    level: "A1",
    wordIds: [
      "w037","w038","w039","w040","w041","w042","w043","w044","w045","w046",
      "w047","w048","w049","w050","w051","w052","w053","w054",
    ],
    sections: [
      {
        title: "Приёмы пищи",
        content:
          "Breakfast — завтрак, lunch — обед, dinner — ужин. Часто говорят: have breakfast / have lunch / have dinner.",
        examples: [
          { en: "I have breakfast at 8 a.m.", ru: "Я завтракаю в 8 утра." },
          { en: "Let's have lunch together.", ru: "Давайте пообедаем вместе." },
        ],
      },
      {
        title: "В кафе и ресторане",
        content:
          "Полезные фразы: Can I see the menu? I'd like… / I would like… Can I have some water? The bill, please. This is delicious!",
        examples: [
          { en: "I'd like a coffee, please.", ru: "Мне кофе, пожалуйста." },
          { en: "Can I see the menu?", ru: "Можно меню?" },
        ],
      },
      {
        title: "Countable / Uncountable (кратко)",
        content:
          "Яблоки, овощи — можно посчитать (an apple, two apples). Water, milk, bread, coffee — обычно неисчисляемые: some water, some bread (не a water).",
        examples: [
          { en: "I'd like an apple.", ru: "Я бы хотел яблоко." },
          { en: "Can I have some water?", ru: "Можно воды?" },
        ],
      },
    ],
    exercises: [
      {
        question: "Which meal is in the morning?",
        questionRu: "Какой приём пищи утром?",
        options: ["dinner", "lunch", "breakfast", "snack only"],
        correctIndex: 2,
      },
      {
        question: "Choose the natural phrase:",
        questionRu: "Выберите естественную фразу:",
        options: ["I want a water.", "Can I have some water?", "Give water me.", "Waters please."],
        correctIndex: 1,
      },
      {
        question: "«Вкусный» in English is…",
        questionRu: "«Вкусный» по-английски — …",
        options: ["hungry", "delicious", "menu", "fruit"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "lesson-4",
    title: "Present Simple & Daily Routine",
    titleRu: "Present Simple и распорядок дня",
    description: "Talk about habits using Present Simple and frequency adverbs.",
    descriptionRu: "Привычки, Present Simple и наречия частоты.",
    level: "A2",
    wordIds: [
      "w055","w056","w057","w058","w059","w060","w061","w062","w063","w064",
      "w065","w066","w067","w068","w069","w070","w071","w072","w098","w100","w102","w104","w108",
    ],
    sections: [
      {
        title: "Когда используем Present Simple",
        content:
          "Для привычек, фактов и расписания: I work every day. She lives in London. The train leaves at 9. Для he/she/it добавляем -s/-es: he works, she studies, it goes.",
        examples: [
          { en: "I wake up at seven.", ru: "Я просыпаюсь в семь." },
          { en: "She studies English every day.", ru: "Она учит английский каждый день." },
        ],
      },
      {
        title: "Наречия частоты",
        content:
          "always (всегда) → usually (обычно) → often (часто) → sometimes (иногда) → never (никогда). Обычно стоят перед смысловым глаголом: I always drink tea. Но после be: She is never late.",
        examples: [
          { en: "I usually walk to work.", ru: "Я обычно хожу на работу пешком." },
          { en: "He never eats meat.", ru: "Он никогда не ест мясо." },
        ],
      },
      {
        title: "Вопросы и отрицания",
        content:
          "Do/Does + подлежащее + глагол? Do you work here? Does she live nearby? Отрицание: I don't (do not) like coffee. He doesn't (does not) sleep late.",
        examples: [
          { en: "Do you like reading?", ru: "Тебе нравится читать?" },
          { en: "She doesn't work on Sundays.", ru: "Она не работает по воскресеньям." },
        ],
      },
    ],
    exercises: [
      {
        question: "Choose the correct form:",
        questionRu: "Выберите правильную форму:",
        options: ["She go to school.", "She goes to school.", "She going to school.", "She to go school."],
        correctIndex: 1,
      },
      {
        question: "Where does «always» usually go?",
        questionRu: "Где обычно стоит «always»?",
        options: ["After the main verb", "Before the main verb", "Only at the end", "Only at the start"],
        correctIndex: 1,
      },
      {
        question: "Make a question: you / study / English",
        questionRu: "Сделайте вопрос: you / study / English",
        options: ["Study you English?", "Do you study English?", "Does you study English?", "You do study English?"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "lesson-5",
    title: "In the City & Travel",
    titleRu: "В городе и путешествия",
    description: "Ask for directions, buy tickets, and talk about places in a city.",
    descriptionRu: "Спрашивать дорогу, билеты и ориентироваться в городе.",
    level: "A2",
    wordIds: [
      "w073","w074","w075","w076","w077","w078","w079","w080","w081","w082",
      "w083","w084","w085","w086","w087","w088","w089","w090","w091","w092","w093","w094","w095","w096",
    ],
    sections: [
      {
        title: "Как спросить дорогу",
        content:
          "Where is…? How do I get to…? Is it far? Ответы: Go straight. Turn left / right. It's near / far. The station is on the right.",
        examples: [
          { en: "Where is the station?", ru: "Где вокзал?" },
          { en: "Turn left and go straight.", ru: "Поверните налево и идите прямо." },
        ],
      },
      {
        title: "Транспорт и билеты",
        content:
          "bus, train, airport, ticket, passport. Полезные фразы: I need a ticket to… How much is a ticket? When does the bus leave?",
        examples: [
          { en: "I need a train ticket to London.", ru: "Мне нужен билет на поезд до Лондона." },
          { en: "How much is this?", ru: "Сколько это стоит?" },
        ],
      },
      {
        title: "В городе",
        content:
          "shop, hotel, street, city. The shop is open / closed. This hotel is expensive / cheap. Don't forget your passport!",
        examples: [
          { en: "The museum is closed today.", ru: "Музей сегодня закрыт." },
          { en: "Is there a shop nearby?", ru: "Рядом есть магазин?" },
        ],
      },
    ],
    exercises: [
      {
        question: "«Поверните направо» is…",
        questionRu: "«Поверните направо» — это…",
        options: ["Turn left", "Go straight", "Turn right", "Go far"],
        correctIndex: 2,
      },
      {
        question: "What do you need at the airport?",
        questionRu: "Что нужно в аэропорту?",
        options: ["A menu", "A passport", "A grandmother", "A vegetable"],
        correctIndex: 1,
      },
      {
        question: "Choose the best question for price:",
        questionRu: "Лучший вопрос о цене:",
        options: ["Where is this?", "When is this?", "How much is this?", "Who is this?"],
        correctIndex: 2,
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
