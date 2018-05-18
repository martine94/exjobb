"use strict";

window.onload = function () {

    var currentPage = "";
    //#region buttons

    var regButton = document.getElementById("registerBtn");
    var regContainer = document.getElementById("registerContainer");
    var logInButton = document.getElementById("logInBtn");
    var logInContainer = document.getElementById("logInContainer");
    var aboutButton = document.getElementById("aboutBtn");
    var companyButton = document.getElementById("companyBtn");
    var studentButton = document.getElementById("studentBtn");
    var companyRegButton = document.getElementById("companyRegBtn");

    var studentRegButton = document.getElementById("studentRegBtn");
    var companyLoginButton = document.getElementById("companyLoginBtn");
    var studentLoginButton = document.getElementById("studentLoginBtn");
    var searchInput = document.getElementById("searchInput");
    //#endregion


    //#region eventlisteners

    logInButton.addEventListener("mouseover", function () { dropDown("logInContainer", true); });
    logInButton.addEventListener("mouseleave", function () { dropDown("logInContainer", false); });
    logInContainer.addEventListener("mouseover", function () { dropDown("logInContainer", true); });
    logInContainer.addEventListener("mouseleave", function () { dropDown("logInContainer", false); });
    companyLoginButton.addEventListener("click", openLoginCompanyModal);

    studentLoginButton.addEventListener("click", openLoginStudentModal);

    regButton.addEventListener("mouseover", function () { dropDown("registerContainer", true); });
    regButton.addEventListener("mouseleave", function () { dropDown("registerContainer", false); });
    regContainer.addEventListener("mouseover", function () { dropDown("registerContainer", true); });
    regContainer.addEventListener("mouseleave", function () { dropDown("registerContainer", false); });
    companyRegButton.addEventListener("click", openRegisterCompanyModal);
    studentRegButton.addEventListener("click", openRegisterStudentModal);

    aboutButton.addEventListener("click", showAboutUsInfo);
    companyButton.addEventListener("click", showForCompaniesInfo);
    studentButton.addEventListener("click", showForStudentsInfo);

    //Search bar is not implemented yet.
    searchInput.addEventListener("keypress", function (event) {
        console.log(event.keyCode);
        if (event.keyCode == 13) {
            //sök efter jobb

            var infoDiv = document.createElement("div");
            infoDiv.className = "information";
            infoDiv.innerHTML = "Tyvärr har vi inga examensjobb som matchar din sökning för tilfället! " + '<br>' + '<br>' +
                "Men registra gärna ett konto för att lättare hålla koll på när det kommer ut ett arbete som matchar dina kriterier.";

            var infoContainer = document.getElementById("option-page-content");
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoDiv);
        }
    });
    //#endregion

    showAboutUsInfo();


    //#region login functions

    function LogInCompany() {
        var username = document.getElementById("cName").value;
        var password = document.getElementById("cPsw").value;

        ajaxRequest('GET', "logginComp?username=" + username + "&password=" + password, function (response) {
            if (response === "false") {
                console.log("Fel användarnamn eller lösenord");
                document.getElementById("errLogIn").innerHTML = "* Fel användarnamn eller lösenord";
            } else {
                console.log("Du är nu inloggad");
                window.location.replace("Company.html");
                dropDown("modal-test", false);
            }
        });
    }

    function LogInStudent() {
        var username = document.getElementById("sName").value;
        var password = document.getElementById("sPsw").value;

        ajaxRequest('GET', "logginStudent?_user=" + username + "&password=" + password, function (response) {
            if (response === "false") {
                console.log("Fel användarnamn eller lösenord");
                document.getElementById("errLogIn").innerHTML = "* Fel användarnamn eller lösenord";
            } else {
                console.log("Du är nu inloggad");
                window.location.replace("Student.html");
                dropDown("modal-test", false);
            }
        });
    }

    //#endregion

    //#region open modal functions

    function openLoginCompanyModal() {
        ajaxRequest('GET', 'loadFileIndex?p=/logInComp.html', function (response) {
            document.getElementById("modal-test").innerHTML = response;

            var closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", function () { dropDown("modal-test", false); });

            var logginCompanyButton = document.getElementById("OKLogInComp");
            logginCompanyButton.addEventListener("click", LogInCompany);
            
            let reglink = document.getElementById("regLinkC");
            reglink.addEventListener("click",openRegisterCompanyModal);

            var companyPasswordTextfield = document.getElementById('cPsw');
            companyPasswordTextfield.addEventListener('keypress', (event) => { if (event.keyCode === 13) LogInCompany(); });

            dropDown("modal-test", true);
        });
    }
    function testClick() {
        console.log("click");
    }

    function openLoginStudentModal() {
        ajaxRequest('GET', 'loadFileIndex?p=/logInStudent.html', function (response) {
            document.getElementById("modal-test").innerHTML = response;

            var closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", function () { dropDown("modal-test", false); });

            var logginStudentButton = document.getElementById("OKLogInStudent");
            logginStudentButton.addEventListener("click", LogInStudent);

            let reglink = document.getElementById("regLinkS");
            reglink.addEventListener("click", openRegisterStudentModal);

            var studentPasswordTextfield = document.getElementById('sPsw');
            studentPasswordTextfield.addEventListener('keypress', (event) => { if (event.keyCode === 13) LogInStudent(); });

            dropDown("modal-test", true);
        });
    }

    function openRegisterCompanyModal() {
        ajaxRequest('GET', 'loadFileIndex?p=/regCompany.html', function (response) {
            document.getElementById("modal-test").innerHTML = response;

            var closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", function () { dropDown("modal-test", false); });

            var regCompanyButton = document.getElementById("okRegCompany");
            regCompanyButton.addEventListener("click", checkValidRegCompanyInput);

            dropDown("modal-test", true);
        });
    }

    function openRegisterStudentModal() {
        ajaxRequest('GET', 'loadFileIndex?p=/regStudent.html', function (response) {
            document.getElementById("modal-test").innerHTML = response;

            var closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", function () { dropDown("modal-test", false); });

            var regStudentButton = document.getElementById("okRegStudent");
            regStudentButton.addEventListener("click", checkValidRegStudentInput);

            dropDown("modal-test", true);
        });
    }
    //#endregion

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
    //#region show page content functions   

    function showAboutUsInfo() {
        SetCurrentPage(aboutButton);
        ajaxRequest('GET', 'loadFileIndex?p=/about.html', function (response) {
            document.getElementById("option-page-content").innerHTML = response;
            document.getElementById("aboutUsInfo").style.display = "block";
            let page = document.getElementById("option-page-content");
            let loadingscreen = document.createElement("img");
            loadingscreen.src = "LoadingImg.svg";
            loadingscreen.classList.add("loadingImg");
            loadingscreen.id = "loadingScreen";
            page.appendChild(loadingscreen);
            getJobsFromDB();
        });
    }

    function showForCompaniesInfo() {
        SetCurrentPage(companyButton);
        ajaxRequest('GET', 'loadFileIndex?p=/forCompanies.html', function (response) {
            document.getElementById("option-page-content").innerHTML = response;
            document.getElementById("forCompaniesInfo").style.display = "block";
            var regCompLink = document.getElementById("regCompanyLink");
            regCompLink.addEventListener("click", openRegisterCompanyModal);
            faqRequest("companyUtlogg");
        });
    }

    function showForStudentsInfo() {
        SetCurrentPage(studentButton);
        ajaxRequest('GET', 'loadFileIndex?p=/forStudents.html', function (response) {
            document.getElementById("option-page-content").innerHTML = response;
            document.getElementById("forStudentsInfo").style.display = "block";
            var regStudLink = document.getElementById("regStudLink");
            regStudLink.addEventListener("click", openRegisterStudentModal);
            faqRequest("studentUtlogg");
        });
    }
    function faqRequest(place) {
        ajaxRequest('GET', 'getFAQ?place=' + place, function (response) {
            faq(response);
        });
    }
    function faq(qas) {
        qas = JSON.parse(qas);
        var faqContainer = document.getElementById("FAQ");
        let h3 = document.createElement("h3");
        h3.innerHTML = "Vanliga frågor och svar:";
        faqContainer.appendChild(h3);
        for (let i = 0; i < qas.length; ++i) {
            let question = document.createElement("b");
            question.innerHTML = qas[i].question+"<br>";
            question.classList.add("pointer");

            let answer = document.createElement("p");
            let div = document.createElement("div");
            div.id = qas[i]._id;
            answer.innerHTML =qas[i].answer;
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
    //#endregion

    //} var tvungen flytta denna till längst ner för vissa funtioner funkar inte

    //#region shared register functions

    function getRadioButtonValue(element) {
        for (let i = 0; i < element.length; i++) {
            if (element[i].checked) {
                return element[i].value;
            }
        }
        return "";
    }

    function checkEmptyInput(value) {
        return value === "" ? false : true;
    }

    function checkEmailInput(value) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    }

    function setTextInputClass(element, newClassName) {
        element.className = newClassName;
    }

    class formInputHandler {
        constructor(element, errorMsg, notErrorMsg, getValueFunction, checkValidFunction, errorFunction) {
            this.element = element;
            this.errorMsg = errorMsg;
            this.notErrorMsg = notErrorMsg;
            this.getValue = function () { return getValueFunction(this.element) };
            this.checkValid = function () { return checkValidFunction(this.getValue()); };
            this.setError = function () { errorFunction(this.element, errorMsg); };
            this.clearError = function () { errorFunction(this.element, notErrorMsg); };
        }
    }

    //endregion

    //#region register student

    function getStudentForm() {
        var studentForm = {};

        studentForm["firstName"] = new formInputHandler(document.getElementById("ufnameS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["lastName"] = new formInputHandler(document.getElementById("ulnameS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["city"] = new formInputHandler(document.getElementById("ucityS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["education"] = new formInputHandler(document.getElementById("ueducationS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["email"] = new formInputHandler(document.getElementById("uemailS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmailInput, setTextInputClass);

        studentForm["userName"] = new formInputHandler(document.getElementById("unameS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["password"] = new formInputHandler(document.getElementById("pswS"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        studentForm["passwordConfirm"] = new formInputHandler(document.getElementById("pswS2"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        return studentForm;
    }

    function checkValidRegStudentInput() {

        let formInputs = getStudentForm();
        var error = false;

        for (var key in formInputs) {
            if (!formInputs[key].checkValid()) {
                formInputs[key].setError();
                error = true;
            }
            else {
                formInputs[key].clearError();
            }
        }

        if (formInputs["password"].getValue() != formInputs["passwordConfirm"].getValue()) {
            document.getElementById("errorReg").innerHTML += " *Lösenorden stämmer inte överens.";
            formInputs["password"].element.value = "";
            formInputs["passwordConfirm"].element.value = "";
            error = true;
        }

        if (error) {
            document.getElementById("errorReg").innerHTML = "*Fel input " + "<br/>";
        }
        else {
            document.getElementById("errorReg").innerHTML = "";
            register_student(formInputs);
        }
    }

    function createStudentRouteString(formInputs) {
        return "register_student?ufname=" + formInputs["firstName"].getValue() +
            "&ulname=" + formInputs["lastName"].getValue() +
            "&ucity=" + formInputs["city"].getValue() +
            "&uedu=" + formInputs["education"].getValue() +
            "&uemail=" + formInputs["email"].getValue() +
            "&uname=" + formInputs["userName"].getValue() +
            "&psw=" + formInputs["password"].getValue();
    }

    function register_student(formInputs) {
        ajaxRequest('POST', createStudentRouteString(formInputs), function (response) {
            if (response === "false") {
                console.log("Something went wrong.");
                document.getElementById("errorReg").innerHTML = "*Användarnamnet upptaget!";
                document.getElementById("unameS").value = "";
            } else {
                console.log("You are now registered.");
                window.location.replace("Student.html");
                dropDown("modal-test", false);
            }
        });
    }

    //#endregion

    //#region register company

    function getCompanyForm() {
        var companyForm = {};

        companyForm["companyName"] = new formInputHandler(document.getElementById("nameC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        companyForm["userName"] = new formInputHandler(document.getElementById("unameC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        companyForm["city"] = new formInputHandler(document.getElementById("cityC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        companyForm["email"] = new formInputHandler(document.getElementById("emailC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmailInput, setTextInputClass);

        companyForm["address"] = new formInputHandler(document.getElementById("addressC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        companyForm["password"] = new formInputHandler(document.getElementById("pswC"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        companyForm["passwordConfirm"] = new formInputHandler(document.getElementById("psw2C"), "width100 errInput", "width100",
            function (element) { return element.value; }, checkEmptyInput, setTextInputClass);

        return companyForm;
    }

    function checkValidRegCompanyInput() {
        var formInputs = getCompanyForm();
        console.log(formInputs);
        var error = false;

        for (var key in formInputs) {
            if (!formInputs[key].checkValid()) {
                formInputs[key].setError();
                error = true;
            }
            else {
                formInputs[key].clearError();
            }
        }

        if (error) {
            document.getElementById("errorReg").innerHTML = "*Fel input " + "<br/>";
        }

        if (formInputs["password"].getValue() != formInputs["passwordConfirm"].getValue()) {
            document.getElementById("errorReg").innerHTML += " *Lösenorden stämmer inte överens.";
            formInputs["password"].element.value = "";
            formInputs["passwordConfirm"].element.value = "";
            error = true;
        }

        if (!error) {
            register_company(formInputs);
        }
    }

    function createCompanyRouteString(formInputs) {
        return "register_company?cname=" + formInputs["companyName"].getValue() +
            "&psw=" + formInputs["password"].getValue() +
            "&cuname=" + formInputs["userName"].getValue() +
            "&caddress=" + formInputs["address"].getValue() +
            "&cemail=" + formInputs["email"].getValue() +
            "&ccity=" + formInputs["city"].getValue();
    }

    function register_company(formInputs) {
        var routeString = createCompanyRouteString(formInputs);

        ajaxRequest('POST', routeString, function (response) {
            if (response === "false") {
                console.log("Something went wrong.");
                document.getElementById("errorReg").innerHTML = "*Användarnamnet är upptaget!";
                formInputs["userName"].element.value = "";
            } else {
                console.log("You are now registered");
                window.location.replace("Company.html");
                dropDown("modal-test", false);
            }
        });
    }

    //#endregion

    //#region get exjobs list functions

    function getJobsFromDB() {
        ajaxRequest('GET', "getJobsForFirstPage", function (response) {
            var jobs = JSON.parse(response);
            ajaxRequest('GET', 'getNumberOfJobs', function (response) {
                var numberOfJobs = JSON.parse(response);
                workAnnouncements(numberOfJobs, jobs);
                document.getElementById("loadingScreen").style.display = "none";
            });

        });
    }

    function workAnnouncements(numberOfJobs, jobArray) {
        ajaxRequest('GET', 'loadFileIndex?p=/worktemplate.html', function (response) {
            var worktemplate = response;
            var jobbString = "";

            jobbString = "<h3 align=\"center\">Vi har för tillfället <b>" + numberOfJobs + "</b> examensarbeten registrerade hos oss.<br></h3>";
            for (var i = 0; i < jobArray.length; i++) {
                var tempJobbString = worktemplate;
                tempJobbString = tempJobbString.replace("logoPlaceholder", jobArray[i].logoURL);
                tempJobbString = tempJobbString.replace("titlePlaceholder", jobArray[i].tile);
                tempJobbString = tempJobbString.replace("shortDescPlaceholder", jobArray[i].shortdesc);
                tempJobbString = tempJobbString.replace("buttonPlaceholder", "readMoreButton" + i);

                jobbString += tempJobbString;
            }

            document.getElementById('workAnnouncement').innerHTML = jobbString;

            for (var i = 0; i < jobArray.length; i++) {
                document.getElementById("readMoreButton" + i).addEventListener("click", openLoginStudentModal);
            }

            var moreText = document.createElement("p");
            moreText.innerHTML = "För att se resterande jobb. <br>Var vänlig att <strong id=\"logInLink\" class=\"pointer\">Logga in</strong> eller <strong id=\"regLink\" class=\"pointer\">Registrera</strong> ett kostnadsfritt studentkonto.";

            var companyText = document.createElement("p");
            companyText.innerHTML = "Företag kan lägga upp egna examensarbeten.<br>För att göra detta var vänlig att <strong id=\"logInLinkC\" class=\"pointer\">Logga in</strong> eller <strong id=\"registerLinkC\" class=\"pointer\">Registrera</strong> ett kostnadsfritt företagskonto.";

            document.getElementById('workAnnouncement').appendChild(moreText);
            document.getElementById('workAnnouncement').appendChild(companyText);

            var reglink = document.getElementById("regLink");
            reglink.addEventListener("click", openRegisterStudentModal);
            var loginLink = document.getElementById("logInLink");
            loginLink.addEventListener("click", openLoginStudentModal);
            var registerlinkC = document.getElementById("registerLinkC");
            registerlinkC.addEventListener("click", openRegisterCompanyModal);
            var loginLinkC = document.getElementById("logInLinkC");
            loginLinkC.addEventListener("click", openLoginCompanyModal);
        });
    }

    //#endregion

    //#region helper functions

    function dropDown(elementId, show) {
        if (show)
            document.getElementById(elementId).style.display = 'block';
        else
            document.getElementById(elementId).style.display = 'none';
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

    //#endregion
}