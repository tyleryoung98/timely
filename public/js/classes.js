$(document).ready(function(){
  $.ajax('/classes', {
    method: 'GET',
    success: function(user){
      let classes = $('#classes');
      for(section of user.sections){
        $( "<p style=\"color:white\">Name: "+section.name+
          " <br>Date: "+section.date+
          "<br><br></p>" ).appendTo(classes);
        }
    }
  })
})
