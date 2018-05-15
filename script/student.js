window.onload = function () {
    var currentPage="";
    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn");
    var lookAtJobBtn = document.getElementById("lookAtJobBtn");
    var logOutStudentBtn = document.getElementById("logOutStudentBtn");
    var searchInput;
    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadMyProfile);
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs);
    mySInfoBtn.addEventListener("click", loadMyInfo);
    lookAtJobBtn.addEventListener("click", loadCatalog);
    logOutStudentBtn.addEventListener("click", logOut);
    
    //#endregions


    //Buttons, divs, inputs and an array for newExJob.html
   
    var work_Announcement;
    var cvData;
    var UploadOrSaved = "sparad";
    //#region functions

    function logOut() {
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
    function SetCurrentPage(currentPageBtn){
        if(currentPage===""){
            currentPage=currentPageBtn;
        }
        else{
            currentPage.classList.remove('bColorDarkBlue');
            currentPage.classList.add('bColorBlue');
        }
        currentPage=currentPageBtn;
        currentPageBtn.classList.remove('bColorBlue');
        currentPageBtn.classList.add('bColorDarkBlue');

    }
    function loadMyInfo() {
        SetCurrentPage(mySInfoBtn);
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
        SetCurrentPage(interestsBtn);
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
        SetCurrentPage(mySPagesBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                loadKeywords(function(){
                    fillEditProfile(function(){
                    });
                });
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/mySProfile.html', true);
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
    function loadKeywords(callback) {
        var keyDIV = document.getElementById("keywordsDIV");
        keyDIV.innerHTML="";
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

    function loadMyRecomendedJobs() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                getMyRecommendedJobs()
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/myRecomendedJobs.html', true);
        xhttp.send();
    }

    function getMyRecommendedJobs() {
        SetCurrentPage(recomendedJobBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("menu-page-content").innerHTML = this.response;
                if (this.response.length > 0) {
                    let jobList = JSON.parse(this.response);
                    calculateJobRecommendation(jobList);
                }
            }
        };
        xhttp.open("GET", "getJobsFromDB", true);
        xhttp.send();
    }

    function calculateJobRecommendation(jobList) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("menu-page-content").innerHTML = this.response;
                if (this.response.length > 0) {
                    let user = JSON.parse(this.response);
                    let recommendationArray = [{}];
                    var matchCount = 0;
                    for (let i = 0; i < jobList.length; ++i) {
                        matchCount = 0;
                        for (let j = 0; j < jobList[i].keywords.length; ++j) {
                            if (user[0].keywords.includes(jobList[i].keywords[j])) {
                                matchCount++;
                            }
                        }
                        recommendationArray.push({ job: jobList[i], count: matchCount })
                    }
                    recommendationArray.sort(function (a, b) {
                        return b.count - a.count;
                    });
                    let recToSend = [];
                    for (let i = 0; i < recommendationArray.length; ++i) {
                        if (recommendationArray[i].count > 0) {
                            recToSend.push(recommendationArray[i].job);
                        }
                    }
                    filterAlreadySearchedJobs(recToSend);
                }
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true);
        xhttp.send();
    }
    
    function fillEditProfile(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (res) {
            if (this.readyState == 4 && this.status == 200) {
                //removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(this.response);
                var user = {
                    id: obj[0]._id,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    city: obj[0].city, //for later...
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    uname: obj[0].uname,
                    pw: obj[0].password,
                    ucv: obj[0].cv
                }
                document.getElementById("sFName").value += user.name;
                document.getElementById("sLName").value += user.ulname;
                document.getElementById("sEdu").value += user.edu;
                document.getElementById("city").value += user.city;
                document.getElementById("sUname").value += user.uname;
                document.getElementById("sEmail").value += user.email;
                document.getElementById("sPsw").value += user.pw;


                if (typeof user.ucv !== 'undefined' && user.ucv) {
                    document.getElementById("pdfStatus").innerHTML = "CV upladdat";
                    cvData = user.ucv.replace(/ /g, '+'); //replace all whitespace with +
                }

                for (let i = 0; i < obj[0].keywords.length; i++) {
                   document.getElementById(obj[0].keywords[i]).checked = true;
                }

                loadButtonsStudentprofile();
                loadButtonEventsStudentprofile();
                callback();
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
                var user = {
                    id: obj[0]._id,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    pw: obj[0].password,
                    city:obj[0].city,
                    interestCount:obj[0].joblist.length
                }
                var userInfoDiv=document.getElementById("profileInfo");
                userInfoDiv.innerHTML="";
                let outerDiv=document.createElement("div");
                let infoDiv=document.createElement("div");
                let name=document.createElement("h2");
                let edu=document.createElement("p");
                let email=document.createElement("p");
                let city=document.createElement("p");
                let interestCount=document.createElement("p");
                let cvIcon=document.createElement("img");
                cvIcon.src="cvIcon80.png";
                cvIcon.alt="Klicka här för att se ditt CV";
                cvIcon.classList.add("floatLeft");
                interestCount.innerHTML="Intresseansökningar: "+user.interestCount;
                name.innerHTML=user.name+" "+user.ulname;
                edu.innerHTML=user.edu;
                email.innerHTML=user.email;
                city.innerHTML=user.city;
                outerDiv.appendChild(cvIcon);
                outerDiv.appendChild(name);
                outerDiv.appendChild(edu);
                userInfoDiv.appendChild(outerDiv);
                infoDiv.appendChild(email);
                infoDiv.appendChild(city);
                infoDiv.appendChild(interestCount);
                userInfoDiv.appendChild(infoDiv);

                outerDiv.classList.add("sInfoOuterDiv");
                infoDiv.classList.add("sInfoInnerDiv");
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true)
        xhttp.send();
    }

    function loadButtonsStudentprofile() {
        ListOfKeyWords = [];
        loadCvBtn = document.getElementById("pdfOpen");
        fileInpt = document.getElementById("pdfUpload");
        pdfStatus = document.getElementById("pdfStatus");

        saveBtnStudent = document.getElementById("saveBtnStudent");
        cancelBtnStudent = document.getElementById("cancelBtnStudent");
    }

    function loadButtonEventsStudentprofile() {
        saveBtnStudent.addEventListener("click", saveProfile);

        fileInpt.addEventListener("change", manageSelectedFile);
        loadCvBtn.onclick = readCvData;

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
        if (elements.classList.contains("content")) {
            elements.className = "contentShow";
        }
        else {
            elements.className = "content";
        }

        //#endregions

    }

    function manageSelectedFile() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            throw ("The file API needed is not supported in this browser!");
        }
        input = document.getElementById('pdfUpload');

        if (!input) {
            console.error("can't find input element!");
        }
        else if (!input.files) {
            console.error("this browser does not support the files property of input!");
        }
        else if (!input.files[0]) {
            console.log("no file selected");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = () => {
                //do something with the file code
                cvData = fr.result;
                console.log("sucessfully stored file");
                UploadOrSaved = "uppladdat";
                loadCvBtn.innerHTML = "Öppna " + UploadOrSaved + " cv(pdf)";
                pdfStatus.innerHTML = "Glöm inte klicka spara för att ladda upp ditt cv!";
            }
            fr.readAsDataURL(file);
        }
    }

    function readCvData() {
        if(cvData)
        {
            document.getElementById('pdfSpace').height = "1000em";
            document.getElementById('pdfSpace').data = cvData;
            console.log(cvData);
            loadCvBtn.innerHTML = "Stäng " + UploadOrSaved + " cv(pdf)";

            loadCvBtn.onclick = () => {
                document.getElementById('pdfSpace').data = "";
                document.getElementById('pdfSpace').height = "0em";
                loadCvBtn.onclick = readCvData;
                loadCvBtn.innerHTML = "Öppna " + UploadOrSaved + " cv(pdf)";
            }
        }
    }

    function saveProfile() {
        let ListOfKeyWords = [];
        //console.log("CVDATA: " + cvData);
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
        }
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

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded", "charset=utf-8");
        
        xhttp.send("&cv=" + cvData);
    }

    function sendInterest(jobId) {
        //makeInterestBtn.removeEventListener("click", (e) => sendInterest(jobId));
        var message = document.getElementById("Interestmessage").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "true") {
                    loadMyInterests();
                }
            }
        };
        xhttp.open("POST", "addInterestMessage?jobID=" + jobId + "&message=" + message, true);
        xhttp.send();
    }

    function showMoreInfoBtn(jobId, val) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                document.getElementById("closeExJob").addEventListener("click", loadCatalog);
                getSpecificJob(jobId);

                makeInterestBtn = document.getElementById("makeInterestSubmit");
                makeInterestBtn.addEventListener("click", (e) =>sendInterest(jobId));
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
                var jobs = JSON.parse(this.response);

                document.getElementById("logga").src = jobs[0].logoURL;
                document.getElementById("rubrik").innerHTML = jobs[0].tile;
                document.getElementById("shortDescriprion").innerHTML = jobs[0].shortdesc;
                document.getElementById("longDescriprion").innerHTML = jobs[0].longdesc;
                var keyWords = document.getElementById("keyWordArea");
                keyWords.innerHTML="";
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

    function eventListenerOnSearch(){
            //Search bar in student cataloge
         searchInput = document.getElementById("searchInput");
         searchInput.addEventListener("keypress", function(event) {

            if (event.keyCode == 13){
                document.getElementById("workAnnouncement").innerHTML="<img class=\"loadingImg\" id=\"loadImg\" src=\"LoadingImg.svg\" position>";
                if(searchInput.value==""){
                    loadCatalog();
                }
                //sök efter jobb
            else{
            getSeachedKeyWordJob(searchInput.value);
            }
            }
        });

    }
    function getSeachedKeyWordJob(keyw) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("option-page-content").innerHTML = this.response;
                var jobs = JSON.parse(this.response);
                if(jobs.length=== undefined ||jobs.length==0){
                    document.getElementById("workAnnouncement").innerHTML="Vi hittade inga jobb som matchade din sökning!";
                }
                else{
                filterAlreadySearchedJobs(jobs);
                }
            }
        };
        xhttp.open("GET", "getSearchedJobsFromDB?keyword="+keyw, true);
        xhttp.send();
    }

    function loadCatalog() {
        SetCurrentPage(lookAtJobBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               
                document.getElementById("menu-page-content").innerHTML = this.response;
                document.getElementById("SCatalog").style.display = "block";
                eventListenerOnSearch();
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
                var obj = JSON.parse(this.response);
                let newJobList = jobs;
                if((obj[0].joblist=== undefined || obj[0].joblist.length == 0))
                {
                    workAnnouncements(jobs.length, jobs);
                }
                else{
                for (let j = 0; j < obj[0].joblist.length; ++j) {
                    for (let i = 0; i < jobs.length; ++i) {
                        if (jobs[i]._id == obj[0].joblist[j].jobID) {
                            newJobList = newJobList.filter(job => job != jobs[i]);
                        }
                    }
                }
                if(newJobList.length==0){
                    document.getElementById("workAnnouncements").innerHTML="Vi hittade inga jobb som matchade din sökning!";
                }
                workAnnouncements(newJobList.length, newJobList);
            }
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
                    var loadingImage = document.getElementById("loadImg");
                    loadingImage.style.display = 'none';
                    document.getElementById("msg").innerHTML = "Du har inga intresseanmälningar."
                } else {
                    let jobb = JSON.parse(this.response);
                    workInterests(jobb.length, jobb);
                }
            }
        };
        xhttp.open("GET", "getStudentInterestMessages", true);
        xhttp.send();
    }

    function removeInterest(removeID) {
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
        xhttp.open("GET", "removeInterestMessage?jobID=" + jobIDstr, true);
        xhttp.send();
    }

    function workInterests(num, jobbig) {
        var loadingImage = document.getElementById("loadImg");
        loadingImage.style.display = 'none';
        workAnnouncement.innerHTML = "";
        for (var i = 0; i < num; i++) {
            var jobb = jobbig[i].jobs;
            var message = jobbig[i].message;

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
            readBtn.classList.add("btn1");

            let removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Ta bort intresseanmälan";
            removeBtn.id = jobb[0]._id + ",remove";
            removeBtn.className = "floatRight btn1";

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
        var loadingImage = document.getElementById("loadImg");
        loadingImage.style.display = 'none';
        workAnnouncement.innerHTML = "";
        if (num === 0) {
            var outerDiv = document.createElement("div");
            var newh2 = document.createElement("h2");
            var newP = document.createElement("p");
            newP.innerHTML = "Prova att ändra dina önskemål under \"Redigera Information\"";
            newh2.innerHTML = "Du har inga matchande jobb.";
            outerDiv.appendChild(newh2);
            outerDiv.appendChild(newP);
            outerDiv.className = "jobsSmall";
            workAnnouncement.appendChild(outerDiv);
        } else {
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
                readBtn.classList.add("btn1"); 

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
    
    loadMyInfo();    
}
