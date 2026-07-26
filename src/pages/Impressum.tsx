import { LegalLayout } from './LegalLayout'

export function Impressum() {
  return (
    <LegalLayout title="Impressum" updated="Juli 2026">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Plan B Studios
        <br />
        Bilal Gnielka
        <br />
        Robert-Koch-Straße 24
        <br />
        23562 Lübeck
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 0178 8489408
        <br />
        E-Mail:{' '}
        <a href="mailto:planbstudios.de@gmail.com">planbstudios.de@gmail.com</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Bilal Gnielka
        <br />
        Anschrift wie oben
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Als Kleinunternehmer im Sinne des § 19 UStG wird keine Umsatzsteuer
        ausgewiesen.
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter,
        auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
        des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
        Autors bzw. Erstellers.
      </p>
    </LegalLayout>
  )
}
