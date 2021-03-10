export class TouchActive {
  /**
   * touchScroll 처리 함수
   * @param target 스크롤 기능부여할 Element
   * */
  TouchActive(target?: HTMLElement) {
    if (target) {
      target.addEventListener('touchstart', touchStart);
      target.addEventListener('touchend', touchEnd);
    }

    // 터치시작시 touch class 주입
    function touchStart(e: TouchEvent) {
      target!.classList.add('touch');
    }

    // 터치끝지점 기록 밑 애니메이션 호출
    function touchEnd(e: TouchEvent) {
      target!.classList.remove('touch');
    }
  }
}
