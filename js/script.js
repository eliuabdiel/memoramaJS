function constructor(){
    totalCards = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

    ];
    numberCards = 0;
    verifyCards = [];
    correctCards = 0;
    previousCard = null;
    events();
}
function events(){
    window.addEventListener('DOMContentLoaded', () => {
        loadScreen();
    } );
}
async function loadScreen(){
    const response = await fetch('../memo.json');
    const data = await response.json();
    totalCards = data;
    if (totalCards.length > 0){
        totalCards.sort(order);
        function order(a,b){
            return Math.random() - 0.5;
        }
    }
    numberCards = totalCards.length;

    let html = '';
    totalCards.forEach(card => {
        html += `<div class="tarjeta"><img class="tarjeta-img" src= ${card.src} style="pointer-events:none" alt="imagen memorama" ></div>`
    })
    document.getElementById("card-container").innerHTML = html;
    start();
}
function start(){
    const cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            clickCard(e)
        })
    })
}
function clickCard(e){
    if (previousCard == e.target && verifyCards.length != 0 ){
        console.log('no te crashees consola xfabor')
    } else {
        transformCardsToImage(e);
        let sourceImage = e.target.childNodes[0].getAttribute("src");
        verifyCards.push(sourceImage);
        
        compareCards(e);
        previousCard = e.target;
    }
}
function transformCardsToImage(e){
    e.target.style.backgroundImage= 'none';
    e.target.style.backgroundColor='white';
    e.target.childNodes[0].style.display = 'block';
    
}
function transformImagetoCards(){
    const cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        let sourceImage = card.childNodes[0].getAttribute("src");
        if(sourceImage == verifyCards[0] || sourceImage == verifyCards[1]){
            card.style.backgroundImage = 'url(../img/default.png)';
            card.style.backgroundColor='none';
            card.childNodes[0].style.display = 'none';
        } 
    })
}

function compareCards(e){
        if(verifyCards.length == 2){
        if (verifyCards[0] == verifyCards[1]){
            verifyCards= [];
            correctCards+=2;
            if(correctCards == numberCards){
                document.getElementById("winner-screen").style.display = 'block';
            }
        } else {
            document.getElementById("card-container").style.pointerEvents = 'none';
            sleep(200).then(() => { 
                transformImagetoCards(); 
                verifyCards = [];
                document.getElementById("card-container").style.pointerEvents = 'auto';
            });
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
constructor();
