const searchElement = document.querySelector('.search');
const searchInputElement = searchElement.querySelector('input'); //Search의 Input요소를 document에서 찾는게 아니라 searchElement에서 찾도록 변경하였음

// Html Header Search Input란을 클릭할 때, 돋보기 아이콘 부분을 클릭하면 변화가 생기지 않는 문제를 해결하기 위한 클릭 이벤트 추가
searchElement.addEventListener('click', function() {
    searchInputElement.focus();
});

// Input란 focus시 통합검색 문자열이 추가되도록 기능하는 이벤트. (focused 클래스 추가됨)
searchInputElement.addEventListener('focus', function() {
    searchElement.classList.add('focused');
    searchInputElement.setAttribute('placeholder', '통합검색');
});
searchInputElement.addEventListener('blur', function() {
    searchElement.classList.remove('focused');
    searchInputElement.setAttribute('placeholder', '');
});

// 일정 스크롤을 내릴 시 우측 badge가 사라지는 효과
const badgeElement = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top')
window.addEventListener('scroll', _.throttle(function() { //lodash.js를 사용하여 throttle() 메소드를 사용, gsap.js를 사용하여 애니메이션 효과 추가
    if (window.scrollY > 500) {                 //window의 scrollY - Y좌표값 > Y좌표값이 500보다 커지면 배지를 숨기도록
        //gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeElement, .4, {
            opacity: 0,
            display: 'none'
        }); 
    } else {                                    //반대의 경우로 500보다 작아지면 숨겨진 배지가 다시 나타나도록
        gsap.to(badgeElement, .4, {
            opacity: 1,
            display: 'block'
        }); 
    }
}, 300));  // _.throttle(함수, 제한시간 - ms단위)
toTopEl.addEventListener('click', function () {
    // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
    gsap.to(window, .7, {
      scrollTo: 0
    })
  })

// fade-in 클래스 요소들에 서서히 나타나는 애니메이션을 적용하는 스크립트 (gsap 사용)
const fadeElements = document.querySelectorAll('.visual .fade-in');
fadeElements.forEach(function(fadeElement, index) {
    gsap.to(fadeElement, 1, {
        delay: (index+1) * .6, // n번째 요소마다 (최초 index는 0이여서 +1을 해서 1로 시작) 순차적으로 나타나도록 딜레이를 개별 적용
        opacity: 1
    });
});

// 공지사항 텍스트 슬라이드를 위한 swiper js
// new Swiper('css 선택자, 옵션')
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

// 프로모션 이미지 슬라이드를 위한 swiper js
new Swiper('.promotion .swiper-container', {
    direction: 'horizontal', //기본값이 horizontal이기 때문에 따로 명시하지않고 생략이 가능함
    slidesPerView: 3, // 한번에 보여줄 슬라이드의 갯수 (기본값 1)
    spaceBetween: 10, // 슬라이드 사이의 여백 (단위 px)
    centeredSlides: true, // 1번 슬라이드가 가운데 보이도록 하기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호요소 선택자
        clickable: true // 클릭이 가능한지의 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

// 프로모션 토글 버튼으로 슬라이드 영역 열고 닫는 기능
const promotionElement = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion;
    if (isHidePromotion) {
        promotionElement.classList.add('hide');
    } else {
        promotionElement.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

// 비디오 영역에 떠있는 이미지 애니메이션 기능 (gsap, easing 함수 사용)
function floatingObject(selector, delay, size) {
    gsap.to(selector, random(1.5, 2.5), { // 랜덤한 지속시간(1.5~2.5초)을 지정해주어 애니메이션이 한번 진행되는 속도를 각각의 요소마다 랜덤하게 지정
        y: size,
        repeat: -1, // repeat -1 : 무한반복 (gsap)
        yoyo: true, // 애니메이션이 재생되고나서 다시 되돌아가는 옵션
        ease: Power1.easeInOut, // easing 함수를 사용하여 애니메이션을 좀더 자연스럽게 (끝점으로 도달할수록 천천히 움직이도록 부드러운 이미지 효과 적용)
        delay: delay
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// 스크롤 애니메이션 추가
const spyElements = document.querySelectorAll('section.scroll-spy');
spyElements.forEach(function(spyElement) {
    new ScrollMagic
        .Scene({
            triggerElement : spyElement,
            triggerHook: .8
        })
        .setClassToggle(spyElement, 'show')
        .addTo(new ScrollMagic.Controller());
});

// 올해가 몇년도인지 계산해주기 (푸터 저작권 문장에 연도 표시하기 위함)
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()