$(() => {
  console.log("jquery loaded")

  $.ajax({
    method: "GET",
    url: `/user/dashboard/`,
  }).done((todoObj) => {renderCategories(todoObj)});

  function createCategoryCard (categoryArr, categoryName) {
    console.log('creating')
    let catItems = "";
    categoryArr.forEach((item) => {
      catItems += "<li>" + item + "</li>";
    })
    let catCard = `<article class="todo-list ${categoryName}">
    <div class="todo-category">To ${categoryName}</div>
    <body class= "todo-body">
    <ol>
    ${catItems}
    </ol>
    </body>
    </article>`;
    console.log(catCard)
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
    $('body').after(createCategoryCard(watchList, "watch"));
    $('body').after(createCategoryCard(readList, "read"));
    $('body').after(createCategoryCard(buyList, "buy"));
    $('body').after(createCategoryCard(eatList, "eat"));
  };

  $('form').on("submit", (event) => {
    console.log("form submit")
    event.preventDefault();
    $.ajax({
      url:'/todo',
      type:'POST',
      data: $('form').serialize()
    }).done((todoObj) => {
      console.log(todoObj)
      const singleCatTodo = [];
      const singleCat = todoObj[0]['category'];
      todoObj.forEach((todo) => {
        singleCatTodo.push(todo['todo'])
      });
      const catCard = createCategoryCard(singleCatTodo, singleCat);
      console.log(singleCatTodo, catCard)
      $(`.${singleCat}`).replaceWith(catCard);
    })
    $("textarea").val("");
  })

});
