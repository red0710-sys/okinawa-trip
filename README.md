# Okinawa Trip Beta 1.1

Free, non-commercial, login-free Okinawa family travel web app.

## Beta 1.1 highlights

- Multiple itinerary items per time slot (breakfast / morning / lunch / afternoon / dinner / evening)
- Per-item completion, optional time, notes, delete, and mobile-safe up/down ordering
- Existing Beta 1.0 itinerary data is migrated automatically in the browser
- Route, sharing, import/export, and SMART Plan support the new multi-item structure
- Offline-capable PWA with Service Worker and installable manifest
- Strict CSP: no inline event handlers and no inline scripts/styles
- Morning / afternoon / evening weather with forecast-range messaging
- Departure checklist stored locally
- Nearby toilet / convenience store / gas station shortcuts
- Privacy-safe itinerary sharing that excludes entry QR, insurance details, and traveler personal data
- Per-traveler Visit Japan Web QR vault stored only in IndexedDB
- Travel-insurance claim memo and SOS resources
- Local caching for weather and low-frequency Nominatim search

## Architecture

GitHub → Vercel static hosting. No AI Gateway, OpenAI API, paid backend, analytics, ad network, or account system.

## Privacy model

Trip data is stored locally in the browser. Visit Japan Web QR screenshots are stored in local IndexedDB and never exported. Static app files may be cached by the Service Worker for offline access.

## Public-use notes

This is an unofficial third-party travel tool and is not affiliated with the Japanese government, Visit Japan Web, Okinawa Prefecture, OpenStreetMap, Open-Meteo, or Apple Charity Foundation.

The charity button opens a Google search for Apple Charity Foundation rather than linking directly to a donation page. Users should independently verify the official website. Okinawa Trip does not collect, process, or receive donations.

Source repository is public, but no open-source license is granted unless a LICENSE file is added explicitly.
