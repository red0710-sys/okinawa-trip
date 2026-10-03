# Okinawa Trip V3.5 Public Ready

Free, non-commercial, login-free Okinawa family travel web app.

## Architecture

GitHub → Vercel static hosting. No AI Gateway, OpenAI API, paid backend, analytics, ad network, or account system.

## Privacy model

- Trip data is stored in the user's browser with localStorage.
- Visit Japan Web QR screenshots are stored in local IndexedDB and are never included in exported backups.
- Standard itinerary export excludes travel-insurance details.
- Full backup can optionally include insurance memo data after a warning.
- Users can delete all Okinawa Trip local data from the app.
- External requests are limited to Open-Meteo weather and user-triggered OpenStreetMap Nominatim search.
- Search results are cached locally for 24 hours; weather is cached for 30 minutes.

## Public-use notes

This is an unofficial third-party travel tool and is not affiliated with the Japanese government, Visit Japan Web, Okinawa Prefecture, OpenStreetMap, Open-Meteo, or Apple Charity Foundation.

The charity link points directly to the official Apple Charity Foundation donation page. Okinawa Trip does not collect, process, or receive donations.

Vercel Hobby and Open-Meteo Free are used on a non-commercial basis. OpenStreetMap Nominatim public infrastructure is capacity-limited and must remain low-volume.

Source repository is public, but no open-source license is granted unless a LICENSE file is added explicitly.
