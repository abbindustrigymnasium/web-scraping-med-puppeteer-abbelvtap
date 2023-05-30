# Lyrics statistik

Jag har skrapat [www.lyricsfreak.com](https://www.lyricsfreak.com/i/independence+day/) på låttexter och räknat hur många av olika tecken det finns i dem. Jag har använt [Puppeteer](https://pptr.dev/) för att skrapa och sedan [Matplotlib](https://matplotlib.org/) i Python för att visualisera resultatet. 

## Beskrivning

Filen *chris.js* hämtar texten till alla låtar om *independence day* från sidan och sparar alla texter i filen *data.json*. Filen *dataHandler.py* tar de hämtade texterna från *data.json* och räknar hur många av varje bokstav och tecken det finns och visar resultatet i ett stapeldiagram.

## Systemkrav

- npm v9
- node v18

## Instruktioner

1. Klona projektet från `git@github.com:abbindustrigymnasium/web-scraping-med-puppeteer-abbelvtap.git`
2. Öppna ett kommandofönster i roten av projektet. 
3. Kör `npm install` för att installera nödvändiga paket.
4. Kör filen *chris.js* genom att köra kommandot `node chris.js`
5. Kör *dataHandler.py*

<img src="/images/intro.jpg" width="200">
<!-- ![Tux, the Linux mascot](/images/intro.jpg) -->


