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
 router.post('/', async (req, res) => {
     if(req.session.username){
        res.redirect( '/loggedin');
     }
     else{
        const userPostData = req.body;
        let firstName = userPostData.firstName
        let lastName = userPostData.lastName
        let username = userPostData.userName
        let password = userPostData.password
        if(firstName){
            res.status(400).render('users/error',{error: "You must provide a first name"});
            return;
        };
        if(lastName){
            res.status(400).render('users/error',{error: "You must provide a last name"});
            return;
        };
        if(!username){
            res.status(400).render('users/error',{error: "You must provide a user name"});
            return;
        };
        if(!password){
            res.status(400).render('users/error',{error: "You must provide a password"});
            return;
        };
        
        if(typeof firstName !== 'string'){
            res.status(400).render('users/error',{error: "first name provided is not a string"});
            return;
        };
        if(firstName.trim().length == 0){
            res.status(400).render('users/error',{error: "first name provided is only white"});
            return;
        };
        if(typeof lastName !== 'string') {
            res.status(400).render('users/error',{error: "last name provided is not a string"});
            return;
        };
        if(lastName.trim().length == 0){
            res.status(400).render('users/error',{error: "last name provided is only white"});
            return;
        };
        
        if(typeof username !== 'string'){
            res.status(400).render('users/error',{error: "username provided is not a string"});
            return;
        };
        if(username.trim().length == 0){
            res.status(400).render('users/error',{error: "username provided is only whitespace"});
            return;
        };
        if (username.length < 4) {
            res.status(400).render('users/error',{error: "username is too short"});
            return;
        };
        if(typeof password !== 'string'){
            res.status(400).render('users/error',{error: "password provided is not a string"});
            return;
        };;
        if(password.trim().length == 0){
            res.status(400).render('users/error',{error: "password provided is only whitespace"});
            return;
        };
        if(password.length < 8){
            res.status(400).render('users/error',{error: "password is too short"});
            return;
        };
        let hasUpperCase = false;
        let hasNumber = false;
        let hasSpecialCharacter = false;
        for (let i = 0; i<password.length;i++){
            if(c == " ") spaceArray.push(c);
            else if((c.charCodeAt(0)>=65)&&(c.charCodeAt(0)<=90)) hasUpperCase = true;
            else if((c.charCodeAt(0)>=97)&&(c.charCodeAt(0)<=122));
            else if((c.charCodeAt(0)>=48)&&(c.charCodeAt(0)<=57)) hasNumber = true;
            else hasSpecialCharacter = true;
        }

        if((!hasUpperCase)||(!hasNumber)||(hasSpecialCharacter)) {
            res.status(400).render('user/error',{error: "Password must include an uppercase letter, a number, and a special character"});
            return;
        };
    
        userCollection = await users();

        usernameCheck = await userCollection.findOne({username: username.toLowerCase()})

        if(usernameCheck != null) {
            res.status(400).render('user/error',{error: "Username is already in use"});
            return;
        };


        const hash = await bcrypt.hash(password,saltRounds);
    
        try {
        const {firstName, lastName, userName, hash} = userPostData;
        const newUser = await userData.create(firstName, lastName, userName, hash)
        res.status(200).render('loggedin/index',{username: username.toLowerCase()});
    } catch (e) {
        res.status(400).render('user/error',{error: e});
    }
}
 });
 
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

 module.exports = router;
