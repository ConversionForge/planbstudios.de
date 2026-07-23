# Go-live: GitHub Pages + IONOS-Domain

Diese Website ist ein statischer Vite-Build. Sie wird über GitHub Pages
gehostet; die Domain kommt von IONOS (nur Adresse, kein Hosting).

## 1. Repository anlegen

Der Inhalt des Ordners `website/` ist das Repository (nicht der übergeordnete
Ordner). Einmalig im Ordner `website/`:

```bash
git init
git add .
git commit -m "Plan B Studios Website"
git branch -M main
git remote add origin https://github.com/<dein-user>/<repo>.git
git push -u origin main
```

## 2. GitHub Pages aktivieren

Im Repo: **Settings → Pages → Build and deployment → Source: „GitHub Actions"**.
Der mitgelieferte Workflow (`.github/workflows/deploy.yml`) baut die Seite bei
jedem Push auf `main` automatisch und veröffentlicht sie. Fortschritt unter dem
Reiter **Actions**.

## 3. Eigene Domain (IONOS) verbinden

**In GitHub:** Settings → Pages → **Custom domain** → deine Domain eintragen
(z. B. `plan-b-studios.de`) → Save. Danach **„Enforce HTTPS"** aktivieren
(erscheint, sobald das Zertifikat ausgestellt ist).

**Bei IONOS** (Domains → deine Domain → DNS): folgende Einträge setzen.

Für die nackte Domain (`plan-b-studios.de`) vier A-Records:

| Typ | Host/Name | Wert |
|-----|-----------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Für `www` ein CNAME:

| Typ | Host/Name | Wert |
|-----|-----------|------|
| CNAME | www | `<dein-user>.github.io.` |

Optional zusätzlich AAAA-Records (IPv6) auf `2606:50c0:8000::153`,
`…8001::153`, `…8002::153`, `…8003::153`.

DNS-Änderungen brauchen bis zu einige Stunden. Danach ist die Seite unter deiner
Domain erreichbar.

## Hinweise

- **Unterseiten** (`/impressum`, `/datenschutz`, `/beispiel`): Der Build erzeugt
  automatisch eine `404.html` (siehe `scripts/postbuild.mjs`), damit direkte
  Aufrufe und Reloads funktionieren — das ist bei Single-Page-Apps auf GitHub
  Pages nötig.
- **Base-Pfad** ist `/` und damit für die eigene Domain korrekt. Ruft man die
  Seite testweise über `https://<user>.github.io/<repo>/` auf, laden die Assets
  erst, sobald die eigene Domain verbunden ist.
- **Datenschutz:** GitHub Pages ist als Host in der Datenschutzerklärung
  eingetragen (inkl. USA-Transfer-Hinweis). Vor Veröffentlichung prüfen lassen.
