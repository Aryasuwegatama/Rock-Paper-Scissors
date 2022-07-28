// computer generate choice
function getComputerPick() { 
    let com = Math.floor((Math.random() * 3) + 1);
    if (com === 1) 
    return "rock";
    if ( com === 2 ) 
    return "paper";
    return "scissors";
};
// debug

//  ====== Rules
function playerResult(player, com) {
    if (player === com) {
        return "TIE";
    } 
    else if (player == "rock") {
        return ((com == "paper") ? "LOSE" : "WIN");
    }
    else if (player == "paper") {
        return ((com == "rock") ? 'WIN' : 'LOSE');
    }
    else if (player == "scissors") {
        return ((com == "paper") ? 'WIN' : 'LOSE');
    } 
};
function comResult(com, player) {
    if (com === player) {
        return "TIE";
    } 
    else if (com == "rock") {
        return ((player == "paper") ? "LOSE" : "WIN");
    }
    else if (com == "paper") {
        return ((player == "rock") ? 'WIN' : 'LOSE');
    }
    else if (com == "scissors") {
        return ((player == "paper") ? 'WIN' : 'LOSE');
    } 
};
// Animation Stop
function comShowPick () {
    const comLoadAnimation = document.querySelectorAll('.imgContainer img');
        comLoadAnimation.forEach(element => {
            element.removeAttribute('class');
        });
        comLoadAnimation[0].style.opacity=0;
        comLoadAnimation[2].style.opacity=0;
        return comLoadAnimation;
};

// Game Play
const pick = document.querySelectorAll('.rpsIconWrap img');
pick .forEach(i => {
    const playerPick = i.className,
    computerPick = getComputerPick(),
    pResult = playerResult(playerPick, computerPick),
    cResult = comResult (computerPick,playerPick);

    i.addEventListener('click', function(){
        // player section
        if(playerPick == "rock"){
            document.querySelector('.paper').style.opacity= 0;
            document.querySelector('.scissors').style.opacity= 0;
        }
        else if (playerPick == "paper"){
            document.querySelector('.rock').style.opacity= 0;
            document.querySelector('.scissors').style.opacity= 0;
        }
        else if (playerPick == "scissors"){
            document.querySelector('.rock').style.opacity= 0;
            document.querySelector('.paper').style.opacity= 0;
        };
        const comImg = document.querySelectorAll('img')[10];
            comImg.src = `/img/${computerPick}.png`;
            comImg.alt = `${computerPick}.RPSGame`; 
        const infoPlayer = document.querySelector('.infoP'),
            infoCom = document.querySelector('.infoC');
            infoPlayer.innerHTML = `${pResult}`;
            infoCom.innerHTML = `${cResult}`;
        comShowPick();
        console.log('kamu pilih : ' + playerPick);
        console.log('variable pilihan komputer : '+ computerPick);
        console.log('you '+pResult);
        console.log('comp '+cResult);
    });
});

