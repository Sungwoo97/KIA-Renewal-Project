const ev_slideWrapper = $('.ev_slide_wrapper');
const ev_slideContainer = $('.ev_slide_container');
const ev_slides = $('.ev_slide_container figure');
const ev_slideCount = ev_slides.length;
let currentIdx = 0;
let ev_slideWidth = 400;
const ev_slideGap = 32;
let ev_maxSlides = 3;
const ev_prevBtn = $('.ev_slide_prev');
const ev_nextBtn = $('.ev_slide_next');




function debounce(callback, time){
  let slideTrigger = true;
  return (e)=>{
    if(slideTrigger){
      callback(e);
      slideTrigger = false;
      setTimeout(()=>{
        slideTrigger = true;
      }, time);
    } 
  }
}
console.log($(window).width());

let ev_slideHTML = ev_slideContainer.html();
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<figure>/g, '<figure class="clone">');
ev_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ev_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ev_slideContainer.find('figure').length;

setLayout();

function setLayout(){
  let ev_originWidth = (ev_slideWidth * ev_slideCount) + (ev_slideGap * ev_slideCount);
  let ev_maxWidth = (ev_slideWidth * ev_allslideCount) + (ev_slideGap * (ev_allslideCount - 1));
  ev_slideContainer.css({width: ev_maxWidth + 'px'});
  ev_slideContainer.css({ transform: `translateX(-${ev_originWidth}px)` });
}


$(window).resize(function(){
  if($(window).width() > 1260){
     ev_maxSlides = 3;
     ev_slideWidth = 400;
  }else if($(window).width() < 1260 && $(window).width() > 768){
     ev_maxSlides = 2;
     ev_slideWidth = 400;
  }else{
    ev_maxSlides = 1;
    ev_slideWidth = 400;
  }
  setLayout();
});


function moveSlide(num){
  let numTotal = -num *(ev_slideWidth + ev_slideGap);
  ev_slideContainer.stop().animate({ left : numTotal +'px'});
  currentIdx = num;
  if(currentIdx === ev_slideCount*2- ev_maxSlides){
    setTimeout(()=>{
      ev_slideContainer.removeClass('animated');
      ev_slideContainer.css({left :`-${(num - ev_slideCount)*(ev_slideWidth + ev_slideGap)}px` });
      currentIdx = num-ev_slideCount;
    }, 500);
    setTimeout(()=>{
      ev_slideContainer.addClass('animated');
    },600);
  }
  if(currentIdx === -ev_slideCount){
    setTimeout(()=>{
      ev_slideContainer.removeClass('animated');
      ev_slideContainer.css({left : `0px` })
      currentIdx = 0;
    }, 500);
    setTimeout(()=>{
      ev_slideContainer.addClass('animated');
    },600);
  }
}
moveSlide(0);

ev_nextBtn.on('click', debounce(()=>{
  moveSlide(currentIdx + 1);
} , 500));

ev_prevBtn.on('click', debounce(()=>{
  moveSlide(currentIdx - 1);
}, 500)) ;

//로딩 직후 바로 1번탭이 보이도록 강제로 잡아두기
$('#be_tabs1').addClass('active')

//Best Kia pager
$('.be_tabs').each(function() {
  var tabs = $(this);
  var toplankDepth = tabs.find('.toplank_depth');
  var bePager = tabs.find('.pager');
  
  var bepagerHtml = '';
  toplankDepth.find('li').each(function(index) {
    bepagerHtml += `<button class="pager_btn" data-index="${index}">TOP ${index + 1}</button>`;
  });
  bePager.html(bepagerHtml);
  
  bePager.find('.pager_btn').on('click', function() {
    var index = $(this).data('index');
    
    toplankDepth.find('li').removeClass('active');
    toplankDepth.find('li').eq(index).addClass('active');

    bePager.find('.pager_btn').removeClass('visible');
    $(this).addClass('visible');

  });


  bePager.find('.pager_btn').first().click();
});