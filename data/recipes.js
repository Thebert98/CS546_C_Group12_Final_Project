const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
// const { all } = require('../routes/recipes');
const recipes = mongoCollections.recipes;

//Create
	async function create(recipeName,recipePicture,recipeDescription,ingredients,preppingDirections,cookingDirections,cuisineType,dietaryTags) 
		{
		if (!recipeName || typeof recipeName != 'string')
			throw 'A recipeName of type string must be provided for your recipe recipeName';
		if (!recipePicture || typeof recipePicture != 'string')
			throw 'A recipeName of type string must be provided for your recipe recipeName';
		if (!recipeDescription || typeof recipeDescription != 'string') {
			throw 'A phonenumber of type string must be provided for your recipe phonenumber';
		}
		if(typeof ingredients != 'string'){
			throw 'Ingrediants must be a string'
		}
		if(typeof preppingDirections != 'string'){
			throw 'Prepping Directions must be a string'
		}
		if(typeof cookingDirections != 'string'){
			throw 'Cooking Directions must be a string'
		}
		if(typeof dietaryTags!='string'){
			throw 'Cooking directions must be a string'
		}
		if (!ingredients) {
			throw 'kindly enter ingredients';
		}
		if (!preppingDirections) {
			throw 'kindly enter preppingDirections';
		}
		if (!cookingDirections) {
			throw 'kindly enter cookingDirections';
		}
		if (!cuisineType || typeof cuisineType != 'string') {
			throw 'kindly enter cusine and it must be string';
		}
		cuisineType=cuisineType.toLowerCase();
		const recipeCollection = await recipes();
		likes = 0;
		const newRecipe = {
			recipeName: recipeName,
			recipePicture: recipePicture,
			recipeDescription: recipeDescription,
			ingredients: ingredients,
			preppingDirections: preppingDirections,
			cookingDirections: cookingDirections,
			cuisineType: cuisineType,
			comments:[],
			likes:0,
			dietaryTags:dietaryTags
		};
		const insertRecipe = await recipeCollection.insertOne(newRecipe);
		if (insertRecipe.insertedCount === 0) {
			throw `Error while adding ${newRecipe}`;
		}
		let recipeId = insertRecipe.insertedId;
		recipeId = recipeId.toString();
		return await get(recipeId);
	}


//Get All
	async function getAll() {
		const recipeCollection = await recipes();
		const allrecipe = await recipeCollection.find({}).toArray();
		return allrecipe;
	}
	// getAll();


	//Get by ID
	async function get(id) {
		// let { ObjectId } = require('mongodb');
		if (!id) {
			throw 'An ID is required to search for an recipe';
		}
		if (!id || typeof id != 'string') {
			throw 'A id of type string must be provided for your recipe!';
		}
		if (typeof id === 'string') {
			id = ObjectId(id);
		} else if (!(id instanceof ObjectId)) {
			throw 'Invalid type of id:needs to be string';
		}
		const recipeCollection = await recipes();
		const recipe = await recipeCollection.findOne({ _id: id });
		if (recipe === null) {
			throw `No recipe with id: ${id} present`;
		}
		recipe._id = recipe._id.toString();
		return recipe;
	}

// Search a recipe (NOT WORKING)
async function searchRecipe(recipenameID){
	if(!recipenameID){
		throw 'No Recipe Name was provided'
	}
	if(typeof recipenameID !='string'){
		throw 'Recipe Name must be string'
	}
	if(recipenameID.indexOf(' ')>=0){
		throw 'Input cannot have empty spaces'
	}
	var retArray = [];
	var a;
	var b;
	const searchingForRecipe = await recipes();
	const recipeSearch = await searchingForRecipe.find({}).toArray();
	for(i=0;i<recipeSearch.length;i++){
		let retObj={}
		a=recipeSearch[i].recipeName;
		b=recipeSearch[i]._id.toString();
		retObj['id']=b;
		retObj['recipeName']=a;
		retArray.push(retObj);
	}
	return retArray;
}

//Sort by Cuisine

async function cuisineSort(cuisine){
	if(!cuisine){
		throw 'No cuisine was provided'
	}
	if(typeof cuisine !='string'){
		throw 'Cuisine must be a string'
	}
	if(cuisine.length===0){
		throw 'Cuisine cannot be empty'
	}
	cuisine=cuisine.toLowerCase();
	var a;
	var pushArr = [];
	const cuisineSort = await recipes();
	const cuisineSortAll = await cuisineSort.find({}).toArray();
	for(j=0;j<cuisineSortAll.length;j++){
		a=cuisineSortAll[j].cuisineType;
		if(a==cuisine){
			pushArr.push(cuisineSortAll[j]);
		}
	}
	return pushArr;
}

//Sort by Dietary Tags
async function dietaryTagsSort(dtags){
	if(!dtags){
		throw 'No input was provided'
	}
	if(typeof dtags != 'string'){
		throw 'Input must be a string'
	}
	if(dtags.length===0){
		throw 'input cannot be empty'
	}
	var b;
	var retArr1 =[];
	dtags = dtags.toLowerCase();
	const dtagsSort = await recipes();
	const sortDtags = await dtagsSort.find({}).toArray();
	for(k=0;k<sortDtags.length;k++){
		b=sortDtags[k].dietaryTags;
		if(b==dtags){
			retArr1.push(sortDtags[k]);
		}
	}
	return retArr1;
}



	module.exports={
		create,
		getAll,
		get,
		searchRecipe,
		cuisineSort,
		dietaryTagsSort
	}
