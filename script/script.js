
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
                var reglink=document.getElementById("regLinkC");
                reglink.addEventListener("click",openRegisterCompanyModal);
            }

        };
        xhttp.open("GET", "loadFileIndex?p="+'/logInComp.html', true);    
        // xhttp.open("GET", "loadLogInComp", true);
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
                var reglink=document.getElementById("regLinkS");
                reglink.addEventListener("click",openRegisterStudentModal);
            }

        };
        xhttp.open("GET", "loadFileIndex?p="+'/logInStudent.html', true);    
        // xhttp.open("GET", "loadLogInStudent", true);
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

        // xhttp.open("GET", "loadRegComp", true);
        //"logginStudent?_user=" + username + "&password=" 
        xhttp.open("GET", "loadFileIndex?p="+'/regCompany.html', true);        
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
                    document.getElementById("errorReg").innerHTML="*Användarnamnet är upptaget!";
                    document.getElementById("unameC").value="";
                    // document.getElementById("modal-test").innerHTML = "* Fel ";
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
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("modal-test").innerHTML = this.response;
                closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", closeModalf);

                RegSBtnOK = document.getElementById("okRegStudent");
                RegSBtnOK.addEventListener("click", checkValidRegStudentInput);
                openModalf();
            }

        };
        //xhttp.open("GET", "loadRegStudent", true);
        xhttp.open("GET", "loadFileIndex?p="+'/regStudent.html', true);    
        xhttp.send();
    }
    function checkValidRegStudentInput(){
        var ufname = document.getElementById("ufnameS");
        var ulname = document.getElementById("ulnameS");
        var ucity = document.getElementById("ucityS");
        var uedu= document.getElementById("ueducationS");
        var uemail= document.getElementById("uemailS");
        var uname= document.getElementById("unameS");
        var psw= document.getElementById("pswS");

        inputs=[ufname,ulname,ucity,uedu,uemail,uname,psw];

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
        // if(psw.value!=psw2.value){
        //     document.getElementById("errorReg").innerHTML+=" *Lösenorden stämmer inte överens.";
        //     psw2.value="";
        //     ok=0;
        //     console.log(document.getElementById("errorReg").innerHTML);
        // }

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
        var keywords = "";
        var cv = ""

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response === "false") {
                    console.log("Fel");
                    document.getElementById("errorReg").innerHTML="*Användarnamnet upptaget!";
                    document.getElementById("unameS").value="";
                } else {
                    console.log("Du är nu registrerad");
                    window.location.replace("Student.html");
                    closeModal();
                }
            }
        }
        xhttp.open("POST", "register_student?ufname=" + ufname + "&ulname=" + ulname + "&ucity=" + ucity + "&uedu=" + uedu 
        + "&uemail=" + uemail+ "&uname=" + uname + "&psw=" + psw +  "&keywords=" + keywords + "&cv" + cv, true);
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
               
               
               //skriv en funktion som söker efter jobb i databasen 
                var jobb=
                [["https://vignette.wikia.nocookie.net/logopedia/images/c/c4/Saab_logo.png/revision/latest?cb=20110725204741",
                "SAAB", "Är du i början av din karriär och söker efter spännande karriärmöjligheter? Vill du utveckla och bredda dina kunskaper i mjukvaruutveckling i ett ledande och storslaget företag? Tag då chansen att bli en del av Saab och utveckla Cockpit i Gripen E!Om företagetSaab är ett globalt försvars- och säkerhetsföretag verksamt inom flyg-, land- och marinförsvar, civil säkerhet och kommersiell flygteknik."],
            ["https://informedinfrastructure.com/wp-content/uploads/2017/03/atlascorp-e1493039342950.png","Atlas Copco","Är du utvecklaren med förkärlek för stora maskiner och avancerad teknik? Hos Epiroc har du då möjlighet att leva ut dina intressen till fullo när de nu söker utvecklare till deras nya avdelning Platform Development, avdelningen där man jobbar med att synka en fungerande plattform för samtliga Epirocs maskiner. "]
            ];
               // workAnnouncements(2,jobb);
               getJobsFromDB();
            }
        };
        xhttp.open("GET", "loadFileIndex?p="+'/about.html', true);    
        // xhttp.open("GET", "loadAboutUs", true);
        xhttp.send();
    }

    function getJobsFromDB(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              // document.getElementById("option-page-content").innerHTML = this.response;
                console.log("JOBB HÄMTADE");
                var jobs=JSON.parse(this.response);
                workAnnouncements(jobs.length,jobs);

            }
        };
        xhttp.open("GET", "getJobsFromDB", true);
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
        xhttp.open("GET", "loadFileIndex?p="+'/forCompanies.html', true);    
        // xhttp.open("GET", "loadForCompanies", true);
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
        xhttp.open("GET", "loadFileIndex?p="+'/forStudents.html', true);    
        // xhttp.open("GET", "loadForStudents", true);
        xhttp.send();

    }
    function workAnnouncements(num, jobb) {
        workAnnouncement = work_Announcement;

        for (var i = 0; i < num; i++) {
            
            var outerDiv = document.createElement("div");
            outerDiv.className = "jobs";

            var top = document.createElement("div"); //topbar
            top.className = "jobTop";

            var logo=document.createElement("img");//ladda in logga
            
            logo.className = "jobLogo";
            var header = document.createElement("div");//rubrik
            header.className = "jobHeader";

            var info = document.createElement("div");
            info.className = "jobInfo";
           
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
            readBtn.className = "bColorBlue mediumBtn floatRight darkerBlueOnHov";
            top.appendChild(logo);
            top.appendChild(header);
            logo.appendChild(newlog);
            header.appendChild(newh1);
             
            logo.src=jobb[i].logoURL; //ladda in logga
            newh1.innerHTML = jobb[i].tile;//ladda in rubrik
            info.innerHTML = jobb[i].shortdesc;//ladda in beskrivning
            readBtn.addEventListener("click",openLoginStudentModal);           
        }
    }
    
    //#endregion
   
    showAboutUsInfo();


}

