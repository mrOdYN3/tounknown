/* Locale for the app.
 *
 * The locale comes from the path: /ru serves the Russian app, everything else is English.
 * Sanskrit terms are transliterated rather than translated — Sādhana stays Садхана, because
 * the whole point of the product is that these words are the tradition's, not ours.
 *
 * Usage:  T("home.hero.cta")  → the string for the current locale, or the key's English
 *         fallback if a translation is missing, so a gap degrades to English rather than
 *         showing a raw key.
 */
(function () {
  const LOCALE = /^\/ru(\/|$)/.test(window.location.pathname) ? "ru" : "en";

  const RU = {
    // ---- navigation ----
    "nav.home": "Главная",
    "nav.paths": "Мārga",
    "nav.sangha": "Сангха",
    "nav.dana": "Дāна",
    "nav.sadhana": "Садхана",

    // ---- screen titles ----
    "title.home": "toUnknown",
    "title.paths": "Мārga — Пути",
    "title.sangha": "Сангха",
    "title.dana": "Дāна — обучение",
    "title.sadhana": "Твоя садхана",

    // ---- home ----
    "home.cta.begin": "Начать Путь",
    "home.cta.free": "15 минут бесплатно",
    "home.start.title": "Никогда не медитировал?",
    "home.start.sub": "Четыре вопроса — и мы назовём Путь, с которого начать.",
    "home.paths.eyebrow": "живые пути",
    "home.paths.lede.b": "Только корни.",
    "home.paths.lede": "Из каждой древней традиции — по одному Пути за раз, пройденному, а не пролистанному.",
    "home.kids.eyebrow": "для детей",
    "home.kids.lede.b": "Малыши тоже сидят.",
    "home.kids.lede": "Короткие истории и практики для 6–12 лет — и для тех, кто сидит рядом.",
    "home.paths.hint": "листай — все Пути",
    "home.how.eyebrow": "как это работает",
    "home.how.lede.b": "Открывается практикой,",
    "home.how.lede": "а не оплатой.",

    // ---- how it works ----
    "how.1.title": "Выбери Путь традиции",
    "how.1.lead": "Випассана · Тантра · Веданта · Бхакти · Стоицизм — у каждого своя традиция, источник и эпоха.",
    "how.1.body": "Здесь ничего не выдумано. Каждый Путь происходит из живой традиции и называет, откуда он пришёл, — ты всегда знаешь, чью практику выполняешь.",
    "how.1.cta": "Посмотреть Пути",
    "how.2.title": "Открывается абхьясой — постоянной практикой",
    "how.2.lead": "Каждая практика открывается только после того, как ты просидел предыдущую.",
    "how.2.body": "Вступления и беседы можно слушать когда угодно. Медитации открываются по порядку и только когда предыдущая действительно пройдена — время проверяется, промотать до конца не получится.",
    "how.3.title": "Пройди Врата Дīкṣā",
    "how.3.lead": "Часы практики и письменное размышление — печать садхаки.",
    "how.3.body": "На пороге более глубокой ступени тебя попросят выразить практику своими словами. Это читает учитель, а не машина.",
    "how.4.title": "Давай из благодарности",
    "how.4.lead": "Дāна появляется после практики, никогда до неё.",
    "how.4.body": "Тебя никогда не просят о деньгах, пока ты не сидел. Первый курс каждого Пути остаётся бесплатным, и никому не отказывают из-за денег — достаточно одного абзаца.",
    "how.4.cta": "Лестница обучения",

    // ---- paths ----
    "paths.lede.b": "Пути.",
    "paths.lede": "Живая библиотека созерцательных корней человечества.",
    "paths.start": "Не знаешь, с чего начать? Четыре вопроса",
    "paths.again": "Ответить заново — найти другое начало",
    "paths.suggested": "рекомендовано тебе",
    "paths.sittings": "практик",
    "paths.firstfree": "первые врата бесплатно",
    "paths.onpath": "на пути",
    "paths.awaiting": "ждут своих учителей",
    "paths.awaiting.lede": "Каждый Путь открывается, когда в Круг Сангхи входит его учитель традиции.",

    // ---- path sheet ----
    "sheet.course": "курс",
    "sheet.of": "из",
    "sheet.swipe": "— листай, чтобы сменить",
    "sheet.sit": "Сидеть",
    "sheet.listen": "Слушать",
    "sheet.pause": "Пауза",
    "sheet.intro": "вступление",
    "sheet.free": "бесплатно",
    "sheet.freehear": "можно послушать",
    "sheet.taster": "проба",
    "sheet.member": "участник",
    "sheet.signin": "войди, чтобы сидеть",
    "sheet.signin.listen": "войди, чтобы слушать",
    "sheet.needmember": "открывается с участием",
    "sheet.opens": "откроется, когда ты просидишь",
    "sheet.scrub": "Следующая практика откроется после того, как эта будет действительно пройдена, а не промотана. ☸",
    "sheet.sittings": "практик",
    "sheet.min": "мин",
    "sheet.hour": "ч",

    // ---- where to begin ----
    "start.eyebrow": "с чего начать",
    "start.title": "Давай найдём твой Путь.",
    "start.blurb": "Четыре вопроса, около минуты. Мы храним ответ вместе с твоей практикой, чтобы Путь ждал тебя при следующем открытии приложения, — поэтому сначала нужен аккаунт.",
    "start.signin": "Войти и начать",
    "start.notnow": "Не сейчас",
    "start.question": "вопрос",
    "start.back": "Назад",
    "start.result": "твоё начало",
    "start.open": "Открыть этот Путь",
    "start.retake": "Ответить заново",
    "start.finding": "Ищем твой Путь…",
    "start.nothinglocked": "Ничто к этому не привязано. Все Пути остаются открытыми — это лишь то, с чего мы бы начали.",
    "start.begin.with": "Начни с",

    "q.experience": "Ты уже сидел раньше?",
    "q.experience.note": "Здесь нет неправильного ответа — только разное начало.",
    "q.experience.never": "Никогда",
    "q.experience.never.sub": "я совсем не медитировал",
    "q.experience.some": "Немного",
    "q.experience.some.sub": "пробовал, время от времени",
    "q.experience.regular": "У меня есть практика",
    "q.experience.regular.sub": "сижу почти каждый день",

    "q.why": "Что тебя привело?",
    "q.why.note": "Скажи самое честное, а не самое красивое.",
    "q.why.restless": "Ум не успокаивается",
    "q.why.restless.sub": "беспокойство, тревога, шум",
    "q.why.grief": "Что-то тяжёлое",
    "q.why.grief.sub": "утрата, боль, окончание",
    "q.why.curious": "Хочу увидеть, как работает ум",
    "q.why.curious.sub": "любопытство, прозрение",
    "q.why.love": "Ищу, что полюбить",
    "q.why.love.sub": "преданность, связь",
    "q.why.steady": "Хочу стать устойчивее",
    "q.why.steady.sub": "дисциплина, характер",

    "q.door": "Какая дверь открыта?",
    "q.door.note": "Каждая традиция работает через своё чувство.",
    "q.door.breath": "Дыхание",
    "q.door.breath.sub": "наблюдать его, ничего не добавляя",
    "q.door.senses": "Тело и чувства",
    "q.door.senses.sub": "звук, ощущение, присутствие",
    "q.door.inquiry": "Вопрос",
    "q.door.inquiry.sub": "кто осознаёт? что остаётся?",
    "q.door.heart": "Сердце",
    "q.door.heart.sub": "молитва, отдача, благодарность",
    "q.door.reason": "Разум и воля",
    "q.door.reason.sub": "размышление о том, как жить",

    "q.time": "Сколько ты честно можешь сидеть?",
    "q.time.note": "Честно — короткая практика, которую держишь, лучше длинной, которую бросил.",
    "q.time.short": "Десять минут",
    "q.time.short.sub": "почти каждый день, если по-доброму к себе",
    "q.time.medium": "Пятнадцать–двадцать",
    "q.time.medium.sub": "это я могу защитить",
    "q.time.long": "Полчаса и больше",
    "q.time.long.sub": "есть время и воля",

    // ---- sangha / dana / sadhana ----
    "sangha.lede.b": "Не лента.",
    "sangha.lede": "Круг практикующих.",
    "sangha.satsang": "живой сатсанг",
    "sangha.monthly": "Ежемесячная встреча с DYNN",
    "sangha.telegram": "Пока Сангха в приложении строится, круг живёт в",

    "dana.lede.b": "Дāна.",
    "dana.lede": "Даёшь, потому что практика чего-то стоила, — не чтобы её получить.",
    "dana.reviews.note": "От практикующих, которые прошли эти курсы.",
    "dana.manage": "Управлять участием или отменить",
    "dana.scholarship": "Никому не отказывают из-за денег",

    "sadhana.signin.title": "Войди, чтобы сохранить практику",
    "sadhana.signin.sub": "Без пароля — мы пришлём ссылку на почту.",
    "sadhana.send": "Прислать ссылку",
    "sadhana.minutes": "минут сидел",
    "sadhana.sittings": "практик",
    "sadhana.gates": "врат пройдено",
    "sadhana.onpath": "Ты на Пути. Продолжай сидеть.",
    "sadhana.guide": "твой учитель",

    // ---- sangha ----
    "sangha.title": "Сангха",
    "sangha.satsang.desc": "Участники сидят вместе, затем задают вопросы. Записи попадают в библиотеку.",
    "sangha.telegram.after": ".",

    // ---- dāna / tiers ----
    "dana.interlude": "Эти медитации предлагаются свободно — в духе щедрости.",
    "dana.interlude.attrib": "— дāна, корень связанной жизни",
    "dana.member.thanks": "Все Пути открыты тебе. Спасибо, что держишь это место открытым для других.",
    "dana.paypal": "Поддержать через PayPal ↗",
    "dana.tier.seeker": "искатель",
    "dana.tier.seeker.1": "Первые врата каждого Пути — бесплатно навсегда",
    "dana.tier.seeker.2": "Сообщество, только чтение",
    "dana.tier.seeker.3": "Давай, только если это откликается",
    "dana.tier.seeker.cta": "Начать бесплатно",
    "dana.tier.student": "студент · toUnknown+",
    "dana.tier.student.1": "Все Пути, открываемые твоей практикой",
    "dana.tier.student.2": "Участие в Сангхе",
    "dana.tier.student.3": "Участие в Сангхе + ежемесячный сатсанг",
    "dana.tier.student.cta": "Стать студентом",
    "dana.tier.student.year": "или $88 в год — два месяца бесплатно",
    "dana.tier.sadhaka": "садхака · ведомый круг",
    "dana.tier.sadhaka.1": "Всё, что в «Студенте»",
    "dana.tier.sadhaka.2": "Место в первом ведомом круге — не более 30, когда он откроется",
    "dana.tier.sadhaka.3": "Ежемесячные живые встречи, когда круг начнёт работать",
    "dana.tier.sadhaka.4": "Твои размышления у врат читает учитель",
    "dana.tier.sadhaka.cta": "Войти в круг",
    "dana.tier.founding": "основатель",
    "dana.tier.founding.1": "Пожизненное участие уровня «Студент»",
    "dana.tier.founding.2": "Библиотека остаётся у тебя, что бы ни было дальше",
    "dana.tier.founding.cta": "Стать основателем",
    "dana.once": "разовая дāна",

    // ---- sādhana / profile ----
    "profile.signedin": "Вход выполнен",
    "profile.signin.title": "Войди, чтобы сохранить практику",
    "profile.signin.sub": "Без пароля — мы пришлём ссылку на почту.",
    "profile.sent": "Проверь почту — ссылка выполнит вход. ☸",
    "profile.error": "Не удалось отправить — попробуй через минуту.",
    "profile.send": "Прислать ссылку",
    "profile.minutes": "минут сидел",
    "profile.sittings": "практик",
    "profile.gates": "врат пройдено",
    "profile.onpath.b": "Ты на Пути.",
    "profile.onpath": "Продолжай сидеть.",
    "profile.guide": "твой учитель",
    "profile.questions": "вопросы",
    "profile.q1": "Что такое семья toUnknown?",
    "profile.a1": "«Щедрость — корень связанной жизни.» Сообщество существует благодаря добровольным дарам — цифровая Сангха, поддерживающая осознанную жизнь.",
    "profile.q2": "Можно практиковать, не платя?",
    "profile.a2": "Да. Первые врата каждого Пути бесплатны, и никому не отказывают из-за денег — напиши один честный абзац, чтобы попросить стипендию.",
    "profile.q3": "Как открываются Пути?",
    "profile.a3": "Практикой, а не оплатой. Каждая запись открывается после того, как ты просидел предыдущую, — так, как это устроено на настоящих ретритах и в живых традициях.",
    "profile.q4": "Санскрит, который мы используем",
    "profile.signout": "Выйти",

    // ---- dīkṣā gate ----
    "gate.eyebrow": "врата дīкṣā",
    "gate.title": "Прежде чем идти глубже — скажи, где ты.",
    "gate.blurb": "Что изменилось с тех пор, как ты начал сидеть? Что оказалось труднее, чем ты ожидал? Пиши просто — это читает учитель, а не оценивает машина.",
    "gate.placeholder": "Своими словами…",
    "gate.submit": "Пройти врата",
    "gate.later": "Пока нет",
    "gate.passed": "врата пройдены",

    // ---- common ----
    "common.free": "бесплатно",
    "common.signout": "Выйти",
    "common.close": "Закрыть",
    "common.terms": "Условия и приватность",
  };

  const DICT = { ru: RU };

  function T(key, fallback) {
    const d = DICT[LOCALE];
    if (d && d[key] != null) return d[key];
    return fallback != null ? fallback : key;
  }

  window.TU_LOCALE = LOCALE;
  window.TR = T;   // "T" is already the content alias inside the screens
  // routes should keep the visitor inside their language
  window.TU_BASE = LOCALE === "ru" ? "/ru" : "";
  document.documentElement.lang = LOCALE;
})();
