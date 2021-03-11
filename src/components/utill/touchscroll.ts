export class TouchScroll {
  constructor(target: HTMLElement) {
    this.TouchScroll(target);
  }

  /**
   * touchScroll 처리 함수
   * @param target 스크롤 기능부여할 Element
   * */
  TouchScroll(target: HTMLElement) {
    target.addEventListener('touchstart', touchStart, { capture: false, once: false, passive: true });
    target.addEventListener('touchmove', touchMove, { capture: false, once: false, passive: true });
    target.addEventListener('touchend', touchEnd, { capture: false, once: false, passive: true });
    let startTime = 0;
    let endTime = 0;
    let startPoint = 0;
    let endPoint = 0;
    let moveTime = 0;
    let animationState = false;
    let scrollChangePoint = 0;
    let updownCheck = false;
    let speed = 5;
    let maxCount = 60;
    let _speed = 0;
    let count = 1;
    let beforeScroll = 0;

    // 터치시작시 시작지점 기록
    function touchStart(e: TouchEvent) {
      startTime = Date.now();
      startPoint = target.scrollTop;
      scrollChangePoint = e.changedTouches[0].screenY + target.scrollTop;
      animationState = false;
      target.classList.add('scroll');
    }

    // 터치이동 모션 처리
    function touchMove(e: any) {
      e.passive = true;
      e.capture = true;
      if (startTime < Date.now() - 100) {
        startTime = Date.now();
        startPoint = target.scrollTop;
      }
      target.scrollTo(0, scrollChangePoint - e.changedTouches[0].screenY);
    }

    // 터치끝지점 기록 밑 애니메이션 호출
    function touchEnd(e: TouchEvent) {
      endTime = Date.now();
      endPoint = target.scrollTop;
      moveTime = endTime - startTime;
      animationState = true;
      if (startPoint > endPoint) {
        updownCheck = true;
      } else {
        updownCheck = false;
      }
      speed = (Math.abs(startPoint - endPoint) / moveTime) * 100;
      _speed = speed / (Math.abs(startPoint - endPoint) + speed);
      maxCount = Math.abs(startPoint - endPoint) + speed;
      animation();
    }
    // 애니메이션 처리()
    function animation() {
      if (animationState) {
        count++;
        let scrollTo = 0;
        if (updownCheck) {
          scrollTo = target.scrollTop - speed / 10;
        } else {
          scrollTo = target.scrollTop + speed / 10;
        }
        if ((speed <= _speed && count >= maxCount) || speed === 0 || beforeScroll === scrollTo) {
          animationState = false;
          return;
        }
        beforeScroll = scrollTo;
        target.scrollTo(0, scrollTo);

        if (speed >= 0) {
          speed -= _speed;
        }
        window.requestAnimationFrame(animation);
      } else {
        count = 1;
        target.classList.remove('scroll');
      }
    }
  }
}
