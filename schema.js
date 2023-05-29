import puppeteer from "puppeteer";


const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
  
    // Open a new page
    const page = await browser.newPage();
  
    await page.goto("https://cloud.timeedit.net/abbindustrigymnasium/web/public1/ri1Y7X6QQ7fZY6QfZ5071585y0YQ2.html", {
      waitUntil: "domcontentloaded",
    });

    var endToday = true

    const data = await page.evaluate(() => {

        var day = document.querySelector(".dateIsTodayHeader").parentElement;

        var times = day.querySelectorAll(".timeDiv");

        var timeList = Array.from(times).map((time) => {
            return parseInt(time.innerText.replace(':',''));
          });

        var now = parseInt(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).replace(':',''))

        now = 1450

        if (timeList[timeList.length] > now){
          var hey = day.getAttribute('style')
          console.log(hey)
        } 

        var lessons = day.querySelectorAll(".bookingDiv")

        var lessonList = Array.from(lessons).map((lesson) => {
            var title = lesson.querySelector(".col1").innerText
            var teachers = lesson.querySelector(".col3").innerText

            return { title , teachers }
        })

        return {timeList, lessonList}
        
    })

    // var now = parseInt(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).replace(':',''))
    
    

    // var stop = false

    // while(stop == false){
    //     if (now > data.timeList[1]){
    //         data.timeList.shift()
    //         data.timeList.shift()
    //         data.lessonList.shift()
    //     } else {
    //         stop = true
    //     }
    // }

    // if (data.timeList.length == 0){
    //   console.log('hello')
    // }

    console.log(data)
  
    // Close the browser
    // await browser.close();
  };
  
  // Start the scraping
  getQuotes();