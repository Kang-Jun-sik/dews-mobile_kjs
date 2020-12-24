import { html } from 'lit-element';
export default function () {
    return html `${this.multi ? html `
<!-- textarea 일때 -->
<div class="textbox-wrap">
  <label for="multi-textbox">${this.title}</label>
  <textarea @input="${this._onChange}" class="dews-multi-input" id="multi-textbox" value="${this.value}" ?disabled="${this.disabled}" ?readonly="${this.readonly}" placeholder="${this.placeholder}"></textarea>

</div>
`
        : html `
<!-- input box 일때 -->
<div class="textbox-wrap">
  <label for="textbox">${this.title}</label>
  <input type="text" class="dews-input" @input="${this._onChange}" value="${this.value}" id="textbox"  ?disabled="${this.disabled}" ?readonly="${this.readonly}" placeholder="${this.placeholder}"/>
</div>
`}
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGV4dGJveC5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUE7OzsrQkFHckMsSUFBSSxDQUFDLEtBQUs7c0JBQ25CLElBQUksQ0FBQyxTQUFTLHdEQUF3RCxJQUFJLENBQUMsS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEsZ0JBQWdCLElBQUksQ0FBQyxRQUFRLGtCQUFrQixJQUFJLENBQUMsV0FBVzs7O0NBR2pNO1FBQ0QsQ0FBQyxDQUFBLElBQUksQ0FBQTs7O3lCQUdvQixJQUFJLENBQUMsS0FBSztrREFDZSxJQUFJLENBQUMsU0FBUyxZQUFZLElBQUksQ0FBQyxLQUFLLDhCQUE4QixJQUFJLENBQUMsUUFBUSxnQkFBZ0IsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLElBQUksQ0FBQyxXQUFXOztDQUdoTTtDQUNDLENBQUM7QUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0aGlzOiBhbnkpIHsgcmV0dXJuIGh0bWxgJHt0aGlzLm11bHRpPyBodG1sYFxuPCEtLSB0ZXh0YXJlYSDsnbzrlYwgLS0+XG48ZGl2IGNsYXNzPVwidGV4dGJveC13cmFwXCI+XG4gIDxsYWJlbCBmb3I9XCJtdWx0aS10ZXh0Ym94XCI+JHt0aGlzLnRpdGxlfTwvbGFiZWw+XG4gIDx0ZXh0YXJlYSBAaW5wdXQ9XCIke3RoaXMuX29uQ2hhbmdlfVwiIGNsYXNzPVwiZGV3cy1tdWx0aS1pbnB1dFwiIGlkPVwibXVsdGktdGV4dGJveFwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiID9kaXNhYmxlZD1cIiR7dGhpcy5kaXNhYmxlZH1cIiA/cmVhZG9ubHk9XCIke3RoaXMucmVhZG9ubHl9XCIgcGxhY2Vob2xkZXI9XCIke3RoaXMucGxhY2Vob2xkZXJ9XCI+PC90ZXh0YXJlYT5cblxuPC9kaXY+XG5gXG46aHRtbGBcbjwhLS0gaW5wdXQgYm94IOydvOuVjCAtLT5cbjxkaXYgY2xhc3M9XCJ0ZXh0Ym94LXdyYXBcIj5cbiAgPGxhYmVsIGZvcj1cInRleHRib3hcIj4ke3RoaXMudGl0bGV9PC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJkZXdzLWlucHV0XCIgQGlucHV0PVwiJHt0aGlzLl9vbkNoYW5nZX1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiBpZD1cInRleHRib3hcIiAgP2Rpc2FibGVkPVwiJHt0aGlzLmRpc2FibGVkfVwiID9yZWFkb25seT1cIiR7dGhpcy5yZWFkb25seX1cIiBwbGFjZWhvbGRlcj1cIiR7dGhpcy5wbGFjZWhvbGRlcn1cIi8+XG48L2Rpdj5cbmBcbn1cbmA7IH0iXX0=