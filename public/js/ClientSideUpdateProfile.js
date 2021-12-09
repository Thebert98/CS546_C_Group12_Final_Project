(function () {

    const myForm = document.getElementById("formForEditUser");
    let bioInput = document.getElementById("bio");
    let favRecipeInput = document.getElementById("favoriteRecipe");
    let profilePictureInput = document.getElementById("profilePicture");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if( profilePictureInput.value){
            if((profilePictureInput.value.substring(profilePictureInput.value.length -5 ).toLowerCase() !== ".jpeg")&&(profilePictureInput.value.substring(profilePictureInput.value.length -4 ).toLowerCase() !== ".jpg")&&(profilePictureInput.value.substring(profilePictureInput.value.length -4 ).toLowerCase() !== ".png")){
                event.preventDefault();
                valid = false
                profilePictureInput.value=''
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'An invalid file type was provided'
                return
            } 
    
        }
        if(bioInput.value){
            if(bioInput.value.length >= 500){
                event.preventDefault();
                valid = false
                bio.value = ''
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'Bio input is too long (500 character max)'
                return
            }
        }
        if(favRecipeInput.value){
            if(favRecipeInput.value.length >20){
                event.preventDefault();
                valid = false
                favRecipeInput.value = ''
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'Favorite Recipe input is too long (20 character max)'
                return
            }
        }
        if(bioInput.value || favRecipeInput.value || profilePictureInput.value){
            valid = true
            errorDiv.hidden = true
        }
        else{
            event.preventDefault();
            valid = false
            bioInput.value = ''
            favRecipeInput.value = ''
            profilePictureInput.value=''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'No Updates were provided'
            return
        }
    });
    }
})();

        let profileButton = document.getElementById('profileButton')
        let likesButton = document.getElementById('likesButton')
        let profile = document.getElementById('profile')
        let likes = document.getElementById('likes')
        let editButton = document.getElementById('edit')
        let editProfile = document.getElementById('editPage')   
        let cancelButton = document.getElementById('cancel')
        let recents = document.getElementById('recents')   
        let recentsButton = document.getElementById('recentsButton')

        likesButton.addEventListener('click',(event)=>{
            profile.hidden = true;
            likesButton.hidden = true;
            profileButton.hidden = false;
            likes.hidden = false;
            editProfile.hidden = true;
            recentsButton.hidden = false;
            recents.hidden = true;
        }) 
        profileButton.addEventListener('click',(event)=>{
            profile.hidden = false;
            likesButton.hidden = false;
            profileButton.hidden = true;
            likes.hidden = true;
            editProfile.hidden = true;
            recentsButton.hidden = false;
            recents.hidden = true;
        })
        editButton.addEventListener('click',(event)=>{
            profile.hidden = true;
            likesButton.hidden = true;
            profileButton.hidden = true;
            likes.hidden = true;
            editProfile.hidden = false;
            recentsButton.hidden = true;
            recents.hidden = true;
            
        })          
        cancelButton.addEventListener('click',(event)=>{
            profile.hidden = false;
            likesButton.hidden = false;
            profileButton.hidden = true;
            likes.hidden = true;
            editProfile.hidden = true;
            recentsButton.hidden = false;
            recents.hidden = true;
        })
        recentsButton.addEventListener('click',(event)=>{
            profile.hidden = true;
            likesButton.hidden = false;
            profileButton.hidden = false;
            likes.hidden = true;
            editProfile.hidden = true;
            recentsButton.hidden = true;
            recents.hidden = false;
        })


