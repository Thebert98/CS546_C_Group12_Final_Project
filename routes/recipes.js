/**
 * @author Tanaya Bhole
 */
const express = require('express');
const router = express.Router();
const data = require('../data');
const recipeData = data.recipes;

router.get('/', async (req, res) => {
	try {
		const recipeList = await recipeData.getAll();
		res.json(recipeList);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/:id', async (req, res) => {
	try {
		const recipe = await recipeData.get(req.params.id);
		res.status(200).json(recipe);
	} catch (e) {
		res.status(404).json({ error: 'recipe not found' });
	}
});

router.post('/', async (req, res) => {
	const recipeeData = req.body;
	if (!recipeeData.recipeName) {
		res.status(400).json({ error: 'You must provide recipeName' });
		return;
	}
	if (!recipeeData.recipePicture) {
		res.status(400).json({ error: 'You must provide recipePicture' });
		return;
	}
	if (!recipeeData.recipeDescription) {
		res.status(400).json({ error: 'You must provide phone number' });
		return;
	}
	if (!recipeeData.ingredients) {
		res.status(400).json({ error: 'You must provide ingredients' });
		return;
	}
	if (!recipeeData.preppingDirections) {
		res.status(400).json({ error: 'You must provide preppingDirections' });
		return;
	}
	if (!recipeeData.cookingDirections) {
		res.status(400).json({ error: 'You must provide cookingDirections' });
		return;
	}

	if (!recipeeData.cuisineType) {
		res.status(400).json({ error: 'You must provide cuisineType' });
		return;
	}
	if (!recipeeData.likes) {
		res.status(400).json({ error: 'You must provide likes' });
		return;
	}
	if (!recipeeData.dietaryTags) {
		res.status(400).json({ error: 'You must provide dietaryTags' });
		return;
	}
	try {
		const {
			recipeName,
			recipePicture,
			recipeDescription,
			ingredients,
			preppingDirections,
			cookingDirections,
			cuisineType,
			likes,
			dietaryTags,
		} = recipeeData;
		const newrecipeePost = await recipeData.create(
			recipeName,
			recipePicture,
			recipeDescription,
			ingredients,
			preppingDirections,
			cookingDirections,
			cuisineType,
			likes,
			dietaryTags
		);
		res.json(newrecipeePost);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.delete('/:id', async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: 'You must Supply an ID to delete' });
		return;
	}
	try {
		await recipeData.get(req.params.id);
	} catch (e) {
		console.log(e);
		res.status(404).json({ error: 'recipe not found' });
		return;
	}
	try {
		await recipeData.remove(req.params.id);
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e });
	}
});

module.exports = router;
