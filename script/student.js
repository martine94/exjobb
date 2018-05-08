window.onload = function () {

    //#region buttons
    var interestsBtn = document.getElementById("interestsBtn");
    var mySPagesBtn = document.getElementById("mySPagesBtn");
    var recomendedJobBtn = document.getElementById("recomendedJobBtn");
    var mySInfoBtn = document.getElementById("myInfoBtn")
    var logOutStudentBtn = document.getElementById("logOutStudentBtn");

    //#endregions

    //#region eventListeners
    interestsBtn.addEventListener("click", loadMyInterests);
    mySPagesBtn.addEventListener("click", loadMyProfile)
    recomendedJobBtn.addEventListener("click", loadMyRecomendedJobs)
    mySInfoBtn.addEventListener("click", loadMyInfo)
    logOutStudentBtn.addEventListener("click", logOut);
    //#endregions

    //Buttons, divs, inputs and an array for newExJob.html
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
    var pdfStatus;
    var loadCvBtn;
    var fileInpt;
    var cvData;
    var UploadOrSaved = "sparat";
    var genderData; //for not altering it...
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
                //document.getElementById("saveBtn").onclick = change_student;
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
                console.log(this.responseText);
                removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                var obj = JSON.parse(removeBrace);
                var user = {
                    id: obj._id,
                    name: obj.name,
                    ulname: obj.lastname,
                    city: obj.city, //for later...
                    edu: obj.ueducation,
                    email: obj.uemail,
                    name: obj.uname,
                    pw: obj.password,
                    gender: obj.gender,
                    cv: obj.cv 
                }
                document.getElementById("sFName").value += user.name;
                document.getElementById("sLName").value += user.ulname;
                document.getElementById("sEdu").value += user.edu;
                document.getElementById("sEmail").value += user.email;
                document.getElementById("sUname").value += user.name;
                document.getElementById("sPsw").value += user.pw;
                
                
                if(typeof user.cv !== 'undefined' && user.cv)
                {
                    document.getElementById("pdfStatus").innerHTML = "CV upladdat";
                }
                else
                {
                    cvData = user.cv;
                }

                genderData = user.gender;
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
        saveBtn = document.getElementById("saveBtn");
        
        loadCvBtn = document.getElementById("pdfOpen");
        fileInpt = document.getElementById("pdfUpload");    
        pdfStatus = document.getElementById("pdfStatus");  
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
        //saveBtn.addEventListener("click", (e) => saveProfile)
        saveBtn.addEventListener("click", change_student);

        fileInpt.addEventListener("change", manageSelectedFile);
        loadCvBtn.onclick = readCvData;
        
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

    function manageSelectedFile()
    {
        console.log("managing file...");
        if(!window.File || !window.FileReader || !window.FileList || !window.Blob)
        {
            throw("The file API needed is not supported in this browser!");
        }        
        input = document.getElementById('pdfUpload');

        if(!input){
            console.error("can't find input element!");
        }
        else if(!input.files){
            console.error("this browser does not support the files property of input!");
        }
        else if(!input.files[0]){
            console.log("no file selected");
        }
        else
        {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = () =>{
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

    function readCvData()
    {
        document.getElementById('pdfSpace').height = "1000em";
        document.getElementById('pdfSpace').data = cvData;
        loadCvBtn.innerHTML = "Stäng "  + UploadOrSaved +" cv(pdf)";

        loadCvBtn.onclick = () => {
            document.getElementById('pdfSpace').data = "";            
            document.getElementById('pdfSpace').height = "0em";
            loadCvBtn.onclick = readCvData;
            loadCvBtn.innerHTML = "Öppna " + UploadOrSaved + " cv(pdf)";
        }
    }

    function change_student() {
        console.log("save");
        var ufname = document.getElementById("sFName").value;
        var ulname = document.getElementById("sLName").value;
        var ucity = "";//document.getElementById("Undefined").value;
        var uedu= document.getElementById("sEdu").value;
        var uemail= document.getElementById("sEmail").value;
        var uname= document.getElementById("sUname").value;
        var psw= document.getElementById("sPsw").value;
        var gender="Undefined";

        var keywords = "";
        var cv = cvData;
        console.log(cv); //use at own risk...
        var xhttp = new XMLHttpRequest();
        httpRuntimemaxRequestLenght="1024000";

        xhttp.open("POST", "changeStudentInfo?ufname=" + ufname + "&ulname=" + ulname + "&ucity=" + ucity + "&uedu=" + uedu 
        + "&uemail=" + uemail+ "&uname=" + uname + "&gender=" + genderData + "&psw=" + psw + "&keywords=" + keywords + "&cv=" + cv, true);
        xhttp.send();
    }

    function saveProfile() {
        let ListOfKeyWords = [];
        let title = document.getElementById("").value;
        let shortde = document.getElementById("").value;
        let longde = document.getElementById("").value;
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
        infoUser.className = "userDataShow";
    }
    loadMyInfo();

}