import { html } from 'lit-element';
export default function () {
    return html `<div class="dews-msgbox" id="${this._id}" @touchmove="${this._onTouchmove}" @wheel="${this._onWheel}" style="height:100vh;">
  <div class="overlay"></div>

  <div class="msgbox-wrap">
    <!--
        msgbox-content 옆에 넣을 icon class
        default: 승인
        info: 정보
        error: 에러
        question: 질의
        warning: 경고
    -->
    <div class="${this._className}">
      <div class="pre-wrap">
          <pre style="text-align: ${this._align};">
            ${this.message}
          </pre>
      </div>


      <div class="msgbox-nomore" style="display: ${this._showCheckbox !== 'none' ? 'block' : 'none'}">
        <span class="dews-checkbox-wrap">
            <span class="checkbox-control">
                <input type="checkbox" id="noShowCheckBox">
                <span  class="checkbox-shape"></span>
            </span>
            <label for="noShowCheckBox" class="checkbox-label">${this._checkboxMessage}</label>
        </span>
      </div>
    </div>


    <div class="msgbox-button">
<!--      ${this.cancel === true ? html `<button class="solid cancel">취소</button>` : null}-->
      <button class="solid cancel" @click=${this._close} style="display: ${this._cancel === true ? 'block' : 'none'};">취소</button>
      <button class="solid" @click="${() => this._btnClick('no')}" style="display: ${this._messageboxType === 'confirm' ? 'block' : 'none'};">아니오</button>
      <button class="emphasize" @click="${() => this._btnClick('yes')}">${this._yesBtnMessage}</button>
    </div>
    <!-- <div class="msgbox-button">
        <button class="solid">아니오</button>
        <button class="emphasize">예</button>
    </div>
    <div class="msgbox-button">
        <button class="emphasize">확인</button>
    </div> -->
  </div>
</div>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZWJveC5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZWJveC5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUEsZ0NBQWdDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixJQUFJLENBQUMsWUFBWSxhQUFhLElBQUksQ0FBQyxRQUFROzs7Ozs7Ozs7Ozs7a0JBWW5JLElBQUksQ0FBQyxVQUFVOztvQ0FFRyxJQUFJLENBQUMsTUFBTTtjQUNqQyxJQUFJLENBQUMsT0FBTzs7Ozs7bURBS3lCLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07Ozs7OztpRUFNbEMsSUFBSSxDQUFDLGdCQUFnQjs7Ozs7OztZQU8xRSxJQUFJLENBQUMsTUFBTSxLQUFHLElBQUksQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFBLDBDQUEwQyxDQUFBLENBQUMsQ0FBQSxJQUFJOzRDQUN0QyxJQUFJLENBQUMsTUFBTSxvQkFBb0IsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtzQ0FDN0UsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU07MENBQzlGLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLGNBQWM7Ozs7Ozs7Ozs7O0NBVzFGLENBQUM7QUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0aGlzOiBhbnkpIHsgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImRld3MtbXNnYm94XCIgaWQ9XCIke3RoaXMuX2lkfVwiIEB0b3VjaG1vdmU9XCIke3RoaXMuX29uVG91Y2htb3ZlfVwiIEB3aGVlbD1cIiR7dGhpcy5fb25XaGVlbH1cIiBzdHlsZT1cImhlaWdodDoxMDB2aDtcIj5cbiAgPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj48L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwibXNnYm94LXdyYXBcIj5cbiAgICA8IS0tXG4gICAgICAgIG1zZ2JveC1jb250ZW50IOyYhuyXkCDrhKPsnYQgaWNvbiBjbGFzc1xuICAgICAgICBkZWZhdWx0OiDsirnsnbhcbiAgICAgICAgaW5mbzog7KCV67O0XG4gICAgICAgIGVycm9yOiDsl5Drn6xcbiAgICAgICAgcXVlc3Rpb246IOyniOydmFxuICAgICAgICB3YXJuaW5nOiDqsr3qs6BcbiAgICAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiJHt0aGlzLl9jbGFzc05hbWV9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJlLXdyYXBcIj5cbiAgICAgICAgICA8cHJlIHN0eWxlPVwidGV4dC1hbGlnbjogJHt0aGlzLl9hbGlnbn07XCI+XG4gICAgICAgICAgICAke3RoaXMubWVzc2FnZX1cbiAgICAgICAgICA8L3ByZT5cbiAgICAgIDwvZGl2PlxuXG5cbiAgICAgIDxkaXYgY2xhc3M9XCJtc2dib3gtbm9tb3JlXCIgc3R5bGU9XCJkaXNwbGF5OiAke3RoaXMuX3Nob3dDaGVja2JveCAhPT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJ31cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXdzLWNoZWNrYm94LXdyYXBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIm5vU2hvd0NoZWNrQm94XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gIGNsYXNzPVwiY2hlY2tib3gtc2hhcGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibm9TaG93Q2hlY2tCb3hcIiBjbGFzcz1cImNoZWNrYm94LWxhYmVsXCI+JHt0aGlzLl9jaGVja2JveE1lc3NhZ2V9PC9sYWJlbD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJtc2dib3gtYnV0dG9uXCI+XG48IS0tICAgICAgJHt0aGlzLmNhbmNlbD09PXRydWU/aHRtbGA8YnV0dG9uIGNsYXNzPVwic29saWQgY2FuY2VsXCI+7Leo7IaMPC9idXR0b24+YDpudWxsfS0tPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInNvbGlkIGNhbmNlbFwiIEBjbGljaz0ke3RoaXMuX2Nsb3NlfSBzdHlsZT1cImRpc3BsYXk6ICR7dGhpcy5fY2FuY2VsID09PSB0cnVlID8gJ2Jsb2NrJyA6ICdub25lJ307XCI+7Leo7IaMPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic29saWRcIiBAY2xpY2s9XCIkeygpPT50aGlzLl9idG5DbGljaygnbm8nKX1cIiBzdHlsZT1cImRpc3BsYXk6ICR7dGhpcy5fbWVzc2FnZWJveFR5cGUgPT09ICdjb25maXJtJyA/ICdibG9jaycgOiAnbm9uZSd9O1wiPuyVhOuLiOyYpDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImVtcGhhc2l6ZVwiIEBjbGljaz1cIiR7KCk9PnRoaXMuX2J0bkNsaWNrKCd5ZXMnKX1cIj4ke3RoaXMuX3llc0J0bk1lc3NhZ2V9PC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwibXNnYm94LWJ1dHRvblwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwic29saWRcIj7slYTri4jsmKQ8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVtcGhhc2l6ZVwiPuyYiDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtc2dib3gtYnV0dG9uXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJlbXBoYXNpemVcIj7tmZXsnbg8L2J1dHRvbj5cbiAgICA8L2Rpdj4gLS0+XG4gIDwvZGl2PlxuPC9kaXY+XG5gOyB9Il19