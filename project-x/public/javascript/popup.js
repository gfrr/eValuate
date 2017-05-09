$(document).ready(() => {

  $(".linkview").click(function(e){
      e.preventDefault();
      $('body').append($('<div/>')
        .attr("id", "newDiv1")
        .addClass("newDiv")
        .append("<span/>")
          .text("hello world"));
        });
        
});


// $(".popup").fadeIn(300,function(){$(this).focus();});
//     $()
// });
