(function () {

    const myForm = document.getElementById("formForEditUser");
    let bioInput = document.getElementById("bio");
    let favRecipeInput = document.getElementById("favouriteRecipe");
    let profilePictureInput = document.getElementById("profilePicture");
    let errorDiv = document.getElementById('errorcheck');
    if (myForm) {
    myForm.addEventListener("submit", (event) => {
        valid = true
        if(!bioInput.value && !favRecipeInput && !profilePictureInput){
            event.preventDefault();
            valid = false
            bioInput.value = ''
            favRecipeInput = ''
            profilePictureInput=''
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'No Updates were provided'
            return
        }
        else{
            valid = true
            errorDiv.hidden = true
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


