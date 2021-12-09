const express = require('express');
const router = express.Router();
const recipeData = require('../data/recipes');
const userData = require('../data/users');
let { ObjectId } = require('mongodb');
const xss = require('xss');
//-----------------------------Needs to go into the users routes---------------------------

// router.get('/myProfile', async(req,res)=>{
// 	if(req.session.user){
// 		res.render('myProfile');
// 		return;
// 	}else{
// 		res.status(400).json({error:'User must login to view their profile'});
// 	}
// })

//-----------------------------------------------------------------------------------------

//Get a route for posting a recipe on /recipe/postArecipe
router.get('/postArecipe', async(req,res)=>{
	if(req.session.user){
		res.render('postArecipe');
		return;
	}else{
		res.redirect('/login');
		return;
	}
})

//Get a route for displaying a individual recipe(get a recipe by ID)
router.get('/post/:id', async(req,res)=>{
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
   let getId = req.params.id;
	const a = await recipeData.get(getId);
	let b=a.comments;
	var s;
	var d;
	
	for(i=0;i<b.length;i++){
		s=b[i].subject;
		d=b[i].description;
	}
	let liked = 'Like';
		if(req.session.id){
			try{
				
			await userData.updateRecentlyViewed(req.session.userId,req.params.id);
			
			let checker = await userData.checkLikes(req.session.userId,req.params.id)
			
			if(checker)
			{
				liked = 'Unlike';
			}
			if(a){
				res.render('recipe',{recipeId:req.params.id,a:a,s:s,d:d,b:b,likedStatus:liked});
				return;
			}
			}catch(e){
				res.status(400).render('users/error',{error:e});
				return;
			}
			
		}
});

//Route to post on postArecipe form
router.post('/postArecipe',async(req,res)=>{
	let recipeNameRoutes = xss(req.body.recipeName);
	let recipePictureRoutes = xss(req.body.recipePicture);
	let recipeDescriptionRoutes = xss(req.body.recipeDescription);
	let ingredientsRoutes = xss(req.body.ingredients);
	let preppingDirectionsRoutes = xss(req.body.preppingDirections);
	let cookingDirectionsRoutes = xss(req.body.cookingDirections);
	let cuisineTypeRoutes = xss(req.body.cuisineType);
	let dietaryTagsRoutes = xss(req.body.dietaryTags);
	if(!recipeNameRoutes || !recipePictureRoutes || !recipeDescriptionRoutes || !ingredientsRoutes || !preppingDirectionsRoutes || !cookingDirectionsRoutes || !cuisineTypeRoutes || !dietaryTagsRoutes){
		res.status(404).render('postArecipe',{error:'All inputs must be provided'});
		return;
	}
	if(recipeNameRoutes.length===0||recipeDescriptionRoutes.length===0||ingredientsRoutes.length===0||preppingDirectionsRoutes.length===0||cookingDirectionsRoutes.length===0){
		res.status(404).render('postArecipe',{error:'Inputs cannot be empty'});
		return;
	}
	let regexR = /[^0-9a-z\s]/gi;
	
	if(recipeNameRoutes.trim(" ").length ===0){
		res.status(404).render('postArecipe',{error:'Recipe Name cannot be only white space'});
		return;
	}
	
	if(recipeNameRoutes.trim(" ").match(regexR)){
		res.status(404).render('postArecipe',{error:'Recipe Name cannot have special characters'});
		return;
	}
	const postTime = await recipeData.create(req.session.userId,recipeNameRoutes,recipePictureRoutes,recipeDescriptionRoutes,ingredientsRoutes,preppingDirectionsRoutes,cookingDirectionsRoutes,cuisineTypeRoutes,dietaryTagsRoutes);
	if(postTime){
		try{
			await userData.updateRecipes(req.session.userId,postTime._id);
			res.redirect('/loggedin');
			return;
		}catch(e){
			res.status(400).render('users/error',{error:e});
			return;
		}
		
	}else{
		res.redirect('/login')
		return;
	}
})

//Route to post term for sorting by cuisine
router.post('/sortedCuisine',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	let x = xss(req.body.cuisines);
	if(!x){
		res.status(404).render('sortByCuisines',{error:'No Parameter was provided'});
		return;
	}
	const sortCui=await recipeData.cuisineSort(x);
	if(sortCui){
		res.render('sortByCuisines',{sortCui:sortCui});
		return;
	}else{
		res.status(404).json({error:'User must be logged to access this function'});
		return;
	}
})

//route to render the sortByCuisines
router.get('/sortedCuisine',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	else{
		res.render('sortByCuisines');
		return;
	}
})

//route to render the sortByDietaryTags
router.get('/sortByDietaryTags',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	else{
		res.render('sortedDietaryTags');
		return;
	}
});

//route to post data to the form to sort recipes by dietary tags
router.post('/sortByDietaryTags',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	let y = xss(req.body.dietarytags);
	if(!y){
		res.status(404).render('sortedDietaryTags',{error:'No Input was provided'});
		return;
	}
	const sortDT = await recipeData.dietaryTagsSort(y);
	if(sortDT){
		res.render('sortedDietaryTags',{sortDT:sortDT});
		return;
	}else{
		res.status(400).json({error:'User must be logged in to use this function'});
		return;
	}
});

//route to get view for Search A recipe
router.get('/searchArecipe',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	else{
		res.render('searchRecipe');
		return;
	}
});

//Route to post on /searchArecipe(TODO)
router.post('/searchArecipe', async (req,res)=>{
	if(!req.session.user){
		res.redirect('/login');
		return;
	}
	if(!req.body){
		res.status(400).render('users/error',{error: "No searchTerm was provided"});
		return;
	}
	let data = xss(req.body);
	if(!data.searchTerm){
		res.status(400).render('users/error',{error: "No searchTerm was provided"});
		return;
	}
	if(typeof data.searchTerm !='string'){
		res.status(400).render('users/error',{error: "searchTerm provided is not a string"});
		return;
	}
	if(data.searchTerm.trim(' ').length ==0){
		res.status(400).render('users/error',{error: "Input cannot be only whitespace"});
		return;
	}
	
	try{
		let searchResults = await recipeData.searchRecipe(data.searchTerm);
		res.status(200).render('searchRecipe',{searchResults:searchResults});
		
	}catch(e){
		res.status(400).render('users/error',{error: e});
	}

});


router.get('/sortedLikes',async(req,res)=>{
	if(!req.session.userId){
		res.redirect('/login');
		return;
	}
	else{
		res.render('sortByLikes');
		return;
	}
})



router.post('/like', async(req,res)=>{
	if(!req.session.id){
		res.redirect('login');
		return;
	}
	
	if(!req.body){
		res.status(400).render('users/error',{error: "No like status was provided"})
         return;
     }
	 let data = req.body;
	 if(!data.likeStatus){
		res.status(400).render('users/error',{error: "No like status was provided"})
		return;
	}
	
	if(!data.recipeId){
		res.status(400).render('users/error',{error: "No recipeID was provided"})
		return;
	}
	 let userLikeStatus = await userData.checkLikes(req.session.userId,data.recipeId)
	 if(data.likeStatus==='Like'){
		 if(!userLikeStatus){
		try{
			 await recipeData.updateLikers(data.recipeId,req.session.userId);
			 res.redirect('/recipe/post/' + data.recipeId)
			 return;
		 }catch(e){
			res.status(400).render('users/error',{error:e})
			return;
		 }
		 }
	 else{
		res.status(400).render('users/error',{error: "User already liked this post"})
		return;
	 }
	}
	else if(data.likeStatus=== 'Unlike'){
		if(userLikeStatus){
			try{
				 await recipeData.removeLikers(data.recipeId,req.session.userId);
				 
				 res.redirect('/recipe/post/' + data.recipeId)
				 return;
			 }catch(e){
				res.status(400).render('users/error',{error:e})
				return;
			 }
			 }
		 else{
			res.status(400).render('users/error',{error: "User has not liked this post"})
			return;
		 }
	}
	else{
		res.status(400).render('users/error',{error: "Invalid input"})
		return;
	}
	 
})


module.exports = router;
