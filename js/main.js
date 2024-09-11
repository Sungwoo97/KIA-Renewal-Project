const me_tabMenu = $('.tabs_menu li');
const me_tabContent = $('#me_tabs > div');
const ev_slideWrapper = $('.ev_slide_wrapper');
const ev_slideContainer = $('.ev_slide_container');
const ev_slides = $('.ev_slide_container figure');
const ev_slideCount = ev_slides.length;
let currentIdx = 0;
const ev_slideWidth = 400;
const ev_slideGap = 32;
const ev_maxSlides = 3;
const ev_prevBtn = $('.ev_slide_prev');
const ev_nextBtn = $('.ev_slide_next');
console.log(me_tabMenu);

console.log(ev_slideCount);

me_tabMenu.click(function(e){
  e.preventDefault();
  me_tabMenu.removeClass('active');
  $(this).addClass('active');
  me_tabContent.removeClass('active');
  let target = $(this).find('a').attr('href');
  $(target).addClass('active');
});



console.log(ev_slideWrapper.outerWidth());
function setLayout(){
  //slideContainer의 너비를 지정
  let ev_originWidth = ev_slideWrapper.outerWidth();
  let ev_maxWidth = (ev_slideWidth * ev_slideCount) + (ev_slideGap * (ev_slideCount - 1));
  ev_slideContainer.css({width: ev_maxWidth + 'px'});
}
setLayout();

$(window).resize(function(){
  setLayout();
})


function moveSlide(num){
  if(num > 4){
    num = 0;
  }
  if(num < 0){
    num = 4;
  }
  let numTotal = -num * (ev_slideWidth + ev_slideGap);
  ev_slideContainer.animate({left : numTotal + 'px' });
  currentIdx = num;
}
moveSlide(0);

ev_nextBtn.click(function(){
  moveSlide(currentIdx + 1);
});
ev_prevBtn.click(function(){
  moveSlide(currentIdx - 1);
});