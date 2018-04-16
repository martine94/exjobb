
window.onload=function(){
    
    //buttons
    var regBtn=document.getElementById("registerBtn");
    var regContainer=document.getElementById("registerContainer");
    var logInBtn=document.getElementById("logInBtn");
    var logInContainer=document.getElementById("logInContainer");
    var closeRegCompanyModal=document.getElementById("closeRegCompanyModal");
    var closeRegStudentModal=document.getElementById("closeRegStudentModal");
    var closeLoginModal=document.getElementById("closeLogInModal");
    var aboutBtn=document.getElementById("aboutBtn");
    var companyBtn=document.getElementById("companyBtn");
    var studentBtn=document.getElementById("studentBtn");
    var companyRegBtn=document.getElementById("companyRegBtn");
    var studentRegBtn=document.getElementById("studentRegBtn");
    //button events
    regBtn.addEventListener("mouseover", dropRegister);
    regBtn.addEventListener("mouseleave", hideRegister);
    
    regContainer.addEventListener("mouseover", dropRegister);
    regContainer.addEventListener("mouseleave", hideRegister);
    
    //regContainer.addEventListener("click",openRegisterModal);
    companyRegBtn.addEventListener("click",openRegisterCompanyModal);
    studentRegBtn.addEventListener("click",openRegisterStudentModal);
    
    
    logInBtn.addEventListener("mouseover", dropLogIn);
    logInBtn.addEventListener("mouseleave", hideLogIn);
    
    logInContainer.addEventListener("mouseover", dropLogIn);
    logInContainer.addEventListener("mouseleave", hideLogIn);
    logInContainer.addEventListener("click",openLogInModal);
    
    closeRegCompanyModal.addEventListener("click", closeRegisterCompanyModal);
    closeRegStudentModal.addEventListener("click", closeRegisterStudentModal);
    closeLoginModal.addEventListener("click", closeLogInModal);
    
    aboutBtn.addEventListener("click", showAboutUsInfo);
    companyBtn.addEventListener("click", showForCompaniesInfo);
    studentBtn.addEventListener("click", showForStudentsInfo);
    
    //button functions
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
    
    
    function openLogInModal() {
        document.getElementById("logInModal").style.display="block";
    }
    
    // When the user clicks on <span> (x), close the modal
    function closeLogInModal() {
         document.getElementById("logInModal").style.display="none";
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
    
    showAboutUsInfo();
    
    }

    testFunc = function(x){
        if(x === 'x')
            return 'x';
        else
            return 'y';
    }

if(typeof exports != 'undefined'){
    exports.testFunc = testFunc;
}