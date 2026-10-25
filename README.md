# Site companie sisteme de securitate (versiune 1)

Site static: HTML + CSS + JavaScript, fără instalări.

## Rulare locală
- Cel mai simplu: deschide `index.html` în browser.
- Opțional, cu server local: `python3 -m http.server 8000` în acest folder, apoi http://localhost:8000

## De înlocuit înainte de publicare (caută textele marcate cu galben, clasa `ph`)
- Numele companiei (header, titlu, footer), CUI, nr. reg. com., sediu
- Telefon, e-mail, program
- Textul „Despre noi”, autorizări/certificări/garanții (doar dacă sunt reale)
- Confirmarea serviciului de monitorizare și răspunsurile din FAQ marcate
- Proiectele demonstrative și imaginile (folosește poze proprii sau cu licență clară)
- Politica de confidențialitate și de cookie-uri (verificate de un specialist)
- Formularul folosește Web3Forms. Configurează și verifică adresa destinatarului în contul Web3Forms și confirmă că domeniul și cheia de acces sunt configurate corect înainte de publicare. Formularul afișează confirmarea după un răspuns de succes și păstrează datele dacă trimiterea eșuează.

## Ecran de intrare
- Apare doar la prima vizită dintr-o sesiune și nu apare dacă utilizatorul are „mișcare redusă” activă.
- Se închide la click sau la orice tastă, iar un fallback CSS îl ascunde după ~4,5 s chiar dacă JavaScript eșuează.
- Logo provizoriu: înlocuiește elementul `.logo` din `#intro` (index.html) cu imaginea logo-ului și șterge eticheta `.intro-ph`.

## Temă întunecată
- Butonul din header comută între tema luminoasă și cea întunecată; alegerea se salvează în `localStorage` (cheia `tema`).
- Fără alegere salvată, site-ul urmează setarea sistemului (`prefers-color-scheme`). Culorile sunt variabile CSS la începutul `style.css`.
