
window.onload=function(){
    //buttons
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
    //var companyAddAd = document.getElementById('ad');
    //var companyAddOffers = document.getElementById('offers');
    //var companyAddProfile = document.getElementById('profile');
    
                        // var cName = document.getElementById("companyName");
    //button events
    regBtn.addEventListener("mouseover", dropRegister);
    regBtn.addEventListener("mouseleave", hideRegister);
    
    regContainer.addEventListener("mouseover", dropRegister);
    regContainer.addEventListener("mouseleave", hideRegister);
    
    //regContainer.addEventListener("click",openRegisterModal);
    companyRegBtn.addEventListener("click",openRegisterCompanyModal);
    studentRegBtn.addEventListener("click",openRegisterStudentModal);
    
    companyLoginBtn.addEventListener("click",openLoginCompanyModal);
    studentLoginBtn.addEventListener("click",openLoginStudentModal);

    logInBtn.addEventListener("mouseover", dropLogIn);
    logInBtn.addEventListener("mouseleave", hideLogIn);
    
    logInContainer.addEventListener("mouseover", dropLogIn);
    logInContainer.addEventListener("mouseleave", hideLogIn);
    //logInContainer.addEventListener("click",openLogInModal);
    
    closeRegCompanyModal.addEventListener("click", closeRegisterCompanyModal);
    closeRegStudentModal.addEventListener("click", closeRegisterStudentModal);
    closeLICompanyModal.addEventListener("click", closeLogInCompanyModal);
    closeLIStudentModal.addEventListener("click", closeLogInStudentModal);
    
    
    aboutBtn.addEventListener("click", showAboutUsInfo);
    companyBtn.addEventListener("click", showForCompaniesInfo);
    studentBtn.addEventListener("click", showForStudentsInfo);

    //company window
    //companyAddAd.addEventListener("click", goToCompanysize(0));
    //companyAddOffers.addEventListener("click", goToCompanysize(1));
    //companyAddProfile.addEventListener("click", goToCompanysize(2));
    
    //button functions
   
    function dropRegister(){
                            //    alert(cName);
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
    
    // When the user clicks on <span> (x), close the modal
    function closeRegisterCompanyModal() {
         document.getElementById("registerCompanyModal").style.display="none";
    }
    function closeRegisterStudentModal() {
         document.getElementById("registerStudentModal").style.display="none";
    }
    
    //kan vara redundant
    // function openLogInModal() {

        // document.getElementById("logInModal").style.display="block";
    // }
    
    // When the user clicks on <span> (x), close the modal
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


    function workAnnouncement(num){
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
           info.innerHTML="information om jobbet blablalbla....";//här ska vi hämta info egentligen
           var newlog=document.createElement("p");
           newlog.innerHTML="logga";
            var newh1=document.createElement("h2");
           newh1.innerHTML="Rubrik "+(i+1);//ladda in rubrik
           var readBtn=document.createElement("button");
           readBtn.innerHTML="Läs mer";

           
           workAnnouncement.appendChild(outerDiv);
           outerDiv.appendChild(top);
           outerDiv.appendChild(info);
           outerDiv.appendChild(readBtn);
           readBtn.className="bColorBlue menuBtn txtCenter floatRight";
           top.appendChild(logo);
           top.appendChild(header);
           logo.appendChild(newlog);
           header.appendChild(newh1);

           
       
        }


}     
    workAnnouncement(3);

    showAboutUsInfo();


    }

