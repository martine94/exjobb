window.onload = function () {
    class exJob{
        // title= "";
        // shortdesc = "";
        // fulldesc =""
        // keywords = [];
    constructor (title, shortdescription, longdescription, fulllistofkeywords=[]){
            this.tile = title;
            this.shortdesc = shortdescription;
            this.longdesc = longdescription;
            this.keywords = fulllistofkeywords;
        }
 
    }
    //#region buttons
    var newExJobBtn=document.getElementById("newExJobBtn");
    var myOffersBtn=document.getElementById("myOffersBtn");
    var myProfileBtn=document.getElementById("myProfileBtn");
    var myInfoBtn=document.getElementById("myInfoBtn");
    var infoUser = document.getElementById("userData");
    var logOutCompanyBtn=document.getElementById("logOutCompanyBtn");


    //#endregions

    //#region eventListeners
    newExJobBtn.addEventListener("click",loadNewExJob);
    myOffersBtn.addEventListener("click",loadMyOffers);
    myProfileBtn.addEventListener("click",loadMyProfile);
    myInfoBtn.addEventListener("click",loadMyInfo);
    logOutCompanyBtn.addEventListener("click",logOut);
    //#endregions

    //Buttons, divs and an array for newExJob.html
    var progBtn;
    var prog;
    var typeBtn;
    var types;
    var operationSystemBtn;
    var operationSystems;
    var databaseBtn;
    var databases;
    var otherBtn;
    var other;
    var keyBtn;
    var saveBtn;


    //#region functions

    function logOut(){
        console.log("loggaut");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if("true"){
                    window.location.replace("index.html");
                }
            }
        };
        xhttp.open("GET", "logout", true);
        xhttp.send();
    }
    function loadMyInfo(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadmyInfo", true);
        xhttp.send();
    }

    function loadNewExJob(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
                loadButtonsExJob();
                loadButtonEventsExJob();
            }
        };
        xhttp.open("GET", "loadNewExJob", true);
        xhttp.send();
    }

    function loadMyOffers(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadmyCOffers", true);
        xhttp.send();
    }
    function loadMyProfile(){
        console.log("hej123");
    }
    function changeInfo(){
        var cname = document.getElementById("c_Name").value;
        var cuname = document.getElementById("c_Uname").value;
        var psw = document.getElementById("c_Psw").value;
        var ccity= document.getElementById("c_City").value;
        var cemail= document.getElementById("c_Email").value;
        var caddress= document.getElementById("c_Address").value;
        var cweb= document.getElementById("c_WebP").value;
        var clogo= document.getElementById("c_Logo").value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("POST", "changeCompanyInfo?cname=" + cname + "&psw=" + psw + "&cuname=" + cuname + "&caddress=" + caddress + "&cemail=" + cemail+ "&ccity=" + ccity+"&cweb="+cweb+"&clogo="+clogo, true);
        xhttp.send();
    }
    function loadMyProfile(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;

               var saveBtn=document.getElementById('saveBtn');
               saveBtn.addEventListener("click",changeInfo);
               var cancelBtn=document.getElementById('cancelBtn');
               cancelBtn.addEventListener("click",loadMyInfo);
            }
        };
        xhttp.open("GET", "loadMyCPages", true);
        xhttp.send();
    }

    function loadButtonsExJob(){
        infoUser.className = "userDataHide";
        ListOfKeyWords = [];
        progBtn = document.getElementById("ProgrammingLanguageBtn");
        prog = document.getElementById("ProgrammingLanguage");
        typeBtn = document.getElementById("TypeBtn");
        types = document.getElementById("Types");
        operationSystemBtn = document.getElementById("OperationSystemBtn");
        operationSystems = document.getElementById("operationsystems");
        databaseBtn = document.getElementById("DatabaseBtn");
        databases = document.getElementById("Databases");
        otherBtn = document.getElementById("RestBtn");
        other = document.getElementById("TheRest");
        keyBtn = document.getElementById("KeyWordBtn");
        saveBtn = document.getElementById("SaveExJob");
    }
    function loadButtonEventsExJob(){
        progBtn.addEventListener("click", (e) => showHide(prog));
    typeBtn.addEventListener("click", (e) => showHide(types));
    operationSystemBtn.addEventListener("click", (e) => showHide(operationSystems));
    databaseBtn.addEventListener("click", (e) => showHide(databases));
    otherBtn.addEventListener("click", (e) => showHide(other));
    progBtn.addEventListener("mouseover", (e) => hoverNewExJob(progBtn, 1, prog));
    progBtn.addEventListener("mouseleave", (e) => hoverNewExJob(progBtn, 0, prog));
    typeBtn.addEventListener("mouseover", (e) => hoverNewExJob(typeBtn, 1, types));
    typeBtn.addEventListener("mouseleave", (e) => hoverNewExJob(typeBtn, 0, types));
    operationSystemBtn.addEventListener("mouseover", (e) => hoverNewExJob(operationSystemBtn, 1, operationSystems));
    operationSystemBtn.addEventListener("mouseleave", (e) => hoverNewExJob(operationSystemBtn, 0, operationSystems));
    databaseBtn.addEventListener("mouseover", (e) => hoverNewExJob(databaseBtn, 1, databases));
    databaseBtn.addEventListener("mouseleave", (e) => hoverNewExJob(databaseBtn, 0, databases));
    otherBtn.addEventListener("mouseover", (e) => hoverNewExJob(otherBtn, 1, other));
    otherBtn.addEventListener("mouseleave", (e) => hoverNewExJob(otherBtn, 0, other));
    saveBtn.addEventListener("mouseover", (e) => hoverNewExJob(saveBtn, 1, other));
    saveBtn.addEventListener("mouseleave", (e) => hoverNewExJob(saveBtn, 0, other));
    saveBtn.addEventListener("click", (e) => saveNewExjob(e));
    keyBtn.addEventListener("mouseover", (e) => hoverNewExJob(keyBtn, 1, other));
    keyBtn.addEventListener("mouseleave", (e) => hoverNewExJob(keyBtn, 0, other));
    //keyBtn.addEventListener("click", (e) => checkForKeyWords(e));
    }

    function hoverNewExJob(element, show, connectedTo) {
       // connectedTo.style.width = "244pt";
        if ((element.id !== "SaveExJob") && (element.id !== "KeyWordBtn")) {
            if (show === 0) {
                element.className = "contentShow";

                element.style.backgroundColor = "beige";
            }
            else {
                element.className = "contentShowBig";
                element.style.backgroundColor = "white";
            }
        }
        else{
            if(show === 0){
                element.style.width = "275pt";
                
            }
            else{
                element.style.width = "279pt";
            }
        }
    }

    function showHide(elements) {
        console.log("Inside ShowHide-function");
        if (elements.className === "content") {
            elements.className = "contentShow";
        }
        else {
            elements.className = "content";
        }

    }
    function saveNewExjob() {
        let ListOfKeyWords=[];
        let title = document.getElementById("Headline").value;
        let shortde = document.getElementById("shortSubject").value;
        let longde = document.getElementById("Subject").value;
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (i = 0; i < fullListToCheck.length; i++) {
            if(fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }
        
        for(a = 0; a < ListOfKeyWords.length; a++){
            console.log(ListOfKeyWords[a]);
        }
        let savedJob = new exJob(title,shortde,longde,ListOfKeyWords);
        console.log(savedJob);
        infoUser.className = "userDataShow";
    }


    //#endregions

}