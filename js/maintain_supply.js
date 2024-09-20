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

document.addEventListener('DOMContentLoaded', function() {
    const containering = document.querySelector('.containering');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const imageNavigations = document.querySelectorAll('.imageNavigation');

    imageNavigations.forEach(nav => {
        nav.addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');

    // 스크롤 시 버튼 표시
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // 스크롤이 300px 이상일 때
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 버튼 클릭 시 상단으로 부드럽게 스크롤
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤
        });
    });
});