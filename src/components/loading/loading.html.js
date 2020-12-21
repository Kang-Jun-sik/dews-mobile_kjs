import { html } from 'lit-element';
export default function () {
    return html `<!--
  : 전체 화면일 경우
  .dews-loading에 .page 추가
  : 부분 영역일 경우
  .dews-loading에 .field 추가
  loading-text
-->
<div class="${this._className}" @touchmove="${this._onTouchmove}" @wheel="${this._onWheel}">
  <div class="loading-img-wrap">
    <div class="loading-img">
      <div class="loading-circle-01"></div>
      <div class="loading-circle-02"></div>
    </div>
  </div>
  <p class="loading-text">${this.message}</p>
</div>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGluZy5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUE7Ozs7Ozs7Y0FPbkMsSUFBSSxDQUFDLFVBQVUsaUJBQWlCLElBQUksQ0FBQyxZQUFZLGFBQWEsSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7NEJBTzdELElBQUksQ0FBQyxPQUFPOztDQUV2QyxDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDwhLS1cbiAgOiDsoITssrQg7ZmU66m07J28IOqyveyasFxuICAuZGV3cy1sb2FkaW5n7JeQIC5wYWdlIOy2lOqwgFxuICA6IOu2gOu2hCDsmIHsl63snbwg6rK97JqwXG4gIC5kZXdzLWxvYWRpbmfsl5AgLmZpZWxkIOy2lOqwgFxuICBsb2FkaW5nLXRleHRcbi0tPlxuPGRpdiBjbGFzcz1cIiR7dGhpcy5fY2xhc3NOYW1lfVwiIEB0b3VjaG1vdmU9XCIke3RoaXMuX29uVG91Y2htb3ZlfVwiIEB3aGVlbD1cIiR7dGhpcy5fb25XaGVlbH1cIj5cbiAgPGRpdiBjbGFzcz1cImxvYWRpbmctaW1nLXdyYXBcIj5cbiAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy1pbWdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWNpcmNsZS0wMVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctY2lyY2xlLTAyXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8cCBjbGFzcz1cImxvYWRpbmctdGV4dFwiPiR7dGhpcy5tZXNzYWdlfTwvcD5cbjwvZGl2PlxuYDsgfSJdfQ==