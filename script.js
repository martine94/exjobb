
window.onload = function () {

    //#region buttons
    var regBtn = document.getElementById("registerBtn");
    var regContainer = document.getElementById("registerContainer");
    var logInBtn = document.getElementById("logInBtn");
    var logInContainer = document.getElementById("logInContainer");
    var aboutBtn = document.getElementById("aboutBtn");
    var companyBtn = document.getElementById("companyBtn");
    var studentBtn = document.getElementById("studentBtn");
    var companyRegBtn = document.getElementById("companyRegBtn");
    var studentRegBtn = document.getElementById("studentRegBtn");
    var companyLoginBtn = document.getElementById("companyLoginBtn");
    var studentLoginBtn = document.getElementById("studentLoginBtn");

    //buttons that don't exist on load
    var closeModal;
    var RegCBtnOK;
    var RegSBtnOK;
    var logginCBtnOK;
    var logginSBtnOK;
    var logginSBtnOK;  
    var work_Announcement;

    var inputs;
    //#endregion

    //#region eventlisteners
    regBtn.addEventListener("mouseover", dropRegister);
    regBtn.addEventListener("mouseleave", hideRegister);
    regContainer.addEventListener("mouseover", dropRegister);
    regContainer.addEventListener("mouseleave", hideRegister);
    companyRegBtn.addEventListener("click", openRegisterCompanyModal);
    studentRegBtn.addEventListener("click", openRegisterStudentModal);
    companyLoginBtn.addEventListener("click", openLoginCompanyModal);
    studentLoginBtn.addEventListener("click", openLoginStudentModal);
    logInBtn.addEventListener("mouseover", dropLogIn);
    logInBtn.addEventListener("mouseleave", hideLogIn);
    logInContainer.addEventListener("mouseover", dropLogIn);
    logInContainer.addEventListener("mouseleave", hideLogIn);
    aboutBtn.addEventListener("click", showAboutUsInfo);
    companyBtn.addEventListener("click", showForCompaniesInfo);
    studentBtn.addEventListener("click", showForStudentsInfo);

    //#endregion
    //#region functions drop-down registers
    function dropRegister() {
        document.getElementById("registerContainer").style.display = "block";
    }

    function hideRegister() {
        document.getElementById("registerContainer").style.display = "none";
    }

    function dropLogIn() {
        document.getElementById("logInContainer").style.display = "block";
    }

    function hideLogIn() {
        document.getElementById("logInContainer").style.display = "none";
    }
    //#endregion

    //#region open fill close Modal

    function LogInCompany() {
        var username = document.getElementById("cName").value;
        var password = document.getElementById("cPsw").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("Fel användarnamn eller lösenord");
                    document.getElementById("errLogIn").innerHTML = "* Fel användarnamn eller lösenord";
                } else {
                    console.log("Du är nu inloggad");
                    window.location.replace("Company.html");
                    closeModal();
                }
            }
        };
        xhttp.open("GET", "logginComp?username=" + username + "&password=" + password, true);
        xhttp.send();
    }

    function LogInStudent() {
        var username = document.getElementById("sName").value;
        var password = document.getElementById("sPsw").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("Fel användarnamn eller lösenord");
                    document.getElementById("errLogIn").innerHTML = "* Fel användarnamn eller lösenord";
                } else {
                    console.log("Du är nu inloggad");
                    window.location.replace("Student.html");
                    closeModal();
                }
            }
        };
        xhttp.open("GET", "logginStudent?_user=" + username + "&password=" + password, true);
        xhttp.send();
    }

    function openLoginCompanyModal() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("modal-test").innerHTML = this.response;

                closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", closeModalf);
                openModalf();
                logginCBtnOK = document.getElementById("OKLogInComp");
                logginCBtnOK.addEventListener("click", LogInCompany);
            }

        };
        xhttp.open("GET", "loadLogInComp", true);
        xhttp.send();
    }
    function openLoginStudentModal() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("modal-test").innerHTML = this.response;

                closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", closeModalf);
                openModalf();
                logginSBtnOK = document.getElementById("OKLogInStudent");
                logginSBtnOK.addEventListener("click", LogInStudent);
            }

        };
        xhttp.open("GET", "loadLogInStudent", true);
        xhttp.send();
    }

    function openRegisterCompanyModal() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("modal-test").innerHTML = this.response;

                closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", closeModalf);

                RegCBtnOK = document.getElementById("okRegCompany");
                RegCBtnOK.addEventListener("click", checkValidRegCompanyInput);
                openModalf();
            }

        };
        xhttp.open("GET", "loadRegComp", true);
        xhttp.send();
    }
    function checkValidRegCompanyInput(){
        var cname = document.getElementById("nameC");
        var cuname = document.getElementById("unameC");
        var psw = document.getElementById("pswC");
        var ccity= document.getElementById("cityC");
        var cemail= document.getElementById("emailC");
        var caddress= document.getElementById("addressC");
        var psw2=document.getElementById("psw2C");
        inputs=[cname,caddress,ccity,cemail,cuname,psw,psw2];

        var i;
        var ok=1;
        for(i=0;i<inputs.length;i++){
            if(inputs[i].value==""){
                inputs[i].className="errInput";
                ok=0;
            }
            else{
                inputs[i].className="";
            }
        }
        if(ok===1){
            register_company();
        }
        else{
            document.getElementById("errorReg").innerHTML="*Fel input";
        }

        }
    function register_company() {
        console.log("click");
        var cname = document.getElementById("nameC").value;
        var cuname = document.getElementById("unameC").value;
        var psw = document.getElementById("pswC").value;
        var ccity= document.getElementById("cityC").value;
        var cemail= document.getElementById("emailC").value;
        var caddress= document.getElementById("addressC").value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("Fel");
                    document.getElementById("modal-test").innerHTML = "* Fel ";
                } else {
                    console.log("Du är nu registrerad");
                    window.location.replace("Company.html");
                    closeModal();
                }
            }
        }
        xhttp.open("POST", "register_company?cname=" + cname + "&psw=" + psw + "&cuname=" + cuname + "&caddress=" + caddress + "&cemail=" + cemail+ "&ccity=" + ccity, true);
        xhttp.send();
    }
    function openRegisterStudentModal() {
        console.log("hej");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("modal-test").innerHTML = this.response;
                closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", closeModalf);

                RegSBtnOK = document.getElementById("okRegStudent");
                RegSBtnOK.addEventListener("click", register_student);
                openModalf();
            }

        };
        xhttp.open("GET", "loadRegStudent", true);
        xhttp.send();
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
        if(document.getElementById("maleS").value===1){
            gender="male";
        } else{
            gender="female";
        }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("Fel");
                    document.getElementById("modal-test").innerHTML = "* Fel ";
                } else {
                    console.log("Du är nu registrerad");
                    window.location.replace("Student.html");
                    closeModal();
                }
            }
        }
        xhttp.open("POST", "register_student?ufname=" + ufname + "&ulname=" + ulname + "&ucity=" + ucity + "&uedu=" + uedu + "&uemail=" + uemail+ "&uname=" + uname + "&psw=" + psw + "&gender=" + gender, true);
        xhttp.send();
    }

    function closeModalf() {
        document.getElementById("modal-test").style.display = "none";
    }
    function openModalf() {
        document.getElementById("modal-test").style.display = "block";
    }

  
//#endregion
   //#region page-Content
    function showAboutUsInfo() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("option-page-content").innerHTML = this.response;
                document.getElementById("aboutUsInfo").style.display="block";
                work_Announcement=document.getElementById("workAnnouncement");
                workAnnouncements(3, "Rubrik", "vllbalblalb abllablalba lbalbla");
            }
        };
        xhttp.open("GET", "loadAboutUs", true);
        xhttp.send();
    }

    function showForCompaniesInfo() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("option-page-content").innerHTML = this.response;
               document.getElementById("forCompaniesInfo").style.display = "block";
            }
        };
        xhttp.open("GET", "loadForCompanies", true);
        xhttp.send();
    }

    function showForStudentsInfo() {
       var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("option-page-content").innerHTML = this.response;
               document.getElementById("forStudentsInfo").style.display = "block";
            }
        };
        xhttp.open("GET", "loadForStudents", true);
        xhttp.send();

    }


    function workAnnouncements(num, rubrik, information) {
        console.log(1);
        workAnnouncement = work_Announcement;

        for (var i = 0; i < num; i++) {
            var outerDiv = document.createElement("div");
            outerDiv.className = "jobs";
            console.log(1);

            var top = document.createElement("div"); //topbar
            top.className = "adTop";

            var logo = document.createElement("div");//div med plats för logga
            //var logga=document.createElement("imgage");//ladda in logga
            logo.className = "adLogo";
            var header = document.createElement("div");//rubrik
            header.className = "adHeader";

            var info = document.createElement("p");
            info.className = "adInfo";
            info.innerHTML = information;//här ska vi hämta info egentligen
            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");
            newh1.innerHTML = rubrik;//ladda in rubrik
            var readBtn = document.createElement("button");
            readBtn.innerHTML = "Läs mer";


            workAnnouncement.appendChild(outerDiv);
            outerDiv.appendChild(top);
            outerDiv.appendChild(info);
            outerDiv.appendChild(readBtn);
            readBtn.className = "bColorBlue mediumBtn margin25 floatRight darkerBlueOnHov";
            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);



        }


    }
    //#endregion
    showAboutUsInfo();


}

