import { html } from 'lit-element';
export default function () {
    return html `<!-- .dews-box-wrap 에 active 추가 시 , border line 들어감-->
<div class="dews-box-wrap"  >
  <div class="dews-box-title"   @click='${this._onToggleClick}' ?collapsed="${this.collapsed}">
    <h2><button class="dews-box-title-button" type="button">${this.title}</button></h2>
  </div>
  <div class="dews-box-content-wrap" style="height: ${this.height}"  part="content" >
    <div class="dews-box-content">
     <slot @slotchange="${this.slotChange}" ></slot>
    </div>
  </div>
</div>



`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94Lmh0bWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3guaHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxPQUFPO0lBQXdCLE9BQU8sSUFBSSxDQUFBOzswQ0FFUCxJQUFJLENBQUMsY0FBYyxpQkFBaUIsSUFBSSxDQUFDLFNBQVM7OERBQzlCLElBQUksQ0FBQyxLQUFLOztzREFFbEIsSUFBSSxDQUFDLE1BQU07OzBCQUV2QyxJQUFJLENBQUMsVUFBVTs7Ozs7OztDQU94QyxDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDwhLS0gLmRld3MtYm94LXdyYXAg7JeQIGFjdGl2ZSDstpTqsIAg7IucICwgYm9yZGVyIGxpbmUg65Ok7Ja06rCQLS0+XG48ZGl2IGNsYXNzPVwiZGV3cy1ib3gtd3JhcFwiICA+XG4gIDxkaXYgY2xhc3M9XCJkZXdzLWJveC10aXRsZVwiICAgQGNsaWNrPScke3RoaXMuX29uVG9nZ2xlQ2xpY2t9JyA/Y29sbGFwc2VkPVwiJHt0aGlzLmNvbGxhcHNlZH1cIj5cbiAgICA8aDI+PGJ1dHRvbiBjbGFzcz1cImRld3MtYm94LXRpdGxlLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIj4ke3RoaXMudGl0bGV9PC9idXR0b24+PC9oMj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkZXdzLWJveC1jb250ZW50LXdyYXBcIiBzdHlsZT1cImhlaWdodDogJHt0aGlzLmhlaWdodH1cIiAgcGFydD1cImNvbnRlbnRcIiA+XG4gICAgPGRpdiBjbGFzcz1cImRld3MtYm94LWNvbnRlbnRcIj5cbiAgICAgPHNsb3QgQHNsb3RjaGFuZ2U9XCIke3RoaXMuc2xvdENoYW5nZX1cIiA+PC9zbG90PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cblxuYDsgfSJdfQ==