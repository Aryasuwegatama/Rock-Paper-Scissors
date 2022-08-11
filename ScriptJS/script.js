// get all DOM needed in variable
const choiceNodeList = document.querySelectorAll('.playerChoice img'),
    pick = document.querySelectorAll('.playerChoice img'),
    playerStar = document.querySelectorAll('.p-StarWrap img'),
    computerStar = document.querySelectorAll('.c-StarWrap img'),
    pInfo = document.querySelector('.pInfo'),
    cInfo = document.querySelector('.cInfo'),
    roundInfo = document.querySelector('.round'),
    rock = document.querySelector('.rock'),
    paper = document.querySelector('.paper'),
    scissors = document.querySelector('.scissors'),
    playerStatus = document.querySelector('.playerStatus'),
    computerStatus = document.querySelector('.computerStatus'),
    comPick = document.getElementById('computerChoice'),
    comPickContainer = document.getElementsByClassName('computerChoice')[0],
    imgRock = document.createElement('img'),
    imgPaper = document.createElement('img'),
    imgScissors = document.createElement('img');
// ================================
// get Variable Global
const choices = Array.from(choiceNodeList); /*convert choice (node list) to array*/
const winners = [];
let playerPick;
let computerPick;
let winner;
let round = 1;
let playerScore = 0;
let computerScore = 0;
let resetDefault;
// ================================
function winCondition() {
    if (playerScore == 3 || computerScore == 3){
       return showFinalResult();
    }
}
// ================================
// game round and set the player pick
function gameRound(){
    pick.forEach(element => {
        element.addEventListener('click', function (event){
                computerPick = getComputerPick();
                playerPick = event.target.id;
            function playerInfo(){
               winner =  gameRules(playerPick,computerPick);
               return winner;
            } 
            playerInfo();
            function computerInfo() {
                if (winner == ' WIN '){
                    return 'LOSE';
                }
                else if (winner == ' LOSE '){
                    return 'WIN';
                }
                return 'TIE';
            };
            winners.push(winner);
            winners.push(computerInfo());
            playerScore = getPlayerScore();
            computerScore = getComputerScore();
            // ================================
            // show player and computerPick
            if(playerPick == "rock"){
                paper.style.opacity= 0;
                scissors.style.opacity= 0;
            }
            else if (playerPick == "paper"){
                rock.style.opacity= 0;
                scissors.style.opacity= 0;
            }
            else if (playerPick == "scissors"){
                rock.style.opacity= 0;
                paper.style.opacity= 0;
            };
            pInfo.innerHTML = playerInfo();
            cInfo.innerHTML = computerInfo();
            // Computer show the pick and back to default hide
            comShowPick();
            playerStarIndicator();
            computerStarIndicator();
            pickStatus();
            stopLoadAnim();
            getResetDefault();
            setTimeout(winCondition, 1000);
            round++

            // // debug
            // console.log('round = ' , round);
            // console.log('player pick = ' , playerPick);
            // console.log('computer pick = ' , computerPick);
            // console.log(playerInfo(), '|| score' ,playerScore)
            // console.log(computerInfo(), '|| score' ,computerScore)
            // console.log('--------------------------')
        });
    });
    loadingAnimation();
};
// ==============================
// stop reset and freeze
function getResetDefault(){
    resetDefault = setTimeout(setResetDefault, 1500);
    return resetDefault
}
// ==============================
// reset to first display
function setResetDefault(){
    // reset player option display
    rock.style.opacity= 1;
    paper.style.opacity= 1;
    scissors.style.opacity= 1;
    // reset info & computer pick
    roundInfo.innerHTML= `Round ${round}`;
    cInfo.innerHTML = '';
    pInfo.innerHTML = '';
    comPick.style.opacity = 0;
    playerStatus.innerHTML = 'Take Your Pick';
    computerStatus.innerHTML = 'de\'BOT is thinking...';
    loadingAnimation();
}
// ==============================
// computer generate choice
function getComputerPick() { 
    return choices[Math.floor(Math.random() * choices.length)].id;
};
// ==============================
// displaying computer option
function comShowPick(){
    comPick.setAttribute(`src`, `../img/${computerPick}.png`);
    comPick.setAttribute(`alt`, `${computerPick}.RSPGame`);
    comPick.style.opacity = 1;
    comPick.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
}
// ================================
// change pick status on click
function pickStatus(){
    playerStatus.innerHTML = 'You made a Pick';
    computerStatus.innerHTML = 'de\'BOT made a Pick';
}
// ================================
// Game Rules
function gameRules(player, computer) {
    if (player === computer) {
        return "TIE";
    } 
    else if (
        player == choices[0].id && computer == choices[2].id||
        player == choices[1].id && computer == choices[0].id||
        player == choices[2].id && computer == choices[1].id ) {
        return ' WIN ';
    } 
    else {
        return ' LOSE ';
    }
};
// ================================
// winner filter for final score
function getPlayerScore(){
   return winners.filter(winner => winner == ' WIN ').length;
}
function getComputerScore(){
   return winners.filter(winner => winner == 'WIN').length;
}
// ================================
// get winner logic
    function getMatchWinner(player, computer){
        if (player == 3 && computer == 0 ||
            player == 3 && computer == 1 ||
            player == 3 && computer == 2){
                return 'YOU WIN!';
            }
        else if (computer == 3 && player == 0 ||
            computer == 3 && player == 1 ||
            computer == 3 && player == 2){
                return 'de\'BOT WIN!';
            }
        };
// ================================
//player star indicator for score
function playerStarIndicator(){
    if(playerScore == 1){
        playerStar[0].setAttribute(`src`,`../img/star-gold.png`)
    }
    else if (playerScore == 2){
        for (let i = 0; i < (playerStar.length)-1; i++) {
            playerStar[i].setAttribute(`src`,`../img/star-gold.png`)
        }
    }
    else if (playerScore == 3){
        for (let i = 0; i < playerStar.length; i++) {
            playerStar[i].setAttribute(`src`,`../img/star-gold.png`)
        }
    }
} 
// ================================
//computer star indicator for score
function computerStarIndicator(){
    if(computerScore == 1){
        computerStar[0].setAttribute(`src`,`../img/star-gold.png`)
    }
    else if (computerScore == 2){
        for (let i = 0; i < (computerStar.length)-1; i++) {
            computerStar[i].setAttribute(`src`,`../img/star-gold.png`)
        }
    }
    else if (computerScore == 3){
        for (let i = 0; i < computerStar.length; i++) {
            computerStar[i].setAttribute(`src`,`../img/star-gold.png`)
        }
    }
} 
// ================================
// make result display
// /////////////////
function showFinalResult(){
// get variable needede for element
const sectionResult = document.createElement('section'),
    divContainer = document.createElement('div'),
    h2FinalRound = document.createElement('h2'),
    h2FinalInfo = document.createElement('h2'),
    h2FinalScore = document.createElement('h2'),
    btnPlayAgain = document.createElement('button'),
    btnHomepage = document.createElement('button'),
    showRoundText = document.createTextNode(`round ${round-1}`),
    showInfoText = document.createTextNode( getMatchWinner(playerScore,computerScore)),
    showScoreText = document.createTextNode(`${playerScore} : ${computerScore}`),
    playAgainText = document.createTextNode(`PLAY AGAIN`),
    homepageText = document.createTextNode(`HOME PAGE`);
    // inserting Text needed to display
    h2FinalRound.appendChild(showRoundText);
    h2FinalInfo.appendChild(showInfoText);
    h2FinalScore.appendChild(showScoreText);
btnPlayAgain.appendChild(playAgainText);
btnHomepage.appendChild(homepageText);


// inserting elment attribute needed
sectionResult.setAttribute('class', 'resultDisplay');
divContainer.setAttribute('class', 'container-display');
h2FinalRound.setAttribute('class', 'showTotalRound');
h2FinalInfo.setAttribute('class', 'finalInfoWinner');
h2FinalScore.setAttribute('class', 'showFinalScore');
btnPlayAgain.setAttribute('id', 'playAgain-btn');
btnPlayAgain.setAttribute('onclick', 'window.location.reload(true)');
btnHomepage.setAttribute('id', 'homepage-btn');
btnHomepage.setAttribute('onclick', 'window.location.href="../index.html"');

// structuring html element
divContainer.appendChild(h2FinalRound);
divContainer.appendChild(h2FinalInfo);
divContainer.appendChild(h2FinalScore);
divContainer.appendChild(btnPlayAgain);
divContainer.appendChild(btnHomepage);
sectionResult.appendChild(divContainer);
document.body.appendChild(sectionResult);
document.body.insertBefore(sectionResult, (document.body.children[3]));
}
// /////////////////
// ================================
// make loading animation
function loadingAnimation() {
    // create attributes
    imgRock.setAttribute('src', '../img/rock.png');
    imgPaper.setAttribute('src', '../img/paper.png');
    imgScissors.setAttribute('src', '../img/scissors.png');
    imgRock.setAttribute('class', 'rockCo');
    imgPaper.setAttribute('class', 'paperCo');
    imgScissors.setAttribute('class', 'scissorsCo');
    // append the attributes to elements
    comPickContainer.appendChild(imgRock);
    comPickContainer.appendChild(imgPaper);
    comPickContainer.appendChild(imgScissors);
}
function stopLoadAnim() {
    imgRock.removeAttribute('src')
    imgPaper.removeAttribute('src')
    imgScissors.removeAttribute('src')
}

// ================================
gameRound();
