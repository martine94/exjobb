window.onload = function () {

    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn")
    var logOutStudentBtn=document.getElementById("logOutStudentBtn");

    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadMyProfile)
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs)
    mySInfoBtn.addEventListener("click", loadMyInfo)
    logOutStudentBtn.addEventListener("click",logOut);
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

    function loadMyInfo() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;


                listUserDataFromDB(); //genererar användarinfo
            }
        };
        xhttp.open("GET", "loadMyInfo", true);
        xhttp.send();
    }

    function loadMyInterests() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadMyInterests", true);
        xhttp.send();
    }


    function loadMyProfile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                fillEditProfile();
            }
        };
        xhttp.open("GET", "loadMySProfile", true);
        xhttp.send();
    }

    function loadMyRecomendedJobs() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadMyRecomendedJobs", true);
        xhttp.send();
    }
    function fillEditProfile() {
        console.log("fda");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.name,
                    ulname: obj.lastname,
                    edu: obj.ueducation,
                    email: obj.uemail,
                    pw: obj.password
                }
                document.getElementById("sFName").value += user.name;
                document.getElementById("sLName").value += user.ulname;
                document.getElementById("sEdu").value += user.edu;
                document.getElementById("sEmail").value += user.email;
                loadButtonsStudentprofile();
                loadButtonEventsStudentprofile();
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true)
        xhttp.send();
    }

    function listUserDataFromDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.name,
                    ulname: obj.lastname,
                    edu: obj.ueducation,
                    email: obj.uemail,
                    pw: obj.password
                }
                console.log(user);
                document.getElementById("idS").innerHTML += user.id;
                document.getElementById("ufnameS").innerHTML += user.name;
                document.getElementById("ulnameS").innerHTML += user.ulname;
                document.getElementById("eduS").innerHTML += user.edu;
                document.getElementById("emailS").innerHTML += user.email;
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true)
        xhttp.send();
    }


    function loadButtonsStudentprofile(){
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
    function loadButtonEventsStudentprofile(){
        progBtn.addEventListener("click", (e) => showHide(prog));
    typeBtn.addEventListener("click", (e) => showHide(types));
    operationSystemBtn.addEventListener("click", (e) => showHide(operationSystems));
    databaseBtn.addEventListener("click", (e) => showHide(databases));
    otherBtn.addEventListener("click", (e) => showHide(other));
    progBtn.addEventListener("mouseover", (e) => hoverNewKeywords(progBtn, 1, prog));
    progBtn.addEventListener("mouseleave", (e) => hoverNewKeywords(progBtn, 0, prog));
    typeBtn.addEventListener("mouseover", (e) => hoverNewKeywords(typeBtn, 1, types));
    typeBtn.addEventListener("mouseleave", (e) => hoverNewKeywords(typeBtn, 0, types));
    operationSystemBtn.addEventListener("mouseover", (e) => hoverNewKeywords(operationSystemBtn, 1, operationSystems));
    operationSystemBtn.addEventListener("mouseleave", (e) => hoverNewKeywords(operationSystemBtn, 0, operationSystems));
    databaseBtn.addEventListener("mouseover", (e) => hoverNewKeywords(databaseBtn, 1, databases));
    databaseBtn.addEventListener("mouseleave", (e) => hoverNewKeywords(databaseBtn, 0, databases));
    otherBtn.addEventListener("mouseover", (e) => hoverNewKeywords(otherBtn, 1, other));
    otherBtn.addEventListener("mouseleave", (e) => hoverNewKeywords(otherBtn, 0, other));
    saveBtn.addEventListener("click",(e)=>saveProfile)
    }

    function hoverNewKeywords(element, show, connectedTo) {
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

    //#endregions

}

function saveProfile() {
    let ListOfKeyWords=[];
    let title = document.getElementById("").value;
    let shortde = document.getElementById("").value;
    let longde = document.getElementById("").value;
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
loadMyInfo();

}