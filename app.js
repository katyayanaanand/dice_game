/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/
var s1 = 0;
var s2 = 0;
var curtotal= 0;
var gamePlaying;
var activeplayer;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
        //generate some random number
        var dice = Math.floor(Math.random()*6) + 1; 
        
        //display the result
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        
        //if !1 then add the result
        if(dice !== 1) {
            curtotal+= dice;
            document.querySelector('#current-' + activeplayer).textContent = curtotal;
        }else {
            document.getElementById('score-' + activeplayer).textContent = 0;
            s1= 0;
            s2= 0;
            nextplayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score
        activeplayer === 0 ? s1+=curtotal : s2+= curtotal;
        var prevtotal = parseInt(document.getElementById('score-' + activeplayer).textContent);
        document.getElementById('score-' + activeplayer).textContent= curtotal+prevtotal;
        var newtotal = parseInt(document.getElementById('score-' + activeplayer).textContent);
        if(newtotal >=50)
        {
            document.querySelector('#name-' + activeplayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextplayer();
        }
    }
});

function nextplayer() {
    activeplayer === 0 ? activeplayer = 1 : activeplayer= 0;
    curtotal= 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    activeplayer= 0;
    gamePlaying= true;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}





