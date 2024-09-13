const ev_slideWrapper = $('.ex_slide_wrapper');
const ev_slideContainer = $('.ex_slide_container');
const ev_slides = $('.ex_slide_container li');
const ev_slideCount = ev_slides.length;
let currentIdx = 0;
let ev_slideWidth = 400;
const ev_slideGap = 72;
let ev_maxSlides = 3;
const ev_prevBtn = $('.ex_slide_prev');
const ev_nextBtn = $('.ex_slide_next');


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
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<li>/g, '<li class="clone">');
ev_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ev_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ev_slideContainer.find('li').length;

setLayout();

function setLayout(){
  let ev_originWidth = (ev_slideWidth * ev_slideCount) + (ev_slideGap * ev_slideCount);
  let ev_maxWidth = (ev_slideWidth * ev_allslideCount) + (ev_slideGap * (ev_allslideCount - 1));
  ev_slideContainer.css({width: ev_maxWidth + 'px'});
  ev_slideContainer.css({ transform: `translateX(-${ev_originWidth}px)` });
}


$(window).resize(function(){
  setLayout();
});


function moveSlide(num){
  let numTotal = -num *(ev_slideWidth + ev_slideGap);
  ev_slideContainer.stop().animate({ left : numTotal +'px'});
  if(!ev_slides.hasClass('active')){
    let pastTarget = ev_slideContainer.find('li').eq((currentIdx+1)+ev_slideCount).find('img').attr('src').replace( '_on.jpg','.jpg');
    ev_slideContainer.find('li').eq((currentIdx+1)+ev_slideCount).find('img').attr('src', pastTarget);
    console.log(pastTarget);
  }
  currentIdx = num;
  
  let slideFind = ev_slideContainer.find('li');
  let nextSlide = (currentIdx+1)+ev_slideCount;
  slideFind.removeClass('active');
  slideFind.eq(nextSlide).addClass('active');
  if(slideFind.hasClass('active')){
    let target = slideFind.eq(nextSlide).find('img').attr('src').replace( '.jpg','_on.jpg');
    slideFind.eq(nextSlide).find('img').attr('src', target);
  }
 
  
  if(currentIdx === ev_slideCount*2- ev_maxSlides){
    setTimeout(()=>{
      //ev_slideContainer.removeClass('animated');
      ev_slideContainer.css({left :`-${(num - ev_slideCount)*(ev_slideWidth + ev_slideGap)}px` });
      currentIdx = num-ev_slideCount;
    }, 500);
    setTimeout(()=>{
      slideFind.eq(currentIdx+1).addClass('active');
      //ev_slideContainer.addClass('animated');
    },600);
  }
  if(currentIdx === -ev_slideCount){
    setTimeout(()=>{
      //ev_slideContainer.removeClass('animated');
      ev_slideContainer.css({left : `0px` })
      currentIdx = 0;
    }, 500);
    setTimeout(()=>{
    ev_slideContainer.find('.ex_slide_container li').eq(currentIdx+1).addClass('active');
      //ev_slideContainer.addClass('animated');
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

function autoSlide(){
  setInterval(()=>{
    moveSlide(currentIdx+1);
  },1000)
}autoSlide();