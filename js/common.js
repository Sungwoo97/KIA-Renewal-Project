const me_tabMenu = $('.me_tabs_menu li');
const me_tabContent = $('.me_tabs > div');

function tabControl(menu, content){
  menu.click(function(e){
    e.preventDefault();
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
    content.removeClass('active');
    let target = $(this).find('a').attr('href');
    $(target).addClass('active');
  });
}
tabControl(me_tabMenu, me_tabContent);