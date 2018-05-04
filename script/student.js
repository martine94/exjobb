window.onload = function () {

    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn");
    var lookAtJobBtn = document.getElementById("lookAtJobBtn");
    var logOutStudentBtn=document.getElementById("logOutStudentBtn");

    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadMyProfile);
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs);
    mySInfoBtn.addEventListener("click", loadMyInfo);
    lookAtJobBtn.addEventListener("click", loadCatalog);
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
    var work_Announcement;

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
        xhttp.open("GET", "loadFileStudent?p="+'/mySInfo.html', true);    
        xhttp.send();
    }

    function loadMyInterests() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadFileStudent?p="+'/mySJobs.html', true);    
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
        xhttp.open("GET", "loadFileStudent?p="+'/mySProfile.html', true);    
        xhttp.send();
    }

    function loadMyRecomendedJobs() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadFileStudent?p="+'/myRecomendedJobs.html', true);    
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

function showMoreInfoBtn(jobId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementById("menu-page-content").innerHTML = this.response;
            document.getElementById("closeExJob").addEventListener("click",loadCatalog);
            getSpecificJob(jobId);
        }
    };
    xhttp.open("GET", "loadFileStudent?p="+'/showExJob.html', true);    
    xhttp.send();
}

function getSpecificJob(jobId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // document.getElementById("option-page-content").innerHTML = this.response;
            console.log("JOBB HÄMTADE");
            var jobs=JSON.parse(this.response);

            document.getElementById("logga").src=jobs[0].logoURL;
            console.log(jobs[0].logoURL)
            document.getElementById("rubrik").innerHTML=jobs[0].tile;
            console.log(jobs[0].tile)
            document.getElementById("shortDescriprion").innerHTML=jobs[0].shortdesc;
            document.getElementById("longDescriprion").innerHTML=jobs[0].longdesc;
            var keyWords= document.getElementById("keyWordArea");
            for(i=0;i<jobs[0].keywords.length;++i){
                var p=document.createElement("p");
                p.innerHTML=jobs[0].keywords[i];
                keyWords.appendChild(p);
            }
        }
    };
    //Skriv en funktion som bara tar ut företagets jobbannonser
    xhttp.open("GET", "getSpecificJobFromDB?jobID="+jobId, true);
    xhttp.send();
}

function loadCatalog() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-page-content").innerHTML = this.response;
            document.getElementById("SCatalog").style.display="block";
           getJobsFromDB();
        }
    };
    xhttp.open("GET", "loadFileStudent?p="+'/StudentCatalog.html', true);    
    xhttp.send();
}

function getJobsFromDB(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // document.getElementById("option-page-content").innerHTML = this.response;
            console.log("JOBB HÄMTADE");
            var jobs=JSON.parse(this.response);
            workAnnouncements(jobs.length,jobs);

        }
    };
    xhttp.open("GET", "getJobsFromDB", true);
    xhttp.send();
}

function workAnnouncements(num, jobb) {

    for (var i = 0; i < num; i++) {
            
            var outerDiv = document.createElement("div");
            outerDiv.className = "jobsSmall";

            var top = document.createElement("div"); //topbar
            top.className = "jobTop";

            var logo=document.createElement("img");//ladda in logga
            
            logo.className = "jobLogo";
            var header = document.createElement("div");//rubrik
            header.className = "jobHeader";

           
            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");
           
            var readBtn = document.createElement("button");
            readBtn.innerHTML = "Visa annons";
            readBtn.id=jobb[i]._id;
            var Btn = document.createElement("button");
            Btn.innerHTML = "Intresseanmälningar";

            workAnnouncement.appendChild(outerDiv);
            workAnnouncement.appendChild(document.createElement("br"));
            outerDiv.appendChild(top);

            outerDiv.appendChild(readBtn);
            outerDiv.appendChild(Btn);
            
            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);
             

            logo.src=jobb[i].logoURL; //ladda in logga
            newh1.innerHTML = jobb[i].tile;//ladda in rubrik    

            readBtn.addEventListener("click",(e)=>showMoreInfoBtn(readBtn.id));      
    }
}