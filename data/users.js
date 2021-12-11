const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 16;
const recipeData = require('./recipes')
//const AWS = require('aws-sdk')
//AWS.config.update({region: 'us-east-1'});
//let s3 = new AWS.S3({apiVersion: '2006-03-01'});



    const getAll = async function getAll(){
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        if(!userList) userList = [];
        userList.forEach((obj) =>{
            let tempId = obj._id.toString();
           // let newId = tempId.substring(tempId.length-1);
            obj._id = tempId;
        })
        return userList;
    }




    const get = async function get(id){
      /* s3.listBuckets(function(err,data){
            if(err){
                console.log('Error',err);
            }
            console.log("Success", data.Buckets);
        })
        */
        if(!id) throw "No id was provided";
        if(typeof id !== "string") throw "The id provided is not a string";
        let parsedId = await ObjectId(id)
        const userCollection = await users();
        let user = await userCollection.findOne({_id: parsedId});
        if(user == null) throw "There is no user with this id";
        user._id = id;
        return user;
}



async function updateProfilePicture(id,profilePicture){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!profilePicture)throw "No profile picture provided";
    if(typeof profilePicture !="string") throw "The profilePicture provided is not valid";
    if(profilePicture.length< 5) throw "The profilePicture provided is not valid";
    if((profilePicture.substring(profilePicture.length -5 ).toLowerCase() !== ".jpeg")&&(profilePicture.substring(profilePicture.length -4 ).toLowerCase() !== ".jpg")&&(profilePicture.substring(profilePicture.length -4 ).toLowerCase() !== ".png")) throw "The profilePicture provided is not a jpeg, jpg, or png file";
    
    let user = get(id);
    user.profilePicture = profilePicture;
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}

async function updateBio(id,bio){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!bio)throw "No bio provided";
    if(typeof bio !="string") throw "The bio provided is not valid";
    if(bio.length > 500) throw "The bio provided is not valid (500 character max)";
    
    let user = await get(id);
    user.bio = bio;
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}




async function updateFavoriteRecipe(id,favoriteRecipe){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!favoriteRecipe)throw "No favoriteRecipe provided";
    if(typeof favoriteRecipe !="string") throw "The favoriteRecipe provided is not valid";
    if(favoriteRecipe.length > 20) throw "The favoriteRecipe name provided is not valid (20 character max)";
    
    let user = await get(id);
    user.favoriteRecipe = favoriteRecipe;
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}

async function updateRecentlyViewed(id,recipeId){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!recipeId)throw "No recipeId provided";
    if(typeof recipeId !="string") throw "The recipeId provided is not valid";
    
    
    let user = await get(id);
    if(!user)throw "User not found"
    
    
    
       
    let recentlyViewed = false;
    
    

    if(user.recentlyViewedRecipes.length==0){
        
        user.recentlyViewedRecipes[0] = recipeId;
        
        user.count = user.count +1;
    
    }
    else{
        for(let i = 0; i < user.recentlyViewedRecipes.length;i++){
            if(recipeId === user.recentlyViewedRecipes[i]) recentlyViewed = true;
        }
        
        if(!recentlyViewed){
            
            user.recentlyViewedRecipes[user.count] = recipeId;
            if(user.count===4){
                user.count=0
              
            }
            else{
                
                user.count = user.count +1;
                
            }
        }
    }
    
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await get(id);
}




async function updateRecipes(id,recipeId){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!recipeId)throw "No recipeId provided";
    if(typeof recipeId !="string") throw "The recipeId provided is not valid";
    
    
    let user = await get(id);
    

    user.recipes.push(recipeId);
    
    
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}

async function updateLikes(id,recipeId){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!recipeId)throw "No recipeId provided";
    if(typeof recipeId !="string") throw "The recipeId provided is not valid";
    
    
    let user = await get(id);
    
    let included = false;
   
    for(let i = 0;i<user.likes.length;i++){
        if(recipeId===user.likes[i]){
            included = true;
           
        }
    }
  
   // console.log(user)
    if(included)throw "the user liked this post already";
    user.likes.push(recipeId);
    
    
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    //console.log(user)
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}

async function removeLikes(id,recipeId){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!recipeId)throw "No recipeId provided";
    if(typeof recipeId !="string") throw "The recipeId provided is not valid";
    
    let included = false;
    let pos=0;
    let user = await get(id);
   
    for(let i = 0;i<user.likes.length;i++){
        if(recipeId===user.likes[i]){
            included = true;
            pos = i;
        }
    }
    if(!included)throw "This user has not liked that post"
    user.likes.splice(pos,1);
    
    
    
    const userCollection = await users();
    let parsedId = ObjectId(id);
    user._id=parsedId;
    const updatedInfo = await userCollection.updateOne(
        {_id: parsedId},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    
    return await this.get(id);

}

async function checkLikes(id,recipeId){
    if(!id) throw "No id was provided";
    if(typeof id !== "string") throw "The id provided is not a string";
    if(!recipeId)throw "No recipeId provided";
    if(typeof recipeId !="string") throw "The recipeId provided is not valid";
    
   
    let user = await get(id);
    
    
    let check = false;
    for(let i = 0; i < user.likes.length;i++){
        if(recipeId === user.likes[i]) check = true;
    }
    return check;
}

module.exports = {
    getAll,
    get,
    updateProfilePicture,
    updateBio,
    updateFavoriteRecipe,
    updateRecentlyViewed,
    updateLikes,
    removeLikes,
    checkLikes,
    updateRecipes
}
