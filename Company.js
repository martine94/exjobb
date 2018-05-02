window.onload = function () {

    //#region buttons
    var newExJobBtn=document.getElementById("newExJobBtn");
    var myOffersBtn=document.getElementById("myOffersBtn");
    var myProfileBtn=document.getElementById("myProfileBtn");
    var myInfoBtn=document.getElementById("myInfoBtn");

    //#endregions

    //#region eventListeners
    newExJobBtn.addEventListener("click",loadNewExJob);
    myOffersBtn.addEventListener("click",loadMyOffers);
    myProfileBtn.addEventListener("click",loadMyProfile);
    myInfoBtn.addEventListener("click",loadMyInfo);
    //#endregions

    //#region functions
    function loadMyInfo(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadmyInfo", true);
        xhttp.send();
    }

    function loadNewExJob(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadNewExJob", true);
        xhttp.send();
    }

    function loadMyOffers(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadmyCOffers", true);
        xhttp.send();
    }
    function loadMyProfile(){
        console.log("hej123");
    }
    function changeInfo(){
        var cname = document.getElementById("c_Name").value;
        var cuname = document.getElementById("c_Uname").value;
        var psw = document.getElementById("c_Psw").value;
        var ccity= document.getElementById("c_City").value;
        var cemail= document.getElementById("c_Email").value;
        var caddress= document.getElementById("c_Address").value;
        var cweb= document.getElementById("c_WebP").value;
        var clogo= document.getElementById("c_Logo").value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("POST", "changeCompanyInfo?cname=" + cname + "&psw=" + psw + "&cuname=" + cuname + "&caddress=" + caddress + "&cemail=" + cemail+ "&ccity=" + ccity+"&cweb="+cweb+"&clogo="+clogo, true);
        xhttp.send();
    }
    function loadMyProfile(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;

               var saveBtn=document.getElementById('saveBtn');
               saveBtn.addEventListener("click",changeInfo);
               var cancelBtn=document.getElementById('cancelBtn');
               cancelBtn.addEventListener("click",loadMyInfo);
            }
        };
        xhttp.open("GET", "loadMyCPages", true);
        xhttp.send();
    }
    //#endregions

}