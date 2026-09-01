/**
 * Formatpruefungen fuer die Kontaktangaben im Akquise-Check.
 *
 * Bewusst GEMEINSAM von Formular und Worker benutzt (wie fragen.ts), damit
 * beide dieselben Regeln anwenden. Wuerde das Formular strenger pruefen als
 * der Worker, kaeme Unsinn durch; waere es lockerer, bekaeme jemand erst nach
 * dem Absenden eine Absage.
 *
 * Hier stehen nur Pruefungen, die ohne Netz auskommen. Ob eine Domain wirklich
 * Post empfangen kann und ob eine Website tatsaechlich erreichbar ist, prueft
 * allein der Worker — das braucht DNS und gehoert nicht in den Browser.
 */

// ---------------------------------------------------------------------------
// Postleitzahl
// ---------------------------------------------------------------------------

/** Fuenf Ziffern. Ob es die Postleitzahl gibt, entscheidet der Datensatz. */
export function istPlzFormat(wert: string): boolean {
  return /^\d{5}$/.test(wert.trim())
}

/**
 * Ortsnamen vergleichbar machen: Gross/Klein, Umlaute und Bindestriche
 * einebnen. "Lübeck", "luebeck" und "LUEBECK" gelten damit als derselbe Ort.
 */
export function ortSchluessel(wert: string): string {
  return wert
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '')
}

// ---------------------------------------------------------------------------
// E-Mail
// ---------------------------------------------------------------------------

// Pragmatisch statt vollstaendig nach RFC: Die vollstaendige Grammatik laesst
// Adressen zu, die kein Postfach der Welt annimmt. Diese Fassung verlangt
// einen Namensteil ohne Leerzeichen, eine Domain aus gueltigen Labeln und eine
// Endung aus mindestens zwei Buchstaben.
const EMAIL_MUSTER =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i

/**
 * Wegwerfadressen. Wer eine solche Adresse angibt, will nicht erreicht
 * werden — dann ist die Anfrage fuer beide Seiten wertlos. Die Liste ist
 * bewusst kurz und deckt die verbreiteten Anbieter ab; sie ist keine
 * vollstaendige Abwehr und soll auch keine sein.
 */
const WEGWERF_DOMAINS = new Set([
  '10minutemail.com', '20minutemail.com', 'anonbox.net', 'byom.de',
  'dispostable.com', 'einrot.com', 'emailondeck.com', 'fakeinbox.com',
  'getairmail.com', 'getnada.com', 'guerrillamail.com', 'guerrillamail.de',
  'harakirimail.com', 'inboxbear.com', 'mail-temporaire.fr', 'mail7.io',
  'mailcatch.com', 'maildrop.cc', 'mailinator.com', 'mailnesia.com',
  'mintemail.com', 'mohmal.com', 'moakt.com', 'muellmail.com',
  'nospam.today', 'nowmymail.com', 'sharklasers.com', 'spam4.me',
  'temp-mail.org', 'tempmail.de', 'tempmailo.com', 'tempr.email',
  'throwawaymail.com', 'trashmail.com', 'trashmail.de', 'wegwerfmail.de',
  'wegwerfemail.de', 'yopmail.com', 'yopmail.fr', 'zeta-telecom.com',
])

/**
 * Haeufige Vertipper bei grossen Anbietern. Wird NICHT abgelehnt, sondern nur
 * als Rueckfrage angeboten ("Meinten Sie gmail.com?") — sonst wuerde eine
 * seltene, aber echte Domain faelschlich blockiert.
 */
const TIPPFEHLER: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.de': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmail.co': 'gmail.com', 'gnail.com': 'gmail.com',
  'googlemail.con': 'googlemail.com',
  'web.de.de': 'web.de', 'wb.de': 'web.de', 'wed.de': 'web.de',
  'gmx.de.de': 'gmx.de', 'gmc.de': 'gmx.de', 'gmx.ed': 'gmx.de',
  't-onlie.de': 't-online.de', 't-online.com': 't-online.de',
  'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com',
  'yaho.com': 'yahoo.com', 'yahho.com': 'yahoo.com',
}

export function emailDomain(wert: string): string {
  const i = wert.lastIndexOf('@')
  return i < 0 ? '' : wert.slice(i + 1).toLowerCase().trim()
}

export function istEmailFormat(wert: string): boolean {
  const w = wert.trim()
  // Laengengrenzen nach RFC 5321: 64 Zeichen Namensteil, 254 gesamt.
  if (w.length > 254 || w.length < 6) return false
  const i = w.lastIndexOf('@')
  if (i < 1 || i > 64) return false
  return EMAIL_MUSTER.test(w)
}

export function istWegwerfAdresse(wert: string): boolean {
  return WEGWERF_DOMAINS.has(emailDomain(wert))
}

/** Vorschlag bei erkanntem Vertipper, sonst null. */
export function tippfehlerVorschlag(wert: string): string | null {
  const d = emailDomain(wert)
  const richtig = TIPPFEHLER[d]
  return richtig ? wert.trim().slice(0, wert.trim().lastIndexOf('@') + 1) + richtig : null
}

// ---------------------------------------------------------------------------
// Website
// ---------------------------------------------------------------------------

/**
 * Eingabe zu einer Adresse machen. Nimmt "planbstudios.de",
 * "www.planbstudios.de" und "https://planbstudios.de/pfad" entgegen und gibt
 * eine vollstaendige Adresse zurueck — oder null, wenn daraus keine werden
 * kann.
 *
 * Abgelehnt werden bewusst: Adressen ohne Punkt, reine IP-Adressen und lokale
 * Namen. Das sind keine Websites, die ein Kunde vorzeigen kann.
 */
export function normalisiereWebsite(wert: string): string | null {
  let w = wert.trim()
  if (!w) return null
  if (w.length > 300) return null
  // Nur http und https. Wer "ftp://" oder "javascript:" eingibt, meint nichts,
  // was hier weiterhilft.
  if (/^[a-z][a-z0-9+.-]*:/i.test(w)) {
    if (!/^https?:\/\//i.test(w)) return null
  } else {
    w = 'https://' + w
  }

  let url: URL
  try {
    url = new URL(w)
  } catch {
    return null
  }

  const host = url.hostname.toLowerCase()
  if (!host.includes('.')) return null
  if (host.endsWith('.')) return null
  // IP-Adressen und lokale Namen
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return null
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.localhost')) return null
  // Jedes Label gueltig, Endung mindestens zwei Buchstaben
  if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(host)) return null

  url.hash = ''
  return url.toString()
}

/** Nur der Hostname einer normalisierten Adresse. */
export function websiteHost(wert: string): string {
  try {
    return new URL(wert).hostname.toLowerCase()
  } catch {
    return ''
  }
}

// ---------------------------------------------------------------------------
// Telefon
// ---------------------------------------------------------------------------

/** Schreibweise vereinheitlichen: nur Ziffern, fuehrendes + bleibt erhalten. */
export function normalisiereTelefon(wert: string): string {
  const w = wert.trim().replace(/[\s/.\-()]/g, '')
  if (w.startsWith('+')) return '+' + w.slice(1).replace(/\D/g, '')
  if (w.startsWith('00')) return '+' + w.slice(2).replace(/\D/g, '')
  return w.replace(/\D/g, '')
}

/**
 * Plausibilitaetspruefung fuer den Browser. Die verbindliche Pruefung macht
 * der Worker mit libphonenumber; hier geht es nur um sofortige Rueckmeldung
 * beim Tippen, ohne dafuer 80 KB Metadaten in den Browser zu laden.
 *
 * Deutsche Nummern: Vorwahl mit fuehrender Null, danach Rufnummer. Insgesamt
 * mindestens 7 und hoechstens 15 Ziffern (E.164-Obergrenze).
 */
export function istTelefonFormat(wert: string): boolean {
  const n = normalisiereTelefon(wert)
  if (!n) return false

  const ziffern = n.startsWith('+') ? n.slice(1) : n
  // Offensichtliche Platzhalter billig abfangen, damit sie schon im Formular
  // auffallen und nicht erst der Worker sie zurueckweist: eine einzige Ziffer
  // wiederholt ("1111111111") oder eine glatte Zahlenreihe ("0123456789").
  if (/^(\d)\1+$/.test(ziffern)) return false
  if ('01234567890123456789'.includes(ziffern) && ziffern.length > 5) return false

  if (n.startsWith('+')) return /^\d{8,15}$/.test(ziffern)
  // Inlandsformat: fuehrende Null, danach mindestens sechs weitere Ziffern.
  if (!/^0\d{6,14}$/.test(n)) return false
  // 0 gefolgt von 0 gibt es nicht (das waere eine Auslandsvorwahl).
  if (n.startsWith('00')) return false
  return true
}

// ---------------------------------------------------------------------------
// Region (Postleitzahl + Ort)
// ---------------------------------------------------------------------------

/**
 * Antwort auf Frage 1 wird als "23552 Lübeck" gespeichert — eine Zeichenkette,
 * damit sich am Aufbau der Fragen nichts aendert. Weil eine deutsche
 * Postleitzahl IMMER genau fuenf Ziffern hat, laesst sie sich eindeutig wieder
 * zerlegen; der Rest ist der Ort, auch wenn er selbst Ziffern oder Leerzeichen
 * enthaelt ("29614 Soltau" ebenso wie "56637 Neuwied am Rhein").
 */
export function zerlegeRegion(wert: string): { plz: string; ort: string } | null {
  const w = wert.trim()
  const treffer = /^(\d{5})\s+(.+)$/.exec(w)
  if (!treffer) return null
  return { plz: treffer[1], ort: treffer[2].trim() }
}

/** Gegenstueck zu zerlegeRegion. */
export function baueRegion(plz: string, ort: string): string {
  const p = plz.trim()
  const o = ort.trim()
  return p && o ? `${p} ${o}` : ''
}
