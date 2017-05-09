class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }
 //IMPORTANT *** pass type as plural: ie. users / items / feedback
  getFullList (type) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type,
      method: "GET",
      dataType: "json",
      success: (response)=> {
        response.forEach((elem, index)=>{
          if(index === 0) console.log("empty");
           else {

             console.log(elem);
          }
        });
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  getOneRegister (type, id, callback = undefined) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "GET",
      dataType: "json",
      success: (response)=> {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
      },
      error: (error) => console.log(`${id} not found`),
    });
  }




  // createOneRegister (userData) {
  //  $.ajax ({
  //    url: this.BASE_URL + "/characters",
  //    method: "POST",
  //    data: userData,
  //    success: () => {
  //      $('#new-character-form button').removeClass("fail");
  //      $('#new-character-form button').addClass("success");
  //
  //  },
  //    error: (error) => {
  //      $('#new-character-form button').removeClass("success");
  //      $('#new-character-form button').addClass("fail");
  //
  //    },
  //  });
  // }
  //
  // updateOneRegister (userData, id) {
  //   $.ajax ({
  //     url: this.BASE_URL + "/characters/" + String(id),
  //     method: "PATCH",
  //     data: userData,
  //     success: (patchResponse) => {
  //       $('#edit-character-form button').removeClass("fail");
  //       $('#edit-character-form button').addClass("success");
  //       console.log(patchResponse);
  //     },
  //     error: (error)=> {
  //       $('#edit-character-form button').removeClass("success");
  //       $('#edit-character-form button').addClass("fail");
  //     }
  //   });
  // }
  //
  // deleteOneRegister (id) {
  //   $.ajax ({
  //     url: this.BASE_URL + "/characters/" + String(id),
  //     method: "DELETE",
  //     success: ()=> {
  //       $('#delete-one').removeClass("fail");
  //       $('#delete-one').addClass("success");
  //
  //     },
  //     error: (error) => {
  //       $('#delete-one').removeClass("success");
  //       $('#delete-one').addClass("fail");
  //   },
  //   });
  // }
}
