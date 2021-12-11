let {ObjectId} = require("mongodb");
let mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcryptjs');
const saltRounds = 5;

//Creating a user

async function createUsers(firstName,lastName,username,phoneNumber,password){
    if(!firstName){
        throw 'First Name must be provided'
    }
    if(!lastName){
        throw 'Last Name must be provided'
    }
    if(!username){
        throw 'Username must be provided'
    }
    if(!phoneNumber){
        throw 'Phone number must be provided'
    }
    if(!password){
        throw 'Password must be provided'
    }
    if(typeof firstName != 'string'){
        throw 'First Name must be a string'
    }
    if(typeof lastName != 'string'){
        throw 'Last Name must be a string'
    }
    if(typeof username != 'string'){
        throw 'Username must be a string'
    }
    if(typeof phoneNumber != 'string'){
        throw 'Phone Number must be a string'
    }
    if(typeof password != 'string'){
        throw 'Password must be a string'
    }
    if(firstName.length===0){
        throw 'First Name cannot be empty'
    }
    if(lastName.length===0){
        throw 'Last Name cannot be empty'
    }
    if(username.length===0){
        throw 'Username cannot be empty'
    }
    if(phoneNumber.length===0){
        throw 'Phone Number cannot be empty'
    }
    if(password.length===0){
        throw 'Password cannot be empty'
    }
    if(firstName.indexOf(' ')>=0){
        throw 'First Name cannot contain empty spaces'
    }
    if(lastName.indexOf(' ')>=0){
        throw 'Last Name cannot contain empty spaces'
    }
    if(username.indexOf(' ')>=0){
        throw 'Username cannot contain empty spaces'
    }
    if(phoneNumber.indexOf(' ')>=0){
        throw 'Phone Number cannot contain empty spaces'
    }
    if(password.indexOf(' ')>=0){
        throw 'Password cannot contain empty spaces'
    }
    if(username.length<4){
        throw 'Username should be atleast 4 characters long'
    }
    let r1 = /^[0-9]*$/;
    if(!phoneNumber.match(r1)){
        throw 'Phone Number can only contain numbers'
    }
    if(password.length<6){
        throw 'Password should be atleast 6 characters long'
    }
    let regex = /[^0-9a-z]/gi
    if(username.match(regex)){
        throw 'Username cannot contain special characters'
    }
    if(phoneNumber.match(regex)){
        throw 'Phone Number cannot contain special characters'
    }
    if(firstName.match(regex)){
        throw 'First Name cannot contain special characters'
    }
    if(lastName.match(regex)){
        throw 'Last Name cannot contain special characters'
    }
    if(phoneNumber.length>10){
        throw 'Phone Number cannot have more than 10 numbers'
    }
    if(phoneNumber.length<10){
        throw 'Phone Number cannot have less than 10 numbers'
    }
    let regex3 = /\d/;
    if(firstName.match(regex3)){
        throw 'First Name cannot contain numbers'
    }
    if(lastName.match(regex3)){
        throw 'Last Name cannot contain numbers'
    }
    let r2 = /^\d+$/;
    if(username.match(r2)){
        throw 'Username cannot contain only Numbers'
    }
    username=username.toLowerCase();
    const hash = await bcrypt.hash(password,saltRounds);
    const userCollections = await users();
    let newUser = {
        firstName : firstName, 
        lastName : lastName,
        username: username,
        password : hash,
        phoneNumber:phoneNumber,
        profilePicture: "default.jpg",
        favoriteRecipe : "",
        bio : "",
        recipes: [],
        recentlyViewedRecipes:[],
        count:0,
        likes: []
    };
    
    let existingUser = false;
    existingUser = await userCollections.findOne({username:username});
    if(existingUser){
        throw 'A user with this username already exists, please use a different Username'
    }
    const insertUser = await userCollections.insertOne(newUser);
    if(insertUser.insertedCount === 0){
        throw 'Could not add the user'
    }
    return {inserted : true};
}

// Authenticating a user

async function checkUser(username,password){
    if(!username){
    throw 'Username must be provided'
    }
    if(!password){
        throw 'Password must be provided'
    }
    if(typeof username != 'string'){
        throw 'Username must a string'
    }
    if(username.length === 0){
        throw 'Username cannot be empty'
    }
    if(username.indexOf(' ')>=0){
        throw 'Username cannot contain spaces'
    }
    if(typeof password != 'string'){
        throw 'Password must be a string'
    }
    if(username.length<4){
        throw 'Length of the username should be at least 4'
    }
    let regex2 = /[^0-9a-z]/gi
    if(username.match(regex2)){
        throw 'Username cannot contain special characters'
    }
    if(password.length < 6){
        throw 'Password must be atleast 6 characters long'
    }
    let r5 = /^\d+$/;
    if(username.match(r5)){
        throw 'Username cannot contain only numbers'
    }
    const searchUser = await users();
    const foundUsers = await searchUser.findOne({username:username});
    if(foundUsers==null){
        throw 'No user with this username exists'
    }
        if(foundUsers.username===username){
            let comparePass = await bcrypt.compare(password,foundUsers.password);
            if(comparePass){
                return {authenticated: true};
            }else{
                throw 'Either the username or password is invalid'
            }
        } 
    }


module.exports={
    createUsers,
    checkUser
}