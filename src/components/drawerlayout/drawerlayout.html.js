import { html } from 'lit-element';
export default function () {
    return html `<div class="layer-drawer" @touchmove="${this._touchMove}" @touchend="${this._touchEnd}">
  <!--  <div class="layer-drawer">-->
  <div class="overlay"></div>
  <div class="layer layer-bottom" style="height: ${this._height};">
    <div class="layer-moving-button">
      ${this.scrollEnabled ? html `<span class="moving-button" @touchstart="${this._touchStart}"></span>` : html `<span class="fixed-button" @touchstart="${this._touchStart}"></span>`}
    </div>
    <div class="layer-content">
      <slot></slot>
    </div>
  </div>
</div>





`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VybGF5b3V0Lmh0bWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXJsYXlvdXQuaHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxPQUFPO0lBQXdCLE9BQU8sSUFBSSxDQUFBLHlDQUF5QyxJQUFJLENBQUMsVUFBVSxnQkFBZ0IsSUFBSSxDQUFDLFNBQVM7OzttREFHcEYsSUFBSSxDQUFDLE9BQU87O1FBRXZELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQSw0Q0FBNEMsSUFBSSxDQUFDLFdBQVcsV0FBVyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUEsMkNBQTJDLElBQUksQ0FBQyxXQUFXLFdBQVc7Ozs7Ozs7Ozs7OztDQVlsTCxDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJsYXllci1kcmF3ZXJcIiBAdG91Y2htb3ZlPVwiJHt0aGlzLl90b3VjaE1vdmV9XCIgQHRvdWNoZW5kPVwiJHt0aGlzLl90b3VjaEVuZH1cIj5cbiAgPCEtLSAgPGRpdiBjbGFzcz1cImxheWVyLWRyYXdlclwiPi0tPlxuICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGF5ZXIgbGF5ZXItYm90dG9tXCIgc3R5bGU9XCJoZWlnaHQ6ICR7dGhpcy5faGVpZ2h0fTtcIj5cbiAgICA8ZGl2IGNsYXNzPVwibGF5ZXItbW92aW5nLWJ1dHRvblwiPlxuICAgICAgJHt0aGlzLnNjcm9sbEVuYWJsZWQgPyBodG1sYDxzcGFuIGNsYXNzPVwibW92aW5nLWJ1dHRvblwiIEB0b3VjaHN0YXJ0PVwiJHt0aGlzLl90b3VjaFN0YXJ0fVwiPjwvc3Bhbj5gOmh0bWxgPHNwYW4gY2xhc3M9XCJmaXhlZC1idXR0b25cIiBAdG91Y2hzdGFydD1cIiR7dGhpcy5fdG91Y2hTdGFydH1cIj48L3NwYW4+YH1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibGF5ZXItY29udGVudFwiPlxuICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cblxuXG5cbmA7IH0iXX0=