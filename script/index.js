"use strict";

window.onload = function () {
    
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

    logInButton.addEventListener("mouseover", function(){ dropDown("logInContainer", true); });
    logInButton.addEventListener("mouseleave", function(){ dropDown("logInContainer", false); });
    logInContainer.addEventListener("mouseover", function(){ dropDown("logInContainer", true); });
    logInContainer.addEventListener("mouseleave", function(){ dropDown("logInContainer", false); });
    companyLoginButton.addEventListener("click", openLoginCompanyModal);
    studentLoginButton.addEventListener("click", openLoginStudentModal);

    regButton.addEventListener("mouseover", function(){ dropDown("registerContainer", true); });
    regButton.addEventListener("mouseleave", function(){ dropDown("registerContainer", false); });
    regContainer.addEventListener("mouseover", function(){ dropDown("registerContainer", true); });
    regContainer.addEventListener("mouseleave", function(){ dropDown("registerContainer", false); });
    companyRegButton.addEventListener("click", openRegisterCompanyModal);
    studentRegButton.addEventListener("click", openRegisterStudentModal);
    
    aboutButton.addEventListener("click", showAboutUsInfo);
    companyButton.addEventListener("click", showForCompaniesInfo);
    studentButton.addEventListener("click", showForStudentsInfo);

    //Search bar is not implemented yet.
    searchInput.addEventListener("keypress", function(event) {
        console.log(event.keyCode);
        if (event.keyCode == 13){
            //sök efter jobb
        
        var infoDiv=document.createElement("div");
        infoDiv.className="information"; 
        infoDiv.innerHTML="Tyvärr har vi inga examensjobb som matchar din sökning för tilfället! "+'<br>'+'<br>'+
        "Men registra gärna ett konto för att lättare hålla koll på när det kommer ut ett arbete som matchar dina kriterier.";

        var infoContainer=document.getElementById("option-page-content");
        infoContainer.innerHTML="";
        infoContainer.appendChild(infoDiv);
        }
    });
    //#endregion

    showAboutUsInfo();
}

//#region login functions

function LogInCompany() {
    var username = document.getElementById("cName").value;
    var password = document.getElementById("cPsw").value;
    
    ajaxRequest('GET', "logginComp?username=" + username + "&password=" + password, function(response){
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

    ajaxRequest('GET', "logginStudent?_user=" + username + "&password=" + password, function(response){
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
    ajaxRequest('GET', 'loadFileIndex?p=/logInComp.html', function(response){
        document.getElementById("modal-test").innerHTML = response;

        var closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function(){ dropDown("modal-test", false); });
        
        var logginCompanyButton = document.getElementById("OKLogInComp");
        logginCompanyButton.addEventListener("click", LogInCompany);
        
        var reglink=document.getElementById("regLinkC");
        reglink.addEventListener("click",openRegisterCompanyModal);

        dropDown("modal-test", true);
    });
}

function openLoginStudentModal() {
    ajaxRequest('GET', 'loadFileIndex?p=/logInStudent.html', function(response){
        document.getElementById("modal-test").innerHTML = response;

        var closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function(){ dropDown("modal-test", false); });
        
        var logginStudentButton = document.getElementById("OKLogInStudent");
        logginStudentButton.addEventListener("click", LogInStudent);
        
        var reglink=document.getElementById("regLinkS");
        reglink.addEventListener("click", openRegisterStudentModal);

        dropDown("modal-test", true);
    });
}

function openRegisterCompanyModal() {
    ajaxRequest('GET', 'loadFileIndex?p=/regCompany.html', function(response){
        document.getElementById("modal-test").innerHTML = response;

        var closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function(){ dropDown("modal-test", false); });

        var regCompanyButton = document.getElementById("okRegCompany");
        regCompanyButton.addEventListener("click", checkValidRegCompanyInput);
        
        dropDown("modal-test", true);
    });
}

function openRegisterStudentModal() {
    ajaxRequest('GET', 'loadFileIndex?p=/regStudent.html', function(response){
        document.getElementById("modal-test").innerHTML = response;
        
        var closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", function(){ dropDown("modal-test", false); });

        var regStudentButton = document.getElementById("okRegStudent");
        regStudentButton.addEventListener("click", checkValidRegStudentInput);
       
        dropDown("modal-test", true);
    });
}
//#endregion

//#region show page content functions   

function showAboutUsInfo() {
    ajaxRequest('GET', 'loadFileIndex?p=/about.html', function(response){
        document.getElementById("option-page-content").innerHTML = response;
        document.getElementById("aboutUsInfo").style.display="block";
        getJobsFromDB();
    });
}

function showForCompaniesInfo() {
    ajaxRequest('GET', 'loadFileIndex?p=/forCompanies.html', function(response){
        document.getElementById("option-page-content").innerHTML = response;
        document.getElementById("forCompaniesInfo").style.display = "block";
    });
}

function showForStudentsInfo() {
    ajaxRequest('GET', 'loadFileIndex?p=/forStudents.html', function(response){
        document.getElementById("option-page-content").innerHTML = response;
        document.getElementById("forStudentsInfo").style.display = "block";
    });
}

//#endregion

//#region register student and company functions

function checkValidRegStudentInput(){
    var ufname = document.getElementById("ufnameS");
    var ulname = document.getElementById("ulnameS");
    var ucity = document.getElementById("ucityS");
    var uedu= document.getElementById("ueducationS");
    var uemail= document.getElementById("uemailS");
    var uname= document.getElementById("unameS");
    var psw= document.getElementById("pswS");

    var inputs=[ufname, ulname, ucity, uedu, uemail, uname, psw];

    var i;
    var ok=1;

    for(i=0;i<inputs.length;i++){
        if(inputs[i].value==""){
            inputs[i].className="width100 errInput";
            ok=0;
        }
        else{
            inputs[i].className="";
            inputs[i].className="width100";
        }
    }
    if (ok===0){
        document.getElementById("errorReg").innerHTML="*Fel input "+"<br/>";
    }

    if(ok===1){
        register_student();
    }
}

function register_student() {
    console.log("click");
    var ufname = document.getElementById("ufnameS").value;
    var ulname = document.getElementById("ulnameS").value;
    var ucity = document.getElementById("ucityS").value;
    var uedu= document.getElementById("ueducationS").value;
    var uemail= document.getElementById("uemailS").value;
    var uname= document.getElementById("unameS").value;
    var psw= document.getElementById("pswS").value;
    var gender="";
    if(document.getElementById("maleS").checked){
        gender="male";
    } else{
        gender="female";
    }

    ajaxRequest('GET', "register_student?ufname=" + ufname + "&ulname=" + ulname + "&ucity=" + ucity + "&uedu=" + uedu + "&uemail=" + uemail+ "&uname=" + uname + "&psw=" + psw + "&gender=" + gender, function(response){
        if (response === "false") {
            console.log("Fel");
            document.getElementById("errorReg").innerHTML="*Användarnamnet upptaget!";
            document.getElementById("unameS").value="";
        } else {
            console.log("Du är nu registrerad");
            window.location.replace("Student.html");
            dropDown("modal-test", false);
        }
    });
}

function checkValidRegCompanyInput(){
    var cname = document.getElementById("nameC");
    var cuname = document.getElementById("unameC");
    var psw = document.getElementById("pswC");
    var ccity= document.getElementById("cityC");
    var cemail= document.getElementById("emailC");
    var caddress= document.getElementById("addressC");
    var psw2=document.getElementById("psw2C");
    var inputs=[cname, caddress, ccity, cemail, cuname, psw, psw2];

    var i;
    var ok=1;

    for(i=0;i<inputs.length;i++){
        if(inputs[i].value==""){
            inputs[i].className="width100 errInput";
            ok=0;
        }
        else{
            inputs[i].className="";
            inputs[i].className="width100";
        }
    }
    if (ok===0){
        document.getElementById("errorReg").innerHTML="*Fel input "+"<br/>";
    }
    if(psw.value!=psw2.value){
        document.getElementById("errorReg").innerHTML+=" *Lösenorden stämmer inte överens.";
        psw2.value="";
        ok=0;
        console.log(document.getElementById("errorReg").innerHTML);
    }

    if(ok===1){
        register_company();
    }
}

function register_company() {
    var cname = document.getElementById("nameC").value;
    var cuname = document.getElementById("unameC").value;
    var psw = document.getElementById("pswC").value;
    var ccity= document.getElementById("cityC").value;
    var cemail= document.getElementById("emailC").value;
    var caddress= document.getElementById("addressC").value;
    
    ajaxRequest('POST', "register_company?cname=" + cname + "&psw=" + psw + "&cuname=" + cuname + "&caddress=" + caddress + "&cemail=" + cemail+ "&ccity=" + ccity, function(response){
        if (response === "false") {
            console.log("Fel");
            document.getElementById("errorReg").innerHTML="*Användarnamnet är upptaget!";
            document.getElementById("unameC").value="";
            // document.getElementById("modal-test").innerHTML = "* Fel ";
        } else {
            console.log("Du är nu registrerad");
            window.location.replace("Company.html");
            dropDown("modal-test", false);
        }
    });
}

//#endregion

//#region get exjobs list functions

function getJobsFromDB(){
    ajaxRequest('GET', "getJobsFromDB", function(response){
        var jobs=JSON.parse(response);
        workAnnouncements(jobs.length, jobs);
    });
}

function workAnnouncements(num, jobb){
    ajaxRequest('GET', 'loadFileIndex?p=/worktemplate.html', function(response){
        var worktemplate = response;
        var jobbString = "";

        for (var i = 0; i < num; i++) {
            var tempJobbString = worktemplate;
            tempJobbString = tempJobbString.replace("logoPlaceholder", jobb[i].logoURL);
            tempJobbString = tempJobbString.replace("titlePlaceholder", jobb[i].tile);
            tempJobbString = tempJobbString.replace("shortDescPlaceholder", jobb[i].shortdesc);
            tempJobbString = tempJobbString.replace("buttonPlaceholder", "readMoreButton" + i);

            jobbString += tempJobbString;
        }

        document.getElementById('workAnnouncement').innerHTML = jobbString;

        for(var i = 0; i<num; i++){
            document.getElementById("readMoreButton" + i).addEventListener("click", openLoginStudentModal); 
        }
    });
}

//#endregion

//#region helper functions

function dropDown(elementId, show){
    if(show) 
        document.getElementById(elementId).style.display = 'block';
    else
        document.getElementById(elementId).style.display = 'none';
}

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

//#endregion