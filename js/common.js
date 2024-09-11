const tabMenu = $('.tabs_menu li');


function tabControl(menu){
  menu.click(function(e){
    e.preventDefault();
    console.log($(this).closest('div'));
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
    $(this).closest('div').find('.tabs > div').removeClass('active');
    let target = $(this).find('a').attr('href');
    $(target).addClass('active');
  });
}
tabControl(tabMenu);