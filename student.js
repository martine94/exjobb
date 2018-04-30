window.onload = function () {
    
        //#region buttons
        var interestsBtn=document.getElementById("interestsBtn");
        var mySPagesBtn=document.getElementById("mySPagesBtn");
        var recomendedJobBtn=document.getElementById("recomendedJobBtn");
    
        //#endregions
    
        //#region eventListeners
        interestsBtn.addEventListener("click",loadMyInterests);
        mySPagesBtn.addEventListener("click",loadMyProfile)
        recomendedJobBtn.addEventListener("click",loadMyRecomendedJobs)
        //#endregions
    
        //#region functions
        function loadMyInterests(){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("menu-page-content").innerHTML = this.response;
                }
            };
            xhttp.open("GET", "loadMyInterests", true);
            xhttp.send();
        }
    
    
        function loadMyProfile(){
            console.log("je");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("menu-page-content").innerHTML = this.response;
                }
            };
            xhttp.open("GET", "loadMySProfile", true);
            xhttp.send();
        }

        function loadMyRecomendedJobs(){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("menu-page-content").innerHTML = this.response;
                }
            };
            xhttp.open("GET", "loadMyRecomendedJobs", true);
            xhttp.send();
        }
        //#endregions
    
    }