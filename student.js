window.onload = function () {
    
        //#region buttons
        var interestsBtn=document.getElementById("interestsBtn");
        var mySPagesBtn=document.getElementById("mySPagesBtn");
        var recomendedJobBtn=document.getElementById("recomendedJobBtn");
        var mySInfoBtn=document.getElementById("myInfoBtn")
    
        //#endregions
    
        //#region eventListeners
        interestsBtn.addEventListener("click",loadMyInterests);
        mySPagesBtn.addEventListener("click",loadMyProfile)
        recomendedJobBtn.addEventListener("click",loadMyRecomendedJobs)
        mySInfoBtn.addEventListener("click",loadMyInfo)
        //#endregions
    
        //#region functions
        function loadMyInfo(){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                   document.getElementById("menu-page-content").innerHTML = this.response;
                   
                   
                   listUserDataFromDB(); //genererar användarinfo
                }
            };
            xhttp.open("GET", "loadMyInfo", true);
            xhttp.send();
        }

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
        function listUserDataFromDB(){
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function(res){
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    removeBrace = this.responseText.replace(/[\[\]']+/g, "");
                    var obj=JSON.parse(removeBrace);
                    var user={
                        id: obj._id,
                        name: obj.name,
                        ulname: obj.lastname,
                        edu: obj.ueducation,
                        email: obj.uemail,
                        pw: obj.password
                    }
                    document.getElementById("idS").innerHTML += user.id;
                    document.getElementById("ufnameS").innerHTML += user.name;
                    document.getElementById("ulnameS").innerHTML += user.ulname;
                    document.getElementById("eduS").innerHTML += user.edu;
                    document.getElementById("emailS").innerHTML += user.email;
                }
            };
            xhttp.open("GET","userDataFromDBStudent",true)
            xhttp.send();
        }

        //#endregions
    
    }