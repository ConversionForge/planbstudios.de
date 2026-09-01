import { useCallback, useEffect, useRef, useState } from 'react'
import { baueRegion, zerlegeRegion } from './pruefung'

/**
 * Postleitzahl mit Ort.
 *
 * Der Ort wird NICHT frei eingetippt, sondern aus der Postleitzahl abgeleitet.
 * Damit kann das Paar gar nicht erst falsch werden — kein "23552 Hamburg", kein
 * Tippfehler im Ortsnamen, keine Rueckweisung wegen einer anderen Schreibweise.
 * 74 Prozent der deutschen Postleitzahlen haben genau einen Ort, der wird
 * eingesetzt; beim Rest gibt es eine Auswahl.
 *
 * Faellt der Endpunkt aus, bleibt das Feld benutzbar: Dann darf der Ort getippt
 * werden und der Worker entscheidet beim Absenden. Eine Stoerung auf meiner
 * Seite soll niemanden aussperren.
 */
export function PlzFeld({
  wert,
  onChange,
  platzhalter,
  onFertig,
}: {
  wert: string
  onChange: (neu: string) => void
  platzhalter?: string
  onFertig?: () => void
}) {
  const anfang = zerlegeRegion(wert)
  const [plz, setPlz] = useState(anfang?.plz ?? '')
  const [ort, setOrt] = useState(anfang?.ort ?? '')
  const [orte, setOrte] = useState<string[] | null>(anfang ? [anfang.ort] : null)
  const [laedt, setLaedt] = useState(false)
  const [fehler, setFehler] = useState('')
  // Endpunkt nicht erreichbar (etwa im reinen Vite-Betrieb ohne Worker):
  // dann Ort von Hand eingeben lassen statt zu blockieren.
  const [freieEingabe, setFreieEingabe] = useState(false)
  const laufend = useRef<AbortController | null>(null)

  const melde = useCallback(
    (p: string, o: string) => onChange(baueRegion(p, o)),
    [onChange],
  )

  useEffect(() => {
    laufend.current?.abort()
    setFehler('')

    if (plz.length !== 5) {
      setOrte(null)
      if (ort) {
        setOrt('')
        melde(plz, '')
      }
      return
    }

    // Bereits aufgeloest (etwa nach Wiederherstellung aus dem Zwischenspeicher)
    if (orte && orte.includes(ort) && anfang?.plz === plz) return

    const steuerung = new AbortController()
    laufend.current = steuerung
    setLaedt(true)

    fetch(`/api/ort?plz=${plz}`, { signal: steuerung.signal })
      .then((a) => (a.ok ? a.json() : Promise.reject(new Error('Status ' + a.status))))
      .then((d: { orte?: string[] }) => {
        const liste = Array.isArray(d.orte) ? d.orte : []
        setOrte(liste)
        setFreieEingabe(false)
        if (liste.length === 0) {
          setFehler('Diese Postleitzahl gibt es nicht.')
          setOrt('')
          melde(plz, '')
        } else if (liste.length === 1) {
          setOrt(liste[0])
          melde(plz, liste[0])
        } else {
          // Mehrere Orte: bewusst keine Vorauswahl, sonst steht dort ein Ort,
          // den niemand bestaetigt hat.
          setOrt('')
          melde(plz, '')
        }
      })
      .catch((e) => {
        if (e.name === 'AbortError') return
        setFreieEingabe(true)
        setOrte(null)
      })
      .finally(() => setLaedt(false))

    return () => steuerung.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plz])

  const mehrere = !freieEingabe && orte !== null && orte.length > 1

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
        <label className="flex shrink-0 flex-col gap-2 sm:w-40">
          <span className="text-[13px] tracking-[0.04em] text-stone">Postleitzahl</span>
          <input
            autoFocus
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={plz}
            onChange={(e) => setPlz(e.target.value.replace(/\D/g, '').slice(0, 5))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && ort) onFertig?.()
            }}
            placeholder={platzhalter}
            className="w-full border border-night-line bg-transparent px-5 py-4 text-[16px] text-cream outline-none transition-colors placeholder:text-stone/60 focus:border-gold"
          />
        </label>

        <label className="flex flex-1 flex-col gap-2">
          <span className="text-[13px] tracking-[0.04em] text-stone">
            Ort
            {laedt && <span className="ml-2 text-stone/60">wird gesucht …</span>}
          </span>

          {mehrere ? (
            <select
              value={ort}
              onChange={(e) => {
                setOrt(e.target.value)
                melde(plz, e.target.value)
              }}
              className="w-full appearance-none border border-night-line bg-night px-5 py-4 text-[16px] text-cream outline-none transition-colors focus:border-gold"
            >
              <option value="">Bitte wählen …</option>
              {orte!.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              readOnly={!freieEingabe}
              value={ort}
              onChange={(e) => {
                if (!freieEingabe) return
                setOrt(e.target.value)
                melde(plz, e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && ort) onFertig?.()
              }}
              placeholder={freieEingabe ? 'Ort eingeben' : 'ergibt sich aus der Postleitzahl'}
              className={`w-full border border-night-line bg-transparent px-5 py-4 text-[16px] outline-none transition-colors placeholder:text-stone/60 focus:border-gold ${
                freieEingabe ? 'text-cream' : 'cursor-default text-cream-soft'
              }`}
            />
          )}
        </label>
      </div>

      {fehler && <p className="text-[13px] text-gold">{fehler}</p>}
      {mehrere && !ort && (
        <p className="text-[13px] text-stone">
          Zu dieser Postleitzahl gehören mehrere Orte. Bitte wählen Sie Ihren aus.
        </p>
      )}
    </div>
  )
}
