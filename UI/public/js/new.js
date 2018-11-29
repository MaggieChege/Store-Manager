(function($){
$(document).ready(function(){

$(function() {
  let menu = $('#cssmenu > ul');
  menu.find('.has-sub > ul').hide();

  menu.on('click', function(event) {
    event.preventDefault();

    let targetParent = $(event.target).parent();
    if (targetParent.hasClass('has-sub')) {
      targetParent.toggleClass('active');
      targetParent.children('ul').slideToggle(250);
    }
  })
});

});
})
// (jQuery);
