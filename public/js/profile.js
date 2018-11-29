$(document).ready(function(){
  $.ajax('/profile', {
    method: 'GET',
    success: function(user){
      let userProfile = $('#userProfile');

      $( "<p style=\"color:white\">Email: "+user.email+
        "<br>First Name: "+user.first_name+
        "<br>Last Name: "+user.last_name+
        "</p>" ).appendTo(userProfile);
    }
  })
})
