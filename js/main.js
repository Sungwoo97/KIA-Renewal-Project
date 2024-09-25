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


// 연속 클릭이 되지 않도록 막아두는 함수
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

// 슬라이드 복사본 생성
let ev_slideHTML = ev_slideContainer.html();
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<figure>/g, '<figure class="clone">');
ev_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ev_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ev_slideContainer.find('figure').length;

setLayout();
// 슬라이드의 너비를 지정하고 복사본의 크기만큼 translateX값을 추가
function setLayout(){
  if($(window).width() > 1260){
    ev_maxSlides = 3;
    ev_slideWidth = 400;
 }else if($(window).width() < 1260 && $(window).width() > 768){
    ev_maxSlides = 2;
    ev_slideWidth = 400;
 }else if($(window).width() < 768 && $(window).width() > 400){
   ev_maxSlides = 1;
   ev_slideWidth = 400;
 }else{
   ev_maxSlides = 1;
   ev_slideWidth = 300;
 }
  let ev_originWidth = (ev_slideWidth * ev_slideCount) + (ev_slideGap * ev_slideCount);
  let ev_maxWidth = (ev_slideWidth * ev_allslideCount) + (ev_slideGap * (ev_allslideCount - 1));
  ev_slideContainer.css({width: ev_maxWidth + 'px'});
  ev_slideContainer.css({ transform: `translateX(-${ev_originWidth}px)` });
}

// 브라우저의 크기가 변하면 할 일
$(window).resize(function(){
  // 반응형 슬라이드, 너비에 따라 보여줄 슬라이드 갯수가 변경
 
  setLayout();
});

// 슬라이드를 움직이는 함수
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

// 버튼을 누르면 슬라이드 이동 함수가 작동
ev_nextBtn.on('click', debounce(()=>{
  moveSlide(currentIdx + 1);
} , 500));

ev_prevBtn.on('click', debounce(()=>{
  moveSlide(currentIdx - 1);
}, 500)) ;

// 자동 슬라이드 이동 함수
let timer;
function autoSlide(){
  timer = setInterval(()=>{
    moveSlide(currentIdx+1);
  },4000)
}
// 슬라이드에 호버하면 자동 슬라이드 정지, 나가면 재시작
ev_slideContainer.hover(function(){
  clearInterval(timer);
  },function(){
    autoSlide();
  }
);
ev_nextBtn.hover(function(){
  clearInterval(timer);
  },function(){
    autoSlide();
  }
);
ev_prevBtn.hover(function(){
  clearInterval(timer);
  },function(){
    autoSlide();
  }
);
autoSlide();

//로딩 직후 바로 1번탭이 보이도록 강제로 잡아두기
$('#be_tabs1').addClass('active')

//Best Kia 페이저
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

//안전성 탭 1등급 설명 모달
$('.safe_modal_container').hide();

$('.detail_ex button').click(function(){
  $('.safe_modal_container').fadeIn();
});

$('.safe_modal_container').click(function(){
  $(this).fadeOut();
});

//slick 슬라이더 로딩

tabMenu.on('click',function(){
  let target = $(this).find('a').attr('href');
  $(target).find('.slides').slick('slickGoTo', 0);
})

//mainpage 구직용 홈페이지 안내 모달
//쿠키 생성 함수
  const modal = $('.main_modal');
  const check = $('#modal_check');
  const button = $('.modal_control .btn');

  button.click(function(){
    if(check.is(':checked')){
      setCookie('portfolio', 'Kia Renewal', 1);
    }else{
      delCookie('portfolio','Kia Renewal');
    }
    modal.fadeOut();
  });

  function setCookie(name, val, due){
    let date = new Date();
    date.setDate(date.getDate() + due);

    let myCookie = `${name}=${val};expires=`+date.toUTCString();
    document.cookie = myCookie;
  }

  function delCookie(name, val){
    let date = new Date();
    date.setDate(date.getDate() - 1);

    let myCookie =`${name}=${val};expires=`+date.toUTCString();
    document.cookie = myCookie;
  }


  function checkCookie(name, val){
    let checkCookies = `${name}=${val}`
    if(document.cookie.indexOf(checkCookies) === -1){
      modal.removeClass('hidden');
    }
  }
  checkCookie('portfolio','Kia Renewal');
