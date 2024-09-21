//best kia 슬라이더 (slick 사용)
const beSlides = $('.best_kia .tab_depth .slides')

beSlides.slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  prevArrow:'none',
  nextArrow:'none',
  autoplay:true,
  autoplaySpeed:10000,
});