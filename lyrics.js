import puppeteer from "puppeteer";

const getLyrics = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    var page = await browser.newPage();

    await page.goto("https://www.azlyrics.com/e/eluveitie.html", {
      waitUntil: "domcontentloaded",
    });

    // accept cookies
    try {
        await page.click('#onetrust-accept-btn-handler')
    } catch {}
  
    // sort songs individually instead of by album
    await page.click('#az_sort_song')

    
    await new Promise(resolve => setTimeout(resolve, 2000))

    // get song titles and links to the lyricd page
    const songlinks = await page.evaluate(() => {
        
        // get elements with the class listalbum-item which is each song in the list of songs 
        var linkList = document.querySelectorAll(".listalbum-item");
    
        // Convert the linkList to an iterable array
        // For each song fetch the title and link
        return Array.from(linkList).map((song) => {
          // Fetch the sub-elements from the previously fetched song element

          // Get the displayed text and return it (`.innerText`)
          const title = song.querySelector("a").innerText;
          // get the value of the href attribute
          const link = song.querySelector("a").getAttribute("href");
          
          return { title, link };
        });   

    });

    var lyricsList = []

    // get the lyrics of each song 
    for (var i=0;i<songlinks.length;i++){
        // go to the lyrics page
        await page.goto('https://www.azlyrics.com/' + songlinks[i].link , {
            waitUntil: "domcontentloaded",
        });

        await new Promise(resolve => setTimeout(resolve, 2000))

        var songLyrics = await page.evaluate(() => { 

            var lyrics = document.querySelector('div.col-xs-12.col-lg-8.text-center > div:nth-child(8)').innerHTML
            
            lyrics = lyrics.replace('<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->\n','')
            lyrics = lyrics.replace(new RegExp('<br>', 'g'), '')
            lyrics = lyrics.replace(new RegExp('\n', 'g'), ' ')
            lyrics = lyrics.replace(new RegExp(',', 'g'), '')

            return lyrics

        });

        console.log(songLyrics)

        lyricsList.push(songLyrics)

        
    };

    console.log(lyricsList)

};
  
getLyrics();
     