const ex_slideWrapper = $('.ex_slide_wrapper');
const ex_slideContainer = $('.ex_slide_container');
const ex_slides = $('.ex_slide_container li');
const ex_slideCount = ex_slides.length;
let currentIdx = 0;
let ex_slideWidth = 400;
const ex_slideGap = 72;
let ex_maxSlides = 3;
const ex_tabMenu = $('.tabs_menu li');
let searchCenter = $('.ex_salesNetwork_list .tabs > div.active').attr('data-tab');
let searchName = $('.ex_salesNetwork_list .tabs > div.active').attr('data-name');
const ex_tabSalesNetwork = $('.ex_tab_salesNetwork');
const ex_tabContent = $('.ex_tab_salesNetwork .tabs > div');
let placeData = [];

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

/* TestDrive Modal */
$('.ex_modalContainer').hide();
$('.ex_modalContainer').removeClass('hidden');
$('.testDrive').click(function(){
  $('.ex_modalContainer').fadeIn();
});
$('.modal .cancel').click(function(){
  $('.ex_modalContainer').fadeOut();
})

/* TestDrive Modal Form */
$('#usermodel').selectmenu();
$( "#useragree" ).checkboxradio();
$( "#userdate" ).datepicker();

/* experience Slide */
let ev_slideHTML = ex_slideContainer.html();
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<li>/g, '<li class="clone">');
ex_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ex_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ex_slideContainer.find('li').length;
const ev_allSlides = ex_slideContainer.find('li');

setLayout();
// 너비를 설정해주는 함수
// 반응형 추가, 너비가 1260 이하일때 슬라이드가 하나만 보이도록
function setLayout(){
  let ex_originWidth = (ex_slideWidth * ex_slideCount) + (ex_slideGap * ex_slideCount);
  let ex_maxWidth = (ex_slideWidth * ev_allslideCount) + (ex_slideGap * (ev_allslideCount - 1));
  ex_slideContainer.css({width: ex_maxWidth + 'px'});
  if($(window).width() > 1200){
    ex_slideContainer.css({ transform: `translateX(-${ex_originWidth}px)` });
     ex_maxSlides = 3;
     ex_slideWidth = 400;
  }else{
   ex_slideContainer.css({transform : `translateX(-${ex_originWidth+ex_slideWidth + ex_slideGap}px)`});
    ex_maxSlides = 1;
    ex_slideWidth = 400;
  }
}

//윈도우 사이즈가 변경될 때도 너비를 재설정
$(window).resize(function(){
  setLayout();
});

//슬라이드를 움직이는 함수
function moveSlide(num){
  let numTotal = -num *(ex_slideWidth + ex_slideGap);
  ex_slideContainer.stop().animate({ left : numTotal +'px'});
  currentIdx = num;

  // 가운데 오는 슬라이드를 구하는 변수
  let nextSlide = (currentIdx+1)+ex_slideCount;
  ev_allSlides.removeClass('active');
  ev_allSlides.eq(nextSlide).addClass('active');

  updateSlideImages();
  
  if(currentIdx === ex_slideCount*2- ex_maxSlides){
    setTimeout(()=>{

      ex_slideContainer.css({left :`-${(num - ex_slideCount)*(ex_slideWidth + ex_slideGap)}px` });
      currentIdx = num-ex_slideCount;
      ev_allSlides.eq((currentIdx+1)+ex_slideCount).addClass('active');
      updateSlideImages();
    }, 500);
    setTimeout(()=>{
    },600);
  }
  if(currentIdx === -ex_slideCount){
    setTimeout(()=>{
      //ex_slideContainer.removeClass('animated');
      ex_slideContainer.css({left : `0px` });
      currentIdx = 0;
      updateSlideImages();
    }, 500);
    setTimeout(()=>{

    },600);
  }
}
moveSlide(0);

//시간이 지날때마다 슬라이드가 넘어가는 함수
let timer;
function autoSlide(){
  timer = setInterval(()=>{
    moveSlide(currentIdx+1);
  },4000)
}

// 버튼을 누르면 슬라이드 이동 함수가 작동
$('.ex_slide_next').on('click', debounce((e)=>{
  e.preventDefault();
  moveSlide(currentIdx + 1);
} , 500));

$('.ex_slide_prev').on('click', debounce((e)=>{
  e.preventDefault();
  moveSlide(currentIdx - 1);
}, 500)) ;

//마우스 호버시 자동 슬라이드 종료, 마우스가 나가면 자동 슬라이드 재시작
ex_slideContainer.hover(function(){
  clearInterval(timer);
  },function(){
    autoSlide();
  }
);
$('.ex_slide_control').hover(function(){
  clearInterval(timer);
  },function(){
    autoSlide();
  }
);
autoSlide();

// 슬라이드가 가운데에 올때 이미지를 변경해주는 함수
function updateSlideImages() {
  ev_allSlides.each(function (index) {
    let img = $(this).find('img');
    let imgSrc = img.attr('src');

    // 파일명에서 '_on.jpg'를 제거하여 원래 파일명 복구
    let originalSrc = imgSrc.replace('_on.jpg', '.jpg');

    // 슬라이드가 가운데에 있을 때만 '_on.jpg'로 변경
    if ($(this).hasClass('active')) {
      let newSrc = originalSrc.replace('.jpg', '_on.jpg');
      img.attr('src', newSrc);
    } else {
      img.attr('src', originalSrc);
    }
  });
}

/* Sales Network Tab */
let excuted = false;
ex_tabMenu.click(function(e){
  e.preventDefault();
  $(this).parent().find('li').removeClass('active');
  $(this).addClass('active');
  $(this).parent().parent('div').find('.tabs > div').removeClass('active');
  let target = $(this).find('a').attr('href');
  $(target).addClass('active');
  // 판매 네트워크 탭이 active라면 강제로 지점 찾기에 active, 
  // 이후 한번만 작동할 수 있도록 excuted 변수로 컨트롤
  if(ex_tabSalesNetwork.hasClass('active')){  
    if(!excuted) {
      ex_tabSalesNetwork.find('.tabs_menu > li').removeClass('active');
      ex_tabSalesNetwork.find('.tabs_menu > li:nth-child(1)').addClass('active');
      ex_tabSalesNetwork.find('.tabs > div').removeClass('active');
      let target = ex_tabSalesNetwork.find('.tabs_menu > li:nth-child(1)').find('a').attr('href');
      $(target).addClass('active'); 
    }
    //active 된 탭의 사용자 속성을 search Keywords로 넘기는 변수
    searchCenter = $('.ex_salesNetwork_list .tabs > div.active').attr('data-tab');
    searchName = $('.ex_salesNetwork_list .tabs > div.active').attr('data-name');
    excuted= true;
    makeMap();
  }else{
    excuted = false;
  }
});


/* Map.js */
// 판매 네트워크에 active가 있을 때 맵을 화면에 그림 (미리 작동 시 오류)
if(ex_tabSalesNetwork.hasClass('active')){
  makeMap();
}
function makeMap(){

  var markers = [];
  
    var mapContainer = document.getElementById('ex_maps'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };  
        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();  
  
  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  
  // 키워드로 장소를 검색합니다
  searchPlaces(searchCenter);
  
  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces(center) {

      var keyword = center;
  
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
      }
  
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch( keyword, placesSearchCB); 
  }
  
  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination ) {
      if (status === kakao.maps.services.Status.OK) {
        
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);
  
          // 페이지 번호를 표출합니다
          displayPagination(pagination);
  
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
  
          alert('검색 결과가 존재하지 않습니다.');
          return;
  
      } else if (status === kakao.maps.services.Status.ERROR) {
  
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
  
      }
  }
  
  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {
  
      var listEl = document.querySelector(`${searchName} .placesList`), 
      menuEl = document.querySelector(`${searchName} .menu_wrap`),
      fragment = document.createDocumentFragment(), 
      bounds = new kakao.maps.LatLngBounds(), 
      listStr = '';
      
      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);
  
      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();
      
      for ( var i=0; i<places.length; i++ ) {
        // 데이터를 검색할 수 있도록 배열에 담음
        placeData.push({
          id: [i],
          name:places[i].place_name});
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
              marker = addMarker(placePosition, i), 
              itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);
        
          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function(marker, title) {
            //마커를 클릭 했을 때 마커의 위치로 이동
              kakao.maps.event.addListener(marker, 'click', function() {
                let targetPos = marker.getPosition();
                setCenter(Number(targetPos.Ma),Number(targetPos.La));
              });

              // 목록을 클릭했을때 해당하는 위치로 이동
              itemEl.onclick =  function () {
                let targetPos = marker.getPosition();
                map.setLevel(8);
                panTo(Number(targetPos.Ma),Number(targetPos.La));
                
            };
  
          })(marker, places[i].place_name);
  
          fragment.appendChild(itemEl);
      }
  
      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
  
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
  }
  
  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index, places) {
  
      var el = document.createElement('li'),
      itemStr = '<span class="markerbg marker_' + (index+1) + ' blind"></span>' +
                  '<div class="info">' +
                  '<h5>' + places.place_name + '</h5>  <div class="info_address"><i class="fa-regular fa-address-book"></i><div>';
  
      if (places.road_address_name) {
          itemStr += '    <p>' + places.road_address_name + '</p>' ;
      } else {
          itemStr += '    <p>' +  places.address_name  + '</p>'; 
      }
                   
        itemStr += '  <p class="tel">' + places.phone  + '</p></div></div>' +
                  '</div>' +  '<button class="btn"> <i class="fa-solid fa-user-tie"></i>상담 신청</button>';             
  
      el.innerHTML = itemStr;
      el.className = 'item';
      

      return el;
  }
  
  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx, title) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
          imgOptions =  {
              spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
              spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
              marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage 
          });
  
      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker);  // 배열에 생성된 마커를 추가합니다
  
      return marker;
  }
  
  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
      }   
      markers = [];
  }
  
  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination) {
      var paginationEl = document.querySelector('.pagination'),
          fragment = document.createDocumentFragment(),
          i; 
  
      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild (paginationEl.lastChild);
      }
  
      for (i=1; i<=pagination.last; i++) {
          var el = document.createElement('a');
          el.href = "#";
          el.innerHTML = i;
  
          if (i===pagination.current) {
              el.className = 'on';
          } else {
              el.onclick = (function(i) {
                  return function() {
                      pagination.gotoPage(i);
                  }
              })(i);
          }
  
          fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
  }
  
  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
  
      infowindow.setContent(content);
      infowindow.open(map, marker);
  }
  
   // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {   
      while (el.hasChildNodes()) {
          el.removeChild (el.lastChild);
      }
  }
  // 중심점으로 부드럽게 이동 시키는 함수
  function panTo(lat, lng) {
    // 이동할 위도 경도 위치를 생성합니다 
    map.setLevel(4);
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
  }  
  // 중심점으로 이동시키는 함수
  function setCenter(lat, lng) {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(lat,lng);
    map.setLevel(4);
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}
}

//검색된 데이터를 받아오는 함수
$('.maps_search').change(function(e){
  e.preventDefault();
  $('.ex_salesNetwork_list .active .placesList .item').removeClass('hidden');
  let keywords = $(this).val();
  let filteredArr = placeData.filter(placefilter => placefilter.name.includes(keywords));
  // 모든 객체에 hidden을 추가하고 keywords와 일치하는 객체에 hidden을 지운다
  $('.ex_salesNetwork_list .active .placesList .item').addClass('hidden');
  $(this).closest('div').find('li').eq(filteredArr[0].id).removeClass('hidden');
  // 키워드가 없다면 다시 hidden을 지운다
  if(keywords === ''){
    $('.ex_salesNetwork_list .active .placesList .item').removeClass('hidden');
  }
});


$('.ex_salesNetwork_wrapper [type="submit"]').click(function(e){
  e.preventDefault();
})


