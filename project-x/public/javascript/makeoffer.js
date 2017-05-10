class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

updateOneRegister (newItemInfo,id) {
    $.ajax({
        dataType: 'json',
        method: 'PATCH',
        url: this.BASE_URL + "/items/" + id,
        // contentType: 'application/json',
        data: newItemInfo,
        // processData: false,
        success: function(newItemInfo){
          var tempDiv =
            `<div class="character-info">` +
            `<div class="weapon"> <strong>Weapon:</strong> `+characterInfo.weapon+`</div>`+
            `</div>`;
          $(tempDiv).appendTo('.characters-container');
        console.log("saved");
      },
      error: function (response) {
        $('input[name="chr-id"]').val("Character Not Found");
        console.log("error dude");
      }
    });
  }
}
