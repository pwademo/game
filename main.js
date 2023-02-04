

document.addEventListener("DOMContentLoaded", function(){

const containerplayer=document.getElementById("containerplayer");
const containertotalscore=document.getElementById("containertotalscore");
const containersmells=document.getElementById("containersmells");     
const btnClearGame=document.getElementById("btnClearGame");
const btnGetTotalScore=document.getElementById("btnGetTotalScore");

let players=getPlayers();
let smells= getSmells();
//let game=getGame();

let game2=getGame2();


function setGame(game){
    localStorage.setItem("game",JSON.stringify(game));
};
function setGame2(game2){
    localStorage.setItem("game2",JSON.stringify(game2));
};

function setPlayers(players){
    localStorage.setItem("players",JSON.stringify(players));
};
function setSmells(smells){
    localStorage.setItem("smells",JSON.stringify(smells));
};

/* function getGame(){
    //get from localstorage or init new game if not exist
    const value=localStorage.getItem("game") || initGame();
    //console.log(value);
    return JSON.parse(value);
} */
function getGame2(){
    //get from localstorage or init new game if not exist
    const value=localStorage.getItem("game2") || initGame2(smells,players);
    //console.log(value);
    return JSON.parse(value);
}


function getPlayers(){
     const value=localStorage.getItem("players") || initPlayers();     
     return JSON.parse(value);
}
function getSmells(){
    const value=localStorage.getItem("smells") || initSmells();    
    return JSON.parse(value);
}

function initPlayers(){
    const defaultplayers=["Sara","Peter","Simon","Nina"];     
    setPlayers(defaultplayers);
    return JSON.stringify(defaultplayers);
}

function initSmells(){
    const defaultsmells=[{id:0,name:"Hindbær"},{id:1,name:"Lime"},{id:2,name:"Timian"},{id:3,name:"Eddike"},{id:4,name:"Karry"},{id:5,name:"Karamel"},{id:6,name:"Ananas"},{id:7,name:"Pepermynte"},{id:8,name:"Kamille"},{id:9,name:"Kirsebær"}];
    const shuffledSmellArray = defaultsmells.sort((a, b) => 0.5 - Math.random());
    setSmells(shuffledSmellArray);
    return JSON.stringify(shuffledSmellArray);
}

/* function initGame(){
    //make two-dim array 
    let _emptygame= Array.from({ length:smells.length }, () => (
        Array.from({ length:players.length }, ()=> -1)
    ))
    setGame(_emptygame);
    return JSON.stringify(_emptygame);
} */

function initGame2(smells,players){
    let _emptygame=[];
    smells.forEach((item=>{
         item.Guesses =Array.from({ length:players.length }, ()=> -1);
         _emptygame.push(item);
    })) 
    //console.log("GAME2",_emptygame);
    setGame2(_emptygame); 
    return JSON.stringify(_emptygame);
};

    
/* if(localStorage.getItem('game') == null){
    let game=createAndFillTwoDArray({rows:smells.length, columns:players.length, defaultValue: -1});
    localStorage.setItem("game",JSON.stringify(game));   
    setNextplayer();
} */




let nextplayerindex=-1;


/* Hente parmetre fra querystring*/
const params = new URLSearchParams(window.location.search.substr(1));

/*henter specifik parametren id fra querystring. Betåre af en række ubrugte værdier for at sløre id på glasset.*/
const idstring=params.get("id");
let id=-1;
     

if(idstring){
    id=idstring.charAt(21);//I position 21 står det nummer vi er ude efter
}

function setmove(userid,smellid, guessid){
    //game
/*     game[smellid][userid]=guessid;//change value
    setGame(game); */

    //game2
    game2.find(field => field.id == smellid).Guesses[userid]=guessid;
    setGame2(game2);
}

function getRound(gameround){
   // let _round=game[gameround];

    let _round2 = game2.find(field => field.id == gameround).Guesses;   
/*     console.log("GuessesNew",gameround,_round2); 

    console.log("GuessesOld",gameround,_round); */

    
    return _round2;
}

/* function getTotalScore(){
    const fragment = document.createDocumentFragment();
    const table=document.createElement("TABLE");
    const thead=document.createElement("THEAD");
    const tbody=document.createElement("TBODY");            

    
    let trheader=document.createElement("TR");   
    let thleftuppercorner=document.createElement("TH")      
    trheader.appendChild(thleftuppercorner)       ;
    for (let col = 0; col < smells.length; col++) { 
        const th=document.createElement("TH");
          th.append(getSmellNameById(col));                  
          trheader.appendChild(th);                                  
    }
    let thscore=document.createElement("TH")  
    thscore.append("Point");
    trheader.appendChild(thscore);
    thead.appendChild(trheader);
    table.appendChild(thead);

    
    for (let row = 0; row < players.length; row++) {                
        const tr=document.createElement("TR");
        const tdleft=document.createElement("TD");
        tdleft.append(players[row])
        tr.appendChild(tdleft);
        let points=0;                
        for (let col = 0; col < smells.length; col++) {  

            const td=document.createElement("TD");
            let smellgeuss="";
            if(game[col][row]>=0){                       
                if(game[col][row]===col){
                    points++;
                    td.setAttribute("class","green");
                } else {
                    td.setAttribute("class","red");
                }
                smellgeuss=getSmellNameById(game[col][row]);

            };
            td.append(smellgeuss);
            tr.appendChild(td);        
        }
        const tdscore=document.createElement("TD")  
        tdscore.append(points);
        tr.appendChild(tdscore);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody); 
    fragment.appendChild(table);
   // containerplayer.innerHTML="";
    containerplayer.appendChild(fragment)
}
 */

function getTotalScore2(){
    const fragment = document.createDocumentFragment();
    const table=document.createElement("TABLE");
    const thead=document.createElement("THEAD");
    const tbody=document.createElement("TBODY");            

    
    let trheader=document.createElement("TR");   
    let thleftuppercorner=document.createElement("TH")      
    trheader.appendChild(thleftuppercorner);
    game2.forEach((item) =>{     
        const th=document.createElement("TH");
        th.append(item.name);                  
        trheader.appendChild(th);
    });

    let thscore=document.createElement("TH")  
    thscore.append("Point");
    trheader.appendChild(thscore);
    thead.appendChild(trheader);
    table.appendChild(thead);

    players.forEach((player,index)=>{
        const tr=document.createElement("TR");
        const tdleft=document.createElement("TD");
        tdleft.append(player);
        tr.appendChild(tdleft);
        let points=0;    
        game2.forEach((item) =>{     
            const td=document.createElement("TD");
            const usersguess=item.Guesses[index];
            if (usersguess!=-1){
                if(item.id==usersguess){
                    points++;
                    td.setAttribute("class","green");
                } else {
                    td.setAttribute("class","red");
                }                
            }
            td.append(getSmellNameById(usersguess));   
            tr.appendChild(td);
        });

        const tdscore=document.createElement("TD")  
        tdscore.append(points);
        tr.appendChild(tdscore);
        tbody.appendChild(tr);        
    });

    table.appendChild(tbody); 
    fragment.appendChild(table);
    containerplayer.innerHTML="";
    containerplayer.appendChild(fragment)
}



function getSmellNameById(id){
    if(id===-1) return "";
    let name = smells.find(field => field.id == id).name;           
    return name;
}

function getPlayerNameById(id){
    let name = players[id];           
    return name;
}



function getRoundResult(id){
    containertotalscore.innerHTML="";

    var _round=getRound(id);
    const fragment = document.createDocumentFragment();
    div=document.createElement("DIV");
    
    div.append(`Det rigtige svar var: ${getSmellNameById(id)} `)
    fragment.appendChild(div);
    ul=document.createElement("UL");
     for (let index = 0; index < _round.length; index++) {
        li=document.createElement("LI");
        spanplayer=document.createElement("SPAN");
        spanplayerguess=document.createElement("SPAN");
        if(id==_round[index]){spanplayerguess.setAttribute("class","green")}
        else {spanplayerguess.setAttribute("class","red")}
        
        spanplayer.append(`${players[index]}: `);
        spanplayerguess.append(`${getSmellNameById(_round[index])}`);
        li.append(spanplayer,spanplayerguess);

        ul.appendChild(li) ;
        fragment.appendChild(ul);
     }

     containertotalscore.appendChild(fragment)

}


/**/
function setNextplayer(){            
    let playersThisSmell=getRound(id);
    nextplayerindex = playersThisSmell.findIndex(rank => rank === -1);
    if(nextplayerindex==-1){
        //Ikke flere spillere i denne runde - alle har afgivet et gæt på indholdet i glasset
        containerplayer.innerText="Alle har givet deres gæt på dette glas";    
        getRoundResult(id);
        containersmells.innerHTML="";                
    }
    else {
        
        containerplayer.innerText=getPlayerNameById(nextplayerindex);               
    }

}


btnClearGame.addEventListener("click",clearGame)

 /*Nulstiller localstorage for at starter et nyt spil*/
function clearGame(){
   // localStorage.removeItem("game");
    localStorage.removeItem("game2");
    localStorage.removeItem("players");
    localStorage.removeItem("smells");      

    containerplayer.innerHTML="";
    containertotalscore.innerHTML="";
    containersmells.innerHTML="";   
}


setNextplayer();



function drawContainerSmells(){
    const fragment = document.createDocumentFragment();    
            
    game2.forEach((item) =>{                               
                div=document.createElement("DIV");
                div.setAttribute('data-id', item.id);
                div.innerHTML=item.name ;

                div.addEventListener("click", (e)=>
                {                          
                    setmove(nextplayerindex,id,item.id);
                    setNextplayer();
                });

                fragment.appendChild(div);

            } 
            );
            containersmells.innerHTML="";
            containersmells.appendChild(fragment); 
};

 

drawContainerSmells();



btnGetTotalScore.addEventListener("click",()=>{
   // getTotalScore();
    getTotalScore2();
});


console.table(players);
console.table(smells);
console.table(game2);

//containertotalscore







   
});

