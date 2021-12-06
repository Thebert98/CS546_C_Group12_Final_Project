const mongoCollections = require('../config/mongoCollections');
const mongocall = require("mongodb");
const {ObjectId} = require('mongodb');
const comments = mongoCollections.comments;
const recipesC = mongoCollections.recipes;

//Create a comment
async function createComment(restaurantId,subject,description){
  if(!restaurantId){
    throw 'No restaurant ID was provided'
  }
  if(typeof restaurantId!='string'){
    throw 'Restaurant ID must be a string'
  }
  if(restaurantId.length==0){
    throw 'Restaurant ID cannot be empty'
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
  let x = ObjectId(restaurantId);
  let commentObj = {subject:subject,description:description};
  const getRecipes = await recipesC();
  const insertComment = await getRecipes.updateOne({_id:x},{$push:{comments:commentObj}});
  return insertComment;
}
// createComment('61ac5ab7a024e4bd1fcd180a','xyz','Amazing')


module.exports={createComment}