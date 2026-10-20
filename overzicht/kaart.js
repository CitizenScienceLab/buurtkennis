/* BuurtKennis per buurt: de kaart en de keuze van een buurt.
 *
 * De kaart staat stil: geen slepen of zoomen, zodat scrollen op een telefoon gewoon scrollen blijft.
 * Daarom is er geen kaartbibliotheek nodig; dit script legt zelf de tegels neer.
 * Tegels: BRT-achtergrondkaart (grijs) van het Kadaster, via PDOK.
 *
 * De buurten komen uit de knoppen onder de kaart (data-lat, data-lon, data-straal, data-fase).
 * Die knoppen maakt Jekyll uit _buurten/. Hier hoef je dus niets aan te passen voor een nieuwe buurt.
 */
(function () {
  'use strict';

  var TEGELS = 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:3857/{z}/{x}/{y}.png';
  var MAX_ZOOM = 19;
  var MIN_BREEDTE_KM = 4.5;  // laat genoeg van Leiden zien om je te oriënteren
  var MIN_HOOGTE_KM = 3;
  var MARGE = 0.1;           // ruimte rond de zones, als deel van de kaart
  var SVG = 'http://www.w3.org/2000/svg';

  var kaart = document.getElementById('kaart');
  var paneel = document.getElementById('paneel');
  var aankondiging = document.getElementById('aankondiging');
  var afslagen = document.querySelector('.afslagen');
  var knoppen = [].slice.call(document.querySelectorAll('.buurtknop'));
  if (!kaart || !paneel) return;

  var buurten = knoppen.map(function (k) {
    return {
      id: k.getAttribute('data-kies'),
      naam: k.getAttribute('data-naam'),
      lat: parseFloat(k.getAttribute('data-lat')),
      lon: parseFloat(k.getAttribute('data-lon')),
      straal: parseFloat(k.getAttribute('data-straal')) || 350,
      fase: k.getAttribute('data-fase') || '',
      vulling: k.getAttribute('data-vulling') || '0'
    };
  }).filter(function (b) { return isFinite(b.lat) && isFinite(b.lon); });

  var huidig = '';

  /* ---------- projectie: Web Mercator, tegels van 256 pixels ---------- */

  function px(lon, z) { return (lon + 180) / 360 * 256 * Math.pow(2, z); }
  function py(lat, z) {
    var r = lat * Math.PI / 180;
    return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * 256 * Math.pow(2, z);
  }
  function meterPerPixel(lat, z) { return 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, z); }

  // Het gebied dat de kaart laat zien: alle zones, en minstens een stuk Leiden eromheen.
  function gebied() {
    var noord = -90, zuid = 90, oost = -180, west = 180;
    buurten.forEach(function (b) {
      var dLat = b.straal / 111320;
      var dLon = b.straal / (111320 * Math.cos(b.lat * Math.PI / 180));
      noord = Math.max(noord, b.lat + dLat);
      zuid = Math.min(zuid, b.lat - dLat);
      oost = Math.max(oost, b.lon + dLon);
      west = Math.min(west, b.lon - dLon);
    });
    var midLat = (noord + zuid) / 2;
    var midLon = (oost + west) / 2;
    var halfHoogte = MIN_HOOGTE_KM * 1000 / 111320 / 2;
    var halfBreedte = MIN_BREEDTE_KM * 1000 / (111320 * Math.cos(midLat * Math.PI / 180)) / 2;
    return {
      noord: Math.max(noord, midLat + halfHoogte),
      zuid: Math.min(zuid, midLat - halfHoogte),
      oost: Math.max(oost, midLon + halfBreedte),
      west: Math.min(west, midLon - halfBreedte)
    };
  }

  /* ---------- tekenen ---------- */

  function teken() {
    var W = kaart.clientWidth;
    var H = kaart.clientHeight;
    if (!W || !H || !buurten.length) return;

    var g = gebied();
    var breedte0 = px(g.oost, 0) - px(g.west, 0);
    var hoogte0 = py(g.zuid, 0) - py(g.noord, 0);
    var z = Math.log(Math.min(W * (1 - 2 * MARGE) / breedte0, H * (1 - 2 * MARGE) / hoogte0)) / Math.LN2;
    // Tegelniveau: iets scherper dan nodig op een gewoon scherm, iets zachter op een retina-scherm,
    // zodat het aantal tegels overal ongeveer gelijk blijft (rond de twintig).
    var dpr = window.devicePixelRatio || 1;
    var zt = Math.max(0, Math.min(MAX_ZOOM, Math.ceil(z + Math.log(dpr) / Math.LN2 / 2)));
    var schaal = Math.pow(2, z - zt);
    var cx = (px(g.west, zt) + px(g.oost, zt)) / 2;
    var cy = (py(g.noord, zt) + py(g.zuid, zt)) / 2;

    function scherm(lon, lat) {
      return [(px(lon, zt) - cx) * schaal + W / 2, (py(lat, zt) - cy) * schaal + H / 2];
    }

    // tegels
    var tegels = document.createElement('div');
    tegels.className = 'tegels';
    var maat = 256 * schaal;
    var x0 = Math.floor((cx - W / 2 / schaal) / 256);
    var x1 = Math.floor((cx + W / 2 / schaal) / 256);
    var y0 = Math.floor((cy - H / 2 / schaal) / 256);
    var y1 = Math.floor((cy + H / 2 / schaal) / 256);
    for (var tx = x0; tx <= x1; tx++) {
      for (var ty = y0; ty <= y1; ty++) {
        var img = document.createElement('img');
        img.alt = '';
        img.decoding = 'async';
        img.draggable = false;
        img.style.left = Math.floor((tx * 256 - cx) * schaal + W / 2) + 'px';
        img.style.top = Math.floor((ty * 256 - cy) * schaal + H / 2) + 'px';
        img.style.width = img.style.height = (Math.ceil(maat) + 1) + 'px';  // 1 px overlap: geen naden
        img.onerror = verberg;
        img.src = TEGELS.replace('{z}', zt).replace('{x}', tx).replace('{y}', ty);
        tegels.appendChild(img);
      }
    }

    // zones en namen
    var zones = document.createElementNS(SVG, 'svg');
    zones.setAttribute('class', 'zones');
    zones.setAttribute('width', W);
    zones.setAttribute('height', H);
    zones.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var labels = document.createElement('div');
    labels.className = 'labels';

    buurten.forEach(function (b) {
      var p = scherm(b.lon, b.lat);
      var r = b.straal / meterPerPixel(b.lat, zt) * schaal;
      var kleur = 'var(--fase-' + b.fase + ')';

      var zone = document.createElementNS(SVG, 'circle');
      zone.setAttribute('class', 'zone');
      zone.setAttribute('cx', p[0].toFixed(1));
      zone.setAttribute('cy', p[1].toFixed(1));
      zone.setAttribute('r', r.toFixed(1));
      zone.setAttribute('data-kies', b.id);
      zone.style.setProperty('--k', kleur);
      zones.appendChild(zone);

      // de naam staat net onder de zone, zodat de zone zelf zichtbaar blijft
      var label = document.createElement('div');
      label.className = 'label';
      label.setAttribute('data-kies', b.id);
      label.style.left = p[0].toFixed(1) + 'px';
      label.style.top = (p[1] + r + 6).toFixed(1) + 'px';
      label.style.setProperty('--k', kleur);
      label.innerHTML = '<svg class="symbool" aria-hidden="true"><use href="#v' + b.vulling + '"/></svg><span></span>';
      label.lastChild.textContent = b.naam;
      labels.appendChild(label);
    });

    while (kaart.firstChild) kaart.removeChild(kaart.firstChild);
    kaart.appendChild(tegels);
    kaart.appendChild(zones);
    kaart.appendChild(labels);
    markeer();
  }

  function verberg() { this.style.visibility = 'hidden'; }

  /* ---------- een buurt kiezen ---------- */

  function naamVan(id) {
    for (var i = 0; i < buurten.length; i++) if (buurten[i].id === id) return buurten[i].naam;
    return '';
  }

  function markeer() {
    [].forEach.call(document.querySelectorAll('[data-kies]'), function (el) {
      var aan = huidig !== '' && el.getAttribute('data-kies') === huidig;
      if (el.classList.contains('buurtknop')) el.setAttribute('aria-pressed', String(aan));
      else if (el.classList) el.classList.toggle('actief', aan);
    });
    kaart.classList.toggle('heeft-keuze', huidig !== '');
  }

  function kies(id, bron) {
    huidig = naamVan(id) ? id : '';

    [].forEach.call(document.querySelectorAll('[data-buurt]'), function (el) {
      if (el.getAttribute('data-buurt') === huidig) el.setAttribute('data-actief', '');
      else el.removeAttribute('data-actief');
    });
    if (afslagen) afslagen.hidden = !afslagen.querySelector('[data-actief]');
    markeer();

    if (bron !== 'adres') {
      try { history.replaceState(null, '', huidig ? '#' + huidig : location.pathname + location.search); } catch (e) { /* mag */ }
    }
    if (aankondiging) aankondiging.textContent = huidig ? naamVan(huidig) + ' gekozen' : 'Overzicht van de methode';

    // Op een smal scherm staat het paneel onder de kaart: breng het in beeld.
    if (bron === 'klik' && window.matchMedia('(max-width: 899px)').matches) {
      var rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      paneel.scrollIntoView({ behavior: rustig ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function uitAdres() {
    var id = '';
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = ''; }
    return id;
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-kies]') : null;
    if (!el) return;
    e.preventDefault();
    kies(el.getAttribute('data-kies'), 'klik');
  });

  window.addEventListener('hashchange', function () { kies(uitAdres(), 'adres'); });

  var wacht;
  function later() { clearTimeout(wacht); wacht = setTimeout(teken, 120); }
  if (window.ResizeObserver) new ResizeObserver(later).observe(kaart);
  else window.addEventListener('resize', later);

  teken();
  kies(uitAdres(), 'adres');
})();
