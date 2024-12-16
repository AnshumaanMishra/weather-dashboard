const navigators = document.getElementsByClassName('left-pane')[0].children;
const content = document.getElementsByClassName('right-pane')[0].children;

function select(i){
    for(var j = 0; j <  navigators.length; j++){
        if(i == j) {
            navigators[j].classList.remove('not-selected');
            navigators[j].classList.add('selected');
        }
        else{
            navigators[j].classList.add('not-selected');
            navigators[j].classList.remove('selected');
        }
    }
}

function show(i){
    for(var j = 0; j <  content.length; j++){
        if(i == j) {
            content[j].classList.remove('hidden');
        }
        else{
            content[j].classList.add('hidden');
        }
    }
}

navigators[0].addEventListener('click', () => {
    select(0);
    show(0);
});

navigators[1].addEventListener('click', () => {
    select(1);
    show(1);
});

navigators[2].addEventListener('click', () => {
    select(2);
    show(2);
});