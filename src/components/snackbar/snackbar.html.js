import { html } from 'lit-element';
export default function () {
    return html `<!--
   snackbar state class
   승인 : success (default)
   경고 : warning
   에러 : error
   정보 : info
   로딩 : loading

  1. 시간설정 기본 2초로 되어있음.
  2. 시간 설정 변경 할 경우,
     .dews-snackbar의 animation-delay 스타일 변경
     ex. 5초로 변경하고 싶다.
     animation-delay: 0s, 5.3s;
  아이콘 비노출 시 , .snackbar-img 삭제 또는 display: none;
 -->
<div class="${this._className}">
  <div class="snackbar-img" style="display: ${this._showIcon ? 'block' : 'none'};"></div>
  <div class="snackbar-text">
    ${this.message}
  </div>
</div>


`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2tiYXIuaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNuYWNrYmFyLmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7O2NBZW5DLElBQUksQ0FBQyxVQUFVOzhDQUNpQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07O01BRXpFLElBQUksQ0FBQyxPQUFPOzs7OztDQUtqQixDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDwhLS1cbiAgIHNuYWNrYmFyIHN0YXRlIGNsYXNzXG4gICDsirnsnbggOiBzdWNjZXNzIChkZWZhdWx0KVxuICAg6rK96rOgIDogd2FybmluZ1xuICAg7JeQ65+sIDogZXJyb3JcbiAgIOygleuztCA6IGluZm9cbiAgIOuhnOuUqSA6IGxvYWRpbmdcblxuICAxLiDsi5zqsITshKTsoJUg6riw67O4IDLstIjroZwg65CY7Ja07J6I7J2MLlxuICAyLiDsi5zqsIQg7ISk7KCVIOuzgOqyvSDtlaAg6rK97JqwLFxuICAgICAuZGV3cy1zbmFja2JhcuydmCBhbmltYXRpb24tZGVsYXkg7Iqk7YOA7J28IOuzgOqyvVxuICAgICBleC4gNey0iOuhnCDrs4Dqsr3tlZjqs6Ag7Iu264ukLlxuICAgICBhbmltYXRpb24tZGVsYXk6IDBzLCA1LjNzO1xuICDslYTsnbTsvZgg67mE64W47LacIOyLnCAsIC5zbmFja2Jhci1pbWcg7IKt7KCcIOuYkOuKlCBkaXNwbGF5OiBub25lO1xuIC0tPlxuPGRpdiBjbGFzcz1cIiR7dGhpcy5fY2xhc3NOYW1lfVwiPlxuICA8ZGl2IGNsYXNzPVwic25hY2tiYXItaW1nXCIgc3R5bGU9XCJkaXNwbGF5OiAke3RoaXMuX3Nob3dJY29uID8gJ2Jsb2NrJyA6ICdub25lJ307XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzbmFja2Jhci10ZXh0XCI+XG4gICAgJHt0aGlzLm1lc3NhZ2V9XG4gIDwvZGl2PlxuPC9kaXY+XG5cblxuYDsgfSJdfQ==