import { db } from "../../lib/db";
import { lessons } from "../../lib/db/schema";

export async function seedLessons() {
  await db.insert(lessons).values([
    {
      title: "SCI — Les 1: Trends & Market Structure",
      videoRef:
        "https://www.youtube.com/watch?v=PYVr6O6p_V4&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=1",
      content:
        "- Prijs kan maar twee richtingen op: uptrend of downtrend.\n" +
        "- Market structure is de basis van elke trade en is het sterkst/betrouwbaarst op hogere timeframes (1H, 4H, Daily).\n" +
        "- Uptrend = hogere highs (HH) + hogere lows (HL). Downtrend = lagere highs (LH) + lagere lows (LL).\n" +
        "- Je kan pas van een 'hogere/lagere' high/low spreken zodra er een vergelijkingspunt is — in een range bestaat geen HH/HL/LH/LL.\n" +
        "- Kernregel: HL → verwacht HH. HH → verwacht HL. LH → verwacht LL. LL → verwacht LH. Hoe hoger de timeframe, hoe sterker deze regel geldt.\n" +
        "- Praktisch: zoek eerst je eerste H en L op de chart (evt. met een pivot high/low indicator), en wacht op een break om een HH/LL te bevestigen.",
      quiz: {
        questions: [
          {
            question: "Wat is een uptrend?",
            options: [
              "Hogere highs en hogere lows",
              "Lagere highs en lagere lows",
              "Prijs die zijwaarts beweegt",
              "Alleen groene candles",
            ],
            correctIndex: 0,
          },
          {
            question: "Wanneer mag je een high pas 'higher high' noemen?",
            options: [
              "Zodra prijs erboven sluit",
              "Zodra er een vorige high is om mee te vergelijken",
              "Na 3 candles",
              "Nooit, dat bepaalt de indicator",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Volgens de regel uit de video: als prijs een HL maakt, wat verwacht je daarna?",
            options: ["Een LL", "Een HH", "Een range", "Niets, het is willekeurig"],
            correctIndex: 1,
          },
          {
            question:
              "Op welke timeframes is market structure volgens deze les het meest betrouwbaar?",
            options: ["1 min / 5 min", "1H, 4H, Daily", "Alleen Daily", "Alleen weekly"],
            correctIndex: 1,
          },
          {
            question: "Wat kun je NOG NIET zeggen zolang prijs in een range zit?",
            options: [
              "Of het een up- of downtrend is",
              "De candle-kleur",
              "De timeframe",
              "De asset naam",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Zodra prijs op de 1H/4H/Daily een bevestigde HL vormt na een eerdere HH, zoek ik een long-entry vanaf die HL, met als aanname dat de higher-timeframe structuur intact blijft.",
      order: 1,
    },
    {
      title: "SCI — Les 2: Market Structure Rules",
      videoRef:
        "https://www.youtube.com/watch?v=3NDqGuITSpk&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=2",
      content:
        "- Koop nooit op een higher high (HH): dat is de indicatie, niet de entry. Na een HH verwacht je een higher low (HL) — dáár zoek je je buy.\n" +
        "- Verkoop nooit op een lower low (LL): dat is de indicatie voor sells. Na een LL verwacht je een lower high (LH) — dáár zoek je je sell.\n" +
        "- Neem pas een trade als de relevante timeframes uitlijnen (bv. 4H en 1H beide bullish/bearish); prijs beweegt niet 'solo' op één timeframe.\n" +
        "- Model: resistance = sellers, support = buyers. Trading is orders uitwisselen: kopers 'betalen' verkopers om door een niveau te breken. Een pullback (higher low) is kopers die extra 'geld' ophalen om de volgende laag verkopers te kunnen passeren.\n" +
        "- Kies pairs/assets waar de markt waarde in ziet (waarde brengt volume); wees geduldig — één tot twee goede trades per week op de hogere timeframe is voldoende.",
      quiz: {
        questions: [
          {
            question: "Waarom koop je volgens deze les niet op een higher high?",
            options: [
              "Omdat het te duur is",
              "Omdat een HH de indicatie is en de HL de eigenlijke entry",
              "Omdat higher highs niet bestaan",
              "Omdat je alleen op de daily mag handelen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de regel voor sell-entries?",
            options: [
              "Verkopen op de lower low zelf",
              "Wachten op de lower high die volgt op de lower low",
              "Verkopen zodra prijs boven de 200MA komt",
              "Verkopen op elk rood signaal",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Waarom moeten timeframes 'aligned' zijn voordat je een trade neemt?",
            options: [
              "Voor de esthetiek van de chart",
              "Omdat prijs niet solo beweegt — meerdere timeframes die dezelfde richting bevestigen geven een sterkere trend",
              "Omdat de broker dat vereist",
              "Dat hoeft niet, één timeframe is genoeg",
            ],
            correctIndex: 1,
          },
          {
            question:
              "In de resistance/support-analogie van deze les: wat gebeurt er bij een pullback (higher low) in een uptrend?",
            options: [
              "De trend is voorbij",
              "Kopers halen extra 'orders' op om de volgende groep verkopers te kunnen passeren",
              "Verkopers nemen over",
              "Niets, het is willekeurig",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op een bevestigde HL na een HH (in plaats van direct instappen op de HH) een hogere winrate/RR oplevert.",
      order: 2,
    },
    {
      title: "SCI — Les 3: ICC — Indication, Correction, Continuation",
      videoRef:
        "https://www.youtube.com/watch?v=fDtZbxeNWyw&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=3",
      content:
        "- ICC bestaat uit drie fases: Indication (een nieuwe high/low die een swing-niveau breekt), Correction (een pullback die een HL of LH vormt zonder de structuur te breken) en Continuation (prijs zet door richting/voorbij de indicatie).\n" +
        "- Je entry-niveau is vrijwel altijd het niveau van de indicatie zelf: zodra prijs erboven (bij een bullish indicatie) terugkomt, is dat je instapzone.\n" +
        "- Werk top-down: bevestig eerst de indicatie op de hogere timeframe (bv. 4H), zoom daarna in (1H) om te zien of de correctie voltooid is.\n" +
        "- Een geldige correctie mag terugkomen tot een eerder niveau, maar mag géén nieuwe structuurbreuk in de tegenovergestelde richting maken — dat is een waarschuwingssignaal.",
      quiz: {
        questions: [
          {
            question: "Wat is de Indication in ICC?",
            options: [
              "De laatste candle van de dag",
              "Een nieuwe high/low die een swing-niveau breekt en een richting aangeeft",
              "Een indicator zoals RSI",
              "Het gemiddelde van de laatste 10 candles",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar ligt volgens deze les meestal je entry-niveau?",
            options: [
              "Altijd op de 50% Fibonacci",
              "Op het niveau van de indicatie zelf",
              "Op de all-time high",
              "Willekeurig, dat maakt niet uit",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de juiste volgorde van de ICC-cyclus?",
            options: [
              "Continuation → Correction → Indication",
              "Correction → Indication → Continuation",
              "Indication → Correction → Continuation",
              "Indication → Continuation → Correction",
            ],
            correctIndex: 2,
          },
          {
            question: "Waarom werk je top-down (bv. van 4H naar 1H)?",
            options: [
              "Om de 4H-indicatie te bevestigen en op de 1H te checken of de correctie klaar is",
              "Omdat de 1H altijd leidend is",
              "Dat hoeft niet, één timeframe volstaat altijd",
              "Om de spread te controleren",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of instappen exact op het break-niveau van de indicatie een betere RR geeft dan wachten op een dieper 50%+ retracement.",
      order: 3,
    },
    {
      title: "SCI — Les 4: Corrections doorgronden (top-down)",
      videoRef:
        "https://www.youtube.com/watch?v=lcodvDq2jx4&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=4",
      content:
        "- Werkwijze in drie lagen: hogere timeframe (bv. 4H) om de trend te identificeren, midden-timeframe (1H) om de 'flow' bij te houden, kleinere timeframe (15M) voor de detail-entry.\n" +
        "- Een correctie bestaat altijd uit óf een lower high, óf een higher low — nooit een volledige structuurbreuk op de hogere timeframe. Zolang die hogere-timeframe-structuur intact blijft, is een tegengestelde beweging op een lager timeframe 'maar' een correctie, geen trendwissel.\n" +
        "- Je kan niet voorspellen wánneer een correctie start, maar wel herkennen wanneer hij eindigt: zodra het kleinere timeframe weer een eigen ICC (nieuwe break in de oorspronkelijke richting) laat zien dat aansluit bij de hogere timeframe.\n" +
        "- Een gebied tussen een recent hoog en laag op het kleinste timeframe is een 'no-trade zone' totdat prijs één kant kiest.",
      quiz: {
        questions: [
          {
            question: "Wat is de rol van de kleinste timeframe (bv. 15M) in deze methode?",
            options: [
              "Om de volledige trend te bepalen",
              "Om de details/timing van het einde van de correctie te spotten",
              "Om nooit naar te kijken",
              "Om alleen de spread te zien",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer weet je dat een correctie voorbij is?",
            options: [
              "Na precies 24 uur",
              "Zodra het lagere timeframe weer een ICC in de oorspronkelijke richting van de hogere timeframe laat zien",
              "Zodra de RSI onder de 30 komt",
              "Dat kun je nooit weten",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Wat mag een correctie NOOIT doen, zolang de hogere-timeframe-trend intact is?",
            options: [
              "Een higher low vormen",
              "Een lower high vormen",
              "De structuur van de hogere timeframe volledig breken",
              "Meerdere candles duren",
            ],
            correctIndex: 2,
          },
          {
            question: "Wat is een 'no-trade zone' in deze les?",
            options: [
              "Elk weekend",
              "Het gebied tussen een recent hoog en laag op het kleinste timeframe, zolang prijs geen kant kiest",
              "Elke correctie",
              "Een gebied waar de spread te hoog is",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op een bevestigde 15M-ICC (in plaats van direct instappen zodra de 1H een HL/LH toont) het aantal premature entries tijdens een correctie vermindert.",
      order: 4,
    },
    {
      title: "SCI — Les 5: Daily + 4H combo & de 'original creator'",
      videoRef:
        "https://www.youtube.com/watch?v=NQY6xAL4SuU&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=5",
      content:
        "- Voor een sell moet prijs eerst een geldige swing low breken; voor een buy moet prijs eerst een geldige swing high breken — zonder die break is er geen geldige entry.\n" +
        "- 'Original creator'-principe: elke high/low is veroorzaakt door een eerder niveau (de move die de beweging startte). Zolang prijs dat startniveau niet doorbreekt, blijft de structuur geldig; een breuk daarvan is een waarschuwing dat de trend aan het omdraaien is.\n" +
        "- Combineer daily (voor de grote richting/indicatie) met 4H (voor bevestiging) en eventueel 1H (voor extra detail als 4H niet genoeg info geeft).\n" +
        "- Stop-loss plaatsing: bij een sell boven de vorige lower high (het 'creator'-niveau); bij een buy onder de vorige higher low.\n" +
        "- Target = het niveau waar de oorspronkelijke indicatie vandaan kwam (de laatste 'creator').",
      quiz: {
        questions: [
          {
            question: "Wat is nodig voordat je een sell-entry mag nemen volgens deze les?",
            options: [
              "Niets, je mag altijd verkopen",
              "Prijs moet eerst een geldige swing low breken",
              "RSI moet boven 70 staan",
              "Er moet nieuws zijn",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat betekent het 'original creator'-principe?",
            options: [
              "Elke high/low komt voort uit een eerder niveau; wordt dat niveau doorbroken, dan is dat een reversal-signaal",
              "De eerste trader die een pair verhandelde",
              "Een technische indicator",
              "Een support/resistance uit het verleden dat je mag negeren",
            ],
            correctIndex: 0,
          },
          {
            question: "Waar plaats je je stop-loss bij een sell-entry volgens deze les?",
            options: [
              "Op entry-niveau",
              "Boven de vorige lower high (het 'creator'-niveau)",
              "Onder de vorige lower low",
              "Er hoeft geen stop-loss",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom combineert deze les de daily met de 4H-timeframe?",
            options: [
              "De daily geeft de grote richting/indicatie, de 4H bevestigt en geeft detail voor de entry",
              "De 4H is altijd leidend en de daily wordt genegeerd",
              "Om de spread te vergelijken",
              "Dat is puur toeval, timeframes doen er niet toe",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of entries die wachten op een bevestigde swing-low/high-break op de daily een hogere winrate geven dan entries puur op 4H-signalen zonder daily-bevestiging.",
      order: 5,
    },
    {
      title: "SCI — Les 6: Marktcommunicatie & stop-loss regels",
      videoRef:
        "https://www.youtube.com/watch?v=rVphir6Qi80&list=PLmaCbAD6I1AwZRrgd1TJ_T4Mnx0fKc33h&index=6",
      content:
        "- Zie prijsactie als communicatie: de markt 'vertelt' via structuur (herhaaldelijke lower highs/higher lows, afwijzingen van niveaus) wat de meest waarschijnlijke richting is — reageer daarop in plaats van vanuit emotie/angst te handelen.\n" +
        "- Herhaalde lower highs (meerdere keren falen om hoger te komen) vóór een sessie-start zijn een sterk signaal dat verkopers de controle hebben, ook zonder hogere-timeframe-bevestiging.\n" +
        "- Invalidatie-regel voor stop-loss: in een downtrend is alles boven de laatste lower high ongeldig ('invalid') — dat is waar de stop-loss hoort; vice versa voor een uptrend met de laatste higher low.\n" +
        "- Sessies doen ertoe: de New York-sessie wordt in deze les als meest betrouwbaar voor volume/beweging genoemd; plan entries met sessietiming in gedachten.\n" +
        "- Verwacht niet dat elke trend blijft doorzetten tot het eindtarget, maar verwacht ook niet dat elke trend meteen stopt op het eerste niveau — hou rekening met partiële take-profit-niveaus.",
      quiz: {
        questions: [
          {
            question: "Wat bedoelt deze les met 'de markt communiceert met je'?",
            options: [
              "Je moet naar het nieuws luisteren",
              "Prijsstructuur (herhaalde patronen, afwijzingen) laat zien wat waarschijnlijk gaat gebeuren; je reageert daarop",
              "Je moet chatten met andere traders",
              "Dit is puur metaforisch en heeft geen praktisch nut",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Wat is volgens de invalidatie-regel je stop-loss niveau in een downtrend?",
            options: [
              "Onder de laatste lower low",
              "Boven de laatste lower high",
              "Op het gemiddelde van de dag",
              "Er is geen vaste regel",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Wat is een sterk signaal dat verkopers de controle hebben, ook zonder hogere-timeframe-break?",
            options: [
              "Eén groene candle",
              "Meerdere opeenvolgende lower highs die falen om hoger te komen",
              "Hoge spread",
              "Weekend-gap",
            ],
            correctIndex: 1,
          },
          {
            question: "Welke sessie wordt in deze les als meest betrouwbaar voor volume genoemd?",
            options: ["Aziatische sessie", "London sessie", "New York sessie", "Elke sessie is even betrouwbaar"],
            correctIndex: 2,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of trades die worden ingenomen ná bevestiging via de invalidatie-regel (stop net boven/onder het laatste geldige swingniveau) een lagere gemiddelde stop-out ratio geven dan trades met een vaste pip-afstand als stop-loss.",
      order: 6,
    },
  ]);

  console.log("Seeded 6 lessons (SCI — Trends & Market Structure playlist).");
}
