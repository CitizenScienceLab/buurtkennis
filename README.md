# BuurtKennis

Openbare pagina's van BuurtKennis, een project van het Citizen Science Lab.

## Wat staat waar

Een map zonder `_` ervoor is een pagina. Een map of bestand dat met `_` begint is een bron: het verschijnt niet als pagina, maar pagina's lezen eruit. Ook bronnen zijn openbaar, want deze repo is openbaar.

- `index.html`: startpagina: de buurtkaart met de lopende trajecten
- `assets/`: gedeelde stijl (`site.css`) en logo's
- `_trajecten/`: één bestand per traject, de inhoud van de kaart (zie hieronder)
- `_data/plekken.yml`: wijken en buurten van Leiden met hun code; `_data/themas.yml`: thema's als tag
- `trajecten/`, `fases/`: lijst van trajecten en het fasekompas; `werkversie.html`: de kaart ook als hij uit staat
- `_includes/kaart-leiden.svg`: de getekende kaart (wijken, buurten, water); `_includes/kaart-blok.html`: kaart plus card
- [`overzicht/`](overzicht/): de eerdere kaart per buurt (versie 1), met `_buurten/` als bron
- [`hittemaatregelen/`](hittemaatregelen/): ideeën uit de workshop over hittestress van 27 augustus 2026
- `_buurten/`: één bestand per buurt, de inhoud van de kaart
- `_data/methode.yml`: de fases en stappen van de methode. GitBook is de bron; hier staan alleen volgorde, kleur en symbool, en de links naar GitBook
- `_config.yml`: instellingen voor de bouw (GitHub Pages bouwt deze repo met Jekyll)

Een nieuwe losse pagina: maak een eigen map met een `index.html`, link `../assets/site.css`, en zet hem in de lijst op de startpagina.

## Een traject bijwerken of toevoegen

Kopieer een bestand in `_trajecten/` en pas de gegevens aan. De bestandsnaam wordt het adres: `noord-geluid.md` wordt `trajecten/noord-geluid/`.

| Veld | Wat |
|---|---|
| `titel` | naam van het traject |
| `fase` | `B`, `C`, `D` of `E`; een substap mag ook (`D1`) |
| `thema` | sleutel uit `_data/themas.yml` (`algemeen` als er geen thema is) |
| `plek` | code uit `_data/plekken.yml`: een buurt (`BU…`), een wijk (`WK…`) of `leiden` |
| `pleknaam` | alleen als de naam afwijkt van de CBS-naam, zoals `Groenoord-Zuid` |
| `midden` | `[x, y]` om het doosje op een andere plek op de kaart te zetten (optioneel) |
| `sinds` | `2026-08` |
| `doel` | één of twee zinnen |
| `activiteiten` | lijst met `wat`, `wanneer`, `waar`, `wie` |
| `links` | lijst met `tekst` en `url` |

Onder de tweede `---` mag gewone tekst; die komt op de trajectpagina.

## Een buurt bijwerken op de oude kaart (overzicht)

Dat kan gewoon in de browser, op github.com:

1. Open het bestand in `_buurten/` en klik op het potlood. Voor een nieuwe buurt kopieer je een bestaand bestand. De bestandsnaam wordt het adres: `noord.md` wordt `overzicht/#noord`.
2. Bovenin, tussen de twee regels met `---`, staan de gegevens. Zet tekst tussen aanhalingstekens en let op het inspringen.
3. Onder de tweede `---` staat je uitleg, als gewone tekst. Kopjes (`##`), links en opsommingen werken.
4. Klik op *Commit changes*. Na ongeveer een minuut staat het online. Zit er een fout in het bestand, dan blijft de vorige versie gewoon staan en krijg je een melding van GitHub.

De gegevens bovenin:

| Veld | Wat |
|---|---|
| `naam` | naam van de buurt |
| `zichtbaar` | `true`, of `false` om de buurt van de kaart te halen |
| `plek` | `[breedtegraad, lengtegraad]` van ongeveer het midden. Op openstreetmap.org zie je die door met de rechtermuisknop op de plek te klikken en het adres te laten tonen. |
| `straal` | grootte van de zone in meter (zonder straal: 350) |
| `bijgewerkt` | datum, zoals `2026-10-02` |
| `stap` | de stap van de buurt zelf, zolang er nog geen thema's zijn (bijvoorbeeld `B1`) |
| `themas` | per thema: `naam`, `stap`, `kwesties` (een lijst) en eventueel `uitkomst` met `tekst` en `link` |
| `handleiding` | link naar een GitBook-pagina over deze buurt (mag leeg) |

De kleur op de kaart volgt vanzelf uit het thema dat het verst is. Een thema dat de methode verlaat, krijgt `stap: geen-vervolg` of `stap: doorverwezen`.

## Aan en uit, en de werkversie

**Nieuwe kaart (startpagina):** `buurtkaart: aan` of `uit` in `_config.yml`. Bij uit toont de startpagina een melding; `werkversie` laat de kaart altijd zien.

**Oude kaart (/overzicht):**

Werken jullie aan de kaart en mag niemand het tussenresultaat zien:

1. Zet in `_config.yml` de regel `buurtenkaart: aan` op `uit`. Bezoekers van `overzicht/` zien dan alleen een korte melding.
2. Bekijk je werk op de werkversie: `overzicht/werkversie`. Die laat altijd zien wat er nu in de bestanden staat, met bovenaan een kader dat zegt dat het de werkversie is. Hij is nergens gelinkt en zoekmachines slaan hem over.
3. Klaar? Zet `buurtenkaart` terug op `aan`.

Eén buurt van de kaart halen kan ook: zet in het bestand van die buurt `zichtbaar: false`.

Uit is niet weg: de werkversie en de bestanden in deze repo blijven voor iedereen te vinden die zoekt. Wat niet openbaar mag, hoort niet in deze repo.

## Voor je opslaat

Alles in deze repo is openbaar, ook wat de kaart niet laat zien. Wat eenmaal is opgeslagen, blijft in de geschiedenis staan, ook als je het later weghaalt. Controleer daarom vóór het opslaan:

1. Kwesties staan er als onderzoeksvraag in je eigen woorden: geen citaten, en geen details waaraan iemand in de buurt herkenbaar is.
2. Er staan geen namen van personen in, ook niet van ambtenaren of onderzoekers.
3. Er staat geen interne stand van zaken in uit gesprekken met partners.
