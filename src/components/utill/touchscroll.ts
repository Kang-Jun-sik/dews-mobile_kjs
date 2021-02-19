export class TouchScroll {
  constructor(target: HTMLElement) {
    this.TouchScroll(target);
  }
  /**
   * touchScroll 처리 함수
   * @param target 스크롤 기능부여할 Element
   * */
  TouchScroll(target: HTMLElement) {
    target.addEventListener('touchstart', touchStart);
    target.addEventListener('touchmove', touchMove);
    target.addEventListener('touchend', touchEnd);
    let startTime = 0;
    let endTime = 0;
    let startPoint = 0;
    let endPoint = 0;
    let moveTime = 0;
    let animationState = false;
    let scrollChangePoint = 0;
    let updownCheck = false;
    let speed = 5;

    // 터치시작시 시작지점 기록
    function touchStart(e: TouchEvent) {
      startTime = Date.now();
      startPoint = target.scrollTop;
      scrollChangePoint = e.changedTouches[0].screenY + target.scrollTop;
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
      if (Math.abs(startPoint - endPoint) > 30) {
        speed = (Math.abs(startPoint - endPoint) / moveTime) * 10;
        animation();
      } else {
        target.classList.remove('scroll');
      }
    }

    // 애니메이션 처리
    let count = 1;
    function animation() {
      if (animationState) {
        count++;
        if (count >= Math.abs(startPoint - endPoint) / 3) {
          animationState = false;
        }
        if (updownCheck) {
          target.scrollTo(0, target.scrollTop - speed);
        } else {
          target.scrollTo(0, target.scrollTop + speed);
        }
        if (count % 3 === 0 && speed < Math.abs(startPoint - endPoint)) {
          speed++;
        }
        window.webkitRequestAnimationFrame(animation);
      } else {
        count = 1;
        target.classList.remove('scroll');
      }
    }
  }
}
