const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const slides2 = document.querySelectorAll(".video-slide2");
const mainHeaderCarContents = document.querySelectorAll(".main_header_content");
let currentIndex = 0; // 현재 활성화된 슬라이드의 인덱스

// 슬라이드 전환 함수
function sliderNav(manual) {
  currentIndex = manual;

  // 버튼 상태 초기화
  btns.forEach((btn, i) => {
    btn.classList.remove("active");
  });

  // 화면 너비에 따라 슬라이드 선택
  if (window.innerWidth > 700) {
    // 넓이가 700px 이상일 때 video-slide를 활성화
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[manual].classList.add("active");

    //마찬가지로 콘텐츠 설명란 보여주기
    mainHeaderCarContents.forEach((context, i) => {
      context.classList.remove("active");
    });
    mainHeaderCarContents[manual].classList.add("active");

  } else {
    //우선!! z-index아래서 재생되던 동영상 안보이게
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });

    //넓이가 700px 이하일 때 video-slide2를 활성화
    slides2.forEach((slide, i) => {
      slide.classList.remove("active");
    });

    slides2[manual].classList.add("active");
    mainHeaderCarContents.forEach((context, i) => {
      context.classList.remove("active");
    });
    mainHeaderCarContents[manual].classList.add("active");
  }

  // 버튼 활성화
  btns[manual].classList.add("active");
}

// 각 버튼에 클릭 이벤트 추가
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});

// 처음 로드 시 화면 크기에 맞게 슬라이드 설정
sliderNav(0);



//모달창 관련
document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById("search-modal");
  const search_btn = document.getElementById("searching-index");
  const search_btn2 = document.getElementById("searching-index2");
  const search_span = document.getElementsByClassName("close")[0];

  if (modal && search_btn && search_span && search_btn2) {

    search_btn.onclick = function () {
      modal.style.display = "block";
      console.log('모달창 클릭')
    }

    search_btn2.onclick = function () {
      modal.style.display = "block";
    }

    search_span.onclick = function () {
      modal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


  }

  const small_menu = document.getElementById("smallpage-menu");
  const open_smallMenu_btn = document.getElementById("open-small-menus");
  const smallpage_close = document.getElementsByClassName("smallpage-close")[0];

  if (small_menu && open_smallMenu_btn && smallpage_close) {
    open_smallMenu_btn.onclick = function () {
      small_menu.style.display = "block";
    };

    smallpage_close.onclick = function () {
      small_menu.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == small_menu) {
        small_menu.style.display = "none";
        modal.style.display = "none";
      }
    }
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 857) {
      small_menu.style.display = "none";
      // modal.style.display = "none";

    }
  });

});

// 화면 크기가 변경될 때 슬라이드를 다시 설정
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    // 넓이가 700px 이상으로 커졌을 때, video-slide로 전환
    slides2.forEach((slide) => {
      slide.classList.remove("active");
    });
    slides[currentIndex].classList.add("active");

  } else {
    // 넓이가 700px 이하로 작아졌을 때, video-slide2로 전환
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slides2[currentIndex].classList.add("active");
  }
});







var accordions = document.querySelectorAll('.smallpage-accordion');

// 각 아코디언에 클릭 이벤트 리스너 추가
accordions.forEach(function(accordion) {
  accordion.addEventListener('click', function() {
    // 클릭된 아코디언 다음에 있는 패널 찾기
    var panel = this.nextElementSibling.querySelector('.smallpage-panel');
    
    // 현재 패널의 표시 여부 확인
    var isPanelOpen = panel.style.display === 'block';
    
    // 모든 패널 닫기
    var allPanels = document.querySelectorAll('.smallpage-panel');
    allPanels.forEach(function(p) {
      p.style.display = 'none';
    });
    
    // 클릭한 아코디언의 패널을 열거나 닫기
    if (!isPanelOpen) {
      panel.style.display = 'block';
    }
  });
});
var closeBtn = document.querySelector('.smallpage-close');
var smallPageMenu = document.getElementById('smallpage-menu');

closeBtn.addEventListener('click', function () {
  smallPageMenu.style.display = 'none';
  document.body.style.overflow = 'auto'; // body의 스크롤을 복원
});







window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const navigationItems = document.querySelector(".navigation-items");

  if (window.scrollY > 700) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  var mediaIcons = document.querySelector('.media-icons');
  if (window.scrollY > 100) {
    mediaIcons.classList.add('hidden');
  } else {
    mediaIcons.classList.remove('hidden');
  }
});