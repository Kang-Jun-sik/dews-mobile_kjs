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
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 0; }

.dews-radio-wrap {
  position: relative;
  display: inline-flex;
  font-size: 0; }
  .dews-radio-wrap .radio-control {
    display: inline-flex;
    align-items: center; }
    .dews-radio-wrap .radio-control input[type='radio'] {
      position: absolute;
      top: 0;
      left: 0;
      display: inline;
      visibility: hidden;
      overflow: hidden;
      width: 0;
      margin: 0;
      opacity: 0; }
      .dews-radio-wrap .radio-control input[type='radio'] + .radio-shape {
        position: relative;
        margin: 0;
        padding: 0;
        font-size: 0;
        vertical-align: middle;
        line-height: inherit; }
        .dews-radio-wrap .radio-control input[type='radio'] + .radio-shape:before {
          content: '';
          display: block;
          box-sizing: border-box;
          width: 18px;
          height: 18px;
          border: solid 1px #c1c1c3;
          border-radius: 9px;
          background-color: #ffffff; }
      .dews-radio-wrap .radio-control input[type='radio']:disabled + .radio-shape:before {
        background-color: rgba(60, 60, 67, 0.05);
        border-color: rgba(193, 193, 195, 0.5); }
      .dews-radio-wrap .radio-control input[type='radio']:checked + .radio-shape:after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        display: block;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 10px;
        background-color: #177aff; }
      .dews-radio-wrap .radio-control input[type='radio']:checked:disabled + .radio-shape:after {
        background-color: rgba(23, 122, 255, 0.3); }
  .dews-radio-wrap .radio-label {
    margin-left: 6px;
    font-size: 15px;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: left;
    vertical-align: middle;
    color: #111111; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uc2Nzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvYnV0dG9uLnNjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsQyxlQUFlLEdBQUcsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBOEVqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBmb250LXNpemU6IDA7IH1cblxuLmRld3MtcmFkaW8td3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZvbnQtc2l6ZTogMDsgfVxuICAuZGV3cy1yYWRpby13cmFwIC5yYWRpby1jb250cm9sIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gICAgLmRld3MtcmFkaW8td3JhcCAucmFkaW8tY29udHJvbCBpbnB1dFt0eXBlPSdyYWRpbyddIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgd2lkdGg6IDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBvcGFjaXR5OiAwOyB9XG4gICAgICAuZGV3cy1yYWRpby13cmFwIC5yYWRpby1jb250cm9sIGlucHV0W3R5cGU9J3JhZGlvJ10gKyAucmFkaW8tc2hhcGUge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgZm9udC1zaXplOiAwO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDsgfVxuICAgICAgICAuZGV3cy1yYWRpby13cmFwIC5yYWRpby1jb250cm9sIGlucHV0W3R5cGU9J3JhZGlvJ10gKyAucmFkaW8tc2hhcGU6YmVmb3JlIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgICAgIGhlaWdodDogMThweDtcbiAgICAgICAgICBib3JkZXI6IHNvbGlkIDFweCAjYzFjMWMzO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAuZGV3cy1yYWRpby13cmFwIC5yYWRpby1jb250cm9sIGlucHV0W3R5cGU9J3JhZGlvJ106ZGlzYWJsZWQgKyAucmFkaW8tc2hhcGU6YmVmb3JlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjA1KTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDE5MywgMTkzLCAxOTUsIDAuNSk7IH1cbiAgICAgIC5kZXdzLXJhZGlvLXdyYXAgLnJhZGlvLWNvbnRyb2wgaW5wdXRbdHlwZT0ncmFkaW8nXTpjaGVja2VkICsgLnJhZGlvLXNoYXBlOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAzcHg7XG4gICAgICAgIGxlZnQ6IDNweDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMnB4O1xuICAgICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxNzdhZmY7IH1cbiAgICAgIC5kZXdzLXJhZGlvLXdyYXAgLnJhZGlvLWNvbnRyb2wgaW5wdXRbdHlwZT0ncmFkaW8nXTpjaGVja2VkOmRpc2FibGVkICsgLnJhZGlvLXNoYXBlOmFmdGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMyk7IH1cbiAgLmRld3MtcmFkaW8td3JhcCAucmFkaW8tbGFiZWwge1xuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ3O1xuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIGNvbG9yOiAjMTExMTExOyB9XG5gOyJdfQ==