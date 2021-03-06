window.onload = function () {
    var currentPage = "";
    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn");
    var lookAtJobBtn = document.getElementById("lookAtJobBtn");
    var logOutStudentBtn = document.getElementById("logOutStudentBtn");
    var faqBtn = document.getElementById("FAQ");
    var searchInput;
    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadEditMyProfile);
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs);
    mySInfoBtn.addEventListener("click", loadMyInfo);
    lookAtJobBtn.addEventListener("click", loadCatalog);
    logOutStudentBtn.addEventListener("click", logOut);
    faqBtn.addEventListener("click", loadFAQ);

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
    function ajaxRequest(type, route, responseHandler) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                responseHandler(this.response);
            }
        };
        xhttp.open(type, route, true);
        xhttp.send();
    }
    function loadFAQ() {
        SetCurrentPage(faqBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                let place = "studentInlogg";
                ajaxRequest('GET', 'getFAQ?place=' + place, function (response) {
                    faq(response);
                });
            }
        };
        xhttp.open("GET", "loadFileStudent?p=" + '/faq.html', true);
        xhttp.send();
    }
    function faq(qas) {
        qas = JSON.parse(qas);
        var faqContainer = document.getElementById("FAQS");
        let h3 = document.createElement("h3");
        h3.innerHTML = "Vanliga frågor och svar:";
        faqContainer.appendChild(h3);
        for (let i = 0; i < qas.length; ++i) {
            let question = document.createElement("b");
            question.innerHTML = qas[i].question + "<br>";
            question.classList.add("pointer");

            let answer = document.createElement("p");
            let div = document.createElement("div");
            div.id = qas[i]._id;
            answer.innerHTML = qas[i].answer;
            faqContainer.appendChild(question);
            faqContainer.appendChild(div);
            div.appendChild(answer);
            question.addEventListener("click", (e) => showAnswere(div.id));
            div.classList.add("hide");
        }
    }
    function showAnswere(questionID) {
        if (document.getElementById(questionID).classList.contains("hide")) {
            document.getElementById(questionID).classList.remove("hide");
        }
        else {
            document.getElementById(questionID).classList.add("hide");
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
    function loadMyInfo() {
        SetCurrentPage(mySInfoBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                let page = document.getElementById("menu-page-content");
                let loadingscreen = document.createElement("img");
                loadingscreen.src = "LoadingImg.svg";
                loadingscreen.classList.add("loadingImg");
                loadingscreen.id = "loadingScreen";
                page.appendChild(loadingscreen);
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

    function loadEditMyProfile() {
        SetCurrentPage(mySPagesBtn);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                loadKeywords(function () {
                    fillEditProfile(function () {
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

    function loadSearchKeywords() {
        var myUL = document.getElementById("myUL");
        myUL.innerHTML = "";
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
                    var kwInArray = keywords2[0][keyArray[i]];

                    for (let j = 0; j < kwInArray.length; ++j) {

                        let li = document.createElement("li");
                        let p = document.createElement("p");
                        p.innerHTML = kwInArray[j];
                        if (p.innerHTML != "Annat") {
                            li.appendChild(p);
                            myUL.appendChild(li);
                            p.addEventListener("click", (e) => keyWordToSearchValue(p.innerHTML));
                        }
                    }
                }
            }

        };
        xhttp.open("GET", "keywords", true);
        xhttp.send();
    }

    function keyWordToSearchValue(word) {
        document.getElementById("searchInput").value = word;
        document.getElementById("searchInput").focus();
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
                var obj = JSON.parse(this.response);
                var user = {
                    id: obj[0]._id,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    city: obj[0].city, 
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    uname: obj[0].uname,
                    pw: obj[0].password,
                    ucv: obj[0].cv
                }
                document.getElementById("sFName").value = user.name;
                document.getElementById("sLName").value = user.ulname;
                document.getElementById("sEdu").value = user.edu;
                document.getElementById("city").value = user.city;
                document.getElementById("sUname").value = user.uname;
                document.getElementById("sEmail").value = user.email;
                document.getElementById("sPsw").value = user.pw;


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
                var obj = JSON.parse(this.response);
                var user = {
                    id: obj[0]._id,
                    uname: obj[0].uname,
                    name: obj[0].name,
                    ulname: obj[0].lastname,
                    edu: obj[0].ueducation,
                    email: obj[0].uemail,
                    pw: obj[0].password,
                    city: obj[0].city,
                    interestCount: obj[0].joblist.length
                }
                if (obj[0].cv != null) {
                    cvData = obj[0].cv.replace(/ /g, '+');
                }
                var userInfoDiv = document.getElementById("profileInfo");
                userInfoDiv.innerHTML = "";
                let outerDiv = document.createElement("div");
                let infoDiv = document.createElement("div");
                let uname = document.createElement("h1");
                let name = document.createElement("h2");
                let edu = document.createElement("p");
                let email = document.createElement("p");
                let city = document.createElement("p");
                let interestCount = document.createElement("p");
                let warningDiv = document.createElement("div");
                let logoDiv = document.createElement("div");
                let otherInfoDiv = document.createElement("div");
                let loadCvBtn = document.createElement("button");
                let cvIcon = document.createElement("img");
                edu.id="eduIDStudentProfile";
                warningDiv.id = "warningDiv";
                otherInfoDiv.id = "otherInfoDiv";
                loadCvBtn.id = "loadCvBtn";
                loadCvBtn.className = "bColorBlue mediumBtn";
                logoDiv.id = "logoDiv";
                loadCvBtn.innerHTML = "Öppna sparat cv(pdf)";
                cvIcon.src = "cvIcon80.png";
                cvIcon.alt = "Klicka här för att se ditt CV";
                cvIcon.classList.add("floatLeft");
                interestCount.innerHTML = "Intresseansökningar: " + user.interestCount;
                uname.innerHTML = user.uname;
                name.innerHTML = user.name + " " + user.ulname;
                edu.innerHTML = user.edu;
                email.innerHTML = user.email;
                city.innerHTML = user.city;
                logoDiv.appendChild(cvIcon);
                outerDiv.appendChild(logoDiv);
                outerDiv.appendChild(uname);
                outerDiv.appendChild(name);
                outerDiv.appendChild(edu);
                userInfoDiv.appendChild(outerDiv);
                otherInfoDiv.appendChild(email);
                otherInfoDiv.appendChild(city);
                otherInfoDiv.appendChild(interestCount);
                otherInfoDiv.appendChild(loadCvBtn);
                otherInfoDiv.appendChild(warningDiv);
                infoDiv.appendChild(otherInfoDiv);
                userInfoDiv.appendChild(infoDiv);
                otherInfoDiv.classList.add("contactInfoDiv");
                logoDiv.classList.add("logoDiv");
                logoDiv.classList.add("pointer");
                outerDiv.classList.add("sInfoOuterDiv");
                infoDiv.classList.add("sInfoInnerDiv");
                loadCvBtn.onclick = getCVtoMyInfo;
                logoDiv.onclick = () => loadCvBtn.click();//loadCvBtn.click;                
                document.getElementById("loadingScreen").style.display = "none";
            }
        };
        xhttp.open("GET", "userDataFromDBStudent", true)
        xhttp.send();
    }
    function getCVtoMyInfo() {
        if (cvData == null) {
            let warningDiv = document.getElementById("warningDiv");
            warningDiv.innerHTML="";
            let noCV =document.createElement("p");
            noCV.innerHTML= "Du har inte laddat upp något cv. Du kan göra detta under fliken<br>"
            let clickToEdit=document.createElement("strong");
            clickToEdit.id="clickToEdit";
            clickToEdit.classList.add("pointer");
            clickToEdit.innerHTML="Redigera information";
            clickToEdit.addEventListener("click",loadEditMyProfile);
            warningDiv.appendChild(noCV);// = noCV+clickToEdit;
            warningDiv.appendChild(clickToEdit);
        }
        else {
            if (!document.getElementById("pdfSpace")) {
                let pdfSpace = document.createElement("object");
                let userInfoDiv = document.getElementById("menu-page-content");
                pdfSpace.id = "pdfSpace";
                pdfSpace.type = "application/pdf";
                pdfSpace.width = "100%";
                pdfSpace.height = "0em";
                pdfSpace.setAttribute("trusted", "yes");
                pdfSpace.setAttribute("application", "yes");
                pdfSpace.standby = "Laddar cv..";
                pdfSpace.className = "smoothTransition";
                userInfoDiv.appendChild(pdfSpace);

            }
            readCvData();
        }

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

        var removeStudentBtn = document.getElementById('removeStudentBtn');
        removeStudentBtn.addEventListener('click', removeStudent);
    }

    function removeStudent(){
        if (confirm('Är du säker på att du vill radera ditt konto?')) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.response == 'false'){
                        alert('Ops någonting oväntat har uppstått.\n'+
                        'Vi kan för tillfället ej ta bort ditt konto på grund av server problem.');
                    }else{
                        window.location.replace("index.html");
                    }
                }
            }
            xhttp.open('DELETE', 'deleteStudent', true);
            xhttp.send();
        } 
       
    }

    function hoverNewKeywords(element, show, connectedTo) {
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
        }
        else if (!input.files) {
        }
        else if (!input.files[0]) {
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = () => {
                
                if(file.type !== "application/pdf" || file.size > 15000000)
                {
                    let errorMsg = "odefinerat fel!!"
                  

                    if(file.type !== "application/pdf"){
                        errorMsg = "Ogiltigt CV!";
                    }
                    else if(file.size > 15000000)
                    {
                        errorMsg = "Max storlek är 15mb!";                        
                    }

                    pdfStatus.style.color = "red";   
                    pdfStatus.innerHTML = errorMsg;
                    loadCvBtn.innerHTML = "Öppna gammalt CV"
                    UploadOrSaved = "gammalt";              
                }
                else
                {
                    cvData = fr.result;
                    UploadOrSaved = "uppladdat";
                    loadCvBtn.innerHTML = "Öppna " + UploadOrSaved + " cv(pdf)";
                    pdfStatus.style.color = "black";                       
                    pdfStatus.innerHTML = "Glöm inte klicka spara för att ladda upp ditt cv!";
                }
            }
            fr.readAsDataURL(file);
        }
    }

    function readCvData() {
        if (cvData && document.getElementById('pdfSpace')) {
            document.getElementById('pdfSpace').data = cvData;
            document.getElementById('pdfSpace').height = "1000em";

            if (document.getElementById("loadCvBtn")) {
                loadCvBtn = document.getElementById("loadCvBtn");

            }

            loadCvBtn.innerHTML = "Stäng " + UploadOrSaved + " cv(pdf)";

            loadCvBtn.onclick = () => {
                document.getElementById('pdfSpace').data = "";
                document.getElementById('pdfSpace').height = "0em";
                loadCvBtn.onclick = readCvData;
                loadCvBtn.innerHTML = "Öppna " + UploadOrSaved + " cv(pdf)";
            }
        }
        else if (!document.getElementById('pdfSpace')) {
        }
    }

    function removeError(){
        if(document.getElementById("sPsw") && document.getElementById("sPswConfirm") 
           && document.getElementById("error"))
        {
            document.getElementById("sPsw").classList.remove("errInput");
            document.getElementById("sPswConfirm").classList.remove("errInput");
            document.getElementById("error").remove();
            document.getElementById("sPsw").onkeyup = "";
            document.getElementById("sPswConfirm").onkeyup = "";   
        }            
    };

    function saveProfile() {
        if(checker()){
        if (document.getElementById("sPsw").value === document.getElementById("sPswConfirm").value) {
            let ListOfKeyWords = [];
           
            var userObj = {
                name: document.getElementById("sFName").value,
                lastname: document.getElementById("sLName").value,
                city: document.getElementById("city").value,
                ueducation: document.getElementById("sEdu").value,
                uemail: document.getElementById("sEmail").value,
                uname: document.getElementById("sUname").value,
                password: document.getElementById("sPsw").value,
                keywords: []
            }
            var fullListToCheck = document.getElementsByClassName("ChekedKeyWord");
            for (i = 0; i < fullListToCheck.length; i++) {
                if (fullListToCheck[i].checked)
                    ListOfKeyWords.push(fullListToCheck[i].id);
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
            }
            xhttp.open("POST", "changeStudentInfo?userObj=" + userString, true);

            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded", "charset=utf-8");

        xhttp.send("&cv=" + cvData);
        }
        else{
            if(!document.getElementById('error')){

                document.getElementById("sPsw").classList.add("errInput");
                document.getElementById("sPswConfirm").classList.add("errInput");                
                
                document.getElementById("sPsw").onkeyup = () => {removeError();}; 
                document.getElementById("sPswConfirm").onkeyup = () => {removeError();}; //funkar inte av någon anledning
                document.getElementById("ErrorMessage").innerHTML += "<span id='error' style='color:red;'>lösenord är olika!</span>";
            }
        }
    }
    else{
        document.getElementById("errorpsw").innerHTML = "Ogiltliga tecken!";
    }
};

    function sendInterest(jobId) {
        var message = document.getElementById("Interestmessage").value;
        var check = /[#&%*+<>$¤£]/;
        if(!message.match(check)){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "true") {
                    loadMyInterests();
                }else{
                   makeInterestBtn.addEventListener("click", function(){
                    sendInterest(jobId);
                    this.removeEventListener('click',arguments.callee);
                });
                    document.getElementById("warningTextInterestJob").innerHTML="Någonting gick fel, kontrollera din information och prova igen";
                }
            }
        }
        xhttp.open("POST", "addInterestMessage?jobID=" + jobId + "&message=" + message, true);
        xhttp.send();
    }
    else{
        document.getElementById("warningTextInterestJob").innerHTML="Felaktig input";
        makeInterestBtn.addEventListener("click", function(){
            sendInterest(jobId);
            this.removeEventListener('click',arguments.callee);
        })
    }
}


    function showMoreInfoBtn(jobId, val) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("menu-page-content").innerHTML = this.response;
                document.getElementById("closeExJob").addEventListener("click", loadCatalog);
                getSpecificJob(jobId);

                makeInterestBtn = document.getElementById("makeInterestSubmit");
                makeInterestBtn.addEventListener("click", function(){
                    sendInterest(jobId);
                    this.removeEventListener('click',arguments.callee);
                });
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
                var jobs = JSON.parse(this.response);

                document.getElementById("logga").src = jobs[0].logoURL;
                document.getElementById("rubrik").innerHTML = jobs[0].tile;
                document.getElementById("shortDescriprion").innerHTML = jobs[0].shortdesc;
                document.getElementById("longDescriprion").innerHTML = jobs[0].longdesc;
                var keyWords = document.getElementById("keyWordArea");
                keyWords.innerHTML = "";
                var table = document.createElement("table");
                keyWords.appendChild(table);
                table.className = "tableKeywords";
                var thisRow = document.createElement("tr");
                table.appendChild(thisRow);
                let newJobs=[];
                for(let j=0;j<jobs[0].keywords.length;++j){
                    if(jobs[0].keywords[j]!="Annat"){
                        newJobs.push(jobs[0].keywords[j]);
                    }
                }
                for (i = 0; i < newJobs.length; ++i) {
                    if (i % 3 === 0) {
                        var newRow = document.createElement("tr");
                        thisRow = newRow;
                        table.appendChild(thisRow);
                        var t = document.createElement("td");
                        t.innerHTML = newJobs[i];
                        thisRow.appendChild(t);
                    } else {
                        var td = document.createElement("td");
                        td.innerHTML = newJobs[i];
                        thisRow.appendChild(td);
                    }
                }
            }
        };
        xhttp.open("GET", "getSpecificJobFromDB?jobID=" + jobId, true);
        xhttp.send();
    }

    function eventListenerOnSearch() {
        //Search bar in student cataloge
        searchInput = document.getElementById("searchInput");

        //filter Search words
        searchInput.addEventListener("keyup", function (event) {
            var input, filter, ul, li, a, i;
            input = searchInput;
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < li.length; i++) {
                p = li[i].getElementsByTagName("p")[0];
                if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
        //search
        searchInput.addEventListener("keypress", function (event) {
            //show list of searchwords
            document.getElementById("myUL").className = "show";


            if (event.keyCode == 13) {
                //hide list of searchwords
                document.getElementById("myUL").className = "hide";
                document.getElementById("workAnnouncement").innerHTML = "<img class=\"loadingImg\" id=\"loadImg\" src=\"LoadingImg.svg\" position>";
                if (searchInput.value == "") {
                    loadCatalog();
                }
                //sök efter jobb
                else {
                    getSeachedKeyWordJob(searchInput.value);
                }
            }
        });

    }
    function getSeachedKeyWordJob(keyw) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jobs = JSON.parse(this.response);
                if (jobs.length === undefined || jobs.length == 0) {
                    document.getElementById("workAnnouncement").innerHTML = "Vi hittade inga jobb som matchade din sökning!";
                }
                else {
                    filterAlreadySearchedJobs(jobs);
                }
            }
        };
        xhttp.open("GET", "getSearchedJobsFromDB?keyword=" + keyw, true);
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
                loadSearchKeywords();
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
                var jobs = JSON.parse(this.response);
                filterAlreadySearchedJobs(jobs);
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
                if ((obj[0].joblist === undefined || obj[0].joblist.length == 0)) {
                    workAnnouncements(jobs.length, jobs);
                }
                else {
                    for (let j = 0; j < obj[0].joblist.length; ++j) {
                        for (let i = 0; i < jobs.length; ++i) {
                            if (jobs[i]._id == obj[0].joblist[j].jobID) {
                                newJobList = newJobList.filter(job => job != jobs[i]);
                            }
                        }
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

            var top = document.createElement("div"); 
            top.className = "jobTop";

            var logo = document.createElement("img");

            logo.className = "jobLogo";
            var header = document.createElement("div");
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

            outerDiv.appendChild(info);
            outerDiv.appendChild(document.createElement("br"));
            outerDiv.appendChild(document.createElement("br"));
            outerDiv.appendChild(readBtn);
            outerDiv.appendChild(removeBtn);

            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);

            logo.src = jobb[0].logoURL; 
            newh1.innerHTML = jobb[0].tile;  
            info.innerHTML = message;
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
            if (currentPage.id == "recomendedJobBtn") {
                newP.innerHTML = "Prova att ändra dina önskemål under \"Redigera Information\"";
                newh2.innerHTML = "Du har inga matchande jobb.";
            }
            else {
                newP.innerHTML = "";
                newh2.innerHTML = "Vi hittade inga jobb.";
            }
            outerDiv.appendChild(newh2);
            outerDiv.appendChild(newP);
            outerDiv.className = "jobsSmall";
            workAnnouncement.appendChild(outerDiv);
        } else {
            for (var i = 0; i < num; i++) {

                var outerDiv = document.createElement("div");
                outerDiv.className = "jobsSmall";

                var top = document.createElement("div");
                top.className = "jobTop";

                var logo = document.createElement("img");

                logo.className = "jobLogo";
                var header = document.createElement("div");
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


                logo.src = jobb[i].logoURL; 
                newh1.innerHTML = jobb[i].tile; 
                info.innerHTML = jobb[i].shortdesc;
                let show = '1';
                readBtn.addEventListener("click", (e) => showMoreInfoBtn(readBtn.id, show));
            }
        }
    }
    loadMyInfo();
    function checker(){
        var checkstr;
        checkstr+=document.getElementById("sFName").value;
        checkstr+=document.getElementById("sLName").value;
        checkstr+=document.getElementById("city").value;
        checkstr+= document.getElementById("sEdu").value;
        checkstr+= document.getElementById("sEmail").value;
        checkstr+= document.getElementById("sUname").value;
        checkstr+= document.getElementById("sPsw").value;
        var invChar = /[#&%*+<>$¤£]/;
        if(checkstr.match(invChar)){
            return false; 
        }
        else{
            return true;
        } 
    }
}

