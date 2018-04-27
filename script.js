
window.onload=function(){

    //#region buttons
    var regBtn=document.getElementById("registerBtn");
    var cName=document.getElementById("CompName");
    var regContainer=document.getElementById("registerContainer");
    var logInBtn=document.getElementById("logInBtn");
    var logInContainer=document.getElementById("logInContainer");
    var closeRegCompanyModal=document.getElementById("closeRegCompanyModal");
    var closeRegStudentModal=document.getElementById("closeRegStudentModal");
    var closeLIStudentModal=document.getElementById("closeLIStudentModal");
    var closeLICompanyModal=document.getElementById("closeLICompanyModal");
    var aboutBtn=document.getElementById("aboutBtn");
    var companyBtn=document.getElementById("companyBtn");
    var studentBtn=document.getElementById("studentBtn");
    var companyRegBtn=document.getElementById("companyRegBtn");
    var studentRegBtn=document.getElementById("studentRegBtn");
    var companyLoginBtn=document.getElementById("companyLoginBtn");
    var studentLoginBtn=document.getElementById("studentLoginBtn");
    var studentLoginBtn=document.getElementById("studentLoginBtn");
    //#endregion
   
    //#region eventlisteners
    regBtn.addEventListener("mouseover", dropRegister);
    regBtn.addEventListener("mouseleave", hideRegister);
    regContainer.addEventListener("mouseover", dropRegister);
    regContainer.addEventListener("mouseleave", hideRegister);
    companyRegBtn.addEventListener("click",openRegisterCompanyModal);
    studentRegBtn.addEventListener("click",openRegisterStudentModal);  
    companyLoginBtn.addEventListener("click",openLoginCompanyModal);
    studentLoginBtn.addEventListener("click",openLoginStudentModal);
    logInBtn.addEventListener("mouseover", dropLogIn);
    logInBtn.addEventListener("mouseleave", hideLogIn);
    logInContainer.addEventListener("mouseover", dropLogIn);
    logInContainer.addEventListener("mouseleave", hideLogIn);
    closeRegCompanyModal.addEventListener("click", closeRegisterCompanyModal);
    closeRegStudentModal.addEventListener("click", closeRegisterStudentModal);
    closeLICompanyModal.addEventListener("click", closeLogInCompanyModal);
    closeLIStudentModal.addEventListener("click", closeLogInStudentModal);
    aboutBtn.addEventListener("click", showAboutUsInfo);
    companyBtn.addEventListener("click", showForCompaniesInfo);
    studentBtn.addEventListener("click", showForStudentsInfo);
    okRegCompany.addEventListener("click",checkPasswordCompany);
    //#endregion
    
    function checkPasswordCompany(){
        if(document.getElementById("pswC").value!=document.getElementById("psw2C").value){
            document.getElementById("psw2C").value="";
            document.getElementById("psw2C").placeholder="Fel lösenord";
        }
    }   
    function dropRegister(){
        document.getElementById("registerContainer").style.display="block";
    }
    
    function hideRegister(){
        document.getElementById("registerContainer").style.display="none";	
    }
    
    function dropLogIn(){
            document.getElementById("logInContainer").style.display="block";
    }
    
    function hideLogIn(){
            document.getElementById("logInContainer").style.display="none";
    }
    

    function openLoginCompanyModal() {
        document.getElementById("LoginCompanyModal").style.display="block";
        let cName = document.getElementsByName('CompName').value;
        localStorage.setItem('Loginname', 'Eskil');
    }

    function openLoginStudentModal() {
        document.getElementById("LoginStudentModal").style.display="block";
    }

    function openRegisterCompanyModal() {
        document.getElementById("registerCompanyModal").style.display="block";
    }
    function openRegisterStudentModal() {
        document.getElementById("registerStudentModal").style.display="block";
    }

    function closeRegisterCompanyModal() {
         document.getElementById("registerCompanyModal").style.display="none";
    }
    function closeRegisterStudentModal() {
         document.getElementById("registerStudentModal").style.display="none";
    }
    
    function closeLogInCompanyModal() {
         document.getElementById("LoginCompanyModal").style.display="none";
    }

    function closeLogInStudentModal() {
        document.getElementById("LoginStudentModal").style.display="none";
    }

    function showAboutUsInfo() {
        
        document.getElementById("forStudentsInfo").style.display="none";
        document.getElementById("forCompaniesInfo").style.display="none";
    
        document.getElementById("aboutUsInfo").style.display="block";
    }
    
    function showForCompaniesInfo() {
         document.getElementById("aboutUsInfo").style.display="none";
         document.getElementById("forStudentsInfo").style.display="none";
    
        document.getElementById("forCompaniesInfo").style.display="block";
    }
    
    function showForStudentsInfo() {
        document.getElementById("aboutUsInfo").style.display="none";
        document.getElementById("forCompaniesInfo").style.display="none";
    
        document.getElementById("forStudentsInfo").style.display="block";
         
    }


    function workAnnouncement(num, rubrik, information){
        console.log(1);
        workAnnouncement=document.getElementById("workAnnouncement");
        
        for(var i =0; i< num; i++){
            var outerDiv=document.createElement("div");
            outerDiv.className="jobs";
            console.log(1);
        
            var top=document.createElement("div"); //topbar
            top.className="adTop";
            
            var logo=document.createElement("div");//div med plats för logga
            //var logga=document.createElement("imgage");//ladda in logga
            logo.className="adLogo";
            var header=document.createElement("div");//rubrik
            header.className="adHeader";

            var info=document.createElement("p");
            info.className="adInfo";
           info.innerHTML=information;//här ska vi hämta info egentligen
           var newlog=document.createElement("p");
           newlog.innerHTML="logga";
            var newh1=document.createElement("h2");
           newh1.innerHTML=rubrik;//ladda in rubrik
           var readBtn=document.createElement("button");
           readBtn.innerHTML="Läs mer";

           
           workAnnouncement.appendChild(outerDiv);
           outerDiv.appendChild(top);
           outerDiv.appendChild(info);
           outerDiv.appendChild(readBtn);
           readBtn.className="bColorBlue mediumBtn margin25 floatRight darkerBlueOnHov";
           top.appendChild(logo);
           top.appendChild(header);
           logo.appendChild(newlog);
           header.appendChild(newh1);

           
       
        }


}     
    workAnnouncement(3,"Rubrik","vllbalblalb abllablalba lbalbla");

    showAboutUsInfo();


    }

