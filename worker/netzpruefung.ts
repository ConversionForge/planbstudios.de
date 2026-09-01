/**
 * Pruefungen, die tatsaechlich nachsehen, statt nur die Schreibweise zu
 * beurteilen. Laeuft nur im Worker: Der Browser darf keine DNS-Abfragen fuer
 * fremde Domains machen, und die IP der Besucher soll dabei nicht auftauchen.
 *
 * Es fragt der Worker, nicht der Besucher. Uebertragen wird der DOMAINTEIL
 * einer Adresse, nie die vollstaendige E-Mail-Adresse.
 *
 * GRUNDSATZ FUER ALLE PRUEFUNGEN HIER: Abgelehnt wird nur bei einer
 * eindeutigen Absage des Nameservers. Laeuft die Abfrage in einen Fehler oder
 * in eine Zeitgrenze, gilt die Angabe als in Ordnung. Ein Ausfall bei
 * Cloudflare oder eine langsame Leitung darf keinen echten Interessenten
 * aussperren — im Zweifel lieber eine Anfrage zu viel als eine zu wenig.
 */

export type Befund = 'ja' | 'nein' | 'unbekannt'

const DOH = 'https://cloudflare-dns.com/dns-query'
const ZEITGRENZE_MS = 4000

interface DohAntwort {
  Status: number
  Answer?: { type: number; data: string }[]
}

/** DNS-Abfrage ueber HTTPS. Gibt null zurueck, wenn die Abfrage selbst scheitert. */
async function frage(name: string, typ: 'MX' | 'A' | 'AAAA'): Promise<DohAntwort | null> {
  try {
    const antwort = await fetch(
      `${DOH}?name=${encodeURIComponent(name)}&type=${typ}`,
      {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(ZEITGRENZE_MS),
      },
    )
    if (!antwort.ok) return null
    return (await antwort.json()) as DohAntwort
  } catch {
    return null
  }
}

// DNS-Statuscodes: 0 = NOERROR, 3 = NXDOMAIN (Name gibt es nicht).
const NOERROR = 0
const NXDOMAIN = 3

/**
 * Kann diese Domain ueberhaupt Post empfangen?
 *
 * Erst MX. Fehlt der, gilt nach RFC 5321 der A-Eintrag als Ersatz — viele
 * kleine Domains liefern Post so aus. Erst wenn beides fehlt, ist die Antwort
 * ein Nein.
 */
export async function kannPostEmpfangen(domain: string): Promise<Befund> {
  const mx = await frage(domain, 'MX')
  if (mx === null) return 'unbekannt'
  if (mx.Status === NXDOMAIN) return 'nein'
  if (mx.Status !== NOERROR) return 'unbekannt'

  // Typ 15 = MX. Ein leerer Eintrag ("0 .") bedeutet ausdruecklich: nimmt
  // keine Post an.
  const mxEintraege = (mx.Answer ?? []).filter((a) => a.type === 15)
  const echte = mxEintraege.filter((a) => {
    const ziel = a.data.trim().split(/\s+/).pop() ?? ''
    return ziel !== '.' && ziel !== ''
  })
  if (echte.length > 0) return 'ja'
  if (mxEintraege.length > 0) return 'nein' // ausdruecklicher Null-MX

  const a = await frage(domain, 'A')
  if (a === null) return 'unbekannt'
  if (a.Status === NXDOMAIN) return 'nein'
  if (a.Status !== NOERROR) return 'unbekannt'
  if ((a.Answer ?? []).some((e) => e.type === 1)) return 'ja'

  const aaaa = await frage(domain, 'AAAA')
  if (aaaa === null) return 'unbekannt'
  if ((aaaa.Answer ?? []).some((e) => e.type === 28)) return 'ja'
  return 'nein'
}

/** Loest dieser Hostname ueberhaupt auf? */
export async function domainLoestAuf(host: string): Promise<Befund> {
  const a = await frage(host, 'A')
  if (a === null) return 'unbekannt'
  if (a.Status === NXDOMAIN) return 'nein'
  if (a.Status === NOERROR && (a.Answer ?? []).some((e) => e.type === 1)) return 'ja'

  const aaaa = await frage(host, 'AAAA')
  if (aaaa === null) return 'unbekannt'
  if (aaaa.Status === NXDOMAIN) return 'nein'
  if (aaaa.Status === NOERROR && (aaaa.Answer ?? []).some((e) => e.type === 28)) return 'ja'

  // Kein A und kein AAAA, aber auch keine Absage: etwa eine Domain, die nur
  // per CNAME auf etwas zeigt, das gerade nicht aufloest. Nicht ablehnen.
  return 'unbekannt'
}
