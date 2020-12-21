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

:host {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
  min-height: 1px; }
  :host html {
    font-size: 15px; }
  :host ul,
  :host li,
  :host ol {
    list-style: none; }
  :host a {
    text-decoration: none; }
  :host img {
    vertical-align: middle; }

@media (min-width: 1024px) {
  :host {
    padding: 0 5px;
    flex: 1 0 100%;
    min-width: 320px; }
  :host(:first-of-type) {
    padding-left: 0; }
  :host(:last-of-type) {
    padding-right: 0; }
  :host([col='4']) {
    flex: 1 1 33.33333%; }
  :host([col='5']) {
    flex: 1 1 41.66667%; }
  :host([col='6']) {
    flex: 1 1 50%; }
  :host([col='7']) {
    flex: 1 1 58.33333%; }
  :host([col='8']) {
    flex: 1 1 66.66667%; } }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYWl0ZW0uc2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFyZWFpdGVtLnNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxlQUFlLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9EakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGNzc2AqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwOyB9XG4gICogaHRtbCB7XG4gICAgZm9udC1zaXplOiAxNXB4OyB9XG4gICogdWwsXG4gICogbGksXG4gICogb2wge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7IH1cbiAgKiBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cbiAgKiBpbWcge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cblxuOmhvc3Qge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1pbi1oZWlnaHQ6IDFweDsgfVxuICA6aG9zdCBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgOmhvc3QgdWwsXG4gIDpob3N0IGxpLFxuICA6aG9zdCBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICA6aG9zdCBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cbiAgOmhvc3QgaW1nIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxMDI0cHgpIHtcbiAgOmhvc3Qge1xuICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgIGZsZXg6IDEgMCAxMDAlO1xuICAgIG1pbi13aWR0aDogMzIwcHg7IH1cbiAgOmhvc3QoOmZpcnN0LW9mLXR5cGUpIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7IH1cbiAgOmhvc3QoOmxhc3Qtb2YtdHlwZSkge1xuICAgIHBhZGRpbmctcmlnaHQ6IDA7IH1cbiAgOmhvc3QoW2NvbD0nNCddKSB7XG4gICAgZmxleDogMSAxIDMzLjMzMzMzJTsgfVxuICA6aG9zdChbY29sPSc1J10pIHtcbiAgICBmbGV4OiAxIDEgNDEuNjY2NjclOyB9XG4gIDpob3N0KFtjb2w9JzYnXSkge1xuICAgIGZsZXg6IDEgMSA1MCU7IH1cbiAgOmhvc3QoW2NvbD0nNyddKSB7XG4gICAgZmxleDogMSAxIDU4LjMzMzMzJTsgfVxuICA6aG9zdChbY29sPSc4J10pIHtcbiAgICBmbGV4OiAxIDEgNjYuNjY2NjclOyB9IH1cbmA7Il19