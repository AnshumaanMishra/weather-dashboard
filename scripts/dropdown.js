const dropDown = document.getElementById('drop-down');

const linksAlt = document.getElementById('links-alt');
linksAlt.style.height = '0px';
const links = document.getElementById('links-alt').children;

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
    toggleMenu();
});

for(let i = 0; i < links.length; i++){
    links[i].addEventListener('click', () => {
        toggleMenu();
    });
}
