# Okinawa Trip V3.1 FREE

Zero-cost, Floot-free, API-key-free Okinawa family travel web app.

## Architecture

GitHub → Vercel static hosting

No AI Gateway, no OpenAI API, no payment method, no serverless AI backend.

## Free features

- Multi-day itinerary and completion tracking
- Flights / multiple stays by Day range / transport / party / Family Mode / budget
- FREE Smart Plan generated locally in the browser
- Popular place list with add / delete / restore
- User-triggered low-frequency OpenStreetMap Nominatim place search
- Search results can be added to popular places or directly to a Day/slot
- Google Maps route/navigation links
- Open-Meteo weather
- SOS, emergency phone numbers and device location
- Import/export local trip data

Trip data is stored locally in the browser via localStorage.

### External service notes

OpenStreetMap Nominatim is only called after an explicit user search (no autocomplete/bulk requests). The public service is capacity-limited; keep usage light and retain OpenStreetMap attribution.

Open-Meteo is used for non-commercial weather display.
