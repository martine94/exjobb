
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
    var searchInput = document.getElementById("searchInput");

    //#region buttons that don't exist on load
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

    searchInput.addEventListener("keypress", function(event) {
        console.log(event.keyCode);
        if (event.keyCode == 13){
            //sök efter jobb
        var a=document.createElement("div");
        a.className="information";      
        var b=document.getElementById("option-page-content");
        b.innerHTML="";
        b.appendChild(a);

        a.innerHTML="Tyvärr har vi inga examensjobb som matchar din sökning för tilfället! "+'<br>'+'<br>'+
        "Men registra gärna ett konto för att lättare hålla koll på när det kommer ut ett arbete som matchar dina kriterier.";
  

        }

    });

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

                var jobb=
                [["https://vignette.wikia.nocookie.net/logopedia/images/c/c4/Saab_logo.png/revision/latest?cb=20110725204741",
                "SAAB", "Är du i början av din karriär och söker efter spännande karriärmöjligheter? Vill du utveckla och bredda dina kunskaper i mjukvaruutveckling i ett ledande och storslaget företag? Tag då chansen att bli en del av Saab och utveckla Cockpit i Gripen E!Om företagetSaab är ett globalt försvars- och säkerhetsföretag verksamt inom flyg-, land- och marinförsvar, civil säkerhet och kommersiell flygteknik."],
            ["https://informedinfrastructure.com/wp-content/uploads/2017/03/atlascorp-e1493039342950.png","Atlas Copco","Är du utvecklaren med förkärlek för stora maskiner och avancerad teknik? Hos Epiroc har du då möjlighet att leva ut dina intressen till fullo när de nu söker utvecklare till deras nya avdelning Platform Development, avdelningen där man jobbar med att synka en fungerande plattform för samtliga Epirocs maskiner. "]
            ];
                workAnnouncements(2,jobb);
               
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

    function workAnnouncements(num, jobb) {
        console.log(jobb);
        workAnnouncement = work_Announcement;

        for (var i = 0; i < num; i++) {
            
            var outerDiv = document.createElement("div");
            outerDiv.className = "jobs";

            var top = document.createElement("div"); //topbar
            top.className = "adTop";

            var logo=document.createElement("img");//ladda in logga
            
            logo.className = "adLogo";
            var header = document.createElement("div");//rubrik
            header.className = "adHeader";

            var info = document.createElement("div");
            info.className = "adInfo";
           
            var newlog = document.createElement("p");
            newlog.innerHTML = "logga";
            var newh1 = document.createElement("h2");
           
            var readBtn = document.createElement("button");
            readBtn.innerHTML = "Läs mer";


            workAnnouncement.appendChild(outerDiv);
            workAnnouncement.appendChild(document.createElement("br"));
            outerDiv.appendChild(top);
            outerDiv.appendChild(info);
            outerDiv.appendChild(readBtn);
            readBtn.className = "bColorBlue mediumBtn margin25 floatRight darkerBlueOnHov";
            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);
             
            logo.src=jobb[i][0]; //ladda in logga
            newh1.innerHTML = jobb[i][1];//ladda in rubrik
            info.innerHTML = jobb[i][2];//här ska vi hämta info egentligen
            
        }


    }
    
    //#endregion
   
    showAboutUsInfo();


}

