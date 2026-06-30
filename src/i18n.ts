export type Locale = "ru" | "en";

export type LegalSlug =
  | "privacy-policy"
  | "terms-of-service"
  | "aml-kyc-policy"
  | "cookie-policy";

export const locales: Locale[] = ["ru", "en"];

export const routePairs = {
  home: { ru: "/ru", en: "/" },
  checkout: { ru: "/ru/checkout", en: "/checkout" },
  privacy: { ru: "/ru/privacy-policy", en: "/privacy-policy" },
  terms: { ru: "/ru/terms-of-service", en: "/terms-of-service" },
  aml: { ru: "/ru/aml-kyc-policy", en: "/aml-kyc-policy" },
  cookies: { ru: "/ru/cookie-policy", en: "/cookie-policy" }
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
      subtitle: "Войдите в личный кабинет, чтобы управлять платежами, отслеживать операции и получать доступ к инструментам платформы.",
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
      secondary: "Перейти к оплате",
      trust: ["Платежный провайдер", "Дубай, ОАЭ", "Проверка бизнеса перед запуском"],
      flowTitle: "Платежный поток мерчанта",
      flowStatus: "защищено",
      flow: ["Заявка", "Проверка", "Интеграция", "Запуск"]
    },
    services: {
      eyebrow: "Услуги",
      title: "Платежные решения",
      text: "Все необходимые инструменты для приема платежей, выплат и автоматизации расчетов — с личным кабинетом, API и удобным управлением в одном интерфейсе.",
      items: [
        {
          title: "Прием платежей",
          text: "Принимайте платежи банковскими картами через надежную платежную инфраструктуру с быстрым подключением и технической поддержкой."
        },
        {
          title: "Оплата по QR-коду",
          text: "Принимайте оплату по QR-кодам для онлайн-сервисов, мобильных приложений и офлайн-бизнеса."
        },
        {
          title: "Массовые выплаты",
          text: "Автоматизируйте массовые выплаты партнерам, исполнителям и клиентам через единый платежный процесс."
        },
        {
          title: "Выставление счетов",
          text: "Создавайте и отправляйте счета юридическим лицам с прозрачным статусом оплаты и удобным управлением расчетами."
        }
      ]
    },
    api: {
      eyebrow: "Интеграция",
      title: "Удобное API для интеграции",
      text: "Подключайте платежную инфраструктуру через понятный API, управляйте операциями в личном кабинете и запускайте платежные сценарии без сложной интеграции.",
      points: [
        ["Быстрая интеграция", "Готовый API, подробная документация и понятный процесс подключения позволяют быстрее запустить прием платежей."],
        ["Личный кабинет", "Отслеживайте платежи, контролируйте статусы операций и управляйте сервисом в едином интерфейсе."],
        ["Документация", "Подробные инструкции, примеры запросов и технические материалы помогут быстро интегрировать платежные решения."],
        ["Техническая поддержка", "Наши специалисты сопровождают подключение и помогают решить технические вопросы на каждом этапе интеграции."]
      ],
      code: [
        "POST /payments/setup",
        "{",
        '  "service": "card_processing",',
        '  "merchant": "reviewed_business",',
        '  "mode": "production"',
        "}"
      ],
      status: "review_required"
    },
    industries: {
      eyebrow: "Для вашего бизнеса",
      title: "Решения для разных отраслей",
      items: [
        ["E-commerce", "Прием платежей для интернет-магазинов, маркетплейсов и онлайн-сервисов с быстрым checkout и понятным управлением операциями."],
        ["Розничная торговля", "Карточные, NFC и QR-платежи для офлайн-точек и гибридной торговли в рамках единой платежной инфраструктуры."],
        ["Рестораны и отели", "Оплата заказов, бронирований, проживания и дополнительных услуг через удобные сценарии для гостей и персонала."],
        ["Туризм и путешествия", "Платежи за бронирования, туры и сервисные сборы с поддержкой разных способов оплаты и международных клиентов."],
        ["Другие виды бизнеса", "Решения для подписочных сервисов, цифровых платформ, онлайн-школ и команд с массовыми выплатами."]
      ]
    },
    security: {
      eyebrow: "Безопасность и доверие",
      title: "Начните за несколько шагов",
      text: "Простой процесс подключения — от первой заявки до запуска платежной инфраструктуры.",
      items: [
        ["Заявка", "Оставьте заявку, и мы свяжемся с вами для обсуждения ваших задач."],
        ["Согласование", "Определяем условия сотрудничества, проверяем данные компании и согласовываем процесс подключения."],
        ["Интеграция", "Подключаем API, настраиваем необходимые сервисы и сопровождаем внедрение."],
        ["Запуск", "Проводим финальную проверку и запускаем платежную инфраструктуру в работу."]
      ]
    },
    pricing: {
      eyebrow: "Коммерческие условия",
      title: "Коммерческие условия рассчитываются индивидуально",
      text: "Стоимость зависит от параметров бизнеса, типа платежного сценария, географии и операционного профиля.",
      factors: ["Тип услуги", "Объем операций", "География", "Способы оплаты", "Риск-профиль бизнеса"]
    },
    start: {
      eyebrow: "",
      title: "Безопасность и доверие",
      text: "",
      steps: [
        ["ЗАЩИТА ДАННЫХ", "Безопасная обработка платежной информации, современные методы шифрования и многоуровневая система защиты помогают обеспечить высокий уровень безопасности данных."],
        ["AML И УПРАВЛЕНИЕ РИСКАМИ", "Встроенные AML-проверки и инструменты мониторинга операций помогают соблюдать требования комплаенса и минимизировать финансовые риски."],
        ["PCI DSS И МЕЖДУНАРОДНЫЕ СТАНДАРТЫ", "Платформа разрабатывается с учетом требований PCI DSS и международных стандартов безопасности платежной индустрии, обеспечивая надежную обработку платежных данных."],
        ["НАДЕЖНАЯ ИНФРАСТРУКТУРА", "Высокая отказоустойчивость, масштабируемая архитектура и постоянный мониторинг обеспечивают стабильную работу сервиса даже при высокой нагрузке."]
      ]
    },
    form: {
      eyebrow: "Форма заявки",
      title: "Давайте обсудим ваш проект",
      text: "Расскажите немного о вашем бизнесе, и мы подберем подходящее платежное решение, ответим на вопросы и поможем с подключением.",
      name: "Имя",
      email: "Бизнес-email",
      phone: "Телефон",
      website: "URL сайта",
      paymentMethods: {
        label: "Какие платежные методы вас интересуют?",
        options: ["Карточные платежи", "QR-платежи", "Массовые выплаты", "B2B-счета"]
      },
      businessType: {
        label: "Укажите тип вашего бизнеса",
        options: ["Retail", "E-commerce", "Подписочная модель", "Продажа цифровых товаров"],
        other: "Другое",
        otherPlaceholder: "Опишите тип бизнеса"
      },
      preferredContact: {
        label: "Какой способ связи для вас предпочтителен?",
        options: ["Email", "Телефон"]
      },
      message: "Комментарий",
      submit: "Отправить заявку",
      success: "Заявка принята. Мы свяжемся с вами, чтобы обсудить подключение и параметры платежного решения.",
      checkout: "Перейти к оплате"
    },
    checkout: {
      eyebrow: "Оплата",
      title: "Настройка платежа",
      text: "Проверьте параметры услуги и подтвердите платежные данные для продолжения оформления.",
      summary: "Настройка услуги",
      pricing: "Коммерческие условия фиксируются после проверки бизнеса и согласования платежного сценария.",
      warning: "Платежная форма защищена. Используйте только корректные платежные данные.",
      cardNumber: "Номер карты",
      expiry: "Срок действия",
      cvv: "CVV",
      cardholder: "Имя держателя",
      submit: "Продолжить оплату",
      error: "Не удалось подтвердить платежные данные. Проверьте введенную информацию или свяжитесь с поддержкой."
    },
    footer: {
      company: "Компания: PAYWAYS INTERNATIONAL – FZCO",
      activity: "Вид деятельности: Payment Services Provider",
      registration: "Registration Number: 79223",
      license: "License Number: 85975",
      address: "Юридический адрес: Dubai Silicon Oasis, Dubai, UAE",
      supportLabel: "Контакты поддержки:",
      sitemap: "Карта сайта",
      methods: "Платежные методы",
      badges: ["Visa", "Mastercard", "Мир", "Apple Pay", "Google Pay", "PCI DSS"],
      legal: ["Политика конфиденциальности", "Terms of Service", "AML/KYC Policy", "Cookie Policy"]
    },
    legal: {
      "privacy-policy": {
        title: "Политика конфиденциальности",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта политика объясняет, как PAYWAYS INTERNATIONAL - FZCO обращается с информацией на корпоративном сайте.",
        sections: [
          ["Область действия", "Сайт содержит информацию о компании, описания услуг, форму заявки, вход в личный кабинет и платежную страницу."],
          ["Какие данные могут быть получены", "Если вы используете форму заявки, сайт может получить имя, бизнес-email, телефон, URL сайта и сообщение, которое вы отправляете."],
          ["Использование информации", "Информация из заявки может использоваться для рассмотрения потенциального бизнес-запроса, связи с заявителем и понимания платежного сценария."],
          ["Защита данных", "Сайт должен собирать только информацию, относящуюся к бизнес-коммуникации. Посетителям не следует отправлять чувствительные платежные данные вне защищенных платежных форм."],
          ["Контакты", "По вопросам приватности используйте форму заявки или контакты поддержки, указанные в футере сайта."]
        ]
      },
      "terms-of-service": {
        title: "Условия сервиса",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эти условия описывают использование корпоративного сайта PAYWAYS и его сервисных интерфейсов.",
        sections: [
          ["Назначение сайта", "Сайт предоставляет общую информацию о PAYWAYS INTERNATIONAL - FZCO и категориях платежных услуг. Он не является обязательной коммерческой офертой."],
          ["Сервисные интерфейсы", "Страницы входа, заявки и оплаты предназначены для взаимодействия с сервисом и обработки запросов в рамках платежного сценария."],
          ["Коммерческие условия", "Стоимость и коммерческие условия подтверждаются только после business review и прямой коммуникации. На сайте не указаны проценты или фиксированные комиссии, если они не были отдельно утверждены компанией."],
          ["Ответственность пользователя", "Пользователь отвечает за корректность предоставляемых данных и не должен передавать конфиденциальные сведения через незащищенные каналы."],
          ["Изменения", "PAYWAYS может обновлять контент сайта, legal pages и сервисные сценарии по мере развития операционной модели и контактов."]
        ]
      },
      "aml-kyc-policy": {
        title: "AML/KYC Policy",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта страница кратко описывает AML/KYC-принципы, отраженные в корпоративном сайте.",
        sections: [
          ["Назначение", "PAYWAYS применяет процедуры AML/KYC при рассмотрении бизнес-клиентов, партнеров и платежных сценариев."],
          ["Проверка бизнеса", "Потенциальных клиентов и партнеров могут попросить предоставить информацию, необходимую для понимания структуры владения, деятельности, риск-профиля и операционной модели."],
          ["Оценка запроса", "Заявки и сервисные запросы рассматриваются с учетом данных компании, сайта, географии операций, модели расчетов и применимых требований."],
          ["Подход к мониторингу", "Платежная активность может анализироваться в соответствии с согласованными операционными, compliance и risk-процедурами."],
          ["Ограничения", "PAYWAYS может отказать в подключении или обслуживании, если бизнес-модель, документы или платежный сценарий не соответствуют внутренним требованиям и применимым правилам."]
        ]
      },
      "cookie-policy": {
        title: "Cookie Policy",
        updated: "Обновлено: 25 июня 2026",
        intro: "Эта Cookie Policy описывает предполагаемый подход к cookie на корпоративном сайте.",
        sections: [
          ["Технические cookie", "Сайт может использовать технические cookie и аналогичное хранение для работы интерфейса, языковых настроек, безопасности и корректной обработки форм."],
          ["Функциональные настройки", "Такие данные помогают сохранять предпочтения пользователя и поддерживать стабильную работу страниц входа, заявки и оплаты."],
          ["Аналитика", "Аналитические инструменты могут использоваться для оценки качества сайта и улучшения пользовательского опыта с учетом применимых требований к согласию."],
          ["Управление cookie", "Пользователь может ограничить cookie в настройках браузера, однако отдельные функции сайта могут работать менее стабильно."],
          ["Обновления", "PAYWAYS может обновлять эту политику при изменении состава cookie, аналитических инструментов или требований регулирования."]
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
      subtitle: "Sign in to your account to manage payments, track operations and access platform tools.",
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
      secondary: "Proceed to checkout",
      trust: ["Payment Services Provider", "Dubai, UAE", "Business review before launch"],
      flowTitle: "Merchant payment flow",
      flowStatus: "secure",
      flow: ["Application", "Review", "Integration", "Launch"]
    },
    services: {
      eyebrow: "Our Services",
      title: "Payment solutions for international businesses",
      text: "All the tools needed for payment acceptance, payouts and settlement automation, with an account dashboard, API and convenient management in one interface.",
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
      eyebrow: "Integration",
      title: "Developer-Friendly API",
      text: "Connect payment infrastructure through a clear API, manage operations in the dashboard and launch payment scenarios without a complex integration process.",
      points: [
        ["Fast integration", "A ready API, detailed documentation and a clear onboarding process help launch payment acceptance faster."],
        ["Dashboard", "Track payments, control operation statuses and manage the service in a single interface."],
        ["Documentation", "Detailed guides, request examples and technical materials help teams integrate payment solutions quickly."],
        ["Technical support", "Our specialists support onboarding and help resolve technical questions at every integration stage."]
      ],
      code: [
        "POST /payments/setup",
        "{",
        '  "service": "card_processing",',
        '  "merchant": "reviewed_business",',
        '  "mode": "production"',
        "}"
      ],
      status: "review_required"
    },
    industries: {
      eyebrow: "Solutions by Industry",
      title: "Payment scenarios for different sales models",
      items: [
        ["E-commerce", "Payment acceptance for online stores, marketplaces and digital services with smooth checkout and clear transaction management."],
        ["Retail", "Card, NFC and QR payments for physical locations and hybrid commerce through one payment infrastructure."],
        ["Restaurants & Hotels", "Payment scenarios for orders, bookings, stays and guest services, built for efficient daily operations."],
        ["Travel", "Payments for bookings, tours and service fees with multiple payment methods for local and international clients."],
        ["Other Types of Business", "Payment solutions for subscription services, digital platforms, online schools and teams managing mass payouts."]
      ]
    },
    security: {
      eyebrow: "Security & Trust",
      title: "Start in a few steps",
      text: "A clear onboarding process from the first application to launching payment infrastructure.",
      items: [
        ["Application", "Submit an application and we will contact you to discuss your goals."],
        ["Agreement", "We define cooperation terms, review company data and agree on the onboarding process."],
        ["Integration", "We connect the API, configure the required services and support implementation."],
        ["Launch", "We run the final check and launch the payment infrastructure."]
      ]
    },
    pricing: {
      eyebrow: "Commercial Terms",
      title: "Commercial terms are tailored to each business",
      text: "Pricing depends on the business profile, payment scenario, geography, transaction volume and operating requirements.",
      factors: ["Service type", "Transaction volume", "Geography", "Payment methods", "Business risk profile"]
    },
    start: {
      eyebrow: "",
      title: "Security & Trust",
      text: "",
      steps: [
        ["DATA PROTECTION", "Secure processing of payment information, modern encryption methods and multi-layer protection help maintain a high level of data security."],
        ["AML & RISK MANAGEMENT", "Built-in AML checks and transaction monitoring tools help support compliance requirements and reduce financial risk."],
        ["PCI DSS & INTERNATIONAL STANDARDS", "The platform is developed with PCI DSS requirements and international payment security standards in mind, supporting reliable handling of payment data."],
        ["RELIABLE INFRASTRUCTURE", "High fault tolerance, scalable architecture and continuous monitoring help keep the service stable even under heavy load."]
      ]
    },
    form: {
      eyebrow: "Application Form",
      title: "Let’s discuss your project",
      text: "Tell us a little about your business, and we will suggest a suitable payment solution, answer questions and help with onboarding.",
      name: "Name",
      email: "Business Email",
      phone: "Phone",
      website: "Website URL",
      paymentMethods: {
        label: "Which payment methods are you interested in?",
        options: ["Card Processing", "QR Payments", "Mass Payouts", "B2B Invoicing"]
      },
      businessType: {
        label: "Select your business type",
        options: ["Retail", "E-commerce", "Subscription model", "Digital goods"],
        other: "Other",
        otherPlaceholder: "Describe your business type"
      },
      preferredContact: {
        label: "Preferred contact method",
        options: ["Email", "Phone"]
      },
      message: "Comment",
      submit: "Submit application",
      success: "The application has been received. We will contact you to discuss onboarding and payment solution parameters.",
      checkout: "Proceed to checkout"
    },
    checkout: {
      eyebrow: "Checkout",
      title: "Payment setup",
      text: "Review the service parameters and confirm payment details to continue the setup process.",
      summary: "Service setup",
      pricing: "Commercial terms are finalized after business review and payment scenario approval.",
      warning: "Secure payment form. Use only valid payment details.",
      cardNumber: "Card number",
      expiry: "Expiry date",
      cvv: "CVV",
      cardholder: "Cardholder name",
      submit: "Continue payment",
      error: "Payment details could not be confirmed. Check the information provided or contact support."
    },
    footer: {
      company: "Company: PAYWAYS INTERNATIONAL – FZCO",
      activity: "Activity: Payment Services Provider",
      registration: "Registration Number: 79223",
      license: "License Number: 85975",
      address: "Legal address: Dubai Silicon Oasis, Dubai, UAE",
      supportLabel: "Support contacts:",
      sitemap: "Sitemap",
      methods: "Payment methods",
      badges: ["Visa", "Mastercard", "Mir", "Apple Pay", "Google Pay", "PCI DSS"],
      legal: ["Privacy Policy", "Terms of Service", "AML/KYC Policy", "Cookie Policy"]
    },
    legal: {
      "privacy-policy": {
        title: "Privacy Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This Privacy Policy explains how PAYWAYS INTERNATIONAL - FZCO handles information on this corporate website.",
        sections: [
          ["Scope", "The website presents company information, service descriptions, an application form, business login and checkout page."],
          ["Information we may receive", "If you use the application form, we may receive the name, business email, phone number, website URL and message you choose to submit."],
          ["Use of information", "Application information may be used to review a potential business request, contact the requester and understand the payment scenario."],
          ["Data protection", "The site should collect only information relevant to business communication. Visitors should not send sensitive payment data outside protected payment forms."],
          ["Contact", "For privacy questions, use the application form or support contacts listed in the footer."]
        ]
      },
      "terms-of-service": {
        title: "Terms of Service",
        updated: "Last updated: June 25, 2026",
        intro: "These Terms describe the use of the PAYWAYS corporate website and its service interfaces.",
        sections: [
          ["Website purpose", "The website provides general information about PAYWAYS INTERNATIONAL - FZCO and its payment service categories. It is not a binding commercial offer."],
          ["Service interfaces", "The login, application and checkout pages are intended for interaction with the service and processing of requests within a payment scenario."],
          ["Commercial terms", "Pricing and commercial terms are confirmed only after business review and direct communication. No percentages or fixed fees are stated on this website unless later approved by the company."],
          ["User responsibility", "Users are responsible for the accuracy of submitted information and should not send confidential details through unprotected channels."],
          ["Changes", "PAYWAYS may update website content, legal pages and service scenarios as the operating model and contacts evolve."]
        ]
      },
      "aml-kyc-policy": {
        title: "AML/KYC Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This page summarizes the AML/KYC-oriented principles reflected by the corporate website.",
        sections: [
          ["Purpose", "PAYWAYS applies AML/KYC procedures when reviewing business clients, partners and payment scenarios."],
          ["Business review", "Potential clients and partners may be asked to provide information needed to understand ownership, activity, risk profile and operational model."],
          ["Request assessment", "Applications and service requests are reviewed based on company data, website information, operating geography, settlement model and applicable requirements."],
          ["Monitoring approach", "Payment activity may be reviewed according to agreed operational, compliance and risk procedures."],
          ["Restrictions", "PAYWAYS may decline onboarding or service access when the business model, documents or payment scenario do not meet internal requirements or applicable rules."]
        ]
      },
      "cookie-policy": {
        title: "Cookie Policy",
        updated: "Last updated: June 25, 2026",
        intro: "This Cookie Policy describes the intended cookie approach for this corporate website.",
        sections: [
          ["Technical cookies", "The website may use technical cookies and similar storage for interface operation, language preferences, security and form processing."],
          ["Functional settings", "These data help preserve user preferences and support stable operation of login, application and checkout pages."],
          ["Analytics", "Analytics tools may be used to evaluate website quality and improve user experience in line with applicable consent requirements."],
          ["Cookie controls", "Users may restrict cookies in browser settings, although some website functions may become less stable."],
          ["Updates", "PAYWAYS may update this policy when cookie categories, analytics tools or regulatory requirements change."]
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
  return locale === "ru" ? "/ru" : "";
}
