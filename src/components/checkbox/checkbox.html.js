import { html } from 'lit-element';
export default function () {
    return html `<span class="${this._className}" @click="${this._clickHandler}" >
  <span class="checkbox-control"  >
    <input type="checkbox" ?disabled="${this.disabled}" ?checked="${this.checked}"  />
    <span  class="checkbox-shape"></span>
  </span>
  ${this.title == undefined ? '' : html `<label class="checkbox-label">${this.title}</label>`};
</span>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoZWNrYm94Lmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQSxnQkFBZ0IsSUFBSSxDQUFDLFVBQVUsYUFBYSxJQUFJLENBQUMsYUFBYTs7d0NBRXZFLElBQUksQ0FBQyxRQUFRLGVBQWUsSUFBSSxDQUFDLE9BQU87OztJQUc1RSxJQUFJLENBQUMsS0FBSyxJQUFFLFNBQVMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUEsaUNBQWlDLElBQUksQ0FBQyxLQUFLLFVBQVU7O0NBRXJGLENBQUM7QUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0aGlzOiBhbnkpIHsgcmV0dXJuIGh0bWxgPHNwYW4gY2xhc3M9XCIke3RoaXMuX2NsYXNzTmFtZX1cIiBAY2xpY2s9XCIke3RoaXMuX2NsaWNrSGFuZGxlcn1cIiA+XG4gIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtY29udHJvbFwiICA+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiID9kaXNhYmxlZD1cIiR7dGhpcy5kaXNhYmxlZH1cIiA/Y2hlY2tlZD1cIiR7dGhpcy5jaGVja2VkfVwiICAvPlxuICAgIDxzcGFuICBjbGFzcz1cImNoZWNrYm94LXNoYXBlXCI+PC9zcGFuPlxuICA8L3NwYW4+XG4gICR7dGhpcy50aXRsZT09dW5kZWZpbmVkPycnOmh0bWxgPGxhYmVsIGNsYXNzPVwiY2hlY2tib3gtbGFiZWxcIj4ke3RoaXMudGl0bGV9PC9sYWJlbD5gfTtcbjwvc3Bhbj5cbmA7IH0iXX0=