
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

document.addEventListener('DOMContentLoaded', (event) => {

  // 메뉴를 열고 닫는 아코디언 기능
  var acc = document.getElementsByClassName("smallpage-accordion");
  var panels = document.getElementsByClassName("smallpage-panel");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      // 현재 열려있는 모든 아코디언과 패널을 닫음
      for (let j = 0; j < acc.length; j++) {
        if (acc[j] !== this) {
          acc[j].classList.remove("activeOnlySmallPage"); // 다른 아코디언에서 active 클래스 제거
          panels[j].style.display = "none"; // 다른 패널 닫기
        }
      }

      // 클릭된 아코디언을 토글
      this.classList.toggle("activeOnlySmallPage");

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none"; // 이미 열려있다면 닫기
      } else {
        panel.style.display = "block"; // 닫혀있다면 열기
      }
    });
  }

  // 메뉴 닫기 버튼 기능
  var closeBtn = document.querySelector('.smallpage-close');
  var smallPageMenu = document.getElementById('smallpage-menu');

  closeBtn.addEventListener('click', function () {
    smallPageMenu.style.display = 'none';
    document.body.style.overflow = 'auto'; // body의 스크롤을 복원
  });

});

