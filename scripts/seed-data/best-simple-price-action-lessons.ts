import { db } from "../../lib/db";
import { lessons } from "../../lib/db/schema";

const LIST_ID = "PLmaCbAD6I1AyI7jO4SiM38hgc2pWgFOG_";

function videoUrl(id: string, index: number) {
  return `https://www.youtube.com/watch?v=${id}&list=${LIST_ID}&index=${index}`;
}

export async function seedLessons() {
  await db.insert(lessons).values([
    {
      title: "Price Action — Les 1: Trends & Consolidatie",
      videoRef: videoUrl("DYCAqd8xorM", 1),
      content:
        "- Trading = een punt kiezen en verwachten dat prijs erboven (buy) of eronder (sell) gaat; dat is geen gokken zolang er een logische, herhaalbare analyse achter zit.\n" +
        "- Drie marktstaten: uptrend (hogere highs + hogere lows), downtrend (lagere highs + lagere lows), en consolidatie (geen van beide — prijs breekt highs én lows door elkaar, geen duidelijke richting).\n" +
        "- Regel: prijs breekt structuur niet zomaar — alleen bij een reversal of tijdens consolidatie. Zolang de structuur (op de hogere timeframe) intact is, blijft de trend geldig.\n" +
        "- Consolidatie = geen regels, dus niet handelen: wacht tot prijs weer duidelijke hogere/lagere highs/lows maakt.",
      quiz: {
        questions: [
          {
            question: "Wat is consolidatie?",
            options: [
              "Prijs die hogere highs en hogere lows blijft maken",
              "Prijs die highs en lows door elkaar breekt zonder duidelijke richting",
              "Een sterke downtrend",
              "Het moment vlak voor market open",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer breekt prijs volgens deze les zijn structuur?",
            options: [
              "Nooit",
              "Alleen bij een reversal of tijdens consolidatie",
              "Elke dag",
              "Alleen op vrijdag",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom is consolidatie geen handelsmoment?",
            options: [
              "Omdat er geen volume is",
              "Omdat het geen duidelijke regels/richting volgt",
              "Omdat het te riskant is",
              "Dat is het wel, juist een goed moment",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de eerste stap die je moet zetten op een chart volgens deze les?",
            options: [
              "Indicators toevoegen",
              "Bepalen of prijs hogere/lagere highs en lows aan het maken is",
              "Nieuws lezen",
              "Meteen een trade openen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het overslaan van trades tijdens duidelijke consolidatie (geen nieuwe hogere/lagere highs/lows) het aantal verlieslatende trades vermindert.",
      order: 7,
    },
    {
      title: "Price Action — Les 2: De Indicatie",
      videoRef: videoUrl("IGIxQD8PBMo", 2),
      content:
        "- Een indicatie ontstaat wanneer prijs een swing high of swing low breekt — dat geeft de richting aan waarin de markt momentum heeft.\n" +
        "- Handel de indicatie zelf niet: na een breakout volgt vaak een correctie die liquiditeit pakt (stop-losses/FOMO-traders eruit) voordat de trend echt doorzet.\n" +
        "- Een indicatie vertelt je twee dingen: waar je entry ongeveer moet liggen (terug boven/onder het gebroken niveau) en waar je exit/target ligt (het volgende niveau van tegenpartij-orders).\n" +
        "- Zoek indicaties vooral op de 1H/4H-timeframe; hoe hoger de timeframe, hoe betrouwbaarder het signaal.",
      quiz: {
        questions: [
          {
            question: "Wanneer ontstaat een indicatie?",
            options: [
              "Als prijs een swing high of swing low breekt",
              "Als de RSI oversold is",
              "Elke maandag",
              "Als er nieuws is",
            ],
            correctIndex: 0,
          },
          {
            question: "Moet je een indicatie direct handelen?",
            options: [
              "Ja, altijd meteen instappen",
              "Nee, eerst wachten op de correctie/liquiditeitsgrab",
              "Alleen op de 5-minuten chart",
              "Alleen als het weekend is",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat vertelt een indicatie je over je target?",
            options: [
              "Niets, targets zijn willekeurig",
              "Het wijst naar het volgende niveau van tegenpartij-orders",
              "Altijd 100 pips",
              "De vorige candle-kleur",
            ],
            correctIndex: 1,
          },
          {
            question: "Op welke timeframe zoek je volgens deze les vooral naar indicaties?",
            options: ["1 minuut", "1H/4H", "Alleen maandgrafiek", "Het maakt niet uit"],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op de correctie ná een indicatie (in plaats van direct op de breakout instappen) een hogere winrate geeft.",
      order: 8,
    },
    {
      title: "Price Action — Les 3: Liquiditeit & Correcties",
      videoRef: videoUrl("lTZCJYMQB9Q", 3),
      content:
        "- Elk prijsniveau 'kost geld' om te breken: prijs consolideert vaak om genoeg kracht (orders) te verzamelen voordat het een niveau doorbreekt (vergelijk: een cola-flesje schudden voor het open gaat).\n" +
        "- Na een indicatie (breakout) volgt de correctie: de markt haalt liquiditeit op bij zowel de vroege breakout-traders als de latere FOMO-instappers, voordat de trend echt doorzet.\n" +
        "- Werkwijze: markeer je niveaus op de 1H/4H, maar monitor de correctie zelf op de 15-minuten-timeframe — dat laat het beste zien wanneer de correctie voorbij is.\n" +
        "- Een correctie duurt niet altijd even lang of even diep — je kan niet voorspellen wanneer hij stopt, wel herkennen wanneer hij eindigt (structuurverandering op de lagere timeframe).",
      quiz: {
        questions: [
          {
            question: "Waarom consolideert prijs soms vlak voor een grote beweging?",
            options: [
              "Toeval",
              "Om genoeg orders/kracht te verzamelen om het niveau te breken",
              "Omdat de markt gesloten is",
              "Om spread te verlagen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wie raakt normaal geliquideerd tijdens een correctie?",
            options: [
              "Alleen de marktmakers",
              "Zowel vroege breakout-traders als late FOMO-instappers",
              "Niemand, correcties raken niemand",
              "Alleen bots",
            ],
            correctIndex: 1,
          },
          {
            question: "Op welke timeframe monitor je een correctie volgens deze les?",
            options: ["Maandgrafiek", "15 minuten", "1 minuut", "Wekelijks"],
            correctIndex: 1,
          },
          {
            question: "Kun je voorspellen wanneer een correctie precies stopt?",
            options: [
              "Ja, altijd na exact 3 candles",
              "Nee, wel herken je wanneer hij eindigt via een structuurverandering",
              "Ja, met Fibonacci exact",
              "Correcties stoppen nooit",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het monitoren van correcties op de 15m-timeframe (in plaats van puur op de 1H) een preciezere entry-timing oplevert.",
      order: 9,
    },
    {
      title: "Price Action — Les 4: Entries via de Continuation",
      videoRef: videoUrl("mUNI_MgY1g8", 4),
      content:
        "- De continuation is het echte entry-moment: pas nadat de correctie voorbij is en prijs de trend hervat, stap je in — niet op de eerste breakout (indicatie).\n" +
        "- Indicaties maken altijd een nieuwe high of nieuwe low; als dat niet gebeurt, is het geen indicatie.\n" +
        "- Bij het zoeken naar een setup: kijk niet te ver terug — de meest recente 3-4 dagen/sessies zijn meestal genoeg om je high/low te vinden.\n" +
        "- Voor precisie in je entry: zoom in naar 15m/5m om te zien of de correctie daadwerkelijk is afgerond (structuurwissel terug in de trendrichting), voordat je op de hogere timeframe instapt.",
      quiz: {
        questions: [
          {
            question: "Wanneer stap je in volgens deze les — bij de indicatie of bij de continuation?",
            options: [
              "Bij de indicatie",
              "Bij de continuation, na de correctie",
              "Altijd bij een nieuwe high",
              "Nooit, alleen kijken",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat maakt een indicatie altijd?",
            options: ["Een gelijke high", "Een nieuwe high of nieuwe low", "Een dubbele bodem", "Niks specifieks"],
            correctIndex: 1,
          },
          {
            question: "Hoe ver terug moet je normaal kijken om je high/low te vinden?",
            options: ["30 jaar", "Ongeveer de laatste 3-4 dagen/sessies", "Altijd het hele jaar", "1 candle"],
            correctIndex: 1,
          },
          {
            question: "Waarom zoom je in naar 15m/5m voor je entry?",
            options: [
              "Om de structuurwissel/einde van de correctie preciezer te zien",
              "Om de hogere timeframe te negeren",
              "Voor de spread",
              "Dat hoeft niet",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of entries op de continuation (na bevestigde correctie-afronding op 15m/5m) een betere RR geven dan entries direct op de indicatie/breakout.",
      order: 10,
    },
    {
      title: "Price Action — Les 5: Reactieniveaus (Buyers vs. Sellers)",
      videoRef: videoUrl("g7xP6frMv0w", 5),
      content:
        "- Elk high/low-niveau vertegenwoordigt een groep buyers of sellers: boven een swing low zit potentiële bullishness, onder een swing high zit potentiële bearishness.\n" +
        "- Je entry moet komen van het niveau waar het bullish/bearish momentum daadwerkelijk begon (de reactie), niet van een willekeurig support/resistance-niveau.\n" +
        "- Zodra prijs een niveau met eerdere sellers doorbreekt, is dat een teken dat kopers sterker zijn geworden dan de daar zittende verkopers — en andersom.\n" +
        "- Denk in reacties, niet in voorspellingen: volg wat prijs laat zien (waar het stopt, waar het versnelt) in plaats van te proberen te raden waar het naartoe gaat.",
      quiz: {
        questions: [
          {
            question: "Wat betekent 'potentiële bullishness' in deze les?",
            options: ["Alles onder een swing high", "Alles boven een swing low", "Alleen groene candles", "De 200MA"],
            correctIndex: 1,
          },
          {
            question: "Waar moet je entry idealiter vandaan komen?",
            options: [
              "Een willekeurig rond getal",
              "Het niveau waar het momentum daadwerkelijk begon",
              "Altijd de vorige candle",
              "De opening van de dag",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat betekent het als prijs een niveau met eerdere sellers doorbreekt?",
            options: [
              "Niets bijzonders",
              "Kopers zijn sterker geworden dan die verkopers",
              "De markt is dicht",
              "Een fout op de chart",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is het advies van deze les over 'voorspellen'?",
            options: [
              "Voorspel zo nauwkeurig mogelijk met indicatoren",
              "Volg de reacties die prijs laat zien in plaats van te voorspellen",
              "Vraag het een guru",
              "Gebruik altijd Fibonacci-voorspellingen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of entries die wachten op een bevestigde 'reactie' (prijs die aantoonbaar sneller beweegt na het doorbreken van een niveau) een hogere winrate geven dan entries direct op de break zelf.",
      order: 11,
    },
    {
      title: "Price Action — Les 6: Timeframe-correlatie",
      videoRef: videoUrl("z38sGgvY9XY", 6),
      content:
        "- Bepaal eerst je niveaus op de 1H (of hoger) — dat geeft duidelijkheid over waar koop- en verkoopdruk zit.\n" +
        "- Zodra prijs op de 1H een niveau breekt (indicatie) en corrigeert, schakel je over naar de 15-minuten-timeframe om te zien wanneer de correctie eindigt en de continuation begint.\n" +
        "- Een setup is pas geldig als de timeframes met elkaar overeenkomen: als de 1H bearish is, moet de 15m ook bearish structuur laten zien voordat je een sell neemt.\n" +
        "- Combineer dit met sessietiming (bv. New York-sessie) voor de beste kans op volume/beweging in de richting die je verwacht.",
      quiz: {
        questions: [
          {
            question: "Op welke timeframe bepaal je eerst je niveaus?",
            options: ["5 minuten", "1H (of hoger)", "1 minuut", "Maandelijks"],
            correctIndex: 1,
          },
          {
            question: "Wanneer schakel je over naar de 15-minuten-timeframe volgens deze les?",
            options: [
              "Altijd, meteen bij het openen van de chart",
              "Zodra de 1H een correctie ingaat na een indicatie",
              "Nooit",
              "Alleen in het weekend",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer is een setup pas geldig volgens deze les?",
            options: [
              "Als slechts één timeframe een signaal geeft",
              "Als de timeframes met elkaar overeenkomen",
              "Als de RSI 50 is",
              "Willekeurig",
            ],
            correctIndex: 1,
          },
          {
            question: "Welk extra element raadt deze les aan naast timeframe-correlatie?",
            options: [
              "Sessietiming (bv. New York-sessie)",
              "Altijd 's nachts handelen",
              "Nooit op een vaste sessie letten",
              "Alleen weekend-trading",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of setups die zowel op 1H als 15m dezelfde richting bevestigen (timeframe-correlatie) een hogere winrate geven dan setups die alleen op één timeframe worden genomen.",
      order: 12,
    },
    {
      title: "Price Action — Les 7: Charts markeren (swing highs/lows)",
      videoRef: videoUrl("dnY6INL7kXA", 7),
      content:
        "- Werk top-down: bepaal eerst waar de huidige prijs staat, zoek dan de dichtstbijzijnde vorige high en low op de 1H/4H.\n" +
        "- Elke nieuwe high moet een bijbehorend supportniveau (de oorzaak ervan) hebben — teken dat erbij, want dat wordt je referentiepunt voor een eventuele sell.\n" +
        "- Zodra volume/sessie binnenkomt (bv. London-sessie) kan die eerdere structuur een indicatie, correctie en continuation opleveren binnen dezelfde sessie — of pas de volgende dag.\n" +
        "- Houd je chart schoon: je hebt maar een handvol niveaus (swing highs/lows) nodig, niet tientallen lijnen.",
      quiz: {
        questions: [
          {
            question: "Wat is de eerste stap bij het markeren van je chart volgens deze les?",
            options: [
              "Alle indicatoren aanzetten",
              "Bepalen waar de huidige prijs staat en de dichtstbijzijnde high/low zoeken",
              "Een trade openen",
              "Nieuws lezen",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom moet elke nieuwe high een bijbehorend supportniveau hebben?",
            options: [
              "Dat hoeft niet",
              "Omdat dat niveau de oorzaak/referentiepunt is voor een latere sell",
              "Voor de esthetiek",
              "Om spread te meten",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat adviseert deze les over hoeveel niveaus je op je chart zet?",
            options: [
              "Zoveel mogelijk lijnen",
              "Een handvol — houd je chart schoon",
              "Alleen kleuren, geen lijnen",
              "Precies 50 lijnen",
            ],
            correctIndex: 1,
          },
          {
            question: "Kan een indicatie, correctie én continuation binnen één sessie gebeuren?",
            options: [
              "Nee, nooit",
              "Ja, dat kan, maar het kan ook een dag langer duren",
              "Alleen in het weekend",
              "Alleen op maandag",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of een opgeschoonde chart (alleen de laatste 1-3 sessies aan swing highs/lows) tot snellere en consistentere setup-herkenning leidt dan een chart met veel historische niveaus.",
      order: 13,
    },
    {
      title: "Price Action — Les 8: Risicomanagement & Mindset",
      videoRef: videoUrl("Vnwa2LaVerw", 8),
      content:
        "- Bouw eerst kapitaal op naast een baan/inkomen voordat je met echt (of serieus) geld handelt; oefen ondertussen op demo en beoordeel jezelf op consistentie, niet op één gelukstreffer.\n" +
        "- Vuistregel uit deze les: risico rond 5-10% van je account per trade, mikkend op een 1:3 tot 1:4 risk-reward — zo zijn twee goede trades per week al genoeg voor een 'salaris'.\n" +
        "- Denk in 'positionering' in plaats van losse trades: een goede positie geeft je opties (partials nemen, langer aanhouden), een slechte positie dwingt je tot reageren op verlies.\n" +
        "- Zet je stop-loss op een niveau dat, als het geraakt wordt, ook daadwerkelijk je analyse ongeldig maakt — niet een willekeurige afstand in pips.",
      quiz: {
        questions: [
          {
            question: "Wat is het advies over kapitaal opbouwen in deze les?",
            options: [
              "Direct met je laatste geld handelen",
              "Eerst kapitaal opbouwen naast een baan en oefenen op demo",
              "Altijd lenen om te handelen",
              "Nooit demo gebruiken",
            ],
            correctIndex: 1,
          },
          {
            question: "Welke risk-reward-verhouding wordt in deze les als richtlijn genoemd?",
            options: ["1:0.5", "1:3 tot 1:4", "1:1 altijd", "Geen richtlijn nodig"],
            correctIndex: 1,
          },
          {
            question: "Wat betekent 'denken in positionering' volgens deze les?",
            options: [
              "Elke trade is hetzelfde, geen verschil",
              "Een goede positie geeft je keuzes (partials, langer aanhouden) i.p.v. puur reageren op verlies",
              "Altijd all-in gaan",
              "Nooit een stop-loss zetten",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar moet je stop-loss volgens deze les op gebaseerd zijn?",
            options: [
              "Een vast aantal pips, altijd hetzelfde",
              "Een niveau dat je analyse daadwerkelijk ongeldig maakt",
              "Wat de broker aanraadt",
              "Er hoeft geen stop-loss",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het risico per trade begrenzen op basis van een vaste account-percentage (i.p.v. vaste pip-afstand) tot een stabielere equity curve leidt over meerdere weken.",
      order: 14,
    },
    {
      title: "Price Action — Les 9: Reversals herkennen",
      videoRef: videoUrl("kTeVIscVr2Q", 9),
      content:
        "- Zolang een trend zijn structuur respecteert (bv. elke high in een downtrend lager dan de vorige), blijft de trend geldig — zodra dat patroon breekt (een hogere high in een downtrend), moet je open staan voor een trendwissel.\n" +
        "- Een reversal-signaal wordt sterker wanneer meerdere lagere-timeframe-tekenen samenkomen: gebroken support, een lower high die eerder niet gebroken werd, en sessie-volume dat instroomt.\n" +
        "- Zodra prijs boven/onder een cruciaal niveau sluit én de eerstvolgende candle bevestigt, is dat een sterker signaal dan alleen een wick door het niveau.\n" +
        "- Blijf bij je eerdere reactie-analyse (waar kwamen kopers/verkopers eerder al in actie): een niveau dat eerder al sterke reacties gaf, is waarschijnlijker om dat weer te doen.",
      quiz: {
        questions: [
          {
            question: "Wanneer moet je open staan voor een trendwissel?",
            options: [
              "Nooit, trends veranderen niet",
              "Zodra de trend zijn eigen structuurpatroon breekt (bv. een hogere high in een downtrend)",
              "Elke vrijdag",
              "Willekeurig",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat maakt een reversal-signaal sterker volgens deze les?",
            options: [
              "Eén losse candle",
              "Meerdere samenkomende lagere-timeframe-tekenen (gebroken support, lower high, volume)",
              "Alleen de kleur van de candle",
              "Niks, alle signalen zijn gelijk",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een sterker signaal dan een wick door een niveau?",
            options: [
              "Een gesloten (candle close) doorbraak met bevestiging van de volgende candle",
              "Een wick alleen",
              "Volume alleen",
              "Er is geen verschil",
            ],
            correctIndex: 0,
          },
          {
            question: "Waarom kijk je naar eerdere reacties op een niveau?",
            options: [
              "Omdat een niveau dat eerder sterk reageerde dat waarschijnlijk weer doet",
              "Dat is puur decoratief",
              "Om de spread te berekenen",
              "Reacties herhalen nooit",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op een bevestigde candle-close-doorbraak (i.p.v. een wick) door een cruciaal niveau het aantal fout-positieve reversal-signalen vermindert.",
      order: 15,
    },
    {
      title: "Price Action — Les 10: Swing highs/lows & de No-Trade Zone",
      videoRef: videoUrl("qA0IgH6rohg", 10),
      content:
        "- Beperk je markup tot ongeveer 1-3 recente sessies — je hebt niet meer nodig om je swing highs en lows te vinden.\n" +
        "- Een 'no-trade zone' is het gebied tussen een high en een low zónder indicatie: zolang er geen breakout is geweest, weet je simpelweg nog niet welke kant de markt op gaat, dus handel je niet.\n" +
        "- Zodra er indicaties aan zowel de boven- als onderkant zijn geweest (prijs heeft beide swing-niveaus getest), wacht je op de sessie met het meeste volume om te bepalen welke kant wint.\n" +
        "- Een pivot high/low-indicator kan helpen om swing highs/lows te spotten, maar vertrouw niet blind op de indicator — train je eigen oog.",
      quiz: {
        questions: [
          {
            question: "Hoeveel sessies terug moet je volgens deze les ongeveer markeren?",
            options: ["30 dagen", "Ongeveer 1-3 sessies", "Een heel jaar", "Maakt niet uit"],
            correctIndex: 1,
          },
          {
            question: "Wat is een 'no-trade zone'?",
            options: [
              "Een gebied met hoge spread",
              "Het gebied tussen een high en low zonder indicatie",
              "Het weekend",
              "Een gebied met veel nieuws",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat doe je als er indicaties aan beide kanten (boven én onder) zijn geweest?",
            options: [
              "Meteen random een kant kiezen",
              "Wachten op de sessie met het meeste volume om te bepalen welke kant wint",
              "Stoppen met handelen voorgoed",
              "Altijd long gaan",
            ],
            correctIndex: 1,
          },
          {
            question: "Hoe gebruik je een pivot high/low-indicator volgens deze les?",
            options: [
              "Blind vertrouwen, nooit zelf checken",
              "Als hulpmiddel, maar train ook je eigen oog",
              "Nooit gebruiken",
              "Alleen op de weekchart",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het strikt vermijden van trades binnen een 'no-trade zone' (geen indicatie aan weerszijden) het aantal premature/verlieslatende entries vermindert.",
      order: 16,
    },
    {
      title: "Price Action — Les 11: Market structure als fundament",
      videoRef: videoUrl("KqVnX1Rn77M", 11),
      content:
        "- Market structure (swing highs/lows die hogere/lagere highs en lows vormen) is het enige dat je echt nodig hebt — geen indicators, geen chart patterns.\n" +
        "- ICC is geen aparte 'strategie', maar simpelweg een vereenvoudigde manier om market structure en price action uit te leggen.\n" +
        "- 'Original creator'-principe: elke high/low is veroorzaakt door een eerder niveau; zolang dat niveau niet doorbroken wordt, blijft de structuur (en dus je bias) geldig.\n" +
        "- Extra bevestiging vind je door te kijken of prijs eerder al eens boven eenzelfde niveau van sellers is uitgebroken — een herhaalde reactie verhoogt de waarschijnlijkheid van een geldige entry.",
      quiz: {
        questions: [
          {
            question: "Wat noemt deze les als het enige dat je écht nodig hebt om te handelen?",
            options: [
              "Meerdere indicators tegelijk",
              "Market structure (swing highs/lows)",
              "Chart patterns zoals hoofd-schouders",
              "Nieuws-analyse",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is ICC volgens deze les?",
            options: [
              "Een geheime formule",
              "Een vereenvoudigde manier om market structure/price action uit te leggen",
              "Een broker",
              "Een indicator",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat gebeurt er als het 'original creator'-niveau van een structuur wordt doorbroken?",
            options: [
              "Niets, het is genegeerd",
              "De structuur/bias is niet langer geldig — teken van een mogelijke reversal",
              "De trade wordt automatisch gesloten",
              "Dat kan niet gebeuren",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat verhoogt volgens deze les de waarschijnlijkheid van een geldige entry?",
            options: [
              "Een herhaalde reactie op hetzelfde niveau in het verleden",
              "Een willekeurig rond getal",
              "De dag van de week",
              "Niets, alle entries zijn gelijk",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of entries op niveaus met een herhaalde historische reactie (meerdere eerdere keren afgewezen/doorbroken) een hogere winrate geven dan entries op niveaus zonder zo'n geschiedenis.",
      order: 17,
    },
    {
      title: "Price Action — Les 12: Marktbeslissingen & confluentie",
      videoRef: videoUrl("t79RzQuzYfo", 12),
      content:
        "- Voordat je een trade neemt, moet je een 'marktbeslissing' maken: is er genoeg bullish of bearish bevestiging over meerdere timeframes, of is het nog tegenstrijdig?\n" +
        "- Regel: om te kopen moet prijs boven een swing high breken; om te verkopen moet prijs onder een swing low breken — zolang dat niet gebeurt, blijft het bij die kant 'potentieel', niet bevestigd.\n" +
        "- Als hogere en lagere timeframes elkaar tegenspreken, geef je voorrang aan de hogere timeframe, maar let op: soms bouwt de lagere timeframe eerst structuur op die de hogere timeframe later volgt.\n" +
        "- Het is oké om een trade te missen voor extra bevestiging — je hebt geen 100% van elke move nodig, alleen consistente, onderbouwde beslissingen.",
      quiz: {
        questions: [
          {
            question: "Wat moet er gebeuren voordat je 'koop' als bevestigd beschouwt?",
            options: [
              "Niets, altijd meteen kopen",
              "Prijs moet boven een swing high breken",
              "De RSI moet 70 zijn",
              "Er moet nieuws zijn",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat doe je als hogere en lagere timeframe elkaar tegenspreken?",
            options: [
              "Altijd de lagere timeframe volgen",
              "Voorrang geven aan de hogere timeframe, met oog voor opbouw op de lagere",
              "Munt opgooien",
              "Niet meer handelen, ooit",
            ],
            correctIndex: 1,
          },
          {
            question: "Is het volgens deze les een probleem om een trade te missen voor extra bevestiging?",
            options: [
              "Ja, altijd een groot probleem",
              "Nee, dat is oké — consistentie is belangrijker dan elke move pakken",
              "Ja, want je moet elke move pakken",
              "Alleen op vrijdag een probleem",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een 'marktbeslissing' in deze les?",
            options: [
              "Een gok",
              "De afweging of er genoeg multi-timeframe bevestiging is om te handelen",
              "Een vaste regel zonder uitzondering",
              "Het kiezen van een broker",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op multi-timeframe confluentie (in plaats van te handelen op signalen van slechts één timeframe) het aantal tegenstrijdige/verliesgevende trades vermindert.",
      order: 18,
    },
    {
      title: "Price Action — Les 13: Positionering & risicomindset",
      videoRef: videoUrl("uR_F79sJXlk", 13),
      content:
        "- Zie een trade niet als een losse gok, maar als een 'positie': een goede positie geeft je later keuzevrijheid (partials nemen, langer aanhouden), een slechte positie dwingt je tot puur reageren.\n" +
        "- Zet nooit je laatste geld in — bouw eerst een aparte, bewuste trading-pot op (dit voorkomt dat één verlies je financieel in de problemen brengt).\n" +
        "- Oefen eerst op demo tot je consistente resultaten ziet (niet één gelukstreffer, maar een periode van stabiele groei) voordat je met echt geld handelt.\n" +
        "- Psychologie is minstens zo belangrijk als de chart zelf: angst en hebzucht zorgen voor premature entries en exits — bouw vertrouwen op in je proces via herhaling en documentatie van je trades.",
      quiz: {
        questions: [
          {
            question: "Wat is het verschil tussen 'een trade' en 'een positie' volgens deze les?",
            options: [
              "Geen verschil",
              "Een positie geeft je later keuzevrijheid, een trade is puur reactief",
              "Een positie is altijd verliesgevend",
              "Een trade duurt langer",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is het advies over welk geld je mag inzetten?",
            options: [
              "Je laatste geld, dat geeft extra motivatie",
              "Nooit je laatste geld — bouw een aparte trading-pot op",
              "Geleend geld",
              "Maakt niet uit",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer mag je van demo naar live overstappen volgens deze les?",
            options: [
              "Meteen na dag 1",
              "Als je consistente resultaten ziet over een periode, niet na één gelukstreffer",
              "Nooit, blijf altijd op demo",
              "Zodra je een aanbieding ziet",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom is psychologie belangrijk in deze les?",
            options: [
              "Is het niet, alleen techniek telt",
              "Angst en hebzucht veroorzaken premature entries/exits",
              "Alleen voor beginners",
              "Puur voor de show",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het bijhouden van een trade-journal (documenteren van elke beslissing en emotie) het aantal impulsieve, niet-onderbouwde entries vermindert over een maand.",
      order: 19,
    },
    {
      title: "Price Action — Les 14: Market structure verdiept — momentum & 'respect'",
      videoRef: videoUrl("Y7Q37vTbuNg", 14),
      content:
        "- Kernregel herhaald: een hogere high vereist een hogere low (en andersom); een lagere high vereist een lagere low. Dit is op de hogere timeframe (1H/4H/Daily) sterk ('highly respected'), op lagere timeframes minder betrouwbaar.\n" +
        "- Lagere en hogere timeframes werken samen: terwijl de hogere timeframe corrigeert, bouwt de lagere timeframe vaak al vroege tekenen van de volgende zet op — dat kan je een voorsprong geven.\n" +
        "- Denk aan trends als golven van momentum: een impuls verzamelt 'kracht' tijdens de pullback en gebruikt die om de volgende leg te maken; zwakker wordende impulsen (kleinere pushes) zijn vaak een teken dat een trend uitgeput raakt.\n" +
        "- Zodra een structuurpatroon (bv. lagere highs/lagere lows in een downtrend) breekt door een nieuwe hogere low, moet je open staan voor een mogelijke trendwissel — ook al is dat nog niet 100% zeker.",
      quiz: {
        questions: [
          {
            question: "Wat betekent 'highly respected' in deze les?",
            options: [
              "Dat de indicator perfect is",
              "Dat structuurregels sterker/betrouwbaarder zijn op de hogere timeframe",
              "Dat je de broker moet respecteren",
              "Niets specifieks",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat kan de lagere timeframe doen terwijl de hogere timeframe corrigeert?",
            options: [
              "Niets, ze zijn onafhankelijk",
              "Al vroege tekenen van de volgende zet tonen",
              "Altijd tegenovergesteld bewegen",
              "Stoppen met bewegen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat gebeurt er volgens de 'golf'-analogie tijdens een pullback?",
            options: [
              "Er gebeurt niets",
              "De trend verzamelt 'kracht'/momentum voor de volgende leg",
              "De trend stopt altijd definitief",
              "Volume verdwijnt volledig",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een teken dat een trend mogelijk uitgeput raakt?",
            options: [
              "Steeds grotere pushes",
              "Zwakker wordende, kleinere pushes",
              "Meer volume elke keer",
              "Niets is een teken, trends stoppen willekeurig",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het monitoren van pushgrootte (afnemende impuls-candles) als vroeg-waarschuwingssignaal helpt om eerder partials te nemen vlak voor een trendwissel.",
      order: 20,
    },
  ]);

  console.log("Seeded 14 lessons (Best Simple Price Action Trading Course).");
}
