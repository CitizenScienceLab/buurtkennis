# BuurtKennis

Openbare pagina's van BuurtKennis, een project van het Citizen Science Lab.

## Wat staat waar

Een map zonder `_` ervoor is een pagina. Een map of bestand dat met `_` begint is een bron: het verschijnt niet als pagina, maar pagina's lezen eruit. Ook bronnen zijn openbaar, want deze repo is openbaar.

- `index.html`: startpagina met de lijst van pagina's
- `assets/`: gedeelde stijl (`site.css`) en logo's
- [`buurten/`](buurten/): de kaart met waar BuurtKennis loopt, en hoe ver het per buurt is. De pagina zelf staat in `_includes/buurtenkaart.html`
- [`hittemaatregelen/`](hittemaatregelen/): ideeën uit de workshop over hittestress van 27 augustus 2026
- `_buurten/`: één bestand per buurt, de inhoud van de kaart
- `_data/methode.yml`: de fases en stappen van de methode. GitBook is de bron; hier staan alleen volgorde, kleur en symbool, en de links naar GitBook
- `_config.yml`: instellingen voor de bouw (GitHub Pages bouwt deze repo met Jekyll)

Een nieuwe losse pagina: maak een eigen map met een `index.html`, link `../assets/site.css`, en zet hem in de lijst op de startpagina.

## Een buurt bijwerken of toevoegen

Dat kan gewoon in de browser, op github.com:

1. Open het bestand in `_buurten/` en klik op het potlood. Voor een nieuwe buurt kopieer je een bestaand bestand. De bestandsnaam wordt het adres: `noord.md` wordt `buurten/#noord`.
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

Werken jullie aan de kaart en mag niemand het tussenresultaat zien:

1. Zet in `_config.yml` de regel `buurtenkaart: aan` op `uit`. Bezoekers van `buurten/` zien dan alleen een korte melding, en de link op de startpagina verdwijnt.
2. Bekijk je werk op de werkversie: `buurten/werkversie`. Die laat altijd zien wat er nu in de bestanden staat, met bovenaan een kader dat zegt dat het de werkversie is. Hij is nergens gelinkt en zoekmachines slaan hem over.
3. Klaar? Zet `buurtenkaart` terug op `aan`.

Eén buurt van de kaart halen kan ook: zet in het bestand van die buurt `zichtbaar: false`.

Uit is niet weg: de werkversie en de bestanden in deze repo blijven voor iedereen te vinden die zoekt. Wat niet openbaar mag, hoort niet in deze repo.

## Voor je opslaat

Alles in deze repo is openbaar, ook wat de kaart niet laat zien. Wat eenmaal is opgeslagen, blijft in de geschiedenis staan, ook als je het later weghaalt. Controleer daarom vóór het opslaan:

1. Kwesties staan er als onderzoeksvraag in je eigen woorden: geen citaten, en geen details waaraan iemand in de buurt herkenbaar is.
2. Er staan geen namen van personen in, ook niet van ambtenaren of onderzoekers.
3. Er staat geen interne stand van zaken in uit gesprekken met partners.
