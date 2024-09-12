const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const slides2 = document.querySelectorAll(".video-slide2");
const mainHeaderCarContents = document.querySelectorAll(".main_header_content");
let currentIndex = 0;  // 현재 활성화된 슬라이드의 인덱스

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
    mainHeaderCarContents.forEach( (context, i) =>{
      context.classList.remove("active");
    });
    mainHeaderCarContents[manual].classList.add("active");

  } else {
    // 넓이가 700px 이하일 때 video-slide2를 활성화
    slides2.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides2[manual].classList.add("active");
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