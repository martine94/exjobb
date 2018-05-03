window.onload = function () {
    class exJob{
        // title= "";
        // shortdesc = "";
        // fulldesc =""
        // keywords = [];
    constructor (title, shortdescription, longdescription, fulllistofkeywords=[]){
            this.logoURL="";
            this.tile = title;
            this.shortdesc = shortdescription;
            this.longdesc = longdescription;
            this.keywords = fulllistofkeywords;
            this.companyID="";
            this.companyName="";
            this.website="";
        }
    }

    //#region buttons
    var newExJobBtn=document.getElementById("newExJobBtn");
    var myOffersBtn=document.getElementById("myOffersBtn");
    var myProfileBtn=document.getElementById("myProfileBtn");
    var myInfoBtn=document.getElementById("myInfoBtn");
    var logOutCompanyBtn=document.getElementById("logOutCompanyBtn");

    //Buttons, divs and an array for newExJob.html
    var progBtn;
    var prog;
    var areaBtn;
    var area;
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
    //#endregions

    //#region eventListeners
    newExJobBtn.addEventListener("click",loadNewExJob);
    myOffersBtn.addEventListener("click",loadMyOffers);
    myProfileBtn.addEventListener("click",loadMyProfile);
    myInfoBtn.addEventListener("click",loadMyInfo);
   
    /*logOutCompanyBtn.addEventListener("click", loadPartial("GET", "logout", function(){
        if("true"){
            window.location.replace("index.html");
        }
    }));*/
    logOutCompanyBtn.addEventListener("click", logOut);


//#region functions
function loadPartial(command, route, afterLoad){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            afterLoad();
        }
    };
    xhttp.open(command, route, true);
    xhttp.send();
}

   /*  loadPartial("GET", "logout", function(){
        if("true"){
            window.location.replace("index.html");
        }
    }); */

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

               listUserDataFromDB();
            }
        };
        xhttp.open("GET", "loadFileCompany?p="+'/myCInfo.html', true);    
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
                    name: obj.companyName,
                    address: obj.companyAddress,
                    city: obj.companyCity,
                    email: obj.companyEmail,
                    web: obj.website,
                    logo: obj.logoURL
                }
                document.getElementById("clogo").innerHTML += "<img src="+user.logo+" height=\"70\" width=\"70\" >";
                document.getElementById("cid").innerHTML += user.id;
                document.getElementById("cname").innerHTML += user.name;
                document.getElementById("caddress").innerHTML += user.address;
                document.getElementById("ccity").innerHTML += user.city;
                document.getElementById("cemail").innerHTML += user.email;
                document.getElementById("cweb").innerHTML += "<a href="+user.web+">"+user.web+"</a>";
            }
        };
        xhttp.open("GET", "userDataFromDBCompany", true)
        xhttp.send();
    }

    function fillEditProfile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.companyName,
                    address: obj.companyAddress,
                    city: obj.companyCity,
                    email: obj.companyEmail,
                    web: obj.website,
                    logo: obj.logoURL,
                    uname: obj.userName
                }
                document.getElementById("c_Logo").value += user.logo;
                document.getElementById("c_Name").value += user.name;
                document.getElementById("c_Address").value += user.address;
                document.getElementById("c_City").value += user.city;
                document.getElementById("c_Email").value += user.email;
                document.getElementById("c_WebP").value += user.web;
                document.getElementById("c_Uname").value += user.uname;

            }
        };
        xhttp.open("GET", "userDataFromDBCompany", true)
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
        xhttp.open("GET", "loadFileCompany?p="+'/newExJob.html', true);    
        xhttp.send();
    }

    function loadMyOffers(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
               getJobsFromDB();
            }
        };
        xhttp.open("GET", "loadFileCompany?p="+'/myOffers.html', true);    
        xhttp.send();
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
               if("true"){
                   loadMyInfo();
               }
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
               fillEditProfile();
            }
        };
        xhttp.open("GET", "loadFileCompany?p="+'/myCompanyPages.html', true);    
        xhttp.send();
    }

    function loadButtonsExJob(){
        ListOfKeyWords = [];
        progBtn = document.getElementById("ProgrammingLanguageBtn");
        prog = document.getElementById("ProgrammingLanguage");
        areaBtn = document.getElementById("AreaBtn");
        area = document.getElementById("Area");
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
        areaBtn.addEventListener("click", (e) => showHide(area));
        typeBtn.addEventListener("click", (e) => showHide(types));
        operationSystemBtn.addEventListener("click", (e) => showHide(operationSystems));
        databaseBtn.addEventListener("click", (e) => showHide(databases));
        otherBtn.addEventListener("click", (e) => showHide(other));
        progBtn.addEventListener("mouseover", (e) => hoverNewExJob(progBtn, 1));
        progBtn.addEventListener("mouseleave", (e) => hoverNewExJob(progBtn, 0));
        areaBtn.addEventListener("mouseover", (e) => hoverNewExJob(areaBtn, 1));
        areaBtn.addEventListener("mouseleave", (e) => hoverNewExJob(areaBtn, 0));
        typeBtn.addEventListener("mouseover", (e) => hoverNewExJob(typeBtn, 1));
        typeBtn.addEventListener("mouseleave", (e) => hoverNewExJob(typeBtn, 0));
        operationSystemBtn.addEventListener("mouseover", (e) => hoverNewExJob(operationSystemBtn, 1));
        operationSystemBtn.addEventListener("mouseleave", (e) => hoverNewExJob(operationSystemBtn, 0));
        databaseBtn.addEventListener("mouseover", (e) => hoverNewExJob(databaseBtn, 1));
        databaseBtn.addEventListener("mouseleave", (e) => hoverNewExJob(databaseBtn, 0));
        otherBtn.addEventListener("mouseover", (e) => hoverNewExJob(otherBtn, 1));
        otherBtn.addEventListener("mouseleave", (e) => hoverNewExJob(otherBtn, 0));
        saveBtn.addEventListener("mouseover", (e) => hoverNewExJob(saveBtn, 1));
        saveBtn.addEventListener("mouseleave", (e) => hoverNewExJob(saveBtn, 0));
        saveBtn.addEventListener("click", (e) => saveNewExjob(e));
        keyBtn.addEventListener("mouseover", (e) => hoverNewExJob(keyBtn, 1));
        keyBtn.addEventListener("mouseleave", (e) => hoverNewExJob(keyBtn, 0));
        //keyBtn.addEventListener("click", (e) => checkForKeyWords(e));
    }

    function hoverNewExJob(element, show) {
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
                element.style.width = "100%";
                
            }
            else{
                element.style.width = "101%";
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
        console.log(title+shortde+longde);
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
        var savedJob2 = JSON.stringify(savedJob);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              // document.getElementById("menu-page-content").innerHTML = this.response;
                console.log("Exjob sent to app.js")
                if("true"){
                    loadMyOffers();
                }
            }
        };
        xhttp.open("POST", "addJobToDB?exJobb="+savedJob2, true);
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
        //Skriv en funktion som bara tar ut företagets jobbannonser
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
        }
    }

    loadMyInfo();   

}
    //#endregions

