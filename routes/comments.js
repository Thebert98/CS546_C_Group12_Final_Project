const express = require('express');
const router = express.Router();
const commentData = require('../data/comments');
const xss = require('xss');


//Not working


router.post('/',async(req,res)=>{
    if(!req.session.user){
        res.status(400).redirect('/login');
        return;
    }
    let recipeIdRoutes = xss(req.body.recipeId);
    let subjectLineRoutes = xss(req.body.subject);
    let descriptionRoutes = xss(req.body.description);
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
    if(subjectLineRoutes.trim(' ').length===0){
        res.status(404).render('recipe',{error:'Subject Line cannot contain only whitespaces'});
        return;
    }
    if(descriptionRoutes.trim(' ').length===0){
        res.status(404).render('recipe',{error:'Description cannot contain only whitespaces'});
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

