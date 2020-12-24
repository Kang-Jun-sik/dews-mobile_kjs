import { css } from 'lit-element';
export default css `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0; }
  * html {
    font-size: 15px; }
  * ul,
  * li,
  * ol {
    list-style: none; }
  * a {
    text-decoration: none; }
  * img {
    vertical-align: middle; }

.dews-radio-group-wrap .radio-group-label {
  display: block;
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .dews-radio-group-wrap .radio-group-label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.dews-radio-group-wrap .radio-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 36px; }
  .dews-radio-group-wrap .radio-group .group-item {
    display: inline-block;
    margin-right: 10px;
    padding: 7px 0; }
  .dews-radio-group-wrap .radio-group.vertical {
    flex-wrap: wrap; }
    .dews-radio-group-wrap .radio-group.vertical .group-item {
      display: block;
      margin-right: 0;
      width: 100%; }
      .dews-radio-group-wrap .radio-group.vertical .group-item:last-of-type {
        margin-bottom: 0; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24tZ3JvdXAuc2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvYnV0dG9uLWdyb3VwLnNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxlQUFlLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0RqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4uZGV3cy1yYWRpby1ncm91cC13cmFwIC5yYWRpby1ncm91cC1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpOyB9XG4gIDpob3N0KFtyZXF1aXJlZF0pIC5kZXdzLXJhZGlvLWdyb3VwLXdyYXAgLnJhZGlvLWdyb3VwLWxhYmVsOmFmdGVyIHtcbiAgICBjb250ZW50OiAnKic7XG4gICAgZGlzcGxheTogaW5saW5lO1xuICAgIGNvbG9yOiAjZmM0YzYwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMThweDsgfVxuXG4uZGV3cy1yYWRpby1ncm91cC13cmFwIC5yYWRpby1ncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogMzZweDsgfVxuICAuZGV3cy1yYWRpby1ncm91cC13cmFwIC5yYWRpby1ncm91cCAuZ3JvdXAtaXRlbSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICBwYWRkaW5nOiA3cHggMDsgfVxuICAuZGV3cy1yYWRpby1ncm91cC13cmFwIC5yYWRpby1ncm91cC52ZXJ0aWNhbCB7XG4gICAgZmxleC13cmFwOiB3cmFwOyB9XG4gICAgLmRld3MtcmFkaW8tZ3JvdXAtd3JhcCAucmFkaW8tZ3JvdXAudmVydGljYWwgLmdyb3VwLWl0ZW0ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB3aWR0aDogMTAwJTsgfVxuICAgICAgLmRld3MtcmFkaW8tZ3JvdXAtd3JhcCAucmFkaW8tZ3JvdXAudmVydGljYWwgLmdyb3VwLWl0ZW06bGFzdC1vZi10eXBlIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxuYDsiXX0=