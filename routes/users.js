const express = require('express');
const router = express.Router();
const userData = require('../data/users')
const { checkUser, createUser } = require('../data/users');
const bcrypt = require("bcrypt");
const saltRounds = 16;

/*router.get('/', async (req, res) => {
    let listOfUsers = [];
     try {
         let userList = await userData.getAll();
         userList.forEach(element => {
             let newObject = {
                 _id: element._id,
                 userName: element.userName
         };
         listOfUsers.push(newObject)
     });
     res.status(200).render('users/all',{listOfUsers:listOfUsers});
   } catch (e) {
     res.status(500).renders('users/error',{error: "e"});
   }
 });
 */
 
 
 router.get('/:id', async (req, res) => {
    if(req.session.username){
        res.redirect( '/login');
     }
    if(!req.params.id){
         res.status(400).render('users/error',{error: "you must provide an id"})
         return;
     }
     let sameUser = req.params.id == req.session.id
     if(sameUser){
        try {
        const user = await userData.get(req.params.id);
        res.status.render('users/myPage',{user: user});
        } catch (e) {
        res.status(404).render('users/error',{ message: 'User not found' });
        }
    }
    else{
        try {
            const user = await userData.get(req.params.id);
            res.status.render('users/userpage',{user: user });
            } catch (e) {
            res.status(404).render('users/error',{ message: 'User not found' });
            }
    }
   });
 
   router.post('/:id/edit', async (req, res) => {
     if(!req.session.id){
         res.redirect('login/index');
         return;
     }
     if(!req.session.id !== req.params.id){
         res.status(400).render('users/error',{error:'You cannot update the profile of other users'})
     }

     const updateData = req.body;
     if((!updateData.profilePicture) &&(!updateData.bio)&&(!updateData.favoriteRecipe)){
        res.status(400).render('users/error',{error: "No updates were provided"})
    }
     if(!updateData.profilePicture){
         profilePicture = "";
     }
     else{
         profilePicture = updateData.profilePicture;
     }
     if(!updateData.bio){
        bio = "";
    }
    else{
        bio = updateData.profilePicture;
    }
    if(!updateData.profilePicture){
        bio = "";
    }
    else{
        favoriteRecipe = updateData.favoriteRecipe;
    }
     
     try {
      user = await userData.get(req.session.id);
       
     } catch (e) {
       res.status(404).render('users/error',{ message: 'User not found' });
       return
     }

     if(profilePicture!==""){
        try{
             await userData.updateProfilePicture(user.id,profilePicture)
            
        }catch(e){
            res.status(400).render('users/error',{error: e});
        }
    }
    if(bio!==""){
        try{
             await userData.updateBio(user.id,bio)
            
        }catch(e){
            res.status(400).render('users/error',{error: e});
        }
    }
    if(favoriteRecipe!==""){
        try{
             await userData.updateFavoriteRecipe(user.id,favoriteRecipe)
            
        }catch(e){
            res.status(400).render('users/error',{error: e});
        }
    }
    
    try{
    user = user = await userData.get(req.session.id);
    res.status.render('users/userpage',{user: user});
    }catch(e){
        res.status(400).render('users/error',{error: e});
    }

 
   });
 

  /* router.get('/:id/likes', async (req, res) => {
    if(req.session.username){
        res.redirect( '/login');
     }
    if(!req.params.id){
         res.status(400).render('users/error',{error: "you must provide an id"})
         return;
     }
     
        
    
    try {

        const user = await userData.get(req.params.id);
        
        res.status.render('users/likes',{likes: user.likes });
        } catch (e) {
        res.status(404).render('users/error',{ message: 'User not found' });
        }
    
}); 


 */


router.get('users/mypage') ,async (req, res) => {
    if(req.session.username){
        res.redirect( 'users/' +req.session.id);
    }
    else{
        res.redirect('/login');
    }
    }

    router.get('/myProfile', async(req,res)=>{
	if(req.session.user){
		res.render('myProfile');
		return;
	}else{
		res.status(400).json({error:'User must login to view their profile'});
	}
})

module.exports = router;
