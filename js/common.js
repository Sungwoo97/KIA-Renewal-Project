const tabMenu = $('.tabs_menu li');

// 탭을 재사용할 수 있도록 리팩토링
function tabControl(menu){
  menu.click(function(e){
    e.preventDefault();
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
    $(this).parent().parent('div').find('.tabs > div').removeClass('active');
    let target = $(this).find('a').attr('href');
    $(target).addClass('active');
  });
}
tabControl(tabMenu);