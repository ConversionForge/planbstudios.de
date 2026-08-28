# DNS-Rückfallebene

Stand **28.07.2026**, aufgenommen unmittelbar vor dem Nameserver-Wechsel von
IONOS zu Cloudflare. Zweck: Wenn nach dem Umzug etwas nicht stimmt, lässt sich
der alte Zustand hiermit exakt wiederherstellen, ohne raten zu müssen.

Geprüft doppelt: aus der IONOS-Oberfläche und über eine unabhängige
DNS-Abfrage gegen 8.8.8.8.

## Nameserver (vorher, bei IONOS)

```
ns1017.ui-dns.com
ns1030.ui-dns.biz
ns1061.ui-dns.de
ns1123.ui-dns.org
```

## Einträge (vorher, Ziel: GitHub Pages)

| Typ | Hostname | Wert |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000:0:0:0:0:153 |
| AAAA | @ | 2606:50c0:8001:0:0:0:0:153 |
| AAAA | @ | 2606:50c0:8002:0:0:0:0:153 |
| AAAA | @ | 2606:50c0:8003:0:0:0:0:153 |
| CNAME | www | conversionforge.github.io |

Zum Kopieren:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000:0:0:0:0:153
AAAA  @     2606:50c0:8001:0:0:0:0:153
AAAA  @     2606:50c0:8002:0:0:0:0:153
AAAA  @     2606:50c0:8003:0:0:0:0:153
CNAME www   conversionforge.github.io
```

## Was es NICHT gab

Ausdrücklich festgehalten, weil es die Risikolage bestimmt:

- **keine MX-Einträge** — es hing keine E-Mail an der Domain, die der
  Nameserver-Wechsel hätte zerreißen können. Die Kontaktadresse war zu diesem
  Zeitpunkt eine Gmail-Adresse, keine Domain-Adresse.
- **keine TXT-Einträge** — kein SPF, kein DKIM, keine Domain-Verifizierung
  irgendeines Dienstes.
- **kein DMARC** unter `_dmarc`.

Sobald `info@planbstudios.de` eingerichtet ist, gilt das nicht mehr. Ab dann
gehören MX, SPF, DKIM und DMARC zum schützenswerten Bestand, und diese Datei
muss aktualisiert werden.

## Wiederherstellung im Notfall

1. Bei IONOS unter Nameserver zurück auf die vier `ui-dns`-Server oben
   umstellen.
2. Warten, bis die Umstellung greift (in der Regel Minuten bis wenige Stunden).
3. Prüfen, dass die neun Einträge oben vorhanden sind, sonst neu anlegen.
4. Kontrolle: `nslookup -type=A planbstudios.de 8.8.8.8` muss die vier
   185.199.x.153-Adressen liefern.

Voraussetzung dafür ist, dass das GitHub-Pages-Deployment noch existiert. Der
zugehörige Actions-Workflow wird deshalb erst stillgelegt, wenn der Umzug
nachweislich stabil läuft, nicht vorher.
