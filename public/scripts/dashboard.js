$(() => {

  $.ajax({
    method: "GET",
    url: "/user/dashboard"
  }).done((todoObj) => {renderCategories(todoObj)});

  function createCategoryCard (categoryArr, categoryName) {
    let catItems = "";
    categoryArr.forEach((item) => {
      catItems += "<li>" + item + "</li>";
    })
    let catCard = `<article class="todo-list">
      <div class="todo-category">To ${categoryName}</div>
      <body class= "todo-body">
        <ol>
          ${catItems}
        </ol>
      </body>
      </article>`;
    return catCard;
  }

  function renderCategories (todoObj) {
    const watchList = [];
    const readList = [];
    const buyList = [];
    const eatList = [];
    for(todo of todoObj) {
      switch(todo.category) {
        case 'watch':
        watchList.push(todo.todo);
        break;
        case 'read':
        readList.push(todo.todo);
        break;
        case 'buy':
        buyList.push(todo.todo);
        break;
        case 'eat':
        eatList.push(todo.todo);
        break;
      };
    }
    $('body').after(createCategoryCard(watchList, "Watch"));
    $('body').after(createCategoryCard(readList, "Read"));
    $('body').after(createCategoryCard(buyList, "Buy"));
    $('body').after(createCategoryCard(eatList, "Eat"));
  };

});
