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
      <div class="collapsible-header">${item}</div>
      <div class="collapsible-body"><span>shaped like a banana</span>
        <img src="/images/deleteicon.png" class="material-icons">
        <img src="/images/list.ico" class="material-icons">
      </div>
    </li>`
    })

    let catCard = '';
     catCard += `<section class="todolist ${categoryName}">

  <ul class="collapsible" data-collapsible="accordion">
    ${catItems}
  </ul>
  </section><br><br>`
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
    $('body').after(`<button id="miscbutton" class="col s2 offset-s1 todo-list">Miscellaneous</button>`+createCategoryCard(miscList, "misc"));
    $('body').after(`<button id="watchbutton" class="col s2 offset-s1 todo-list">Things to watch</button>`+createCategoryCard(watchList, "watch"));
    $('body').after(`<button id="readbutton" class="col s2 offset-s1 todo-list">Books to read</button>`+createCategoryCard(readList, "read"));
    $('body').after(`<button id="buybutton" class="col s2 offset-s1 todo-list">Stuff to buy</button>`+createCategoryCard(buyList, "buy"));
    $('body').after(`<button id="eatbutton" class="col s2 offset-s1 todo-list">Places to eat at</button>`+createCategoryCard(eatList, "eat"));
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
    })
    $("textarea").val("");
  })

 $('#miscbutton').on("click", function(){
  console.log("wtf mate")

    let catSlide = $(".misc")
    if ((catSlide).is(":visible")) {
    catSlide.slideUp();
    } else {
    catSlide.slideDown();
    }
});

 $('#watchbutton').click(function(){
  console.log("wtf mate")

    let catSlide = $(".watch")
    if ($(catSlide).is(":visible")) {
    catSlide.slideUp();
    } else {
    catSlide.slideDown();
    }
});

  $("#readbutton").click(function(){
    let catSlide = $(".read")
    if ($(catSlide).is(":visible")) {
    catSlide.slideLeft();
    } else {
    catSlide.slideRight();
    }
});

   $("#buybutton").click(function(){
    let catSlide = $(".buy")
    if ($(catSlide).is(":visible")) {
    catSlide.slideUp();
    } else {
    catSlide.slideDown();
    }
});

  $("#eatbutton").click(function(){
    let catSlide = $(".todolist .eat")
    if ($(catSlide).is(":visible")) {
    catSlide.slideUp();
    } else {
    catSlide.slideDown();
    }
});
});


