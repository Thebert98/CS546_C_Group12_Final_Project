/**
 * @author Tanaya Bhole
 */
const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
const { all } = require('../routes/recipes');

const recipes = mongoCollections.recipes;
module.exports = {
	/**
	 * create Recipe in Database
	 * @param {*} recipeName
	 * @param {*} recipeDescription
	 * @param {*} recipePicture
	 * @param {*} ingredients
	 * @param {*} preppingDirections
	 * @param {*} cookingDirections
	 * @param {*} cuisineType
	 * @param {*} likes
	 * @param {*} dietaryTags
	 * @returns
	 */
	async create(
		recipeName,
		recipePicture,
		recipeDescription,
		ingredients,
		preppingDirections,
		cookingDirections,
		cuisineType,
		likes,
		dietaryTags
	) {
		const recipeCollection = await recipes();

		if (!recipeName || typeof recipeName != 'string')
			throw 'A recipeName of type string must be provided for your recipe recipeName';
		if (!recipePicture || typeof recipePicture != 'string')
			throw 'A recipeName of type string must be provided for your recipe recipeName';
		if (!location || typeof location != 'string') {
			throw 'A location of type string must be provided for your recipe location';
		}
		if (!recipeDescription || typeof recipeDescription != 'string') {
			throw 'A phonenumber of type string must be provided for your recipe phonenumber';
		}
		if (typeof dietaryTags != 'object') {
			throw 'dietaryTags: Not a valid object';
		}
		if (
			typeof dietaryTags.vegan !== 'boolean' ||
			typeof dietaryTags.vegetarian !== 'boolean' ||
			typeof dietaryTags.nonvegetarian !== 'boolean'
		) {
			throw 'dietaryTags: params are not boolean';
		}
		if (!ingredients) {
			throw 'kindly enter ingredients';
		}
		if (!Array.isArray(ingredients)) {
			throw 'No inputs provided or the  ingredients is not an array';
		}

		for (let i = 0; i < ingredients.length; i++) {
			if (typeof ingredients[i] != 'string') {
				throw 'The values of ingredients are not a string';
			}
			if (ingredients[i] == ' ') {
				throw 'The values of ingredients are not a string';
			}
			if (!preppingDirections) {
				throw 'kindly enter preppingDirections';
			}
			if (!Array.isArray(preppingDirections)) {
				throw 'No inputs provided or the  preppingDirections is not an array';
			}
		}
		for (let i = 0; i < preppingDirections.length; i++) {
			if (typeof preppingDirections[i] != 'string') {
				throw 'The values of preppingDirections are not a string';
			}
			if (preppingDirections[i] == ' ') {
				throw 'The values of preppingDirections are not a string';
			}
		}
		if (!cookingDirections) {
			throw 'kindly enter  cookingDirections';
		}
		if (!Array.isArray(cookingDirections)) {
			throw 'No inputs provided or the  cookingDirections is not an array';
		}

		for (let i = 0; i < cookingDirections.length; i++) {
			if (typeof cookingDirections[i] != 'string') {
				throw 'The values of cookingDirections are not a string';
			}
			if (cookingDirections[i] == ' ') {
				throw 'The values of cookingDirections are not a string';
			}
		}
		if (!cuisineType || typeof cuisineType != 'string') {
			throw 'kindly enter cusine and it must be string';
		}

		if (!likes || typeof likes != 'number') {
			throw 'kindly enter comments and it must be number';
		}

		const newRecipe = {
			recipeName: recipeName,
			recipePicture: recipePicture,
			recipeDescription: recipeDescription,
			ingredients: ingredients,
			preppingDirections: preppingDirections,
			cookingDirections: cookingDirections,
			cuisineType: cuisineType,
			comments: [],
			dietaryTags: dietaryTags,
			likes: likes,
		};

		const insertRecipe = await recipeCollection.insertOne(newRecipe);
		if (insertRecipe.insertedCount === 0) {
			throw `error while adding ${newRecipe}`;
		}
		let recipeId = insertRecipe.insertedId;
		recipeId = recipeId.toString();

		return await this.get(recipeId);
	},

	/**
	 * Retrieve All recipes
	 * @returns
	 */
	async getAll() {
		const recipeCollection = await recipes();
		const allrecipe = await recipeCollection.find({}).toArray();

		let recipe = [];
		for (i in allrecipe) {
			recipe.push({
				_id: allrecipe[i]._id,
				recipeName: allrecipe[i].recipeName,
			});
		}

		return recipe;
	},

	/**
	 * retrieve individual recipe
	 * @param {*} id
	 * @returns
	 */
	async get(id) {
		let { ObjectId } = require('mongodb');

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
	},
};
