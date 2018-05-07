"use strict";
window.onload = function () {
    class exJob {
        constructor(title, shortdescription, longdescription, fulllistofkeywords = []) {
            this.logoURL = "";
            this.tile = title;
            this.shortdesc = shortdescription;
            this.longdesc = longdescription;
            this.keywords = fulllistofkeywords;
            this.companyID = "";
            this.companyName = "";
            this.website = "";
        }
    }

    //#region buttons
    var newExJobBtn = document.getElementById("newExJobBtn");
    var myOffersBtn = document.getElementById("myOffersBtn");
    var myProfileBtn = document.getElementById("myProfileBtn");
    var myInfoBtn = document.getElementById("myInfoBtn");
    var logOutCompanyBtn = document.getElementById("logOutCompanyBtn");

    //#region div
    var interestArea = document.getElementById("menu-page-content");

    //Buttons and divs for newExJob.html
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
    var abortBtn;
    //#endregions

    //#region eventListeners

        function AddEventListerersButtons(choice) {
        if (choice === 1) {
            newExJobBtn.addEventListener("click", loadNewExJob);
            myOffersBtn.addEventListener("click", loadMyOffers);
            myProfileBtn.addEventListener("click", loadMyProfile);
            myInfoBtn.addEventListener("click", loadMyInfo);
            logOutCompanyBtn.addEventListener("click", logOut);
        }
        else if (choice === 2) {
            loadButtonsExJob();
            loadButtonEventsExJob();
        }
        else if (choice === 3) {

        }
        else if (choice === 4) {
            
        }
        else if (choice === 5) {

        }
    }







    function loadButtonsAndEventExJob() {
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
        saveBtnExJob=document.getElementById("saveBtn");
        cancelBtnExJob=document.getElementById("cancelBtn");
        
        
        progBtn.addEventListener("click", (e) => showHideDataForExJob(prog));
        areaBtn.addEventListener("click", (e) => showHideDataForExJob(area));
        typeBtn.addEventListener("click", (e) => showHideDataForExJob(types));
        operationSystemBtn.addEventListener("click", (e) => showHideDataForExJob(operationSystems));
        databaseBtn.addEventListener("click", (e) => showHideDataForExJob(databases));
        cancelBtnExJob.addEventListener("click",loadMyOffers);
       

    }
    function updateExJobInfo(jobId, exjobb) {
        var exjobb2 = {
            logoURL : exjobb.logoURL,
            tile : document.getElementById("Title").value,
            shortdesc : document.getElementById("shortDescription").value,
            longdesc : document.getElementById("longDescription").value,
            keywords : exjobb.keywords,
            companyID : exjobb.companyID,
            companyName : exjobb.companyName,
            website : exjobb.website
        }
        let ListOfKeyWords = [];
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (i = 0; i < fullListToCheck.length; i++) {
            if (fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }
        exjobb2.keywords = ListOfKeyWords;
        stringExjobb = JSON.stringify(exjobb2);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if ("true") {
                    loadMyOffers();
                }
            }
        };
        xhttp.open("POST", "changeExJobInfo?jobID=" + jobId + "&exJobb=" + stringExjobb, true);
        xhttp.send();
    }

    function getSpecificJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                console.log("JOBB HÄMTADE");
                var jobs = JSON.parse(this.response);

                document.getElementById("logga").src = jobs[0].logoURL;
                document.getElementById("rubrik").innerHTML = jobs[0].tile;
                document.getElementById("shortDescriprion").innerHTML = jobs[0].shortdesc;
                document.getElementById("longDescriprion").innerHTML = jobs[0].longdesc;
                var keyWords = document.getElementById("keyWordArea");
                var table = document.createElement("table");
                keyWords.appendChild(table);
                table.className = "tableKeywords";
                // table.style="width:100%";
                var thisRow = document.createElement("tr");
                table.appendChild(thisRow);

                for (i = 0; i < jobs[0].keywords.length; ++i) {
                    if (i % 3 === 0) {
                        var newRow = document.createElement("tr");
                        thisRow = newRow;
                        table.appendChild(thisRow);
                        var t = document.createElement("td");
                        t.innerHTML = jobs[0].keywords[i];
                        thisRow.appendChild(t);
                    } else {
                        var td = document.createElement("td");
                        td.innerHTML = jobs[0].keywords[i];
                        thisRow.appendChild(td);
                    }
                }
            }
        };
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();

    }

    function changeSpecificJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jobs = JSON.parse(this.response);
                loadButtonsAndEventExJob();
                document.getElementById("Title").value = jobs[0].tile;
                document.getElementById("shortDescription").value = jobs[0].shortdesc;
                document.getElementById("longDescription").value = jobs[0].longdesc;
               

                saveBtnExJob.addEventListener("click",(e)=>updateExJobInfo(jobs[0]._id,jobs[0]));
                for (i = 0; i < jobs[0].keywords.length; i++) {
                    document.getElementById(jobs[0].keywords[i]).checked = true;
                }
            }
        };
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }


    function workAnnouncements(num, jobb) {

        for (var i = 0; i < num; i++) {

            var outerDiv = document.createElement("div");
            outerDiv.className = "jobsSmall";

            var top = document.createElement("div"); //topbar
            top.className = "jobTop";

            var logo = document.createElement("img");//ladda in logga

            logo.className = "jobLogo";
            var header = document.createElement("div");//rubrik
            header.className = "jobHeader";


            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");

            let readBtn = document.createElement("button");
            readBtn.innerHTML = "Visa annons";
            readBtn.id = jobb[i]._id;
            let interestBtn = document.createElement("button");
            interestBtn.innerHTML = "Intresseanmälningar";
            let changeBtn = document.createElement("button");
            changeBtn.innerHTML = "Redigera";
            changeBtn.className = ("floatRight");

            workAnnouncement.appendChild(outerDiv);
            workAnnouncement.appendChild(document.createElement("br"));
            outerDiv.appendChild(top);

            outerDiv.appendChild(readBtn);
            outerDiv.appendChild(interestBtn);
            outerDiv.appendChild(changeBtn);

            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);

            logo.src = jobb[i].logoURL; //ladda in logga
            newh1.innerHTML = jobb[i].tile;//ladda in rubrik    

            readBtn.addEventListener("click", (e) => loadShowExJob(readBtn.id));
            changeBtn.addEventListener("click", (e) => loadChangeExJob(readBtn.id));
        }
    }

    function loadShowExJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                document.getElementById("closeExJob").addEventListener("click", loadMyOffers);
                getSpecificJob(jobId);
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/showExJob.html', true);
        xhttp.send();
    }

    //Load Buttons and Events
    //Startsidan
 
    //ExJobb

    function loadNewExJob() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                AddEventListerersButtons(2);
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/newExJob.html', true);
        xhttp.send();
    }
    function loadButtonsExJob() {
        var ListOfKeyWords = [];
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
        abortBtn = document.getElementById("AbortExJob");
        keyBtn = document.getElementById("KeyWordBtn");
        saveBtn = document.getElementById("SaveExJob");
    }

    function loadButtonEventsExJob() {
        progBtn.addEventListener("click", (e) => showHideDataForExJob(prog));
        areaBtn.addEventListener("click", (e) => showHideDataForExJob(area));
        typeBtn.addEventListener("click", (e) => showHideDataForExJob(types));
        operationSystemBtn.addEventListener("click", (e) => showHideDataForExJob(operationSystems));
        databaseBtn.addEventListener("click", (e) => showHideDataForExJob(databases));
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
        saveBtn.addEventListener("click", (e) => saveNewExjob(e));
        abortBtn.addEventListener("click", (e) => loadMyInfo());
        keyBtn.addEventListener("mouseover", (e) => hoverNewExJob(keyBtn, 1));
        keyBtn.addEventListener("mouseleave", (e) => hoverNewExJob(keyBtn, 0));
    }

    function saveNewExjob() {
        let ListOfKeyWords = [];
        let title = document.getElementById("Headline").value;
        let shortde = document.getElementById("shortSubject").value;
        let longde = document.getElementById("Subject").value;
        console.log(title + shortde + longde);
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (i = 0; i < fullListToCheck.length; i++) {
            if (fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }

        for (a = 0; a < ListOfKeyWords.length; a++) {
            console.log(ListOfKeyWords[a]);
        }
        let savedJob = new exJob(title, shortde, longde, ListOfKeyWords);
        console.log(savedJob);
        var savedJob2 = JSON.stringify(savedJob);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // interestArea.innerHTML = this.response;
                console.log("Exjob sent to app.js")
                if ("true") {
                    loadMyOffers();
                }
            }
        };
        xhttp.open("POST", "addJobToDB?exJobb=" + savedJob2, true);
        xhttp.send();

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
        else {
            if (show === 0) {
                element.style.width = "100%";

            }
            else {
                element.style.width = "101%";
            }
        }
    }

    function showHideDataForExJob(elements) {
        console.log("Inside ShowHide-function");
        if (elements.className === "content") {
            elements.className = "contentShow";
        }
        else {
            elements.className = "content";
        }

    }



    //Offers
   function loadMyOffers() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                getJobsFromDB();
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/myOffers.html', true);
        xhttp.send();
    }


    function loadChangeExJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                changeSpecificJob(jobId);
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/changeExJob.html', true);
        xhttp.send();
    }



    //Change Profile
    function loadMyProfile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                var saveBtn = document.getElementById('saveBtn');
                saveBtn.addEventListener("click", changeInfo);
                var cancelBtn = document.getElementById('cancelBtn');
                cancelBtn.addEventListener("click", loadMyInfo);
                fillEditProfile();
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/myCompanyPages.html', true);
        xhttp.send();
    }

    function changeInfo() {
        var cname = document.getElementById("c_Name").value;
        var cuname = document.getElementById("c_Uname").value;
        var cAboutUs = document.getElementById("about_Us").value;
        var psw = document.getElementById("c_Psw").value;
        var ccity = document.getElementById("c_City").value;
        var cemail = document.getElementById("c_Email").value;
        var caddress = document.getElementById("c_Address").value;
        var cweb = document.getElementById("c_WebP").value;
        var clogo = document.getElementById("c_Logo").value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                if ("true") {
                    loadMyInfo();
                }
            }
        };
        xhttp.open("POST", "changeCompanyInfo?cname=" + cname + "&psw=" + psw + "&cuname=" + cuname + "&caddress=" + caddress + "&cemail=" + cemail + "&ccity=" + ccity + "&cweb=" + cweb + "&clogo=" + clogo + "&cAboutUs=" + cAboutUs, true);
        xhttp.send();
    }

    function fillEditProfile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.companyName,
                    address: obj.companyAddress,
                    city: obj.companyCity,
                    email: obj.companyEmail,
                    web: obj.website,
                    logo: obj.logoURL,
                    uname: obj.userName,
                    about: obj.about
                }
                fillEditData(user);
            }
        };
        xhttp.open("GET", "userDataFromDBCompany", true)
        xhttp.send();
    }

    function fillEditData(user) {
        document.getElementById("c_Logo").value += user.logo;
        document.getElementById("c_Name").value += user.name;
        document.getElementById("c_Address").value += user.address;
        document.getElementById("c_City").value += user.city;
        document.getElementById("c_Email").value += user.email;
        document.getElementById("c_WebP").value += user.web;
        document.getElementById("c_Uname").value += user.uname;
        document.getElementById("about_Us").value += user.about;

    }

    //Start Company.html onLoad
    AddEventListerersButtons(1);
    function getJobsFromDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                console.log("JOBB HÄMTADE");
                var jobs = JSON.parse(this.response);
                workAnnouncements(jobs.length, jobs);

            }
        };
        //Skriv en funktion som bara tar ut företagets jobbannonser
        xhttp.open("GET", "getCompanyJobsFromDB", true);
        xhttp.send();
    }

    function loadMyInfo() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                listUserDataFromDB();
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/myCInfo.html', true);
        xhttp.send();
    }

    function listUserDataFromDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.companyName,
                    address: obj.companyAddress,
                    city: obj.companyCity,
                    email: obj.companyEmail,
                    web: obj.website,
                    logo: obj.logoURL,
                    about: obj.about
                }
                SetListedData(user);
            }
        };
        xhttp.open("GET", "userDataFromDBCompany", true)
        xhttp.send();
    }

    function SetListedData(user) {
        document.getElementById("clogo").innerHTML = "<img src=" + user.logo + " height=\"70\" width=\"70\" >";
        document.getElementById("cname").innerHTML = "<h1>" + user.name + "</h1>";
        document.getElementById("caddress").innerHTML = "<p> Adress: " + user.address + "</p>";
        document.getElementById("ccity").innerHTML = "<p> Ort: " + user.city + "</p>";
        document.getElementById("cemail").innerHTML = "<p>Email: " + user.email + "</p>";
        document.getElementById("cweb").innerHTML = "<p>Hemsida: <a href=" + user.web + ">" + user.web + "</a> </p>";
        document.getElementById("About_Us").innerHTML = user.about;
    }


    //Log out
    function logOut() {
        console.log("loggaut");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if ("true") {
                    window.location.replace("index.html");
                }
            }
        };
        xhttp.open("GET", "logout", true);
        xhttp.send();
    }  
    
    //Other Functions
    function ajaxRequest(type, route, responseHandler){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                responseHandler(this.response);
            }
        };
        xhttp.open(type, route, true);
        xhttp.send();
    }
    loadMyInfo();

}
//#endregions

