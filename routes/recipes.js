const express = require('express');
const router = express.Router();
const recipeData = require('../data/recipes');

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
		res.json({error:'User must be logged in to post a recipe'});
		return;
	}
})

//Get a route for displaying a individual recipe(get a recipe by ID)
router.get('/post/:id', async(req,res)=>{
	let getId = req.params.id;
	if(!getId){
		res.status(404).render('loggedIn',{error:'No ID was provided'});
		return;
	}
	const a = await recipeData.get(getId);
	let b=a.comments;
	var s;
	var d;
	for(i=0;i<b.length;i++){
		s=b[i].subject;
		d=b[i].description;
	}
	if(a){
		res.render('recipe',{recipeId:req.params.id,a:a,s:s,d:d,b:b});
		return;
	}else{
		res.status(400).json({error:'User must be logged in to view a recipe'});
		return;
	}
});

//Route to post on postArecipe form
router.post('/postArecipe',async(req,res)=>{
	let recipeNameRoutes = req.body.recipeName;
	let recipePictureRoutes = req.body.recipePicture;
	let recipeDescriptionRoutes = req.body.recipeDescription;
	let ingredientsRoutes = req.body.ingredients;
	let preppingDirectionsRoutes = req.body.preppingDirections;
	let cookingDirectionsRoutes = req.body.cookingDirections;
	let cuisineTypeRoutes = req.body.cuisineType;
	let dietaryTagsRoutes = req.body.dietaryTags;
	if(!recipeNameRoutes || !recipePictureRoutes || !recipeDescriptionRoutes || !ingredientsRoutes || !preppingDirectionsRoutes || !cookingDirectionsRoutes || !cuisineTypeRoutes || !dietaryTagsRoutes){
		res.status(404).render('postArecipe',{error:'All inputs must be provided'});
		return;
	}
	if(recipeNameRoutes.length===0||recipeDescriptionRoutes.length===0||ingredientsRoutes.length===0||preppingDirectionsRoutes.length===0||cookingDirectionsRoutes.length===0){
		res.status(404).render('postArecipe',{error:'Inputs cannot be empty'});
		return;
	}
	let regexR = /[^0-9a-z]/gi;
	if(recipeNameRoutes.match(regexR)){
		res.status(404).render('postArecipe',{error:'Recipe Name cannot have special characters'});
	}
	const postTime = await recipeData.create(recipeNameRoutes,recipePictureRoutes,recipeDescriptionRoutes,ingredientsRoutes,preppingDirectionsRoutes,cookingDirectionsRoutes,cuisineTypeRoutes,dietaryTagsRoutes);
	if(postTime){
		res.redirect('/loggedIn');
		return;
	}else{
		res.json({error:'user is not logged in'})
		return;
	}
})

//Route to post term for sorting by cuisine
router.post('/sortedCuisine',async(req,res)=>{
	let x = req.body.cuisines;
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
	if(req.session.user){
		res.render('sortByCuisines');
		return;
	}else{
		res.status(400).json({error:'User must be logged in to sort a recipe by cuisine'})
	}
})

//route to render the sortByDietaryTags
router.get('/sortByDietaryTags',async(req,res)=>{
	if(req.session.user){
		res.render('sortedDietaryTags');
		return;
	}else{
		res.status(400).json({error:'User must be logged in to sort by dietary tags'});
		return;
	}
});

//route to post data to the form to sort recipes by dietary tags
router.post('/sortByDietaryTags',async(req,res)=>{
	let y = req.body.dietarytags;
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
	if(req.session.user){
		res.render('searchRecipe');
		return;
	}else{
		res.status(400).json({error:'User must be logged to search a recipe'});
	}
});

//Route to post on /searchArecipe(TODO)



module.exports = router;
