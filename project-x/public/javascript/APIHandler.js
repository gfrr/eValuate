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
        else callback(response, response.status);
      },
      error: (error) => console.log(`${id} not found`),
    });
  }

  getBidder(type, id, offer, callback = undefined){
    console.log(offer);
    let biddersArray = [];
    $.ajax ({
      url: this.BASE_URL + "/api/" + type + "/" + String(id),
      method: "GET",
      dataType: "json",
      success: (response)=> {
        if (typeof(callback) === "undefined") {
          console.log("no callback");
        } else {
            callback(response, console.log(response));
            // for(var user in response){
            //     biddersArray.push(user);
            //     console.log(user);
            // }
            $(".current-offers").append(`€&nbsp
            ${offer}:&nbsp<a href="/users/${response._id}">${response.firstName}&nbsp${response.lastName}</a><br><br>`);
        }
      },
      error: (error) => console.log(`${id} not found`),
    });
  }

// printOnPage(response, offers) {
//   response.forEach((user)=>{
//     biddersArray.push(user.firstName + " " + user.lastName);
//   });
//   $(".current-offers").append(`<h3> Offers </h3>
//     ${offers.join("<br><br>")}
//     ${biddersArray.join("<br><br>")}`);
// }

  getUserItems(id, callback) {
    $.ajax ({
      url: this.BASE_URL + "/api/items/" + String(id) +"/items_user",
      method: "GET",
      dataType: "json",
      success: (response)=> {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
      },
      error: (error) => console.log(error),
    });
  }

  getOneExpert(id, callback = undefined){
    $.ajax({
      url: this.BASE_URL + "/api/experts/" + String(id),
      method: "GET",
      dataType: "json",
      success: (response) => {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
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

      error: (error)=> {
          console.log("patching failed");
      }
    });
  }

  updateOneItem (newItemInfo,id) {
    $.ajax({
        url: this.BASE_URL + "/api/items/" + String(id),
        method: 'PATCH',
        data: newItemInfo,
        success: (patchResponse) => {
          console.log("success");
        },
        error: (error)=> {
            console.log("patching failed");
        }
    });
  }

  getIdByEmail (email, callback = undefined) {
    $.ajax({
      url: this.BASE_URL + "/api/users/email/" + email,
      method: 'GET',
      dataType: 'JSON',
      success: (response) => {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
      },
      error: (error) => {
        console.log("error dude");
      }
    });
  }

  getNameById (id, callback = undefined) {
    $.ajax({
      url: this.BASE_URL + "/api/users/email/" + email,
      method: 'GET',
      dataType: 'JSON',
      success: (response) => {
        if(typeof(callback) === "undefined") console.log("no callback");
        else callback(response);
      },
      error: (error) => {
        console.log("error dude");
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
