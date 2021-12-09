(function () {

    const myForm = document.getElementById("formForEditUser");
    let bioInput = document.getElementById("bio");
    let favRecipeInput = document.getElementById("favouriteRecipe");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        console.log("here")
        valid = true
        if(!bioInput.value){
            event.preventDefault();
            valid = false
            bioInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'BIO must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(!favRecipeInput.value){
            event.preventDefault();
            valid = false
            favRecipeInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Favourite Recipe must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
    });
    }
})();


