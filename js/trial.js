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
const ex_tabMenu = $('.ex_salesNetwork_list .tabs_menu li');
let searchCenter = $('.ex_salesNetwork_list .tabs > div.active').attr('data-tab');
let searchName = $('.ex_salesNetwork_list .tabs > div.active').attr('data-name');
const ex_tabSalesNetwork = $('.ex_tab_salesNetwork');
const ex_tabContent = $('.ex_tab_salesNetwork .tabs > div');



ex_tabMenu.click(function(e){
    e.preventDefault();
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
    $(this).parent().parent('div').find('.tabs > div').removeClass('active');
    let target = $(this).find('a').attr('href');
    $(target).addClass('active');
    searchCenter = $('.ex_salesNetwork_list .tabs > div.active').attr('data-tab');
    searchName = $('.ex_salesNetwork_list .tabs > div.active').attr('data-name');
    searchPlaces(searchCenter);
  });



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


let ev_slideHTML = ev_slideContainer.html();
let ev_clonedSlidesHTML = ev_slideHTML.replace(/<li>/g, '<li class="clone">');
ev_slideContainer.html(ev_clonedSlidesHTML + ev_slideHTML);
ev_slideContainer.append(ev_clonedSlidesHTML);
const ev_allslideCount = ev_slideContainer.find('li').length;
const ev_allSlides = ev_slideContainer.find('li');

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
  currentIdx = num;

  let nextSlide = (currentIdx+1)+ev_slideCount;
  ev_allSlides.removeClass('active');
  ev_allSlides.eq(nextSlide).addClass('active');

 
  
  if(currentIdx === ev_slideCount*2- ev_maxSlides){
    setTimeout(()=>{

      ev_slideContainer.css({left :`-${(num - ev_slideCount)*(ev_slideWidth + ev_slideGap)}px` });
      currentIdx = num-ev_slideCount;
      console.log(ev_allSlides.eq(currentIdx));
      ev_allSlides.eq((currentIdx+1)+ev_slideCount).addClass('active');
    }, 500);
    setTimeout(()=>{
    },600);
  }
  if(currentIdx === -ev_slideCount){
    setTimeout(()=>{
      //ev_slideContainer.removeClass('animated');
      ev_slideContainer.css({left : `0px` });
      currentIdx = 0;
    }, 500);
    setTimeout(()=>{

    },600);
  }
}
moveSlide(0);
let timer
function autoSlide(){
  timer = setInterval(()=>{
    moveSlide(currentIdx+1);
  },4000)
}

ev_slideContainer.hover(function(){
  console.log('작동');
  clearInterval(timer);
},function(){
  autoSlide();
}
);


autoSlide();


/* Map.js */


// fetch('https://ipapi.co/json/')
// .then((response) => {
//   if (!response.ok) {
//     throw new Error(`HTTP 오류! 상태: ${response.status}`);
//   }
//   return response.json();  // json 형식을 obj형식으로 변경
// })
// .then((result) => {
//   console.log(result);    // 객체로 변환된 데이터를 result로 받기
//   let city = result.city;
//   let lat = result.latitude; 
//   let lon = result.longitude; 
//   //locate.innerHTML = city;
//   //makeMap('.ex_maps' ,lat, lon, city);
  
// });
console.log(ex_tabSalesNetwork.is('display'));

if(ex_tabSalesNetwork.css('display') !== 'none'){
  console.log('작동');
}
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

var level = map.getLevel();

//사용자 속성에 미리 검색할 키워드를 입력


// 키워드로 장소를 검색합니다
searchPlaces(searchCenter);

// 키워드 검색을 요청하는 함수입니다
function searchPlaces(center) {

    //var keyword = document.getElementById('maps_search').getAttribute('data-val');
    var keyword = center;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
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
function displayPlaces(places , name) {

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
            // kakao.maps.event.addListener(marker, 'mouseover', function() {
            //      (marker, title);
            // });

            // kakao.maps.event.addListener(marker, 'mouseout', function() {
            //     infowindow.close();
            // });

            // itemEl.onmouseover =  function () {
            //     displayInfowindow(marker, title);
            // };

            // itemEl.onmouseout =  function () {
            //     infowindow.close();
            // };

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
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <p>' + places.road_address_name + '</p>' ;
    } else {
        itemStr += '    <p>' +  places.address_name  + '</p>'; 
    }
                 
      itemStr += '  <p class="tel">' + places.phone  + '</p>' +
                '</div>' +  '<p> <i class="fa-solid fa-user-tie"></i>상담 신청</p>';             

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
function panTo(lat, lng) {
  // 이동할 위도 경도 위치를 생성합니다 
  console.log(lat, lng);
  map.setLevel(4);
  var moveLatLon = new kakao.maps.LatLng(lat, lng);
  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);            
}  
