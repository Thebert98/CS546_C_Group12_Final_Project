(function () {

    const myForm = document.getElementById("comm");
    let subjectInput = document.getElementById("subject");
    let descriptionInput = document.getElementById("description");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!subjectInput.value){
            event.preventDefault();
            valid = false
            subjectInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Subject must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(!descriptionInput.value){
            event.preventDefault();
            valid = false
            descriptionInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Description must be provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        let regex3 = /[^0-9a-z]/gi;
        if(subjectInput.value.match(regex3)){
            event.preventDefault();
            valid=false
            subjectInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Subject cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
    });
    }
})();
