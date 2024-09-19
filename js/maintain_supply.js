document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        // 모든 아코디언 콘텐츠를 가져와서 닫기
        document.querySelectorAll('.accordion-content').forEach(content => {
            if (content !== accordionContent) {
                content.style.display = 'none';
            }
        });

        // 현재 클릭한 아코디언 콘텐츠 토글
        accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
    });
});

// 기본적으로 첫 번째 아코디언을 열어두기
document.querySelector('.accordion-content').style.display = 'block';