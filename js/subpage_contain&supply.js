
let tabMenu = document.querySelectorAll('.tab-menu a');
let tabContent = document.querySelectorAll('#tab-content > div')

/*
대상.getAttribute('속성명') => 속성명의 값을 변환
let a = test.getAttribute('c') => test요소의 c속성값을 a에 할당
let target = a.getAttribute('c')
 */

for (let tm of tabMenu){
    console.log(tm)  //tabmenu의 a링크 3개가 들어있다. 
    //<a href="#tabs-1">basic</a>
    //<a href="#tabs-3">expert</a>
    //<a href="#tabs-2">advanced</a>

    tm.addEventListener('click', function(e){
        e.preventDefault();

        for (let tm of tabMenu){
            tm.classList.remove('active');
        }
        tm.classList.add('active');
    
        for(let tc of tabContent){
            tc.classList.remove('active');
        }

        //클릭하는 tabMenu의 <a href="#tabs-1">basic</a> 이런것들에서
        let target = tm.getAttribute('href'); 
        console.log(target) //href만 가져온다. #tabs-3, #tabs-1 이렇게.

        //클릭하는 것에만 active 클래스를 붙인다!
        document.querySelector(target).classList.add('active');

        console.log(e.target)
    });
}