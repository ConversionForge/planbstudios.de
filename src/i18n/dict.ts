// Gemeinsame Texte, die von mehreren Seiten benutzt werden (404-Seite,
// Rundgang, Video, Rechtslinks).
//
// Die Seite ist seit November 2026 nur noch deutsch. Die Texte der Startseite
// und der Leistungsseiten stehen direkt in den jeweiligen Komponenten, weil
// sie nur an genau einer Stelle gebraucht werden. Hier liegt nur, was
// mehrfach vorkommt.

export const de = {
  /** Fenstertitel der Startseite, wird beim Verlassen einer Unterseite wieder gesetzt. */
  siteTitle: 'Automatisierung & Akquise-Strecken in Lübeck | Plan B Studios',
  rundgaenge: {
    videoCaption:
      'Cinematischer Rundgang durch ein Design-Loft in Hamburg, als Bewegtbild aus den Objektaufnahmen komponiert.',
    videoLabel: 'Objektfilm',
    videoPlay: 'Abspielen',
    videoFullscreen: 'Vollbild',
  },
  notFound: {
    eyebrow: 'FEHLER 404',
    title1: 'Diese Seite',
    titleEm: 'gibt es nicht',
    title2: '.',
    lead: 'Vielleicht wurde sie verschoben, oder in der Adresse steckt ein Tippfehler.',
    cta: 'Zur Startseite',
    docTitle: 'Seite nicht gefunden — Plan B Studios',
  },
  tour: {
    eyebrow: 'Beispiel-Rundgang',
    close: 'Rundgang schließen',
    prev: 'Zurück',
    next: 'Weiter',
    nextLabel: 'Weiter',
    nextView: 'Nächste Ansicht',
    room: 'RAUM',
    view: 'Ansicht',
  },
  common: {
    backToStudio: 'Zurück zu Plan B Studios',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
}

export type Dict = typeof de
