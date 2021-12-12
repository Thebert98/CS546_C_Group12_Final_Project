(function () {

    const myForm = document.getElementById("formForSearch");
    let searchRecipeInput = document.getElementById("searchTerm");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!searchRecipeInput.value){
            event.preventDefault();
            valid = false
            searchRecipeInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'No Search Term Was Provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        if(searchRecipeInput.value.trim(' ').length===0){
            event.preventDefault();
            valid = false
            searchRecipeInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Search Term cannot be only whitespaces'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
        // let regexSearch = /[^0-9a-z]/gi;
        // if(searchRecipeInput.value.match(regexSearch)){
        //     event.preventDefault();
        //     valid = false
        //     searchRecipeInput.value = ''
        //     errorDiv.hidden = false;
        //     errorDiv.innerHTML = 'Search Term cannot contain special characters'
        //     return
        // }
        // else{
        //     valid = true
        //     errorDiv.hidden = true
        // }
        let regexSearch1 = /\d/;
        if(searchRecipeInput.value.match(regexSearch1)){
            event.preventDefault();
            valid = false
            searchRecipeInput.value = ''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Search Term cannot contain numbers'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
        }
    });
    }
})();

let likesButton = document.getElementById('sortLikesButton')
        let defaultButton = document.getElementById('defaultSortButton')
        let likeList = document.getElementById('likeSort')
        let defaultList = document.getElementById('defaultList')
        likesButton.addEventListener('click',(event)=>{
            defaultList.hidden = true;
            likesButton.hidden = true;
            defaultButton.hidden = false;
            likeList.hidden = false;
        });
        defaultButton.addEventListener('click',(event)=>{
            defaultList.hidden = false;
            likesButton.hidden = false;
            defaultButton.hidden = true;
            likeList.hidden = true;
        })  


