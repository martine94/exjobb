window.onload=function(){

    function listUserData(){
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if (this.readyState == 4 && this.status == 200) {
                var modString=this.response.replace(/["']/g, "");
                var split=modString.split(",");
                var sid=split[0].split(":");
                var sname=split[1].split(":");
                var saddress=split[2].split(":");
                var scity=split[3].split(":");
                var semail=split[4].split(":");
                var spw=split[5].split(":");

                var user={
                    id: sid[1],
                    name: sname[1],
                    address: saddress[1],
                    city: scity[1],
                    email: semail[1],
                    pw: spw[1]
                }
                document.getElementById("cId").innerHTML += user.id;
                document.getElementById("cName").innerHTML += user.name;
                document.getElementById("cCity").innerHTML += user.city;
                document.getElementById("cAddress").innerHTML += user.address;
                document.getElementById("cEmail").innerHTML += user.email;


            }
        };
        xhttp.open("GET","userData",true)
        xhttp.send();
    }
    listUserData();
}