import { html } from 'lit-element';
export default function () {
    return html `<div class="dropdown-list-wrap" @click="${this._clickHandler}">
  <label for="">${this.title}</label>
  <span class="select-wrap">
    <span class="select-shape">
      <span class="select-input">
          ${this.select[0]}
      </span>
      ${(this.select.length >= 2 && this.multi)
        ? html `
            <span class="select-multi">
                외 <strong>${this.select.length - 1}</strong>건
            </span>`
        : ''}
    </span>
    <span class="select-icon dropdown-icon"></span>
  </span>
</div>

${this.multi ? html `
<drawer-layout class="drawer-layout" @close="${this._close}" ?active="${this.active}" scrollEnabled>
  <div class="drawer-dropdown-multi">
    <div class="titlebar">
      <div class="title">${this.title}</div>
      <!-- <button class="confirm-button">ได้รับการยืนยัน</button> -->
      <button class="confirm-button" @click="${this._confirmClickHandler}">적용</button>
      ${this.$nextBtn}
    </div>
    <div class="control" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}">
      <ul class="list">
        <li  @click="${this._allChecked}">
          <span class="text">전체선택</span>
          <span class="checkbox" data-value="allCheck">
                  <dews-checkbox></dews-checkbox>
                </span>
        </li>
        ${this.$itemList}

        </li>
      </ul>
    </div>
  </div>
</drawer-layout>
` : html `
<drawer-layout class="drawer-layout" @close="${this._close}"  ?active="${this.active}" scrollEnabled>
  <div class="drawer-dropdown-single">
    <div class="titlebar">
      <div class="title">${this.title}</div>
    </div>
    <div class="control" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}">
      <ul class="list">
        ${this.$itemList}
      </ul>
    </div>
  </div>
</drawer-layout>
`}





`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25saXN0Lmh0bWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcm9wZG93bmxpc3QuaHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxPQUFPO0lBQXdCLE9BQU8sSUFBSSxDQUFBLDJDQUEyQyxJQUFJLENBQUMsYUFBYTtrQkFDNUYsSUFBSSxDQUFDLEtBQUs7Ozs7WUFJaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1FBRWxCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekMsQ0FBQyxDQUFBLElBQUksQ0FBQTs7NEJBRWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUM7b0JBQzVCO1FBQ2QsQ0FBQyxDQUFDLEVBQUU7Ozs7OztFQU1SLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQTsrQ0FDOEIsSUFBSSxDQUFDLE1BQU0sY0FBYyxJQUFJLENBQUMsTUFBTTs7OzJCQUd4RCxJQUFJLENBQUMsS0FBSzs7K0NBRVUsSUFBSSxDQUFDLG9CQUFvQjtRQUNoRSxJQUFJLENBQUMsUUFBUTs7d0NBRW1CLElBQUksQ0FBQyxXQUFXLGlCQUFpQixJQUFJLENBQUMsVUFBVTs7dUJBRWpFLElBQUksQ0FBQyxXQUFXOzs7Ozs7VUFNN0IsSUFBSSxDQUFDLFNBQVM7Ozs7Ozs7Q0FPdkIsQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFBOytDQUN3QyxJQUFJLENBQUMsTUFBTSxlQUFlLElBQUksQ0FBQyxNQUFNOzs7MkJBR3pELElBQUksQ0FBQyxLQUFLOzt3Q0FFRyxJQUFJLENBQUMsV0FBVyxpQkFBaUIsSUFBSSxDQUFDLFVBQVU7O1VBRTlFLElBQUksQ0FBQyxTQUFTOzs7OztDQUt0Qjs7Ozs7O0NBTUQsQ0FBQztBQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRoaXM6IGFueSkgeyByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdC13cmFwXCIgQGNsaWNrPVwiJHt0aGlzLl9jbGlja0hhbmRsZXJ9XCI+XG4gIDxsYWJlbCBmb3I9XCJcIj4ke3RoaXMudGl0bGV9PC9sYWJlbD5cbiAgPHNwYW4gY2xhc3M9XCJzZWxlY3Qtd3JhcFwiPlxuICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0LXNoYXBlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdC1pbnB1dFwiPlxuICAgICAgICAgICR7dGhpcy5zZWxlY3RbMF19XG4gICAgICA8L3NwYW4+XG4gICAgICAkeyh0aGlzLnNlbGVjdC5sZW5ndGggPj0gMiAmJiB0aGlzLm11bHRpKVxuICAgICAgP2h0bWxgXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdC1tdWx0aVwiPlxuICAgICAgICAgICAgICAgIOyZuCA8c3Ryb25nPiR7dGhpcy5zZWxlY3QubGVuZ3RoLTF9PC9zdHJvbmc+6rG0XG4gICAgICAgICAgICA8L3NwYW4+YFxuICAgICAgOiAnJ31cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QtaWNvbiBkcm9wZG93bi1pY29uXCI+PC9zcGFuPlxuICA8L3NwYW4+XG48L2Rpdj5cblxuJHt0aGlzLm11bHRpP2h0bWxgXG48ZHJhd2VyLWxheW91dCBjbGFzcz1cImRyYXdlci1sYXlvdXRcIiBAY2xvc2U9XCIke3RoaXMuX2Nsb3NlfVwiID9hY3RpdmU9XCIke3RoaXMuYWN0aXZlfVwiIHNjcm9sbEVuYWJsZWQ+XG4gIDxkaXYgY2xhc3M9XCJkcmF3ZXItZHJvcGRvd24tbXVsdGlcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGl0bGViYXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7dGhpcy50aXRsZX08L2Rpdj5cbiAgICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm0tYnV0dG9uXCI+4LmE4LiU4LmJ4Lij4Lix4Lia4LiB4Liy4Lij4Lii4Li34LiZ4Lii4Lix4LiZPC9idXR0b24+IC0tPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm0tYnV0dG9uXCIgQGNsaWNrPVwiJHt0aGlzLl9jb25maXJtQ2xpY2tIYW5kbGVyfVwiPuyggeyaqTwvYnV0dG9uPlxuICAgICAgJHt0aGlzLiRuZXh0QnRufVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCIgQHRvdWNoc3RhcnQ9XCIke3RoaXMuX3RvdWNoU3RhcnR9XCIgQHRvdWNobW92ZT1cIiR7dGhpcy5fdG91Y2hNb3ZlfVwiPlxuICAgICAgPHVsIGNsYXNzPVwibGlzdFwiPlxuICAgICAgICA8bGkgIEBjbGljaz1cIiR7dGhpcy5fYWxsQ2hlY2tlZH1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj7soITssrTshKDtg508L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja2JveFwiIGRhdGEtdmFsdWU9XCJhbGxDaGVja1wiPlxuICAgICAgICAgICAgICAgICAgPGRld3MtY2hlY2tib3g+PC9kZXdzLWNoZWNrYm94PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgICAgJHt0aGlzLiRpdGVtTGlzdH1cblxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2RyYXdlci1sYXlvdXQ+XG5gIDpodG1sYFxuPGRyYXdlci1sYXlvdXQgY2xhc3M9XCJkcmF3ZXItbGF5b3V0XCIgQGNsb3NlPVwiJHt0aGlzLl9jbG9zZX1cIiAgP2FjdGl2ZT1cIiR7dGhpcy5hY3RpdmV9XCIgc2Nyb2xsRW5hYmxlZD5cbiAgPGRpdiBjbGFzcz1cImRyYXdlci1kcm9wZG93bi1zaW5nbGVcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGl0bGViYXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPiR7dGhpcy50aXRsZX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiIEB0b3VjaHN0YXJ0PVwiJHt0aGlzLl90b3VjaFN0YXJ0fVwiIEB0b3VjaG1vdmU9XCIke3RoaXMuX3RvdWNoTW92ZX1cIj5cbiAgICAgIDx1bCBjbGFzcz1cImxpc3RcIj5cbiAgICAgICAgJHt0aGlzLiRpdGVtTGlzdH1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kcmF3ZXItbGF5b3V0PlxuYCB9XG5cblxuXG5cblxuYDsgfSJdfQ==