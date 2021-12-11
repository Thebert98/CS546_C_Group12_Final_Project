const express = require("express");
const router = express.Router();
const mongoCollections=require('../config/mongoCollections');
const usersData = require('../data/main');
const main = mongoCollections.main;
const recipeData = require('../data/recipes')
const users = mongoCollections.users;
const xss = require('xss');



router.get('/loggedIn',async(req,res)=>{
        if(!req.session.userId){
            res.redirect('/login')
            return;
        }
        const allRecipes = await recipeData.getAll();
        const sortedRecipes = await recipeData.likeSort();
        
		let id = xss(req.body._id);
		if(allRecipes){
			res.render('loggedIn',{username:req.session.user.username, allRecipes:allRecipes,id:id,userId:req.session.userId, sortByLikes:sortedRecipes});
			return;
		}else{
			res.render('loggedIn',{error:'No Feed Available'});
			return;
		}
});

router.get('/',async(req,res)=>{
    if(!req.session.user){
        res.render('landingPage');
        return;
    }else{
        res.redirect('loggedIn');
        return;
    }
});

router.get('/signup', async(req,res)=>{
    if(!req.session.user){
        res.render('signup');
        return;
    }else{
        res.redirect('loggedIn');
        return;
    }
});

router.get('/login',async(req,res)=>{
    if(!req.session.user){
        res.render('login');
        return;
    }else{
        res.redirect('loggedIn');
        return;
    }
});

router.post('/signup',async(req,res)=>{
    try{
        let rfirstname=xss(req.body.firstName);
        let rlastname=xss(req.body.lastName);
        let rusername=xss(req.body.username);
        let rphonenumber=xss(req.body.phoneNumber);
        let rpassword=xss(req.body.password);
        rusername=rusername.toLowerCase();
        if(!rfirstname||!rlastname||!rusername||!rphonenumber||!rpassword){
            res.status(400).render('signup',{error:'All inputs must be provided'});
            return;
        }
        if(typeof rfirstname !='string'||typeof rlastname!='string'||typeof rusername !='string'||typeof rphonenumber!='string'||typeof rpassword!='string'){
            res.status(400).render('signup',{error:'All inputs must be a string'});
            return;
        }
        if(rfirstname.length===0 || rlastname.length===0 || rusername.length===0||rphonenumber.length===0||rpassword.length===0){
            res.status(400).render('signup',{error:'Inputs cannot be empty'});
            return;
        }
        if(rfirstname.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'First Name cannot contain empty spaces'});
            return;
        }
        if(rlastname.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Last Name cannot contain empty spaces'});
            return;
        }
        if(rusername.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Username cannot contain empty spaces'});
            return;
        }
        let r = /^[0-9]*$/
        if(!rphonenumber.match(r)){
            res.status(400).render('signup',{error:'Phone Number can only contain Numbers'});
            return;
        }
        if(rphonenumber.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Phone Number cannot contain empty spaces'});
            return;
        }
        if(rpassword.indexOf(' ')>=0){
            res.status(400).render('signup',{error:'Password cannot contain empty spaces'});
            return;
        }
        if(rusername.length<4){
            res.status(400).render('signup',{error:'Username must be atleast 4 characters long'});
            return;
        }
        if(rpassword.length<6){
            res.status(400).render('signup',{error:'Password must atleast have 6 characters'});
            return;
        }
        let regex1 = /[^0-9a-z]/gi
        if(rusername.match(regex1)){
            res.status(400).render('signup',{error:'Username cannot contain special characters'});
            return;
        }
        if(rphonenumber.match(regex1)){
            res.status(400).render('signup',{error:'Phone Number cannot contain special characters'});
            return;
        }
        if(rfirstname.match(regex1)){
            res.status(400).render('signup',{error:'First Name cannot contain special characters'});
            return;
        }
        if(rlastname.match(regex1)){
            res.status(400).render('signup',{error:'Last Name cannot contain special characters'});
            return;
        }
        let regex = /\d/;
        if(rfirstname.match(regex)){
            res.status(400).render('signup',{error:'First Name cannot contain numbers'});
            return;
        }
        if(rlastname.match(regex)){
            res.status(400).render('signup',{error:'Last Name cannot contain numbers'});
            return;
        }
        let r3 = /^\d+$/;
        if(rusername.match(r3)){
            res.status(400).render('signup',{error:'Username cannot contain only numbers'});
            return;
        }
        const signupTime = await usersData.createUsers(rfirstname,rlastname,rusername,rphonenumber,rpassword);
        if(signupTime){
            res.redirect('/login');
        }
    }catch(e){
        res.status(e.error||500).render('signup',{error:e||'Internal Server Error'});
        return;
    }
});

router.post('/login',async(req,res)=>{
    try{
        let r1username = xss(req.body.username);
        let r1password = xss(req.body.password);
        r1username=r1username.toLowerCase();
        if(!r1username||!r1password){
            res.status(400).render('login',{error:'All inputs must be provided'});
            return;
        }
        if(typeof r1username!='string'||typeof r1password!='string'){
            res.status(400).render('login',{error:'Inputs must be of type "String"'});
            return;
        }
        if(r1username.length === 0){
            res.status(400).render('login',{error:'Username cannot be empty'});
            return;
        }
        if(r1password.length===0){
            res.status(400).render('login',{error:'Password cannot be empty'});
            return;
        }
        if(r1username.indexOf(' ')>=0){
            res.status(400).render('login',{error:'Username cannot have empty spaces'});
            return;
        }
        if(r1username.length<4){
            res.status(400).render('login',{error:'Username must be greater than 4'});
            return;
        }
        if(r1password.length<6){
            res.status(400).render('login',{error:'Password cannot be less than 6'});
            return;
        }
        if(r1password.indexOf(' ')>=0){
            res.status(400).render('login',{error:'Password cannot have spaces'});
            return;
        }
        let regexa = /[^0-9a-z]/gi
        if(r1username.match(regexa)){
            res.status(400).render('login',{error:'Username cannot contain special characters'});
            return;
        }
        let r4 = /^\d+$/;
        if(r1username.match(r4)){
            res.status(400).render('login',{error:'Username cannot contain only numbers'});
            return;
        }
        const getLoggedIn = await usersData.checkUser(r1username,r1password);
        if(getLoggedIn){
            let userCollection = await users()
            req.session.user={username:r1username};
            const user = await userCollection.findOne({ username: r1username });
            req.session.userId = user._id;
            res.redirect('/loggedIn');
            return;
        }
    }catch(e){
        res.status(400).render('login',{error:e});
        return;
    }
});


router.get('/logout',async(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

module.exports=router;