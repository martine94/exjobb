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
            this.studentlist = [];
        }
    }
    var currentPage = "";
    var globalObjId;
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
    var saveBtnExJob;
    var cancelBtnExJob;
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
        var ListOfKeyWords = [];
        saveBtnExJob = document.getElementById("saveBtn");
        cancelBtnExJob = document.getElementById("cancelBtn");
        cancelBtnExJob.addEventListener("click", loadMyOffers);
    }
    function updateExJobInfo(jobId, exjobb) {
        var exjobb2 = {
            logoURL: exjobb.logoURL,
            tile: document.getElementById("Title").value,
            shortdesc: document.getElementById("shortDescription").value,
            longdesc: document.getElementById("longDescription").value,
            keywords: exjobb.keywords,
            companyID: exjobb.companyID,
            companyName: exjobb.companyName,
            website: exjobb.website
        }
        let ListOfKeyWords = [];
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (let i = 0; i < fullListToCheck.length; i++) {
            if (fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }
        exjobb2.keywords = ListOfKeyWords;
        let stringExjobb = JSON.stringify(exjobb2);
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

    function getspecificIntresents(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                let num = 0;
                var jobs = JSON.parse(this.response);
                for (let i = 0; i < jobs[0].studentlist.length; i++) {
                    num++;
                }
                console.log(jobs[0].studentlist[0]);
                getInterestAnnouncement(jobs[0].studentlist, num, jobId);
                // table.style="width:100%";
            }
        };
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }

    function getSpecificJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                console.log("JOBB HÄMTADE");
                var jobs = JSON.parse(this.response);
                console.log(jobs);
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

                for (let i = 0; i < jobs[0].keywords.length; ++i) {
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

    function changeSpecificJob(jobId, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jobs = JSON.parse(this.response);
                loadButtonsAndEventExJob();
                document.getElementById("Title").value = jobs[0].tile;
                document.getElementById("shortDescription").value = jobs[0].shortdesc;
                document.getElementById("longDescription").value = jobs[0].longdesc;


                saveBtnExJob.addEventListener("click", (e) => updateExJobInfo(jobs[0]._id, jobs[0]));
                for (let i = 0; i < jobs[0].keywords.length; i++) {
                    console.log(jobs[0].keywords[i]);
                    document.getElementById(jobs[0].keywords[i]).checked = true;
                }
                callback();
            }
        };
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }


    function workAnnouncements(num, jobb) {
        var loadingImage = document.getElementById("loadImg");
        loadingImage.style.display = 'none';
        workAnnouncement.innerHTML = "";
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

            outerDiv.appendChild(document.createElement("br"));
            outerDiv.appendChild(document.createElement("br"));

            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);

            logo.src = jobb[i].logoURL; //ladda in logga
            newh1.innerHTML = jobb[i].tile;//ladda in rubrik    
            readBtn.addEventListener("click", (e) => loadShowExJob(readBtn.id));
            readBtn.classList.add("btn1");
            changeBtn.addEventListener("click", (e) => loadChangeExJob(readBtn.id));
            changeBtn.classList.add("btn1");
            interestBtn.addEventListener("click", (e) => loadInterests(readBtn.id));
            interestBtn.classList.add("btn1");

        }
    }
    function SetCurrentPage(currentPageBtn) {
        if (currentPage === "") {
            currentPage = currentPageBtn;
        }
        else {
            currentPage.classList.remove('bColorDarkBlue');
            currentPage.classList.add('bColorBlue');
        }
        currentPage = currentPageBtn;
        currentPageBtn.classList.remove('bColorBlue');
        currentPageBtn.classList.add('bColorDarkBlue');

    }
    function removeExjob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //interestArea.innerHTML = this.response;
                if (this.response === "true") {
                    loadMyOffers();
                }
            }
        };
        xhttp.open("GET", "removeExjob?jobID=" + jobId, true);
        xhttp.send();
    }

    function loadShowExJob(jobId) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                let showIBtn = document.getElementById("showintressents");
                showIBtn.addEventListener("click", (e) => loadInterests(jobId));
                document.getElementById("closeExJob").addEventListener("click", loadMyOffers);
                document.getElementById("changeJobBtn").addEventListener("click", (e) => loadChangeExJob(jobId));
                document.getElementById("removeExJobbBtn").addEventListener("click", (e) => removeExjob(jobId));

                getSpecificJob(jobId);
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/showExJob.html', true);
        xhttp.send();
    }

    function loadInterests(objId) {
        globalObjId = objId;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                let page = document.getElementById("Interests")
                let loadingscreen = document.createElement("img");
                loadingscreen.src = "LoadingImg.svg";
                loadingscreen.classList.add("loadingImg");
                loadingscreen.id = "loadingScreen";
                page.appendChild(loadingscreen);
                getspecificIntresents(objId);
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/CExJobInterests.html', true);
        xhttp.send();
    }

    function getInterestAnnouncement(studentList, num, jobId) {
        var interests = document.getElementById("Interests");
        let xhttp = new XMLHttpRequest();
        var objList = [];

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("loadingScreen").style.display = "none";
                objList = this.response;
                console.log("**JobId***");
                console.log(objList);
                loadJob(objList, studentList, num, jobId);
            }

        }
        // JSON.stringify(studentList)
        //var ob = new Object(JSON.stringify(studentList));
        //console.log(studentList);
        xhttp.open("GET", "/getSpecPersons?num=" + num + "&studentList=" + JSON.stringify(studentList), true);
        xhttp.send();
    }
    function loadJob(objList, studentList, num, jobId) {
        var xhttp = new XMLHttpRequest();
        var job;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("loadingScreen").style.display = "none";
                job = JSON.parse(this.response)[0].tile;
                console.log("--this.response--");
                console.log(job);
                console.log("**JobId***");
                console.log(objList);
                createstuff(objList, studentList, num, job);
            };
        }
        xhttp.open("GET", "/getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }

    function createstuff(objList, message, num, jobId) {
        var interests = document.getElementById("Interests");
        var number = 1;
        let pdfObject;
        objList = JSON.parse(objList);
        let headderLineDiv = document.createElement("div");
        //headderLineDiv.className = "bColorBlue";
        headderLineDiv.innerHTML = jobId;
        headderLineDiv.style.textAlign = "center";
        headderLineDiv.style.fontSize = "2em";
        let peopleSearched = document.createElement("div");
        //peopleSearched.className= "bColorBlue";
        peopleSearched.innerHTML = "Sökanden:"
        interests.appendChild(headderLineDiv);
        interests.appendChild(document.createElement("br"));
        interests.appendChild(document.createElement("br"));
        interests.appendChild(peopleSearched);
        interests.appendChild(document.createElement("br"));
        interests.appendChild(document.createElement("br"));
        for (let i = 0; i < num; i++) {
            //console.log(objList[i]);
            if (objList[i].cv) {
                pdfObject = objList[i].cv.replace(/ /g, '+');
            }
            //console.log(pdfObject);
            let personDiv = document.createElement("div");
            personDiv.style.borderRadius = "3%";
            personDiv.style.boxShadow = "0.2em 0.2em 0.2em 0.2em #999";
            personDiv.style.borderColor = "lightblue";
            personDiv.style.borderLeft = "0.1em";
            personDiv.style.color = "black";
            personDiv.appendChild(document.createElement("br"));
            personDiv.innerHTML = "Person " + number;
            let row = document.createElement("hr");
            row.style.color = "white";
            personDiv.appendChild(row);
            personDiv.appendChild(document.createElement("br"));
            let divInfo = document.createElement("div");
            let shortDescript = document.createElement("p");
            shortDescript.style.outlineColor = "brown";
            shortDescript.innerHTML = "Kort meddelande: ";
            divInfo.appendChild(shortDescript);
            personDiv.appendChild(divInfo);

            personDiv.className = "jobsSmall";
            let emailDiv = document.createElement("div");
            console.log("UEMAIL");
            console.log(message);
            emailDiv.innerHTML = objList[i].uemail;
            let txtArea = document.createElement("div");
            txtArea.style.backgroundColor = "white";
            txtArea.style.color = "black";
            txtArea.style.border = "solid 0.1em";
            txtArea.style.borderColor = "lightblue";
            let msg = document.createElement("p");
            for (let j = 0; j < num; j++) {
                if (objList[i]._id === message[j].studentID) {
                    msg.innerHTML = message[j].message;
                }
            }
            let strEmail = document.createElement("p");
            strEmail.innerHTML = "Email:";
            txtArea.appendChild(msg);
            txtArea.appendChild(document.createElement("br"));
            txtArea.className = "jobInfo";
            txtArea.style.padding = "1%";
            let CVbtn = document.createElement("button");
            CVbtn.className = "bColorBlue mediumBtn floatRight darkerBlueOnHov";
            if (objList[i].cv) {
                CVbtn.addEventListener("click", (e) => loadCV(pdfObject));
                CVbtn.innerHTML = "CV";
            }
            else {
                CVbtn.innerHTML = "CV saknas";
                CVbtn.style.backgroundColor = "red";
            }
            personDiv.appendChild(txtArea);
            personDiv.appendChild(document.createElement("br"));
            personDiv.appendChild(strEmail);
            personDiv.appendChild(emailDiv);
            personDiv.appendChild(document.createElement("br"));
            personDiv.appendChild(CVbtn);
            personDiv.appendChild(document.createElement("br"));
            personDiv.appendChild(document.createElement("br"));
            interests.appendChild(personDiv);
            interests.appendChild(document.createElement("br"));
            number++;
        }
        let backBtn = document.getElementById("BackBtn");
        backBtn.addEventListener("click", (e) => loadMyOffers());
    }

    function loadCV(pdfObj) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                var pdfSpace = document.getElementById("pdfSpace");
                pdfSpace.data = pdfObj.replace(/ /g, '+');
                var backbtn = document.getElementById("bacBtn");
                backbtn.addEventListener("click", (e) => loadInterests(globalObjId));
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/showCv.html', true);
        xhttp.send();

    }

    //Load Buttons and Events
    //Startsidan

    //ExJobb
    function loadKeywords(callback) {
        var keyDIV = document.getElementById("keywordsDIV");
        keyDIV.innerHTML = "";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let keywords2 = JSON.parse(this.response);
                var keyArray = [];
                for (var key in keywords2[0]) {
                    if (keywords2[0].hasOwnProperty(key)) {
                        if (key != "_id") {
                            keyArray.push(key);
                        }
                    }
                }
                for (let i = 0; i < keyArray.length; ++i) {
                    let overDiv = document.createElement("div");
                    let btn = document.createElement("button");
                    btn.classList.add("keywordBtn");
                    btn.innerHTML = keyArray[i];
                    overDiv.appendChild(btn);
                    var kwInArray = keywords2[0][keyArray[i]];
                    let underDiv = document.createElement("div");
                    underDiv.className = "content";
                    btn.addEventListener("click", (e) => showUnderDiv(keyArray[i]));
                    underDiv.id = keyArray[i];
                    underDiv.style.display = 'none';
                    for (let j = 0; j < kwInArray.length; ++j) {
                        let checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.classList.add("ChekedKeyWord");
                        checkbox.id = kwInArray[j];
                        let label = document.createElement("label");
                        label.innerHTML = kwInArray[j];
                        let breakp = document.createElement("br");
                        underDiv.appendChild(checkbox);
                        underDiv.appendChild(label);
                        underDiv.appendChild(breakp);
                    }
                    overDiv.appendChild(underDiv);
                    keyDIV.appendChild(overDiv);
                }
                callback();
            }

        };
        xhttp.open("GET", "keywords", true);
        xhttp.send();
    }
    function showUnderDiv(divID) {
        let underDiv = document.getElementById(divID);
        if (underDiv.style.display == 'none') {
            underDiv.style.display = 'block';
        } else {
            underDiv.style.display = 'none';
        }
    }

    function loadNewExJob() {
        SetCurrentPage(newExJobBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                AddEventListerersButtons(2);
                loadKeywords(function () { });
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/newExJob.html', true);
        xhttp.send();
    }
    function loadButtonsExJob() {
        var ListOfKeyWords = [];
        abortBtn = document.getElementById("AbortExJob");
        //keyBtn = document.getElementById("KeyWordBtn");
        saveBtn = document.getElementById("SaveExJob");
    }

    function loadButtonEventsExJob() {

        saveBtn.addEventListener("click", (e) => saveNewExjob(e));
        abortBtn.addEventListener("click", (e) => loadMyInfo());

    }

    function saveNewExjob() {
        let ListOfKeyWords = [];
        let title = document.getElementById("Headline").value;
        let shortde = document.getElementById("shortSubject").value;
        let longde = document.getElementById("Subject").value;
        console.log(title + shortde + longde);
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (let i = 0; i < fullListToCheck.length; i++) {
            if (fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }

        for (let a = 0; a < ListOfKeyWords.length; a++) {
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
        if (elements.classList.contains("content"))
            elements.className = "contentShow";
        else
            elements.className = "content";
    }



    //Offers
    function loadMyOffers() {
        SetCurrentPage(myOffersBtn);
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
                loadKeywords(function () {
                    changeSpecificJob(jobId, function () {
                    });
                });
            }
        };
        xhttp.open("GET", "loadFileCompany?p=" + '/changeExJob.html', true);
        xhttp.send();
    }



    //Change Profile
    function loadMyProfile() {
        SetCurrentPage(myProfileBtn);

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
        SetCurrentPage(myInfoBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                interestArea.innerHTML = this.response;
                let page = document.getElementById("menu-page-content");
                let loadingscreen = document.createElement("img");
                loadingscreen.src = "LoadingImg.svg";
                loadingscreen.classList.add("loadingImg");
                loadingscreen.id = "loadingScreen";
                page.appendChild(loadingscreen);
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
                //console.log(this.responseText);
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
        var userInfoDiv = document.getElementById("profileCInfo");
        userInfoDiv.innerHTML = "";
        let outerDiv = document.createElement("div");
        let infoDiv = document.createElement("div");
        let name = document.createElement("h2");
        let about = document.createElement("p");
        let email = document.createElement("p");
        let city = document.createElement("p");
        let address = document.createElement("p");
        let webpage = document.createElement("a");
        let logo = document.createElement("img");
        let logoDiv = document.createElement("div");
        let aboutDiv = document.createElement("div");
        let contactInfoDiv = document.createElement("div");
        logo.src = user.logo;
        name.innerHTML = user.name;
        about.innerHTML = user.about;
        email.innerHTML = user.email;
        city.innerHTML = user.city;
        webpage.innerHTML = user.web;
        webpage.href = user.web;
        address.innerHTML = user.address;
        logoDiv.appendChild(logo);
        aboutDiv.appendChild(about);
        outerDiv.appendChild(logoDiv);
        outerDiv.appendChild(name);
        outerDiv.appendChild(aboutDiv);
        userInfoDiv.appendChild(outerDiv);
        contactInfoDiv.appendChild(address);
        contactInfoDiv.appendChild(city);
        contactInfoDiv.appendChild(email);
        contactInfoDiv.appendChild(webpage);
        infoDiv.appendChild(contactInfoDiv);
        userInfoDiv.appendChild(infoDiv);
        contactInfoDiv.classList.add("contactInfoDiv");
        aboutDiv.classList.add("aboutCompanyDiv");
        logoDiv.classList.add("logoDiv");
        outerDiv.classList.add("sInfoOuterDiv");
        infoDiv.classList.add("sInfoInnerDiv");
        document.getElementById("loadingScreen").style.display = "none";

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

    loadMyInfo();

}
//#endregions

