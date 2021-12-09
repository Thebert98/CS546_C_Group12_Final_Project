$(document).ready(function($){

var form = $('#likeForm');
var likeButton = $('#likeStatus');
var id = $('#recipeId');
var count = $('#likeCount');


form.submit(function(event){
    event.preventDefault();
    if(likeButton.val()=="Like"||likeButton.val()=='Unlike'){
        var requestConfig ={
            method: 'POST',
            url: '/recipe/Like',
            contentType: 'application/json',
            data: JSON.stringify({
                likeStatus: likeButton.val(),
                recipeId: id.val()
            })

        };
        
        $.ajax(requestConfig).then(function(){
           window.location.href = '/recipe/post/' + id.val();
        });
        
    
    }
    /*if(likeButton.val()=='Unlike'){
        var requestConfig ={
            method: 'POST',
            url: '/recipe/Like',
            contentType: 'application/json',
            data: JSON.stringify({
                likeStatus: likeButton.val(),
                recipeId: id.val()
            })

        };
       $.ajax(requestConfig).then(function(){
           likeButton.val('Like');
           likeButton.text('Like');
           var num = count.text();
           num = parseInt(num.charAt(num.length -1))
           num = num - 1;
           var stringNum = 'Likes:  ' + num;
           count.text(stringNum);
       })
    }
    */
    
   
})


















})