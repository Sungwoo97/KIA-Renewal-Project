$('.parallax-window').parallax({
  naturalWidth: 100
});

const trigger = new ScrollTrigger.default({
  trigger: {
    // once: true,
    offset: {
      viewport: {
        y: 0.05
      }
    },
    toggle: {
      class:{
        in: 'active'
      }
    }
  }
}); 
// Add all html elements with attribute data-trigger
trigger.add('[data-trigger]');


/* Subtitle */

$(document).ready(function() {
  $('.icontab li').on('click', function() {
    var sectionId = $(this).data('target');

    if (sectionId) {
      $('html, body').animate({
        scrollTop: $('#' + sectionId).offset().top
      }, 500);
    }
  });
});

$(document).ready(function() {
  $(window).on('scroll', function() {
      var triggerPoint = $(window).height() - 300;

      $('.subtitle .sub h3, .subimg img, .subimg svg, .icontab ul li, section .banner p, section .banner h3, section .expanation h3, section .diagram').each(function() {
          if ($(this).offset().top < $(window).scrollTop() + triggerPoint) {
              $(this).addClass('active');

              if ($(this).hasClass('diagram')) {
                  console.log("Diagram activated"); // 로그 추가
                  $(this).find('.mobile path').addClass('active');
              }
          }
      });
  });
});


/* Icontab */

$(document).ready(function() {
  $(window).on('scroll', function() {
      var triggerPoint = $(window).height() - 500;

      $('.subtitle .sub div, .icontab ul li, section .expanation p').each(function() {
        if ($(this).offset().top < $(window).scrollTop() + triggerPoint) {
            $(this).addClass('active');
        }
    });
  });
});


/* Section */

$('section .img1').parallax({
  imageSrc: 'img/ma/section_img1.png',
  speed: 0.5,
});

$('section .img2').parallax({
  imageSrc: 'img/ma/section_img2.png',
  speed: 0.5
});

$('section .img3').parallax({
  imageSrc: 'img/ma/section_img3.png',
  speed: 0.5
});

