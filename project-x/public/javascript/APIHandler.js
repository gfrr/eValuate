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
        if(type == "items");
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response, response.status);
      },
      error: (error) => console.log(`${id} not found`),
    });
  }

  deleteOneRegister (type, id) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "DELETE",
      success: ()=> {
        console.log(`${id} deleted`);

      },
      error: (error) => {
        console.log(error);
    },
    });
  }

  updateOneRegister (type, id, userData) {
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "PATCH",
      data: userData,
      success: (patchResponse) => {
        console.log(patchResponse);
        console.log("id", id, "userdata", userData);
      },
      error: (error)=> {
          console.log("patching failed");
      }
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

  //

}
