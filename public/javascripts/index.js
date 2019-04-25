var socket = io();

$('#card-list > .card').ready(function() {
  console.log("Cards have been loaded");
  $('.card').click(function() {
    console.log("A card was clicked");
    console.log(this);
    let a = $(this);
    if (!a.hasClass("flagged")){
      $('#flag-list').append(a.clone());
      a.addClass("flagged bg-warning").removeClass("bg-light");
    }
    else console.log("Card has already been flagged");
  });
});
