const dropDown = document.getElementById('drop-down');

const linksAlt = document.getElementById('links-alt');

const [search, weather, about, footer] = document.getElementById('links-alt').children;

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

search.addEventListener('click', () => {
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
