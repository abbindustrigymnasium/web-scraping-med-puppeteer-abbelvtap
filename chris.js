import puppeteer from "puppeteer";
import * as fs from "fs";

const getQuotes = async () => {
    // Startar en Puppeteer session där man kan se browsern medan den körs
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
  
    // öppnar en ny page
    const page = await browser.newPage();
  
    // går till en sida där man kan se texterna till olika låtar
    await page.goto("https://www.lyricsfreak.com/i/independence+day/", {
      waitUntil: "domcontentloaded",
    });

    // hämtar länken till varje låts lyricssida
    const songlinks = await page.evaluate(() => {
        
      // hämtar alla element som är låtar
      var linkList = document.querySelectorAll(".lf-list__cell.lf-list__title.lf-list__cell--full > a");
  
      // Gör listan med sång-element till en array
      // hämtar titeln och länken för varje sång
      return Array.from(linkList).map((song) => {
        // hämtar attributena 'title' och 'href' för den hämtade låten
 
        const title = song.getAttribute('title');
        const link = song.getAttribute("href");
        
        return { title, link };
      });      
    });
  
    // skapar en lista för att förvara alla låttexter
    var lyricsList = []

    // hämta texten till varja låt 
    for (var i=0;i<songlinks.length;i++){
        // gå till text-sidan för en låt
        await page.goto('https://www.lyricsfreak.com' + songlinks[i].link , {
            waitUntil: "domcontentloaded",
        });

        // väntar 5 sekunder
        await new Promise(resolve => setTimeout(resolve, 5000))

        // hämtar texten
        var songLyrics = await page.evaluate(() => { 

          // hämta text elementen
            var getLyrics = document.querySelectorAll('.lyrictxt > span')

            // gör listan med text rader till en ittererbar lista
            var lyrics = Array.from(getLyrics).map((line) => {
              return line.innerText;
            })

            // lägger ihop listan med textrader till en sträng
            var lyrics = lyrics.join(' ')
            
            return lyrics

        });
        // lägger till texten i listan med texter
        lyricsList.push(songLyrics)
        
    };

    // gör om datan till json format
    var data = JSON.stringify(lyricsList)

    // skriver datan i en json fil
    fs.writeFile("data.json", data, (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        console.error(error);
    
        throw error;
      }

    });
    // stänger browsern
    await browser.close();
  };
  
  // kör scrapingen
  getQuotes();
