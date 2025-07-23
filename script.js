const weatherApp = document.getElementById('weatherApp');

const updateBackground = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase(); || "";

    //define all conditions with thier background image and text color

    const backgrunds = {
        sunny:{
            image: 'url("https://example.com/sunny.jpg")',
            textColor: 'text-[]'
        },
        clear:{
            image: 'url("https://example.com/sunny.jpg")',
            textColor: 'text-[]'
        },
        cloudy:{
            image: 'url("https://example.com/sunny.jpg")',
            textColor: 'text-[]',
        },
        "partly cloudy":{
            image: 'background-color: #22797A',
            textColor: 'text-[#6FFFE9]'
        },
         "partly sunny":{
            image: 'background-color: #22797A',
            textColor: 'text-[#6FFFE9]'
        },
        rainy:{
            image: 'url("https://example.com/rainy.jpg")',
            textColor: 'text-[]'
        },
        snowy:{
            image: 'url("https://example.com/snowy.jpg")',
            textColor: 'text-[]'
        },
        drizzle:{
            image: 'url("https://example.com/drizzle.jpg")',
            textColor: 'text-[]'
        },
    }
    
    //Remove existing background and text color classes
    weatherApp.classList.remove("text-[#6FFFE9]", "bg-[#22797A]")

    let matched = false;
    for( const key in backgrounds) {
         if(consitions.includes(key)) {
            const{ image, textColor } = backgrounds[key];
            weatherApp.style.backgroundImage = image;
            weatherApp.classList.add(textColor);
            matched = true;
            break;
         }
    }

    if (!matched) {
        weatherApp.style.backgroundImage = 'bg-[#22797A]';
        weatherApp.classList.add('text-[#6FFFE9]');
    }
}