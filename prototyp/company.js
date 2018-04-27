
//var session =require('client-sessions'); //kommentera ut denna om ni inte har Sessions installerat
//var cookieParser=require('cookie-parser');
var db = require('mongo.js');

window.onload = function () {

    /* function getName(callback) {
         db.company.find({}, function (err, objs) {
             var returnable_name;
             if (objs.length == 1) {
                 returnable_name = objs[0].name;
                 console.log(returnable_name); // this prints "Renato", as it should
                 callback(returnable_name);
             }
         });
     }*/
    function getUserInfo() {
        var test = "";
        db.conn(function (err, database) {
            if (err) {
                res.sendStatus(500);
                console.log(err);
                return;
            }
        });
        test += JSON.stringify(db.collection('company').find());

        document.getElementById("companyDiv").innerHTML = ("<p>Hej</p>");


    }
}