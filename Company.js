
window.onload=function(){
    //buttons
    var visit = 0;
    var cName=localStorage.getItem("Loginname"); //Detta är för att passa användarnamnet till nästa fönster.
    var companyAddAd = document.getElementById('ad');
    var companyAddOffers = document.getElementById('offers');
    var companyAddProfile = document.getElementById('profile');
    var closeCompAds = document.getElementById('closeCompAds');
    var AddKeyWord = document.getElementById('AddKeyWord');
    var AddProj = document.getElementById('addProj');
    var title = document.getElementById('Headline');
    var subject = document.getElementById('Subject');
    var KeyList = [];
    class Company{
        constructor(title, description,keyWords){
        this.title=title;
        this.description=description;
        this.keyWords=keyWords;
        }
        print(){
            let str = "";
            str+="Title: " + this.title + "\n";
            str+="Subject: " + this.description + "\n";
            str+= this.keyWords.toString() + "\n";
            return str;
        }
    }
    
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
    var addToInterists = document.getElementsByClassName('floating-box2');    
    var programmingLanguage = document.getElementById('ProgrammingLanguage');
    //programmingLanguage.children().hide();  
    //button events

    //company window
    companyAddAd.addEventListener("click", (e)=>goToCompanysize(0));
    companyAddOffers.addEventListener("click", (e)=>goToCompanysize(1));
    companyAddProfile.addEventListener("click", (e)=>goToCompanysize(2));
    closeCompAds.addEventListener("click", closeCompanyAds);
    //keyWordStack.addEventListener('load',loadStack);

    keyWord1.addEventListener('click',(e)=>swapContainer(keyWord1, e));
    // keyWord1.addEventListener('mouseover', (e)=>infoKeyWord(keyWord1, 1));
    // keyWord1.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord1, 0));
    keyWord2.addEventListener('click',(e)=>swapContainer(keyWord2));
    // keyWord2.addEventListener('mouseover', (e)=>infoKeyWord(keyWord2, 1));
    // keyWord2.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord2, 0));
    keyWord3.addEventListener('click',(e)=>swapContainer(keyWord3));
    // keyWord3.addEventListener('mouseover', (e)=>infoKeyWord(keyWord3, 1));
    // keyWord3.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord3, 0));
    keyWord4.addEventListener('click',(e)=>swapContainer(keyWord4));
    // keyWord4.addEventListener('mouseover', (e)=>infoKeyWord(keyWord4, 1));
    // keyWord4.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord4, 0));
    keyWord5.addEventListener('click',(e)=>swapContainer(keyWord5));
    // keyWord5.addEventListener('mouseover', (e)=>infoKeyWord(keyWord5, 1));
    // keyWord5.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord5, 0));
    keyWord6.addEventListener('click',(e)=>swapContainer(keyWord6));
    // keyWord6.addEventListener('mouseover', (e)=>infoKeyWord(keyWord6, 1));
    // keyWord6.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord6, 0));
    keyWord7.addEventListener('click',(e)=>swapContainer(keyWord7));
    // keyWord7.addEventListener('mouseover', (e)=>infoKeyWord(keyWord7, 1));
    // keyWord7.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord7, 0));
    keyWord8.addEventListener('click',(e)=>swapContainer(keyWord8));
    // keyWord8.addEventListener('mouseover', (e)=>infoKeyWord(keyWord8, 1));
    // keyWord8.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord8, 0));
    keyWord9.addEventListener('click',(e)=>swapContainer(keyWord9));
    // keyWord9.addEventListener('mouseover', (e)=>infoKeyWord(keyWord9, 1));
    // keyWord9.addEventListener('mouseleave', (e)=>infoKeyWord(keyWord9, 0));
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
        let index;
        for(let i = 0; i < e.childElementCount;i++){

        }
        if(e.className === "floating-box2"){
        if(visible === 1 && visit === 0){
            visit++;
            var p =document.createElement('p');
            p.id = "para";
            p.innerHTML = "Klicka -> Lägg till";
            e.appendChild(p);
        }
        else{
            let p = document.getElementById('para');
            p.parentElement.removeChild(p);
            visit = 0;
        }
    }
    else{
        if(visible === 1 && visit === 0){
            visit++;
            var p =document.createElement('p');
            p.id = "para";
            p.innerHTML = "Klicka -> Ta bort";
            e.appendChild(p);
        }
        else{
            let p = document.getElementById('para');
            p.parentElement.removeChild(p);
            visit = 0;
        }
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
            visit = 0;       
            console.log(element);
       }
       else if(element.className === "floating-box3"){ 
           let index = 0;
            for(let i = 0; i < KeyList.length; i++){
                if(KeyList[i] === element.innerHTML)
                    index = i;
            }
            element.className = "floating-box2";
            visit = 0;       
            KeyList.splice(index,1);
            keyWordStack.appendChild(element);
            KeyWordList.removeChild(element);
            
            console.log(element);  
       }

   }

   function saveExamJob(){    
    var c1 = new Company(title.value, subject.value, KeyList);
    alert(c1.print());
   }

    }