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




let ev_slideHTML = ev_slideContainer.html();
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<figure>/g, '<figure class="clone">');
ev_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ev_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ev_slideContainer.find('figure').length;

function setLayout(){
  let ev_originWidth = (ev_slideWidth * ev_slideCount) + (ev_slideGap * ev_slideCount);
  let ev_maxWidth = (ev_slideWidth * ev_allslideCount) + (ev_slideGap * (ev_allslideCount - 1));
  ev_slideContainer.css({width: ev_maxWidth + 'px'});
  ev_slideContainer.css({ transform: `translateX(-${ev_originWidth}px)` });
}
setLayout();

$(window).resize(function(){
  setLayout();
});

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
} , 500));