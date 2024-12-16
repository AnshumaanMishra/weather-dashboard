const dropDown = document.getElementById('drop-down');

const linksAlt = document.getElementById('links-alt');

const [searchI, weather, about, footer] = document.getElementById('links-alt').children;

function toggleMenu(){
    if(linksAlt.style.height=='0px'){
        document.getElementById('drop-down-icon').setAttribute('src', './resources/chev-up.png');
        linksAlt.style.height = '197px';
    }
    else{
        document.getElementById('drop-down-icon').setAttribute('src', './resources/chev-down.png');
        linksAlt.style.height = '0px';
    }
}

dropDown.addEventListener('click', function() {
    console.log('Click Registered');
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
