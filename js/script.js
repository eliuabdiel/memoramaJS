function constructor(){
    totalCards = [
        {src: "img/christian.jpg"},
        {src: "img/christian.jpg"},
        {src: "img/flyan.jpg"},
        {src: "img/flyan.jpg"},
        {src: "img/zinedin.jpg"},
        {src: "img/zinedin.jpg"},
        {src: "img/pana.jpg"},
        {src: "img/pana.jpg"},
    ];
    
    numberCards = 0;
    verifyCards = [];
    correctCards = 0;
    previousCard = null;
    loadScreen();
}
function loadScreen(){
    if (totalCards.length > 0){
        //The Correct Way — Fisher-Yates Algorithm to randomize an array 
        for(let i = totalCards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = totalCards[i]
            totalCards[i] = totalCards[j]
            totalCards[j] = temp
        }
        
        //totalCards.sort();
        // function order(a,b){
        //     return Math.random() - 0.5;
        // }
    }
    numberCards = totalCards.length;

    let html = '';
    totalCards.forEach(card => {
        html += `<div class="tarjeta"><img class="tarjeta-img" src= ${card.src} style="pointer-events:none" alt="imagen memorama" ></div>`
    })
    document.getElementById("card-container").innerHTML = html;
    start();
}
async function start(){
    const cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            clickCard(e)
        })
    })
}
async function clickCard(e){
    if (previousCard == e.target && verifyCards.length != 0 ){
        console.log("don't crash console pls")
    } else {
        await transformCardsToImage(e);
        let sourceImage = e.target.childNodes[0].getAttribute("src");
        verifyCards.push(sourceImage);
        
        compareCards(e);
        previousCard = e.target;
    }
}
async function transformCardsToImage(e){
    e.target.style.backgroundImage= 'none';
    e.target.style.backgroundColor='white';
    e.target.childNodes[0].style.display = 'block';
    
}
async function transformImagetoCards(){
    let cards = document.querySelectorAll('.tarjeta');
    await cards.forEach(card => {
        let sourceImage = card.childNodes[0].getAttribute("src");
        if(sourceImage == verifyCards[0] || sourceImage == verifyCards[1]){
            card.style.backgroundImage = 'url(../img/default.png)';
            card.style.backgroundColor ='none';
            card.childNodes[0].style.display = 'none';
        } 
    })
}

async function compareCards(e){
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
                await transformImagetoCards(); 
                verifyCards = [];
                document.getElementById("card-container").style.pointerEvents = 'auto';
            });
        }
    }
}
async function playAgain(){
    let cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        card.style.backgroundImage = 'url(../img/default.png)';
        card.style.backgroundColor='none';
        card.childNodes[0].style.display = 'none';
    })
    document.getElementById("winner-screen").style.display = 'none';
    constructor();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.addEventListener('DOMContentLoaded', (e) => {
    constructor();
});

