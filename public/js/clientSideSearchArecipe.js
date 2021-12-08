(function () {

    const myForm = document.getElementById("formForSearch");
    let searchRecipeInput = document.getElementById("searchrecipe");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!searchRecipeInput.value){
            event.preventDefault();
            valid = false
            searchRecipeInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Search Term must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
    });
    }
})();


