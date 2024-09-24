$(document).ready(function() {
  $('.be_tabs .slides').slick({
    autoplay: true,
    autoplaySpeed: 10000,
    dots: true,
    arrows: false,
    fade: true,
    speed: 500,
    pauseOnHover: true,
  });

  // 슬라이드가 바뀔 때 이벤트 핸들러
  $('.be_tabs .slides').on('afterChange', function(event, slick, currentSlide) {
    var bePager = $(this).closest('.be_tabs').find('.pager'); // 해당 탭의 pager
    var toplankDepth = $(this).closest('.be_tabs').find('.toplank_depth'); // 해당 탭의 toplank

    // 버튼 상태 업데이트
    bePager.find('.pager_btn').removeClass('visible');
    bePager.find('.pager_btn').eq(currentSlide).addClass('visible');

    // toplank의 활성화 상태 변경
    toplankDepth.find('li').removeClass('active');
    toplankDepth.find('li').eq(currentSlide).addClass('active');
  });

  // 버튼 클릭 시 슬라이드 이동 및 상태 업데이트
  $('.pager_btn').on('click', function() {
    var index = $(this).data('index');
    $(this).closest('.be_tabs').find('.slides').slick('slickGoTo', index);
  });

  // 페이지 로드 시 첫 번째 버튼 클릭
  $('.pager_btn').first().click();
});