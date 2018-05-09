window.onload = function () {

    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn");
    var lookAtJobBtn = document.getElementById("lookAtJobBtn");
    var logOutStudentBtn = document.getElementById("logOutStudentBtn");

    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadMyProfile);
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs);
    mySInfoBtn.addEventListener("click", loadMyInfo);
    lookAtJobBtn.addEventListener("click", loadCatalog);
    logOutStudentBtn.addEventListener("click", logOut);
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

    function loadMyInfo() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;


                listUserDataFromDB(); //genererar användarinfo
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/mySInfo.html', true);
        xhttp.send();
    }

    function loadMyInterests() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                getInterestJob();
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/mySJobs.html', true);
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
        xhttp.open("GET", "loadFileStudent?p=" + '/mySProfile.html', true);
        xhttp.send();
    }

    function loadMyRecomendedJobs() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/myRecomendedJobs.html', true);
        xhttp.send();
    }
    function fillEditProfile() {
        console.log("fda");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                //removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(this.response);
                var user = {
                    id: obj[0]._id,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    pw: obj[0].password,
                    uname: obj[0].uname,
                    city: obj[0].city,
                    keywords: obj[0].keywords
                }
                document.getElementById("sFName").value += user.name;
                document.getElementById("sLName").value += user.ulname;
                document.getElementById("sEdu").value += user.edu;
                document.getElementById("city").value += user.city;
                document.getElementById("sUname").value += user.uname;
                document.getElementById("sEmail").value += user.email;
                document.getElementById("sPsw").value += user.pw;

                for (let i = 0; i < obj[0].keywords.length; i++) {
                    document.getElementById(obj[0].keywords[i]).checked = true;
                }

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
                // removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(this.response);
                console.log(obj[0]._id);
                var user = {
                    id: obj[0]._id,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    pw: obj[0].password
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


    function loadButtonsStudentprofile() {
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
        saveBtnStudent = document.getElementById("saveBtnStudent");
        cancelBtnStudent = document.getElementById("cancelBtnStudent");
    }
    function loadButtonEventsStudentprofile() {
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
        saveBtnStudent.addEventListener("click", (e) => saveProfile());
        cancelBtnStudent.addEventListener("click", (e) => loadMyInfo());
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
        else {
            if (show === 0) {
                element.style.width = "275pt";

            }
            else {
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
        let ListOfKeyWords = [];
        console.log("Starting to save");
        var userObj = {
            name: document.getElementById("sFName").value,
            lastname: document.getElementById("sLName").value,
            city: document.getElementById("city").value,
            ueducation: document.getElementById("sEdu").value,
            uemail: document.getElementById("sEmail").value,
            uname: document.getElementById("sUname").value,
            psw: document.getElementById("sPsw").value,
            keywords: []
        }
        var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
        for (i = 0; i < fullListToCheck.length; i++) {
            if (fullListToCheck[i].checked)
                ListOfKeyWords.push(fullListToCheck[i].id);
        }

        for (a = 0; a < ListOfKeyWords.length; a++) {
            console.log(ListOfKeyWords[a]);
        }
        console.log(userObj);
        userObj.keywords = ListOfKeyWords;
        userString = JSON.stringify(userObj);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "true") {
                    loadMyInfo();
                }
            }
        };
        xhttp.open("POST", "changeStudentInfo?userObj=" + userString, true);
        xhttp.send();
    }
    loadMyInfo();



    function sendInterest(jobId) {
        //makeInterestBtn.removeEventListener("click", (e) => sendInterest(jobId));
        console.log("Intresseanmälan");
        var message = document.getElementById("Interestmessage").value;
        console.log(message);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "true") {
                    console.log("sent intresseanmälan sucess");
                    loadMyInterests();
                }
            }
        };
        xhttp.open("POST", "addInterest?jobID=" + jobId + "&message=" + message, true);
        xhttp.send();
    }

    function showMoreInfoBtn(jobId, val) {
        console.log(val);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                document.getElementById("closeExJob").addEventListener("click", loadCatalog);
                getSpecificJob(jobId);

                makeInterestBtn = document.getElementById("makeInterestSubmit");
                makeInterestBtn.addEventListener("click", (e) => sendInterest(jobId));
                if (val === '0') {
                    document.getElementById("interestDiv").style.display = "none";
                }
                else {
                    document.getElementById("interestDiv").style.display = "block";
                }

            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/showExJob.html', true);
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
                console.log(jobs[0].logoURL)
                document.getElementById("rubrik").innerHTML = jobs[0].tile;
                console.log(jobs[0].tile)
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
        //Skriv en funktion som bara tar ut företagets jobbannonser
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }

    function loadCatalog() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                document.getElementById("SCatalog").style.display = "block";
                getJobsFromDB();
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/StudentCatalog.html', true);
        xhttp.send();
    }

    function getJobsFromDB() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                console.log("JOBB HÄMTADE");
                var jobs = JSON.parse(this.response);
                filterAlreadySearchedJobs(jobs);
                //workAnnouncements(jobs.length, jobs);
            }
        };
        xhttp.open("GET", "getJobsFromDB", true);
        xhttp.send();
    }
    function filterAlreadySearchedJobs(jobs) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Filtrerar redan sökta jobb");
                var obj = JSON.parse(this.response);
                let newJobList = jobs;
                for (let j = 0; j < obj[0].joblist.length; ++j) {
                    for (let i = 0; i < jobs.length; ++i) {
                        if(jobs[i]._id==obj[0].joblist[j].jobID){
                            newJobList=newJobList.filter(job=>job !=jobs[i]);
                        }
                    }
                }
                workAnnouncements(newJobList.length, newJobList);
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true);
        xhttp.send();
    }

    function getInterestJob() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("No intresseanmälan");
                    document.getElementById("msg").innerHTML = "Du har inga intresseanmälningar."
                } else {
                    let jobb = JSON.parse(this.response);
                    console.log(jobb);
                    workInterests(jobb.length, jobb);
                }
            }
        };
        xhttp.open("GET", "getInterestJob", true);
        xhttp.send();
    }
    function removeInterest(removeID) {
        console.log("Remove click");
        let jobID = removeID.split(",");
        jobIDstr = jobID[0];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "true") {
                    loadMyInterests();
                }
            };
        }
        xhttp.open("GET", "removeInterest?jobID=" + jobIDstr, true);
        xhttp.send();
    }


    function workInterests(num, jobbig) {
        workAnnouncement.innerHTML = "";
        //console.log(jobb);
        for (var i = 0; i < num; i++) {
            var jobb = jobbig[i].jobs;
            var message = jobbig[i].message;
            console.log(jobb);

            var outerDiv = document.createElement("div");
            outerDiv.className = "jobsSmall";

            var top = document.createElement("div"); //topbar
            top.className = "jobTop";

            var logo = document.createElement("img");//ladda in logga

            logo.className = "jobLogo";
            var header = document.createElement("div");//rubrik
            header.className = "jobHeader";

            var info = document.createElement("div");
            info.className = "jobInfo";

            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");

            let readBtn = document.createElement("button");
            readBtn.innerHTML = "Visa annons";
            readBtn.id = jobb[0]._id;

            let removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Ta bort intresseanmälan";
            removeBtn.id = jobb[0]._id + ",remove";
            removeBtn.className = "floatRight";

            workAnnouncement.appendChild(outerDiv);
            workAnnouncement.appendChild(document.createElement("br"));
            outerDiv.appendChild(top);

            var myMsg = document.createElement("b");
            myMsg.className = "jobInfo";
            myMsg.innerHTML = "Mitt meddelande: ";
            outerDiv.appendChild(myMsg);

            //outerDiv.appendChild(document.createElement("hr"));
            outerDiv.appendChild(info);
            outerDiv.appendChild(document.createElement("br"));
            outerDiv.appendChild(document.createElement("br"));
            outerDiv.appendChild(readBtn);
            outerDiv.appendChild(removeBtn);

            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);

            logo.src = jobb[0].logoURL; //ladda in logga
            newh1.innerHTML = jobb[0].tile;//ladda in rubrik    
            info.innerHTML = message;//ladda in beskrivning
            readBtn.addEventListener("click", (e) => showMoreInfoBtn(readBtn.id));
            removeBtn.addEventListener("click", (e) => removeInterest(removeBtn.id));
            let show = '0';
            readBtn.addEventListener("click", (e) => showMoreInfoBtn(readBtn.id, show));
        }
    }


    function workAnnouncements(num, jobb) {
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

            var info = document.createElement("div");
            info.className = "jobInfo";

            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");

            let readBtn = document.createElement("button");
            readBtn.innerHTML = "Visa annons";
            readBtn.id = jobb[i]._id;

            workAnnouncement.appendChild(outerDiv);
            workAnnouncement.appendChild(document.createElement("br"));
            outerDiv.appendChild(top);
            outerDiv.appendChild(info);
            outerDiv.appendChild(readBtn);


            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);


            logo.src = jobb[i].logoURL; //ladda in logga
            newh1.innerHTML = jobb[i].tile;//ladda in rubrik    
            info.innerHTML = jobb[i].shortdesc;//ladda in beskrivning
            let show = '1';
            readBtn.addEventListener("click", (e) => showMoreInfoBtn(readBtn.id, show));
        }
    }
}