const express = require('express');
const router = express.Router();
const commentData = require('../data/comments');


//Not working


router.post('/',async(req,res)=>{
    if(!req.session.user){
        res.status(400).redirect('/login');
        return;
    }
    let recipeIdRoutes = req.body.recipeId;
    let subjectLineRoutes = req.body.subject;
    let descriptionRoutes = req.body.description;
    if(!recipeIdRoutes){
        res.status(404).render('recipe',{error:'No Recipe ID was provided'});
        return;
    }
    if(!subjectLineRoutes){
        res.status(404).render('recipe',{error:'No Subject Line was provided'});
        return;
    }
    if(!descriptionRoutes){
        res.status(404).render('recipe',{error:'No Description was provided'});
        return;
    }
    try{
    const postingComment = await commentData.createComment(recipeIdRoutes,subjectLineRoutes,descriptionRoutes);
    if(postingComment){
        res.redirect('/recipe/post/'+recipeIdRoutes);
    }
    }catch(e){
        res.status(400).render('recipe',{error:e});
    }
})


module.exports=router;

