(function(){
  "use strict";

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Modo claro / escuro ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  function getStoredTheme(){
    try { return localStorage.getItem('site-theme'); } catch(e) { return null; }
  }
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('site-theme', theme); } catch(e) {}
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  var initialTheme = getStoredTheme() || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initialTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', function(){
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Dicionário PT / ES ---------- */
  var dict = {
    pt: {
      "skip": "Ir para contacto",
      "nav.sobre": "Sobre",
      "nav.servicos": "Serviços &amp; Preços",
      "nav.casos": "Casos de Estudo",
      "nav.percurso": "Percurso",
      "nav.galeria": "Galeria",
      "nav.contacto": "Contacto",
      "nav.cta": "Falar comigo",

      "hero.eyebrow": "Chef · Alto Alentejo",
      "hero.title": "Chef consultor para cozinhas que funcionam todos os dias",
      "hero.role": "Bruno Miguel Vieira Leal — Chef, Chef Consultor e Cozinheiro",
      "hero.tagline": "Conceito, ementas, fichas técnicas e equipa para restaurantes, cafés e eventos no Alto Alentejo e em Badajoz — pensados para o serviço de todos os dias, não só para o dia da abertura.",
      "hero.stat1": "anos em cozinha profissional",
      "hero.stat2": "de desperdício com controlo de stock (Raya)",
      "hero.stat3": "atendimento nas duas línguas",
      "hero.ctaPrimary": "Ver Serviços &amp; Preços",
      "hero.ctaSecondary": "Ver Casos de Estudo",
      "hero.photoLabel": "FOTO A SUBSTITUIR<br>Retrato do chef / prato de assinatura",

      "sobre.eyebrow": "Sobre mim",
      "sobre.photoLabel": "FOTO A SUBSTITUIR<br>Chef em trabalho de cozinha",
      "sobre.title": "Do Chiado ao Alto Alentejo, sem perder a raiz.",
      "sobre.p1": "Mais de 15 anos de experiência em cozinha profissional — da fronteira com Espanha a Lisboa (Sea Me, Valverde Boutique Hotel) — até liderar cozinhas no Alto Alentejo, incluindo o Raya Restaurante (Grupo Terramay), na Praia Fluvial de Azenhas del Rei, e por último, o Massa Fina, do Grupo Vila Galé, em Elvas.",
      "sobre.p2": "Hoje trabalho lado a lado com donos de restaurantes, cafés e promotores de eventos: desenvolvimento de conceito, criação de menus e fichas técnicas, gestão de custos e implementação de operações de cozinha.",
      "sobre.p3": "<strong>O que me distingue:</strong> o rigor técnico de cozinhas de alto padrão aplicado à identidade e aos produtos do Alentejo — não um conceito genérico importado, mas algo que nasce do território.",
      "sobre.p4": "Esse know-how está disponível de várias formas: como <strong>chef</strong> do seu restaurante, como <strong>chef privado</strong> à sua mesa, como <strong>chef consultor</strong> do seu negócio, ou como <strong>cozinheiro profissional</strong> a reforçar a sua cozinha.",
      "sobre.cta": "Ver serviços e preços →",

      "servicos.eyebrow": "Serviços &amp; Preços",
      "servicos.title": "Várias formas de trabalhar comigo",
      "servicos.lead": "Chef para o seu restaurante, chef privado à sua mesa, chef consultor para o seu negócio, ou cozinheiro profissional para a sua equipa.",
      "servicos.destaque": "Recomendado",
      "servicos.ctaBtn": "Pedir orçamento",
      "servicos.nota": "Valores de referência, calculados por serviço/evento e sujeitos a confirmação — eventos, catering e projetos maiores têm orçamento próprio.",

      "servicos.chef.title": "Chef",
      "servicos.chef.sub": "Chef para restaurantes",
      "servicos.chef.i1": "Direção e liderança da cozinha do seu restaurante",
      "servicos.chef.i2": "Criação e renovação de ementas sazonais",
      "servicos.chef.i3": "Gestão de equipa, stock e controlo de desperdício",
      "servicos.chef.priceDia": "€150",
      "servicos.chef.unitDia": "/ dia",
      "servicos.chef.priceHora": "€22",
      "servicos.chef.unitHora": "/ hora",

      "servicos.privado.title": "Chef Privado/Particular",
      "servicos.privado.sub": "Jantar de assinatura em casa ou espaço próprio",
      "servicos.privado.i1": "Jantares privados em casa ou espaço próprio",
      "servicos.privado.i2": "Menu de degustação personalizado para o seu grupo",
      "servicos.privado.i3": "Compras, confeção e serviço à mesa incluídos",
      "servicos.privado.i4": "Ideal para celebrações e jantares em família",
      "servicos.privado.price": "€29",
      "servicos.privado.unit": "/ pessoa · mín. 6",

      "servicos.consultor.title": "Chef Consultor",
      "servicos.consultor.sub": "Desenvolvimento do seu negócio gastronómico",
      "servicos.consultor.i1": "Desenvolvimento de conceito de restaurante/café",
      "servicos.consultor.i2": "Criação e engenharia de menus",
      "servicos.consultor.i3": "Fichas técnicas e controlo de custos",
      "servicos.consultor.i4": "Consultoria de abertura de unidades",
      "servicos.consultor.price": "€800",
      "servicos.consultor.unit": "/ projeto, a partir de",

      "servicos.cozinheiro.title": "Cozinheiro",
      "servicos.cozinheiro.sub": "Reforço profissional para a sua cozinha",
      "servicos.cozinheiro.i1": "Reforço de equipa em picos de serviço",
      "servicos.cozinheiro.i2": "Substituição pontual de chef/cozinheiro",
      "servicos.cozinheiro.i3": "Formação de equipa de cozinha",
      "servicos.cozinheiro.priceDia": "€100",
      "servicos.cozinheiro.unitDia": "/ dia",
      "servicos.cozinheiro.priceHora": "€15",
      "servicos.cozinheiro.unitHora": "/ hora",

      "casos.eyebrow": "Casos de Estudo",
      "casos.title": "Trabalho recente",
      "casos.lead": "Projetos reais, desenvolvidos no Alentejo.",
      "casos.contexto": "Contexto:",
      "casos.oque": "O que fiz:",
      "casos.resultado": "Resultado:",

      "casos.c1.photoLabel": "FOTO A SUBSTITUIR<br>Veggieterrâneo",
      "casos.c1.tag": "Conceito Vegetariano",
      "casos.c1.title": "Veggieterrâneo",
      "casos.c1.place": "Évora",
      "casos.c1.contexto": "cozinha vegetariana mediterrânica em Évora, de mesas comunitárias, com ementa de ingredientes de época e carta de vinhos naturais e cocktails de autor.",
      "casos.c1.oque": "consultoria de conceito e menu vegetariano mediterrânico, incluindo pratos de assinatura como as Bolas de Arroz e Legumes com Molho de Pimento Vermelho e a Couve-Flor e Cogumelos com Arroz Jasmim e Amêndoa.",
      "casos.c1.resultado": "conceito e ementa entregues, atualmente em operação no restaurante em Évora.",

      "casos.c2.tag": "Farm-to-Table",
      "casos.c2.title": "Raya Restaurante — Grupo Terramay",
      "casos.c2.place": "Praia Fluvial de Azenhas del Rei, Alandroal",
      "casos.c2.contexto": "restaurante \"farm to beach\" do Grupo Terramay (integrado no Top 50 Farmers — 2025 Cohort), com conceito assente em agricultura regenerativa e produto sazonal da própria quinta.",
      "casos.c2.oque": "liderança da equipa de cozinha, reestruturação de ementas sazonais e implementação de sistema de controlo de stock.",
      "casos.c2.resultado": "-10% de desperdício através de formação de equipa, -15% com o novo sistema de stock, e aumento das vendas de pratos premium.",

      "percurso.eyebrow": "Percurso Profissional",
      "percurso.title": "Marcos que moldaram o meu trabalho",
      "percurso.destaque": "Destaque",
      "percurso.t1.title": "La Tapita Portuguesa",
      "percurso.t1.place": "Badajoz, Espanha",
      "percurso.t1.desc": "Primeiros passos em cozinha profissional, já na fronteira com Espanha — mise en place, confeção de pratos e gestão de encomendas.",
      "percurso.t2.title": "Sea Me",
      "percurso.t2.place": "Lisboa",
      "percurso.t2.desc": "Sea Me – Peixaria Moderna, com espaços no Chiado, Time Out Market e Alvalade. Responsabilidades de sous chef de partida em confeção a la carte.",
      "percurso.t3.title": "Valverde Lisboa Hotel &amp; Garden",
      "percurso.t3.place": "Lisboa",
      "percurso.t3.desc": "Hotel boutique num palacete histórico, membro Relais &amp; Châteaux, distinguido nos World Travel Awards como \"Europe's Leading Luxury Boutique Hotel\" seis anos seguidos (2020–2025). Na minha passagem: show cooking para buffet e à la carte, com técnicas de sous vide e cozinha molecular.",
      "percurso.t4.title": "A Taberna da Rua das Flores",
      "percurso.t4.place": "Lisboa",
      "percurso.t4.desc": "Sous Chef com liderança de equipa de 5 pessoas, -7% de desperdício através de formação, e reestruturação de ementas sazonais valorizando produtores e produto local.",
      "percurso.t5.title": "Hotel Vila Galé Collection",
      "percurso.t5.place": "Elvas",
      "percurso.t5.desc": "Participação ativa na abertura da unidade. Mise en place e show cooking de buffet para até 120 clientes.",
      "percurso.t6.title": "Tasca d'Juromenha",
      "percurso.t6.place": "Juromenha, Alandroal",
      "percurso.t6.desc": "Chef responsável pela supervisão diária para 48 clientes e formação de equipa em mise en place e segurança alimentar.",
      "percurso.t7.title": "Raya Restaurante — Grupo Terramay",
      "percurso.t7.place": "Praia Fluvial de Azenhas del Rei, Alandroal",
      "percurso.t7.desc": "Conceito farm-to-table com aproveitamento de agricultura regenerativa. Liderança de equipa de 4 pessoas, com -10% de desperdício através de formação; reestruturação de ementas sazonais que aumentou as vendas de pratos premium; sistema de controlo de stock que reduziu o desperdício em 15%.",
      "percurso.t7.credential": "🏅 A Terramay integra o <strong>Top 50 Farmers — 2025 Cohort</strong>, reconhecimento à agricultura regenerativa por trás do conceito.",
      "percurso.t8.title": "Massa Fina — Grupo Vila Galé",
      "percurso.t8.place": "Elvas · atual",
      "percurso.t8.desc": "Chef de conceito de cozinha italiana. Liderança de equipa, gestão de eventos e sistema de controlo de stock.",

      "como.title": "Como funciona",
      "como.s1.t": "Fale comigo",
      "como.s1.d": "Pelo formulário ou por WhatsApp. Respondo em até 48h úteis.",
      "como.s2.t": "Recebe uma proposta",
      "como.s2.d": "Combinamos objetivos, âmbito e prazos, e fica o valor final acordado antes de começarmos.",
      "como.s3.t": "Pomos a cozinha a funcionar",
      "como.s3.d": "Trabalho consigo e com a sua equipa até a cozinha funcionar como combinámos.",

      "faq.eyebrow": "Perguntas frequentes",
      "faq.title": "Antes de me contactar",
      "faq.q1": "Quanto custa?",
      "faq.a1": "Os valores de referência estão na secção Serviços &amp; Preços. O valor final depende do âmbito, da duração e do local, e combinamo-lo antes de começarmos.",
      "faq.q2": "Que zonas cobre?",
      "faq.a2": "Elvas, Campo Maior, Alto Alentejo e Badajoz. Para outras zonas, fale comigo e vemos o que é possível.",
      "faq.q3": "Atende em espanhol?",
      "faq.a3": "Sim. Pode contactar-me, receber a proposta e trabalhar comigo em português ou em espanhol.",
      "faq.q4": "Qual é a diferença entre chef, chef consultor e cozinheiro?",
      "faq.a4": "O <strong>chef</strong> dirige a cozinha do seu restaurante (equipa, ementas, stock). O <strong>chef consultor</strong> desenvolve o conceito, as ementas, as fichas técnicas e a abertura, e deixa o sistema a funcionar. O <strong>cozinheiro</strong> reforça a sua equipa em picos de serviço ou substituições. O <strong>chef privado</strong> cozinha para o seu grupo, em sua casa.",
      "faq.q5": "O que inclui o jantar de chef privado?",
      "faq.a5": "Menu de degustação personalizado, compras, confeção e serviço à mesa, para grupos de 6 ou mais pessoas. Diga-me no pedido se há alergias ou restrições alimentares, para adaptar o menu.",
      "faq.q6": "O que pode incluir uma consultoria?",
      "faq.a6": "Depende do projeto: desde o conceito e a ementa, passando pelas fichas técnicas e pelo controlo de custos, até ao acompanhamento da abertura. Na proposta indico o que está incluído.",
      "faq.q7": "Quanto tempo demora a resposta?",
      "faq.a7": "Respondo em até 48 horas úteis, por WhatsApp, email ou telefone.",

      "galeria.eyebrow": "Galeria",
      "galeria.title": "Momentos de cozinha",
      "galeria.lead": "Pratos, equipas e espaços de alguns dos projetos por onde já passei.",

      "contacto.eyebrow": "Contacto",
      "contacto.title": "Vamos falar sobre o seu projeto",
      "contacto.lead": "Resposta em até 48h úteis. Também recebo clientes de Badajoz e da raia espanhola.",
      "contacto.phoneLabel": "Telefone",
      "contacto.emailLabel": "Email",
      "contacto.whatsapp": "Falar no WhatsApp",

      "form.nome": "Nome",
      "form.email": "Email",
      "form.telefone": "Telefone (opcional)",
      "form.servico": "Tipo de serviço",
      "form.servicoPlaceholder": "Escolha uma opção",
      "form.opt1": "Chef — Restaurante",
      "form.opt6": "Chef Privado/Particular — Jantar",
      "form.opt2": "Chef Consultor — Conceito/Menus/Fichas",
      "form.opt3": "Cozinheiro — Reforço de Equipa",
      "form.opt4": "Eventos e Catering",
      "form.opt5": "Outro",
      "form.mensagem": "Mensagem",
      "form.enviar": "Enviar Pedido",
      "form.enviando": "A enviar...",
      "form.sucesso": "Pedido enviado com sucesso! Entrarei em contacto em breve.",
      "form.erro": "Não foi possível enviar. Tente novamente ou fale comigo diretamente: <a href=\"https://wa.me/351966794420\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> · <a href=\"mailto:elxconsult.club@gmail.com\">email</a>.",

      "footer.text": "© <span id=\"year\"></span> Bruno Miguel Vieira Leal — Chef Consultor. Alto Alentejo, Portugal.",
      "footer.top": "Voltar ao topo ↑",
      "footer.privacy": "Política de Privacidade",
      "priv.back": "← Voltar ao site",
      "wa.msg": "Olá Bruno, vi o seu site e gostava de pedir um orçamento.",
      "wa.msgService": "Olá Bruno, vi o seu site e gostava de pedir um orçamento: {service}.",
      "form.consent": "Aceito que os meus dados sejam usados para responder a este pedido, de acordo com a <a href=\"privacidade.html\">Política de Privacidade</a>."
    },

    es: {
      "skip": "Ir a contacto",
      "nav.sobre": "Sobre mí",
      "nav.servicos": "Servicios y Precios",
      "nav.casos": "Casos de Éxito",
      "nav.percurso": "Trayectoria",
      "nav.galeria": "Galería",
      "nav.contacto": "Contacto",
      "nav.cta": "Hablemos",

      "hero.eyebrow": "Chef · Alto Alentejo",
      "hero.title": "Chef consultor para cocinas que funcionan cada día",
      "hero.role": "Bruno Miguel Vieira Leal — Chef, Chef Consultor y Cocinero",
      "hero.tagline": "Concepto, cartas, fichas técnicas y equipo para restaurantes, cafés y eventos en el Alto Alentejo y en Badajoz — pensados para el servicio de cada día, no solo para el día de la apertura.",
      "hero.stat1": "años en cocina profesional",
      "hero.stat2": "de desperdicio con control de stock (Raya)",
      "hero.stat3": "atención en los dos idiomas",
      "hero.ctaPrimary": "Ver Servicios y Precios",
      "hero.ctaSecondary": "Ver Casos de Éxito",
      "hero.photoLabel": "FOTO A SUSTITUIR<br>Retrato del chef / plato de autor",

      "sobre.eyebrow": "Sobre mí",
      "sobre.photoLabel": "FOTO A SUSTITUIR<br>Chef trabajando en cocina",
      "sobre.title": "Del Chiado al Alto Alentejo, sin perder la raíz.",
      "sobre.p1": "Más de 15 años de experiencia en cocina profesional — desde la frontera con España hasta Lisboa (Sea Me, Valverde Boutique Hotel) — hasta liderar cocinas en el Alto Alentejo, incluido el Raya Restaurante (Grupo Terramay), en la Playa Fluvial de Azenhas del Rey, y por último, el Massa Fina, del Grupo Vila Galé, en Elvas.",
      "sobre.p2": "Hoy trabajo junto a propietarios de restaurantes, cafés y organizadores de eventos: desarrollo de concepto, creación de cartas y fichas técnicas, gestión de costes e implementación de operaciones de cocina.",
      "sobre.p3": "<strong>Lo que me distingue:</strong> el rigor técnico de cocinas de alto nivel aplicado a la identidad y a los productos del Alentejo — no un concepto genérico importado, sino algo que nace del territorio.",
      "sobre.p4": "Ese conocimiento está disponible de varias formas: como <strong>chef</strong> de su restaurante, como <strong>chef privado</strong> en su mesa, como <strong>chef consultor</strong> de su negocio, o como <strong>cocinero profesional</strong> reforzando su cocina.",
      "sobre.cta": "Ver servicios y precios →",

      "servicos.eyebrow": "Servicios y Precios",
      "servicos.title": "Varias formas de trabajar conmigo",
      "servicos.lead": "Chef para su restaurante, chef privado en su mesa, chef consultor para su negocio, o cocinero profesional para su equipo.",
      "servicos.destaque": "Recomendado",
      "servicos.ctaBtn": "Pedir presupuesto",
      "servicos.nota": "Valores de referencia, calculados por servicio/evento y sujetos a confirmación — eventos, catering y proyectos mayores tienen presupuesto propio.",

      "servicos.chef.title": "Chef",
      "servicos.chef.sub": "Chef para restaurantes",
      "servicos.chef.i1": "Dirección y liderazgo de la cocina de su restaurante",
      "servicos.chef.i2": "Creación y renovación de cartas de temporada",
      "servicos.chef.i3": "Gestión de equipo, stock y control del desperdicio",
      "servicos.chef.priceDia": "150€",
      "servicos.chef.unitDia": "/ día",
      "servicos.chef.priceHora": "22€",
      "servicos.chef.unitHora": "/ hora",

      "servicos.privado.title": "Chef Privado/Particular",
      "servicos.privado.sub": "Cena de autor en casa o espacio propio",
      "servicos.privado.i1": "Cenas privadas en casa o espacio propio",
      "servicos.privado.i2": "Menú degustación personalizado para su grupo",
      "servicos.privado.i3": "Compra, elaboración y servicio de mesa incluidos",
      "servicos.privado.i4": "Ideal para celebraciones y cenas familiares",
      "servicos.privado.price": "29€",
      "servicos.privado.unit": "/ persona · mín. 6",

      "servicos.consultor.title": "Chef Consultor",
      "servicos.consultor.sub": "Desarrollo de su negocio gastronómico",
      "servicos.consultor.i1": "Desarrollo de concepto de restaurante/café",
      "servicos.consultor.i2": "Creación e ingeniería de cartas",
      "servicos.consultor.i3": "Fichas técnicas y control de costes",
      "servicos.consultor.i4": "Consultoría de apertura de locales",
      "servicos.consultor.price": "800€",
      "servicos.consultor.unit": "/ proyecto, desde",

      "servicos.cozinheiro.title": "Cocinero",
      "servicos.cozinheiro.sub": "Refuerzo profesional para su cocina",
      "servicos.cozinheiro.i1": "Refuerzo de equipo en picos de servicio",
      "servicos.cozinheiro.i2": "Sustitución puntual de chef/cocinero",
      "servicos.cozinheiro.i3": "Formación de equipo de cocina",
      "servicos.cozinheiro.priceDia": "100€",
      "servicos.cozinheiro.unitDia": "/ día",
      "servicos.cozinheiro.priceHora": "15€",
      "servicos.cozinheiro.unitHora": "/ hora",

      "casos.eyebrow": "Casos de Éxito",
      "casos.title": "Trabajo reciente",
      "casos.lead": "Proyectos reales, desarrollados en el Alentejo.",
      "casos.contexto": "Contexto:",
      "casos.oque": "Qué hice:",
      "casos.resultado": "Resultado:",


      "casos.c1.photoLabel": "FOTO A SUSTITUIR<br>Veggieterrâneo",
      "casos.c1.tag": "Concepto Vegetariano",
      "casos.c1.title": "Veggieterrâneo",
      "casos.c1.place": "Évora",
      "casos.c1.contexto": "cocina vegetariana mediterránea en Évora, de mesas comunitarias, con carta de ingredientes de temporada y vinos naturales y cócteles de autor.",
      "casos.c1.oque": "consultoría de concepto y carta vegetariana mediterránea, incluidos platos de autor como las Bolas de Arroz y Verduras con Salsa de Pimiento Rojo y la Coliflor y Setas con Arroz Jazmín y Almendra.",
      "casos.c1.resultado": "concepto y carta entregados, actualmente en funcionamiento en el restaurante de Évora.",

      "casos.c2.tag": "Farm-to-Table",
      "casos.c2.title": "Raya Restaurante — Grupo Terramay",
      "casos.c2.place": "Playa Fluvial de Azenhas del Rey, Alandroal",
      "casos.c2.contexto": "restaurante \"farm to beach\" del Grupo Terramay (parte del Top 50 Farmers — 2025 Cohort), con un concepto basado en agricultura regenerativa y producto de temporada de su propia granja.",
      "casos.c2.oque": "liderazgo del equipo de cocina, reestructuración de cartas de temporada e implementación de un sistema de control de stock.",
      "casos.c2.resultado": "-10% de desperdicio mediante formación de equipo, -15% con el nuevo sistema de stock, y aumento de las ventas de platos premium.",

      "percurso.eyebrow": "Trayectoria Profesional",
      "percurso.title": "Hitos que marcaron mi trabajo",
      "percurso.destaque": "Destacado",
      "percurso.t1.title": "La Tapita Portuguesa",
      "percurso.t1.place": "Badajoz, España",
      "percurso.t1.desc": "Primeros pasos en cocina profesional, ya en la frontera con España — mise en place, elaboración de platos y gestión de pedidos.",
      "percurso.t2.title": "Sea Me",
      "percurso.t2.place": "Lisboa",
      "percurso.t2.desc": "Sea Me – Peixaria Moderna, con locales en Chiado, Time Out Market y Alvalade. Responsabilidades de sous chef de partida en elaboración a la carta.",
      "percurso.t3.title": "Valverde Lisboa Hotel &amp; Garden",
      "percurso.t3.place": "Lisboa",
      "percurso.t3.desc": "Hotel boutique en un palacete histórico, miembro de Relais &amp; Châteaux, galardonado en los World Travel Awards como \"Europe's Leading Luxury Boutique Hotel\" seis años seguidos (2020–2025). En mi etapa: show cooking para buffet y a la carta, con técnicas de sous vide y cocina molecular.",
      "percurso.t4.title": "A Taberna da Rua das Flores",
      "percurso.t4.place": "Lisboa",
      "percurso.t4.desc": "Sous Chef con liderazgo de un equipo de 5 personas, -7% de desperdicio mediante formación, y reestructuración de cartas de temporada dando valor a productores y producto local.",
      "percurso.t5.title": "Hotel Vila Galé Collection",
      "percurso.t5.place": "Elvas",
      "percurso.t5.desc": "Participación activa en la apertura del establecimiento. Mise en place y show cooking de buffet para hasta 120 clientes.",
      "percurso.t6.title": "Tasca d'Juromenha",
      "percurso.t6.place": "Juromenha, Alandroal",
      "percurso.t6.desc": "Chef responsable de la supervisión diaria para 48 clientes y formación de equipo en mise en place y seguridad alimentaria.",
      "percurso.t7.title": "Raya Restaurante — Grupo Terramay",
      "percurso.t7.place": "Playa Fluvial de Azenhas del Rey, Alandroal",
      "percurso.t7.desc": "Concepto farm-to-table con aprovechamiento de agricultura regenerativa. Liderazgo de un equipo de 4 personas, con -10% de desperdicio mediante formación; reestructuración de cartas de temporada que aumentó las ventas de platos premium; sistema de control de stock que redujo el desperdicio en un 15%.",
      "percurso.t7.credential": "🏅 Terramay forma parte del <strong>Top 50 Farmers — 2025 Cohort</strong>, un reconocimiento a la agricultura regenerativa detrás del concepto.",
      "percurso.t8.title": "Massa Fina — Grupo Vila Galé",
      "percurso.t8.place": "Elvas · actual",
      "percurso.t8.desc": "Chef de concepto de cocina italiana. Liderazgo de equipo, gestión de eventos y sistema de control de stock.",

      "como.title": "Cómo funciona",
      "como.s1.t": "Hable conmigo",
      "como.s1.d": "Por el formulario o por WhatsApp. Respondo en un máximo de 48h laborables.",
      "como.s2.t": "Recibe una propuesta",
      "como.s2.d": "Acordamos objetivos, alcance y plazos, y el precio final queda acordado antes de empezar.",
      "como.s3.t": "Ponemos la cocina a funcionar",
      "como.s3.d": "Trabajo con usted y con su equipo hasta que la cocina funcione como acordamos.",

      "faq.eyebrow": "Preguntas frecuentes",
      "faq.title": "Antes de contactarme",
      "faq.q1": "¿Cuánto cuesta?",
      "faq.a1": "Los valores de referencia están en la sección Servicios y Precios. El precio final depende del alcance, la duración y el lugar, y lo acordamos antes de empezar.",
      "faq.q2": "¿Qué zonas cubre?",
      "faq.a2": "Elvas, Campo Maior, Alto Alentejo y Badajoz. Para otras zonas, hable conmigo y vemos qué es posible.",
      "faq.q3": "¿Atiende en español?",
      "faq.a3": "Sí. Puede contactarme, recibir la propuesta y trabajar conmigo en portugués o en español.",
      "faq.q4": "¿Cuál es la diferencia entre chef, chef consultor y cocinero?",
      "faq.a4": "El <strong>chef</strong> dirige la cocina de su restaurante (equipo, cartas, stock). El <strong>chef consultor</strong> desarrolla el concepto, las cartas, las fichas técnicas y la apertura, y deja el sistema funcionando. El <strong>cocinero</strong> refuerza su equipo en picos de servicio o sustituciones. El <strong>chef privado</strong> cocina para su grupo, en su casa.",
      "faq.q5": "¿Qué incluye la cena de chef privado?",
      "faq.a5": "Menú degustación personalizado, compra, elaboración y servicio de mesa, para grupos de 6 o más personas. Indíquemelo en la solicitud si hay alergias o restricciones alimentarias, para adaptar el menú.",
      "faq.q6": "¿Qué puede incluir una consultoría?",
      "faq.a6": "Depende del proyecto: desde el concepto y la carta, pasando por las fichas técnicas y el control de costes, hasta el acompañamiento de la apertura. En la propuesta indico lo que está incluido.",
      "faq.q7": "¿Cuánto tarda la respuesta?",
      "faq.a7": "Respondo en un máximo de 48 horas laborables, por WhatsApp, email o teléfono.",

      "galeria.eyebrow": "Galería",
      "galeria.title": "Momentos de cocina",
      "galeria.lead": "Platos, equipos y espacios de algunos de los proyectos por los que he pasado.",

      "contacto.eyebrow": "Contacto",
      "contacto.title": "Hablemos de su proyecto",
      "contacto.lead": "Respuesta en un máximo de 48h laborables. También atiendo a clientes de Badajoz y de la raya española.",
      "contacto.phoneLabel": "Teléfono",
      "contacto.emailLabel": "Email",
      "contacto.whatsapp": "Hablar por WhatsApp",

      "form.nome": "Nombre",
      "form.email": "Email",
      "form.telefone": "Teléfono (opcional)",
      "form.servico": "Tipo de servicio",
      "form.servicoPlaceholder": "Elija una opción",
      "form.opt1": "Chef — Restaurante",
      "form.opt6": "Chef Privado/Particular — Cena",
      "form.opt2": "Chef Consultor — Concepto/Cartas/Fichas",
      "form.opt3": "Cocinero — Refuerzo de Equipo",
      "form.opt4": "Eventos y Catering",
      "form.opt5": "Otro",
      "form.mensagem": "Mensaje",
      "form.enviar": "Enviar Solicitud",
      "form.enviando": "Enviando...",
      "form.sucesso": "¡Solicitud enviada con éxito! Me pondré en contacto en breve.",
      "form.erro": "No se pudo enviar. Inténtelo de nuevo o hable conmigo directamente: <a href=\"https://wa.me/351966794420\" target=\"_blank\" rel=\"noopener\">WhatsApp</a> · <a href=\"mailto:elxconsult.club@gmail.com\">email</a>.",

      "footer.text": "© <span id=\"year\"></span> Bruno Miguel Vieira Leal — Chef Consultor. Alto Alentejo, Portugal.",
      "footer.top": "Volver arriba ↑",
      "footer.privacy": "Política de Privacidad",
      "priv.back": "← Volver al sitio",
      "wa.msg": "Hola Bruno, he visto su web y me gustaría pedir un presupuesto.",
      "wa.msgService": "Hola Bruno, he visto su web y me gustaría pedir un presupuesto: {service}.",
      "form.consent": "Acepto que mis datos se utilicen para responder a esta solicitud, de acuerdo con la <a href=\"privacidade.html\">Política de Privacidad</a>."
    }
  };

  /* ---------- Aplicar idioma ---------- */
  function applyLang(lang){
    var d = dict[lang] || dict.pt;
    document.documentElement.setAttribute('lang', lang === 'es' ? 'es-ES' : 'pt-PT');
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) {
        el.innerHTML = d[key];
      }
    });
    document.querySelectorAll('.lang-opt').forEach(function(el){
      el.classList.toggle('is-active', el.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('site-lang', lang); } catch(e) {}
    // ano tem de ser reposto pois innerHTML do footer é substituído
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
    updateWhatsApp(lang);
    document.querySelectorAll('[data-home]').forEach(function(a){
      a.setAttribute('href', lang === 'es' ? 'es/' : 'index.html');
    });
  }

  /* ---------- WhatsApp: mensagem pré-preenchida conforme o serviço ---------- */
  function updateWhatsApp(lang){
    var links = document.querySelectorAll('.js-wa');
    if (!links.length) return;
    var d = dict[lang] || dict.pt;
    var sel = document.getElementById('servico');
    var label = (sel && sel.value) ? sel.options[sel.selectedIndex].text : '';
    var text = label ? d['wa.msgService'].replace('{service}', label) : d['wa.msg'];
    var url = 'https://wa.me/351966794420?text=' + encodeURIComponent(text);
    links.forEach(function(a){ a.setAttribute('href', url); });
  }

  /* Idioma: nas páginas principais (/ e /es/) vem do próprio documento e o seletor é uma ligação
     para a outra versão; só a política de privacidade (página única bilingue) troca o texto aqui. */
  var langToggle = document.getElementById('lang-toggle');
  var pageLang = document.documentElement.lang.indexOf('es') === 0 ? 'es' : 'pt';
  var toggleIsLink = !!(langToggle && langToggle.tagName === 'A');
  var currentLang = pageLang;

  if (!toggleIsLink) {
    var fromQuery = null, fromStorage = null;
    try { fromQuery = new URLSearchParams(location.search).get('lang'); } catch(e) {}
    try { fromStorage = localStorage.getItem('site-lang'); } catch(e) {}
    currentLang = (fromQuery === 'es' || fromQuery === 'pt') ? fromQuery : (fromStorage || 'pt');
    if (currentLang !== 'pt') applyLang(currentLang);
  }

  if (langToggle) {
    langToggle.addEventListener('click', function(){
      if (toggleIsLink) {
        try { localStorage.setItem('site-lang', pageLang === 'pt' ? 'es' : 'pt'); } catch(e) {}
        return;
      }
      currentLang = currentLang === 'pt' ? 'es' : 'pt';
      applyLang(currentLang);
    });
  }

  /* ---------- "Pedir orçamento" escolhe o serviço no formulário ---------- */
  var serviceSelect = document.getElementById('servico');
  document.querySelectorAll('[data-service]').forEach(function(a){
    a.addEventListener('click', function(){
      if (serviceSelect) {
        serviceSelect.value = a.getAttribute('data-service');
        updateWhatsApp(currentLang);
      }
    });
  });
  if (serviceSelect) {
    serviceSelect.addEventListener('change', function(){ updateWhatsApp(currentLang); });
  }
  updateWhatsApp(currentLang);

  /* ---------- Botão flutuante de WhatsApp: esconde-se junto ao contacto e ao rodapé ---------- */
  var waFloat = document.getElementById('wa-float');
  if (waFloat) {
    var waHideTargets = [document.getElementById('contacto'), document.querySelector('.site-footer')].filter(Boolean);
    var checkWaFloat = function(){
      var vh = window.innerHeight;
      var hide = waHideTargets.some(function(t){
        var r = t.getBoundingClientRect();
        var overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        return overlap > Math.min(120, r.height * 0.5);
      });
      waFloat.classList.toggle('is-hidden', hide);
    };
    window.addEventListener('scroll', checkWaFloat, { passive: true });
    window.addEventListener('resize', checkWaFloat);
    checkWaFloat();
  }

  /* ---------- Formulário de contacto (Web3Forms) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var d = dict[currentLang] || dict.pt;
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = d['form.enviando'];
      status.textContent = '';
      status.className = 'form-status';

      var formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(function(res){ return res.json(); })
      .then(function(json){
        if (json.success) {
          status.textContent = d['form.sucesso'];
          status.className = 'form-status is-success';
          form.reset();
        } else {
          status.innerHTML = d['form.erro'];
          status.className = 'form-status is-error';
        }
      })
      .catch(function(){
        status.innerHTML = d['form.erro'];
        status.className = 'form-status is-error';
      })
      .finally(function(){
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
    });
  }

})();
