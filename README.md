# BuurtKennis

Openbare pagina's van BuurtKennis, een project van het Citizen Science Lab.

## Wat staat waar

Een map zonder `_` ervoor is een pagina. Een map of bestand dat met `_` begint is een bron: het verschijnt niet als pagina, maar pagina's lezen eruit. Ook bronnen zijn openbaar, want deze repo is openbaar.

- `index.html`: startpagina, de kaart van Leiden met buurten en trajecten
- `_buurten/`: één bestand per buurt van Leiden (alle 54 staan er al). Een buurt telt op de kaart mee zodra er een fase, doel of activiteit in staat, of zodra een traject er loopt
- `_trajecten/`: één bestand per thematisch traject; elk traject is een doosje op de kaart
- `_data/cbs.yml`: wijken en buurten van Leiden met hun CBS-code; `_data/themas.yml`: thema's met kleur; `_data/methode.yml`: fases en stappen (GitBook is de bron, hier staan alleen volgorde, kleur en links)
- `trajecten/`: lijst van buurten en trajecten; `fases/`: het fasekompas; `werkversie.html`: de kaart, ook als hij uit staat
- `assets/bk.css`: stijl van de kaart; `assets/site.css`: stijl van de losse pagina's
- `_includes/kaart-leiden.svg`: de getekende kaart; `_includes/kaart-blok.html`: kaart, kompas en card; `_includes/doos-symbolen.svg`: de doos
- [`overzicht/`](overzicht/): de eerdere kaart (versie 1), met `_overzicht/` als bron
- [`hittemaatregelen/`](hittemaatregelen/): ideeën uit de workshop over hittestress van 27 augustus 2026
- `_config.yml`: instellingen voor de bouw (GitHub Pages bouwt deze repo met Jekyll); `_data/instellingen.yml`: kaarten aan of uit

Een nieuwe losse pagina: maak een eigen map met een `index.html`, link `../assets/site.css`, en zet hem in de lijst op de startpagina.

## Bewerken in de browser

Snelste weg: twee knoppen die een nieuw bestand openen met het sjabloon al ingevuld. Vervang de voorbeeldwaarden, geef het bestand een naam (kleine letters en streepjes) en klik op *Commit changes*.

- [**Nieuw traject**](https://github.com/CitizenScienceLab/buurtkennis/new/main/_trajecten?filename=nieuw-traject.md&value=---%0Atitel%3A%20%22Naam%20van%20het%20traject%22%0Afase%3A%20B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%23%20B%2C%20C%2C%20D%20of%20E%0Athema%3A%20hittestress%20%20%20%20%20%20%20%20%20%20%20%23%20sleutel%20uit%20_data%2Fthemas.yml%0Abuurten%3A%20%5Bgroenoord%5D%20%20%20%20%23%20bestandsnamen%20uit%20_buurten%2F%2C%20%C3%A9%C3%A9n%20of%20meer%0Asinds%3A%202026-10%0Adoel%3A%20%22E%C3%A9n%20of%20twee%20zinnen.%22%0Aactiviteiten%3A%0A%20%20-%20%7B%20wat%3A%20%22Wat%20gebeurde%20er%22%2C%20wanneer%3A%20%22oktober%202026%22%2C%20waar%3A%20%22Buurt%22%2C%20wie%3A%20%22met%20wie%20%28geen%20namen%29%22%20%7D%0Alinks%3A%20%5B%5D%0A---%0A)
- [**Nieuwe buurt**](https://github.com/CitizenScienceLab/buurtkennis/new/main/_buurten?filename=nieuwe-buurt.md&value=---%0Anaam%3A%20%22Naam%20van%20de%20buurt%22%0Aplek%3A%20BU05460300%20%20%20%20%20%20%20%20%20%20%20%20%20%23%20CBS-code%20uit%20_data%2Fcbs.yml%0Afase%3A%20B%0Asinds%3A%202026-10%0Adoel%3A%20%22E%C3%A9n%20of%20twee%20zinnen.%22%0Aactiviteiten%3A%0A%20%20-%20%7B%20wat%3A%20%22Wat%20gebeurde%20er%22%2C%20wanneer%3A%20%22oktober%202026%22%2C%20waar%3A%20%22Buurt%22%2C%20wie%3A%20%22met%20wie%20%28geen%20namen%29%22%20%7D%0A---%0A)

Of met een beheerscherm: ga naar [app.pagescms.org](https://app.pagescms.org), log in met GitHub en kies deze repo. Je krijgt dan formulieren met keuzelijsten voor fase, thema en buurt, en een plusje voor een activiteit; het resultaat is dezelfde commit. De inrichting staat in `.pages.yml`.

Alles kan op github.com: open een bestand, klik op het potlood, pas aan, en klik op *Commit changes*. Na ongeveer een minuut staat het online. Zit er een fout in, dan blijft de vorige versie staan en krijg je een melding van GitHub. Voor iets nieuws kopieer je een bestaand bestand; de bestandsnaam wordt het adres.

Bovenin het bestand, tussen de twee regels met `---`, staan de gegevens. Zet tekst tussen aanhalingstekens en let op het inspringen.

## Een buurt bijwerken of toevoegen

Een bestand in `_buurten/`, bijvoorbeeld `lage-mors.md` (adres: `/#lage-mors`). Een klik op de buurt op de kaart toont dit, met de trajecten die er lopen. Elke buurt van Leiden heeft al een bestand: een nieuwe buurt aanmaken hoeft niet, vul het bestaande bestand aan.

| Veld | Wat |
|---|---|
| `naam` | naam van de buurt |
| `plek` | CBS-code uit `_data/cbs.yml`, meestal een buurt (`BU…`) |
| `fase` | `A` t/m `F`; een substap mag ook (`B2`). Leeg laten als er alleen een traject loopt en nog geen eigen buurtwerk. De buurt kleurt op de kaart naar zijn eigen fase. Zonder eigen fase kleurt hij naar de verste fase van de trajecten die er lopen |
| `sinds` | `2026-09` |
| `doel` | één of twee zinnen |
| `activiteiten` | lijst met `wat`, `wanneer`, `waar`, `wie` |
| `links` | lijst met `tekst` en `url` (optioneel) |

De thema-tags van een buurt volgen vanzelf uit de trajecten die er lopen.

## Een traject bijwerken of toevoegen

Een bestand in `_trajecten/`, bijvoorbeeld `noord-geluid.md` (adres: `trajecten/noord-geluid/`). Elk traject is een doosje op de kaart, in de buurt(en) waar het loopt. Een traject hoort altijd bij buurten, niet bij een wijk.

| Veld | Wat |
|---|---|
| `titel` | naam van het traject |
| `fase` | `B`, `C`, `D` of `E`; een substap mag ook (`D1`) |
| `thema` | sleutel uit `_data/themas.yml` |
| `buurten` | bestandsnamen uit `_buurten/`, één of meer: `[groenoord]` of `[hoge-mors, lage-mors]`. In elke genoemde buurt komt een doosje |
| `midden` | `[x, y]` om het eerste doosje zelf te plaatsen (optioneel; anders zoekt de kaart een vrije plek in de buurt) |
| `sinds` | `2026-08` |
| `doel` | één of twee zinnen |
| `activiteiten` | lijst met `wat`, `wanneer`, `waar`, `wie` |
| `links` | lijst met `tekst` en `url` |

Onder de tweede `---` mag gewone tekst; die komt op de trajectpagina.

## De oude kaart (overzicht)

De bestanden in `_overzicht/` voeden `overzicht/`. Velden: `naam`, `zichtbaar` (`false` haalt de buurt weg), `plek` (`[breedtegraad, lengtegraad]`), `straal` (meter, standaard 350), `bijgewerkt`, `stap`, `themas` (per thema `naam`, `stap`, `kwesties`, eventueel `uitkomst`) en `handleiding`.

## Aan en uit, en de werkversie

**Nieuwe kaart (startpagina):** `buurtkaart: aan` of `uit` in `_data/instellingen.yml` (of in het beheerscherm onder Instellingen). Bij uit toont de startpagina een melding; `werkversie` laat de kaart altijd zien.

**Oude kaart (/overzicht):**

Werken jullie aan de kaart en mag niemand het tussenresultaat zien:

1. Zet in `_data/instellingen.yml` (of in het beheerscherm onder Instellingen) de regel `buurtenkaart: aan` op `uit`. Bezoekers van `overzicht/` zien dan alleen een korte melding.
2. Bekijk je werk op de werkversie: `overzicht/werkversie`. Die laat altijd zien wat er nu in de bestanden staat, met bovenaan een kader dat zegt dat het de werkversie is. Hij is nergens gelinkt en zoekmachines slaan hem over.
3. Klaar? Zet `buurtenkaart` terug op `aan`.

Eén buurt van de oude kaart halen kan ook: zet in het bestand in `_overzicht/` `zichtbaar: false`.

Uit is niet weg: de werkversie en de bestanden in deze repo blijven voor iedereen te vinden die zoekt. Wat niet openbaar mag, hoort niet in deze repo.

## Voor je opslaat

Alles in deze repo is openbaar, ook wat de kaart niet laat zien. Wat eenmaal is opgeslagen, blijft in de geschiedenis staan, ook als je het later weghaalt. Controleer daarom vóór het opslaan:

1. Kwesties staan er als onderzoeksvraag in je eigen woorden: geen citaten, en geen details waaraan iemand in de buurt herkenbaar is.
2. Er staan geen namen van personen in, ook niet van ambtenaren of onderzoekers.
3. Er staat geen interne stand van zaken in uit gesprekken met partners.
