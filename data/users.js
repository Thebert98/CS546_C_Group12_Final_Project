const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require('mongodb');
const bcrypt = require("bcrypt");
const saltRounds = 16;




    
    const create = async function create(firstName,lastName,username,password){
        
        if(!firstName) throw "No firstName was provided";
        if(!lastName) throw "No lastName was provided";
        if(!username) throw "No username was provided";
        if(!password) throw "No password was provided";
        if(typeof firstName !== 'string') throw "The firstName provided is not a string";
        if(firstName.trim().length == 0) throw "The firstName provided is only white space";
        if(typeof lastName !== 'string') throw "The lastName provided is not a string";
        if(lastName.trim().length == 0) throw "The lastName provided is only white space";
        
        if(typeof username !== 'string') throw "The username provided is not a string";
        if(username.trim().length == 0) throw "The website provided is only white space";
        if (username.length > 4) throw "The username provided is not valid (length)";
        if(typeof password !== 'string') throw "The password provided is not a string";
        if(password.trim().length == 0) throw "The password provided is only white space";
        if(password.length < 8) throw "The password provided is not valid";
        let hasUpperCase = false;
        let hasNumber = false;
        let hasSpecialCharacter = false;
        for (let i = 0; i<password.length;i++){
            if(c == " ") spaceArray.push(c);
            else if((c.charCodeAt(0)>=65)&&(c.charCodeAt(0)<=90)) hasUpperCase = true;
            else if((c.charCodeAt(0)>=97)&&(c.charCodeAt(0)<=122));
            else if((c.charCodeAt(0)>=48)&&(c.charCodeAt(0)<=57)) hasNumber = true;
            else hasSpecialCharacter = true;
        }

        if((!hasUpperCase)||(!hasNumber)||(hasSpecialCharacter)) throw "Password is invalid";
       
        userCollection = await users();

        usernameCheck = await userCollection.findOne({username: username.toLowerCase()})

        if(usernameCheck != null) throw "username already exists";

    
        const hash = await bcrypt.hash(password,saltRounds);


        let newUser = {
            firstName : firstName, 
            lastName : lastName,
            username: username,
            password : hash,
            profilePicture: "default.jpg",
            favoriteRecipe : "",
            bio : "",
            recipes: [],
            recentViewedRecipes:[],
            count:0,
            likes: []
        };

        const insertInfo = await userCollection.insertOne(newUser);
        if(insertInfo.insertedCount === 0) throw 'Could not add user';


        const newId = insertInfo.insertedId.toString();
        
        let user = await get(newId);

        
        
    }


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
        user = await userCollection.findOne({_id: parsedId});
        

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
    
    user = get(id);
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
    
    user = get(id);
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
    
    user = get(id);
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

let checkUser = async function checkUser(username,password){
    if(!username)throw "No username was provided";
    if(!password) throw "No password was provided";
    if(username.length < 4) throw 'username must be at least 4 characters long'
    for (let i = 0; i<username.length;i++){
        if((username.charCodeAt(i)>=65)&&(username.charCodeAt(i)<=90));
        else if((username.charCodeAt(i)>=97)&&(username.charCodeAt(i)<=122));
        else if((username.charCodeAt(i)>=48)&&(username.charCodeAt(i)<=57));
        else throw 'username cannot contain characters other than letters and numbers';
    }

    userCollection = await users();
    if(password.length < 6) throw "password must be at least 6 characters long";
    if(password != password.trim(" ")) throw "password provided contains a space which is not allowed";

    usernameCheck = await userCollection.findOne({username: username.toLowerCase()})

    if(usernameCheck == null) throw "Either the username or password is invalid";
    if(!await bcrypt.compare(password,usernameCheck.password))throw "Either the username or password is invalid";

    return {authenticated:true};
}




module.exports = {
    create,
    getAll,
    get,
    updateProfilePicture,
    updateBio,
    updateFavoriteRecipe,
    checkUser
}
