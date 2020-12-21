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

.undefined {
  opacity: 0; }

.numeric-textbox-wrap {
  /* numeric */ }
  .numeric-textbox-wrap label {
    display: block;
    width: 100%;
    margin-bottom: 2px;
    font-size: 12px;
    line-height: 1.5;
    text-align: left;
    color: rgba(60, 60, 67, 0.6); }
    :host([required]) .numeric-textbox-wrap label:after {
      content: '*';
      display: inline;
      color: #fc4c60;
      font-size: 12px;
      line-height: 18px; }
  .numeric-textbox-wrap input[type='text'],
  .numeric-textbox-wrap input[type='number'] {
    position: relative;
    width: 100%;
    height: 36px;
    padding: 7px 10px;
    color: #111111;
    border: 1px solid rgba(60, 60, 67, 0.08);
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 15px;
    line-height: 1.47;
    text-align: left; }
    .numeric-textbox-wrap input[type='text']:focus, .numeric-textbox-wrap input[type='text']:active,
    .numeric-textbox-wrap input[type='number']:focus,
    .numeric-textbox-wrap input[type='number']:active {
      border: 1px solid #177aff;
      outline: none; }
    .numeric-textbox-wrap input[type='text']:disabled,
    .numeric-textbox-wrap input[type='number']:disabled {
      color: rgba(60, 60, 67, 0.8);
      background-color: rgba(60, 60, 67, 0.02); }
      .numeric-textbox-wrap input[type='text']:disabled:active, .numeric-textbox-wrap input[type='text']:disabled:focus,
      .numeric-textbox-wrap input[type='number']:disabled:active,
      .numeric-textbox-wrap input[type='number']:disabled:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .numeric-textbox-wrap input[type='text']:read-only,
    .numeric-textbox-wrap input[type='number']:read-only {
      background-color: rgba(60, 60, 67, 0.02); }
      .numeric-textbox-wrap input[type='text']:read-only:active, .numeric-textbox-wrap input[type='text']:read-only:focus,
      .numeric-textbox-wrap input[type='number']:read-only:active,
      .numeric-textbox-wrap input[type='number']:read-only:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .numeric-textbox-wrap input[type='text']::placeholder,
    .numeric-textbox-wrap input[type='number']::placeholder {
      color: rgba(60, 60, 67, 0.18); }
    .numeric-textbox-wrap input[type='text'][type='number'],
    .numeric-textbox-wrap input[type='number'][type='number'] {
      text-align: right;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none; }
      .numeric-textbox-wrap input[type='text'][type='number']::-webkit-inner-spin-button, .numeric-textbox-wrap input[type='text'][type='number']::-webkit-outer-spin-button,
      .numeric-textbox-wrap input[type='number'][type='number']::-webkit-inner-spin-button,
      .numeric-textbox-wrap input[type='number'][type='number']::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none; }
  .numeric-textbox-wrap .numeric-textbox-wrap .numeric-wrap {
    display: flex;
    flex-wrap: nowrap; }
  .numeric-textbox-wrap .numeric-textbox-wrap .numeric {
    flex: 1 2 60px;
    min-width: 60px;
    text-align: right; }
    .numeric-textbox-wrap .numeric-textbox-wrap .numeric input {
      text-align: right; }
    .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view input:disabled {
      background-color: #ffffff; }
    .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.disabled input:disabled {
      color: rgba(60, 60, 67, 0.8);
      background-color: rgba(60, 60, 67, 0.02); }
      .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.disabled input:disabled:active, .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.disabled input:disabled:focus {
        border: 1px solid rgba(60, 60, 67, 0.07); }
    .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.readonly input:read-only {
      background-color: rgba(60, 60, 67, 0.02); }
      .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.readonly input:read-only:active, .numeric-textbox-wrap .numeric-textbox-wrap .numeric.view.readonly input:read-only:focus {
        border: 1px solid rgba(60, 60, 67, 0.07); }
  .numeric-textbox-wrap .numeric-textbox-wrap .stepper {
    display: block;
    overflow: hidden;
    padding-left: 8px;
    flex: 0 0 84px; }
  .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper {
    border: 0;
    border-radius: 0;
    background-color: transparent;
    outline: 0;
    position: relative;
    float: left;
    display: block;
    width: 36px;
    height: 36px;
    border: solid 1px #d5d5d5;
    border-radius: 4px;
    background-color: #ffffff; }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper span {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden; }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      background-size: 24px 24px;
      background-position: center center;
      background-repeat: no-repeat; }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper:active {
      border: 1px solid #177aff;
      background-color: rgba(23, 122, 255, 0.08); }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper:first-child {
      margin-right: 4px; }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper.minus:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC44KSIgZD0iTTE0IDB2MkgwVjB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDExKSIvPgo8L3N2Zz4K); }
    .numeric-textbox-wrap .numeric-textbox-wrap .button-stepper.plus:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC44KSIgZD0iTTEwNTI1IDE2MTM4di02aC02di0yaDZ2LTZoMnY2aDZ2MmgtNnY2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwNTE0IC0xNjExOSkiLz4KPC9zdmc+Cg==); }
  .numeric-textbox-wrap .numeric-textbox-wrap .prefix,
  .numeric-textbox-wrap .numeric-textbox-wrap .suffix {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    overflow: hidden;
    max-width: 65px;
    height: 36px;
    color: rgba(60, 60, 67, 0.8);
    font-size: 15px;
    text-align: right;
    line-height: 1.47;
    white-space: nowrap;
    text-overflow: ellipsis; }
  .numeric-textbox-wrap .numeric-textbox-wrap .prefix {
    margin-right: 4px; }
  .numeric-textbox-wrap .numeric-textbox-wrap .suffix {
    margin-left: 4px; }
  .numeric-textbox-wrap .numeric-textbox-wrap.disabled .button-stepper, .numeric-textbox-wrap .numeric-textbox-wrap.readonly .button-stepper {
    border: 1px solid rgba(60, 60, 67, 0.08);
    background-color: rgba(60, 60, 67, 0.02); }
    .numeric-textbox-wrap .numeric-textbox-wrap.disabled .button-stepper.minus:before, .numeric-textbox-wrap .numeric-textbox-wrap.readonly .button-stepper.minus:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC4xOCkiIGQ9Ik0xMDUzMyAxNjEzMHYyaC0xNHYtMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDUxNCAtMTYxMTkpIi8+Cjwvc3ZnPgo=); }
    .numeric-textbox-wrap .numeric-textbox-wrap.disabled .button-stepper.plus:before, .numeric-textbox-wrap .numeric-textbox-wrap.readonly .button-stepper.plus:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC4xOCkiIGQ9Ik0xMDUyNSAxNjEzOHYtNmgtNnYtMmg2di02aDJ2Nmg2djJoLTZ2NnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDUxNCAtMTYxMTkpIi8+Cjwvc3ZnPgo=); }
  .numeric-textbox-wrap .btn-tmp {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #d5d5d5;
    background-color: #ffffff; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY3RleHRib3guc2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm51bWVyaWN0ZXh0Ym94LnNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxlQUFlLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBaUxqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4udW5kZWZpbmVkIHtcbiAgb3BhY2l0eTogMDsgfVxuXG4ubnVtZXJpYy10ZXh0Ym94LXdyYXAge1xuICAvKiBudW1lcmljICovIH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIGxhYmVsIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpOyB9XG4gICAgOmhvc3QoW3JlcXVpcmVkXSkgLm51bWVyaWMtdGV4dGJveC13cmFwIGxhYmVsOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcqJztcbiAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgIGNvbG9yOiAjZmM0YzYwO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7IH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXSxcbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J251bWJlciddIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHBhZGRpbmc6IDdweCAxMHB4O1xuICAgIGNvbG9yOiAjMTExMTExO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ3O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzLCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddOmFjdGl2ZSxcbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0nbnVtYmVyJ106Zm9jdXMsXG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J251bWJlciddOmFjdGl2ZSB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTc3YWZmO1xuICAgICAgb3V0bGluZTogbm9uZTsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106ZGlzYWJsZWQsXG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J251bWJlciddOmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddOmRpc2FibGVkOmFjdGl2ZSwgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpkaXNhYmxlZDpmb2N1cyxcbiAgICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSdudW1iZXInXTpkaXNhYmxlZDphY3RpdmUsXG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0nbnVtYmVyJ106ZGlzYWJsZWQ6Zm9jdXMge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpOyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpyZWFkLW9ubHksXG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J251bWJlciddOnJlYWQtb25seSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddOnJlYWQtb25seTphY3RpdmUsIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106cmVhZC1vbmx5OmZvY3VzLFxuICAgICAgLm51bWVyaWMtdGV4dGJveC13cmFwIGlucHV0W3R5cGU9J251bWJlciddOnJlYWQtb25seTphY3RpdmUsXG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0nbnVtYmVyJ106cmVhZC1vbmx5OmZvY3VzIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106OnBsYWNlaG9sZGVyLFxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSdudW1iZXInXTo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4xOCk7IH1cbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddW3R5cGU9J251bWJlciddLFxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSdudW1iZXInXVt0eXBlPSdudW1iZXInXSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbiAgICAgIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J11bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sIC5udW1lcmljLXRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J11bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0nbnVtYmVyJ11bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0nbnVtYmVyJ11bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTsgfVxuICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXdyYXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiBub3dyYXA7IH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYyB7XG4gICAgZmxleDogMSAyIDYwcHg7XG4gICAgbWluLXdpZHRoOiA2MHB4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYyBpbnB1dCB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMudmlldyBpbnB1dDpkaXNhYmxlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy52aWV3LmRpc2FibGVkIGlucHV0OmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLnZpZXcuZGlzYWJsZWQgaW5wdXQ6ZGlzYWJsZWQ6YWN0aXZlLCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLnZpZXcuZGlzYWJsZWQgaW5wdXQ6ZGlzYWJsZWQ6Zm9jdXMge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDcpOyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy52aWV3LnJlYWRvbmx5IGlucHV0OnJlYWQtb25seSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gICAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLnZpZXcucmVhZG9ubHkgaW5wdXQ6cmVhZC1vbmx5OmFjdGl2ZSwgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy52aWV3LnJlYWRvbmx5IGlucHV0OnJlYWQtb25seTpmb2N1cyB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wNyk7IH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAuc3RlcHBlciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcbiAgICBmbGV4OiAwIDAgODRweDsgfVxuICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5idXR0b24tc3RlcHBlciB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgb3V0bGluZTogMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDM2cHg7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGJvcmRlcjogc29saWQgMXB4ICNkNWQ1ZDU7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5idXR0b24tc3RlcHBlciBzcGFuIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW46IC0xcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAuYnV0dG9uLXN0ZXBwZXI6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAzNnB4O1xuICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLmJ1dHRvbi1zdGVwcGVyOmFjdGl2ZSB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTc3YWZmO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMDgpOyB9XG4gICAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAuYnV0dG9uLXN0ZXBwZXI6Zmlyc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA0cHg7IH1cbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5idXR0b24tc3RlcHBlci5taW51czpiZWZvcmUge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5DSWdhR1ZwWjJoMFBTSXlOQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTBJREkwSWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzQ0S1NJZ1pEMGlUVEUwSURCMk1rZ3dWakI2SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZzFJREV4S1NJdlBnbzhMM04yWno0Syk7IH1cbiAgICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5idXR0b24tc3RlcHBlci5wbHVzOmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJbkpuWW1Fb05qQXNOakFzTmpjc01DNDRLU0lnWkQwaVRURXdOVEkxSURFMk1UTTRkaTAyYUMwMmRpMHlhRFoyTFRab01uWTJhRFoyTW1ndE5uWTJlaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xURXdOVEUwSUMweE5qRXhPU2tpTHo0S1BDOXpkbWMrQ2c9PSk7IH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcCAucHJlZml4LFxuICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5zdWZmaXgge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1heC13aWR0aDogNjVweDtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC44KTtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDc7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxuICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5wcmVmaXgge1xuICAgIG1hcmdpbi1yaWdodDogNHB4OyB9XG4gIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLnN1ZmZpeCB7XG4gICAgbWFyZ2luLWxlZnQ6IDRweDsgfVxuICAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwLmRpc2FibGVkIC5idXR0b24tc3RlcHBlciwgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcC5yZWFkb25seSAuYnV0dG9uLXN0ZXBwZXIge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjAyKTsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy10ZXh0Ym94LXdyYXAuZGlzYWJsZWQgLmJ1dHRvbi1zdGVwcGVyLm1pbnVzOmJlZm9yZSwgLm51bWVyaWMtdGV4dGJveC13cmFwIC5udW1lcmljLXRleHRib3gtd3JhcC5yZWFkb25seSAuYnV0dG9uLXN0ZXBwZXIubWludXM6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOQ0lnYUdWcFoyaDBQU0l5TkNJZ2RtbGxkMEp2ZUQwaU1DQXdJREkwSURJMElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUluSm5ZbUVvTmpBc05qQXNOamNzTUM0eE9Da2lJR1E5SWsweE1EVXpNeUF4TmpFek1IWXlhQzB4TkhZdE1ub2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0MweE1EVXhOQ0F0TVRZeE1Ua3BJaTgrQ2p3dmMzWm5QZ289KTsgfVxuICAgIC5udW1lcmljLXRleHRib3gtd3JhcCAubnVtZXJpYy10ZXh0Ym94LXdyYXAuZGlzYWJsZWQgLmJ1dHRvbi1zdGVwcGVyLnBsdXM6YmVmb3JlLCAubnVtZXJpYy10ZXh0Ym94LXdyYXAgLm51bWVyaWMtdGV4dGJveC13cmFwLnJlYWRvbmx5IC5idXR0b24tc3RlcHBlci5wbHVzOmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJbkpuWW1Fb05qQXNOakFzTmpjc01DNHhPQ2tpSUdROUlrMHhNRFV5TlNBeE5qRXpPSFl0Tm1ndE5uWXRNbWcyZGkwMmFESjJObWcyZGpKb0xUWjJObm9pSUhSeVlXNXpabTl5YlQwaWRISmhibk5zWVhSbEtDMHhNRFV4TkNBdE1UWXhNVGtwSWk4K0Nqd3ZjM1puUGdvPSk7IH1cbiAgLm51bWVyaWMtdGV4dGJveC13cmFwIC5idG4tdG1wIHtcbiAgICB3aWR0aDogMzZweDtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJvcmRlcjogc29saWQgMXB4ICNkNWQ1ZDU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgfVxuYDsiXX0=