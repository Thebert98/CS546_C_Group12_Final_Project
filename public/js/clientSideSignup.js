(function () {

    const myForm = document.getElementById("signup-form");
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let firstNameInput = document.getElementById("firstname");
    let lastNameInput = document.getElementById("lastname");
    let phoneNumberInput = document.getElementById("phonenumber");

    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!usernameInput.value){
            event.preventDefault();
            valid = false
            usernameInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Username not provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(!passwordInput.value){
            event.preventDefault();
            valid = false
            passwordInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Password not provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        if(!firstNameInput.value){
            event.preventDefault();
            valid = false
            firstNameInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'First Name not provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        if(!lastNameInput.value){
            event.preventDefault();
            valid = false
            lastNameInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Last Name not provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        if(!phoneNumberInput.value){
            event.preventDefault();
            valid = false
            phoneNumberInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Phone Number must be provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        if(usernameInput.value.length<4){
            event.preventDefault();
            valid=false
            usernameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML = 'Length of the username should be atleast 4'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(passwordInput.value.length<6){
            event.preventDefault();
            valid=false
            passwordInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML = 'Length of the password should be atleast 6'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(usernameInput.value.indexOf(' ')>=0){
            event.preventDefault();
            valid=false;
            usernameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Username must not have empty spaces'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(passwordInput.value.indexOf(' ')>=0){
            event.preventDefault();
            valid=false
            passwordInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Password cannot have empty spaces'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(firstNameInput.value.indexOf(' ')>=0){
            event.preventDefault();
            valid=false
            firstNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='First Name cannot have empty spaces'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(lastNameInput.value.indexOf(' ')>=0){
            event.preventDefault();
            valid=false
            lastNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Last Name cannot have empty spaces'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(phoneNumberInput.value.indexOf(' ')>=0){
            event.preventDefault();
            valid=false
            phoneNumberInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Phone Number cannot have empty spaces'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        let regex4 = /[^0-9a-z]/gi;
        if(usernameInput.value.match(regex4)){
            event.preventDefault();
            valid=false
            usernameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Username cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(firstNameInput.value.match(regex4)){
            event.preventDefault();
            valid=false
            firstNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='First Name cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(lastNameInput.value.match(regex4)){
            event.preventDefault();
            valid=false
            lastNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Last Name cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(phoneNumberInput.value.match(regex4)){
            event.preventDefault();
            valid=false
            phoneNumberInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Phone Number cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(phoneNumberInput.value.length != 10){
            event.preventDefault();
            valid=false
            phoneNumberInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Phone Number can only have 10 digits'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        let regex2 = /^[0-9]*$/;
        if(!phoneNumberInput.value.match(regex2)){
            event.preventDefault();
            valid=false
            phoneNumberInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Phone Number must only contain numbers'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        let regex = /\d/;
        if(firstNameInput.value.match(regex)){
            event.preventDefault();
            valid=false
            firstNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='First Name cannot contain numbers'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(lastNameInput.value.match(regex)){
            event.preventDefault();
            valid=false
            lastNameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Last Name cannot contain numbers'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        let rege = /^\d+$/;
        if(usernameInput.value.match(rege)){
            event.preventDefault();
            valid=false
            usernameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Username cannot only contain numbers'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
    });
    }
})();
