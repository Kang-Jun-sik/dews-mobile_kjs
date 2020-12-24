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

.dews-box-wrap {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  background-color: #ffffff; }
  .dews-box-wrap.active {
    --user-area-active-color: rgba(3, 102, 214, 0.3);
    border-bottom: 3px solid var(--user-area-active-color, rgba(3, 102, 214, 0.3)); }
  .dews-box-wrap .dews-box-title {
    position: relative;
    width: 100%;
    border-top: 3px solid var(--user-area-active-color, #ffffff);
    border-left: 3px solid var(--user-area-active-color, #ffffff);
    border-right: 3px solid var(--user-area-active-color, #ffffff); }
    .dews-box-wrap .dews-box-title h2 {
      width: 100%; }
    .dews-box-wrap .dews-box-title .dews-box-title-button {
      display: block;
      width: 100%;
      padding: 14px 57px 14px 17px;
      color: #111111;
      font-size: 16px;
      font-weight: bold;
      line-height: 24px;
      text-align: left;
      cursor: pointer;
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis; }
      .dews-box-wrap .dews-box-title .dews-box-title-button:after {
        content: '';
        position: absolute;
        top: 14px;
        right: 17px;
        display: block;
        width: 24px;
        height: 24px;
        background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19jaGV2cm9uX2Rvd25fZm91X21sIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8ZGVmcz4KICAgICAgICA8Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aCI+CiAgICAgICAgICAgIDxwYXRoIGlkPSJJY29uLUNoZXZyb24tRG93biIgZmlsbD0iIzRjNGI1ZSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTYgNmExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw1LjI5MyA1LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTYtNkExIDEgMCAwIDAgNyAwIi8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgICAgICA8c3R5bGU+CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJpY19jaGV2cm9uX2Rvd25fZm91X21sLTIiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA3IDgpIj4KICAgICAgICA8ZyBpZD0iSWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUpIj4KICAgICAgICAgICAgPHBhdGggaWQ9Ikljb24tQ2hldnJvbi1Eb3duLTIiIGZpbGw9InJnYmEoNjAsNjAsNjcsMC42KSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTUgNWExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw0LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTUtNUExIDEgMCAwIDAgNyAwIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K) no-repeat center;
        background-size: 24px 24px; }
  .dews-box-wrap .dews-box-content-wrap {
    position: relative; }
    .dews-box-wrap .dews-box-content-wrap .dews-box-content {
      height: auto; }

.dews-box-wrap .dews-box-title .dews-box-title-button:after {
  transform: rotate(180deg);
  transition: transform 0.3s;
  transition-timing-function: ease-in-out; }

.dews-box-wrap .dews-box-title[collapsed] .dews-box-title-button:after {
  transform: rotate(0deg);
  transition: transform 0.3s;
  transition-timing-function: ease-in-out; }

:host([collapsed]) [part='content'] {
  transition: height 0.5s;
  transition-timing-function: ease-in-out; }

[part='content'] {
  overflow: hidden;
  height: 0;
  transition: height 0.5s;
  transition-timing-function: ease-in-out; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LnNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib3guc2Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLGVBQWUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNGakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGNzc2AqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwOyB9XG4gICogaHRtbCB7XG4gICAgZm9udC1zaXplOiAxNXB4OyB9XG4gICogdWwsXG4gICogbGksXG4gICogb2wge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7IH1cbiAgKiBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cbiAgKiBpbWcge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTsgfVxuXG4uZGV3cy1ib3gtd3JhcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IH1cbiAgLmRld3MtYm94LXdyYXAuYWN0aXZlIHtcbiAgICAtLXVzZXItYXJlYS1hY3RpdmUtY29sb3I6IHJnYmEoMywgMTAyLCAyMTQsIDAuMyk7XG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHZhcigtLXVzZXItYXJlYS1hY3RpdmUtY29sb3IsIHJnYmEoMywgMTAyLCAyMTQsIDAuMykpOyB9XG4gIC5kZXdzLWJveC13cmFwIC5kZXdzLWJveC10aXRsZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS11c2VyLWFyZWEtYWN0aXZlLWNvbG9yLCAjZmZmZmZmKTtcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXVzZXItYXJlYS1hY3RpdmUtY29sb3IsICNmZmZmZmYpO1xuICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkIHZhcigtLXVzZXItYXJlYS1hY3RpdmUtY29sb3IsICNmZmZmZmYpOyB9XG4gICAgLmRld3MtYm94LXdyYXAgLmRld3MtYm94LXRpdGxlIGgyIHtcbiAgICAgIHdpZHRoOiAxMDAlOyB9XG4gICAgLmRld3MtYm94LXdyYXAgLmRld3MtYm94LXRpdGxlIC5kZXdzLWJveC10aXRsZS1idXR0b24ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDE0cHggNTdweCAxNHB4IDE3cHg7XG4gICAgICBjb2xvcjogIzExMTExMTtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxuICAgICAgLmRld3MtYm94LXdyYXAgLmRld3MtYm94LXRpdGxlIC5kZXdzLWJveC10aXRsZS1idXR0b246YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDE0cHg7XG4gICAgICAgIHJpZ2h0OiAxN3B4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlHbGtQU0pwWTE5amFHVjJjbTl1WDJSdmQyNWZabTkxWDIxc0lpQjNhV1IwYUQwaU1qUWlJR2hsYVdkb2REMGlNalFpSUhacFpYZENiM2c5SWpBZ01DQXlOQ0F5TkNJK0NpQWdJQ0E4WkdWbWN6NEtJQ0FnSUNBZ0lDQThZMnhwY0ZCaGRHZ2dhV1E5SW1Oc2FYQXRjR0YwYUNJK0NpQWdJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pKWTI5dUxVTm9aWFp5YjI0dFJHOTNiaUlnWm1sc2JEMGlJelJqTkdJMVpTSWdaRDBpVFRjZ01HRXhJREVnTUNBd0lEQXRMamN3Tnk0eU9UTnNMVFlnTm1FeElERWdNQ0F3SURBZ01TNDBNVFFnTVM0ME1UUk1OeUF5TGpReE5HdzFMakk1TXlBMUxqSTVNMkV4SURFZ01DQXdJREFnTVM0ME1UUXRNUzQwTVRSc0xUWXROa0V4SURFZ01DQXdJREFnTnlBd0lpOCtDaUFnSUNBZ0lDQWdQQzlqYkdsd1VHRjBhRDRLSUNBZ0lDQWdJQ0E4YzNSNWJHVStDaUFnSUNBZ0lDQWdQQzl6ZEhsc1pUNEtJQ0FnSUR3dlpHVm1jejRLSUNBZ0lEeG5JR2xrUFNKcFkxOWphR1YyY205dVgyUnZkMjVmWm05MVgyMXNMVElpSUhSeVlXNXpabTl5YlQwaWNtOTBZWFJsS0RFNE1DQTNJRGdwSWo0S0lDQWdJQ0FnSUNBOFp5QnBaRDBpU1dOdmJpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTFRVcElqNEtJQ0FnSUNBZ0lDQWdJQ0FnUEhCaGRHZ2dhV1E5SWtsamIyNHRRMmhsZG5KdmJpMUViM2R1TFRJaUlHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzQyS1NJZ1pEMGlUVGNnTUdFeElERWdNQ0F3SURBdExqY3dOeTR5T1ROc0xUVWdOV0V4SURFZ01DQXdJREFnTVM0ME1UUWdNUzQwTVRSTU55QXlMalF4Tkd3MExqSTVNeUEwTGpJNU0yRXhJREVnTUNBd0lEQWdNUzQwTVRRdE1TNDBNVFJzTFRVdE5VRXhJREVnTUNBd0lEQWdOeUF3SWk4K0NpQWdJQ0FnSUNBZ1BDOW5QZ29nSUNBZ1BDOW5QZ284TDNOMlp6NEspIG5vLXJlcGVhdCBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyB9XG4gIC5kZXdzLWJveC13cmFwIC5kZXdzLWJveC1jb250ZW50LXdyYXAge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgIC5kZXdzLWJveC13cmFwIC5kZXdzLWJveC1jb250ZW50LXdyYXAgLmRld3MtYm94LWNvbnRlbnQge1xuICAgICAgaGVpZ2h0OiBhdXRvOyB9XG5cbi5kZXdzLWJveC13cmFwIC5kZXdzLWJveC10aXRsZSAuZGV3cy1ib3gtdGl0bGUtYnV0dG9uOmFmdGVyIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3M7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsgfVxuXG4uZGV3cy1ib3gtd3JhcCAuZGV3cy1ib3gtdGl0bGVbY29sbGFwc2VkXSAuZGV3cy1ib3gtdGl0bGUtYnV0dG9uOmFmdGVyIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7IH1cblxuOmhvc3QoW2NvbGxhcHNlZF0pIFtwYXJ0PSdjb250ZW50J10ge1xuICB0cmFuc2l0aW9uOiBoZWlnaHQgMC41cztcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0OyB9XG5cbltwYXJ0PSdjb250ZW50J10ge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBoZWlnaHQ6IDA7XG4gIHRyYW5zaXRpb246IGhlaWdodCAwLjVzO1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7IH1cbmA7Il19