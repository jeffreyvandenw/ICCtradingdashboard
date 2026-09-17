import { db } from "../../lib/db";
import { lessons } from "../../lib/db/schema";

export async function seedLessons() {
  await db.insert(lessons).values([
    {
      title: "Koddz — Trade 1: Gold — 1H/15M ICC-entry met tweede positie",
      videoRef: "https://youtu.be/yc5hmN0HThY",
      content:
        "- Markup op 1H, entry op 15M: een 'no-trade zone' (gelijke highs/lows) werd doorbroken met een nieuwe higher high — dat was de indicatie dat alles boven dat niveau kon kopen.\n" +
        "- Bij de eerste terugval naar het key-niveau ontstond een higher low; toen prijs een tweede keer naar hetzelfde niveau terugkwam zonder die higher low te breken, was dat de bevestiging om in te stappen.\n" +
        "- Stop-loss net onder de laatst gevormde higher low: zou dat niveau breken, dan was de hele trade-aanname ongeldig.\n" +
        "- Een tweede positie werd toegevoegd na een kleine consolidatie (lower high + higher low) die opnieuw naar boven werd doorbroken — dezelfde ICC-logica op een kleinere schaal binnen dezelfde trade.",
      quiz: {
        questions: [
          {
            question: "Op welke combinatie van timeframes werkte deze trade?",
            options: [
              "Daily voor alles",
              "1H voor markup, 15M voor de entry",
              "Alleen 1 minuut",
              "Alleen maandgrafiek",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat bevestigde de tweede terugkeer naar het key-niveau?",
            options: [
              "Niks, puur gokwerk",
              "Prijs brak de eerder gevormde higher low niet",
              "Een nieuws-event",
              "Een indicator-signaal",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar lag de stop-loss?",
            options: [
              "Op een rond getal",
              "Net onder de laatst gevormde higher low",
              "Bij de vorige lower low",
              "Er was geen stop-loss",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom werd een tweede positie toegevoegd?",
            options: [
              "Willekeurig",
              "Een kleine consolidatie werd opnieuw naar boven doorbroken, dezelfde ICC-logica herhaald",
              "Om het verlies te compenseren",
              "Op advies van volgers",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het toevoegen van een tweede positie na een bevestigde mini-consolidatie binnen een lopende trade de gemiddelde RR per trade verhoogt zonder het risico te vergroten.",
      order: 21,
    },
    {
      title: "Koddz — Trade 2: Gold — 7 dagen drawdown volhouden",
      videoRef: "https://youtu.be/sLujkO_AsmM",
      content:
        "- Op de daily bleek een niveau een sterke support (meerdere keren getest en niet gebroken) — dat is een teken dat verkopers daar geen controle meer hebben en kopers het overnemen.\n" +
        "- Markup en indicatie/correctie werden op de 4H gedaan; pas voor de entry werd naar 1H geschaald.\n" +
        "- Een eerste entry werd uitgestopt door een weekend-wick (geen echte candle-close-doorbraak) — dat maakte de setup zelf nog niet ongeldig, alleen die ene poging.\n" +
        "- Vasthouden door 7 dagen drawdown was verantwoord zolang de stop-loss (een geldig laag punt) niet werd geraakt — 'messy' prijsactie betekent niet automatisch dat de setup fout is.",
      quiz: {
        questions: [
          {
            question: "Wat toont een niveau dat meerdere keren getest wordt maar niet breekt?",
            options: [
              "Dat het een zwak niveau is",
              "Dat het een sterk niveau is waar de tegenpartij het overneemt",
              "Niets",
              "Dat je moet verkopen",
            ],
            correctIndex: 1,
          },
          {
            question: "Op welke timeframe werden indicatie en correctie in deze trade bepaald?",
            options: ["5 minuten", "4H", "1 minuut", "Wekelijks"],
            correctIndex: 1,
          },
          {
            question: "Waarom bleef de setup geldig ondanks een eerste stop-out?",
            options: [
              "Puur geluk",
              "De stop-out kwam door een weekend-wick, geen echte candle-close-doorbraak van het niveau",
              "Setups zijn nooit ongeldig",
              "De stop-loss was fout geplaatst",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de belangrijkste les over het vasthouden tijdens drawdown?",
            options: [
              "Sluit altijd bij de eerste tegenslag",
              "Blijf zitten zolang je stop-loss (een geldig laag punt) niet geraakt is",
              "Verdubbel altijd je positie",
              "Drawdown betekent altijd dat je fout zit",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het negeren van weekend-/sessiegat-wicks (en alleen reageren op candle-close-doorbraken) het aantal premature stop-outs op geldige setups vermindert.",
      order: 22,
    },
    {
      title: "Koddz — Trade 3: Gold — vasthouden aan je setup ondanks messy price action",
      videoRef: "https://youtu.be/blVm_iOUR60",
      content:
        "- Rond een nieuwsmoment (CPI) werd bewust niet meteen gehandeld — extra volatiliteit maakt reacties onvoorspelbaar, dus liever een trade missen dan instappen in chaos.\n" +
        "- Een stop-loss werd bewust ruimer gezet (bij een oudere lower high in plaats van de nieuwste) omdat er nog niet genoeg zekerheid was over de precieze structuur — passend bij het account/risicomanagement.\n" +
        "- Nadat prijs een tweede keer hetzelfde niveau respecteerde (nog een lower high), werd de stop-loss verkrapt naar het nieuwe niveau en een positie toegevoegd.\n" +
        "- Drie lessen uit deze video: vertrouw je setup, 'messy' prijsactie betekent niet dat je fout zit, en stop-loss-plaatsing/risicomanagement is doorslaggevend.",
      quiz: {
        questions: [
          {
            question: "Wat deed de trader rond het CPI-nieuwsmoment?",
            options: [
              "Meteen extra hard instappen",
              "Wachten tot de volatiliteit was afgenomen voor hij instapte",
              "Alle trades voorgoed sluiten",
              "Dubbele stop-loss zetten",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom werd de stop-loss eerst ruimer (bij een oudere lower high) gezet?",
            options: [
              "Uit onzekerheid over de precieze structuur, passend bij het risicomanagement",
              "Per ongeluk",
              "Om zoveel mogelijk te verliezen",
              "Dat wordt nooit gedaan",
            ],
            correctIndex: 0,
          },
          {
            question: "Wat gebeurde er nadat prijs een tweede keer hetzelfde niveau respecteerde?",
            options: [
              "Er werd niets gedaan",
              "Stop-loss verkrapt en een positie toegevoegd",
              "De hele trade werd gesloten",
              "Er werd van bias gewisseld",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is NIET een van de drie lessen uit deze video?",
            options: [
              "Vertrouw je setup",
              "Messy prijsactie betekent dat je setup fout is",
              "Messy prijsactie betekent niet dat je fout zit",
              "Stop-loss-plaatsing en risicomanagement zijn cruciaal",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het vermijden van entries in het uur rond grote nieuwsmomenten (bv. CPI) het aantal onvoorspelbare stop-outs vermindert vergeleken met direct handelen op het signaal.",
      order: 23,
    },
    {
      title: "Koddz — Trade 4: Gold — daily+4H bearish confluence sell",
      videoRef: "https://youtu.be/cczNmmgjB_o",
      content:
        "- Multi-timeframe bevestiging: eerst daily bearish vaststellen, dan 4H-niveaus markeren (candle body closes), pas daarna naar 1H voor de precieze entry.\n" +
        "- Een correctie op de sell-kant hoort bullish te zijn; zolang de correctie geen eerdere lower high breekt, blijft de sell-bias geldig — een dieper terugkomende correctie is geen reden tot paniek.\n" +
        "- Het einde van de correctie herken je pas als de lagere timeframe (1H/30M) zelf structuur breekt en terug bearish draait — pas dán is de continuation-entry geldig.\n" +
        "- Target lag op het niveau waar de oorspronkelijke indicatie stopte (een sterke koperszone) — prijs verkoopt richting een niveau van kopers, en koopt richting een niveau van verkopers.",
      quiz: {
        questions: [
          {
            question: "In welke volgorde werden de timeframes gebruikt in deze trade?",
            options: [
              "1H eerst, dan daily",
              "Daily → 4H (markup) → 1H (entry)",
              "Alleen 15 minuten",
              "Willekeurige volgorde",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat hoort een correctie te zijn tijdens een sell-setup?",
            options: ["Bearish", "Bullish", "Zijwaarts zonder richting", "Dat maakt niet uit"],
            correctIndex: 1,
          },
          {
            question: "Wanneer weet je dat de correctie voorbij is en je mag verkopen?",
            options: [
              "Na een vaste tijd",
              "Als de lagere timeframe zelf structuur breekt en terug bearish draait",
              "Zodra de correctie 50% terugkomt",
              "Nooit met zekerheid",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar lag het target van deze trade?",
            options: [
              "Een willekeurig rond getal",
              "Waar de oorspronkelijke indicatie stopte (een sterke koperszone)",
              "Exact 100 pips",
              "Bij de vorige lower low",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of targets die zijn afgestemd op het einde van de oorspronkelijke indicatie (een tegenpartijzone) een consistentere RR opleveren dan vaste pip-targets.",
      order: 24,
    },
    {
      title: "Koddz — Trade 5: EURUSD — RR verbeteren van 1:2 naar 1:5",
      videoRef: "https://youtu.be/FIFNk4Wofd8",
      content:
        "- Startpunt was altijd de hogere timeframe (daily) om de hoofdrichting te bepalen; pas daarna werd op 4H verfijnd.\n" +
        "- Een 'no-trade zone' (consolidatie) werd eerst gemarkeerd en pas gehandeld nadat er een duidelijke breakout/indicatie kwam.\n" +
        "- Tijdens de correctie ontstond een schijnbare 'higher low' die sommigen deed denken dat de trend was omgedraaid — maar zolang de correctie geen eerder laag punt brak, bleef de sell-bias intact.\n" +
        "- Door het target niet op het dichtstbijzijnde koopersniveau te zetten, maar op het vólgende niveau verderop, werd de RR verbeterd van 1:2 naar 1:5 — geduld in het vasthouden van de trade betaalde zich uit.",
      quiz: {
        questions: [
          {
            question: "Wat is een 'no-trade zone' in deze les?",
            options: [
              "Elke dag na 17:00",
              "Een consolidatiegebied dat je pas handelt na een duidelijke breakout",
              "Een gebied met alleen sell-signalen",
              "Een weekend-gap",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom paniekten sommige mensen tijdens de correctie?",
            options: [
              "Ze dachten dat een tijdelijke higher low een trendwissel betekende",
              "Er was nieuws",
              "De spread was te hoog",
              "Er is geen reden genoemd",
            ],
            correctIndex: 0,
          },
          {
            question: "Hoe verbeterde de RR van 1:2 naar 1:5 in deze trade?",
            options: [
              "Door een kleinere stop-loss",
              "Door het target verder te zetten, op het vólgende koopersniveau in plaats van het dichtstbijzijnde",
              "Door meer te riskeren",
              "Toeval",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat was de eerste stap in de analyse van deze trade?",
            options: [
              "Direct de 15-minuten chart openen",
              "De hoofdrichting bepalen op de daily timeframe",
              "Een indicator toevoegen",
              "Het nieuws lezen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het bewust verder zetten van targets (naar het vólgende tegenpartijniveau, in plaats van het dichtstbijzijnde) de gemiddelde RR verhoogt zonder de winrate significant te verlagen.",
      order: 25,
    },
    {
      title: "Koddz — Trade 6: Gold — herhaald sell-setup met dubbele confluentie",
      videoRef: "https://youtu.be/QE_4rynoLlg",
      content:
        "- Eenzelfde niveau van verkopers reageerde meerdere keren op prijs — herhaalde reacties op hetzelfde niveau geven extra vertrouwen dat het geldig blijft.\n" +
        "- Twee opeenvolgende lower highs (in plaats van één) werden gebruikt als extra confluentie voordat de trade genomen werd.\n" +
        "- Ondanks schokkerige prijsactie werd de trade aangehouden zolang het niveau van verkopers standhield en de structuur bearish bleef.\n" +
        "- Een extra positie werd toegevoegd nadat prijs een tweede keer onder het sleutelniveau kwam, met de stop-loss verplaatst naar het nieuwste (kleinere) lower high.",
      quiz: {
        questions: [
          {
            question: "Wat gaf extra vertrouwen in deze sell-setup?",
            options: [
              "Eén losse candle",
              "Herhaalde verkopers-reacties op hetzelfde niveau",
              "Een tip van een volger",
              "Willekeurige keuze",
            ],
            correctIndex: 1,
          },
          {
            question: "Hoeveel lower highs werden hier gebruikt als confluentie?",
            options: ["Eén", "Twee opeenvolgende", "Tien", "Geen, alleen een higher low"],
            correctIndex: 1,
          },
          {
            question: "Wat deed de trader ondanks schokkerige prijsactie?",
            options: [
              "Meteen sluiten",
              "De trade aanhouden zolang het verkopersniveau standhield",
              "Van bias wisselen",
              "Dubbel risico nemen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer werd de stop-loss verplaatst en een positie toegevoegd?",
            options: [
              "Willekeurig na 1 dag",
              "Nadat prijs een tweede keer onder het sleutelniveau kwam",
              "Nooit",
              "Bij het openen van de trade",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of niveaus met meerdere (2+) historische reacties een hogere winrate geven dan niveaus die slechts één keer eerder zijn getest.",
      order: 26,
    },
    {
      title: "Koddz — Trade 7: Silver — schoolvoorbeeld ICC-sell",
      videoRef: "https://youtu.be/EwXMLHACmz0",
      content:
        "- Market structure werd gebruikt om vast te stellen dat een eerdere uptrend zijn higher low had verloren — het eerste signaal dat buys niet langer geldig waren.\n" +
        "- Twee opeenvolgende indicaties naar beneden (op verschillende niveaus) bevestigden de sell-richting nog sterker.\n" +
        "- Er werd bewust gewacht op de New York-sessie voor de entry, ook al was het signaal al eerder (buiten sessie) geldig — sessietiming beïnvloedt de betrouwbaarheid van een breakout.\n" +
        "- De trade werd over het weekend aangehouden omdat de stop-loss veilig stond, en raakte het target bij market open op maandag — geduld boven haasten.",
      quiz: {
        questions: [
          {
            question: "Wat was het eerste signaal dat de eerdere uptrend voorbij was?",
            options: [
              "Een nieuwsbericht",
              "Het verlies van de laatste higher low in de structuur",
              "Hoog volume",
              "Een rond getal-niveau",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Waarom wachtte de trader op de New York-sessie in plaats van meteen op het signaal te handelen?",
            options: [
              "Uit gewoonte, zonder reden",
              "Sessietiming beïnvloedt de betrouwbaarheid van een breakout",
              "New York-sessie is altijd verplicht",
              "Er was geen reden",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom werd de trade over het weekend aangehouden?",
            options: [
              "Uit onachtzaamheid",
              "De stop-loss stond veilig, dus geduld kon lonen",
              "Weekend-trading is verplicht",
              "Om het risico te verhogen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat versterkte het sell-signaal in deze trade extra?",
            options: [
              "Eén willekeurige candle",
              "Twee opeenvolgende indicaties naar beneden op verschillende niveaus",
              "Een indicator",
              "Niets, het was toeval",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of entries die bewust wachten op de New York-sessie (i.p.v. direct op een geldig signaal buiten sessie) een betere trefkans/RR geven.",
      order: 27,
    },
    {
      title: "Koddz — Trade 8: Gold — piramideren tijdens een sterke trend",
      videoRef: "https://youtu.be/7liNpbeiwqw",
      content:
        "- Bij een sterk trendende markt werden herhaaldelijk nieuwe indicatie-correctie-continuation-cycli gebruikt om posities bij te bouwen (piramideren) in plaats van één keer in te stappen en te wachten.\n" +
        "- Elke nieuwe positie werd pas toegevoegd na een eigen bevestigde correctie — nooit zomaar op de eerste beweging (FOMO) instappen.\n" +
        "- Sessietiming speelde weer een rol: sommige correcties/continuations wachtten tot de New York-sessie opende voor er echt volume/momentum kwam.\n" +
        "- Waarschuwing: wie zelf laat instapt op een lopende trend, moet alsnog wachten op een eigen indicatie-correctie-continuation op een lagere timeframe in plaats van blind mee te FOMO'en.",
      quiz: {
        questions: [
          {
            question: "Wat is 'piramideren' zoals in deze video toegepast?",
            options: [
              "Eén keer instappen en nooit meer aanpassen",
              "Herhaaldelijk posities bijbouwen na elke nieuwe bevestigde ICC-cyclus",
              "Altijd verliezen nemen",
              "Een chart-patroon",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer werd een nieuwe positie toegevoegd?",
            options: [
              "Op elk moment, willekeurig",
              "Pas na een eigen bevestigde correctie",
              "Nooit, één positie was genoeg",
              "Elke dag om 9:00",
            ],
            correctIndex: 1,
          },
          {
            question: "Welke rol speelde sessietiming in deze trade?",
            options: [
              "Geen enkele",
              "Momentum/volume kwam vaak pas met de New York-sessie",
              "Sessies zijn irrelevant voor gold",
              "Alleen Aziatische sessie telde",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is het advies voor wie laat instapt op een lopende trend?",
            options: [
              "Blind FOMO'en op de huidige candle",
              "Alsnog wachten op een eigen indicatie-correctie-continuation op een lagere timeframe",
              "Altijd dubbel risico nemen",
              "Nooit meer instappen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het piramideren (posities toevoegen na elke nieuwe bevestigde ICC-cyclus in een sterke trend) een hogere totale RR oplevert dan één vaste positie vasthouden.",
      order: 28,
    },
    {
      title: "Koddz — Trade 9: Gold — een verlies analyseren (te vroeg ingestapt)",
      videoRef: "https://youtu.be/khUqPQALqUE",
      content:
        "- Fout uit een verlieslatende trade: er werd direct ingestapt op de indicatie zelf, zonder te wachten op de correctie en continuation — een klassieke ICC-fout.\n" +
        "- Les: altijd wachten tot alle drie de stappen (indicatie, correctie, continuation) zijn afgerond voordat je instapt, ook als de indicatie er overtuigend uitziet.\n" +
        "- In de daaropvolgende (winnende) buy-trade werd wel gewacht: een niveau werd pas als geldig beschouwd nadat prijs het meerdere keren (vier keer) had gerespecteerd.\n" +
        "- Het toekomstplan werd expliciet als voorwaardelijk 'als/dan'-scenario opgesteld (als prijs een higher low maakt op niveau X, dan volgt actie Y) in plaats van een vaste voorspelling.",
      quiz: {
        questions: [
          {
            question: "Wat was de fout in de verlieslatende trade?",
            options: [
              "Te lang wachten",
              "Direct instappen op de indicatie, zonder correctie en continuation af te wachten",
              "Te grote stop-loss",
              "Verkeerde asset",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de les die hieruit wordt getrokken?",
            options: [
              "Nooit meer handelen",
              "Altijd alle drie de ICC-stappen afwachten voor je instapt",
              "Indicaties negeren",
              "Alleen op nieuws handelen",
            ],
            correctIndex: 1,
          },
          {
            question: "Hoe werd een niveau in de winnende buy-trade als 'geldig' bevestigd?",
            options: [
              "Na één keer testen",
              "Nadat prijs het meerdere keren (vier keer) had gerespecteerd",
              "Meteen bij het tekenen",
              "Door een indicator",
            ],
            correctIndex: 1,
          },
          {
            question: "Hoe werd het vooruitzicht voor de volgende week geformuleerd?",
            options: [
              "Als een zekere voorspelling",
              "Als een voorwaardelijk als/dan-scenario",
              "Er werd niets vooruitgeblikt",
              "Willekeurig",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het strikt wachten op alle drie ICC-stappen (i.p.v. instappen bij de indicatie alleen) het aantal verlieslatende premature entries vermindert.",
      order: 29,
    },
    {
      title: "Koddz — Trade 10: EURUSD — volledige multi-timeframe uitlijning",
      videoRef: "https://youtu.be/ut8y_EEAhG8",
      content:
        "- Volledige top-down uitlijning vereist voor een trade: daily bullish, 4H in correctie (bearish), 1H moet terug bullish draaien voordat er wordt ingestapt — pas als alle drie overeenkomen, volgt de entry.\n" +
        "- Stop-loss werd geplaatst op het niveau waarvan al was vastgesteld dat prijs daar niet voorbij wilde gaan (de basis van de laatste higher low).\n" +
        "- In plaats van het eerste (dichtstbijzijnde) target te nemen, werd een plan gemaakt met een eerste TP (deels sluiten/partials) en een verder gelegen tweede TP bij een zone met veel historische liquiditeit.\n" +
        "- Expliciete erkenning dat een vooruitzicht een verwachting is, geen garantie: als prijs een verwacht niveau niet doorbreekt en juist omkeert, wordt de trade herzien of gesloten in plaats van vastgehouden uit koppigheid.",
      quiz: {
        questions: [
          {
            question: "Wat is vereist voordat deze trade wordt genomen?",
            options: [
              "Alleen de 1H moet kloppen",
              "Daily, 4H en 1H moeten allemaal dezelfde richting bevestigen",
              "Niets, gevoel is genoeg",
              "Alleen nieuws",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar werd de stop-loss geplaatst?",
            options: [
              "Willekeurig ver weg",
              "Op het niveau waarvan al vaststond dat prijs er niet voorbij wilde",
              "Op entry-niveau",
              "Er was geen stop-loss",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is het voordeel van een TP1 (partials) en verder gelegen TP2?",
            options: [
              "Geen voordeel",
              "Je kan winst vastzetten én toch profiteren van een groter potentieel vervolg",
              "Het verhoogt alleen het risico",
              "Het is verplicht van de broker",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat gebeurt er als prijs een verwacht niveau niet doorbreekt en omkeert?",
            options: [
              "De trade wordt koppig vastgehouden",
              "De trade wordt herzien of gesloten in plaats van vastgehouden uit koppigheid",
              "Er wordt dubbel ingezet",
              "Niets, negeren",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of een gefaseerd target-plan (TP1 partials + verder gelegen TP2 op een liquiditeitszone) een hogere gemiddelde RR oplevert dan één vast target op het dichtstbijzijnde niveau.",
      order: 30,
    },
    {
      title: "Koddz — Trade 11: Silver — swingtrade op een higher low na een scherpe daling",
      videoRef: "https://youtu.be/F-R8wZdi1FQ",
      content:
        "- Na een scherpe daling vormde zich een support met een higher low (in plaats van een verwachte lower low) — dat higher low was het eerste teken dat kopers terugkwamen.\n" +
        "- Als swingtrade werd deze positie over een langere periode aangehouden, met tussentijdse targets die werden verschoven zodra eerdere niveaus braken (voortschrijdend TP-beleid).\n" +
        "- Kernregel herhaald: in een uptrend wordt een eerdere high na het doorbreken ervan het nieuwe uitgangspunt voor een correctie (higher low) en vervolgens een nieuwe push — hetzelfde principe geldt spiegelbeeld voor een downtrend.\n" +
        "- Expliciete nuance: vooruitzichten ('ik denk dat prijs zal kopen') zijn geen zekerheden — je reageert op wat de markt laat zien, niet op wat je hoopt dat er gebeurt.",
      quiz: {
        questions: [
          {
            question: "Wat was het eerste teken dat kopers terugkwamen na de scherpe daling?",
            options: [
              "Een nieuwsbericht",
              "Een higher low in plaats van een verwachte lower low",
              "Hoog volume alleen",
              "Een rond getal-niveau",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een 'voortschrijdend TP-beleid' in deze les?",
            options: [
              "Eén vast target dat nooit verandert",
              "Tussentijdse targets verschuiven zodra eerdere niveaus breken",
              "Nooit een target zetten",
              "Elke dag sluiten",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de kernregel die herhaald wordt over een uptrend?",
            options: [
              "Een eerdere high wordt na doorbraak het nieuwe uitgangspunt voor een correctie/higher low",
              "Highs worden altijd genegeerd",
              "Trends duren nooit lang",
              "Er is geen regel",
            ],
            correctIndex: 0,
          },
          {
            question: "Wat is de nuance die aan het eind wordt benadrukt?",
            options: [
              "Vooruitzichten zijn garanties",
              "Je reageert op wat de markt laat zien, niet op wat je hoopt",
              "Voorspellingen zijn altijd correct",
              "Er is geen nuance nodig",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of swingtrades die targets voortschrijdend aanpassen bij elke nieuwe bevestigde high/low een hogere gemiddelde RR geven dan trades met één vast, vooraf bepaald target.",
      order: 31,
    },
  ]);

  console.log("Seeded 11 lessons (Koddz trade breakdowns).");
}
