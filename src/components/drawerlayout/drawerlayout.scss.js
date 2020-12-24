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

.layer-drawer {
  /*
    position: fixed;
    z-index: 11000;
    width: 100vw;
    left: 0;
    bottom: 0;
    */ }
  .layer-drawer.moving {
    position: absolute;
    width: 100vw;
    height: 100vh; }
  .layer-drawer .overlay {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    display: none;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2); }
  .layer-drawer .layer {
    position: fixed; }
    .layer-drawer .layer-bottom {
      z-index: 11000;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 0;
      border: solid 1px rgba(60, 60, 67, 0.18);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #fcfcfc;
      box-shadow: 0px -1px 10px 0 rgba(0, 0, 0, 0.06); }
      .layer-drawer .layer-bottom .layer-moving-button {
        width: 100%; }
        .layer-drawer .layer-bottom .layer-moving-button .moving-button {
          display: block;
          box-sizing: content-box;
          width: 32px;
          height: 15px;
          margin: 0 auto;
          padding: 8px 20px 0;
          background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJib3R0b21fc2hlZXRfdG9wX2RlY28iIHdpZHRoPSIzMiIgaGVpZ2h0PSIxNS4wMDEiIHZpZXdCb3g9IjAgMCAzMiAxNS4wMDEiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTF7ZmlsbDpyZ2JhKDYwLDYwLDY3LC4zKX0KICAgICAgICA8L3N0eWxlPgogICAgPC9kZWZzPgogICAgPHJlY3QgaWQ9ImJvdHRvbV9zaGVldF90b3BfZGVjby0yIiB3aWR0aD0iMzIiIGhlaWdodD0iMSIgY2xhc3M9ImNscy0xIiByeD0iLjUiLz4KICAgIDxyZWN0IGlkPSJib3R0b21fc2hlZXRfdG9wX2RlY28tMyIgd2lkdGg9IjMyIiBoZWlnaHQ9IjEiIGNsYXNzPSJjbHMtMSIgcng9Ii41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDMpIi8+CiAgICA8cGF0aCBpZD0i7Yyo7IqkXzQ2NzIiIGQ9Ik01OTcuNDgyIDk4MC43MTJhLjQ3My40NzMgMCAwIDEtLjE3LS4wMzJsLTE1LjUxNS02YS41LjUgMCAwIDEtLjI4My0uNjQ0LjQ3OS40NzkgMCAwIDEgLjYyMy0uMjkybDE1LjM0NCA1LjkzNCAxNS4zNDUtNS45MzRhLjQ4MS40ODEgMCAwIDEgLjYyNC4yOTIuNS41IDAgMCAxLS4yODMuNjQ0bC0xNS41MTUgNmEuNDc1LjQ3NSAwIDAgMS0uMTcuMDMyeiIgY2xhc3M9ImNscy0xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTgxLjQ4MiAtOTY1LjcxMSkiLz4KPC9zdmc+Cg==) no-repeat;
          background-position: center bottom; }
        .layer-drawer .layer-bottom .layer-moving-button .fixed-button {
          display: block;
          box-sizing: content-box;
          width: 32px;
          height: 15px;
          margin: 0 auto;
          padding: 8px 20px 0;
          background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgMzIgNyI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuMykiIGQ9Ik01OTcuNDgyIDk4MC43MTJhLjQ3My40NzMgMCAwIDEtLjE3LS4wMzJsLTE1LjUxNS02YS41LjUgMCAwIDEtLjI4My0uNjQ0LjQ3OS40NzkgMCAwIDEgLjYyMy0uMjkybDE1LjM0NCA1LjkzNCAxNS4zNDUtNS45MzRhLjQ4MS40ODEgMCAwIDEgLjYyNC4yOTIuNS41IDAgMCAxLS4yODMuNjQ0bC0xNS41MTUgNmEuNDc1LjQ3NSAwIDAgMS0uMTcuMDMyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU4MS40ODIgLTk3My43MTIpIi8+Cjwvc3ZnPgo=) no-repeat;
          background-position: center bottom; }
    .layer-drawer .layer .layer-content {
      position: relative;
      height: 100%; }

@media (min-width: 768px) {
  .layer-drawer .layer-bottom {
    left: 50%;
    max-width: 768px;
    margin-left: calc(-768px / 2); } }

.layer-drawer .layer.layer-bottom {
  transition: height 1s ease-in-out 0s; }

:host([active]) .layer-drawer .layer.layer-bottom {
  height: calc(100vh - 134px);
  transition: height 1s ease-in-out 0s; }

:host([active]) .layer-drawer .layer.layer-bottom.little_moving {
  transition: inherit !important; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VybGF5b3V0LnNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcmF3ZXJsYXlvdXQuc2Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLGVBQWUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0ZqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4ubGF5ZXItZHJhd2VyIHtcbiAgLypcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTEwMDA7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGxlZnQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgICovIH1cbiAgLmxheWVyLWRyYXdlci5tb3Zpbmcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDsgfVxuICAubGF5ZXItZHJhd2VyIC5vdmVybGF5IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB3aWR0aDogMTAwdnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7IH1cbiAgLmxheWVyLWRyYXdlciAubGF5ZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDsgfVxuICAgIC5sYXllci1kcmF3ZXIgLmxheWVyLWJvdHRvbSB7XG4gICAgICB6LWluZGV4OiAxMTAwMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBoZWlnaHQ6IDA7XG4gICAgICBib3JkZXI6IHNvbGlkIDFweCByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpO1xuICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTVweDtcbiAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxNXB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcbiAgICAgIGJveC1zaGFkb3c6IDBweCAtMXB4IDEwcHggMCByZ2JhKDAsIDAsIDAsIDAuMDYpOyB9XG4gICAgICAubGF5ZXItZHJhd2VyIC5sYXllci1ib3R0b20gLmxheWVyLW1vdmluZy1idXR0b24ge1xuICAgICAgICB3aWR0aDogMTAwJTsgfVxuICAgICAgICAubGF5ZXItZHJhd2VyIC5sYXllci1ib3R0b20gLmxheWVyLW1vdmluZy1idXR0b24gLm1vdmluZy1idXR0b24ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICAgIGhlaWdodDogMTVweDtcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICBwYWRkaW5nOiA4cHggMjBweCAwO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJR2xrUFNKaWIzUjBiMjFmYzJobFpYUmZkRzl3WDJSbFkyOGlJSGRwWkhSb1BTSXpNaUlnYUdWcFoyaDBQU0l4TlM0d01ERWlJSFpwWlhkQ2IzZzlJakFnTUNBek1pQXhOUzR3TURFaVBnb2dJQ0FnUEdSbFpuTStDaUFnSUNBZ0lDQWdQSE4wZVd4bFBnb2dJQ0FnSUNBZ0lDQWdJQ0F1WTJ4ekxURjdabWxzYkRweVoySmhLRFl3TERZd0xEWTNMQzR6S1gwS0lDQWdJQ0FnSUNBOEwzTjBlV3hsUGdvZ0lDQWdQQzlrWldaelBnb2dJQ0FnUEhKbFkzUWdhV1E5SW1KdmRIUnZiVjl6YUdWbGRGOTBiM0JmWkdWamJ5MHlJaUIzYVdSMGFEMGlNeklpSUdobGFXZG9kRDBpTVNJZ1kyeGhjM005SW1Oc2N5MHhJaUJ5ZUQwaUxqVWlMejRLSUNBZ0lEeHlaV04wSUdsa1BTSmliM1IwYjIxZmMyaGxaWFJmZEc5d1gyUmxZMjh0TXlJZ2QybGtkR2c5SWpNeUlpQm9aV2xuYUhROUlqRWlJR05zWVhOelBTSmpiSE10TVNJZ2NuZzlJaTQxSWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3dJRE1wSWk4K0NpQWdJQ0E4Y0dGMGFDQnBaRDBpN1l5bzdJcWtYelEyTnpJaUlHUTlJazAxT1RjdU5EZ3lJRGs0TUM0M01USmhMalEzTXk0ME56TWdNQ0F3SURFdExqRTNMUzR3TXpKc0xURTFMalV4TlMwMllTNDFMalVnTUNBd0lERXRMakk0TXkwdU5qUTBMalEzT1M0ME56a2dNQ0F3SURFZ0xqWXlNeTB1TWpreWJERTFMak0wTkNBMUxqa3pOQ0F4TlM0ek5EVXROUzQ1TXpSaExqUTRNUzQwT0RFZ01DQXdJREVnTGpZeU5DNHlPVEl1TlM0MUlEQWdNQ0F4TFM0eU9ETXVOalEwYkMweE5TNDFNVFVnTm1FdU5EYzFMalEzTlNBd0lEQWdNUzB1TVRjdU1ETXllaUlnWTJ4aGMzTTlJbU5zY3kweElpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0TlRneExqUTRNaUF0T1RZMUxqY3hNU2tpTHo0S1BDOXpkbWMrQ2c9PSkgbm8tcmVwZWF0O1xuICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBib3R0b207IH1cbiAgICAgICAgLmxheWVyLWRyYXdlciAubGF5ZXItYm90dG9tIC5sYXllci1tb3ZpbmctYnV0dG9uIC5maXhlZC1idXR0b24ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICAgIGhlaWdodDogMTVweDtcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICBwYWRkaW5nOiA4cHggMjBweCAwO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXpNaUlnYUdWcFoyaDBQU0kzSWlCMmFXVjNRbTk0UFNJd0lEQWdNeklnTnlJK0NpQWdJQ0E4Y0dGMGFDQm1hV3hzUFNKeVoySmhLRFl3TERZd0xEWTNMREF1TXlraUlHUTlJazAxT1RjdU5EZ3lJRGs0TUM0M01USmhMalEzTXk0ME56TWdNQ0F3SURFdExqRTNMUzR3TXpKc0xURTFMalV4TlMwMllTNDFMalVnTUNBd0lERXRMakk0TXkwdU5qUTBMalEzT1M0ME56a2dNQ0F3SURFZ0xqWXlNeTB1TWpreWJERTFMak0wTkNBMUxqa3pOQ0F4TlM0ek5EVXROUzQ1TXpSaExqUTRNUzQwT0RFZ01DQXdJREVnTGpZeU5DNHlPVEl1TlM0MUlEQWdNQ0F4TFM0eU9ETXVOalEwYkMweE5TNDFNVFVnTm1FdU5EYzFMalEzTlNBd0lEQWdNUzB1TVRjdU1ETXllaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xUVTRNUzQwT0RJZ0xUazNNeTQzTVRJcElpOCtDand2YzNablBnbz0pIG5vLXJlcGVhdDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgYm90dG9tOyB9XG4gICAgLmxheWVyLWRyYXdlciAubGF5ZXIgLmxheWVyLWNvbnRlbnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgaGVpZ2h0OiAxMDAlOyB9XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAubGF5ZXItZHJhd2VyIC5sYXllci1ib3R0b20ge1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXgtd2lkdGg6IDc2OHB4O1xuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKC03NjhweCAvIDIpOyB9IH1cblxuLmxheWVyLWRyYXdlciAubGF5ZXIubGF5ZXItYm90dG9tIHtcbiAgdHJhbnNpdGlvbjogaGVpZ2h0IDFzIGVhc2UtaW4tb3V0IDBzOyB9XG5cbjpob3N0KFthY3RpdmVdKSAubGF5ZXItZHJhd2VyIC5sYXllci5sYXllci1ib3R0b20ge1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMzRweCk7XG4gIHRyYW5zaXRpb246IGhlaWdodCAxcyBlYXNlLWluLW91dCAwczsgfVxuXG46aG9zdChbYWN0aXZlXSkgLmxheWVyLWRyYXdlciAubGF5ZXIubGF5ZXItYm90dG9tLmxpdHRsZV9tb3Zpbmcge1xuICB0cmFuc2l0aW9uOiBpbmhlcml0ICFpbXBvcnRhbnQ7IH1cbmA7Il19