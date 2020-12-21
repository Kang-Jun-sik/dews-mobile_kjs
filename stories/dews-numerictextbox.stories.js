import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'NumbericTextbox'
};
export const NumericTextBox = () => html `
  <div style="width: 360px">
    <dews-numerictextbox format="#,##0.000">
      <numericbox-button step="500"></numericbox-button>
    </dews-numerictextbox>
    <dews-numerictextbox disabled title="title" prefix="$" suffix="백만원"> </dews-numerictextbox>
  </div>
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1udW1lcmljdGV4dGJveC5zdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV3cy1udW1lcmljdGV4dGJveC5zdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixlQUFlO0lBQ2IsS0FBSyxFQUFFLGlCQUFpQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7OztDQU92QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1odG1sJztcbmltcG9ydCAnLi4vc3JjL2Rld3MtbW9iaWxlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ051bWJlcmljVGV4dGJveCdcbn07XG5cbmV4cG9ydCBjb25zdCBOdW1lcmljVGV4dEJveCA9ICgpID0+IGh0bWxgXG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzYwcHhcIj5cbiAgICA8ZGV3cy1udW1lcmljdGV4dGJveCBmb3JtYXQ9XCIjLCMjMC4wMDBcIj5cbiAgICAgIDxudW1lcmljYm94LWJ1dHRvbiBzdGVwPVwiNTAwXCI+PC9udW1lcmljYm94LWJ1dHRvbj5cbiAgICA8L2Rld3MtbnVtZXJpY3RleHRib3g+XG4gICAgPGRld3MtbnVtZXJpY3RleHRib3ggZGlzYWJsZWQgdGl0bGU9XCJ0aXRsZVwiIHByZWZpeD1cIiRcIiBzdWZmaXg9XCLrsLHrp4zsm5BcIj4gPC9kZXdzLW51bWVyaWN0ZXh0Ym94PlxuICA8L2Rpdj5cbmA7XG4iXX0=