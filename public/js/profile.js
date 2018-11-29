$(document).ready(function(){
  $.ajax('/profile', {
    method: 'GET',
    success: function(user){
      let userProfile = $('#userProfile');

      $( "<p>Email: "+user.email+
        " \nFirst Name:"+user.first_name+
        " Last Name:"+user.last_name+
        "</p>" ).appendTo(userProfile);
    }
  })
})
