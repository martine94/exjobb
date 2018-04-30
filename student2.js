
window.onload=function(){
    //buttons
    var cName=localStorage.getItem("Loginname"); //Detta är för att passa användarnamnet till nästa fönster.
    var studentInterests = document.getElementById('interests');
    var studentEdit = document.getElementById('edit');
    var studentRecomended = document.getElementById('recomended');
    var CloseEdit = document.getElementById('CloseEdit');
    var AddKeyWord = document.getElementById('AddKeyWord');
    //button events

    //company window
    studentInterests.addEventListener("click", (e)=>goToCompanysize(0));
    studentEdit.addEventListener("click", (e)=>goToCompanysize(1));
    studentRecomended.addEventListener("click", (e)=>goToCompanysize(2));
    CloseEdit.addEventListener("click", ClEd);
    AddKeyWord.addEventListener("click",addKeyWord);
    
    //button functions
    
    // When the user clicks on <span> (x), close the modal
    function goToCompanysize(choice){
        if(choice=== 0){
            alert("Intresse");
        }
        else if(choice === 1){
            document.getElementById("editInfo").style.display="block";
        }
        else if(choice === 2){
            alert("Rekomenderad");
        }
    }

    function addKeyWord(){
        var KeyWord=document.getElementById("KeyWords").value;
        var KeyWordList=document.getElementById("KeyWordList");
        var floatingBox=document.createElement('div');
        floatingBox.className="floating-box bColorBlue darkerBlueOnHov";
        floatingBox.innerHTML=KeyWord;
        var closeButton = document.createElement('button');
        closeButton.className = "closeButton";
        closeButton.innerHTML = "X";
        KeyWordList.appendChild(floatingBox);
        floatingBox.appendChild(closeButton);
    }

    // When the user clicks on <span> (x), close the modal    
    function ClEd() {
        document.getElementById("editInfo").style.display="none";
   }

    }