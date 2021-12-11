const mongoCollections = require('../config/mongoCollections');
const mongocall = require("mongodb");
const {ObjectId} = require('mongodb');
const comments = mongoCollections.comments;
const recipesC = mongoCollections.recipes;

//Create a comment
async function createComment(recipeId,subject,description){
  if(!recipeId){
    throw 'No recipe ID was provided'
  }
  if(typeof recipeId!='string'){
    throw 'Recipe ID must be a string'
  }
  if(recipeId.length==0){
    throw 'Recipe ID cannot be empty'
  }
  if(!subject){
    throw 'No Subject was provided'
  }
  if(!description){
    throw 'No description was provided'
  }
  if(typeof subject !='string'){
    throw 'Subject must be a string'
  }
  if(typeof description!='string'){
    throw 'Description must be a string'
  }
  if(subject.trim(' ').length===0){
    throw 'Subject cannot contain only whitespaces'
  }
  if(description.trim(' ').length===0){
    throw 'Description cannot contain only whitespaces'
  }
  let x = ObjectId(recipeId);
  let commentObj = {subject:subject,description:description};
  const getRecipes = await recipesC();
  const insertComment = await getRecipes.updateOne({_id:x},{$push:{comments:commentObj}});
  return insertComment;
}


module.exports={createComment}