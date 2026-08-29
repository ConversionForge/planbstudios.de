import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { CubeMark } from '../components/Logo'
import { GrainOverlay } from '../components/GrainOverlay'
import { LegalLinks } from '../components/LegalLinks'
import { FRAGEN, hinweiseAus, type Antworten } from '../akquise/fragen'
import { melde, meldeSchritt } from '../akquise/ereignis'

// Terminbuchung. Bewusst als Verlinkung und NICHT als Einbettung: Eine
// Einbettung laedt fremde Skripte nach und wuerde eine Einwilligung noetig
// machen. Solange die Adresse leer ist, wird stattdessen die E-Mail angeboten.
const TERMIN_URL = 'https://cal.com/plan-b-studios/erstgesprach'

const SPEICHER = 'pb-akquise-check'
const MINDESTDAUER_MS = 4000 // schneller als das ausgefuellt = mit hoher Wahrscheinlichkeit ein Bot

interface Kontakt {
  name: string
  firma: string
  email: string
  telefon: string
}

const LEER: Kontakt = { name: '', firma: '', email: '', telefon: '' }

type Status = 'ruhe' | 'sendet' | 'fehler'

export function AkquiseCheck() {
  // Schritt 0 bis 4 = die fuenf Fragen, 5 = Kontakt, 6 = Ergebnis
  const [schritt, setSchritt] = useState(0)
  const [antworten, setAntworten] = useState<Antworten>({})
  const [kontakt, setKontakt] = useState<Kontakt>(LEER)
  const [einwilligung, setEinwilligung] = useState(false)
  const [status, setStatus] = useState<Status>('ruhe')
  const [fehlertext, setFehlertext] = useState('')

  // Spamschutz ohne Captcha und ohne fremde Skripte
  const [koeder, setKoeder] = useState('') // Honigtopf: fuer Menschen unsichtbar
  const startZeit = useRef(Date.now())

  const gesehen = useRef(new Set<number>())

  useEffect(() => {
    document.title = 'Akquise-Check — Plan B Studios'
    return () => {
      document.title = 'Plan B Studios — Webdesign & 3D-Rundgänge'
    }
  }, [])

  // Zwischenstand wiederherstellen, damit ein Neuladen nichts loescht
  useEffect(() => {
    try {
      const roh = sessionStorage.getItem(SPEICHER)
      if (roh) {
        const d = JSON.parse(roh)
        if (d.antworten) setAntworten(d.antworten)
        if (d.kontakt) setKontakt({ ...LEER, ...d.kontakt })
        if (typeof d.schritt === 'number') setSchritt(Math.min(d.schritt, 5))
      }
    } catch {
      /* kaputter Zwischenstand: einfach von vorn */
    }
    melde('check_start')
    gesehen.current.add(1)
  }, [])

  useEffect(() => {
    try {
      // Ab dem Ergebnis nichts mehr aufheben: Sonst blieben Name und E-Mail
      // nach dem Absenden im Browser liegen. Das Loeschen beim Absenden allein
      // genuegt nicht, weil dieser Effekt danach erneut laeuft und den Stand
      // zurueckschreiben wuerde.
      if (schritt >= 6) {
        sessionStorage.removeItem(SPEICHER)
        return
      }
      sessionStorage.setItem(SPEICHER, JSON.stringify({ schritt, antworten, kontakt }))
    } catch {
      /* Speicher blockiert: dann eben ohne Wiederherstellung */
    }
  }, [schritt, antworten, kontakt])

  // Abbrueche messbar machen: jeder erreichte Schritt meldet sich einmal
  useEffect(() => {
    const nummer = schritt + 1
    if (schritt <= 4 && !gesehen.current.has(nummer)) {
      gesehen.current.add(nummer)
      meldeSchritt(nummer)
    }
  }, [schritt])

  const frage = FRAGEN[schritt]
  const gesamt = FRAGEN.length + 1 // Fragen + Kontaktschritt
  const fortschritt = Math.min(schritt + 1, gesamt)

  const setzeAntwort = (wert: string) =>
    setAntworten((a) => ({ ...a, [frage.id]: wert }))

  const weiter = () => setSchritt((s) => s + 1)
  const zurueck = () => setSchritt((s) => Math.max(0, s - 1))

  const kannWeiter = frage ? !frage.pflicht || !!(antworten[frage.id] || '').trim() : true

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt.email.trim())
  const kannSenden =
    kontakt.name.trim().length > 1 && emailOk && einwilligung && status !== 'sendet'

  async function senden() {
    if (koeder.trim() !== '') return // Honigtopf gefuellt: stillschweigend verwerfen
    if (Date.now() - startZeit.current < MINDESTDAUER_MS) {
      setStatus('fehler')
      setFehlertext('Bitte nehmen Sie sich einen Moment mehr Zeit für die Angaben.')
      return
    }
    setStatus('sendet')
    setFehlertext('')
    try {
      const antwort = await fetch('/api/akquise-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          antworten,
          kontakt,
          einwilligung,
          dauerMs: Date.now() - startZeit.current,
          koeder,
        }),
      })
      if (!antwort.ok) throw new Error('Status ' + antwort.status)
      melde('check_kontakt_gesendet')
      sessionStorage.removeItem(SPEICHER)
      setSchritt(6)
    } catch {
      setStatus('fehler')
      setFehlertext(
        'Das Absenden hat gerade nicht geklappt. Schreiben Sie mir bitte direkt, dann melde ich mich.',
      )
    }
  }

  const hinweise = hinweiseAus(antworten)

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night text-cream">
      <GrainOverlay />

      <header className="border-b border-night-line">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <Link to="/" className="group flex items-center gap-3">
            <CubeMark className="h-6 w-6 text-gold transition-colors group-hover:text-gold-bright" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-cream">Plan B</span>
              <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.42em] text-gold">
                Studios
              </span>
            </span>
          </Link>
          {schritt < 6 && (
            <span className="font-mono text-[12px] tracking-[0.2em] text-stone">
              {fortschritt} / {gesamt}
            </span>
          )}
        </div>
        {schritt < 6 && (
          <div className="h-0.5 bg-night-line">
            <motion.div
              className="h-full bg-gold"
              animate={{ width: `${(fortschritt / gesamt) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-14">
        <>
          {/* ---------------- Fragen ---------------- */}
          {schritt <= 4 && frage && (
            <motion.div
              key={frage.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">
                FRAGE {frage.nummer}
              </p>
              <h1 className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-light leading-tight text-cream">
                {frage.frage}
              </h1>
              {frage.hinweis && (
                <p className="mt-4 text-[14px] leading-relaxed text-stone">{frage.hinweis}</p>
              )}

              {frage.art === 'auswahl' ? (
                <div className="mt-10 flex flex-col gap-3">
                  {frage.optionen!.map((o) => {
                    const aktiv = antworten[frage.id] === o.wert
                    return (
                      <button
                        key={o.wert}
                        onClick={() => {
                          setzeAntwort(o.wert)
                          window.setTimeout(weiter, 180)
                        }}
                        className={`w-full border px-6 py-4 text-left text-[16px] transition-all duration-300 ${
                          aktiv
                            ? 'border-gold bg-gold/10 text-cream'
                            : 'border-night-line text-cream-soft hover:border-gold/50 hover:text-cream'
                        }`}
                      >
                        {o.label}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <input
                  autoFocus
                  value={antworten[frage.id] || ''}
                  onChange={(e) => setzeAntwort(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && kannWeiter && weiter()}
                  placeholder={frage.platzhalter}
                  className="mt-10 w-full border border-night-line bg-transparent px-5 py-4 text-[16px] text-cream outline-none transition-colors placeholder:text-stone/60 focus:border-gold"
                />
              )}

              <div className="mt-10 flex items-center gap-6">
                {schritt > 0 && (
                  <button
                    onClick={zurueck}
                    className="text-[14px] text-stone transition-colors hover:text-cream-soft"
                  >
                    Zurück
                  </button>
                )}
                {(frage.art === 'text' || !frage.pflicht) && (
                  <button
                    onClick={weiter}
                    disabled={!kannWeiter}
                    className="bg-gold px-7 py-3 text-[15px] font-medium text-night transition-colors duration-300 enabled:hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {frage.pflicht ? 'Weiter' : 'Weiter'}
                  </button>
                )}
                {!frage.pflicht && !(antworten[frage.id] || '').trim() && (
                  <button
                    onClick={weiter}
                    className="text-[14px] text-stone underline-offset-4 transition-colors hover:text-cream-soft hover:underline"
                  >
                    Überspringen
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ---------------- Kontakt ---------------- */}
          {schritt === 5 && (
            <motion.div
              key="kontakt"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">FAST FERTIG</p>
              <h1 className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-light leading-tight text-cream">
                Wohin darf das Ergebnis?
              </h1>
              <p className="mt-4 text-[14px] leading-relaxed text-stone">
                Das Ergebnis sehen Sie gleich direkt auf dem Bildschirm. Ihre Angaben
                brauche ich, um mich bei Ihnen melden zu können.
              </p>

              <form
                className="mt-10 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (kannSenden) senden()
                }}
              >
                {/* Honigtopf: fuer Menschen unsichtbar, Bots fuellen ihn aus */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Bitte nicht ausfüllen
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={koeder}
                      onChange={(e) => setKoeder(e.target.value)}
                    />
                  </label>
                </div>

                {(
                  [
                    ['name', 'Name', 'text', true, 'name'],
                    ['firma', 'Firma', 'text', false, 'organization'],
                    ['email', 'E-Mail', 'email', true, 'email'],
                    ['telefon', 'Telefon (optional)', 'tel', false, 'tel'],
                  ] as const
                ).map(([feld, label, typ, pflicht, ac]) => (
                  <label key={feld} className="flex flex-col gap-2">
                    <span className="text-[13px] tracking-[0.04em] text-stone">
                      {label}
                      {pflicht && <span className="text-gold"> *</span>}
                    </span>
                    <input
                      type={typ}
                      autoComplete={ac}
                      value={kontakt[feld]}
                      onChange={(e) => setKontakt({ ...kontakt, [feld]: e.target.value })}
                      className="w-full border border-night-line bg-transparent px-5 py-3.5 text-[16px] text-cream outline-none transition-colors focus:border-gold"
                    />
                  </label>
                ))}

                <label className="mt-3 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={einwilligung}
                    onChange={(e) => setEinwilligung(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold)]"
                  />
                  <span className="text-[13px] leading-relaxed text-stone">
                    Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
                    meiner Anfrage gespeichert und verarbeitet werden. Die{' '}
                    <Link
                      to="/datenschutz"
                      target="_blank"
                      className="text-cream-soft underline underline-offset-4 hover:text-gold"
                    >
                      Datenschutzerklärung
                    </Link>{' '}
                    habe ich zur Kenntnis genommen. Diese Einwilligung kann ich
                    jederzeit widerrufen.
                  </span>
                </label>

                {status === 'fehler' && (
                  <p className="mt-2 border border-gold/40 bg-gold/5 px-4 py-3 text-[14px] leading-relaxed text-cream-soft">
                    {fehlertext}{' '}
                    <a
                      href="mailto:planbstudios.de@gmail.com"
                      className="text-gold underline underline-offset-4"
                    >
                      planbstudios.de@gmail.com
                    </a>
                  </p>
                )}

                <div className="mt-6 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={zurueck}
                    className="text-[14px] text-stone transition-colors hover:text-cream-soft"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={!kannSenden}
                    className="bg-gold px-7 py-3.5 text-[15px] font-medium text-night transition-colors duration-300 enabled:hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'sendet' ? 'Wird gesendet …' : 'Ergebnis ansehen'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ---------------- Ergebnis ---------------- */}
          {schritt === 6 && (
            <motion.div
              key="ergebnis"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-5 font-mono text-[12px] tracking-[0.3em] text-gold">IHR ERGEBNIS</p>
              <h1 className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-light leading-tight text-cream">
                Drei Hinweise aus
                <br />
                <em className="italic text-gold-bright">Ihren Antworten</em>.
              </h1>
              <p className="mt-4 text-[14px] leading-relaxed text-stone">
                Abgeleitet aus dem, was Sie angegeben haben
                {antworten.region ? ` — für ${antworten.region}` : ''}. Keine Schätzungen,
                keine Hochrechnungen.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                {hinweise.map((h, i) => (
                  <motion.div
                    key={h.titel}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                    className="border-t border-night-line pt-6"
                  >
                    <p className="mb-3 font-mono text-[12px] tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, '0')} — {h.titel.toUpperCase()}
                    </p>
                    <p className="text-[15px] leading-relaxed text-cream-soft md:text-base">
                      {h.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-14 border-t border-night-line pt-10">
                <h2 className="font-serif text-2xl font-light text-cream">
                  Fünfzehn Minuten am Telefon?
                </h2>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-stone">
                  Ich sehe mir vorher Ihre Website an und sage Ihnen, was mir auffällt.
                  Ohne Vorbereitung Ihrerseits.
                </p>
                {TERMIN_URL ? (
                  <a
                    href={TERMIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => melde('termin_gebucht')}
                    className="mt-7 inline-block bg-gold px-8 py-4 text-[15px] font-medium text-night transition-colors duration-300 hover:bg-gold-bright"
                  >
                    Termin auswählen
                  </a>
                ) : (
                  <a
                    href="mailto:planbstudios.de@gmail.com?subject=Akquise-Check"
                    className="mt-7 inline-block bg-gold px-8 py-4 text-[15px] font-medium text-night transition-colors duration-300 hover:bg-gold-bright"
                  >
                    Termin per E-Mail vereinbaren
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </>
      </main>

      <footer className="border-t border-night-line px-6 py-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-[12px] text-stone">
          <span>© {new Date().getFullYear()} Plan B Studios</span>
          <LegalLinks />
        </div>
      </footer>
    </div>
  )
}
