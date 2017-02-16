 $(document).ready(function(){ 

  $(".task-list-item").on('click', function(event) {
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