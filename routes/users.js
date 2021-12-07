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
 
 
 router.get('/profile/:id', async (req, res) => {
    if(!req.session.user){
        res.redirect( '/login');
     }
    if(!req.params.id){
         res.status(400).render('users/error',{error: "you must provide an id"})
         return;
     }
     let sameUser = req.params.id == req.session.userId
     if(sameUser){
        try {
        const user = await userData.get(req.params.id);
        res.status(200).render('users/myPage',{user: user});
        } catch (e) {
        res.status(404).render('users/error',{ message: 'User not found' });
        
        }
    }
    else{
        try {
            const user = await userData.get(req.params.id);
            res.status(200).render('users/userpage',{user: user });
            } catch (e) {
            res.status(404).render('users/error',{ error: e });
            
            }
    }
   });
 
   router.post('/profile/:id/edit', async (req, res) => {
     if(!req.session.userId){
         res.redirect('/login');
         return;
     }
     if(req.session.userId !== req.params.id){
         res.status(400).render('users/errorEdit',{error:'You cannot update the profile of other users'})
         return;
     }

     const updateData = req.body;
     
     if((!updateData.profilePicture) &&(!updateData.bio)&&(!updateData.favoriteRecipe)){
        res.status(400).render('users/errorEdit',{error: "No updates were provided"})
        return;
    }
    try {
        user = await userData.get(req.session.userId);
         
       } catch (e) {
         res.status(404).render('users/errorEdit',{ message: 'User not found' });
         return
       }
     if(updateData.profilePicture){
        if(typeof profilePicture !="string"){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not valid"});
            return;
        }
        if(profilePicture.length< 5){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not valid"});
            return;
        }
        if((profilePicture.substring(profilePicture.length -5 ).toLowerCase() !== ".jpeg")&&(profilePicture.substring(profilePicture.length -4 ).toLowerCase() !== ".jpg")&&(profilePicture.substring(profilePicture.length -4 ).toLowerCase() !== ".png")){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not a jpeg, jpg, or png file"});
            return;
        }
        
        
        try{
            await userData.updateProfilePicture(user._id,updataData.profilePicture)
           
       }catch(e){
           res.status(400).render('users/errorEdit',{error: e});
           return
       }
     }
     if(updateData.bio){
        
        if(typeof updateData.bio !="string"){
            res.status(400).render('users/errorEdit',{error:"The bio provided is not valid"});
            return;
        }
        if(updateData.bio.length > 500){
            res.status(400).render('users/errorEdit',{error:"The bio provided is not valid (500 character max)"});
            return;
        }
        
        try{
            await userData.updateBio(user._id,updateData.bio)
           
       }catch(e){
           res.status(400).render('users/errorEdit',{error: e});
           return
       }
    }
    
    if(updateData.favoriteRecipe){
        
        if(typeof updateData.favoriteRecipe !="string"){

            res.status(400).render('users/errorEdit',{error:"The favoriteRecipe provided is not valid"});
            return;
        }
        if(updateData.favoriteRecipe.length > 20){

            res.status(400).render('users/errorEdit',{error:"The favoriteRecipe name provided is not valid (20 character max)"});
            return
        }
        
        try{
            await userData.updateFavoriteRecipe(user._id,updateData.favoriteRecipe)
           
       }catch(e){
           res.status(400).render('users/errorEdit',{error: e});
           return
       }
    }

    
    try{
    user = user = await userData.get(req.session.userId);
    res.status(200).redirect('/users/myPage');
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


router.get('/myPage' ,async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
        return;
    }
    else{
        
        
        res.redirect( 'profile/' +req.session.userId);
    }
    })

    router.get('/myProfile', async(req,res)=>{
	if(req.session.user){
		res.render('myProfile');
		return;
	}else{
		res.status(400).json({error:'User must login to view their profile'});
	}
})

module.exports = router;
