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
    
    numberCards = 0; // total number of cards
    verifyCards = []; //array to compare the two selected cards
    correctCards = 0; // total number of correct cards / iamges discovered
    previousCard = null; //variable to avoid select of the already selected card
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
        //this also work 
        //totalCards.sort();
        // function order(a,b){
        //     return Math.random() - 0.5;
        // }
    }
    numberCards = totalCards.length;
    //inserts into html named variable, html container  to be inserted in the index.html
    let html = '';
    totalCards.forEach(card => {
        html += `<div class="tarjeta"><img class="tarjeta-img" src= ${card.src} style="pointer-events:none" alt="imagen memorama" ></div>`
    })
    document.getElementById("card-container").innerHTML = html;
    start();
}
async function start(){
    //adds an eventListener to each object div with the class "tarjeta", the ones we just added
    const cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            clickCard(e)
        })
    })
}
async function clickCard(e){
    //condition in case if the same card is selected
    if (previousCard == e.target && verifyCards.length != 0 ){
        console.log("don't crash console pls")
    } else {
        await transformCardsToImage(e);
        //get the value of attribute src from the img tag were we clicked
        let sourceImage = e.target.childNodes[0].getAttribute("src");
        //add the src value to de array verifyCards to compare it later
        verifyCards.push(sourceImage);
        
        compareCards(e);
        previousCard = e.target;
    }
}
async function transformCardsToImage(e){
    //the efect for fliping the card
    e.target.style.backgroundSize= '0%'; //prev value 100%
    e.target.childNodes[0].style.display = 'block'; //prev value 'none' from the tag img
    
}
async function transformImagetoCards(){
    //the efect for fliping to the back of the card in case the image didn't match
    let cards = document.querySelectorAll('.tarjeta'); //compare each object to find the incorrect cards to flip them
    cards.forEach(card => {
        let sourceImage = card.childNodes[0].getAttribute("src");
        if(sourceImage == verifyCards[0] || sourceImage == verifyCards[1]){
            card.style.backgroundSize= '100%'; //prev value 0%
            card.childNodes[0].style.display = 'none'; //prev value 'block' from the tag img
        } 
    })
}

async function compareCards(e){ 
        if(verifyCards.length == 2){
        if (verifyCards[0] == verifyCards[1]){ //condition in case you hit
            await lockCorrectCards(); //avoid clicking the already discovered images/correct images to win
            verifyCards = []; //empty the verifier
            correctCards+=2;
            if(correctCards == numberCards){ //winner display
                document.getElementById("winner-screen").style.display = 'block';
            }
        } else { 
            document.getElementById("card-container").style.pointerEvents = 'none'; //disabling to valid delay
            sleep(200).then(async () => { //will do the lines below after .2 seconds pd. remember that the lines after this function will be ejecuted before the ones that are in the function
                await transformImagetoCards(); 
                verifyCards = []; //empty the verifier
                document.getElementById("card-container").style.pointerEvents = 'auto'; //enabling after valid delay
            });
        }
    }
}
async function lockCorrectCards(){
    //avoid clicking the already discovered images/correct images to win
    let cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        let sourceImage = card.childNodes[0].getAttribute("src");
        if(sourceImage == verifyCards[0] && sourceImage == verifyCards[1]){
            card.style.pointerEvents = 'none'; 
        } 
    })
}
async function playAgain(){
    let cards = document.querySelectorAll('.tarjeta');
    cards.forEach(card => {
        card.style.backgroundSize= '100%'; //prev value 0%
        card.childNodes[0].style.display = 'none'; //prev value 'block' from the tag img
    })
    document.getElementById("winner-screen").style.display = 'none';
    constructor();
}
//sleep function to wait a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//page is loaded
window.addEventListener('DOMContentLoaded', (e) => {
    constructor();
});

