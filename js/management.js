
const trigger = new ScrollTrigger.default({
  trigger: {
    // once: true,
    offset: {
      viewport: {
        y: 0.1
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

function pathPrepare ($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
}

var $bSvg = $("path#bSvg");

// prepare SVG
pathPrepare($bSvg);

// init controller
var controller = new ScrollMagic.Controller();

// build tween
var tween = new TimelineMax()
  .add(TweenMax.to($bSvg, 1, {stroke: "#05141F", strokeDashoffset: 0, ease:Linear.easeNone}))

// build scene
var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 1000, tweenChanges: true})
  .setTween(tween)
  .addIndicators() // add indicators (requires plugin)
  .addTo(controller);


/* Section */

$('section .img1').parallax({
  imageSrc: 'img/ma/section_img1.png',
  speed: 0.5
});

$('section .img2').parallax({
  imageSrc: 'img/ma/section_img2.png',
  speed: 0.5
});

$('section .img3').parallax({
  imageSrc: 'img/ma/section_img3.png',
  speed: 0.5
});

