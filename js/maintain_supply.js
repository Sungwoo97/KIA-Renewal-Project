
// import { product1 } from './products.js';
import { product1 } from './products.js';


const search_wrapper = document.querySelector('.search-wrapper');
const imageList = document.querySelector('.image-list');
const btns = document.querySelectorAll('.view-options button');
// const imageListItem = imageList.querySelectorAll('li')
const active = 'active';
const listView = 'list-view';
const dnone = 'd-none';
const rangeInput = document.querySelector('input[type="range"]');
const searchInput = document.querySelector('input[type="search"]');
const zoom = document.querySelector('.zoom');
// const captions = imageList.querySelectorAll('figcaption p:first-child')
const count = document.querySelector('span');
const buttonLow = document.querySelector('.button1');
const buttonHigh = document.querySelector('.button2');
let newHtml = '';
let currentCount = 15; // Start with the initial 15 products
const loadCount = 5;   // Number of products to load on each click


document.addEventListener('DOMContentLoaded', function () {
  // 각 섹션별 아코디언 설정
  const sections = ['membersPoint', 'membersPoint2', 'membersPoint3'];

  sections.forEach(sectionClass => {
    const section = document.querySelector(`.${sectionClass}`);
    const buttons = section.querySelectorAll('.accordion-button');

    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const content = this.nextElementSibling;

        // 현재 클릭한 버튼에 대한 아코디언 토글
        this.classList.toggle('active');
        content.classList.toggle('open');

        // 아이콘 변경
        const icon = this.querySelector('.icon');
        if (content.classList.contains('open')) {
          icon.textContent = '-';  // 열렸을 때 아이콘
        } else {
          icon.textContent = '+';  // 닫혔을 때 아이콘
        }

        // 클릭한 버튼을 제외한 나머지 아코디언을 닫음
        buttons.forEach(otherButton => {
          if (otherButton !== button) {
            otherButton.classList.remove('active');
            otherButton.nextElementSibling.classList.remove('open');

            // 나머지 버튼의 아이콘도 초기화
            const otherIcon = otherButton.querySelector('.icon');
            if (otherIcon) {
              otherIcon.textContent = '+';
            }
          }
        });
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const containering = document.querySelector('.containering');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // 아래로 스크롤할 때
      containering.classList.add('sticky');
    } else {
      // 위로 스크롤할 때
      containering.classList.remove('sticky');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 스크롤 위치를 업데이트
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const imageNavigations = document.querySelectorAll('.imageNavigation');

  imageNavigations.forEach(nav => {
    nav.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100; // 100px 위로 이동
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth' // 부드러운 스크롤
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.getElementById('backToTop');

  // 스크롤 시 버튼 표시
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) { // 스크롤이 300px 이상일 때
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // 버튼 클릭 시 상단으로 부드럽게 스크롤
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤
    });
  });
});





//초기 배열 + 추가
function renderInitialItems() {
  let newHtml = '';
  product1.slice(0, 15).forEach(item => {
    newHtml += `
      <li>
        <figure class="centered-figure">
          <img src="${item.url}" alt="">
          <figcaption>
            <div class="titles">
              <p class="title active">${item.title}</p>
              <p class="title2">${item.title2}</p>
            </div>
            <p class="title3">${item.title3}</p>
            <p class="title4 hidden">${item.title4}</p>
          </figcaption>
        </figure>
      </li>`;
  });
  imageList.innerHTML = newHtml;
}

renderInitialItems();

const imageListItem = imageList.querySelectorAll('li')


//????
imageList.addEventListener('click', (event) => {
  // title 클릭 시 title3 보여주기
  if (event.target.classList.contains('title')) {
    const figcaption = event.target.closest('figcaption');
    const title3 = figcaption.querySelector('.title3');
    const title4 = figcaption.querySelector('.title4');

    // title3만 보여주고 title4는 숨김
    title3.classList.remove('hidden');
    title4.classList.add('hidden');

    // 클릭된 탭 스타일 활성화
    event.target.classList.add('active');
    figcaption.querySelector('.title2').classList.remove('active');
  }

  // title2 클릭 시 title4 보여주기
  if (event.target.classList.contains('title2')) {
    const figcaption = event.target.closest('figcaption');
    const title3 = figcaption.querySelector('.title3');
    const title4 = figcaption.querySelector('.title4');

    // title4만 보여주고 title3는 숨김
    title4.classList.remove('hidden');
    title3.classList.add('hidden');

    // 클릭된 탭 스타일 활성화
    event.target.classList.add('active');
    figcaption.querySelector('.title').classList.remove('active');
  }
});


function renderItems() {
  let newHtml = '';
  product1.slice(0, currentCount).forEach(item => {
    newHtml += `
      <li>
        <figure class="centered-figure">
          <img src="${item.url}" alt="">
          <figcaption>
            <div class="titles">
              <p class="title active">${item.title}</p>
              <p class="title2">${item.title2}</p>
            </div>
            <p class="title3">${item.title3}</p>
            <p class="title4 hidden">${item.title4}</p>
          </figcaption>
        </figure>
      </li>`;
  });
  imageList.innerHTML = newHtml;

  // Show or hide the Load More button based on the number of displayed products
  const loadMoreButton = document.querySelector('.load-more-button');
  if (currentCount >= product1.length) {
    loadMoreButton.style.display = 'none'; // Hide the button if all products are shown
  } else {
    loadMoreButton.style.display = 'block'; // Show the button otherwise
  }
}

// Initial render
renderItems();

// Event listener for the "Load More" button
const loadMoreButton = document.querySelector('.load-more-button');
loadMoreButton.addEventListener('click', () => {
  currentCount += loadCount; // Increase the count by loadCount
  renderItems(); // Render the updated list of items
});





////////////////////////////////////////////탭메뉴 연동///////////////////////////////////////
let tabMenu = document.querySelectorAll('.tab-menu a');
let tabContent = document.querySelectorAll('#tab-content > div')

for (let tm of tabMenu) {
  tm.addEventListener('click', function (e) {
    e.preventDefault();

    for (let tm of tabMenu) {
      tm.classList.remove('tab-active');
    }
    tm.classList.add('tab-active');

    for (let tc of tabContent) {
      tc.classList.remove('tab-active');
    }

    let target = tm.getAttribute('href');

    //선택한 것이 남자라면
    if (target === '자동차') {
      //셀렉터 안보이게
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })
      //type=men인것으로 새로운 배열을 만들어준다. 
      const menProducts = product1.filter(item => item.type === '자동차');
      console.log(menProducts); // 남성용 제품들만 해당하는 것들이 잘 들어있다. 

      let emptyHtml = '';

      menProducts.forEach(item => {
        emptyHtml +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml
      loadMoreButton.style.display = 'none';


    } else if (target === '라이프') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const womenProducts = product1.filter(item => item.type === '라이프');

      let emptyHtml2 = '';

      womenProducts.forEach(item => {
        emptyHtml2 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml2
      loadMoreButton.style.display = 'none';

    } else if (target === '중고차') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const kidsProducts = product1.filter(item => item.type === '중고차');

      let emptyHtml3 = '';

      kidsProducts.forEach(item => {
        emptyHtml3 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml3
      loadMoreButton.style.display = 'none';

    } else if (target === '커피&베이커리') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === '커피&베이커리');

      let emptyHtml4 = '';

      babyProducts.forEach(item => {
        emptyHtml4 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml4
      loadMoreButton.style.display = 'none';

    } else if (target === '보험') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === '보험');

      let emptyHtml4 = '';

      babyProducts.forEach(item => {
        emptyHtml4 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml4
      loadMoreButton.style.display = 'none';

    } else if (target === '쇼핑') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === '쇼핑');

      let emptyHtml4 = '';

      babyProducts.forEach(item => {
        emptyHtml4 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml4
      loadMoreButton.style.display = 'none';

    } else if (target === '주유&충전') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === '주유&충전');

      let emptyHtml4 = '';

      babyProducts.forEach(item => {
        emptyHtml4 +=
          `
    <li>
      <figure class="centered-figure">
        <img src="${item.url}" alt="">
        <figcaption>
          <div class="titles">
            <p class="title active">${item.title}</p>
            <p class="title2">${item.title2}</p>
          </div>
          <p class="title3">${item.title3}</p>
          <p class="title4 hidden">${item.title4}</p>
        </figcaption>
      </figure>
    </li>`;
      })
      imageList.innerHTML = emptyHtml4

    } else if (target === '외식') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === '외식');

      let emptyHtml4 = '';

      babyProducts.forEach(item => {
        emptyHtml4 +=
          `
                <li>
                  <figure class="centered-figure">
                    <img src="${item.url}" alt="">
                    <figcaption>
                      <div class="titles">
                        <p class="title active">${item.title}</p>
                        <p class="title2">${item.title2}</p>
                      </div>
                      <p class="title3">${item.title3}</p>
                      <p class="title4 hidden">${item.title4}</p>
                    </figcaption>
                  </figure>
                </li>`;
      })
      imageList.innerHTML = emptyHtml4
      loadMoreButton.style.display = 'none';

    } else if (target === 'top10') {
      search_wrapper.classList.remove(dnone)
      // priceSelector.classList.remove(dnone)

      //일단없애주고
      imageListItem.forEach((item, idx, all) => {
        item.classList.add(dnone)
      })

      const babyProducts = product1.filter(item => item.type === 'top10');
      loadMoreButton.style.display = 'block';
      renderInitialItems();

    }
  });
}

var button = document.querySelector('.load-more-button');
var gridView = document.querySelector('.grid-view');

// 버튼이 없거나, display가 none일 때 margin-bottom을 8rem으로 설정
if (!button || button.style.display === 'none') {
  gridView.style.marginBottom = '118rem';
} else {
  gridView.style.marginBottom = '5rem';
}

