const tabMenu = $('.me_tabs_menu li');
const tabContent = $('#me_tabs > div');

tabMenu.click(function(e){
  e.preventDefault();
  tabMenu.removeClass('active');
  $(this).addClass('active');
  tabContent.removeClass('active');
  let target = $(this).find('a').attr('href');
  $(target).addClass('active');
});