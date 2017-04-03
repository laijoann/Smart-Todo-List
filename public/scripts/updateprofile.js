$(() => {
  console.log("jquery loaded")
  $('form').on("submit", (event) => {
    event.preventDefault();
    $.ajax({
      url: '/updateprofile',
      type: 'POST',
      data: $('form').serialize()
    }).done(() => {
      $(".inputVal").val("");
      // ADD FLASH MESSAGE HERE TO SAY DONE :)
      // $("#updateMessage").text("Your Profile has been Updated Successfully!");
      //   setTimeout(errorMsg, 2000);

    })
  })

})
