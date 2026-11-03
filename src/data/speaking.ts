import type { Level } from "@/data/course";

export type SpeakKind = "read" | "answer" | "describe";
export interface SpeakTask { id: string; level: Level; kind: SpeakKind; en: string; ru: string; hint?: string; minWords?: number; }

const R: Record<Level, [string, string][]> = {
  A1: [
    ["Hello, my name is Anna.", "Привет, меня зовут Анна."],
    ["I live in a small flat in Moscow.", "Я живу в маленькой квартире в Москве."],
    ["My brother is ten years old.", "Моему брату десять лет."],
    ["I like coffee, but I don't like tea.", "Я люблю кофе, но не люблю чай."],
    ["Where is the bus station, please?", "Где автовокзал, пожалуйста?"],
    ["We have English on Monday and Friday.", "У нас английский в понедельник и пятницу."],
  ],
  A2: [
    ["Last weekend I visited my grandparents.", "В прошлые выходные я навестил бабушку и дедушку."],
    ["Could you tell me the way to the museum?", "Не подскажете дорогу к музею?"],
    ["I'm going to start a new job next month.", "В следующем месяце я начну новую работу."],
    ["It was much colder yesterday than today.", "Вчера было намного холоднее, чем сегодня."],
    ["Have you ever been to London?", "Ты когда-нибудь был в Лондоне?"],
    ["I usually get up at seven o'clock.", "Обычно я встаю в семь часов."],
  ],
  B1: [
    ["I've been learning English for three years.", "Я учу английский уже три года."],
    ["If I had more free time, I would travel more.", "Если бы у меня было больше времени, я бы больше путешествовал."],
    ["The film was better than I had expected.", "Фильм оказался лучше, чем я ожидал."],
    ["I'm not used to working late at night.", "Я не привык работать поздно ночью."],
    ["She asked me whether I could help her.", "Она спросила, могу ли я ей помочь."],
    ["Recycling is one of the easiest ways to protect the environment.", "Переработка — один из самых простых способов защитить природу."],
  ],
  B2: [
    ["Had I known about the delay, I would have taken a later train.", "Знай я о задержке, сел бы на более поздний поезд."],
    ["The project is expected to be completed by the end of the year.", "Ожидается, что проект завершат к концу года."],
    ["Despite the heavy rain, the concert went ahead as planned.", "Несмотря на ливень, концерт прошёл по плану."],
    ["It's high time we dealt with this problem seriously.", "Давно пора заняться этой проблемой всерьёз."],
    ["Working from home has its advantages and drawbacks.", "У удалённой работы есть плюсы и минусы."],
    ["I'd rather you didn't mention it to anyone.", "Я бы предпочёл, чтобы ты никому об этом не говорил."],
  ],
  C1: [
    ["Not only did the policy fail, but it also deepened public distrust.", "Политика не только провалилась, но и усилила недоверие общества."],
    ["The findings shed light on a long-overlooked aspect of the issue.", "Результаты проливают свет на давно упускаемый аспект проблемы."],
    ["Were it not for her persistence, the initiative would have collapsed.", "Если бы не её упорство, инициатива бы рухнула."],
    ["It remains to be seen whether these measures will prove effective.", "Ещё предстоит увидеть, окажутся ли эти меры эффективными."],
    ["The debate hinges on how we define personal responsibility.", "Спор упирается в то, как мы определяем личную ответственность."],
    ["Arguably, technology has outpaced our ability to regulate it.", "Пожалуй, технологии опередили нашу способность их регулировать."],
  ],
};

const Q: Record<Level, [SpeakKind, string, string, string][]> = {
  A1: [
    ["answer", "What is your name and where are you from?", "Как вас зовут и откуда вы?", "My name is… I'm from…"],
    ["answer", "What do you usually eat for breakfast?", "Что вы обычно едите на завтрак?", "I usually eat… and drink…"],
    ["describe", "Describe your family.", "Опишите свою семью.", "There are … people in my family. My mother is…"],
    ["describe", "Describe your room.", "Опишите свою комнату.", "In my room there is/are…"],
  ],
  A2: [
    ["answer", "What did you do last weekend?", "Что вы делали в прошлые выходные?", "Last weekend I went/visited/watched…"],
    ["answer", "What are your plans for the summer?", "Какие у вас планы на лето?", "I'm going to…"],
    ["describe", "Describe your town or city.", "Опишите свой город.", "My town is… There are… The best place is…"],
    ["describe", "Describe your best friend.", "Опишите своего лучшего друга.", "My best friend is… He/She likes…"],
  ],
  B1: [
    ["answer", "Why are you learning English?", "Зачем вы учите английский?", "I'm learning English because… It helps me…"],
    ["answer", "What would you do if you won a lot of money?", "Что бы вы сделали, если бы выиграли много денег?", "If I won…, I would…"],
    ["describe", "Describe a memorable trip you have taken.", "Опишите запомнившуюся поездку.", "A few years ago I went to… What I remember most is…"],
    ["describe", "Talk about the advantages and disadvantages of social media.", "Плюсы и минусы соцсетей.", "On the one hand… On the other hand…"],
  ],
  B2: [
    ["answer", "Should university education be free? Why or why not?", "Должно ли высшее образование быть бесплатным?", "In my view… One reason is… However…"],
    ["answer", "How has technology changed the way people work?", "Как технологии изменили работу людей?", "Over the last decade… As a result…"],
    ["describe", "Describe a difficult decision you had to make.", "Опишите трудное решение, которое вам пришлось принять.", "I had to decide whether… In the end…"],
    ["describe", "Discuss the pros and cons of living in a big city.", "Плюсы и минусы жизни в большом городе.", "While big cities offer…, they also…"],
  ],
  C1: [
    ["answer", "To what extent should governments regulate artificial intelligence?", "Насколько государство должно регулировать ИИ?", "I would argue that… That said…"],
    ["answer", "Is it ever justified to break the rules?", "Оправдано ли когда-нибудь нарушать правила?", "It largely depends on… A case in point is…"],
    ["describe", "Describe a trend in your country that concerns you.", "Опишите тенденцию в вашей стране, которая вас беспокоит.", "One development that troubles me is… Its roots lie in…"],
    ["describe", "Evaluate the impact of globalisation on local cultures.", "Оцените влияние глобализации на местные культуры.", "Globalisation has undeniably… Yet…"],
  ],
};

const MIN: Record<Level, number> = { A1: 10, A2: 20, B1: 35, B2: 50, C1: 60 };

export const speakingTasks: SpeakTask[] = (Object.keys(R) as Level[]).flatMap((l) => [
  ...R[l].map(([en, ru], i) => ({ id: `${l.toLowerCase()}-s-read-${i + 1}`, level: l, kind: "read" as const, en, ru })),
  ...Q[l].map(([kind, en, ru, hint], i) => ({ id: `${l.toLowerCase()}-s-${kind}-${i + 1}`, level: l, kind, en, ru, hint, minWords: MIN[l] })),
]);

export const KIND_META: Record<SpeakKind, { label: string; ru: string; emoji: string; gradient: string }> = {
  read: { label: "Read aloud", ru: "Прочитать вслух", emoji: "📢", gradient: "from-sky-400 to-indigo-600" },
  answer: { label: "Answer a question", ru: "Ответить на вопрос", emoji: "💬", gradient: "from-emerald-400 to-teal-600" },
  describe: { label: "Describe a topic", ru: "Рассказать на тему", emoji: "🗣️", gradient: "from-rose-400 to-pink-600" },
};
