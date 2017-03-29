$(() => {

  $.ajax({
    method: "GET",
    url: "/user/dashboard"
  }).done((todos) => {
    for(todo of todos) {
      $("<div>").text(todo.todo).appendTo($("body"));
    }
  });
});
