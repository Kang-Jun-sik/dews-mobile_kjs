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

.textbox-wrap label {
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .textbox-wrap label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.textbox-wrap input[type='text'] {
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
  .textbox-wrap input[type='text']:focus, .textbox-wrap input[type='text']:active {
    border: 1px solid #177aff;
    outline: none; }
  .textbox-wrap input[type='text']:disabled {
    color: rgba(60, 60, 67, 0.8);
    background-color: rgba(60, 60, 67, 0.02); }
    .textbox-wrap input[type='text']:disabled:active, .textbox-wrap input[type='text']:disabled:focus {
      border: 1px solid rgba(60, 60, 67, 0.08); }
  .textbox-wrap input[type='text']:read-only {
    background-color: rgba(60, 60, 67, 0.02); }
    .textbox-wrap input[type='text']:read-only:active, .textbox-wrap input[type='text']:read-only:focus {
      border: 1px solid rgba(60, 60, 67, 0.08); }
  .textbox-wrap input[type='text']::placeholder {
    color: rgba(60, 60, 67, 0.18); }
  .textbox-wrap input[type='text'][type='number'] {
    text-align: right;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none; }
    .textbox-wrap input[type='text'][type='number']::-webkit-inner-spin-button, .textbox-wrap input[type='text'][type='number']::-webkit-outer-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none; }

.textbox-wrap textarea {
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
  text-align: left;
  resize: none;
  height: 64px; }
  .textbox-wrap textarea:focus, .textbox-wrap textarea:active {
    border: 1px solid #177aff;
    outline: none; }
  .textbox-wrap textarea:disabled {
    color: rgba(60, 60, 67, 0.8);
    background-color: rgba(60, 60, 67, 0.02); }
    .textbox-wrap textarea:disabled:active, .textbox-wrap textarea:disabled:focus {
      border: 1px solid rgba(60, 60, 67, 0.08); }
  .textbox-wrap textarea:read-only {
    background-color: rgba(60, 60, 67, 0.02); }
    .textbox-wrap textarea:read-only:active, .textbox-wrap textarea:read-only:focus {
      border: 1px solid rgba(60, 60, 67, 0.08); }
  .textbox-wrap textarea::placeholder {
    color: rgba(60, 60, 67, 0.18); }
  .textbox-wrap textarea[type='number'] {
    text-align: right;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none; }
    .textbox-wrap textarea[type='number']::-webkit-inner-spin-button, .textbox-wrap textarea[type='number']::-webkit-outer-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5zY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGV4dGJveC5zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsZUFBZSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1R2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBjc3NgKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDsgfVxuICAqIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogMTVweDsgfVxuICAqIHVsLFxuICAqIGxpLFxuICAqIG9sIHtcbiAgICBsaXN0LXN0eWxlOiBub25lOyB9XG4gICogYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XG4gICogaW1nIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XG5cbi50ZXh0Ym94LXdyYXAgbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpOyB9XG4gIDpob3N0KFtyZXF1aXJlZF0pIC50ZXh0Ym94LXdyYXAgbGFiZWw6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcqJztcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgY29sb3I6ICNmYzRjNjA7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4OyB9XG5cbi50ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzNnB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgY29sb3I6ICMxMTExMTE7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS40NztcbiAgdGV4dC1hbGlnbjogbGVmdDsgfVxuICAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpmb2N1cywgLnRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106YWN0aXZlIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTc3YWZmO1xuICAgIG91dGxpbmU6IG5vbmU7IH1cbiAgLnRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106ZGlzYWJsZWQge1xuICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjAyKTsgfVxuICAgIC50ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddOmRpc2FibGVkOmFjdGl2ZSwgLnRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J106ZGlzYWJsZWQ6Zm9jdXMge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTsgfVxuICAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpyZWFkLW9ubHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wMik7IH1cbiAgICAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpyZWFkLW9ubHk6YWN0aXZlLCAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTpyZWFkLW9ubHk6Zm9jdXMge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTsgfVxuICAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXTo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpOyB9XG4gIC50ZXh0Ym94LXdyYXAgaW5wdXRbdHlwZT0ndGV4dCddW3R5cGU9J251bWJlciddIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbiAgICAudGV4dGJveC13cmFwIGlucHV0W3R5cGU9J3RleHQnXVt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwgLnRleHRib3gtd3JhcCBpbnB1dFt0eXBlPSd0ZXh0J11bdHlwZT0nbnVtYmVyJ106Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTsgfVxuXG4udGV4dGJveC13cmFwIHRleHRhcmVhIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzNnB4O1xuICBwYWRkaW5nOiA3cHggMTBweDtcbiAgY29sb3I6ICMxMTExMTE7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS40NztcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgcmVzaXplOiBub25lO1xuICBoZWlnaHQ6IDY0cHg7IH1cbiAgLnRleHRib3gtd3JhcCB0ZXh0YXJlYTpmb2N1cywgLnRleHRib3gtd3JhcCB0ZXh0YXJlYTphY3RpdmUge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICMxNzdhZmY7XG4gICAgb3V0bGluZTogbm9uZTsgfVxuICAudGV4dGJveC13cmFwIHRleHRhcmVhOmRpc2FibGVkIHtcbiAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjgpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wMik7IH1cbiAgICAudGV4dGJveC13cmFwIHRleHRhcmVhOmRpc2FibGVkOmFjdGl2ZSwgLnRleHRib3gtd3JhcCB0ZXh0YXJlYTpkaXNhYmxlZDpmb2N1cyB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpOyB9XG4gIC50ZXh0Ym94LXdyYXAgdGV4dGFyZWE6cmVhZC1vbmx5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gICAgLnRleHRib3gtd3JhcCB0ZXh0YXJlYTpyZWFkLW9ubHk6YWN0aXZlLCAudGV4dGJveC13cmFwIHRleHRhcmVhOnJlYWQtb25seTpmb2N1cyB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpOyB9XG4gIC50ZXh0Ym94LXdyYXAgdGV4dGFyZWE6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTsgfVxuICAudGV4dGJveC13cmFwIHRleHRhcmVhW3R5cGU9J251bWJlciddIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbiAgICAudGV4dGJveC13cmFwIHRleHRhcmVhW3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLCAudGV4dGJveC13cmFwIHRleHRhcmVhW3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbmA7Il19