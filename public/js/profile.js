$(document).ready(function(){
  $.ajax('/users', {
    method: 'GET',
    success: function(users){
      let userList = $('#userList');
      for (let user of users) {
        $( "<p>Email : "+user.email+"</p>" ).appendTo(userList);
      }
    }
  })
})
