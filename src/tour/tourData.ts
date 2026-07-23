export interface TourImage {
  src: string
  caption: string
}

export interface TourRoom {
  id: string
  name: string
  subtitle: string
  images: TourImage[]
}

export interface TourData {
  title: string
  location: string
  rooms: TourRoom[]
}

const base = import.meta.env.BASE_URL

const img = (file: string, caption: string): TourImage => ({
  src: `${base}rundgang/${file}`,
  caption,
})

export const TOUR: TourData = {
  title: 'Design-Loft',
  location: 'Hamburg',
  rooms: [
    {
      id: 'wohnen',
      name: 'Wohnbereich',
      subtitle: 'Offener Loft-Charakter',
      images: [
        img('living-1.jpg', 'Offener Wohnbereich mit bodentiefen Fenstern zum Garten'),
        img('living-2.jpg', 'Loungebereich, fließend verbunden mit der Küche'),
        img('living-3.jpg', 'Wohndetails — warme Texturen, klare Formen'),
      ],
    },
    {
      id: 'kueche',
      name: 'Küche',
      subtitle: 'Grifflos & funktional',
      images: [
        img('kitchen-1.jpg', 'Kücheninsel im offenen Grundriss'),
        img('kitchen-2.jpg', 'Grifflose Fronten, durchgehend bis zur Gartentür'),
        img('kitchen-3.jpg', 'Spülbereich mit Blick ins Grüne'),
      ],
    },
    {
      id: 'essen',
      name: 'Esszimmer',
      subtitle: 'Platz für lange Abende',
      images: [
        img('dining-1.jpg', 'Essplatz mit rundem Tisch und Design-Stühlen'),
        img('dining-2.jpg', 'Gedeckte Tafel für den Abend'),
        img('dining-3.jpg', 'Essbereich mit Spiegel und Sichtachse'),
      ],
    },
    {
      id: 'schlafen',
      name: 'Schlafzimmer',
      subtitle: 'Rückzug & Ruhe',
      images: [
        img('bedroom-1.jpg', 'Hauptschlafzimmer mit Hotel-Charakter'),
        img('bedroom-2.jpg', 'Schlafbereich mit bodentiefen Fenstern'),
        img('bedroom-3.jpg', 'Ankleide mit Einbauschränken'),
      ],
    },
    {
      id: 'bibliothek',
      name: 'Bibliothek',
      subtitle: 'Das Herzstück',
      images: [
        img('library-1.jpg', 'Bibliothek mit raumhohen Regalen'),
        img('library-2.jpg', 'Arbeitsplatz direkt am Fenster'),
        img('library-3.jpg', 'Arbeitsbereich mit Blick nach draußen'),
      ],
    },
    {
      id: 'bad',
      name: 'Badezimmer',
      subtitle: 'Spa-Charakter',
      images: [
        img('bath-1.jpg', 'Badezimmer in Schiefer-Optik'),
        img('bath-2.jpg', 'Ebenerdige Regendusche'),
        img('bath-3.jpg', 'Waschbereich mit indirektem Licht'),
      ],
    },
    {
      id: 'aussen',
      name: 'Außenbereich',
      subtitle: 'Grün mitten in der Stadt',
      images: [
        img('outdoor-1.jpg', 'Ruhiger Innenhof mit Sitzplatz'),
        img('outdoor-2.jpg', 'Begrünter Garten unter altem Baumbestand'),
        img('outdoor-3.jpg', 'Gepflegte Außenanlage'),
      ],
    },
  ],
}
