$(document).ready(()=>{
$('#searchButton').on('click', (e) => {
 var word = $("#search").val()
$("#searchUrl").attr("href","/search?word=" + word )
});
})
