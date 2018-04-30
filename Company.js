window.onload = function () {

    //#region buttons
    var newExJobBtn=document.getElementById("newExJobBtn");
    var myOffersBtn=document.getElementById("myOffersBtn");
    var myProfileBtn=document.getElementById("myProfileBtn");

    //#endregions

    //#region eventListeners
    newExJobBtn.addEventListener("click",loadNewExJob);
    myOffersBtn.addEventListener("click",loadMyOffers)
    myProfileBtn.addEventListener("click",loadMyProfile)
    //#endregions

    //#region functions
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
    function loadMyProfile(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("menu-page-content").innerHTML = this.response;
            }
        };
        xhttp.open("GET", "loadMyCPages", true);
        xhttp.send();
    }
    //#endregions

}