(function () {

    const myForm = document.getElementById("login-form");
    let usernameInput = document.getElementById("username")
    let passwordInput = document.getElementById("password")
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true

        if(!usernameInput.value){
            event.preventDefault();
            valid = false
            usernameInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Username must be provided'
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
            errorDiv.innerHTML = 'Password must be provided'
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
        let regex3 = /[^0-9a-z]/gi;
        if(usernameInput.value.match(regex3)){
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
        let reg = /^\d+$/;
        if(usernameInput.value.match(reg)){
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
