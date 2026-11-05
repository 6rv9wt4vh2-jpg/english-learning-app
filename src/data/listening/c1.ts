import { mkL } from "./types";
const L = mkL("C1");
export const lessons = [
L("ai", "dialogue", "Debate: AI in education", "Дебаты: ИИ в образовании", `
A: I'd argue that banning AI tools in schools is not only unrealistic but counterproductive. | Я бы сказал, что запрещать ИИ в школах не только нереалистично, но и контрпродуктивно.
B: I take your point, but if students outsource their thinking, they never develop the skills the essay is meant to build. | Понимаю вашу мысль, но если ученики перекладывают мышление на машину, они так и не развивают навыки, ради которых пишется эссе.
A: That assumes assessment stays the same. Surely the answer is to redesign tasks so that the process matters as much as the product. | Это при условии, что оценивание не изменится. Ответ, конечно, в том, чтобы переделать задания так, чтобы процесс был важен не меньше результата.
B: In principle, yes. In practice, teachers are already stretched, and redesigning a whole curriculum takes years. | В принципе да. На практике учителя и так перегружены, а переделка программы занимает годы.
A: Which is precisely why we should start now rather than pretend the technology will go away. | Именно поэтому начинать нужно сейчас, а не делать вид, что технология исчезнет.
`, [["What is the first speaker's position on banning AI?", ["It is necessary", "It is unrealistic and counterproductive", "It should be decided by parents"], 1], ["What is the second speaker worried about?", ["Cost", "Students not developing skills", "Data privacy"], 1], ["What practical obstacle is mentioned?", ["Teachers are already stretched", "Schools lack computers", "Students dislike AI"], 0]],
["counterproductive", "outsource", "curriculum"], { A: "Speaker 1", B: "Speaker 2" }),
L("feedback", "dialogue", "Giving difficult feedback", "Сложная обратная связь", `
A: Thanks for making time. I wanted to talk through how the launch went from your side. | Спасибо, что нашли время. Хотела обсудить, как прошёл запуск с вашей стороны.
B: Well, I'm aware the deadline slipped, if that's what you're getting at. | Ну, я знаю, что сроки сорвались, если вы к этому ведёте.
A: It's not about blame. I'm more concerned that the client heard about the delay before we did. | Дело не в поиске виноватых. Меня больше беспокоит, что клиент узнал о задержке раньше нас.
B: That's fair. I suppose I was hoping to fix it quietly rather than raise a red flag. | Справедливо. Наверное, я надеялся тихо всё исправить, а не поднимать тревогу.
A: I appreciate the instinct, but flagging issues early gives us room to manoeuvre. Shall we agree on weekly check-ins? | Ценю это стремление, но ранние сигналы дают нам пространство для манёвра. Договоримся о еженедельных встречах?
`, [["What is the manager's main concern?", ["The cost of the project", "The client heard about the delay first", "Poor quality work"], 1], ["Why didn't the employee report the problem?", ["He didn't notice it", "He hoped to fix it quietly", "He was on holiday"], 1], ["What do they agree on?", ["Weekly check-ins", "A new deadline", "Extra staff"], 0]],
["deadline", "blame", "manoeuvre"], { A: "Manager", B: "Team member" }),
L("interview", "dialogue", "Radio interview: an economist", "Радиоинтервью с экономистом", `
A: Inflation has eased, yet many households say they feel worse off. How do you explain that? | Инфляция замедлилась, но многие семьи говорят, что им живётся хуже. Как это объяснить?
B: Lower inflation means prices are rising more slowly, not that they're falling. People are comparing today's prices with what they paid three years ago. | Более низкая инфляция означает, что цены растут медленнее, а не что они падают. Люди сравнивают сегодняшние цены с теми, что были три года назад.
A: So wages haven't caught up? | То есть зарплаты не догнали цены?
B: For many, no. Real incomes are only now returning to their previous levels, and housing costs remain stubbornly high. | Для многих нет. Реальные доходы только сейчас возвращаются к прежнему уровню, а расходы на жильё остаются упорно высокими.
`, [["What does lower inflation mean?", ["Prices are falling", "Prices are rising more slowly", "Wages are rising faster"], 1], ["What are people comparing prices with?", ["Prices in other countries", "Prices three years ago", "Last month's prices"], 1], ["What remains high?", ["Food prices", "Housing costs", "Fuel prices"], 1]],
["Inflation", "wages", "stubbornly"], { A: "Presenter", B: "Economist" }),
L("lecture", "monologue", "Lecture: memory and forgetting", "Лекция: память и забывание", `
N: We tend to think of forgetting as a failure of memory, but there is growing evidence that it serves a purpose. | Мы склонны считать забывание сбоем памяти, но всё больше данных говорит о том, что у него есть функция.
N: By discarding irrelevant detail, the brain is able to generalise from experience rather than store every instance. | Отбрасывая несущественные детали, мозг может обобщать опыт, а не хранить каждый случай.
N: Ebbinghaus showed that much of what we learn fades within days unless it is revisited. | Эббингауз показал, что многое из выученного исчезает за несколько дней, если к этому не возвращаться.
N: Spaced repetition exploits this curve by reviewing material just as it is about to be forgotten. | Интервальное повторение использует эту кривую, повторяя материал как раз тогда, когда он вот-вот забудется.
`, [["What does the lecturer say about forgetting?", ["It is always a failure", "It serves a purpose", "It can be prevented completely"], 1], ["What did Ebbinghaus show?", ["Memories never fade", "Much learning fades within days unless revisited", "Sleep improves memory"], 1], ["When does spaced repetition review material?", ["Every day at the same time", "Just before it is forgotten", "Only once"], 1]],
["purpose", "generalise", "revisited"]),
L("documentary", "monologue", "Documentary: the deep ocean", "Документальный фильм: глубины океана", `
N: More than eighty percent of the ocean remains unmapped, unobserved and unexplored. | Более восьмидесяти процентов океана остаются не нанесёнными на карту, не изученными и не исследованными.
N: At depths beyond a thousand metres, sunlight vanishes entirely, and yet life persists in astonishing variety. | На глубине более тысячи метров солнечный свет исчезает полностью, и всё же жизнь сохраняется в поразительном разнообразии.
N: Many creatures produce their own light, a phenomenon known as bioluminescence. | Многие существа сами излучают свет — это явление называется биолюминесценцией.
N: Scientists warn that deep-sea mining could destroy these ecosystems before we have even begun to understand them. | Учёные предупреждают, что глубоководная добыча может уничтожить эти экосистемы прежде, чем мы начнём их понимать.
`, [["How much of the ocean is unexplored?", ["About half", "More than eighty percent", "Ten percent"], 1], ["What is bioluminescence?", ["Creatures producing their own light", "Ocean currents", "A type of mining"], 0], ["What threat do scientists warn about?", ["Overfishing", "Deep-sea mining", "Tourism"], 1]],
["unmapped", "astonishing", "ecosystems"]),
L("speech", "monologue", "Graduation speech", "Выпускная речь", `
N: Graduates, you have been told that this is the beginning of the rest of your lives, and that is true, if somewhat daunting. | Выпускники, вам говорили, что это начало всей вашей дальнейшей жизни, и это правда, хоть и немного пугающая.
N: Let me offer one piece of advice: be wary of plans that are too detailed. | Позвольте дать один совет: остерегайтесь слишком подробных планов.
N: Some of the most rewarding turns in my career came from opportunities I never anticipated. | Некоторые из самых ценных поворотов в моей карьере произошли благодаря возможностям, которых я никогда не ожидал.
N: Stay curious, stay generous, and do not mistake a setback for a verdict. | Оставайтесь любознательными и щедрыми и не принимайте неудачу за приговор.
`, [["What does the speaker advise against?", ["Taking risks", "Plans that are too detailed", "Changing jobs"], 1], ["Where did rewarding turns come from?", ["Careful planning", "Unanticipated opportunities", "Family advice"], 1], ["What should graduates not do?", ["Mistake a setback for a verdict", "Travel abroad", "Stay curious"], 0]],
["daunting", "wary", "setback"]),
L("dict1", "dictation", "Dictation: urbanisation", "Диктант: урбанизация", `
N: By the middle of this century, two thirds of the world's population will live in cities. | К середине века две трети населения мира будут жить в городах.
N: This shift presents unprecedented challenges for infrastructure and housing. | Этот сдвиг создаёт беспрецедентные проблемы для инфраструктуры и жилья.
N: Nevertheless, well-planned cities can be remarkably efficient in their use of resources. | Тем не менее хорошо спланированные города могут быть удивительно эффективны в использовании ресурсов.
N: The key lies in investing in public transport and affordable homes. | Ключ — в инвестициях в общественный транспорт и доступное жильё.
`, [["What proportion will live in cities by mid-century?", ["Half", "Two thirds", "Three quarters"], 1]], ["unprecedented", "efficient"]),
L("dict2", "dictation", "Dictation: the ethics of science", "Диктант: этика науки", `
N: Scientific progress has often outpaced our ability to regulate it. | Научный прогресс часто опережал нашу способность его регулировать.
N: Gene editing, for instance, raises profound questions about consent and inequality. | Редактирование генов, например, поднимает глубокие вопросы о согласии и неравенстве.
N: Researchers bear a responsibility not merely to discover, but to anticipate consequences. | На исследователях лежит ответственность не просто открывать, но и предвидеть последствия.
N: Public debate should therefore accompany, rather than follow, innovation. | Поэтому общественная дискуссия должна сопровождать инновации, а не следовать за ними.
`, [["What example of a controversial technology is given?", ["Nuclear power", "Gene editing", "Social media"], 1]], ["outpaced", "consent"]),
];
