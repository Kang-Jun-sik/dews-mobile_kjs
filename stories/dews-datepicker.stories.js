import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'Datepicker'
};
export const Datepicker = () => html `<div style="width: 360px">
  <dews-area-panel>
    <area-item coll="8">
      <dews-tabs title="Tab">
        <dews-tab title="Tab1">
          <dews-form-container>
            <container-content>
              <form-section title="기본정보">
                <dews-datepicker required title="datepicker1"> </dews-datepicker>
                <dews-datepicker
                  required
                  spinner
                  value="20200801"
                  title="datepicker2"
                  @change="${(e) => {
    console.log(e);
    console.log('change');
}}"
                >
                </dews-datepicker>
                <dews-datepicker spinner title="datepicker3"> </dews-datepicker>
                <dews-datepicker required holidays-visiable holidays-disabled title="datepicker4"> </dews-datepicker>
              </form-section>
            </container-content>
          </dews-form-container>
        </dews-tab>
        <dews-tab title="Tab2">
          <dews-form-container>
            <container-content>
              <form-section title="추가정보">
                <dews-datepicker title="일선택"> </dews-datepicker>
              </form-section>
            </container-content>
          </dews-form-container>
        </dews-tab>
      </dews-tabs>
    </area-item>
    <area-item coll="4">
      <dews-box title="box2">
        <dews-form-container>
          <container-content>
            <form-section title="추가정보">
              <dews-datepicker title="picker"> </dews-datepicker>
            </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
  </dews-area-panel>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1kYXRlcGlja2VyLnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXdzLWRhdGVwaWNrZXIuc3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsZUFBZTtJQUNiLEtBQUssRUFBRSxZQUFZO0NBQ3BCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs2QkFjUCxDQUFDLENBQVEsRUFBRSxFQUFFO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0ICcuLi9zcmMvZGV3cy1tb2JpbGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnRGF0ZXBpY2tlcidcbn07XG5cbmV4cG9ydCBjb25zdCBEYXRlcGlja2VyID0gKCkgPT4gaHRtbGA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4XCI+XG4gIDxkZXdzLWFyZWEtcGFuZWw+XG4gICAgPGFyZWEtaXRlbSBjb2xsPVwiOFwiPlxuICAgICAgPGRld3MtdGFicyB0aXRsZT1cIlRhYlwiPlxuICAgICAgICA8ZGV3cy10YWIgdGl0bGU9XCJUYWIxXCI+XG4gICAgICAgICAgPGRld3MtZm9ybS1jb250YWluZXI+XG4gICAgICAgICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxmb3JtLXNlY3Rpb24gdGl0bGU9XCLquLDrs7jsoJXrs7RcIj5cbiAgICAgICAgICAgICAgICA8ZGV3cy1kYXRlcGlja2VyIHJlcXVpcmVkIHRpdGxlPVwiZGF0ZXBpY2tlcjFcIj4gPC9kZXdzLWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgPGRld3MtZGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHNwaW5uZXJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPVwiMjAyMDA4MDFcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJkYXRlcGlja2VyMlwiXG4gICAgICAgICAgICAgICAgICBAY2hhbmdlPVwiJHsoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9kZXdzLWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgPGRld3MtZGF0ZXBpY2tlciBzcGlubmVyIHRpdGxlPVwiZGF0ZXBpY2tlcjNcIj4gPC9kZXdzLWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgPGRld3MtZGF0ZXBpY2tlciByZXF1aXJlZCBob2xpZGF5cy12aXNpYWJsZSBob2xpZGF5cy1kaXNhYmxlZCB0aXRsZT1cImRhdGVwaWNrZXI0XCI+IDwvZGV3cy1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICA8L2Zvcm0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kZXdzLWZvcm0tY29udGFpbmVyPlxuICAgICAgICA8L2Rld3MtdGFiPlxuICAgICAgICA8ZGV3cy10YWIgdGl0bGU9XCJUYWIyXCI+XG4gICAgICAgICAgPGRld3MtZm9ybS1jb250YWluZXI+XG4gICAgICAgICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxmb3JtLXNlY3Rpb24gdGl0bGU9XCLstpTqsIDsoJXrs7RcIj5cbiAgICAgICAgICAgICAgICA8ZGV3cy1kYXRlcGlja2VyIHRpdGxlPVwi7J287ISg7YOdXCI+IDwvZGV3cy1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICA8L2Zvcm0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kZXdzLWZvcm0tY29udGFpbmVyPlxuICAgICAgICA8L2Rld3MtdGFiPlxuICAgICAgPC9kZXdzLXRhYnM+XG4gICAgPC9hcmVhLWl0ZW0+XG4gICAgPGFyZWEtaXRlbSBjb2xsPVwiNFwiPlxuICAgICAgPGRld3MtYm94IHRpdGxlPVwiYm94MlwiPlxuICAgICAgICA8ZGV3cy1mb3JtLWNvbnRhaW5lcj5cbiAgICAgICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgICA8Zm9ybS1zZWN0aW9uIHRpdGxlPVwi7LaU6rCA7KCV67O0XCI+XG4gICAgICAgICAgICAgIDxkZXdzLWRhdGVwaWNrZXIgdGl0bGU9XCJwaWNrZXJcIj4gPC9kZXdzLWRhdGVwaWNrZXI+XG4gICAgICAgICAgICA8L2Zvcm0tc2VjdGlvbj5cbiAgICAgICAgICA8L2NvbnRhaW5lci1jb250ZW50PlxuICAgICAgICA8L2Rld3MtZm9ybS1jb250YWluZXI+XG4gICAgICA8L2Rld3MtYm94PlxuICAgIDwvYXJlYS1pdGVtPlxuICA8L2Rld3MtYXJlYS1wYW5lbD5cbjwvZGl2PmA7XG4iXX0=