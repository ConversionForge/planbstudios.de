import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  istEmailFormat,
  istTelefonFormat,
  istWegwerfAdresse,
  tippfehlerVorschlag,
} from '../akquise/pruefung'
import { EMAIL, TERMIN_URL } from '../lib/kontakt'

// Ablauf-Einschaetzung: der kostenlose Einstieg fuer Automatisierung.
//
// Der Besucher beschreibt bis zu drei Ablaeufe in eigenen Worten, der Inhaber
// antwortet persoenlich. Bewusst ohne automatische Auswertung: Eine Maschine,
// die aus drei Saetzen schliesst, was sich in einem fremden Betrieb
// automatisieren laesst, wuerde raten. Genau das soll diese Seite nicht.
//
// Dieselben Pruefregeln wie im Akquise-Check (src/akquise/pruefung.ts). Der
// Server prueft sie noch einmal und zusaetzlich, ob die Mail-Domain Post
// empfangen kann; der Browser allein waere kein Schutz.

const MIN_TEXT = 20
const MAX_TEXT = 2000
const MINDESTDAUER_MS = 4000 // schneller ausgefuellt = mit hoher Wahrscheinlichkeit ein Bot

type Status = 'ruhe' | 'sendet' | 'fehler' | 'fertig'

interface Felder {
  ablaeufe: string
  branche: string
  name: string
  email: string
  telefon: string
}

const LEER: Felder = { ablaeufe: '', branche: '', name: '', email: '', telefon: '' }

const feldKlasse = (beanstandet: boolean) =>
  `w-full rounded-xl border bg-night/40 px-4 py-3.5 text-[16px] text-cream outline-none transition-colors placeholder:text-stone/60 focus:border-gold ${
    beanstandet ? 'border-gold/70' : 'border-night-line'
  }`

export function Einschaetzung() {
  const [f, setF] = useState<Felder>(LEER)
  const [einwilligung, setEinwilligung] = useState(false)
  const [status, setStatus] = useState<Status>('ruhe')
  const [fehlertext, setFehlertext] = useState('')
  const [feldFehler, setFeldFehler] = useState<{ feld: string; text: string } | null>(null)
  const [koeder, setKoeder] = useState('') // Honigtopf: fuer Menschen unsichtbar
  const startZeit = useRef(Date.now())

  const setze = (feld: keyof Felder, wert: string) => {
    if (feldFehler?.feld === feld) setFeldFehler(null)
    setF((alt) => ({ ...alt, [feld]: wert }))
  }

  const textOk = f.ablaeufe.trim().length >= MIN_TEXT
  const emailOk = istEmailFormat(f.email) && !istWegwerfAdresse(f.email)
  // Telefon ist freiwillig. Steht aber etwas drin, muss es eine Nummer sein.
  const telefonOk = f.telefon.trim() === '' || istTelefonFormat(f.telefon)
  const vorschlag = tippfehlerVorschlag(f.email)
  const kannSenden =
    textOk && f.name.trim().length > 1 && emailOk && telefonOk && einwilligung && status !== 'sendet'

  async function senden() {
    if (koeder.trim() !== '') return // stillschweigend verwerfen
    if (Date.now() - startZeit.current < MINDESTDAUER_MS) {
      setStatus('fehler')
      setFehlertext('Bitte nehmen Sie sich einen Moment mehr Zeit für die Angaben.')
      return
    }
    setStatus('sendet')
    setFehlertext('')
    try {
      const antwort = await fetch('/api/einschaetzung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          einwilligung,
          dauerMs: Date.now() - startZeit.current,
          koeder,
        }),
      })
      if (!antwort.ok) {
        const d = await antwort.json().catch(() => null)
        if (d && typeof d.feld === 'string') {
          setFeldFehler({ feld: d.feld, text: String(d.fehler || 'Bitte prüfen Sie diese Angabe.') })
          setStatus('ruhe')
          return
        }
        throw new Error('Status ' + antwort.status)
      }
      setStatus('fertig')
    } catch {
      setStatus('fehler')
      setFehlertext(
        'Das Absenden hat gerade nicht geklappt. Schreiben Sie mir bitte direkt, dann melde ich mich.',
      )
    }
  }

  if (status === 'fertig') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="status"
      >
        <p className="font-mono text-[12px] tracking-[0.3em] text-gold">ANGEKOMMEN</p>
        <p className="mt-5 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight text-cream">
          Danke. Ich sehe mir Ihre Abläufe an und melde mich persönlich.
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-stone">
          Wenn es schneller gehen soll:{' '}
          <a
            href={TERMIN_URL}
            target="_blank"
            rel="noopener"
            className="text-cream-soft underline underline-offset-4 hover:text-gold-bright"
          >
            Erstgespräch buchen
          </a>
          .
        </p>
      </motion.div>
    )
  }

  const fehlerZu = (feld: string) =>
    feldFehler?.feld === feld ? (
      <span className="text-[13px] leading-relaxed text-gold">{feldFehler.text}</span>
    ) : null

  return (
    <form
      className="flex flex-col gap-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (kannSenden) senden()
      }}
    >
      {/* Honigtopf: fuer Menschen unsichtbar, Bots fuellen ihn aus */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Bitte nicht ausfüllen
          <input tabIndex={-1} autoComplete="off" value={koeder} onChange={(e) => setKoeder(e.target.value)} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] tracking-[0.04em] text-stone">
          Welche Abläufe kosten Sie jede Woche Zeit?<span className="text-gold"> *</span>
        </span>
        <textarea
          rows={5}
          maxLength={MAX_TEXT}
          value={f.ablaeufe}
          onChange={(e) => setze('ablaeufe', e.target.value)}
          placeholder="Zum Beispiel: Anfragen aus dem Postfach in eine Tabelle übertragen. Angebote aus alten Vorlagen zusammenkopieren. Kunden an fehlende Unterlagen erinnern."
          className={`${feldKlasse(feldFehler?.feld === 'ablaeufe')} resize-y leading-relaxed`}
        />
        <span className="flex justify-between gap-4 text-[12px] text-stone">
          <span>Bis zu drei Abläufe, in Ihren eigenen Worten.</span>
          <span className="tabular-nums">
            {f.ablaeufe.trim().length < MIN_TEXT && f.ablaeufe.trim().length > 0
              ? `noch ${MIN_TEXT - f.ablaeufe.trim().length} Zeichen`
              : ''}
          </span>
        </span>
        {fehlerZu('ablaeufe')}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] tracking-[0.04em] text-stone">Branche oder Betrieb (optional)</span>
        <input
          type="text"
          autoComplete="organization"
          value={f.branche}
          onChange={(e) => setze('branche', e.target.value)}
          placeholder="Zum Beispiel: Steuerbüro, Restaurant, Handwerksbetrieb"
          className={feldKlasse(false)}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] tracking-[0.04em] text-stone">
            Name<span className="text-gold"> *</span>
          </span>
          <input
            type="text"
            autoComplete="name"
            value={f.name}
            onChange={(e) => setze('name', e.target.value)}
            className={feldKlasse(feldFehler?.feld === 'name')}
          />
          {fehlerZu('name')}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] tracking-[0.04em] text-stone">Telefon (optional)</span>
          <input
            type="tel"
            autoComplete="tel"
            value={f.telefon}
            onChange={(e) => setze('telefon', e.target.value)}
            className={feldKlasse(!telefonOk || feldFehler?.feld === 'telefon')}
          />
          {fehlerZu('telefon')}
          {!feldFehler && !telefonOk && (
            <span className="text-[13px] text-gold">Bitte mit Vorwahl, zum Beispiel 0451 1234567.</span>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] tracking-[0.04em] text-stone">
          E-Mail<span className="text-gold"> *</span>
        </span>
        <input
          type="email"
          autoComplete="email"
          value={f.email}
          onChange={(e) => setze('email', e.target.value)}
          className={feldKlasse((f.email.trim() !== '' && !emailOk) || feldFehler?.feld === 'email')}
        />
        {fehlerZu('email')}
        {!feldFehler && f.email.trim() !== '' && !emailOk && (
          <span className="text-[13px] text-gold">
            {istWegwerfAdresse(f.email)
              ? 'Unter einer Wegwerfadresse kann ich Sie nicht erreichen.'
              : 'Diese E-Mail-Adresse ist noch nicht vollständig.'}
          </span>
        )}
        {emailOk && vorschlag && (
          <span className="text-[13px] text-stone">
            Meinten Sie{' '}
            <button
              type="button"
              onClick={() => setze('email', vorschlag)}
              className="text-gold underline underline-offset-4"
            >
              {vorschlag}
            </button>
            ?
          </span>
        )}
      </label>

      <label className="mt-1 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={einwilligung}
          onChange={(e) => setEinwilligung(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold)]"
        />
        <span className="text-[13px] leading-relaxed text-stone">
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
          Anfrage gespeichert und verarbeitet werden. Die{' '}
          <Link
            to="/datenschutz/"
            target="_blank"
            className="text-cream-soft underline underline-offset-4 hover:text-gold"
          >
            Datenschutzerklärung
          </Link>{' '}
          habe ich zur Kenntnis genommen. Diese Einwilligung kann ich jederzeit
          widerrufen.
        </span>
      </label>

      {status === 'fehler' && (
        <p role="alert" className="rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-[14px] leading-relaxed text-cream-soft">
          {fehlertext}{' '}
          <a href={`mailto:${EMAIL}`} className="text-gold underline underline-offset-4">
            {EMAIL}
          </a>
        </p>
      )}

      <div className="mt-2">
        <button
          type="submit"
          disabled={!kannSenden}
          className="inline-flex items-center gap-3 rounded-full bg-gold py-3 pl-7 pr-7 text-[15px] font-medium text-night transition-colors duration-300 enabled:hover:bg-gold-bright enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'sendet' ? 'Wird gesendet …' : 'Abläufe schicken'}
        </button>
      </div>
    </form>
  )
}
