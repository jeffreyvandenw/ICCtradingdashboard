import { db } from "../../lib/db";
import { lessons } from "../../lib/db/schema";

const LIST_ID = "PLguWwLNVYKWdw0qsZWLLzwJlw6sWKUsjI";

function videoUrl(id: string, index: number) {
  return `https://www.youtube.com/watch?v=${id}&list=${LIST_ID}&index=${index}`;
}

export async function seedLessons() {
  await db.insert(lessons).values([
    {
      title: "JaeFX — Liquidity 1: Structuurwissels vs. sweeps",
      videoRef: videoUrl("GqO9C819SgI", 1),
      content:
        "- Niet elke market structure shift (BOS) leidt tot een echte omkeer — soms is het een 'sweep' die een laag/hoog wegveegt en daarna toch de oorspronkelijke trend hervat.\n" +
        "- Kijk naar de bredere context: is er een duidelijke supply/demand-zone met imbalance in de richting die je verwacht? Zo niet, dan is een schijnbare structuurwissel waarschijnlijker een sweep richting die zone dan een echte reversal.\n" +
        "- Imbalance (een ongevulde prijs-range) werkt als een magneet: de markt is geneigd die eerst te vullen voordat de 'echte' beweging begint.\n" +
        "- Herzie je bias pas als de markt door de significante supply/demand-zone zelf breekt — dát zou wél een echte trendwissel bevestigen.",
      quiz: {
        questions: [
          {
            question: "Wat is een 'sweep' in tegenstelling tot een echte structuurwissel?",
            options: [
              "Een permanente trendomkeer",
              "Een tijdelijke doorbraak die een niveau wegveegt voordat de oorspronkelijke trend hervat",
              "Een nieuwsevent",
              "Een indicator-signaal",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom werkt imbalance als een 'magneet' voor prijs?",
            options: [
              "Toeval",
              "Het is een ongevulde prijs-range die de markt geneigd is eerst te vullen",
              "Omdat brokers dat willen",
              "Dat is het niet",
            ],
            correctIndex: 1,
          },
          {
            question: "Wanneer zou je je bias écht herzien volgens deze les?",
            options: [
              "Bij elke kleine terugval",
              "Pas als de markt door de significante supply/demand-zone zelf breekt",
              "Nooit",
              "Elke dag om 9:30",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het onderscheiden van sweeps (met imbalance/demand erachter) van echte structuurwissels het aantal premature tegen-trend trades vermindert.",
      order: 32,
    },
    {
      title: "JaeFX — Liquidity 2: Sweeps & inducements meester",
      videoRef: videoUrl("9nRFcetXqkA", 2),
      content:
        "- Klassieke support/resistance-trading werkt tegen je: stop-losses en breakout-orders hopen zich op rond die niveaus, waardoor de markt ze vaak eerst 'sweept' voordat de echte beweging begint.\n" +
        "- Bij meerdere kandidaat-zones (bv. dubbele top vlak voor een supply-zone) is de eerste vaak een 'inducement' — een val die tegenpartij-orders lokt — terwijl de verdere/diepere zone de 'echte' zone is.\n" +
        "- Gebruik de 'standard confirmation' (een duidelijke structuurwissel op een lagere timeframe) als filter voordat je een zone vertrouwt, in plaats van blind op de eerste reactie te handelen.\n" +
        "- Een 'efficiënte range' (geen imbalance meer over) is een teken dat een zone sterk genoeg is bevestigd om vanaf te handelen.",
      quiz: {
        questions: [
          {
            question: "Wat is een 'inducement'-zone?",
            options: [
              "De sterkste zone om vanaf te handelen",
              "Een val die tegenpartij-orders lokt voordat de échte zone wordt geraakt",
              "Een niveau dat nooit wordt getest",
              "Een broker-term zonder betekenis",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat gebruik je om een zone te bevestigen voordat je hem vertrouwt?",
            options: [
              "Een gok",
              "De 'standard confirmation': een duidelijke structuurwissel op een lagere timeframe",
              "Altijd de eerste reactie",
              "Nieuws",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat toont een 'efficiënte range' aan?",
            options: [
              "Dat er nog veel imbalance is",
              "Dat er geen imbalance meer over is, een teken van een sterk bevestigde zone",
              "Dat de markt gesloten is",
              "Niets relevants",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het wachten op een standard-confirmation-structuurwissel voordat je een demand/supply-zone handelt, het aantal verlieslatende entries op inducement-zones vermindert.",
      order: 33,
    },
    {
      title: "JaeFX — Liquidity 3: Trendlijnen als lokmiddel (deel 1)",
      videoRef: videoUrl("Hxr9Y8QZgAs", 3),
      content:
        "- Trendlijnen zijn subjectief getekend en bepalen niet de echte trend — de echte trend wordt bepaald door de hoge/lage punten (highs/lows) van prijs zelf.\n" +
        "- Prijs kan een trendlijn doorbreken zonder dat de onderliggende structuur (bv. de laatste lower high) verandert — dus een trendlijnbreuk is geen garantie voor een trendwissel.\n" +
        "- Rond trendlijnen verzamelen zich orders van zowel 'retest'-handelaren als 'break-and-retest'-handelaren, wat trendlijnen juist tot een plek maakt waar valse uitbraken (sweeps) vaak voorkomen.\n" +
        "- Gebruik trendlijnen alleen om te zien wáár die opgehoopte orders liggen, en combineer dat met supply/demand-zones en de echte structuur voor je daadwerkelijke entry.",
      quiz: {
        questions: [
          {
            question: "Bepaalt een trendlijn de echte trendrichting van de markt?",
            options: [
              "Ja, altijd",
              "Nee, dat doen de highs/lows van prijs zelf",
              "Alleen op de daily",
              "Trendlijnen zijn nooit nuttig",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat gebeurt er vaak als prijs een trendlijn doorbreekt?",
            options: [
              "De trend keert altijd meteen om",
              "De onderliggende structuur kan intact blijven, dus geen echte trendwissel",
              "De markt sluit",
              "Niets, trendlijnen breken nooit",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarvoor gebruik je een trendlijn volgens deze les wél?",
            options: [
              "Als directe entry-trigger",
              "Om te zien waar opgehoopte orders liggen, in combinatie met supply/demand en structuur",
              "Nergens voor",
              "Als vaste stop-loss-regel",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het negeren van trendlijnbreuken als entry-signaal (en in plaats daarvan wachten op een echte structuurwissel in highs/lows) het aantal valse-uitbraaktrades vermindert.",
      order: 34,
    },
    {
      title: "JaeFX — Liquidity 4: Support/resistance-'fakeout'",
      videoRef: videoUrl("MObFIEX6hXs", 4),
      content:
        "- Kopen op support en verkopen op resistance werkt averechts, omdat juist daar de meeste stop-losses en breakout-orders liggen — de markt is geneigd die eerst te sweepen.\n" +
        "- In plaats van van tevoren op zo'n niveau te handelen, wacht je op de sweep gevolgd door een bevestigde structuurwissel (highs/lows) voordat je instapt.\n" +
        "- Een agressievere entry stapt in direct na de sweep/structuurwissel op een lagere timeframe; een conservatievere entry wacht tot de hogere-timeframe-structuur zelf ook bevestigt — hogere reward met meer risico versus lagere reward met meer zekerheid.\n" +
        "- Zowel de agressieve als de conservatieve variant gebruiken uiteindelijk een supply/demand-zone als entry-punt, nooit het support/resistance-niveau zelf.",
      quiz: {
        questions: [
          {
            question: "Waarom werkt kopen op support/verkopen op resistance vaak niet?",
            options: [
              "Omdat daar de meeste liquiditeit (stop-losses/breakout-orders) ligt die eerst geveegd wordt",
              "Omdat het te makkelijk is",
              "Het werkt altijd perfect",
              "Vanwege de spread",
            ],
            correctIndex: 0,
          },
          {
            question: "Wat is het verschil tussen de agressieve en conservatieve entry in deze les?",
            options: [
              "Geen verschil",
              "Agressief stapt direct in na de sweep op een lage timeframe; conservatief wacht op hogere-timeframe-bevestiging",
              "Conservatief is altijd winstgevender",
              "Agressief gebruikt geen stop-loss",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar ligt de uiteindelijke entry in beide varianten?",
            options: [
              "Op het support/resistance-niveau zelf",
              "Op een supply/demand-zone, niet op het S/R-niveau",
              "Willekeurig",
              "Op de opening van de dag",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of wachten op een sweep + structuurwissel (in plaats van direct op support/resistance handelen) de winrate verbetert.",
      order: 35,
    },
    {
      title: "JaeFX — Liquidity 5: Stop-loss hunts begrijpen en gebruiken",
      videoRef: videoUrl("BPJecT8qXrc", 5),
      content:
        "- Een 'stop hunt' is geen opzettelijke manipulatie, maar simpelweg de markt die reageert op plekken met veel opgehoopte orders (stop-losses, breakout-orders) rond highs/lows.\n" +
        "- Het gebied tussen een recente high en low bevat relatief weinig orders — vandaar dat prijs zich daar vrij door kan bewegen, terwijl de highs/lows zelf de 'magneten' zijn.\n" +
        "- In plaats van direct op een support/resistance-retest te handelen, gebruik je supply/demand-zones (met imbalance erachter) als een logischere plek om in te stappen, omdat je dan juist wél gebruikmaakt van de sweep in plaats van er slachtoffer van te worden.\n" +
        "- Een 'confirmation'-aanpak (wachten op een structuurwissel voordat je instapt op een demand/supply-zone) geeft een veiligere, zij het latere, entry voor wie liever niet vroeg instapt.",
      quiz: {
        questions: [
          {
            question: "Is een stop hunt opzettelijke manipulatie door banken?",
            options: [
              "Ja, altijd",
              "Nee, het is de markt die reageert op gebieden met veel opgehoopte orders",
              "Alleen op vrijdag",
              "Alleen bij grote nieuwsdagen",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom kan prijs zich vrij door het midden van een range bewegen?",
            options: [
              "Omdat daar juist de meeste orders liggen",
              "Omdat daar relatief weinig orders liggen vergeleken met de highs/lows",
              "Vanwege de spread",
              "Dat gebeurt niet",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een veiligere (latere) manier om in te stappen volgens deze les?",
            options: [
              "Altijd meteen op de sweep instappen",
              "Wachten op een confirmation/structuurwissel voordat je een demand/supply-zone handelt",
              "Nooit instappen",
              "Alleen op nieuws handelen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het combineren van imbalance+demand-zones met een confirmation-structuurwissel het aantal keer dat je zelf 'gehunt' wordt vermindert.",
      order: 36,
    },
    {
      title: "JaeFX — Liquidity 6: Structuur + liquiditeit-entrymodel",
      videoRef: videoUrl("JhBX0TQ41H8", 6),
      content:
        "- Een trend bestaat uit impulsieve bewegingen (die structuur breken) en correctieve bewegingen (pullbacks die dat niet doen) — zolang de laatste higher low (in een uptrend) niet breekt, blijft de trend intact.\n" +
        "- Kernentrymodel: in een bearish trend, zoek een 'equal highs'-niveau (liquiditeit) ín die trend; zodra dat niveau geveegd wordt en prijs terugkomt in een supply-zone, is dat je sell-signaal — de sweep is dan waarschijnlijker een valse uitbraak dan een echte reversal.\n" +
        "- Hetzelfde model werkt gespiegeld voor een bullish trend met equal lows en een demand-zone.\n" +
        "- Stop-loss net boven/onder de gesweepte high/low; target op het volgende punt van liquiditeit (bv. een swing low) of een demand-zone verderop.",
      quiz: {
        questions: [
          {
            question: "Wat blijft intact zolang de laatste higher low in een uptrend niet breekt?",
            options: ["Niets", "De trend zelf", "Alleen de trendlijn", "De spread"],
            correctIndex: 1,
          },
          {
            question: "In het kernentrymodel voor een bearish trend: wat zoek je binnen die trend?",
            options: [
              "Een demand-zone",
              "Een 'equal highs'-niveau (liquiditeit)",
              "Een nieuwsmoment",
              "Een rond getal",
            ],
            correctIndex: 1,
          },
          {
            question:
              "Waarom is een sweep van dat equal-highs-niveau vaak een sell-signaal in plaats van een koopsignaal?",
            options: [
              "Omdat de onderliggende bearish trend en structuur nog intact zijn — de sweep is waarschijnlijker vals",
              "Willekeurig",
              "Omdat sweeps altijd bullish zijn",
              "Er is geen reden",
            ],
            correctIndex: 0,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of dit combinatiemodel (trend + equal-high/low-sweep + supply/demand-entry) een hogere winrate geeft dan losse structuurbreuken zonder liquiditeitscontext.",
      order: 37,
    },
    {
      title: "JaeFX — Liquidity 7: Trendlijnen herzien met liquiditeit (deel 2)",
      videoRef: videoUrl("VvZKAPs_JnA", 8),
      content:
        "- Trendlijnen zijn subjectief en missen logica op zichzelf — de échte structuur (highs/lows) bepaalt de trend, niet de lijn die je erdoorheen tekent.\n" +
        "- Rond een trendlijn hopen zich stop-losses én breakout-orders op beide kanten op; wanneer prijs die zone raakt, ontstaat vaak een sweep in plaats van een schone retest of break-and-retest.\n" +
        "- Praktische aanpak: teken de trendlijn om te zien wáár die opgehoopte liquiditeit zit, maar baseer je daadwerkelijke entry op een supply/demand-zone die in lijn ligt met de echte (highs/lows-)trend.\n" +
        "- Stop-loss net onder de laagste swing die de trend bepaalt; target bij de volgende relevante high, met een risk-reward die vaak beter uitpakt dan een klassieke trendlijn-trade.",
      quiz: {
        questions: [
          {
            question: "Wat bepaalt de échte trend volgens deze les?",
            options: [
              "De trendlijn zelf",
              "De highs/lows die prijs daadwerkelijk print",
              "Het volume alleen",
              "De kleur van de candles",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat verzamelt zich doorgaans rond een trendlijn?",
            options: [
              "Niets bijzonders",
              "Stop-losses én breakout-orders van beide kanten",
              "Alleen nieuws-gerelateerde orders",
              "Uitsluitend koperorders",
            ],
            correctIndex: 1,
          },
          {
            question: "Waar baseer je je daadwerkelijke entry op, ondanks dat je de trendlijn tekent?",
            options: [
              "Op de trendlijn zelf",
              "Op een supply/demand-zone in lijn met de echte structuur",
              "Op een willekeurig punt",
              "Op de vorige candle-kleur",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het combineren van trendlijn-liquiditeit met supply/demand-zones een betere RR geeft dan traditionele trendlijn-retest of break-and-retest trades.",
      order: 38,
    },
    {
      title: "JaeFX — Liquidity 8: Equal high & low liquiditeit",
      videoRef: videoUrl("KnYg21yltd8", 10),
      content:
        "- Equal highs en equal lows zijn in essentie support/resistance-niveaus, maar de kern van de les is: koop niet boven equal lows en verkoop niet onder equal highs — wacht op de sweep.\n" +
        "- Na een sweep van bijvoorbeeld equal lows, wacht op een bevestigde structuurwissel (een nieuwe higher high) voordat je een buy overweegt — instappen puur op de sweep zelf is nog te vroeg/riskant.\n" +
        "- Equal highs/lows zijn ook bruikbaar als target: als je een positie hebt, is het tegenoverliggende punt van liquiditeit een logisch doel omdat de markt daar vaak alsnog naartoe getrokken wordt.\n" +
        "- Entry na bevestiging gebeurt via een demand/supply-zone (laatste candle vóór de impulsieve beweging), met stop-loss eronder/erboven.",
      quiz: {
        questions: [
          {
            question: "Wat is de regel over equal lows/highs in deze les?",
            options: [
              "Koop altijd boven equal lows",
              "Koop niet boven equal lows, verkoop niet onder equal highs — wacht op de sweep",
              "Verkoop altijd op equal highs",
              "Negeer equal highs/lows volledig",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat moet er gebeuren ná een sweep van equal lows voordat je een buy overweegt?",
            options: [
              "Niets, direct instappen",
              "Een bevestigde structuurwissel (nieuwe higher high)",
              "Een nieuwsbericht",
              "24 uur wachten, ongeacht prijs",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarvoor kun je equal highs/lows ook gebruiken naast entries?",
            options: [
              "Alleen voor entries",
              "Als logisch target voor een lopende positie",
              "Nergens anders voor",
              "Voor het berekenen van de spread",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het gebruiken van het tegenoverliggende equal-high/low-punt als target een hogere gemiddelde RR oplevert dan een willekeurig gekozen target.",
      order: 39,
    },
    {
      title: "JaeFX — Liquidity 9: De juiste zone kiezen bij inducement",
      videoRef: videoUrl("AIeBNqf8RBA", 12),
      content:
        "- Bij meerdere kandidaat-zones in een trend (bv. drie demand-zones) is niet elke zone even sterk — kijk welke zone daadwerkelijk de structuur heeft doorbroken (een nieuwe higher high veroorzaakt) om de 'echte' zone te vinden.\n" +
        "- Een zone die alleen interne/lagere-timeframe-structuur breekt maar niet de hogere-timeframe-swing, is zwakker en waarschijnlijker een inducement.\n" +
        "- Gebruik een lagere timeframe om, ná het bereiken van de vermoede echte zone, een eigen bevestigde structuurwissel te zoeken voordat je instapt — dat verhoogt de betrouwbaarheid aanzienlijk.\n" +
        "- Reken bij het kiezen van een zone altijd de imbalance (ongevulde ruimte) mee: een zone mét imbalance erboven/eronder is minder betrouwbaar dan een zone in een reeds 'efficiënte' (opgevulde) range.",
      quiz: {
        questions: [
          {
            question: "Hoe herken je de 'echte' zone bij meerdere kandidaten?",
            options: [
              "Willekeurig de eerste kiezen",
              "De zone die daadwerkelijk de (hogere-timeframe) structuur heeft doorbroken",
              "Altijd de laagste zone",
              "Altijd de hoogste zone",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat maakt een zone waarschijnlijker een inducement?",
            options: [
              "Als hij de hogere-timeframe-swing doorbreekt",
              "Als hij alleen interne/lagere-timeframe-structuur breekt, niet de hogere swing",
              "Als hij heel groot is",
              "Als hij op de daily staat",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat verhoogt de betrouwbaarheid van een entry op de vermoede echte zone?",
            options: [
              "Niets, gewoon direct instappen",
              "Een eigen bevestigde structuurwissel op een lagere timeframe zoeken",
              "Een grotere stop-loss nemen",
              "Wachten op het weekend",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het kiezen van de zone die de hogere-timeframe-structuur brak (in plaats van de eerste/dichtstbijzijnde zone) de winrate op multi-zone setups verbetert.",
      order: 40,
    },
    {
      title: "JaeFX — Liquidity 10: Simpel 3-stappen liquiditeitssysteem",
      videoRef: videoUrl("FUC0iWyCI08", 13),
      content:
        "- Drie-stappen-systeem: (1) identificeer liquiditeit (equal highs/lows, swing-liquiditeit) en wacht op een sweep, (2) wacht op een structuurwissel (de 'standard confirmation') die de trendrichting bevestigt, (3) stap in vanaf een demand-zone (buy) of supply-zone (sell) in de bevestigde richting.\n" +
        "- Dit systeem werkt ook binnen ranges: sweep van de ene kant van de range gevolgd door bevestigde structuur geeft een trade richting de andere kant van de range.\n" +
        "- Targets worden bepaald door het volgende duidelijke punt van liquiditeit (swing high/low of equal highs/lows) — niet door een vast aantal pips.\n" +
        "- Consistentie qua proces (niet elke trade hoeft te winnen) is belangrijker dan een hoge winrate; een paar goed onderbouwde trades met gunstige RR kunnen al voldoende renderen.",
      quiz: {
        questions: [
          {
            question: "Wat zijn de drie stappen van dit systeem?",
            options: [
              "Nieuws lezen, wachten, gokken",
              "Liquiditeit identificeren & sweep afwachten, structuurwissel bevestigen, instappen vanaf demand/supply",
              "Alleen kijken naar volume",
              "Random instappen op elk signaal",
            ],
            correctIndex: 1,
          },
          {
            question: "Werkt dit systeem ook in ranges?",
            options: [
              "Nee, alleen in trending markten",
              "Ja, sweep van de ene kant + bevestigde structuur geeft een trade richting de andere kant",
              "Alleen op de daily",
              "Alleen tijdens nieuws",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarop worden targets gebaseerd in dit systeem?",
            options: ["Een vast aantal pips", "Het volgende duidelijke punt van liquiditeit", "Willekeurig", "Altijd 1:1"],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of dit 3-stappen-liquiditeitssysteem consistent een winrate van 40-50% haalt bij een gemiddelde RR van 1:3 of hoger, zoals in de les beweerd.",
      order: 41,
    },
    {
      title: "JaeFX — Liquidity 11: Intraday liquiditeit + momentum",
      videoRef: videoUrl("Q-jQGto-nic", 14),
      content:
        "- Voor een korte, intraday trade is geen uitgebreide hogere-timeframe-narratief nodig — de vorige dag-high/low en een klein liquiditeitscluster (bv. drievoudige equal high) zijn al genoeg context.\n" +
        "- Een 'efficiënte range' (elke demand/supply-zone al netjes geretest) is een teken dat de markt schoon beweegt en een breakout waarschijnlijker houdt.\n" +
        "- Herhaalde pogingen om onder een niveau te sluiten die telkens mislukken (grote wicks, geen candle-close-doorbraak) tonen groeiende koopdruk/verkoopdruk op dat niveau — een vroege waarschuwing vóór de daadwerkelijke draai.\n" +
        "- Praktisch risicomanagement: na het bereiken van 1R winst een deel van de positie sluiten en de stop-loss naar break-even verplaatsen, zodat de rest van de trade risicovrij verder kan lopen.",
      quiz: {
        questions: [
          {
            question: "Is een uitgebreide hogere-timeframe-analyse altijd nodig voor een intraday-trade?",
            options: [
              "Ja, altijd verplicht",
              "Nee, de vorige dag-high/low en lokale liquiditeit kunnen al genoeg context zijn",
              "Nooit nodig",
              "Alleen op vrijdag",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat toont herhaald falen om onder een niveau te sluiten (grote wicks)?",
            options: [
              "Zwakte van kopers",
              "Groeiende koopdruk op dat niveau, een vroege waarschuwing voor een draai",
              "Niets bijzonders",
              "Dat de markt gesloten is",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is het risicomanagement-advies na 1R winst?",
            options: [
              "Altijd de hele positie meteen sluiten",
              "Een deel sluiten en de stop-loss naar break-even verplaatsen",
              "De stop-loss verwijderen",
              "Verdubbelen",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het verplaatsen van de stop-loss naar break-even na 1R winst de gemiddelde verlies-per-trade vermindert zonder de gemiddelde winst significant te beperken.",
      order: 42,
    },
    {
      title: "JaeFX — Liquidity 12: Drie vormen van liquiditeit samengevat",
      videoRef: videoUrl("jJKYeglSjHw", 15),
      content:
        "- Drie hoofdvormen van liquiditeit om te herkennen: (1) equal high/low-liquiditeit (support/resistance), (2) trend-liquiditeit (rond trendlijnen), en (3) range-liquiditeit (rond swing highs/lows van een trading range).\n" +
        "- Voor alle drie geldt dezelfde logica: koop niet boven equal lows/binnen een oplopende trendlijn-retest, verkoop niet onder equal highs — wacht op de sweep en een bevestigde structuurwissel.\n" +
        "- Deze liquiditeitsniveaus zijn ook bruikbaar als targets: als je eenmaal in een trade zit, is het tegenovergestelde punt van liquiditeit een logisch doel om naartoe te werken.\n" +
        "- Consistente toepassing van dit raamwerk (identificeren, sweep afwachten, bevestiging zoeken, entry via demand/supply) is bedoeld als basis voor een volledig handelssysteem, niet als losse losstaande trucs.",
      quiz: {
        questions: [
          {
            question: "Welke drie vormen van liquiditeit worden hier onderscheiden?",
            options: [
              "Alleen equal highs",
              "Equal high/low-, trend- en range-liquiditeit",
              "Alleen trendlijnen",
              "Alleen nieuws-liquiditeit",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de gedeelde regel voor alle drie de vormen?",
            options: [
              "Koop/verkoop er altijd meteen op",
              "Wacht op de sweep en een bevestigde structuurwissel voordat je instapt",
              "Negeer ze volledig",
              "Gebruik ze alleen als stop-loss",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarvoor zijn deze liquiditeitsniveaus ook bruikbaar naast entries?",
            options: [
              "Nergens anders voor",
              "Als logische targets voor lopende trades",
              "Alleen voor risicomanagement",
              "Voor het kiezen van een broker",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het consistent classificeren van setups naar deze drie liquiditeitsvormen de duidelijkheid en het aantal gemiste/foutieve entries verbetert vergeleken met ad-hoc support/resistance-trading.",
      order: 43,
    },
    {
      title: "JaeFX — Liquidity 13: Hoe liquiditeit werkt en hoe je ervan profiteert",
      videoRef: videoUrl("nwWn85GuiR8", 16),
      content:
        "- De brede marktpsychologie (support/resistance, trendlijnen, chart-patronen) is nog steeds wijdverbreid onder retailhandelaren — dat is precies waar voorspelbare ophopingen van orders (liquiditeit) ontstaan.\n" +
        "- Institutionele partijen kunnen grote orders niet in één keer tegen een goede prijs plaatsen; zij hebben gebieden met veel tegenpartij-liquiditeit (zoals onder een support) nodig om hun positie efficiënt op te bouwen.\n" +
        "- Twee manieren om hiervan te profiteren: (1) vermijd de voor de hand liggende trade die iedereen neemt op een S/R-niveau, en (2) volg de bevestiging ná een sweep (structuurwissel op een lagere timeframe) om in dezelfde richting als de institutionele stroom te handelen.\n" +
        "- Voor trendlijnen en chartpatronen geldt dezelfde logica: gebruik ze om liquiditeitszones te herkennen, maar baseer je entry op supply/demand en structuur in lijn met de trend.",
      quiz: {
        questions: [
          {
            question:
              "Waarom vormen brede, populaire concepten zoals support/resistance juist goede liquiditeitszones?",
            options: [
              "Omdat ze zeldzaam zijn",
              "Omdat veel retailhandelaren ze nog steeds gebruiken, wat voorspelbare orderophopingen creëert",
              "Dat doen ze niet",
              "Alleen op crypto",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom hebben institutionele partijen liquiditeitszones nodig?",
            options: [
              "Om te gokken",
              "Om grote orders efficiënt te kunnen plaatsen zonder de prijs te veel te bewegen",
              "Uit verveling",
              "Dat is niet waar",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de tweede manier om van liquiditeit te profiteren volgens deze les?",
            options: [
              "Altijd tegen de trend ingaan",
              "De bevestiging na een sweep volgen om met de institutionele stroom mee te handelen",
              "Nooit handelen",
              "Alleen op nieuws reageren",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het vermijden van de 'voor de hand liggende' S/R-trade en in plaats daarvan wachten op post-sweep bevestiging de winrate verbetert over een reeks trades.",
      order: 44,
    },
    {
      title: "JaeFX — Liquidity 14: Beste liquiditeitsstrategie (sweep + demand/supply)",
      videoRef: videoUrl("7teuvsTglnQ", 17),
      content:
        "- Kernstrategie: identificeer een support/resistance-niveau (equal highs/lows), verwacht een sweep van dat niveau, en zoek daarna een demand- (bij een low-sweep) of supply-zone (bij een high-sweep) in de richting van de grotere trend om vanaf in te stappen.\n" +
        "- Een demand/supply-zone wordt gedefinieerd als de laatste candle van consolidatie vóór een grote impulsieve beweging — dat is het niveau waar eerder al significante koop-/verkoopdruk vandaan kwam.\n" +
        "- Deze aanpak is fractal: hij werkt op elke timeframe (van 1 minuut tot weekly), omdat het puur gebaseerd is op orderstromen, niet op een tijdgebonden patroon.\n" +
        "- Praktisch stappenplan: sweep afwachten → demand/supply-zone identificeren in trendrichting → entry met stop-loss net voorbij de zone → target op het tegenoverliggende punt (bv. de vorige high).",
      quiz: {
        questions: [
          {
            question: "Wat zoek je ná een verwachte sweep van een support/resistance-niveau?",
            options: [
              "Niets, direct sluiten",
              "Een demand- of supply-zone in de richting van de grotere trend",
              "Een tegenovergestelde trade",
              "Een nieuwe indicator",
            ],
            correctIndex: 1,
          },
          {
            question: "Hoe wordt een demand/supply-zone hier gedefinieerd?",
            options: [
              "Elke willekeurige candle",
              "De laatste candle van consolidatie vóór een grote impulsieve beweging",
              "De candle met het hoogste volume",
              "De opening van de dag",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarom werkt deze aanpak op elke timeframe?",
            options: [
              "Dat doet het niet",
              "Omdat het gebaseerd is op orderstromen, niet op een tijdgebonden patroon",
              "Alleen op de daily",
              "Alleen tijdens New York-sessie",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of deze sweep+demand/supply-strategie op meerdere timeframes een consistente RR van 1:3+ oplevert, zoals in de les geclaimd.",
      order: 45,
    },
    {
      title: "JaeFX — Liquidity 15: Inducement masterclass",
      videoRef: videoUrl("nudje7WT-Vs", 18),
      content:
        "- Een 'inducement'-zone lokt handelaren aan een niveau met orders vóórdat prijs doorschiet naar de échte zone verderop, vaak herkenbaar aan onopgevulde imbalance tussen beide zones.\n" +
        "- Extra bevestiging voor een inducement: (bijna-)gelijke highs/lows rond de eerste zone, wat wijst op extra opgehoopte liquiditeit die eerst geveegd wordt.\n" +
        "- Als er geen imbalance meer over is tussen de eerste en tweede zone (de markt heeft de ruimte al 'volledig' opgevuld), dan is die verdere zone de meest waarschijnlijke 'echte' zone om vanaf te handelen.\n" +
        "- Voor wie extra zekerheid wil: een confirmation-entry (wachten op een bevestigde structuurbreuk ná de sweep) is mogelijk, met als afweging een lagere risk-reward dan de meer agressieve directe entry op de echte zone.",
      quiz: {
        questions: [
          {
            question: "Waaraan is een inducement-zone vaak te herkennen?",
            options: [
              "Aan hoog volume alleen",
              "Aan onopgevulde imbalance tussen die zone en een verdere, échte zone",
              "Aan een rond getal-niveau",
              "Dat is niet te herkennen",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat wijst op extra liquiditeit rond de inducement-zone?",
            options: [
              "Willekeurige candles",
              "(Bijna-)gelijke highs/lows rond die zone",
              "Lage volatiliteit",
              "Niets",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de trade-off van een confirmation-entry versus een directe entry op de echte zone?",
            options: [
              "Geen enkele",
              "Lagere risk-reward, maar meer zekerheid",
              "Confirmation-entries zijn altijd beter in elk opzicht",
              "Confirmation-entries hebben geen stop-loss",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het herkennen van imbalance tussen twee kandidaat-zones (en het kiezen van de verdere zone zonder imbalance) de winrate verbetert vergeleken met handelen op de eerste/dichtstbijzijnde zone.",
      order: 46,
    },
    {
      title: "JaeFX — Liquidity 16: Drie trades terugblik (structuur & liquiditeit)",
      videoRef: videoUrl("4jc5myA2lgw", 19),
      content:
        "- Praktijkvoorbeeld: sessieliquiditeit (bv. een Aziatische range) wordt vaak geveegd zodra een volgende sessie (Londen/New York) opent — dat sweep-moment gecombineerd met een structuurwissel gaf een geldige entry.\n" +
        "- Zelfs een zeer kleine imbalance (op een lage timeframe) telt mee als reden om te verwachten dat prijs er nog doorheen trekt voordat de echte beweging begint.\n" +
        "- Bij een gemiste trade (te lang gewacht op extra confirmatie terwijl een directe/agressieve entry al genoeg bevestiging had) is de les: een bewuste, iets conservatievere aanpak is een aanvaardbare afweging, geen fout op zich — je hoeft niet elke trade te pakken.\n" +
        "- Consistente toepassing van hetzelfde raamwerk (sweep, structuurbreuk, demand/supply-entry) leidde in dit voorbeeld tot 2 winsten en 1 gemiste kans, zonder een enkel verlies — een realistisch beeld van hoe een week met deze aanpak eruitziet.",
      quiz: {
        questions: [
          {
            question:
              "Wat gebeurt er vaak met sessieliquiditeit (bv. Aziatische range) bij het openen van de volgende sessie?",
            options: [
              "Niets",
              "Die wordt vaak geveegd voordat de echte beweging begint",
              "De markt sluit dan altijd",
              "Dat gebeurt nooit",
            ],
            correctIndex: 1,
          },
          {
            question: "Telt een hele kleine imbalance nog mee als factor?",
            options: [
              "Nee, alleen grote imbalances tellen",
              "Ja, ook een kleine imbalance kan aangeven dat prijs er nog doorheen trekt",
              "Imbalance bestaat niet op lage timeframes",
              "Alleen op de weekchart",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is de les uit de gemiste trade in dit voorbeeld?",
            options: [
              "Je moet elke trade pakken, anders faal je",
              "Een bewuste, conservatievere keuze is een aanvaardbare afweging, geen fout",
              "Nooit op confirmatie wachten",
              "Gemiste trades betekenen dat de strategie niet werkt",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het bewust accepteren van gemiste trades (in ruil voor extra confirmatie) de gemiddelde kwaliteit/RR van de trades die wél genomen worden verhoogt.",
      order: 47,
    },
    {
      title: "JaeFX — Liquidity 17: Buy-side & sell-side liquiditeit",
      videoRef: videoUrl("zb_kiI-VVwU", 20),
      content:
        "- Buy-side liquiditeit ligt boven een recent high (stop-losses van verkopers + buy-stops van breakout-kopers); sell-side liquiditeit ligt onder een recent low (stop-losses van kopers + sell-stops van breakout-verkopers).\n" +
        "- Bij paren die overwegend in één sessie (bv. Aziatisch) zijwaarts bewegen, vormt zich vaak een range met buy-side liquiditeit boven én sell-side liquiditeit onder — beide kanten worden regelmatig geveegd voordat een echte richting kiest.\n" +
        "- Veelvoorkomend patroon: eerst de ene kant vegen (bv. buy-side), dan de andere kant (sell-side), en pas dáárna de daadwerkelijke doorbraak/trend — vandaar dat je met puur support/resistance-handelen zo vaak wordt uitgestopt.\n" +
        "- Deze termen (buy-side/sell-side) zijn vooral bedoeld om je begrip te verscherpen van wélke kant van een range op een bepaald moment de 'magneet' is, niet als een op zichzelf staand instapmodel.",
      quiz: {
        questions: [
          {
            question: "Waar ligt buy-side liquiditeit?",
            options: [
              "Onder een recent low",
              "Boven een recent high",
              "Altijd op een rond getal",
              "Nergens, dat bestaat niet",
            ],
            correctIndex: 1,
          },
          {
            question: "Wat is een veelvoorkomend patroon in een zijwaarts bewegende range?",
            options: [
              "De markt sweept nooit beide kanten",
              "Eerst de ene kant vegen, dan de andere, pas daarna de echte doorbraak",
              "De markt breekt altijd meteen door zonder te sweepen",
              "Alleen de bovenkant wordt ooit geveegd",
            ],
            correctIndex: 1,
          },
          {
            question: "Waarvoor zijn de termen buy-side/sell-side vooral bedoeld?",
            options: [
              "Als volledig instapmodel op zichzelf",
              "Om te begrijpen welke kant van een range op dat moment de 'magneet' is",
              "Als synoniem voor koop/verkoop-orders bij je broker",
              "Ze hebben geen praktisch nut",
            ],
            correctIndex: 1,
          },
        ],
      },
      completed: false,
      quizScore: null,
      suggestedHypothesis:
        "Test of het wachten tot beide kanten (buy-side én sell-side) van een sessie-range zijn geveegd, vóór het nemen van een directional trade, het aantal premature entries in zijwaartse markten vermindert.",
      order: 48,
    },
  ]);

  console.log("Seeded 17 lessons (JaeFX — Mastering Liquidity playlist).");
}
