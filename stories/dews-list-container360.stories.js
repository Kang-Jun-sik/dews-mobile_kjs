import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'ListContainer'
};
export const ListContainer360 = () => html `<div style="width: 360px;display: inline-block">
  <dews-tabs>
    <dews-tab title="default">
      <dews-list-container title="title#12">
        <container-button>
          <dews-button title="Btn"></dews-button>
        </container-button>
        <container-summary>
          <span>요약 내용영역</span>
        </container-summary>
        <container-content>
          <dews-textbox title="title#1"></dews-textbox>
        </container-content>
      </dews-list-container>
    </dews-tab>
  </dews-tabs>
  <dews-box title="box">
    <dews-list-container title="title#12">
      <container-button>
        <dews-button slot="button" title="Btn"></dews-button>
      </container-button>
      <container-summary>
        <span>요약 내용영역</span>
      </container-summary>
      <container-content>
        <dews-textbox title="title#1"></dews-textbox>
      </container-content>
    </dews-list-container>
  </dews-box>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1saXN0LWNvbnRhaW5lcjM2MC5zdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV3cy1saXN0LWNvbnRhaW5lcjM2MC5zdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixlQUFlO0lBQ2IsS0FBSyxFQUFFLGVBQWU7Q0FDdkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qm5DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0ICcuLi9zcmMvZGV3cy1tb2JpbGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnTGlzdENvbnRhaW5lcidcbn07XG5cbmV4cG9ydCBjb25zdCBMaXN0Q29udGFpbmVyMzYwID0gKCkgPT4gaHRtbGA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4O2Rpc3BsYXk6IGlubGluZS1ibG9ja1wiPlxuICA8ZGV3cy10YWJzPlxuICAgIDxkZXdzLXRhYiB0aXRsZT1cImRlZmF1bHRcIj5cbiAgICAgIDxkZXdzLWxpc3QtY29udGFpbmVyIHRpdGxlPVwidGl0bGUjMTJcIj5cbiAgICAgICAgPGNvbnRhaW5lci1idXR0b24+XG4gICAgICAgICAgPGRld3MtYnV0dG9uIHRpdGxlPVwiQnRuXCI+PC9kZXdzLWJ1dHRvbj5cbiAgICAgICAgPC9jb250YWluZXItYnV0dG9uPlxuICAgICAgICA8Y29udGFpbmVyLXN1bW1hcnk+XG4gICAgICAgICAgPHNwYW4+7JqU7JW9IOuCtOyaqeyYgeyXrTwvc3Bhbj5cbiAgICAgICAgPC9jb250YWluZXItc3VtbWFyeT5cbiAgICAgICAgPGNvbnRhaW5lci1jb250ZW50PlxuICAgICAgICAgIDxkZXdzLXRleHRib3ggdGl0bGU9XCJ0aXRsZSMxXCI+PC9kZXdzLXRleHRib3g+XG4gICAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICA8L2Rld3MtbGlzdC1jb250YWluZXI+XG4gICAgPC9kZXdzLXRhYj5cbiAgPC9kZXdzLXRhYnM+XG4gIDxkZXdzLWJveCB0aXRsZT1cImJveFwiPlxuICAgIDxkZXdzLWxpc3QtY29udGFpbmVyIHRpdGxlPVwidGl0bGUjMTJcIj5cbiAgICAgIDxjb250YWluZXItYnV0dG9uPlxuICAgICAgICA8ZGV3cy1idXR0b24gc2xvdD1cImJ1dHRvblwiIHRpdGxlPVwiQnRuXCI+PC9kZXdzLWJ1dHRvbj5cbiAgICAgIDwvY29udGFpbmVyLWJ1dHRvbj5cbiAgICAgIDxjb250YWluZXItc3VtbWFyeT5cbiAgICAgICAgPHNwYW4+7JqU7JW9IOuCtOyaqeyYgeyXrTwvc3Bhbj5cbiAgICAgIDwvY29udGFpbmVyLXN1bW1hcnk+XG4gICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgIDxkZXdzLXRleHRib3ggdGl0bGU9XCJ0aXRsZSMxXCI+PC9kZXdzLXRleHRib3g+XG4gICAgICA8L2NvbnRhaW5lci1jb250ZW50PlxuICAgIDwvZGV3cy1saXN0LWNvbnRhaW5lcj5cbiAgPC9kZXdzLWJveD5cbjwvZGl2PmA7XG4iXX0=