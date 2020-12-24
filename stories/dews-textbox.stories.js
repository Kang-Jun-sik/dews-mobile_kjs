import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'TextBox'
};
export const TextBox = () => html `<div style="width: 360px">
  <dews-box title="box">
    <dews-search-container>
      <container-content>
        <dews-textbox></dews-textbox>
        <dews-textbox title="default"></dews-textbox>
        <dews-textbox title="disabled" disabled></dews-textbox>
        <dews-textbox title="readonly" readonly></dews-textbox>
        <dews-textbox title="disabled readonly" disabled readonly></dews-textbox>
        <dews-textbox title="placeholder" placeholder="placeholder"></dews-textbox>
      </container-content>
    </dews-search-container>
  </dews-box>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy10ZXh0Ym94LnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXdzLXRleHRib3guc3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsZUFBZTtJQUNiLEtBQUssRUFBRSxTQUFTO0NBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOzs7Ozs7Ozs7Ozs7O09BYTFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0ICcuLi9zcmMvZGV3cy1tb2JpbGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnVGV4dEJveCdcbn07XG5cbmV4cG9ydCBjb25zdCBUZXh0Qm94ID0gKCkgPT4gaHRtbGA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4XCI+XG4gIDxkZXdzLWJveCB0aXRsZT1cImJveFwiPlxuICAgIDxkZXdzLXNlYXJjaC1jb250YWluZXI+XG4gICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgIDxkZXdzLXRleHRib3g+PC9kZXdzLXRleHRib3g+XG4gICAgICAgIDxkZXdzLXRleHRib3ggdGl0bGU9XCJkZWZhdWx0XCI+PC9kZXdzLXRleHRib3g+XG4gICAgICAgIDxkZXdzLXRleHRib3ggdGl0bGU9XCJkaXNhYmxlZFwiIGRpc2FibGVkPjwvZGV3cy10ZXh0Ym94PlxuICAgICAgICA8ZGV3cy10ZXh0Ym94IHRpdGxlPVwicmVhZG9ubHlcIiByZWFkb25seT48L2Rld3MtdGV4dGJveD5cbiAgICAgICAgPGRld3MtdGV4dGJveCB0aXRsZT1cImRpc2FibGVkIHJlYWRvbmx5XCIgZGlzYWJsZWQgcmVhZG9ubHk+PC9kZXdzLXRleHRib3g+XG4gICAgICAgIDxkZXdzLXRleHRib3ggdGl0bGU9XCJwbGFjZWhvbGRlclwiIHBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIj48L2Rld3MtdGV4dGJveD5cbiAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgPC9kZXdzLXNlYXJjaC1jb250YWluZXI+XG4gIDwvZGV3cy1ib3g+XG48L2Rpdj5gO1xuIl19