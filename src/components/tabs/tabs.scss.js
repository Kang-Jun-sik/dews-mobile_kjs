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
  width: 100%; }

.dews-tabs-wrap {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  background-color: #ffffff; }
  .dews-tabs-wrap.active {
    --user-area-active-color: rgba(3, 102, 214, 0.3);
    border-bottom: 3px solid var(--user-area-active-color, rgba(3, 102, 214, 0.3)); }
  .dews-tabs-wrap .dews-tabs-title {
    position: relative;
    width: 100%;
    border-top: 3px solid var(--user-area-active-color, #ffffff);
    border-left: 3px solid var(--user-area-active-color, #ffffff);
    border-right: 3px solid var(--user-area-active-color, #ffffff); }
    .dews-tabs-wrap .dews-tabs-title .title-list {
      overflow-x: auto;
      font-size: 0;
      white-space: nowrap; }
      .dews-tabs-wrap .dews-tabs-title .title-list .title {
        position: relative;
        display: inline-block;
        width: auto;
        max-width: 220px;
        padding: 15px 20px 11px;
        color: rgba(60, 60, 67, 0.6);
        font-size: 16px;
        line-height: 24px;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        outline: 0; }
        .dews-tabs-wrap .dews-tabs-title .title-list .title span {
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          word-wrap: normal;
          text-overflow: ellipsis; }
        .dews-tabs-wrap .dews-tabs-title .title-list .title:last-of-type {
          margin-right: 64px; }
        .dews-tabs-wrap .dews-tabs-title .title-list .title.active {
          color: #111111;
          border-bottom: 2px solid #111111;
          font-weight: bold; }
    .dews-tabs-wrap .dews-tabs-title:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 64px;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) -16%, #ffffff 70%, #ffffff); }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5zY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFicy5zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsZUFBZSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUVqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5kZXdzLXRhYnMtd3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cbiAgLmRld3MtdGFicy13cmFwLmFjdGl2ZSB7XG4gICAgLS11c2VyLWFyZWEtYWN0aXZlLWNvbG9yOiByZ2JhKDMsIDEwMiwgMjE0LCAwLjMpO1xuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS11c2VyLWFyZWEtYWN0aXZlLWNvbG9yLCByZ2JhKDMsIDEwMiwgMjE0LCAwLjMpKTsgfVxuICAuZGV3cy10YWJzLXdyYXAgLmRld3MtdGFicy10aXRsZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS11c2VyLWFyZWEtYWN0aXZlLWNvbG9yLCAjZmZmZmZmKTtcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXVzZXItYXJlYS1hY3RpdmUtY29sb3IsICNmZmZmZmYpO1xuICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkIHZhcigtLXVzZXItYXJlYS1hY3RpdmUtY29sb3IsICNmZmZmZmYpOyB9XG4gICAgLmRld3MtdGFicy13cmFwIC5kZXdzLXRhYnMtdGl0bGUgLnRpdGxlLWxpc3Qge1xuICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbiAgICAgIC5kZXdzLXRhYnMtd3JhcCAuZGV3cy10YWJzLXRpdGxlIC50aXRsZS1saXN0IC50aXRsZSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgbWF4LXdpZHRoOiAyMjBweDtcbiAgICAgICAgcGFkZGluZzogMTVweCAyMHB4IDExcHg7XG4gICAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuNik7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIG91dGxpbmU6IDA7IH1cbiAgICAgICAgLmRld3MtdGFicy13cmFwIC5kZXdzLXRhYnMtdGl0bGUgLnRpdGxlLWxpc3QgLnRpdGxlIHNwYW4ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxuICAgICAgICAuZGV3cy10YWJzLXdyYXAgLmRld3MtdGFicy10aXRsZSAudGl0bGUtbGlzdCAudGl0bGU6bGFzdC1vZi10eXBlIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDY0cHg7IH1cbiAgICAgICAgLmRld3MtdGFicy13cmFwIC5kZXdzLXRhYnMtdGl0bGUgLnRpdGxlLWxpc3QgLnRpdGxlLmFjdGl2ZSB7XG4gICAgICAgICAgY29sb3I6ICMxMTExMTE7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMxMTExMTE7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiAgICAuZGV3cy10YWJzLXdyYXAgLmRld3MtdGFicy10aXRsZTphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogNjRweDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSAtMTYlLCAjZmZmZmZmIDcwJSwgI2ZmZmZmZik7IH1cbmA7Il19