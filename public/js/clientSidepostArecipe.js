(function () {

    const myForm = document.getElementById("post-a-recipe-form");
    let recipenameInput = document.getElementById("recipeName");
    let recipedescriptionInput = document.getElementById("recipeDescription");
    let ingredientsInput = document.getElementById("ingredients");
    let preppingdirectionInput = document.getElementById("preppingDirections");
    let cookingdirectionsInput = document.getElementById("cookingDirections");
    let postaPic = document.getElementById("avatar");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!recipenameInput.value ){
            event.preventDefault();
            valid = false
            recipenameInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Recipe Name must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(!postaPic.value){
            event.preventDefault();
            valid = false
            postaPic.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Recipe Picture must be provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(!recipedescriptionInput.value){
            event.preventDefault();
            valid = false
            recipedescriptionInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'Recipe Description must be provided'
            return
        }else{
            valid = true
            errorDiv.hidden = true
        }
        if(!ingredientsInput.value){
            event.preventDefault();
            valid=false
            ingredientsInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML = 'Ingredients Must be provided'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(!preppingdirectionInput.value){
            event.preventDefault();
            valid=false
            preppingdirectionInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML = 'Prepping Directions must be provided'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(!cookingdirectionsInput.value){
            event.preventDefault();
            valid=false;
            cookingdirectionsInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Cooking Directions must be provided'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(recipenameInput.value.trim(' ').length ===0){
            event.preventDefault();
            valid=false
            recipenameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Recipe Name cannot contain only whitespace'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(recipedescriptionInput.value.trim(' ').length ===0){
            event.preventDefault();
            valid=false
            recipedescriptionInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Recipe Description cannot contain only whitespace'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(ingredientsInput.value.trim(' ').length ===0){
            event.preventDefault();
            valid=false
            ingredientsInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Ingredients cannot contain only whitespace'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(preppingdirectionInput.value.trim(' ').length ===0){
            event.preventDefault();
            valid=false
            preppingdirectionInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Prepping Directions cannot contain only whitespace'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        if(cookingdirectionsInput.value.trim(' ').length ===0){
            event.preventDefault();
            valid=false
            cookingdirectionsInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Cooking Directions cannot contain only whitespace'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
        let regex3 = /[^0-9a-z\s]/gi;
        if(recipenameInput.value.match(regex3)){
            event.preventDefault();
            valid=false
            recipenameInput.value=''
            errorDiv.hidden=false
            errorDiv.innerHTML='Recipe Name cannot contain special characters'
            return
        }else{
            valid=true
            errorDiv.hidden=true
        }
    });
    }
})();


