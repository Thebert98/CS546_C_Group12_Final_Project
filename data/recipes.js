const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
// const { all } = require('../routes/recipes');
const recipes = mongoCollections.recipes;
const path = require('path');

//Create
async function create(posterId,recipeName,recipePicture,recipeDescription,ingredients,preppingDirections,cookingDirections,cuisineType,dietaryTags) 
{
	if(!posterId) throw 'No posterId was provided'
	if(typeof posterId !== 'string') throw 'posterId provided is not a string';
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
	if(cuisineType != 'italian' && cuisineType!='mexican' && cuisineType!='indian' && cuisineType !='american' && cuisineType !='lebanese' && cuisineType!='other'){
		throw 'Invalid Cuisine Type'
	}
	if(dietaryTags != 'vegan' && dietaryTags!='vegetarian' && dietaryTags!='nonvegetarian'){
		throw 'Invalid dietary tag'
	}
	if((path.extname(recipePicture).toLowerCase()!=='.jpeg')&&(path.extname(recipePicture).toLowerCase()!=='.jpg')&&(path.extname(recipePicture).toLowerCase()!=='.png')) throw 'Provided file was not a jpeg, png, or jpg';
	let userData = require('./users')
	try{
		let user = await userData.get(posterId)
		let username = user.username;
		
		cuisineType=cuisineType.toLowerCase();
	const recipeCollection = await recipes();
	likes = 0;
	const newRecipe = {
		posterId: posterId,
		posterUsername: username,
		recipeName: recipeName,
		recipePicture: recipePicture,
		recipeDescription: recipeDescription,
		ingredients: ingredients,
		preppingDirections: preppingDirections,
		cookingDirections: cookingDirections,
		cuisineType: cuisineType.toLowerCase(),
		comments:[],
		likers:[],
		likes: 0,
		dietaryTags:dietaryTags.toLowerCase()
	};
	const insertRecipe = await recipeCollection.insertOne(newRecipe);
	if (insertRecipe.insertedCount === 0) {
		throw `Error while adding ${newRecipe}`;
	}
	let recipeId = insertRecipe.insertedId;

	recipeId = recipeId.toString();
	return await get(recipeId);
	}catch(e){
	throw e;

	}
}



//Get All
	async function getAll() {
		const recipeCollection = await recipes();
		const allrecipe = await recipeCollection.find({}).toArray();
		return allrecipe.reverse();
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

// Search a recipe
async function searchRecipe(searchTerm){
	if(!searchTerm){
		throw 'No searchTerm was provided'
	}
	if(typeof searchTerm !='string'){
		throw 'searchTerm provided is not a string'
	}
	if(searchTerm.trim(' ').length ==0){
		throw 'Input cannot be just whitespaces'
	}
	// let regex1 = /[^0-9a-z]/gi;
	// if(searchTerm.match(regex1)){
	// 	throw 'Input cannot be special characters'
	// }
	let regex2 = /\d/;
	if(searchTerm.match(regex2)){
		throw 'Search Term cannot contain Numbers'
	}
	const searchingForRecipe = await recipes();
	await searchingForRecipe.createIndex({recipeName: "text"});
	const recipeSearch = await searchingForRecipe.find({$text:{$search: searchTerm}}).toArray();
	return recipeSearch.reverse();
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
	return pushArr.reverse();
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
	return retArr1.reverse();
}


async function likeSort(){
	
	
	const likeSort = await recipes();
	let mySort ={likes: -1}
	const sortLikes = await likeSort.find().sort(mySort).toArray();
	
	
	return sortLikes;
}


async function updateLikers(id,userId){
	if(!id) throw "No id was provided";
	if(typeof id !== "string") throw "The id provided is not a string";
	if(!userId)throw "No userId provided";
	if(typeof userId !="string") throw "The userId provided is not valid";
	
	let userData = require('./users')
	let recipe = await get(id);
	if(!recipe)throw 'recipe not found';
	
	
	
	let included = false;
	for(let i = 0;i<recipe.likers.length;i++){
		if(userId === recipe.likers[i])included =true;
	}
	
	if(included)throw 'this user has liked this post already';
	recipe.likers.push(userId);
	recipe.likes = recipe.likers.length;
	
	
	
	const recipeCollection = await recipes();
	let parsedId = ObjectId(id);
	recipe._id = parsedId;
	const updatedInfo = await recipeCollection.updateOne(
		{_id: parsedId},
		{$set: recipe}
		);
	if (updatedInfo.modifedCount === 0){
		throw "Could not update recipe successfully";
	} 
	await userData.updateLikes(userId,id);
	return await this.get(id);

}

async function removeLikers(id,userId){
if(!id) throw "No id was provided";
if(typeof id !== "string") throw "The id provided is not a string";
if(!userId)throw "No userId provided";
if(typeof userId !="string") throw "The userId provided is not valid";


let userData = require('./users')
	let recipe = await get(id);
	if(!recipe)throw 'recipe not found';
	
	
	
	let included = false;
	let pos = 0;
	for(let i = 0;i<recipe.likers.length;i++){
		if(userId === recipe.likers[i]){
			included = true;
			pos = i;
		}
	}
	
	if(!included)throw 'this user has not liked this post '
	

recipe.likers.splice(pos,1);
recipe.likes = recipe.likers.length;



const recipeCollection = await recipes();
	let parsedId = ObjectId(id);
	recipe._id = parsedId;
	const updatedInfo = await recipeCollection.updateOne(
		{_id: parsedId},
		{$set: recipe}
		);
	if (updatedInfo.modifedCount === 0){
		throw "Could not update recipe successfully";
	} 
await userData.removeLikes(userId,id);
return await this.get(id);

}

	module.exports={
		create,
		getAll,
		get,
		searchRecipe,
		cuisineSort,
		dietaryTagsSort,
		updateLikers,
		removeLikers,
		likeSort
	}
