import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const recipes = [
  {
    name: "Brigadeiro",
    prepSeconds: 600,
    waitSeconds: 1800,
    servings: 30,
    notes: "Enrolar quando estiver bem frio para não grudar nas mãos.",
    tags: ["Chocolate", "Festa", "Clássico"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
          { name: "Chocolate em pó", quantity: "3 colheres de sopa" },
        ],
        preparation: [
          "Misture o leite condensado, a manteiga e o chocolate em pó numa panela.",
          "Cozinhe em fogo médio, mexendo sempre, até desgrudar do fundo.",
          "Despeje numa travessa untada e deixe esfriar completamente.",
          "Enrole em bolinhas e passe no granulado de chocolate.",
        ],
      },
    ],
  },
  {
    name: "Quindim",
    prepSeconds: 1200,
    waitSeconds: 3600,
    servings: 12,
    notes: "Desenformar ainda morno para facilitar.",
    tags: ["Forno", "Gema", "Clássico"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Gemas", quantity: "12 unidades" },
          { name: "Açúcar", quantity: "2 xícaras" },
          { name: "Coco ralado", quantity: "1 xícara" },
          { name: "Manteiga derretida", quantity: "1 colher de sopa" },
          { name: "Água", quantity: "1/4 xícara" },
        ],
        preparation: [
          "Preaqueça o forno a 180°C.",
          "Misture as gemas peneiradas com o açúcar até obter um creme.",
          "Adicione o coco ralado, a manteiga e a água.",
          "Distribua em forminhas untadas e enfarinhadas.",
          "Asse em banho-maria por 30 a 40 minutos.",
          "Desenforme ainda morno e deixe esfriar.",
        ],
      },
    ],
  },
  {
    name: "Bolo de Cenoura com Cobertura de Chocolate",
    prepSeconds: 1800,
    waitSeconds: 2400,
    servings: 12,
    tags: ["Forno", "Bolo", "Clássico"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Cenoura", quantity: "3 unidades médias" },
          { name: "Ovos", quantity: "3 unidades" },
          { name: "Óleo de girassol", quantity: "1 xícara" },
          { name: "Açúcar", quantity: "2 xícaras" },
          { name: "Farinha de trigo", quantity: "2 e 1/2 xícaras" },
          { name: "Fermento em pó", quantity: "1 colher de sopa" },
          { name: "Sal", quantity: "1 pitada" },
        ],
        preparation: [
          "Preaqueça o forno a 180°C.",
          "No liquidificador, bata as cenouras, os ovos e o óleo até ficar liso.",
          "Transfira para uma tigela e misture o açúcar.",
          "Incorpore a farinha, o fermento e o sal.",
          "Despeje em forma untada e asse por 35 a 40 minutos.",
        ],
      },
      {
        name: "Cobertura",
        ingredients: [
          { name: "Chocolate em pó", quantity: "4 colheres de sopa" },
          { name: "Leite", quantity: "1/2 xícara" },
          { name: "Açúcar", quantity: "1 xícara" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
        ],
        preparation: [
          "Misture tudo numa panela e cozinhe em fogo médio até engrossar levemente.",
          "Despeje quente sobre o bolo ainda na forma.",
        ],
      },
    ],
  },
  {
    name: "Pudim de Leite Condensado",
    prepSeconds: 900,
    waitSeconds: 14400,
    servings: 10,
    notes: "Refrigere pelo menos 4 horas antes de desenformar.",
    tags: ["Forno", "Clássico", "Festa"],
    sections: [
      {
        name: "Calda",
        ingredients: [{ name: "Açúcar", quantity: "1 xícara" }],
        preparation: [
          "Derreta o açúcar numa panela em fogo médio até obter um caramelo dourado.",
          "Despeje na forma de pudim untada e espalhe pelas laterais.",
        ],
      },
      {
        name: "Pudim",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Leite integral", quantity: "2 latas (medida da lata de leite condensado)" },
          { name: "Ovos", quantity: "3 unidades" },
        ],
        preparation: [
          "Bata todos os ingredientes no liquidificador por 2 minutos.",
          "Despeje sobre a calda na forma.",
          "Asse em banho-maria a 180°C por 1h30.",
          "Deixe esfriar e leve à geladeira por pelo menos 4 horas.",
          "Desenforme e sirva gelado.",
        ],
      },
    ],
  },
  {
    name: "Pão de Mel",
    prepSeconds: 1800,
    waitSeconds: 5400,
    servings: 20,
    notes: "Fica melhor de um dia para o outro.",
    tags: ["Forno", "Chocolate", "Especiarias"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Mel", quantity: "1/2 xícara" },
          { name: "Açúcar mascavo", quantity: "1 xícara" },
          { name: "Manteiga", quantity: "1/2 xícara" },
          { name: "Ovos", quantity: "2 unidades" },
          { name: "Leite", quantity: "1/2 xícara" },
          { name: "Farinha de trigo", quantity: "2 xícaras" },
          { name: "Bicarbonato de sódio", quantity: "1 colher de chá" },
          { name: "Canela em pó", quantity: "1 colher de chá" },
          { name: "Cravo em pó", quantity: "1/4 colher de chá" },
          { name: "Noz-moscada", quantity: "1/4 colher de chá" },
          { name: "Cacau em pó", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Bata a manteiga com o açúcar até ficar fofo.",
          "Adicione os ovos, o mel e o leite.",
          "Misture os ingredientes secos e incorpore à massa.",
          "Distribua em forminhas untadas.",
          "Asse a 180°C por 15 a 20 minutos.",
        ],
      },
      {
        name: "Cobertura de Chocolate",
        ingredients: [
          { name: "Chocolate meio amargo", quantity: "300g" },
          { name: "Creme de leite", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Derreta o chocolate em banho-maria com o creme de leite.",
          "Mergulhe cada pão de mel no chocolate e deixe secar em grade.",
        ],
      },
    ],
  },
  {
    name: "Beijinho de Coco",
    prepSeconds: 600,
    waitSeconds: 1800,
    servings: 30,
    tags: ["Festa", "Coco", "Clássico"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Coco ralado seco", quantity: "1 xícara" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
          { name: "Cravo-da-índia", quantity: "30 unidades (para decorar)" },
        ],
        preparation: [
          "Misture o leite condensado, o coco e a manteiga numa panela.",
          "Cozinhe em fogo médio, mexendo sempre, até desgrudar do fundo.",
          "Despeje numa travessa untada e deixe esfriar.",
          "Enrole em bolinhas, passe no coco ralado e espete um cravo em cada.",
        ],
      },
    ],
  },
  {
    name: "Pavê de Chocolate",
    prepSeconds: 2400,
    waitSeconds: 28800,
    servings: 12,
    notes: "Preparar na véspera para firmar bem.",
    tags: ["Geladeira", "Chocolate", "Festa"],
    sections: [
      {
        name: "Creme",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite", quantity: "1 caixinha (200g)" },
          { name: "Chocolate em pó", quantity: "4 colheres de sopa" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
          { name: "Gemas", quantity: "3 unidades" },
        ],
        preparation: [
          "Misture as gemas com o leite condensado, o chocolate e a manteiga.",
          "Cozinhe em fogo médio mexendo sempre até engrossar.",
          "Retire do fogo, deixe amornar e misture o creme de leite.",
        ],
      },
      {
        name: "Montagem",
        ingredients: [
          { name: "Biscoito champagne", quantity: "200g" },
          { name: "Leite", quantity: "1 xícara" },
          { name: "Cacau em pó", quantity: "2 colheres de sopa" },
          { name: "Chocolate granulado", quantity: "a gosto" },
        ],
        preparation: [
          "Misture o leite com o cacau para molhar os biscoitos.",
          "Faça camadas alternadas de creme e biscoito embebido numa travessa.",
          "Finalize com creme e decore com granulado.",
          "Leve à geladeira por pelo menos 8 horas.",
        ],
      },
    ],
  },
  {
    name: "Canjica Cremosa",
    prepSeconds: 600,
    waitSeconds: 5400,
    servings: 8,
    tags: ["Festa Junina", "Milho", "Cremoso"],
    sections: [
      {
        name: "Canjica",
        ingredients: [
          { name: "Milho para canjica", quantity: "500g" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Leite de coco", quantity: "200ml" },
          { name: "Leite integral", quantity: "1 litro" },
          { name: "Açúcar", quantity: "2 colheres de sopa" },
          { name: "Canela em pau", quantity: "2 unidades" },
          { name: "Cravo-da-índia", quantity: "3 unidades" },
        ],
        preparation: [
          "Deixe o milho de molho em água por 12 horas. Escorra.",
          "Cozinhe o milho na panela de pressão com água por 30 minutos após pegar pressão.",
          "Escorra e volte à panela com o leite, a canela e o cravo.",
          "Cozinhe em fogo médio por 20 minutos.",
          "Adicione o leite condensado e o leite de coco. Cozinhe mais 10 minutos.",
          "Sirva com canela em pó polvilhada.",
        ],
      },
    ],
  },
  {
    name: "Mousse de Maracujá",
    prepSeconds: 1200,
    waitSeconds: 14400,
    servings: 8,
    tags: ["Geladeira", "Frutas", "Cremoso"],
    sections: [
      {
        name: "Mousse",
        ingredients: [
          { name: "Suco de maracujá concentrado", quantity: "1/2 xícara" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite", quantity: "1 caixinha (200g)" },
          { name: "Gelatina sem sabor", quantity: "12g" },
          { name: "Água quente", quantity: "5 colheres de sopa" },
        ],
        preparation: [
          "Dissolva a gelatina na água quente e deixe hidratar por 5 minutos.",
          "Bata no liquidificador o suco de maracujá, o leite condensado, o creme de leite e a gelatina.",
          "Despeje em taças ou numa tigela.",
          "Leve à geladeira por no mínimo 4 horas.",
        ],
      },
      {
        name: "Calda",
        ingredients: [
          { name: "Polpa de maracujá", quantity: "1/2 xícara" },
          { name: "Açúcar", quantity: "3 colheres de sopa" },
          { name: "Água", quantity: "1/4 xícara" },
        ],
        preparation: [
          "Misture tudo numa panelinha e cozinhe por 5 minutos.",
          "Deixe esfriar e sirva sobre a mousse.",
        ],
      },
    ],
  },
  {
    name: "Bolo de Pote de Chocolate",
    prepSeconds: 2400,
    waitSeconds: 7200,
    servings: 6,
    tags: ["Geladeira", "Chocolate", "Pote"],
    sections: [
      {
        name: "Bolo",
        ingredients: [
          { name: "Farinha de trigo", quantity: "1 xícara" },
          { name: "Açúcar", quantity: "1 xícara" },
          { name: "Cacau em pó", quantity: "1/3 xícara" },
          { name: "Ovos", quantity: "2 unidades" },
          { name: "Leite", quantity: "1/2 xícara" },
          { name: "Óleo de girassol", quantity: "1/2 xícara" },
          { name: "Fermento em pó", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Misture os ingredientes secos.",
          "Adicione os líquidos e misture até ficar homogêneo.",
          "Asse em forma untada a 180°C por 25 minutos.",
          "Deixe esfriar e corte em cubos.",
        ],
      },
      {
        name: "Creme de Ninho",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite", quantity: "1 caixinha (200g)" },
          { name: "Leite em pó", quantity: "4 colheres de sopa" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
        ],
        preparation: [
          "Misture todos os ingredientes e bata bem.",
        ],
      },
      {
        name: "Montagem",
        ingredients: [
          { name: "Chocolate granulado", quantity: "a gosto" },
        ],
        preparation: [
          "Coloque uma camada de bolo no fundo dos potes.",
          "Cubra com o creme de ninho.",
          "Repita as camadas e finalize com granulado.",
          "Leve à geladeira por 2 horas.",
        ],
      },
    ],
  },
  {
    name: "Cocada Cremosa",
    prepSeconds: 600,
    waitSeconds: 2400,
    servings: 20,
    tags: ["Coco", "Festa", "Clássico"],
    sections: [
      {
        name: "Cocada",
        ingredients: [
          { name: "Coco ralado", quantity: "2 xícaras" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
          { name: "Leite de coco", quantity: "100ml" },
        ],
        preparation: [
          "Misture tudo numa panela.",
          "Cozinhe em fogo médio, mexendo sempre, por 15 a 20 minutos até engrossar.",
          "Despeje em forminhas de papel ou numa assadeira untada.",
          "Deixe esfriar antes de servir.",
        ],
      },
    ],
  },
  {
    name: "Torta de Limão",
    prepSeconds: 2400,
    waitSeconds: 10800,
    servings: 10,
    tags: ["Geladeira", "Frutas", "Torta"],
    sections: [
      {
        name: "Base",
        ingredients: [
          { name: "Biscoito maisena", quantity: "200g" },
          { name: "Manteiga derretida", quantity: "100g" },
        ],
        preparation: [
          "Triture o biscoito e misture com a manteiga.",
          "Forre o fundo de uma forma de aro removível.",
          "Leve à geladeira por 30 minutos.",
        ],
      },
      {
        name: "Recheio",
        ingredients: [
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite", quantity: "1 caixinha (200g)" },
          { name: "Suco de limão", quantity: "1/2 xícara" },
          { name: "Gelatina sem sabor", quantity: "12g" },
          { name: "Água quente", quantity: "5 colheres de sopa" },
        ],
        preparation: [
          "Hidrate a gelatina na água quente.",
          "Bata o leite condensado, o creme de leite, o suco de limão e a gelatina.",
          "Despeje sobre a base e leve à geladeira por pelo menos 3 horas.",
        ],
      },
      {
        name: "Cobertura de Merengue",
        ingredients: [
          { name: "Claras", quantity: "3 unidades" },
          { name: "Açúcar", quantity: "1 xícara" },
        ],
        preparation: [
          "Bata as claras em neve e adicione o açúcar gradualmente.",
          "Espalhe sobre a torta e use um maçarico para dourar.",
        ],
      },
    ],
  },
  {
    name: "Doce de Abóbora com Coco",
    prepSeconds: 600,
    waitSeconds: 3600,
    servings: 12,
    notes: "Ótimo acompanhado de queijo meia cura.",
    tags: ["Festa Junina", "Frutas", "Clássico"],
    sections: [
      {
        name: "Doce",
        ingredients: [
          { name: "Abóbora", quantity: "1kg" },
          { name: "Açúcar", quantity: "2 xícaras" },
          { name: "Coco ralado", quantity: "1 xícara" },
          { name: "Cravo-da-índia", quantity: "5 unidades" },
          { name: "Canela em pau", quantity: "1 unidade" },
        ],
        preparation: [
          "Descasque e pique a abóbora em cubos pequenos.",
          "Misture com o açúcar e deixe descansar por 1 hora.",
          "Leve ao fogo com o cravo e a canela.",
          "Cozinhe em fogo médio, mexendo de vez em quando, por 40 minutos.",
          "Adicione o coco ralado e cozinhe por mais 10 minutos.",
          "Deixe esfriar e sirva.",
        ],
      },
    ],
  },
  {
    name: "Bolinho de Chuva",
    prepSeconds: 900,
    waitSeconds: 600,
    servings: 25,
    tags: ["Frito", "Rápido", "Clássico"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Farinha de trigo", quantity: "2 xícaras" },
          { name: "Açúcar", quantity: "3 colheres de sopa" },
          { name: "Ovos", quantity: "2 unidades" },
          { name: "Leite", quantity: "1/2 xícara" },
          { name: "Fermento em pó", quantity: "1 colher de sopa" },
          { name: "Sal", quantity: "1 pitada" },
          { name: "Óleo de girassol", quantity: "para fritar" },
        ],
        preparation: [
          "Misture todos os ingredientes até obter uma massa homogênea.",
          "Aqueça o óleo em fogo médio.",
          "Com uma colher, frite porções da massa até dourar.",
          "Escorra e passe em açúcar e canela.",
        ],
      },
    ],
  },
  {
    name: "Torta de Morango com Creme",
    prepSeconds: 3000,
    waitSeconds: 14400,
    servings: 12,
    tags: ["Frutas", "Torta", "Festa"],
    sections: [
      {
        name: "Massa Podre",
        ingredients: [
          { name: "Farinha de trigo", quantity: "2 xícaras" },
          { name: "Manteiga", quantity: "150g" },
          { name: "Açúcar de confeiteiro", quantity: "1/2 xícara" },
          { name: "Gemas", quantity: "2 unidades" },
          { name: "Sal", quantity: "1 pitada" },
        ],
        preparation: [
          "Misture a farinha, o açúcar e o sal.",
          "Adicione a manteiga fria picada e as gemas.",
          "Forme uma bola sem sovar demais.",
          "Forre uma forma de torta e asse a 180°C por 20 minutos.",
          "Deixe esfriar completamente.",
        ],
      },
      {
        name: "Creme Pâtissière",
        ingredients: [
          { name: "Leite integral", quantity: "500ml" },
          { name: "Gemas", quantity: "4 unidades" },
          { name: "Açúcar", quantity: "100g" },
          { name: "Amido de milho", quantity: "3 colheres de sopa" },
          { name: "Essência de baunilha", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Misture as gemas com o açúcar e o amido.",
          "Aqueça o leite sem ferver e adicione à mistura de gemas.",
          "Volte ao fogo e cozinhe mexendo até engrossar.",
          "Adicione a baunilha, cubra com plástico e deixe esfriar.",
        ],
      },
      {
        name: "Montagem",
        ingredients: [
          { name: "Morangos frescos", quantity: "500g" },
          { name: "Gelatina de morango", quantity: "1 caixinha" },
        ],
        preparation: [
          "Espalhe o creme sobre a massa fria.",
          "Arrume os morangos por cima.",
          "Prepare a gelatina com metade da água indicada e despeje sobre os morangos.",
          "Leve à geladeira por 4 horas.",
        ],
      },
    ],
  },
  {
    name: "Trufa de Chocolate",
    prepSeconds: 1200,
    waitSeconds: 7200,
    servings: 24,
    notes: "Guardar em lugar fresco para não derreter.",
    tags: ["Chocolate", "Festa", "Geladeira"],
    sections: [
      {
        name: "Ganache",
        ingredients: [
          { name: "Chocolate meio amargo", quantity: "300g" },
          { name: "Creme de leite", quantity: "100ml" },
          { name: "Manteiga", quantity: "1 colher de sopa" },
          { name: "Licor de laranja", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Derreta o chocolate em banho-maria.",
          "Misture o creme de leite quente, a manteiga e o licor.",
          "Leve à geladeira por 2 horas.",
          "Enrole em bolinhas e passe no cacau em pó.",
        ],
      },
    ],
  },
  {
    name: "Creme Brûlée de Baunilha",
    prepSeconds: 1800,
    waitSeconds: 18000,
    servings: 6,
    notes: "Use um maçarico para caramelizar o açúcar na hora de servir.",
    tags: ["Forno", "Cremoso", "Especial"],
    sections: [
      {
        name: "Creme",
        ingredients: [
          { name: "Creme de leite fresco", quantity: "500ml" },
          { name: "Gemas", quantity: "5 unidades" },
          { name: "Açúcar", quantity: "100g" },
          { name: "Fava de baunilha", quantity: "1 unidade" },
          { name: "Açúcar cristal", quantity: "para caramelizar" },
        ],
        preparation: [
          "Aqueça o creme de leite com a fava de baunilha aberta.",
          "Bata as gemas com o açúcar até obter um creme pálido.",
          "Adicione o creme quente às gemas aos poucos, mexendo sempre.",
          "Distribua em ramequins e asse em banho-maria a 160°C por 40 minutos.",
          "Deixe esfriar e leve à geladeira por pelo menos 4 horas.",
          "Na hora de servir, polvilhe açúcar cristal e caramelize com maçarico.",
        ],
      },
    ],
  },
  {
    name: "Bolo de Banana com Canela",
    prepSeconds: 900,
    waitSeconds: 2700,
    servings: 10,
    tags: ["Forno", "Frutas", "Rápido"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Banana madura", quantity: "4 unidades" },
          { name: "Ovos", quantity: "3 unidades" },
          { name: "Açúcar", quantity: "1 xícara" },
          { name: "Óleo de girassol", quantity: "1/2 xícara" },
          { name: "Farinha de trigo", quantity: "2 xícaras" },
          { name: "Fermento em pó", quantity: "1 colher de sopa" },
          { name: "Canela em pó", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Amasse as bananas com um garfo.",
          "Misture com os ovos, o açúcar e o óleo.",
          "Adicione a farinha, o fermento e a canela.",
          "Despeje em forma untada e asse a 180°C por 35 minutos.",
        ],
      },
    ],
  },
  {
    name: "Gelado de Morango",
    prepSeconds: 1800,
    waitSeconds: 21600,
    servings: 8,
    tags: ["Geladeira", "Frutas", "Gelado"],
    sections: [
      {
        name: "Sorvete Artesanal",
        ingredients: [
          { name: "Morangos frescos", quantity: "500g" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite fresco", quantity: "300ml" },
          { name: "Suco de limão", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Bata os morangos no liquidificador com o leite condensado e o limão.",
          "Bata o creme de leite em chantilly firme.",
          "Misture delicadamente.",
          "Despeje em pote com tampa e leve ao freezer por 6 horas.",
          "Bata novamente depois de 2 horas para evitar cristais de gelo.",
        ],
      },
    ],
  },
  {
    name: "Tapioca Recheada com Doce de Leite",
    prepSeconds: 600,
    waitSeconds: 300,
    servings: 4,
    tags: ["Rápido", "Sem Glúten", "Café da Manhã"],
    sections: [
      {
        name: "Tapioca",
        ingredients: [
          { name: "Goma de tapioca", quantity: "8 colheres de sopa" },
          { name: "Doce de leite", quantity: "4 colheres de sopa" },
          { name: "Coco ralado", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Espalhe a goma de tapioca numa frigideira antiaderente fria.",
          "Leve ao fogo médio por 2 minutos de cada lado.",
          "Recheie com doce de leite e coco ralado.",
          "Dobre e sirva imediatamente.",
        ],
      },
    ],
  },
  {
    name: "Arroz Doce",
    prepSeconds: 600,
    waitSeconds: 3000,
    servings: 8,
    tags: ["Festa Junina", "Clássico", "Cremoso"],
    sections: [
      {
        name: "Arroz Doce",
        ingredients: [
          { name: "Arroz", quantity: "1 xícara" },
          { name: "Leite integral", quantity: "1 litro" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Canela em pau", quantity: "2 unidades" },
          { name: "Cravo-da-índia", quantity: "3 unidades" },
          { name: "Canela em pó", quantity: "a gosto" },
        ],
        preparation: [
          "Cozinhe o arroz com 2 xícaras de água e a canela em pau.",
          "Quando absorver a água, adicione o leite aos poucos.",
          "Cozinhe em fogo médio por 20 minutos mexendo sempre.",
          "Adicione o leite condensado e cozinhe por mais 10 minutos.",
          "Sirva morno ou gelado com canela em pó.",
        ],
      },
    ],
  },
  {
    name: "Cupcake de Baunilha com Buttercream",
    prepSeconds: 1800,
    waitSeconds: 2400,
    servings: 12,
    tags: ["Forno", "Festa", "Decorado"],
    sections: [
      {
        name: "Cupcake",
        ingredients: [
          { name: "Farinha de trigo", quantity: "1 e 1/2 xícara" },
          { name: "Açúcar", quantity: "1 xícara" },
          { name: "Manteiga", quantity: "1/2 xícara" },
          { name: "Ovos", quantity: "2 unidades" },
          { name: "Leite", quantity: "1/2 xícara" },
          { name: "Essência de baunilha", quantity: "1 colher de chá" },
          { name: "Fermento em pó", quantity: "1 e 1/2 colher de chá" },
        ],
        preparation: [
          "Bata a manteiga com o açúcar até ficar cremoso.",
          "Adicione os ovos um a um e a baunilha.",
          "Alterne farinha e leite, misturando delicadamente.",
          "Distribua em forminhas de cupcake e asse a 180°C por 18 minutos.",
        ],
      },
      {
        name: "Buttercream",
        ingredients: [
          { name: "Manteiga sem sal", quantity: "200g" },
          { name: "Açúcar de confeiteiro", quantity: "3 xícaras" },
          { name: "Leite", quantity: "2 colheres de sopa" },
          { name: "Essência de baunilha", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Bata a manteiga até ficar bem fofa.",
          "Adicione o açúcar aos poucos, batendo sempre.",
          "Adicione o leite e a baunilha e bata por mais 3 minutos.",
          "Decore os cupcakes com saco de confeitar.",
        ],
      },
    ],
  },
  {
    name: "Soufflé de Chocolate",
    prepSeconds: 1800,
    waitSeconds: 1200,
    servings: 6,
    notes: "Servir imediatamente pois murcha rapidamente.",
    tags: ["Forno", "Chocolate", "Especial"],
    sections: [
      {
        name: "Soufflé",
        ingredients: [
          { name: "Chocolate meio amargo", quantity: "200g" },
          { name: "Manteiga", quantity: "50g" },
          { name: "Gemas", quantity: "4 unidades" },
          { name: "Claras", quantity: "4 unidades" },
          { name: "Açúcar", quantity: "80g" },
          { name: "Farinha de trigo", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Unte ramequins com manteiga e polvilhe açúcar.",
          "Derreta o chocolate com a manteiga em banho-maria.",
          "Misture as gemas e a farinha ao chocolate.",
          "Bata as claras em neve firme com o açúcar.",
          "Incorpore delicadamente as claras à mistura de chocolate.",
          "Asse a 200°C por 12 a 14 minutos. Sirva imediatamente.",
        ],
      },
    ],
  },
  {
    name: "Panna Cotta de Coco com Calda de Frutas Vermelhas",
    prepSeconds: 1200,
    waitSeconds: 18000,
    servings: 6,
    tags: ["Geladeira", "Cremoso", "Coco"],
    sections: [
      {
        name: "Panna Cotta",
        ingredients: [
          { name: "Leite de coco", quantity: "400ml" },
          { name: "Creme de leite fresco", quantity: "200ml" },
          { name: "Açúcar", quantity: "4 colheres de sopa" },
          { name: "Gelatina sem sabor", quantity: "12g" },
          { name: "Água", quantity: "4 colheres de sopa" },
        ],
        preparation: [
          "Hidrate a gelatina na água por 5 minutos.",
          "Aqueça o leite de coco e o creme com o açúcar.",
          "Dissolva a gelatina no líquido quente.",
          "Distribua em ramequins e leve à geladeira por 5 horas.",
        ],
      },
      {
        name: "Calda de Frutas Vermelhas",
        ingredients: [
          { name: "Frutas vermelhas mistas", quantity: "300g" },
          { name: "Açúcar", quantity: "3 colheres de sopa" },
          { name: "Suco de limão", quantity: "1 colher de sopa" },
        ],
        preparation: [
          "Cozinhe as frutas com o açúcar e o limão por 10 minutos.",
          "Amasse levemente e deixe esfriar.",
          "Desenforme a panna cotta e sirva com a calda.",
        ],
      },
    ],
  },
  {
    name: "Bolo Red Velvet",
    prepSeconds: 2400,
    waitSeconds: 3600,
    servings: 12,
    tags: ["Forno", "Bolo", "Especial"],
    sections: [
      {
        name: "Bolo",
        ingredients: [
          { name: "Farinha de trigo", quantity: "2 e 1/2 xícaras" },
          { name: "Açúcar", quantity: "1 e 1/2 xícara" },
          { name: "Manteiga", quantity: "120g" },
          { name: "Ovos", quantity: "2 unidades" },
          { name: "Buttermilk", quantity: "1 xícara" },
          { name: "Cacau em pó", quantity: "2 colheres de sopa" },
          { name: "Corante vermelho", quantity: "2 colheres de sopa" },
          { name: "Vinagre branco", quantity: "1 colher de chá" },
          { name: "Bicarbonato de sódio", quantity: "1 colher de chá" },
          { name: "Essência de baunilha", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Preaqueça o forno a 180°C.",
          "Bata a manteiga com o açúcar até ficar fofo.",
          "Adicione os ovos um a um.",
          "Misture o cacau com o corante e adicione.",
          "Alterne buttermilk e farinha.",
          "Por último, adicione o vinagre e o bicarbonato.",
          "Divida em 2 formas redondas untadas e asse por 30 minutos.",
        ],
      },
      {
        name: "Frosting de Cream Cheese",
        ingredients: [
          { name: "Cream cheese", quantity: "400g" },
          { name: "Manteiga sem sal", quantity: "100g" },
          { name: "Açúcar de confeiteiro", quantity: "3 xícaras" },
          { name: "Essência de baunilha", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Bata o cream cheese com a manteiga até ficar homogêneo.",
          "Adicione o açúcar aos poucos e a baunilha.",
          "Recheie e cubra o bolo com o frosting.",
        ],
      },
    ],
  },
  {
    name: "Doce de Leite Caseiro",
    prepSeconds: 300,
    waitSeconds: 7200,
    servings: 8,
    notes: "Nunca abrir a lata enquanto ainda estiver quente.",
    tags: ["Clássico", "Rápido", "Versátil"],
    sections: [
      {
        name: "Doce de Leite",
        ingredients: [
          { name: "Leite condensado", quantity: "2 latas (395g cada)" },
        ],
        preparation: [
          "Coloque as latas fechadas numa panela de pressão cobertas com água.",
          "Cozinhe por 40 minutos após pegar pressão.",
          "Deixe esfriar completamente antes de abrir.",
          "Transfira para um pote e leve à geladeira.",
        ],
      },
    ],
  },
  {
    name: "Cheesecake de Frutas Vermelhas",
    prepSeconds: 3000,
    waitSeconds: 28800,
    servings: 12,
    tags: ["Geladeira", "Frutas", "Torta"],
    sections: [
      {
        name: "Base",
        ingredients: [
          { name: "Biscoito maisena", quantity: "250g" },
          { name: "Manteiga derretida", quantity: "120g" },
          { name: "Açúcar", quantity: "2 colheres de sopa" },
        ],
        preparation: [
          "Triture o biscoito no processador.",
          "Misture com a manteiga e o açúcar.",
          "Forre o fundo de uma forma de aro e pressione bem.",
          "Leve à geladeira por 30 minutos.",
        ],
      },
      {
        name: "Creme",
        ingredients: [
          { name: "Cream cheese", quantity: "600g" },
          { name: "Leite condensado", quantity: "1 lata (395g)" },
          { name: "Creme de leite", quantity: "200ml" },
          { name: "Gelatina sem sabor", quantity: "12g" },
          { name: "Suco de limão", quantity: "3 colheres de sopa" },
        ],
        preparation: [
          "Hidrate a gelatina e dissolva em banho-maria.",
          "Bata o cream cheese, o leite condensado, o creme de leite e o limão.",
          "Incorpore a gelatina.",
          "Despeje sobre a base e leve à geladeira por 8 horas.",
        ],
      },
      {
        name: "Cobertura",
        ingredients: [
          { name: "Frutas vermelhas mistas", quantity: "300g" },
          { name: "Açúcar", quantity: "3 colheres de sopa" },
        ],
        preparation: [
          "Cozinhe as frutas com o açúcar por 10 minutos.",
          "Deixe esfriar e espalhe sobre o cheesecake.",
        ],
      },
    ],
  },
  {
    name: "Suspiro",
    prepSeconds: 1800,
    waitSeconds: 7200,
    servings: 40,
    notes: "Deixar no forno desligado até esfriar para ficar crocante.",
    tags: ["Forno", "Clássico", "Festa"],
    sections: [
      {
        name: "Merengue",
        ingredients: [
          { name: "Claras", quantity: "4 unidades" },
          { name: "Açúcar de confeiteiro", quantity: "2 xícaras" },
          { name: "Suco de limão", quantity: "1 colher de chá" },
        ],
        preparation: [
          "Bata as claras em neve firme com o limão.",
          "Adicione o açúcar aos poucos, batendo sempre.",
          "Coloque em saco de confeitar e faça montinhos numa assadeira forrada.",
          "Asse a 100°C por 1h30.",
          "Desligue o forno e deixe lá por mais 2 horas.",
        ],
      },
    ],
  },
  {
    name: "Bolo de Maçã com Nozes",
    prepSeconds: 1800,
    waitSeconds: 3000,
    servings: 10,
    tags: ["Forno", "Frutas", "Outono"],
    sections: [
      {
        name: "Massa",
        ingredients: [
          { name: "Farinha de trigo", quantity: "2 xícaras" },
          { name: "Açúcar", quantity: "1 e 1/2 xícara" },
          { name: "Ovos", quantity: "3 unidades" },
          { name: "Óleo de girassol", quantity: "3/4 xícara" },
          { name: "Maçã", quantity: "3 unidades médias" },
          { name: "Nozes picadas", quantity: "1 xícara" },
          { name: "Canela em pó", quantity: "1 colher de chá" },
          { name: "Fermento em pó", quantity: "1 colher de chá" },
          { name: "Bicarbonato de sódio", quantity: "1/2 colher de chá" },
          { name: "Sal", quantity: "1/2 colher de chá" },
        ],
        preparation: [
          "Preaqueça o forno a 180°C.",
          "Descasque e pique as maçãs em cubinhos.",
          "Misture os ingredientes secos.",
          "Bata os ovos com o óleo e o açúcar.",
          "Combine tudo e adicione as maçãs e as nozes.",
          "Asse em forma untada por 45 a 50 minutos.",
        ],
      },
    ],
  },
];

async function main() {
  console.log("Seeding recipes...");

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        name: recipe.name,
        prepSeconds: recipe.prepSeconds,
        waitSeconds: recipe.waitSeconds,
        servings: recipe.servings,
        notes: recipe.notes ?? null,
        tags: {
          connectOrCreate: recipe.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        sections: {
          create: recipe.sections.map((section) => ({
            name: section.name,
            preparation: section.preparation,
            ingredients: {
              create: section.ingredients.map((ing) => ({
                quantity: ing.quantity,
                ingredient: {
                  connectOrCreate: {
                    where: { name: ing.name },
                    create: { name: ing.name },
                  },
                },
              })),
            },
          })),
        },
      },
    });
    console.log(`  Created: ${recipe.name}`);
  }

  console.log(`\nDone! ${recipes.length} recipes added.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
