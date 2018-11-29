$(document).ready(function(){
  $.ajax('/profile', {
    method: 'GET',
    success: function(user){
      let userProfile = $('#userProfile');
      for(class of user.classes){}
        $( "<p>Class: "+class.name+
        " Date:"+class.date+
        "</p>" ).appendTo(userProfile);
      }
    }
  })
})
