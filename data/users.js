const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 16;


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
    if(profilePicture.substring(website.length -5 ).toLowerCase() !== ".jpeg") throw "The profilePicture provided is a jpeg file";
    
    let user = get(id);
    user.profilePicture = profilePicture;
    const userCollection = await users();
    id = ObjectId(id);
    const updatedInfo = await restaurantCollection.updateOne(
        {_id: id},
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
    if(bio.length > 500) throw "The bio provided is not valid";
    
    let user = get(id);
    user.bio = bio;
    const userCollection = await users();
    id = ObjectId(id);
    const updatedInfo = await restaurantCollection.updateOne(
        {_id: id},
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
    if(favoriteRecipe.length > 20) throw "The favoriteRecipe provided is not valid";
    
    let user = get(id);
    user.favoriteRecipe = favoriteRecipe;
    const userCollection = await users();
    id = ObjectId(id);
    const updatedInfo = await restaurantCollection.updateOne(
        {_id: id},
        {$set: user}
        );
    if (updatedInfo.modifedCount === 0){
        throw "Could not update user successfully";
    } 
    return await this.get(id);
}





module.exports = {
    getAll,
    get,
    updateProfilePicture,
    updateBio,
    updateFavoriteRecipe,
}
