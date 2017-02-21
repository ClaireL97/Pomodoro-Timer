 $(document).ready(function(){

  $("#new_task").on("submit",function(event){
    event.preventDefault()
    var data = $(event.target).serialize()
    $.ajax({
      type: "POST",
      url: "/tasks",
      data: data,
      success: function(response){
        $(".task-list-group").append('<a class="task-list-item task-item-incomplete" data-task-id="'+response.id+'">'+response.submitted_task+'</a>')
      }
    })
  })

  $(".task-list-group").on('click', ".task-list-item", function(event) {
    var $target = $(event.target);
    var taskId = $target.data('taskId');
    var putUrl = "/tasks/" + taskId;
    $.ajax({
      type: "PUT",
      url: putUrl,
      data: taskId,
      success: function(response) {
        if (response) {
          $target.removeClass("task-item-incomplete");
          $target.addClass("task-item-complete");
        } else {
          $target.removeClass("task-item-complete");
          $target.addClass("task-item-incomplete");
        }
      }
    });
  });
})
