$(document).ready(function(){
  $.ajax('/assignment', {
    method: 'GET',
    success: function(user){
      let assignments = $('#assignments');
      for(assignment of user.assignments){
        $( "<p style=\"color:white\">Name: "+assignment.name+
          "<br>Due Date: "+assignment.date+
          "<br>Remind at: "+assignment.remindMe+
          "<br><br></p>" ).appendTo(assignments);
        }
    }
  })
})
