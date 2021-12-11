const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');
const userData = require('../data/users')
const { checkUser, createUser } = require('../data/users');
const bcrypt = require("bcrypt");
const saltRounds = 16;
let { ObjectId } = require('mongodb');
const recipes = mongoCollections.recipes;
const xss=require('xss');
let path = require('path')
const multer= require('multer');

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() +
        path.extname(file.originalname).toLowerCase());
    }
});
const upload = multer({
    storage: storage,
    fileFilter:function (req,file,cb){
        if((path.extname(file.originalname).toLowerCase()=='.jpeg')||(path.extname(file.originalname).toLowerCase()=='.jpg')||(path.extname(file.originalname).toLowerCase()=='.png')){
            cb(null,true);
        }
        else{
            cb(null,false);

        }
    }
});




 
 
 router.get('/profile/:id', async (req, res) => {
    if(!req.session.user){
        res.redirect( '/login');
        return;
     }
    if(!req.params.id){
         res.status(400).render('users/error',{error: "you must provide an id"})
         return;
     }
     if(!ObjectId.isValid(req.params.id)){
        res.status(400).render('users/error',{error: "you must provide an id"})
        return;
    }
     let recipeCollection = await recipes();
     let sameUser = req.params.id == req.session.userId
     if(sameUser){
        try {
        const user = await userData.get(req.params.id);
        let likes = [];
        let recentlyViewed = [];
        let recipes = []
        recipes = await recipeCollection.find({posterId:user._id}).toArray();
        let temp = [];
        for(let i = 0;i<user.recentlyViewedRecipes.length;i++){
            let tempId = ObjectId(user.recentlyViewedRecipes[i])
            temp = await recipeCollection.findOne({_id:tempId});
            recentlyViewed.push(temp);
        }
        temp =[];
        for(let i = 0;i<user.likes.length;i++){
            let tempId = ObjectId(user.likes[i])
            temp = await recipeCollection.findOne({_id:tempId});
            likes.push(temp);
        }
        

        res.status(200).render('users/myPage',{user: user, likes:likes,recipes:recipes,recentlyViewed:recentlyViewed});
        return;
        } catch (e) {
        res.status(404).render('users/error',{ message: 'User not found' });
        return;
        
        }
    }
    else{
        try {
            const user = await userData.get(req.params.id);
            let likes = [];
            let recipes
            recipes = await recipeCollection.find({posterId:user._id}).toArray();
            let temp = [];
    
            for(let i = 0;i<user.likes.length;i++){
                let tempId = ObjectId(user.likes[i])
                temp = await recipeCollection.findOne({_id:tempId});
                likes.push(temp);
            }
            
            res.status(200).render('users/userpage',{user: user,likes:likes, recipes:recipes });
            return;
            } catch (e) {
            res.status(404).render('users/error',{ error: e });
            return;
            
            }
    }
   });
 
   router.post('/profile/:id/edit',upload.single('profilePicture'),async (req, res) => {
    
   
    if(!req.session.userId){
         res.redirect('/login');
         return;
     }
     if(!req.params.id){
        res.status(400).render('users/error',{error: "you must provide an id"})
        return;
    }
    if(!ObjectId.isValid(req.params.id)){
       res.status(400).render('users/error',{error: "you must provide an id"})
       return;
   }
     if(req.session.userId !== req.params.id){
         res.status(400).render('users/errorEdit',{error:'You cannot update the profile of other users'})
         return;
     }

     
     const updateImage = req.file;
     const updateData = req.body;
     
     if((!updateImage) &&(!updateData.bio)&&(!updateData.favoriteRecipe)){
        res.status(400).render('users/errorEdit',{error: "No updates were provided or a non image file was provided."})
        return;
    }
    try {
        user = await userData.get(req.session.userId);
         
       } catch (e) {
         res.status(404).render('users/errorEdit',{ message: 'User not found' });
         return
       }
       
       if(req.file){
        
        if(updateImage){
        if(typeof updateImage.filename !="string"){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not valid"});
            return;
        }
        if(updateImage.filename .length< 5){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not valid"});
            return;
        }
        if((updateImage.filename.substring(updateImage.filename .length -5 ).toLowerCase() !== ".jpeg")&&(updateImage.filename.substring(updateImage.filename.length -4 ).toLowerCase() !== ".jpg")&&(updateImage.filename.substring(updateImage.filename.length -4 ).toLowerCase() !== ".png")){
            res.status(400).render('users/errorEdit',{error:"The profilePicture provided is not a jpeg, jpg, or png file"});
            return;
        }
          
        try{
            await userData.updateProfilePicture(user._id,xss(updateImage.filename))
           
       }catch(e){
           res.status(400).render('users/errorEdit',{error: e});
           return
       }
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
            await userData.updateBio(user._id,xss(updateData.bio))
           
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
            await userData.updateFavoriteRecipe(user._id,xss(updateData.favoriteRecipe))
           
       }catch(e){
           res.status(400).render('users/errorEdit',{error: e});
           return
       }
    }

    
    try{
    
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

module.exports = router;
