const dropDown = document.getElementById('drop-down-icon');

const linksAlt = document.getElementById('links-alt');

const [searchI, weather, about, footer] = document.getElementById('links-alt').children;

function toggleMenu(){
    if(linksAlt.style.height=='0px'){
        linksAlt.style.height = '197px';
    }
    else{
        linksAlt.style.height = '0px';
    }
}

dropDown.addEventListener('click', () => {
    toggleMenu();
});

searchI.addEventListener('click', () => {
    toggleMenu();
    document.getElementById('#search').scrollIntoView();
});

weather.addEventListener('click', () => {
    toggleMenu();
    document.getElementById('#content').scrollIntoView();
});

about.addEventListener('click', () => {
    toggleMenu();
    document.getElementById('#about').scrollIntoView();
});

footer.addEventListener('click', () => {
    toggleMenu();
    document.getElementById('#footer').scrollIntoView();
});
