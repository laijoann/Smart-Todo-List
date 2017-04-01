// TODO: add a data validation for posting new to do such that there are no repeat to dos

$(() => {

  $.ajax({
    method: "GET",
    url: `/user/dashboard/`,
  }).done((todoObj) => {renderCategories(todoObj)});

  function createCategoryCard (todoObj, categoryName) {
    let catItems = `${categoryName}`;
    todoObj.forEach((item) => {
      catItems += `<div data-cat="${categoryName}" data-id=${item['id']} class="collapsible-header">${item['todo']}
      <div class="collapsible-body">sample text
      <img data-todo="${item['todo']}" data-cat="${categoryName}" src="/images/deleteicon.png" class="delete-icon">
      </div></div>`
    })
    return catItems;
  }

  function renderCategories (todoObj) {
    const watchList = [];
    const readList = [];
    const buyList = [];
    const eatList = [];
    const miscList = [];
    for(todo of todoObj) {
      switch(todo.category) {
        case 'watch':
        watchList.push(todo);
        break;
        case 'read':
        readList.push(todo);
        break;
        case 'buy':
        buyList.push(todo);
        break;
        case 'eat':
        eatList.push(todo);
        break;
        case 'misc':
        miscList.push(todo);
        break;
      };
    }
    $('#watch').html(createCategoryCard(watchList, 'watch'));
    $('#read').html(createCategoryCard(readList, 'read'));
    $('#eat').html(createCategoryCard(eatList, 'eat'));
    $('#buy').html(createCategoryCard(buyList, 'buy'));
    $('#misc').html(createCategoryCard(miscList, 'misc'));

    dragAndDrop.init();
  };

  $('form').on("submit", (event) => {
    console.log("form submit")
    event.preventDefault();
    $.ajax({
      url:'/todo',
      type:'POST',
      data: $('form').serialize()
    }).done((todoObj) => {
      const singleCat = todoObj[0]['category'];
      const catCard = createCategoryCard(todoObj, singleCat);
      $(`#${singleCat}`).html(catCard);
      $("textarea").val("");
    })
  })

  $("body").on("click", 'div.collapsible-header', function(e) {
    const collap = $(e.target).children();
    if (collap.css('display') === 'none') {
      $(collap.css('display', 'block'));
    } else {
      $(collap.css('display', 'none'))
    }
  })

  $("body").on("click", "img.delete-icon", function(e) {
    console.log($(e.target).data('cat'));
    let delItem = $(e.target).data('todo');
    let delCat = $(e.target).data('cat');
    $.ajax({
      url: `/delete/${delItem}/${delCat}`,
      type: "POST",
    }).done((todoObj) => {
      const catCard = createCategoryCard(todoObj, delCat);
      $(`#${delCat}`).html(catCard);
    })
  });



  var dragAndDrop = {
    init: function () {
      this.dragula();
      this.eventListeners();
    },
    eventListeners: function () {
      this.dragula.on('drop', this.dropped.bind(this));
    },
    dragula: function () {
      this.dragula = dragula([document.getElementById('buy'), document.getElementById('watch'), document.getElementById('read'), document.getElementById('eat'),
      document.getElementById('misc')], {
        revertOnSpill: true,
        copy: false,
        moves: function (el, container, handle) {
          return true
        }
      });
    },
    dropped: function (el) {
      //const currCat = $(el).data('cat');
      const newCat = $(el).parent().data('cat');
      const id = $(el).data('id')
      console.log (id)
      $.ajax({
        url: `/update/${newCat}/${id}`,
        type: "POST",
      }).done((result) => {
        console.log(result)
        $(el).attr('data-id', newCat);
      })
    }
  };

});
