//:
document.addEventListener("DOMContentLoaded", function(){
    //Global variables
    let id=-1;
    let nextplayerindex=-1;
    let players;
    let smells;  
    let game;
    let gameMode;
 
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var browserName = (function (agent) {
      switch (true) {
          case agent.indexOf("edge") > -1: return "MS Edge";
          case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
          case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
          case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
          case agent.indexOf("trident") > -1: return "MS IE";
          case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
          case agent.indexOf("safari") > -1: return "Safari";
          default: return "other";
      }
      })(window.navigator.userAgent.toLowerCase());
    
    document.getElementById("screenwidth").innerText=width;
    document.getElementById("browsername").innerText=browserName;


    //alert(gameMode);
    let setupmode=localStorage.getItem("setupmode");

    //references to UI elements
    const containerplayer=document.getElementById("containerplayer");
    const containertotalscore=document.getElementById("containertotalscore");
    const containerplayers=document.getElementById("containerplayers");
    const containersmellguess=document.getElementById("containersmellguess");  
    const containersmells=document.getElementById("containersmells");     
    const btnClearGame=document.getElementById("btnClearGame");
    const btnGetTotalScore=document.getElementById("btnGetTotalScore");
    const btnToggelGamemode=document.getElementById("btnToggelGamemode");
    const containersetup = document.getElementById("containersetup");
    const btnShowSetup=document.getElementById("btnShowSetup");




    //check if local storage is empty.
    //If it is empty, the game is not installed.
    //When scanning QR in iOS, Safari will start in "private browsing" and 
    //there will be no access to data saved in local storage in previous sessions
    const value=localStorage.getItem("pq")
    if(value===null){
      

        document.getElementById("containerprivatebrowsing").style.display="block";
        btnClearGame.classList.add("scannermode");
      
    }   
    else {
      btnClearGame.classList.remove("scannermode");
    }

  
  


   gameMode=getGameMode();
   players=getPlayers();
   smells= getSmells();  
   game=getGame();

  
  function getGameMode(){
    const value=localStorage.getItem("gamemode") || "Fritekst";     
    return value;
  }


/*   function toggelGameMode(){
    if(gameMode=="Knapper"){
      //change gamemode to Fritext
      gameMode="Fritekst";
      localStorage.setItem("gamemode","Fritekst");

    }
    else {
      //change gamemode to Knapper
      gameMode="Knapper";
      localStorage.setItem("gamemode","Knapper");
    }
    drawSmellButtons();
  } */

  function setGame(game){
      localStorage.setItem("game",JSON.stringify(game));
  };
  
  function setPlayers(players){
      localStorage.setItem("players",JSON.stringify(players));
  };

  function setSmells(smells){
      localStorage.setItem("smells",JSON.stringify(smells));
  };
  
  function getGame(){
      //get from localstorage or init new game if not exist
      const value=localStorage.getItem("game") || initGame(smells,players);
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
      const defaultplayers=[];     
      setPlayers(defaultplayers);
      return JSON.stringify(defaultplayers);
  }
  
  function initSmells(){
      const defaultsmells=[
        {id:0,name:"Hindbær",isactive:true},
        {id:1,name:"Lime",isactive:true},
        {id:2,name:"Timian",isactive:true},
        {id:3,name:"Eddike",isactive:true},
        {id:4,name:"Karry",isactive:true},
        {id:5,name:"Karamel",isactive:true},
        {id:6,name:"Ananas",isactive:true},
        {id:7,name:"Pepermynte",isactive:true},
        {id:8,name:"Kamille",isactive:true},
        {id:9,name:"Kirsebær",isactive:true},
        {id:10,name:"Abrikos",isactive:true},
        {id:11,name:"Melon",isactive:true},
        {id:12,name:"Appelsin",isactive:true},
        {id:13,name:"Koriander",isactive:true},
        {id:14,name:"Spidskommen",isactive:true},
        {id:15,name:"Kaffe",isactive:true},
        {id:16,name:"Kanel",isactive:true},
        {id:17,name:"Mandel",isactive:true},
        {id:18,name:"Vanilje",isactive:true},
        {id:19,name:"Rom",isactive:true},
        {id:20,name:"Rosmarin",isactive:true},
        {id:21,name:"Muskat",isactive:true},
        {id:22,name:"Ingefærd",isactive:true},
        {id:23,name:"Cayenne",isactive:true},
        {id:24,name:"Anis",isactive:true},
        {id:25,name:"Banan",isactive:true},
        {id:26,name:"Kokos",isactive:true},
        {id:27,name:"Peanuts",isactive:true},
        {id:28,name:"Mandarin",isactive:true},
        {id:29,name:"Jordbær",isactive:true}
      ];

      const shuffledSmellArray = defaultsmells.sort((a, b) => 0.5 - Math.random());
      setSmells(shuffledSmellArray);
      return JSON.stringify(shuffledSmellArray);
  }
  


  
  function initGame(smells,players){
      let _emptygame=[];
      smells.forEach((item=>{
           item.Guesses =Array.from({ length:players.length }, ()=> -1);
           item.Points =Array.from({ length:players.length }, ()=> -1);
           _emptygame.push(item);
      })) 
      console.log("GAME",_emptygame);
      setGame(_emptygame); 
      return JSON.stringify(_emptygame);
  };
  

  
  
  
  

  
  
  /* Hente parmetre fra querystring*/
  const params = new URLSearchParams(window.location.search.substr(1));
  
  /*henter specifik parametren id fra querystring. Betåre af en række ubrugte værdier for at sløre id på glasset.*/
  const idstring=params.get("id");

       
  
  if(idstring){
      //id=idstring.charAt(21);//I position 21 står 1'er og i pos 25 står 10'er
      id=idstring.charAt(27)*10+idstring.charAt(21)*1
      console.log(id)
  }
  
  function givePoint(userid,smellid,point){
    let round=game.find(field => field.id == smellid)
    console.log(round);
    round.Points[userid]=point;
    setGame(game);
  }

  function setmove(userid,smellid, guessid){


      let txtSmellguess=getSmellNameById(guessid);
      let txtSmellInGlass=getSmellNameById(smellid);
      let point=0;
      if(txtSmellguess.toLowerCase()===txtSmellInGlass.toLowerCase()){
        point=3;
      } 
     
      game.find(field => field.id == smellid).Guesses[userid]=txtSmellguess;
      game.find(field => field.id == smellid).Points[userid]=point;

      setGame(game);
  }

  function setmovefreetext(userid,smellid, txtSmellguess){    

    let txtSmellInGlass=getSmellNameById(smellid);
    let point=0;
    if(txtSmellguess.toLowerCase()===txtSmellInGlass.toLowerCase()){
      point=3;
    } 
    game.find(field => field.id == smellid).Guesses[userid]=txtSmellguess;   
    game.find(field => field.id == smellid).Points[userid]=point;
    
    setGame(game);
  }   


  
  function getRound(gameround){  
      //console.log("ROUND",gameround);
      let _round=game.find(field => field.id == gameround);
      if(_round===undefined){
        addSmell(gameround);//hvis smell ikke er oprettet ved init 
      }
      
      if(_round){
        return _round.Guesses; 
      }       

      return 0;
  }

  
  function getTotalScore2(){
      const fragment = document.createDocumentFragment();
      const table=document.createElement("TABLE");
      const thead=document.createElement("THEAD");
      const tbody=document.createElement("TBODY");            
  
      
      let trheader=document.createElement("TR");   
      let thleftuppercorner=document.createElement("TH")      
      trheader.appendChild(thleftuppercorner);

      let _game=game.filter(
        (item)=>
        item.isactive && 
        item.isactive==true &&
        !item.Guesses.some((guess)=>guess==-1) //alle skal have gættet før en smell vises
        
        );   
      _game.forEach((item) =>{     
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

          _game.forEach((item) =>{     
            
              const td=document.createElement("TD");
              
              const usersguess=item.Guesses[index];
              let point=item.Points[index];
              if (usersguess!=-1){
                
                points+=point;
/*                   if(item.name.toLowerCase()==usersguess.toLowerCase()){
                      points++;
                      td.setAttribute("class","green");
                  } else {
                      td.setAttribute("class","yellow");
                  }        */         
              }
              td.append(`${usersguess} (${point})`);   
              tr.appendChild(td);
          });
  
          const tdscore=document.createElement("TD")  
          tdscore.append(points);
          tr.appendChild(tdscore);
          tbody.appendChild(tr);        
      });
  
      table.appendChild(tbody); 
      fragment.appendChild(table);
      containertotalscore.innerHTML="";
    
      
      containertotalscore.appendChild(fragment)
  }
  
  
  
  function getSmellNameById(id){
      if(id===-1) return "";
      _smell= smells.find(field => field.id == id);
      if(_smell==undefined){
        return "";
      }
      let name = _smell.name;           
      return name;
  }

  
  function getPlayerNameById(id){
      let name = players[id];           
      return name;
  }
  
  //function removing class active form siblings and set active om current element
  const setActiveAndRemoveFromSiblings = el => {
        [...el.parentElement.children].forEach(sibling => sibling.classList.remove('active'));
        el.classList.add('active');
    }
  
  function getRoundResult(id){
      containertotalscore.innerHTML="";
  
      let _round=getRound(id);//txt array med gæt i klar tekst.

      let _round2=game.find(field => field.id == id);
      let _points=_round2.Points;
      

      const fragment = document.createDocumentFragment();
      div=document.createElement("DIV");
      let rigtigtsvar=getSmellNameById(id);
      div.append(`Det rigtige svar var: ${rigtigtsvar} `)
      fragment.appendChild(div);
      ul=document.createElement("UL");
       for (let index = 0; index < _round.length; index++) {
        console.log("QQQQ",_round[index]);
        console.log("QQQQ",game[id].Guesses[index],_round[index]);

        console.log("PP",_points[index]);
          li=document.createElement("LI");
          spanplayer=document.createElement("SPAN");
          spanplayerguess=document.createElement("SPAN"); 

          let correctGuess=rigtigtsvar.toLowerCase()==_round[index].toLowerCase()?true:false;

        if(correctGuess){
            spanplayerguess.setAttribute("class","green");
          }
        else {
            spanplayerguess.setAttribute("class","yellow");
        }  


          let tmpPoint=0;    

          if(correctGuess==true){
              tmpPoint=3;
          }

          tmpPoint=_points[index];
          
          spanplayer.append(`${players[index]}: `);
          console.log(_round[index]);
          spanplayerguess.append(_round[index]);

          li.append(spanplayer,spanplayerguess); 

          spanpointbuttons=document.createElement("SPAN"); 
          for (let p = 0; p <=3 ; p++) {
            const button = document.createElement("BUTTON");
            button.innerText=p;
            if(tmpPoint==p){
                button.classList.add("active");
            }
            button.addEventListener("click",(e)=>{
                setActiveAndRemoveFromSiblings(e.target);

                let userIndex=index;
                givePoint(userIndex,id,parseInt(button.innerText));
            })
            spanpointbuttons.appendChild(button);
          }
          li.appendChild(spanpointbuttons);
          ul.appendChild(li) ;
          fragment.appendChild(ul);
       }
  
       containertotalscore.appendChild(fragment)  
  }
  

  
  /**/
  function setNextplayer(){            
    containerplayer.style.backgroundColor="lightgray";

      let playersThisSmell=getRound(id);

      if(playersThisSmell){
        nextplayerindex = playersThisSmell.findIndex(rank => rank === -1);
        
        if(nextplayerindex==-1){
            containerplayer.style.color="yellow";
            containerplayer.style.backgroundColor ="Black";
            containerplayer.innerText="Alle har givet deres gæt på dette glas";    
            getRoundResult(id);
            containersmells.innerHTML="";                
        }
        else {
          let nextPlayerName=getPlayerNameById(nextplayerindex);
            containerplayer.innerText=nextPlayerName;            
            containerplayer.style.backgroundColor = generateHSLByName(nextPlayerName);  
      }
      
    }  
  }


/*   if(nextplayerindex==-1){
    //Ikke flere spillere i denne runde - alle har afgivet et gæt på indholdet i glasset
  console.log("nextplayerindex",nextplayerindex)  
    
    containersmells.innerHTML="";                
} */
  
  btnClearGame.addEventListener("click",clearGame)

  function setPQ(){
    localStorage.setItem("pq",JSON.stringify("pq"));
  };

  
   /*Nulstiller game i localstorage for at starter et nyt spil*/
  function clearGame(){
      localStorage.removeItem("game");
      setPQ(); 
      initGame(smells,players)    
      location.reload();//genindlæs siden
  }
  
  
  setNextplayer();
  
  
  
  function drawSmellButtons(){
    containersmells.innerHTML="";
   if(nextplayerindex ==-1) return;
   const fragment = document.createDocumentFragment(); 

   if(gameMode==="Knapper"){
    
       let _game=game.filter((item)=>item.isactive && item.isactive==true);   
              
      _game.forEach((item) =>{                 
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
               }
   else {
       let label= document.createElement("LABEL");
       label.innerText="Hvad gætter du på?";
       label.setAttribute("for","txtSmellguess");
       let input=document.createElement("INPUT");
       input.type="text";
       input.id="txtSmellguess";
       input.style.marginLeft=5;
       input.style.marginRight=5;
       let button= document.createElement("BUTTON");
       button.innerText="Gæt";
       button.id="btnSmellguess";
       button.addEventListener("click",()=>{
            let txtSmellguess=document.getElementById("txtSmellguess");        
            setmovefreetext(nextplayerindex,id,txtSmellguess.value);
            txtSmellguess.value="";    //nulstil felt så det er klar til næste bruger
            setNextplayer();
          });
       fragment.append(label,input,button),
       containersmells.appendChild(fragment);
   }
  };
  

  drawSmellButtons();

/*   document.getElementById("btnSmellguess").addEventListener("click",()=>{
    //det felt som brugeren selv kan skrive sit gæt i
    let txtSmellguess=document.getElementById("txtSmellguess");
    //alert(txtSmellguess);
    
    setmovefreetext(nextplayerindex,id,txtSmellguess.value);
    txtSmellguess.value="";    //nulstil felt så det er klar til næste bruger
    setNextplayer();
  }); */





/*   if(gameMode==="Knapper"){
      btnToggelGamemode.innerText="Knapper";
     drawSmellButtons();
      containersmellguess.style.display="none";
  }
  else {
      //containersetup.style.display = "block";
      btnToggelGamemode.innerText="Fritekst";
      //alert(nextplayerindex);
      if(nextplayerindex=-1){
        containersmellguess.style.display="none";
      }
      else {
        containersmellguess.style.display="block";
      }
  } */


   btnToggelGamemode.addEventListener("click",()=>{
    if(gameMode=="Knapper"){
      //change gamemode to Fritext
      gameMode="Fritekst";
      localStorage.setItem("gamemode","Fritekst");

    }
    else {
      //change gamemode to Knapper
      gameMode="Knapper";
      localStorage.setItem("gamemode","Knapper");
    }
    drawSmellButtons();

  }) 




  drawContainerPlayers();
  
  
  
  btnGetTotalScore.addEventListener("click",()=>{
      getTotalScore2();
  });
  
  
  console.table(players);
  console.table(smells);
  console.table("GAME:",game);
  
  

 function deletePlayer(playerName){
    var index = players.indexOf(playerName);
    if (index !== -1) {
        players.splice(index, 1);
        setPlayers(players);
        initGame(smells,players) ;       
        location.reload();
    } 
 }

 function addPlayer(playerName){
        players.push(playerName);
        setPlayers(players);//save to loalstorage
        initGame(smells,players);       
        location.reload();
 } 
 



function drawContainerPlayers(){
    const fragment = document.createDocumentFragment();    
    
            
    players.forEach((item) =>{                               
                div=document.createElement("DIV"); 
                deletebutton=document.createElement("BUTTON");
                deletebutton.innerText="x"; 
                div.appendChild(deletebutton);

                div.append(item) ;

                deletebutton.addEventListener("click", (e)=>
                {                         
                    deletePlayer(item);                    
                }); 

                fragment.appendChild(div);

            } 
            );
            containerplayers.innerHTML="";
            containerplayers.appendChild(fragment); 
};

        const spanId=document.getElementById("spanId");
const inputSmell=document.getElementById("inputSmell");

const chkboxSmellIsactive=document.getElementById("chkboxSmellIsactive");


  function getSmellForEdit(){
    let _smell = smells.find(field => field.id == id);  
    if(_smell===undefined){
        addSmell(id);
    }

    if(_smell){
        

        spanId.innerHTML=id;
        inputSmell.value=_smell.name;
        chkboxSmellIsactive.checked=_smell.isactive;
    }
  }


  getSmellForEdit();

//function to add smell if not in game
 function addSmell(id){
    if(id!=-1){
        let newsmell={
            "id":id,
            "name":"",
            "isactive":false
        }

        smells.push(newsmell);
        setSmells(smells);//save to loalstorage
        initGame(smells,players);       
        location.reload();
    }
 }

  function saveSmell(){
    let smell = smells.find(field => field.id == id);   
    smell.name=inputSmell.value;
    smell.isactive=chkboxSmellIsactive.checked;

    setSmells(smells);//save to loalstorage
    initGame(smells,players);       
    location.reload();
  }

  document.getElementById("btnSaveSmell").addEventListener("click",saveSmell);
  
  document.getElementById("btnAddPlayer").addEventListener("click",()=>{
    let playerName=document.getElementById("txtPlayerName").value;
    if(playerName){
        addPlayer(playerName);
    }    
  });
  
     


  





    if(setupmode===null){
        containersetup.style.display = "none";
        btnShowSetup.innerText="Show Setup";
    }
    else {
        containersetup.style.display = "block";
        btnShowSetup.innerText="Hide Setup";
    }


    btnShowSetup.addEventListener("click",()=>{
        if (containersetup.style.display==="none" || containersetup.style.display==="") {
            containersetup.style.display = "block";
            btnShowSetup.innerText="Hide Setup";
           localStorage.setItem("setupmode",true);
        } else {
            localStorage.removeItem("setupmode");
            containersetup.style.display = "none";
            btnShowSetup.innerText="Show Setup";            
        }
    })
  
  document.getElementById("btnDisplayBrowserVersion").addEventListener("click",()=>{
      console.log(navigator);
      var v = "Version: " + navigator.userAgent;
      document.getElementById("DisplayBrowserVersion").innerHTML = v;
  })
  






  });