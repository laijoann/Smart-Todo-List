// TODO: add a data validation for posting new to do such that there are no repeat to dos

$(() => {
  console.log("jquery loaded")

  $.ajax({
    method: "GET",
    url: `/user/dashboard/`,
  }).done((todoObj) => {renderCategories(todoObj)});

  function createCategoryCard (categoryArr, categoryName) {
    console.log('creating')

    let catItems = '';
    categoryArr.forEach((item) => {
      catItems += `<li>
      <div class="collapsible-header">
      ${item}
      </div>
      <div class="collapsible-body"><span>shaped like a banana</span>
      <img src="/images/list.ico" class="recat-icon">
      <img data-todo="${item}" data-cat="${categoryName}" src="/images/deleteicon.png" class="delete-icon">
      </div>
      </li>`
    })

    let catCard = '';
    catCard += `<section class="todolist ${categoryName}">

    <ul class="collapsible" data-collapsible="accordion">
    ${catItems}
    </ul>
    </section>`

    console.log(catCard)
    return catCard;
  }
  //TODO: HAVE SEPARATE DIV HEADER AND SECTION BITS


  function renderCategories (todoObj) {
    const watchList = [];
    const readList = [];
    const buyList = [];
    const eatList = [];
    const miscList = [];
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
        case 'misc':
        miscList.push(todo.todo);
        break;
      };
    }
    $('main').after(`<div class="catcard" id="miscbutton" class="col s2 offset-s1 todo-list">Miscellaneous${createCategoryCard(miscList, "misc")}</div>`);
    $('main').after(`<div class="catcard" id="watchbutton" class="col s2 offset-s1 todo-list">Things to watch${createCategoryCard(watchList, "watch")}</div>`);
    $('main').after(`<div class="catcard" id="readbutton" class="col s2 offset-s1 todo-list">Books to read${createCategoryCard(readList, "read")}</div>`);
    $('main').after(`<div class="catcard" id="buybutton" class="col s2 offset-s1 todo-list">Stuff to buy${createCategoryCard(buyList, "buy")}</div>`);
    $('main').after(`<div class="catcard" id="eatbutton" class="col s2 offset-s1 todo-list">Places to eat at${createCategoryCard(eatList, "eat")}</div>`);

  };


  $('form').on("submit", (event) => {
    console.log("form submit")
    event.preventDefault();
    $.ajax({
      url:'/todo',
      type:'POST',
      data: $('form').serialize()
    }).done((todoObj) => {
      const singleCatTodo = [];
      const singleCat = todoObj[0]['category'];
      todoObj.forEach((todo) => {
        singleCatTodo.push(todo['todo'])
      });
      const catCard = createCategoryCard(singleCatTodo, singleCat);
      $(`.${singleCat}`).replaceWith(catCard);
      $("textarea").val("");
    })
  })

  $("body").on("click", 'div.collapsible-header', function(e) {
    console.log("um")
    if ($(e.target).siblings().css('display') === 'none') {
      $(e.target).siblings().css('display', 'block');
    } else {
      $(e.target).siblings().css('display', 'none')
    }
  })

  $("body").on("click", "img.delete-icon", function(e) {
    console.log("hello?", $(e.target).data('cat'));
    let delItem = $(e.target).data('todo');
    let delCat = $(e.target).data('cat');
    $.ajax({
      url: `/delete/${delItem}/${delCat}`,
      type: "POST",
    }).done((todoObj) => {
      const singleCatTodo = [];
      todoObj.forEach((todo) => {
        singleCatTodo.push(todo['todo'])
      });
      const catCard = createCategoryCard(singleCatTodo, delCat);
      $(`.${delCat}`).replaceWith(catCard);
    })
  });

});
