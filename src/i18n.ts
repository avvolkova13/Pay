export type Locale = "ru" | "en";

export type LegalSlug =
  | "privacy-policy"
  | "terms-of-service"
  | "aml-kyc-policy"
  | "cookie-policy";

export const locales: Locale[] = ["ru", "en"];

export const routePairs = {
  home: { ru: "/", en: "/en" },
  checkout: { ru: "/checkout-demo", en: "/en/checkout-demo" },
  privacy: { ru: "/privacy-policy", en: "/en/privacy-policy" },
  terms: { ru: "/terms-of-service", en: "/en/terms-of-service" },
  aml: { ru: "/aml-kyc-policy", en: "/en/aml-kyc-policy" },
  cookies: { ru: "/cookie-policy", en: "/en/cookie-policy" }
} as const satisfies Record<string, Record<Locale, string>>;

export function alternateLocale(locale: Locale) {
  return locale === "ru" ? "en" : "ru";
}

export function switchHref(routeKey: keyof typeof routePairs, locale: Locale) {
  return routePairs[routeKey][alternateLocale(locale)];
}

export const dictionaries = {
  ru: {
    localeName: "RU",
    alternateName: "EN",
    nav: {
      services: "Услуги",
      api: "API",
      industries: "Отрасли",
      security: "Безопасность",
      pricing: "Условия",
      start: "Подключение",
      contact: "Заявка",
      login: "Вход",
      menu: "Меню",
      close: "Закрыть"
    },
    login: {
      title: "Вход для бизнеса",
      subtitle: "Демо-форма. Реальный личный кабинет в этой версии сайта не подключен.",
      email: "Email",
      password: "Пароль",
      submit: "Войти",
      error: "Ошибка в логине или пароле"
    },
    hero: {
      eyebrow: "PAYWAYS INTERNATIONAL - FZCO",
      title: "Принимайте платежи по всему миру",
      text: "Подключайте карточные платежи, QR-оплату, массовые выплаты и B2B-инвойсы через единую платформу. Безопасная инфраструктура, удобная интеграция и сопровождение на каждом этапе подключения.",
      primary: "Начать сотрудничество",
      secondary: "Посмотреть демо-оплату",
      trust: ["Платежный провайдер", "Дубай, ОАЭ", "Проверка бизнеса перед запуском"],
      flowTitle: "Платежный поток мерчанта",
      flow: ["Заявка", "Проверка", "Интеграция", "Запуск"]
    },
    services: {
      eyebrow: "Услуги",
      title: "Не набор карточек, а операционный слой платежей",
      text: "Каждая услуга собирается вокруг бизнес-сценария: как клиент платит, как деньги проходят проверку, как команда видит статусы и как запуск масштабируется.",
      items: [
        {
          title: "Процессинг карт",
          text: "Прием карточных платежей для онлайн-бизнеса с понятным процессом подключения и сопровождения."
        },
        {
          title: "QR-платежи",
          text: "Платежи по QR-сценарию для быстрых оплат, мобильных потоков и точек продаж."
        },
        {
          title: "Массовые выплаты",
          text: "Организация массовых выплат партнерам, исполнителям или клиентам по согласованной операционной модели."
        },
        {
          title: "B2B-счета",
          text: "Выставление счетов для B2B-клиентов с прозрачным статусом согласования и оплаты."
        }
      ]
    },
    api: {
      eyebrow: "API для разработчиков",
      title: "Интеграция должна быть понятной для бизнеса и разработчиков",
      text: "Показываем будущую рабочую модель: запрос, проверка, платежное событие и статус в кабинете. Это демонстрационная схема без реальных API-вызовов.",
      points: ["Быстрый старт интеграции", "Понятная документация", "Бизнес-кабинет", "События и статусы"],
      code: [
        "POST /payments/setup",
        "{",
        '  "service": "card_processing",',
        '  "merchant": "reviewed_business",',
        '  "mode": "demo"',
        "}"
      ],
      status: "review_required"
    },
    industries: {
      eyebrow: "Решения по отраслям",
      title: "Сценарии под разные модели продаж",
      items: [
        ["Интернет-торговля", "Карточные платежи, сценарий оплаты и понятное подключение интернет-магазинов."],
        ["Ритейл", "QR-сценарии и платежные процессы для физических точек и гибридной торговли."],
        ["Онлайн-образование", "Оплата курсов, подписок, интенсивов и образовательных пакетов."],
        ["Путешествия", "Платежи для бронирований, агентских моделей и сервисных сборов."],
        ["Финтех", "Платежные сценарии для цифровых финансовых продуктов после проверки модели."],
        ["Подписочные сервисы", "Регулярные коммерческие отношения без публикации неподтвержденных тарифов."]
      ]
    },
    security: {
      eyebrow: "Безопасность и доверие",
      title: "Доверие строится на проверках, прозрачности и аккуратных процессах",
      items: [
        ["Защита данных", "Формы сайта собирают только данные, необходимые для обработки заявки."],
        ["Проверка клиентов и партнеров", "Подключение предполагает проверку бизнес-модели, сайта и операционного профиля."],
        ["Границы демо-режима", "Вход и оплата на сайте являются демонстрационными и не обрабатывают реальные платежи."],
        ["Международные практики", "Коммуникация и процессы ориентированы на международные практики платежного бизнеса."]
      ]
    },
    pricing: {
      eyebrow: "Коммерческие условия",
      title: "Стоимость подтверждается после проверки, а не угадывается на лендинге",
      text: "Мы не публикуем выдуманные проценты или фиксированные тарифы. Коммерческие условия зависят от параметров бизнеса.",
      factors: ["Тип услуги", "Объем операций", "География", "Способы оплаты", "Риск-профиль бизнеса"]
    },
    start: {
      eyebrow: "Подключение",
      title: "Подключение как управляемый процесс",
      steps: [
        ["Заявка", "Вы оставляете базовую информацию о компании и сценарии."],
        ["Согласование", "Команда уточняет модель, географию и требования."],
        ["Интеграция", "Согласованный сценарий переводится в техническую настройку."],
        ["Запуск", "После проверки процесс переводится в рабочую операционную модель."]
      ]
    },
    form: {
      eyebrow: "Форма заявки",
      title: "Расскажите о платежном сценарии",
      name: "Имя",
      email: "Бизнес-email",
      phone: "Телефон",
      website: "URL сайта",
      message: "Сообщение",
      submit: "Отправить заявку",
      success: "Заявка принята в демо-режиме без отправки на сервер. Для тестового сценария можно перейти к демо-оплате.",
      checkout: "Перейти на демо-оплату"
    },
    checkout: {
      eyebrow: "Демо-оплата",
      title: "Демо-страница оплаты",
      text: "Эта страница показывает тестовый путь после заявки: описание услуги, условия-заглушку и форму карты без реальной обработки.",
      summary: "Настройка услуги",
      pricing: "Финальные условия будут подтверждены после проверки.",
      warning: "Демо-форма. Не вводите реальные платежные данные.",
      cardNumber: "Номер карты",
      expiry: "Срок действия",
      cvv: "CVV",
      cardholder: "Имя держателя",
      submit: "Запустить демо-проверку",
      error: "Платежный сервис временно недоступен. Попробуйте позже или свяжитесь с поддержкой."
    },
    footer: {
      activity: "Деятельность: платежный провайдер",
      registration: "Регистрационный номер: будет подтвержден",
      license: "Лицензионные данные: будут подтверждены",
      address: "Dubai Silicon Oasis, Dubai, UAE",
      support: "Контакт поддержки: будет подтвержден",
      sitemap: "Карта сайта",
      methods: "Категории платежных методов",
      badges: ["Карты", "QR", "Выплаты", "Счета"],
      legal: ["Политика конфиденциальности", "Условия сервиса", "AML/KYC Policy", "Cookie Policy"]
    },
    legal: {
      "privacy-policy": {
        title: "Политика конфиденциальности",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта политика объясняет, как PAYWAYS INTERNATIONAL - FZCO обращается с информацией на корпоративном сайте.",
        sections: [
          ["Область действия", "Сайт содержит информацию о компании, описания услуг, демо-вход, форму заявки и демо-оплату. Он не предоставляет реальный личный кабинет и не обрабатывает реальные платежи."],
          ["Какие данные могут быть получены", "Если вы используете форму заявки, сайт может получить имя, бизнес-email, телефон, URL сайта и сообщение, которое вы отправляете. Демо-вход и демо-оплата предназначены только для демонстрации интерфейса."],
          ["Использование информации", "Информация из заявки может использоваться для рассмотрения потенциального бизнес-запроса, связи с заявителем и понимания платежного сценария. Демо-оплата не отправляет карточные данные в платежный шлюз."],
          ["Защита данных", "Сайт должен собирать только информацию, относящуюся к бизнес-коммуникации. Посетителям не следует вводить чувствительные платежные данные в demo-формы."],
          ["Контакты", "По вопросам приватности используйте контакт поддержки после его финального подтверждения компанией."]
        ]
      },
      "terms-of-service": {
        title: "Условия сервиса",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эти условия описывают использование корпоративного сайта PAYWAYS и его демонстрационных интерфейсов.",
        sections: [
          ["Назначение сайта", "Сайт предоставляет общую информацию о PAYWAYS INTERNATIONAL - FZCO и категориях платежных услуг. Он не является обязательной коммерческой офертой."],
          ["Демо-функциональность", "Страницы входа и оплаты являются демонстрационными интерфейсами. Они не создают аккаунты, не аутентифицируют пользователей, не инициируют реальные платежи и не подключаются к реальному платежному шлюзу."],
          ["Коммерческие условия", "Стоимость и коммерческие условия подтверждаются только после business review и прямой коммуникации. На сайте не указаны проценты или фиксированные комиссии, если они не были отдельно утверждены компанией."],
          ["Ответственность пользователя", "Посетителям нельзя вводить реальные карточные данные, реальные пароли от аккаунтов или конфиденциальные платежные учетные данные в demo-формы."],
          ["Изменения", "PAYWAYS может обновлять контент сайта, legal pages и demo-поведение по мере подтверждения финальной операционной модели и контактов."]
        ]
      },
      "aml-kyc-policy": {
        title: "AML/KYC Policy",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта страница кратко описывает AML/KYC-принципы, отраженные в корпоративном сайте.",
        sections: [
          ["Назначение", "PAYWAYS описывает категории платежных услуг для бизнеса. Любое реальное подключение потребовало бы проверки бизнеса, сайта, географии и платежного сценария."],
          ["Проверка бизнеса", "Потенциальных клиентов и партнеров могут попросить предоставить информацию, необходимую для понимания структуры владения, деятельности, риск-профиля и операционной модели."],
          ["Ограниченное использование", "Сайт не одобряет клиентов автоматически и не активирует реальную обработку платежей через форму заявки."],
          ["Подход к мониторингу", "Если применимо в реальном сервисном контексте, платежная активность может проверяться согласно согласованным операционным, compliance и risk-процедурам."],
          ["Без неподтвержденных заявлений", "Эта страница не заявляет о неподтвержденных сертификатах, разрешениях или live processing возможностях сверх данных компании, указанных в footer."]
        ]
      },
      "cookie-policy": {
        title: "Cookie Policy",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта Cookie Policy описывает предполагаемый подход к cookie на корпоративном сайте.",
        sections: [
          ["Текущий сайт", "Текущий demo-сайт не требует cookie для реальной обработки платежей или доступа к аккаунту."],
          ["Возможное техническое хранение", "Если техническое хранение будет использовано позже, оно должно поддерживать базовые функции сайта: языковые предпочтения, безопасность или удобство форм."],
          ["Аналитика", "Аналитика или маркетинговые инструменты не должны добавляться без обновления этой политики и механики согласия там, где это требуется."],
          ["Демо-формы", "Демо-вход, форма заявки и демо-оплата могут работать локально в браузере и не должны зависеть от сторонних платежных cookie."],
          ["Обновления", "Эта политика должна быть пересмотрена после подтверждения финальных инструментов, аналитики или решений по управлению согласием."]
        ]
      }
    }
  },
  en: {
    localeName: "EN",
    alternateName: "RU",
    nav: {
      services: "Services",
      api: "API",
      industries: "Industries",
      security: "Security",
      pricing: "Terms",
      start: "Start",
      contact: "Apply",
      login: "Login",
      menu: "Menu",
      close: "Close"
    },
    login: {
      title: "Business login",
      subtitle: "Demo form. A real business cabinet is not connected in this website version.",
      email: "Email",
      password: "Password",
      submit: "Sign in",
      error: "Invalid login or password"
    },
    hero: {
      eyebrow: "PAYWAYS INTERNATIONAL - FZCO",
      title: "Payment infrastructure for international business",
      text: "PAYWAYS helps companies accept card and QR payments, launch mass payouts, issue B2B invoices and move through onboarding with clear technical support.",
      primary: "Submit application",
      secondary: "View demo checkout",
      trust: ["Payment Services Provider", "Dubai, UAE", "Business review before launch"],
      flowTitle: "Merchant payment flow",
      flow: ["Application", "Review", "Integration", "Launch"]
    },
    services: {
      eyebrow: "Our Services",
      title: "Not a card grid, but an operating layer for payments",
      text: "Each service is built around a business scenario: how the customer pays, how the flow is reviewed, how teams see statuses and how launch can scale.",
      items: [
        {
          title: "Card Processing",
          text: "Card payment acceptance for online businesses with a clear onboarding and support process."
        },
        {
          title: "QR Payments",
          text: "QR-based payment scenarios for fast checkout, mobile flows and points of sale."
        },
        {
          title: "Mass Payouts",
          text: "Organized payout flows for partners, contractors or customers under an agreed operational model."
        },
        {
          title: "B2B Invoicing",
          text: "Invoice flows for B2B clients with transparent approval and payment status."
        }
      ]
    },
    api: {
      eyebrow: "Developer-Friendly API",
      title: "Integration should be clear for business and engineering",
      text: "The section shows the intended working model: request, review, payment event and business dashboard status. This is a demo scheme without real API calls.",
      points: ["Fast integration start", "Clear documentation", "Business dashboard", "Events and statuses"],
      code: [
        "POST /payments/setup",
        "{",
        '  "service": "card_processing",',
        '  "merchant": "reviewed_business",',
        '  "mode": "demo"',
        "}"
      ],
      status: "review_required"
    },
    industries: {
      eyebrow: "Solutions by Industry",
      title: "Payment scenarios for different sales models",
      items: [
        ["E-commerce", "Card payments, checkout flow and clear onboarding for online stores."],
        ["Retail", "QR scenarios and payment operations for physical and hybrid commerce."],
        ["Online Education", "Payments for courses, subscriptions, intensives and education packages."],
        ["Travel", "Payment flows for bookings, agency models and service fees."],
        ["Fintech", "Payment scenarios for digital finance products after model review."],
        ["Subscription Services", "Recurring commercial relationships without publishing unconfirmed tariffs."]
      ]
    },
    security: {
      eyebrow: "Security & Trust",
      title: "Trust is built through review, transparency and careful processes",
      items: [
        ["Data protection", "Website forms collect only the information needed to review an application."],
        ["Client and partner review", "Onboarding assumes review of the business model, website and operational profile."],
        ["Demo boundaries", "Login and checkout on this website are demo interfaces and do not process real payments."],
        ["International practices", "Communication and processes are oriented toward international payment business practices."]
      ]
    },
    pricing: {
      eyebrow: "Commercial Terms",
      title: "Pricing is confirmed after review, not guessed on a landing page",
      text: "We do not publish invented percentages or fixed tariffs. Commercial terms depend on business parameters.",
      factors: ["Service type", "Transaction volume", "Geography", "Payment methods", "Business risk profile"]
    },
    start: {
      eyebrow: "Getting Started",
      title: "Onboarding as a controlled pipeline",
      steps: [
        ["Application", "You share basic company and payment scenario details."],
        ["Review", "The team clarifies the model, geography and requirements."],
        ["Integration", "The agreed scenario moves into technical setup."],
        ["Launch", "After review, the process moves into the working operational model."]
      ]
    },
    form: {
      eyebrow: "Application Form",
      title: "Tell us about the payment scenario",
      name: "Name",
      email: "Business Email",
      phone: "Phone",
      website: "Website URL",
      message: "Message",
      submit: "Submit application",
      success: "The application was accepted in demo mode without server submission. For the test scenario, you can continue to checkout demo.",
      checkout: "Go to checkout demo"
    },
    checkout: {
      eyebrow: "Checkout Demo",
      title: "Demo payment setup",
      text: "This page shows the test path after application: service summary, commercial placeholder and card form without real processing.",
      summary: "Service setup",
      pricing: "Final pricing will be confirmed after review.",
      warning: "Sandbox form with masked demo values. Do not enter real payment data.",
      cardNumber: "Card number",
      expiry: "Expiry date",
      cvv: "CVV",
      cardholder: "Cardholder name",
      submit: "Run demo validation",
      error: "Payment service is temporarily unavailable. Please try again later or contact support."
    },
    footer: {
      activity: "Activity: Payment Services Provider",
      registration: "Registration number: to be confirmed",
      license: "License details: to be confirmed",
      address: "Dubai Silicon Oasis, Dubai, UAE",
      support: "Support contact: to be confirmed",
      sitemap: "Sitemap",
      methods: "Payment method categories",
      badges: ["Cards", "QR", "Payouts", "Invoices"],
      legal: ["Privacy Policy", "Terms of Service", "AML/KYC Policy", "Cookie Policy"]
    },
    legal: {
      "privacy-policy": {
        title: "Privacy Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This Privacy Policy explains how PAYWAYS INTERNATIONAL - FZCO handles information on this corporate website.",
        sections: [
          ["Scope", "The website presents company information, service descriptions, a demo login, an application form and a demo checkout page. It does not provide a real personal account and does not process real payments."],
          ["Information we may receive", "If you use the application form, we may receive the name, business email, phone number, website URL and message you choose to submit. Demo login and demo checkout forms are designed to show interface behavior and should not be used for real credentials or card data."],
          ["Use of information", "Application information may be used to review a potential business request, contact the requester and understand the payment scenario. The demo checkout does not send card data to a payment gateway."],
          ["Data protection", "The site should collect only information relevant to business communication. Visitors should not enter sensitive payment data into demo forms."],
          ["Contact", "For privacy questions, use the support contact after the company confirms final contact details."]
        ]
      },
      "terms-of-service": {
        title: "Terms of Service",
        updated: "Last updated: June 25, 2026",
        intro: "These Terms describe the use of the PAYWAYS corporate website and its demo interfaces.",
        sections: [
          ["Website purpose", "The website provides general information about PAYWAYS INTERNATIONAL - FZCO and its payment service categories. It is not a binding commercial offer."],
          ["Demo functionality", "The login and checkout pages are demonstration interfaces. They do not create accounts, authenticate users, initiate real payments or connect to a live payment gateway."],
          ["Commercial terms", "Pricing and commercial terms are confirmed only after business review and direct communication. No percentages or fixed fees are stated on this website unless later approved by the company."],
          ["User responsibility", "Visitors must not enter real card data, real account passwords or confidential payment credentials into demo forms."],
          ["Changes", "PAYWAYS may update website content, legal pages and demo behavior as the final operating model and contacts are confirmed."]
        ]
      },
      "aml-kyc-policy": {
        title: "AML/KYC Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This page summarizes the AML/KYC-oriented principles reflected by the corporate website.",
        sections: [
          ["Purpose", "PAYWAYS describes payment service categories for businesses. Any real onboarding would require review of the business, its website, geography and payment scenario."],
          ["Business review", "Potential clients and partners may be asked to provide information needed to understand ownership, activity, risk profile and operational model."],
          ["Restricted use", "The website does not approve merchants automatically and does not activate live payment processing through the application form."],
          ["Monitoring approach", "Where applicable in a real service context, payment activity may be reviewed according to agreed operational, compliance and risk procedures."],
          ["No certification claim", "This page does not claim any unverified certificate, regulatory permission or live processing capability beyond the company details displayed in the footer."]
        ]
      },
      "cookie-policy": {
        title: "Cookie Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This Cookie Policy describes the intended cookie approach for this corporate website.",
        sections: [
          ["Current website", "The current demo website does not require cookies for real payment processing or account access."],
          ["Possible essential storage", "If technical storage is later used, it should support basic website functions such as language preference, security or form experience."],
          ["Analytics", "Analytics or marketing tools should not be added without updating this policy and the consent experience where required."],
          ["Demo forms", "Demo login, application and checkout interactions can work locally in the browser and should not rely on third-party payment cookies."],
          ["Updates", "This policy should be revised when final tooling, analytics or consent management decisions are confirmed."]
        ]
      }
    }
  }
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function localePrefix(locale: Locale) {
  return locale === "en" ? "/en" : "";
}
