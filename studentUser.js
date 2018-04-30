window.onload=function(){

    function listUserData(){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if (this.readyState == 4 && this.status == 200) {
                var modString=this.response.replace(/["']/g, "");
                var split=modString.split(",");
                var sid=split[0].split(":");
                var sname=split[1].split(":");
                var slname=split[2].split(":");
                var sedu=split[3].split(":");
                var semail=split[4].split(":");
                var spw=split[5].split(":");

                var user={
                    id: sid[1],
                    name: sname[1],
                    ulname: slname[1],
                    edu: sedu[1],
                    email: semail[1],
                    pw: spw[1]
                }
                document.getElementById("idS").innerHTML += user.id;
                document.getElementById("ufnameS").innerHTML += user.name;
                document.getElementById("ulnameS").innerHTML += user.ulname;
                document.getElementById("eduS").innerHTML += user.edu;
                document.getElementById("emailS").innerHTML += user.email;
            }
        };
        xhttp.open("GET","userData",true)
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
    //listUserData();
    listUserDataFromDB();
}