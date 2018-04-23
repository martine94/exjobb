
window.onload=function(){
    //buttons
    var cName=localStorage.getItem("Loginname"); //Detta är för att passa användarnamnet till nästa fönster.
    var companyAddAd = document.getElementById('ad');
    var companyAddOffers = document.getElementById('offers');
    var companyAddProfile = document.getElementById('profile');
    var closeCompAds = document.getElementById('closeCompAds');
    var AddKeyWord = document.getElementById('AddKeyWord');
    var AddProj = document.getElementById('addProj');
    var KeyList = [];
    // class Company{
    //     constructor(title, description,keyWords){
    //     this.title=title;
    //     this.description=description;
    //     this.keyWords=keyWords;
    //     }
    // }
    
    var keyWordStack= document.getElementById('KeyWordStack');
    var KeyWordList=document.getElementById("KeyWordList");
    var keyWord1= document.getElementById('KeyWord1');
    var keyWord2= document.getElementById('KeyWord2');
    var keyWord3= document.getElementById('KeyWord3');
    var keyWord4= document.getElementById('KeyWord4');
    var keyWord5= document.getElementById('KeyWord5');
    var keyWord6= document.getElementById('KeyWord6');
    var keyWord7= document.getElementById('KeyWord7');
    var keyWord8= document.getElementById('KeyWord8');
    var keyWord9= document.getElementById('KeyWord9');
    //button events

    //company window
    companyAddAd.addEventListener("click", (e)=>goToCompanysize(0));
    companyAddOffers.addEventListener("click", (e)=>goToCompanysize(1));
    companyAddProfile.addEventListener("click", (e)=>goToCompanysize(2));
    closeCompAds.addEventListener("click", closeCompanyAds);
    //keyWordStack.addEventListener('load',loadStack);
    keyWord1.addEventListener('click',(e)=>swapContainer(keyWord1, e));
    keyWord2.addEventListener('click',(e)=>swapContainer(keyWord2));
    keyWord3.addEventListener('click',(e)=>swapContainer(keyWord3));
    keyWord4.addEventListener('click',(e)=>swapContainer(keyWord4));
    keyWord5.addEventListener('click',(e)=>swapContainer(keyWord5));
    keyWord6.addEventListener('click',(e)=>swapContainer(keyWord6));
    keyWord7.addEventListener('click',(e)=>swapContainer(keyWord7));
    keyWord8.addEventListener('click',(e)=>swapContainer(keyWord8));
    keyWord9.addEventListener('click',(e)=>swapContainer(keyWord9));
    AddProj.addEventListener('click',(e)=>saveExamJob(AddProj));
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

    

    function removeKeyWord(e){
        e.parentNode.removeChild(e);
    }

    function infoKeyWord(e, visible){
        if(visible===1){
            e.innerHTML = "Klicka för att ta bort";
        }
        else if(visible === 0){
        e.innerHTML = "";
        }            
    }


    function addKeyWord(){
        var KeyWord=document.getElementById("KeyWords").value;
        if(KeyWord != ""){
        var floatingBox=document.createElement('div');
        floatingBox.className="floating-box bColorBlue darkerBlueOnHov";
        var paragraph = document.createElement('p');
        paragraph.innerHTML = "";        
        floatingBox.innerHTML=KeyWord;
        KeyWord.value = "";
        floatingBox.appendChild(paragraph);
        floatingBox.addEventListener('click', (e)=>removeKeyWord(floatingBox));
        floatingBox.addEventListener('mouseover', (e)=>infoKeyWord(paragraph, 1));
        floatingBox.addEventListener('mouseleave', (e)=>infoKeyWord(paragraph, 0));
        KeyWordList.appendChild(floatingBox);
        
    }
        
    }

    // When the user clicks on <span> (x), close the modal    
    function closeCompanyAds() {
        document.getElementById("CompanyAds").style.display="none";
   }

   function swapContainer(element, e){
   
       let occur = 0;
       //let a = "this :";
       console.log(keyWordStack);
       console.log(e);
       let stackSize = keyWordStack.childElementCount;

    
       if(element.className === "floating-box2"){
            KeyList.push(element.innerHTML);
            element.className = "floating-box3";
            KeyWordList.appendChild(element);
            KeyWordStack.removeChild(element);        
            console.log(element);
       }
       else if(element.className === "floating-box3"){ 
           let index = 0;
            for(let i = 0; i < KeyList.length; i++){
                if(KeyList[i] === element.innerHTML)
                    index = i;
            }
            element.className = "floating-box2";
            KeyList.splice(index,1);
            keyWordStack.appendChild(element);
            KeyWordList.removeChild(element);
            
            console.log(element);  
       }

   }

   function saveExamJob(){
       alert(KeyList);

    
    var c1 = new Company();
   }

    }