const mongoCollections = require('../config/mongoCollections');
const data = require('../data');
const userData = require('../data/users')
const user = require('../data/main');
let { ObjectId } = require('mongodb');
const users = mongoCollections.users;
const recipe = require('../data/recipes')
const recipes = mongoCollections.recipes;
const commentsData =  data.comments;

async function seed(){
    let username = 'yash'
    try{

        await user.createUsers('Yash','Patole',username,'9702883614','password1');

    }catch(e){
        console.log(e);
    }
    let usersCollection = await users();
    let poster = await usersCollection.findOne({username:username});
   
    let posterId = poster._id.toString();
try{
     await userData.updateProfilePicture(posterId,'pp.jpg');
     await userData.updateBio(posterId, 'Web enthusiast. Hipster-friendly coffee expert. Avid pop culture fanatic. Friend of animals everywhere. Subtly charming thinker. Passionate writer.');
     await userData.updateFavoriteRecipe(posterId, 'Kababs');
}catch(e){
    console.log(e);
}

    try{

        await recipe.create(posterId,'SWEET POTATO CURRY WITH SPINACH AND CHICKPEAS','spcp.jpg', 
        'This a wonderfully full flavored, vegetarian curry. The recipe is adapted from a recipe that I received in an email from Vegetarian Times.', 
        '1⁄2 large sweet onions chopped or 2 scallions thinly sliced, 1 - 2 teaspoon canola oil, 2 tablespoons curry powder, 1 tablespoon cumin, 1 teaspoon cinnamon, 10 ounces fresh spinach washed stemmed and coarsely chopped, 2 large sweet potatoes peeled and diced (about 2 lbs), 1 (14 1/2 ounce) can chickpeas rinsed and drained, 1⁄2 cup water, 1 (14 1/2 ounce) can diced tomatoes can substitute fresh if available, 1⁄4 cup chopped fresh cilantro for garnish basmati rice or brown rice for serving',
        ' READY IN: 30mins; SERVES: 6; UNITS: US',
        'You may choose to cook the sweet potatoes however you prefer. I like to peel, chop and steam mine in a veggie steamer for about 15 minutes. Baking or boiling work well too. While sweet potatoes cook, heat 1-2 tsp of canola or vegetable oil over medium heat. Add onions and sauté 2-3 minutes, or until they begin to soften. Next, add the curry powder, cumin, and cinnamon, and stir to coat the onions evenly with spices. Add tomatoes with their juices, and the chickpeas, stir to combine. Add ½ cup water and raise heat up to a strong simmer for about a minute or two. Next, add the fresh spinach, a couple handfuls at a time, stirring to coat with cooking liquid.When all the spinach is added to the pan, cover and simmer until just wilted, about 3 minutes. Add the cooked sweet potatoes to the liquid, and stir to coat. Simmer for another 3-5 minutes, or until flavors are well combined. Transfer to serving dish, toss with fresh cilantro, and serve hot. This dish is nice served over basmati or brown rice.',
        'indian',
        'vegetarian');
    }catch(e){
        console.log(e);
    }   
    let recipeCollection = await recipes();
    let posts = await recipeCollection.find({}).toArray();
    posts = posts.reverse()
    let post = posts[0];
    //let post = posts[0];
    try{

        await userData.updateRecipes(posterId,post._id.toString())

    }catch(e){
        console.log(e);
    }
  try{  
   commentsData.createComment(post._id.toString(), 'Easy', 'Looks easy to make');
   commentsData.createComment(post._id.toString(), "Suggestions", "What other veggie would you reccomend..My blushing bride wants nothing to do with cook leafy kind .thanks frederick");
  }catch(e){
      console.log(e);
  }


  try{

    await recipe.create(posterId,'PALAK PANEER','p.jpg', 
    'Creamy and rich, a delight to eat. A dish I fell in love with at a local restaurant and adapted a recipe to closely resemble theirs.', 
    '2 (5 ounce) bags Baby Spinach, 1 large onion, 1⁄4 teaspoon cinnamon, 1⁄4 teaspoon ground cardamom, 1 teaspoon ground ginger, 1⁄2 teaspoon chopped garlic, 1⁄2 cup chopped tomato, 3 tablespoons plain yogurt, 1 tablespoon coriander powder, 1⁄2 teaspoon garam masala, 1⁄2 teaspoon paprika, 1⁄2 teaspoon salt, 8 ounces paneer cheese cut into cubes, 1⁄4 cup heavy cream',
    ' READY IN: 1hr; SERVES: 6; UNITS: US',
    'Cut spinach into shreds and cook in 3 tablespoons water until tender; remove from heat. Saute onion, cinnamon, cardamom, and ginger in 1-2 tablespoons ghee or oil until onion is translucent. Then add garlic and chopped tomatoes, and reduce heat. Cook this briefly and slowly blend in yogurt a little at a time to prevent curdling. Add coriander, garam masala, paprika, and salt, mixing well. Add cooked spinach with liquid, cover and simmer on low heat for approximately 20-30 minutes. Remove from heat. Take half of spinach mixture and puree in food processor or blender, and return to mixture and stir. Slowly stir in heavy cream, and heat through on low heat. Add paneer cubes. Serve',
    'indian','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Excellent', 'So much great depth of flavor in this dish and I loved it! Served it with basmati rice and naan!');
commentsData.createComment(post._id.toString(), 'Delish', 'I have used tofu in this recipe for a non authentic version. Works very well, especially if you drain and then marinade it. Thanks for the "63 ways to make Indian take out" collection today, I am a big fan of Indian food!');
}catch(e){
  console.log(e);
}


  try{

    await recipe.create(posterId,'ROASTED GREEN BEANS','rgb.jpg', 
    'A great alternative to fast-food French fries, my family and friends love these as a snack or hors doeuvre. No matter how many I make, its never enough!', 
    '2 lbs green beans, 1 - 2 tablespoon olive oil (or just enough to lightly coat beans), 1 teaspoon kosher salt, 1⁄2 teaspoon fresh ground pepper',
    ' READY IN: 25mins; SERVES: 4-6; UNITS: US',
    'Preheat oven to 400°F. Wash, dry well, and trim green beans. Put green beans on a jelly roll pan. Drizzle with olive oil. Sprinkle with salt and pepper to taste (I like them salty so I use about 1 1/2 teaspoons of salt and about 8-10 grinds of the pepper mill). Use your hands to be sure all the beans are evenly coated and spread them out into 1 layer. Roast for 20-25 minutes, turning after 15 minutes, until beans are fairly brown in spots and somewhat shriveled. Serve hot or at room temperature.',
    'indian','vegan');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Easy-peasy lemon squeesy', 'Easy and delicious recipe. Definitely coat with olive oil as thats what makes the salt and pepper stick. I made this dish as part of our Thanksgiving meal and it was a hit even with the kids.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'THAI COCONUT RICE','tcr.jpg', 
    'Creamy coconut combined with a little bite from red pepper flakes and ginger, create a delicious rice dish to accompany a wide range of entrees.', 
    '1 cup jasmine rice or 1 cup long grain rice, 1 (14 ounce) can coconut milk, 1⁄4 cup water, 1⁄2 teaspoon salt, 1⁄2 teaspoon sugar, 1⁄2 teaspoon crushed red pepper flakes, 1⁄8 teaspoon turmeric, 1 teaspoon finely chopped fresh ginger, finely chopped crystallized ginger(optional), sliced almonds(optional)',
    ' READY IN: 40mins; SERVES: 4; UNITS: US',
    'Combine all ingredients in a saucepan, except the crystallized ginger and sliced almonds. Stir well to combine. Cook over medium high heat, stirring until mixture comes to a low boil. Immediately reduce heat to low. Cover and cook for about 18 minutes. Fluff with a fork. The cover, and let sit for 5 more minutes. Garnish the finished rice with the candied ginger and the sliced almonds.',
    'indian','vegan');
}catch(e){
    console.log(e);
}
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), '10 stars', 'I used basmati rice, because that is what I had on hand, and made this in a rice cooker. It was awesome. I will absolutely make it again. Thanks!');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'SINDHI BIRYANI','sb.jpg', 
    'Rather than the regular Biryani, Sindhi Biryani is more spicy and tasty. Do not know whether it originates from Sindh or not. Just make sure about one thing if you do not want your rice overly cooked, keep on checking them while you r boiling them and drain them as soon as you turn off the heat. Do NOT leave them in the water once you turn off the heat. You can also add some vinegar while boiling the rice so they will not stick together. Note, you can also substitute mutton with chicken. Potatoes are not necessary if you use Chicken though. P.S For Desi people the rice measurement is 5 tea cups and not mugs.', 
    '1 - 1 1⁄2 kg mutton, 5 cups basmati rice (soaked in water for atleast 1/2 an hour), 1⁄2 kg potato (cut into large chunks), 1 1⁄2 cups oil, 3 medium onions (sliced), 2 teaspoons garlic paste (Lehsan), 2 teaspoons ginger (Adrak), 1⁄2 kg tomatoes (chopped), 10 -15 prunes (Aaloobukharay), 2 teaspoons salt, 4 teaspoons red chili powder, 10 cloves (Laung), 8 green cardamoms (Chhoti Ilaichi), 10 pieces black pepper (Kali Mirch), 2 teaspoons cumin seeds (Zeera), 2 cinnamon sticks (Dalchini), 4 black cardamom pods (Bari Ilaichi), 2 bay leaves (Tez Patta), 250g yogurt, 6 green chilies, 2 tablespoons coriander leaves (Dhaniya), 2 tablespoons mint leaves (Podina), 3 teaspoons salt, 3 bay leaves, 3 cinnamon sticks, 2 black cardamom pods, 2 pinches orange food coloring, 1 tablespoon mint leaf (chopped)',
    ' READY IN: 1hr 30mins SERVES: 20; YIELD: 20 3/4 cup rice serving besides the potatoes and meat; UNITS: US',
    'Slice the onion and fry it in oil until it is light brown. Take out 1/4 of it and keep aside. Add Garlic (Lehsan), Ginger (Adrak), tomatoes, prunes (Aaloobukharay), salt, red chili powder, cloves, cardamoms, Black Pepper, (Kali Mirch), Cumin Seeds (Zeera), cinnamon, black cardamom pods and bay leaves to the remaining fried onions. Fry this until the tomatoes are tender and the water is dry. Then add meat, yogurt and water (if desired) and cook on medium heat until the meat is tender and the water has evaporated. On other side boil the potatoes until they are half cooked.Now, add green chillies, mint, coriander leaves, and the half boiled potatoes to the meat. Simmer for 2, 3 minutes. Your meat curry is done. Boil the rice with salt, bay leaves, cinnamon sticks and black cardamom and drain the water off when the rice is half done. Layer the curry with the rice in a pot in one on one layers. Sprinkle the food color, fried onions, and chopped mint leaves on top of the last layer. Close the lid tightly making sure no steam passes out of the pot and cook on low heat until the rice is done. Gently mix it before serving. Serve with Raita.',
    'indian','nonvegetarian');
}catch(e){
    console.log(e);
}
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Dought', 'Are the whole spices ground or left whole when added to the pot??');
}catch(e){
  console.log(e);
}



username = 'Ruchita'
    try{

        await user.createUsers('Ruchita','Paithankar',username,'2676706058','2password');

    }catch(e){
        console.log(e);
    }
    poster = await usersCollection.findOne({username:username.toLowerCase()});
    posterId = poster._id.toString();
try{
     await userData.updateProfilePicture(posterId,'rp.jpg');
     await userData.updateBio(posterId, 'Extreme beer junkie. Hipster-friendly pop culture geek. Web evangelist. Proud food specialist.');
     await userData.updateFavoriteRecipe(posterId, 'Pizza');
}catch(e){
    console.log(e);
}

    try{

        await recipe.create(posterId,'PIZZA CASSEROLE','pc.jpeg', 
        'This is similar to many Baked Pasta dishes but with the distinct flavors of pizza.I created this recipe yesterday and took it to a dinner party as the main dish. It was a big hit and every woman there asked for the recipe. I decided that anything that popular should be posted here. You do not have to use the same kind of pasta I did...but should use a pasta which will remain slightly firm after boiling and baking so that it is not mushy. NOTE** I have had several people ask about when to add the spices...you can either add them to the sauce or to the sausage when you cook it. Either way works great! Since this recipe is an original creation of mine, it tickles me so very much that lots of people are enjoying it! Thanks everyone!', 
        '1 lb bow tie pasta, 1 lb Jimmy Dean sausage, 1 large onion medium size chopped (cooked with sausage), 2 (26 ounce) jars spaghetti sauce (I used Bertollis Tomato & Basil), 1 lb cubed cooked ham, 1 lb of sliced pepperoni, 3 (8 ounce) bags of shredded mozzarella cheese, 6 tablespoons of grated parmesan cheese, 1 teaspoon garlic powder, 1 teaspoon dried oregano',
        'READY IN: 1hr 10mins; SERVES: 8-10; UNITS: US',
        'Cook pasta in boiling water until al denté. Cook sausage, garlic powder and oregano with onions until the juices run clear. In a lightly greased 9x13x3 inch pan, pour a small amount of sauce to lightly coat bottom. Layer ingredients in the order listed above. 1st layer-1/3 of the pasta, 1/3 remaining sauce, 1 bag of mozzarella cheese, 2 Tablespoons parmesan cheese, sausage and onions. 2nd layer-1/2 of the remaining pasta, 1/2 remaining sauce, 1 bag of mozzarella cheese, 2 Tablespoons parmesan cheese, ham. 3rd layer-all remaining pasta, all remaining sauce, 1 bag of mozzarella cheese, 2 Tablespoons parmesan cheese, all the pepperoni(completely covering the entire top with pepperoni). Bake at 375°F for 40 minutes. Let sit for 5 minutes before serving.',
        'italian','nonvegetarian');
    }catch(e){
        console.log(e);
    }   
    posts = await recipeCollection.find({}).toArray();
    posts = posts.reverse()
    post = posts[0];
    //let post = posts[0];
    try{

        await userData.updateRecipes(posterId,post._id.toString())

    }catch(e){
        console.log(e);
    }
  try{  
   commentsData.createComment(post._id.toString(), 'Yummmy', 'Very good pizza');
   commentsData.createComment(post._id.toString(), "eh", "It was okay");
  }catch(e){
      console.log(e);
  }


  try{

    await recipe.create(posterId,'GROUND BEEF PIZZA','gbp.jpg', 
    'This is my kind of favorite pizza. I have not try this one but this is almost the same as the one I did without any recipe. This is from the issue of November 2005, Coup de Pouce. ETA : I made it on July 24, 2011. I used 1 lb of lean ground beef and also a store bought dough already made. I added chopped red bell pepper.', 
    '1⁄2 lb lean ground beef 1 small onion chopped, 3 garlic cloves minced, 1⁄2 teaspoon dried oregano, 1⁄4 teaspoon salt, 1⁄4 teaspoon fresh black pepper, 1 lb pizza dough (for 1 pizza), 1⁄4 cup pizza sauce, 3/4 cup cheddar cheese grated, 3/4 cup mozzarella cheese, grated',
    '  READY IN: 25mins;  SERVES: 4;  UNITS: US',
    'In a skillet, cook ground beef, onion, garlic, oregano, salt and pepper at medium-high heat, stirring from time to time, 3 to 5 minutes or until beef is no longer pink. Drain any fat. Set aside. On a lightly floured surface, lower the dough in a circle of 12 inches of diameter. Put on a greased pizza plate. Spread sauce on the pizza dough. Garnish with beef preparation and sprinkle with cheddar and mozzarella cheeses. Cook on the lowest grill in a preheated oven of 500 F for about 10 minutes or until cheese is bubbling and crust is golden and slighly inflated.',
    'italian','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'very bad', 'never eating again');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'RED LOBSTER PIZZA','rlp.jpg', 
    'I got this idea to re-create &quot;Red Lobsters &quot;Lobster Pizza&quot; because it was SO GOOD.... so I went to Red Lobster site to see if they offered the recipe and sure enough, there it was, so I went to the store and bought everything I needed and went home and made it... uhmm good! Great lunch or snack. or appetizer if a couple friends come over. Enjoy! Great with beer.', 
    '1 (10 inch) flour tortillas (per pizza), 1 ounce Land O Lakes roasted garlic butter with oil, 2 tablespoons grated fresh parmesan cheese, 4 ounces drained roma tomatoes diced 3/8-inch (approx. 2-3 tomatoes), 2 tablespoons fresh basil cut in 1/8-inch julienne strips, 2 ounces lobster meat, cut in 1/2-inch -3/4-inch chunks, 1⁄2 cup shredded Italian cheese blend',
    ' READY IN: 20mins; SERVES: 1; UNITS: US; Chefs Tip: Be sure you DRAIN the tomatoes and the lobster meat before sprinkling them over the pizza shell. Otherwise your pizza will turn out soggy.',
    'Heat oven to 450°F. Lightly brush entire topside of tortilla with garlic butter (edge to edge). Sprinkle two tablespoons Parmesan cheese over the garlic butter. After draining the diced tomatoes, sprinkle evenly over Parmesan cheese. To julienne the basil, wash it and shake off excess water. Pick off leaves and stack on top of one another. Using a chefs knife, cut into 1/8" strips. Do not chop. Sprinkle evenly over the diced tomatoes. Make sure lobster meat is cut into 1/2" - 3/4" chunks. Portion lobster meat, drain it unless its fresh off the tail and then sprinkle it evenly over the tomatoes. Sprinkle the Italian six-cheese blend evenly over the diced tomatoes. Refrigerate until ready to cook. Brush a pizza pan lightly with vegetable oil and sprinkle lightly with ground black pepper and kosher salt. (This prep is essential!). When oven is ready, place pizza on pan and cook approximately four to five minutes. Remove from pan and cut into eight wedges. Squeeze fresh lemon over pizza for extra flavor and serve.',
    'italian','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Tasty', 'will recommend to everyone.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'CHICKEN SHWARMA','cs.jpg', 
    'As part of a mezze, or as the main ingredient in a sandwich, or pita wrap, this is a flavorful, homey recipe. This recipe is translated from Cuisine du Liban by Pomme Larmoyer.', 
    '2 lbs chicken breasts, 4 tablespoons lemon juice, 1 tablespoon olive oil, 3 garlic cloves, 3 tablespoons yoghurt, 1 teaspoon, tomato paste, 1 teaspoon ground cumin, 1 teaspoon ground coriander, 1⁄2 teaspoon pepper, 1⁄2 - 1 teaspoon salt',
    'READY IN: 24hrs 10mins; SERVES: 6; UNITS: US',
    'Cut the chicken breasts, or just white chicken meat, into long, slim strips, then into lengths that are about an inch long. Put them into a bowl or other container, and allow them to marinate in the lemon juice (or white vinegar, if you want), olive oil, crushed and diced garlic, yoghurt, tomato paste, salt, pepper and spices. Allow 24 hours for the flavors to develop. The following day, remove and drain the chicken pieces from the marinade, and saute them for 10 minutes. Serve hot as a mezze or for sandwiches along with thinly sliced onions, deseeded tomato, and any other crudites, or pickled crudites.',
    'lebanese','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Liked it', 'I substituted buttermilk for the yogourt, ketchup for the tomato paste and oregano for the coriander because thats what was on hand. Very tasty both freshly grilled and cold in a sandwich the next day.');
commentsData.createComment(post._id.toString(), 'Favourite Food', 'So Yummy! This was just the perfect chicken recipe for Hubby & I. I kept the chicken whole and just pounded it thin, then let it marinate for 2 days, and then we grilled it on Monday night for dinner. It practically melted in our mouths, it was so tasty. I would not change a thing about this recipe, and I will definately be making it again. Thanks for posting this! Its my new favorite.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'MACARONI AND CHEESE','mc.jpg', 
    'Got this off of the bed. Good Morning America. Came to this website after I saw nigella lawson cook this on the show. This is the best macaroni and cheese I have ever tasted!!', 
    '1 tablespoon vegetable oil, 1 lb macaroni, 8 tablespoons butter, 1 tablespoon butter, 1⁄2 cup muenster cheese shredded, 1⁄2 cup mild cheddar cheese shredded, 1⁄2 cup sharp cheddar cheese shredded, 1⁄2 cup monterey jack cheese shredded, 2 cups half and half, 8 ounces Velveeta cheese cubed, 2 eggs lightly beaten, 1⁄4 teaspoon seasoning salt, 1⁄8 teaspoon fresh ground pepper',
    'READY IN: 50mins; SERVES: 8; UNITS: US',
    'Preheat oven to 350. Lightly butter a deep 2 1/2 quart baking dish. Fill a large pot with water and bring to a rapid boil. Add macaroni and the 1 TB oil. Cook for 7 minutes, or until somewhat tender. Drain well, and return to the pot. Meanwhile, in a small saucepan, melt 8 TB of the butter. Stir into macaroni. In a large bowl, combine all of the shredded cheeses. To the macaroni, add 1 1/2 cups of shredded cheeses, half and half, the cubed cheese and the eggs, and the seasoned salt and pepper. Transfer to the prepared casserole dish, and top with remaining 1/2 cup shredded cheese. Dot with remaining 1 TB of the butter. Bake for 30-35 minutes or until the edges are golden brown and bubbly. Serve hot. Serves 8.',
    'italian','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Wonderful', 'Made this for 4 and added 4 cloves minced garlic.');
}catch(e){
  console.log(e);
}



username = 'Monica'
    try{

        await user.createUsers('Monica','Geller',username,'5515541184','3password');

    }catch(e){
        console.log(e);
    }
    poster = await usersCollection.findOne({username:username.toLowerCase()});
    posterId = poster._id.toString();
try{
     await userData.updateProfilePicture(posterId,'mg.png');
     await userData.updateBio(posterId, 'Social media buff. Lifelong web geek. Total creator. Pop culture fanatic. Organizer.');
     await userData.updateFavoriteRecipe(posterId, 'Tacos');
}catch(e){
    console.log(e);
}

    try{

        await recipe.create(posterId,'SOUR CREAM CHICKEN ENCHILADAS','sscc.jpg', 
        'Easy to assemble, deliciously creamy and a great choice for once-a-month cooking and there is NO canned cream soup in my enchiladas -- Hope you give them a try!', 
        '1 lb chicken breast diced, 1 medium onion minced, 1 tablespoon vegetable oil, 8 (8 inch) flour tortillas softened, 1 1⁄2 cups grated monterey jack cheese or 1 1/2 cups Mexican blend cheese divided, 1⁄4 cup butter, 1⁄4 cup flour, 1 (15 ounce) can chicken broth, 1 cup sour cream, 1 (4 ounce) can chopped green chilies or 2 fresh chili peppers minced',
        'READY IN: 45mins; SERVES: 8; UNITS: US',
        'In a frying pan, cook chicken and onion together in oil over medium-high heat until chicken is just done. Divide cooked chicken evenly between 8 tortillas; add 1 1/2 tablespoons cheese to each tortilla. Roll enchiladas and place seam-side down in a 9x13 baking dish that has been lightly sprayed with no-stick cooking spray. Melt butter in a medium saucepan; stir in flour to make a roux, stir and cook until bubbly, and gradually whisk in chicken broth then bring to boiling, stirring frequently. Remove from heat; stir in sour cream and green chilies. Pour sauce evenly over enchiladas. Top with remaining 3/4 cup cheese (a baking dish may be double-wrapped and frozen at this point) and bake at 400° F for 20 minutes until cheese is melted and sauce near edges of baking dish is bubbly.',
        'mexican','nonvegetarian');
    }catch(e){
        console.log(e);
    }   
    posts = await recipeCollection.find({}).toArray();
    posts = posts.reverse()
    post = posts[0];
    //let post = posts[0];
    try{

        await userData.updateRecipes(posterId,post._id.toString())

    }catch(e){
        console.log(e);
    }
  try{  
   commentsData.createComment(post._id.toString(), 'Spicy', 'I added cumin, Chili powder , black pepper and salt to chicken and onion. I had some cherry tomatoes (two handfuls, sliced thin and added them as well. It added more flavor overall. I also garnished with some jalapeño slices ( jar) after removing from the oven . It was very good !!!');
  }catch(e){
      console.log(e);
  }


  try{

    await recipe.create(posterId,'MEXICAN RICE','mr.jpg', 
    'Are you craving that great Mexican rice from your favorite taco stand? Here it is. This is just like a good Mexican restaurant rice. Many recipes taste good... but the texture just is not right. You know how it is... you have prepared scores of Mexican rice recipes but always have been disappointed. It may be delicious but kinda gloopy and wet. Try this. Everything is pureed and cooked in. There are no chunks of anything... just dry fluffy rice with all the seasonings and just the tiniest hint of a tomato flavor. I will throw away all of my Mexican rice recipes- this is the one I have been looking for for years! I do not own a rice cooker but some people have had disappointing results using one. You will also need to adjust your cooking time if you want to use brown rice. I recommend following the cooking instructions as directed. Proceed at your own peril if you stray. Enjoy.', 
    '12 ounces tomatoes very ripe and cored, 1 medium white onion, 3 medium jalapenos, 2 cups long grain white rice, 1⁄3 cup canola oil, 4 minced garlic cloves, 2 cups chicken broth, 1 tablespoon tomato paste (may omit if using canned tomatoes), 1 1⁄2 teaspoons salt, 1⁄2 cup fresh cilantro minced, 1 lime',
    ' READY IN: 55mins; SERVES: 8-10; UNITS: US; If you cannot get good fresh tomatoes you are better off using canned tomatoes. Do not use those awful hard and underipe tomatoes that are at most supermarket chains. Just be sure that the processed tomatoes and the one onion equals 2 cups. One the other hand- if you find that after processing your tomatoes and onions that you have less than 2 cups- simply add enough bottled salsa to make up the difference. Do not skip any of the steps. It may seem stupid- but rinsing the rice to remove the starch is very important if you want fluffy rice. It will only take two minutes of your time but it makes the difference. Leftovers are just as delicious the next day so this is a perfect dish to make ahead time for potlucks. This rice also freezes well. For Freezing Ahead: Cool, portion and freeze in a ziploc bag. To reheat from frozen: Place in a pyrex dish and warm in the microwave, stirring every 2-3 minutes until heated through.',
    'Adjust rack to middle position and preheat oven to 350. Process tomato and onion in processor or blender until pureed and thoroughly smooth. Transfer mixture to measuring cup and reserve exactly 2 cups. Discard excess. Remove ribs and seeds from 2 jalapenos and discard. Mince flesh and set aside. Mince remaining jalapeno. Set aside. Place rice in a fine mesh strainer and rinse under cold running water until water runs clear- about 1 1/2 minutes.Shake rice vigorously to remove excess water.This step removes the starch from the rice so it will not stick. IF YOU OMIT THIS STEP YOUR RICE WILL NOT BE DRY AND FLUFFY. Heat oil in heavy bottomed ovensafe 12 inch straight sided sautee pan or Dutch oven with tight fitting lid over low-medium heat about 2 minutes. (The recipe is very specific about this but I used a 10 inch dutch oven and it worked out fine.) Drop a few rice grains in and if they sizzle then it is ready. Add rice and fry stirring until rice is light golden and translucent, about 6-8 minutes. Be careful that the oil does not get too hot too fast or the oil will splatter. Reduce heat to medium, add garlic and 2 minced jalapenos and cook , stirring constantly until fragrant, about 1 1/2 minutes. Stir in broth, pureed mixture,tomato paste, and salt. Increase heat to medium high, and bring to a boil. Cover pan and transfer pan to oven to bake until liquid is absorbed and rice is tender, 30-35 minutes.Stir well after 15 minutes. Stir in cilantro, minced jalapeno to taste, and pass lime wedges separately.',
    'mexican','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Super Cool', 'This rice dish is the BEST Mexican rice i have ever had! Beats the local Mexican restaurants rice also!!');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'TACO SOUP','ts.jpg', 
    'This is a delicious and quick soup (even if you are not on Weight Watchers). One cup of soup has 2 points, and recipe makes 12 cups', 
    '1 lb ground turkey or 1 lb lean ground beef, 1 large onion chopped, 1 (1 ounce) package hidden valley ranch dressing mix, 1 (1 ounce) package taco seasoning mix, 1 (16 ounce) can pinto beans, 1 (16 ounce) can chili beans (hot or regular), 1 teaspoon salt, 1 teaspoon black pepper, 3 tablespoons chili powder, 1 (16 ounce) can whole kernel corn, 1 (8 ounce) can diced Mexican-style tomatoes, 1 (8 ounce) can diced tomatoes (any flavor), 2 cups water',
    'READY IN: 1hr 15mins; SERVES: 12; YIELD: 1-6 bowls; UNITS: US',
    'Brown meat and onions and drain. Mix ranch dressing and taco seasoning into meat. Without draining, add all of the other ingredients. Simmer 1 hour. Serve with any appetizer or side dish.',
    'mexican','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Fabulous', 'I make this often and its so good! Serve it with a lime tortilla chip and it is fabulous!');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'TRADITIONAL TAMALES','tt.jpg', 
    'This tamale recipe is about as traditional as you can get, although I use a roast instead of the whole pig head that many Mexican women use. I have also used beef, but they just do not taste quite the same. These take about all day to make and are a lot of work, but they are so worth the time and the effort. Not for the faint-hearted cook for sure. They are a huge hit here in the West. For added flavor, top with either some of the red sauce used to prepare this recipe, or with my favorite, green chili sauce with pork. Serve with sides of Spanish rice, refried beans topped with cheese and frosty margaritas for a delicious authentic Mexican meal. For an online tamale-making tutorial, including pictures, please see http://www.recipezaar.com/bb/viewtopic.zsp?t=188623 posted in the Mexican cooking forum.', 
    '3 1⁄2 lbs pork shoulder or 3-1/2 lbs pork butt trimmed of fat and cut up, 10 cups water, 1 medium onion quartered, 3 garlic cloves, minced, 3 1⁄2 teaspoons salt, 4 cups red chili sauce (see Red Chili Sauce (To Be Used With Traditional Tamales) for red chili sauce), 3⁄4 cup shortening, 6 cups masa harina, 1 1⁄2 teaspoons baking powder, 50 dried corn husks (about 8 inches long)',
    'READY IN: 6hrs; YIELD: 50 Tamales; UNITS: US',
    'In a 5 qt Dutch oven, bring pork, water, onion, garlic and 1 1/2 salt to boil. Simmer covered, about 2 1/2 hours or until meat is very tender. Remove meat from broth and allow both meat and broth to cool. (Chilling the broth will allow you to easily remove the fat if you desire to do so). Shred the meat using 2 forks, discarding fat. Strain the broth and reserve 6 cups. In a large sauce pan, heat the red chili sauce and add meat; simmer, covered for 10 minutes. To make masa beat shortening on medium speed in a large bowl for 1 minute. In a separate bowl, stir together masa harina, baking powder and 2 teaspoons salt. Alternately add masa harina mixture and broth to shortening, beating well after each addition. (Add just enough broth to make a thick, creamy paste). In the mean time, soak corn husks in warm water for at least 20 minutes; rinse to remove any corn silk and drain well. To assemble each tamale, spread 2 tablespoons of the masa mixture on the center of the corn husk (each husk should be 8 inches long and 6 inches wide at the top. If husks are small, overlap 2 small ones to form one. If it is large, tear a strip from the side). Place about 1 tablespoon meat and sauce mixture in the middle of the masa. Fold in sides of husk and fold up the bottom. Place a mound of extra husks or a foil ball in the center of a steamer basket placed in a Dutch oven. Lean the tamales in the basket, open side up.Add water to Dutch oven just below the basket. Bring water to boil and reduce heat. Cover and steam 40 minutes, adding water when necessary. To freeze these for future meals, leave them in the husks and place them in freezer bags. To reheat, thaw and wrap in a wet paper towel and reheat in the microwave for 2 minutes for one or two or re-steam them just until hot',
    'mexican','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Good Flavor', 'the recipe is a good recipe but dont trim the fat before cooking.. the fat gives the meat moisture and the juice from cooking the meat you can use when making the masa');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'GUACAMOLE WITH SOUR CREAM','gsc.jpg', 
    'My guacamole is very free-form, but here are the basics: Figure about 1/2 large avocado per person. I do not care whether I am using Haas or regular avocados - some people do. Pick ones that give to mild pressure but are not mushy. If you cannot find any that are ripe, get hard ones and keep them in a paper bag for a couple of days until they ripen.', 
    '1 large avocado scooped out of shell and mashed, 2 tablespoons sour cream, 1 tablespoon salsa, 1 garlic clove pressed, 1 tablespoon sweet onion finely diced, 1 teaspoon cilantro (note some people find it vile) or 1 teaspoon parsley (note some people find it vile), 1 tablespoon tomatoes finely diced, 2 teaspoons black olives, minced, 1 teaspoon lime juice or 1 teaspoon balsamic vinegar, salt use less if you will refrigerate (you should not need much)',
    'READY IN: 10mins; SERVES: 2; UNITS: US',
    'Cut the avocado in half, scoop out the flesh with a spoon; mash 3/4 of it well and chop the remaining 1/4 coarsely (I do this with the spoon, in the avocado shell, before scooping the last bit out). Mix it into the mashed portion. Mix all remaining ingredients together. Serve immediately, or cover with plastic wrap, pressing wrap firmly to surface of guacamole (or it will turn color due to oxidation) and refrigerate up to 4 hours before serving.',
    'mexican','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Perfect!!!', 'I have always been a big fan of adding sour cream of Greek yogurt to guacamole as it makes the texture super smooth and creamy. This recipe is perfect for anyone wanting a simple, no frills guacamole for any occasion. Would definitely try it again!');
}catch(e){
  console.log(e);
}



username = 'Viraj'
    try{

        await user.createUsers('Viraj','Desai',username,'8080120201','4password');

    }catch(e){
        console.log(e);
    }
    poster = await usersCollection.findOne({username:username.toLowerCase()});
    posterId = poster._id.toString();
try{
     await userData.updateProfilePicture(posterId,'vd.jpg');
     await userData.updateBio(posterId, 'Devoted problem solver. Lifelong gamer. Freelance bacon guru. Evil internet fanatic.');
     await userData.updateFavoriteRecipe(posterId, 'Burgers');
}catch(e){
    console.log(e);
}

    try{

        await recipe.create(posterId,'VEGAN PANCAKES','vp.jpg', 
        'A cinch to make and tastes wonderful, if you like the taste of Baking Powder. My skeptical parents could not believe these were vegan. Try with white and whole wheat flour. Excellent with some maple syrup. I am pretty sure I stumbled across this one on vegweb.com', 
        '1 cup flour (whichever kind you prefer), 1 tablespoon sugar (I used organic cane sugar), 2 tablespoons baking powder, 1⁄8 teaspoon salt, 1 cup soymilk, 2 tablespoons vegetable oil',
        'READY IN: 15mins; SERVES: 2; YIELD: 6-8 pancakes; UNITS: US',
        'Set out all your ingredients. Set a stove element with a pan to medium heat. Combine the 4 dry ingredients (flour, sugar, baking powder -- two Tablespoons, not two Teaspoons as some have suggested, salt) in a bowl. Add the soy milk and vegetable oil to your mixture. Mix until smooth. Now the pan should be ready for your batter, so spoon one pancakes worth of the mixture into the pan. Flip [carefully] when you see bubbles in the middle of the pancake, or if the edges are looking stiffened. Repeat until the batter is gone, and try not to eat them all while you are cooking them.',
        'american','vegan');
    }catch(e){
        console.log(e);
    }   
    posts = await recipeCollection.find({}).toArray();
    posts = posts.reverse()
    post = posts[0];
    //let post = posts[0];
    try{

        await userData.updateRecipes(posterId,post._id.toString())

    }catch(e){
        console.log(e);
    }
  try{  
   commentsData.createComment(post._id.toString(), 'Disgusting', 'These were so bitter and crumbly and nasty. all I could taste was baking powder');
  }catch(e){
      console.log(e);
  }


  try{

    await recipe.create(posterId,'VEGAN CORNBREAD','vc.jpg', 
    'I got this recipe in my email today from Cooks Illustrated. It is a blue-ribbon winner developed by 11 year old Dana Sly.', 
    '2 tablespoons ground flax seeds, 6 tablespoons water, 1 cup all purpose flour, 1 cup cornmeal, 1⁄4 cup sugar, 4 teaspoons baking powder, 3⁄4 teaspoon table salt, 1 cup soymilk, 1⁄4 cup canola oil',
    ' READY IN: 50mins; SERVES: 9; UNITS: US',
    'Preheat oven to 425°F Spray 8-inch-square baking dish with nonstick cooking spray. Bring the water to a boil in a small saucepan. Add the ground flax seed, reduce the heat to mediumlow, and simmer the ground flax seed in the water for 3 minutes or until thickened, stirring occasionally. Set aside. In a medium bowl, whisk together the flour, cornmeal, sugar, baking powder, and salt until well-combined. Add the ground flax seed mixture, soy milk, and canola oil to the flour mixture. Beat just until smooth (do not overbeat). Turn into prepared baking pan. Bake for 20 to 25 minutes, or until a toothpick inserted in the middle comes out clean.',
    'american','vegan');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Worst', 'It was the worst corn bread (or anything baked for that matter) I have ever made. I followed the recipe exactly. Nobody in the family liked it or finished their portion. Even our dog refused to eat a piece. Looked good out of the oven, but both texture and taste are bad. All went to trash. Was a waist of time and ingredients. I will stick with Ina Gartens recipe modified to be vegan (egg replacer and vegan butter).');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'VEGAN LENTIL BURGERS','vb.jpg', 
    'Got the recipe from theveggietable.com and wanted to post so I had it to hand and for others to share.', 
    '1 cup dry lentils well rinsed, 2 1⁄2 cups water, 1⁄2 teaspoon salt, 1 tablespoon olive oil, 1⁄2 medium onion diced, 1 carrot diced, 1 teaspoon pepper, 1 tablespoon, soy sauce, 3⁄4 cup rolled oats finely ground, 3⁄4 cup breadcrumbs',
    ' READY IN: 1hr 10mins; YIELD: 8-10 burgers; UNITS: US',
    'Boil lentils in the water with the salt for around 45 minutes. Lentils will be soft and most of the water will be gone. Fry the onions and carrot in the oil until soft, it will take about 5 minutes. In a bowl mix the cooked ingredients with the pepper, soy sauce, oats and bread cumbs. While still warm form the mixture into patties, it will make 8-10 burgers. Burgers can then be shallow fried for 1-2 minutes on each side or baked at 200C for 15 minutes.',
    'american','vegan');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Very Good', 'I really liked this recipe! I had it for Fourth of July instead of traditional burgers and it went really well.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'CHILLI PANEER','cp.jpg', 
    'One of the blokes at work always brings in pots of food for his lunch which I eye up jealously. One of these was Hot Chilli Paneer which his wife kindly gave me the recipe for. Phew! It is definitely spicy! Thanks Mitisha!', 
    '250 g panir, cut into 1-2cm cubes, 1 onion finely chopped, 1 large tomatoes grated, 6 dried red chilies, 2 teaspoons coriander seeds, 1⁄4 teaspoon turmeric, 2-3 green chilies finely chopped, 2 garlic cloves crushed, 2 tablespoons sunflower oil, 3-4 tablespoons fresh coriander leaves chopped',
    'READY IN: 15mins; SERVES: 3-4; UNITS: US',
    'Dry-fry the dried chilies in a pan for a couple of minutes over a medium heat. Add coriander seeds and turmeric and grind for a further minute. Grind spices and dried chilies to a fine powder. Fry the onion in oil until browned. Add green chilies and fry until soft. Stir in ground spices and fry for another minute. Add tomato and stir until everything is well blended. Stir in Paneer and fry in spice paste, stirring until well coated - for about 2-3 minutes. Garnish with coriander and serve with chapatti.',
    'indian','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Awesome', 'This was soooo hot! Really quite easy to make and turned out good, with a lovely sweet onion flavour underneath the heat. I used really hot chillies and it was too hot! Next time I will use less or use milder ones.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'CLASSIC CRISPY FALAFEL','cf.jpg', 
    'I love burghul (cracked wheat) in falafel. These are delicious as a pita bread filling with tabbouleh and hommous. Prep time does not include soaking for the chickpeas or bulghur.', 
    '300 g chickpeas, 4 tablespoons bulgur, 3 garlic cloves, 3 tablespoons plain flour, 1 egg, 1 teaspoon salt, 1 teaspoon pepper, 3 teaspoons ground coriander, 1 teaspoon cumin, 1⁄4 teaspoon ground red chili pepper, 1 tablespoon tahini',
    'READY IN: 50mins; YIELD: 20-25 falafels; UNITS: US',
    'Soak chickpeas in water to cover for 12 hours. Boil in large saucepan for about 20 minutes, until soft (or you can use canned chickpeas, if desired). Drain and blend in food processor to a smooth paste. Soak bulghur in water to cover for 1 hour. Crush garlic with salt. Combine all ingredients except oil. Shape into balls and shallow-fry until brown (you can deep-fry if you like, or coat lightly with oil and bake until golden). The yield depends on the size of the falafels you prefer.',
    'lebanese','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Thanks For Posting', 'We enjoyed this falafel recipe for lunch today. I used 300g of chickpeas that I soaked overnight. Also, we did not drain the bulgur as the recipe did not say to, and we had no problems with the consistency of our falafel. We stuffed in pita pockets topped with homemade hummus. However, I think the topping needs to be different next time. I am going to play around with Greek yogurt, cukes and tomatoes with my leftover falafels.');
}catch(e){
  console.log(e);
}


username = 'Dherin'
    try{

        await user.createUsers('Dhiren','Patel',username,'8080867047','5password');

    }catch(e){
        console.log(e);
    }
    poster = await usersCollection.findOne({username:username.toLowerCase()});
    posterId = poster._id.toString();
try{
     await userData.updateProfilePicture(posterId,'dp.jpg');
     await userData.updateBio(posterId, 'Typical problem solver. General writer. Coffee guru. Award-winning tv ninja. Incurable social media fanatic.');
     await userData.updateFavoriteRecipe(posterId, 'All Chicken dishes');
}catch(e){
    console.log(e);
}

    try{

        await recipe.create(posterId,'OATMEAL RAISIN COOKIES','orc.jpg', 
        'You have made oatmeal-raisin cookies before, so why try these? Because they are moist, chewy and loi aded with raisins - and they are better than any you have tried before! From Cuisine Magazine i do not remrmber been to long', 
        'WHISK TOGETHER AND SET ASIDE: 2 cups all purpose flour, 1 teaspoon baking soda, 1 teaspoon baking powder, 1 teaspoon kosher salt; CREAM WET INGREDIENTS: 1 cup unsalted butter softened, 1 cup sugar, 1 cup dark brown sugar firmly packed, 2 large eggs, 2 teaspoons vanilla; THEN STIR IN: 3 cups oats (not instant), 1 1⁄2 cups raisins',
        'READY IN: 26mins; SERVES: 36; YIELD: 36 cookies; UNITS: US',
        'Preheat oven to 350°. Whisk dry ingredients; set aside. Combine wet ingredients with a hand mixer on low. To cream, increase speed to high and beat until fluffy and the color lightens. Stir the flour mixture into the creamed mixture until no flour is visible. (Over mixing develops the gluten, making a tough cookie.) Now add the oats and raisins; stir to incorporate. Fill a #40 cookie scoop and press against side of bowl, pulling up to level dough (to measure 2 tablespoons of dough). Drop 2-inches apart onto baking sheet sprayed with nonstick spray. Bake 11-13 minutes (on center rack), until golden, but still moist beneath cracks on top. Remove from oven; let cookies sit on baking sheet for 2 minutes before transferring to a wire rack to cool.',
        'american','vegetarian');
    }catch(e){
        console.log(e);
    }   
    posts = await recipeCollection.find({}).toArray();
    posts = posts.reverse()
    post = posts[0];
    //let post = posts[0];
    try{

        await userData.updateRecipes(posterId,post._id.toString())

    }catch(e){
        console.log(e);
    }
  try{  
   commentsData.createComment(post._id.toString(), 'Great', 'They were delicious! My entire family loved them. I would recommend a little bit more vanilla and a teaspoon of cinnamon. I baked them for 14 minutes and they were great!');
  }catch(e){
      console.log(e);
  }


  try{

    await recipe.create(posterId,'YAKISOBA','y.jpg', 
    'This is a dish that is popular in Japan and usually sold as street food. This version is made with pork, although you could easily substitute chicken or tofu.', 
    '1 lb lean pork loin sliced thinly (against the grain), 1⁄3 cup soy sauce, 1⁄3 cup rice wine, 1 1⁄2 tablespoons sugar, 12 ounces Chinese wheat noodles (udon noodles may be substituted), 3 tablespoons vegetable oil, 1 onion sliced thin, 1 lb napa cabbage or 1 lb savoy cabbage sliced very thin, 3 carrots grated, 1 tablespoon chopped ginger, 2 scallions thinly sliced (optional)',
    ' READY IN: 50mins; SERVES: 4; UNITS: US',
    'In a small bowl, mix together soy sauce, rice wine, and sugar, stirring to dissolve. Cook noodles in boiling water about 8 minutes, or until tender. Drain noodles and rinse under cold water. In a large deep skillet or wok, cook onion in oil for about 3 minutes. Add the cabbage, carrot and ginger and cook until cabbage is softened, about 3-5 minutes. Add the pork and cook for 2 minutes more. Cover the mixture with noodles and pour the sauce over all. Cover and cook for 3-5 minutes, the remove the lid and toss the mixture together until it is well combined. Place on a serving platter and garnish with chopped scallions, if desired.',
    'other','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Good recipe', 'Thank you for a wonderful and quick dinner idea! We have added a little more of carrots and there was enough to feed a very hungry family of 3!');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'HIBACHI CHICKEN AND FRIED RICE','hc.jpg', 
    'This is a recipe for a full hibachi style meal. It includes the chicken, veggies, fried rice, and bean sprouts. My husband and I put together a combination of recipes that we found on the interenet and created this one. It is very good for a night in, when you do not wish to pay the expensive prices at the Japanese steak house.', 
    'For the hibachi chicken: 1 - 1 1⁄2 lb chicken breast, 1 tablespoon vegetable oil, 1⁄2 teaspoon sesame seed oil, 1 tablespoon butter, 3 tablespoons soy sauce, 2 teaspoons fresh lemon juice, 1 dash salt, 1 dash pepper; For the hibachi vegetables: 1 tablespoon vegetable oil, 1⁄2 teaspoon sesame seed oil, 1 large white onion, 1 large zucchini, 1 tablespoon butter, 2 tablespoons soy sauce, 1 dash salt, 1 dash pepper for the hibachi fried rice, 4 cups cooked rice (cool to the touch), 2 tablespoons vegetable oil, 1⁄2 cup white onion, 1 cup bean sprouts, 2 large eggs, 4 tablespoons butter, 4 tablespoons soy sauce; For the hibachi bean sprouts: 1 tablespoon butter, 1 tablespoon, soy sauce, 3 cups bean sprouts.',
    ' READY IN: 35mins; SERVES: 4; UNITS: US',
    'Note: Cook the rice first, so that it has time to cool down before you fry it. Cook the chicken and veggies at the same time in two separate skillets or woks. Make sure to keep the chicken and veggies warm while you cook the fried rice and bean sprouts. Hibachi Chicken. Cut the chicken breast up into bit sized pieces. Heat the vegetable oil and sesame oil in a large skillet or wok on medium high heat. Add the chicken, soy sauce, butter, lemon juice, salt, and pepper to the skillet. Sauté the chicken for 6-8 minutes or until no longer pink; Note: Do not clean skillet. You will reuse this skillet for the fried rice. Hibachi Veggies. Cut the white onion into slivers. Quarter the zucchini. Heat the vegetable oil and sesame oil in a large skillet or wok on medium high heat. Add the white onion, zucchini, butter, soy sauce, salt, and pepper. Sauté veggies for 6-8 minutes or until veggies are tender. Note: Do not clean skillet, you will use the same skillet for the bean sprouts. The oil that is left over will be used for the bean sprouts. Hibachi Fried Rice. Chop the onion. Heat vegetable oil on medium high in large skillet or wok (use the skillet or wok you cooked the chicken in earlier). Add the onion and sauté. Sauté onion for 3-4 minutes or until almost tender enough to eat. Add the bean sprouts. Sauté for 1-2 minutes. Move the vegetables to the side of the pan. Add the eggs, lightly scramble as you add them to the skillet. Once scrambled add the rice and butter. Cook for 5 minutes, stirring frequently. Add the soy sauce and cook an additional minute. Hibachi Bean Sprouts. Melt the butter in a large skillet or wok (use the skillet or wok that you cooked the veggies in earlier). Add the soy sauce and bean sprouts. Sauté for 1-2 minutes.',
    'other','nonvegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'This was spot on', 'Everyone loved it! Will be making it alot in the future!');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'JAPANESE STEAKHOUSE GINGER SALAD DRESSING','ss.jpg', 
    'Great for summer salads', 
    '1⁄2 cup minced onion, 1⁄2 cup peanut oil, 1⁄3 cup rice vinegar, 2 tablespoons water, 2 tablespoons minced fresh ginger, 2 tablespoons minced celery, 2 tablespoons ketchup, 4 teaspoons soy sauce, 2 teaspoons sugar, 2 teaspoons lemon juice, 1⁄2 teaspoon minced garlic, 1⁄2 teaspoon salt, 1⁄4 teaspoon fresh ground black pepper',
    'READY IN: 15mins; YIELD: 1 3/4 cups; UNITS: US',
    'Combine all ingredients in a blender. Blend on high speed for about 30 seconds or until all of the ginger is well-pureed. This recipe yields 1 3/4 cups.',
    'other','vegetarian');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'Long Lasting', 'This is just like the ginger dressing at the Japanese restaurants. It does taste better after a day or 2 in the fridge.');
}catch(e){
  console.log(e);
}

try{

    await recipe.create(posterId,'HOMEMADE LOW CALORIE POTATO CHIPS','cpc.jpg', 
    'Betcha cannot eat just one!!', 
    '1 large potato scrubbed clean and sliced wafer thin, 1⁄2 teaspoon olive oil, salt or seasoning',
    'READY IN: 13mins; SERVES: 1; UNITS: US',
    'Pour oil in a plastic Ziploc baggie, along with whatever seasoning or spice preferred. Put potato slices in bag. Blow up the bag and quickly seal it shut. Shake vigorously until all the slices are coated. Arrange slices in a circle on a microwave-proof plate. Microwave on high for 4 minutes. Turn chips over and re-arrange them so they cook evenly. Microwave again for 2 minutes. Turn, Watch them carefully and microwave again for about 2 minutes or until they start to brown. They must brown a little in places or they will not crisp up. Remove and let cool. The chips crisp when cooling',
    'other','vegan');
}catch(e){
    console.log(e);
}   
posts = await recipeCollection.find({}).toArray();
posts = posts.reverse()
post = posts[0];
//let post = posts[0];
try{

    await userData.updateRecipes(posterId,post._id.toString())

}catch(e){
    console.log(e);
}
try{  
commentsData.createComment(post._id.toString(), 'These are awesome.', ' I have gall bladder problems so switched the oil for fry light and they came up great definitely recommend these! :D');
}catch(e){
  console.log(e);
}



}

seed();
console.log("Seeding is Completed")