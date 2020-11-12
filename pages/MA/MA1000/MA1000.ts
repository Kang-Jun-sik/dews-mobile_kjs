// import { DewsBizPage, Box, element } from '../../../../dist/js/dews-mobile.js';
//
// import _html from './MA1000.html';
// import _scss from './MA1000.scss';
//
// /**
//  * FD 에서 준비 될 최종 .ts
//  */
// // export 구문은 고정입니다.
// // Class Name 은 업무페이지
// export default class MA1000 extends DewsBizPage {
//   constructor() {
//     super();
//   }
//
//   // id 값으로 해당 요소 찾기
//   // onInit 에서는 적용x
//   @element('box')
//   Box: Box;
//
//   // 업무 개발자 작성 이벤트
//   async onInit() {}
//   async onReady() {
//     console.log(this.Box);
//   }
//   async onClosed() {}
//
//   // 업무 개발자 JS
//   //  -> import 된 html 파일에 호출이 있습니다
//   public movePage() {
//     console.log('MA1000');
//     // PC Main 과 동일하게 전역 객체에 데이터를 제공 할 예정입니다.
//     // 아래는 실제 동작하는 페이지 이동 함수입니다.
//     dews.app.main.loadPage('MA', 'MA1001');
//   }
//
//   // html, css 를 import 처리 하는 이유
//   //  - CustomElement 로 구성된 html 을 render 하기 위해선 html/css String 이 아닌 TemplateResult/CSSResult 로 데이터를 받아야 합니다.
//   //  - 따라서 import 시 rollup 구동 시 html/css string 을 html`` / css`` 로 변경해서 결과물을 출력 합니다.
//   //  - 변경된 결과물은 현재 프로젝트의 dist/pages/MA/**.js 에서 확인하실 수 있습니다.
//   // 필수: HTML 템플릿
//   htmlTemplate = _html.bind(this)();
//   // 필수: CSS 템플릿
//   static cssTemplate = _scss;
// }
