
window.onload=function(){
    //buttons
    var cName=localStorage.getItem("Loginname"); //Detta är för att passa användarnamnet till nästa fönster.
    var companyAddAd = document.getElementById('ad');
    var companyAddOffers = document.getElementById('offers');
    var companyAddProfile = document.getElementById('profile');
    var closeCompAds = document.getElementById('closeCompAds');
    var AddKeyWord = document.getElementById('AddKeyWord');
    //button events

    //company window
    companyAddAd.addEventListener("click", (e)=>goToCompanysize(0));
    companyAddOffers.addEventListener("click", (e)=>goToCompanysize(1));
    companyAddProfile.addEventListener("click", (e)=>goToCompanysize(2));
    closeCompAds.addEventListener("click", closeCompanyAds);
    AddKeyWord.addEventListener("click",addKeyWord);
    
    //button functions
    
    // When the user clicks on <span> (x), close the modal
    function goToCompanysize(choice){
        if(choice=== 0){
            document.getElementById("CompanyAds").style.display="block";
        }
        else if(choice === 1){
            alert("Erbjudande 1");
        }
        else if(choice === 2){
            alert("Redigera 2");
        }
    }

    function addKeyWord(){
        var KeyWord=document.getElementById("KeyWords").value;
        if(KeyWord != ""){
        var KeyWordList=document.getElementById("KeyWordList");
        var floatingBox=document.createElement('div');
        floatingBox.className="floating-box";
        
        var closeButton = document.createElement('span');
        closeButton.className = "close";
        floatingBox.append(closeButton);
        floatingBox.innerHTML=KeyWord;
        
        KeyWordList.appendChild(floatingBox);
        for(let i = 0; i < KeyWordList.childElementCount; i++){
            alert(KeyWordList.childNodes[i]);
        }
    }
        
    }

    // When the user clicks on <span> (x), close the modal    
    function closeCompanyAds() {
        document.getElementById("CompanyAds").style.display="none";
   }

    }