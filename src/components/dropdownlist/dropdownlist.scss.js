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

.dropdown-list-wrap label {
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .dropdown-list-wrap label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.dropdown-list-wrap .select-wrap {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 6px 10px;
  color: #111111;
  border: 1px solid rgba(60, 60, 67, 0.08);
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 15px;
  line-height: 1.47; }
  .dropdown-list-wrap .select-wrap .select-shape {
    display: inline-flex;
    flex: 1 1 auto;
    max-width: calc(100% - 28px); }
    .dropdown-list-wrap .select-wrap .select-shape .select-input {
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis; }
    .dropdown-list-wrap .select-wrap .select-shape .select-multi {
      display: inline-block;
      flex: 0 0 auto;
      margin-left: 5px; }
      .dropdown-list-wrap .select-wrap .select-shape .select-multi strong {
        font-weight: normal; }
  .dropdown-list-wrap .select-wrap .select-icon {
    display: block;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    margin-left: 10px;
    background-size: 18px 18px;
    background-repeat: no-repeat; }
  .dropdown-list-wrap .select-wrap.focus {
    border-color: #177aff; }
  .dropdown-list-wrap .select-wrap.readonly, .dropdown-list-wrap .select-wrap.disabled {
    border-color: rgba(60, 60, 67, 0.08);
    background-color: rgba(60, 60, 67, 0.02); }
  .dropdown-list-wrap .select-wrap.disabled {
    color: rgba(60, 60, 67, 0.6); }

.dropdown-list-wrap .select-wrap .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiM5Nzk5YTgiIGQ9Ik0xNzYuNTQyIDUwNi41YS45LjkgMCAwIDEtLjc0Ny0uNDA1bC00LjA5MS02LjExNWEuOTczLjk3MyAwIDAgMS0uMDU3LS45NzQuOTA3LjkwNyAwIDAgMSAuODA2LS41MDVoOC4xODJhLjkwNi45MDYgMCAwIDEgLjgwNS41MDUuOTcxLjk3MSAwIDAgMS0uMDU5Ljk3NGwtNC4wOTEgNi4xMTVhLjkuOSAwIDAgMS0uNzQ4LjQwNXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjcuNTQzIC00OTMuNTA0KSIvPgo8L3N2Zz4K); }

.dropdown-list-wrap .select-wrap.focus .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0xNzYuNTQyIDUwNi41YS45LjkgMCAwIDEtLjc0Ny0uNDA1bC00LjA5MS02LjExNWEuOTczLjk3MyAwIDAgMS0uMDU3LS45NzQuOTA3LjkwNyAwIDAgMSAuODA2LS41MDVoOC4xODJhLjkwNi45MDYgMCAwIDEgLjgwNS41MDUuOTcxLjk3MSAwIDAgMS0uMDU5Ljk3NGwtNC4wOTEgNi4xMTVhLjkuOSAwIDAgMS0uNzQ4LjQwNXoiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA5Mi43NzEgMjU1Ljc1MikiLz4KPC9zdmc+Cg==); }

.dropdown-list-wrap .select-wrap.readonly .select-icon,
.dropdown-list-wrap .select-wrap.disabled .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC4xOCkiIGQ9Ik0xNzYuNTQyIDUwNi41YS45LjkgMCAwIDEtLjc0Ny0uNDA1bC00LjA5MS02LjExNWEuOTczLjk3MyAwIDAgMS0uMDU3LS45NzQuOTA3LjkwNyAwIDAgMSAuODA2LS41MDVoOC4xODJhLjkwNi45MDYgMCAwIDEgLjgwNS41MDUuOTcxLjk3MSAwIDAgMS0uMDU5Ljk3NGwtNC4wOTEgNi4xMTVhLjkuOSAwIDAgMS0uNzQ4LjQwNXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjcuNTQzIC00OTMuNTA0KSIvPgo8L3N2Zz4K); }

.drawer-dropdown-single, .drawer-dropdown-multi {
  height: 100%; }
  .drawer-dropdown-single .titlebar, .drawer-dropdown-multi .titlebar {
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    padding: 18px 20px; }
    .drawer-dropdown-single .titlebar .title, .drawer-dropdown-multi .titlebar .title {
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
      flex: 1 1 auto;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5; }
    .drawer-dropdown-single .titlebar .confirm-button, .drawer-dropdown-multi .titlebar .confirm-button {
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
      flex: 0 0 auto;
      height: 20px;
      margin-left: 10px;
      color: #177aff;
      font-size: 14px;
      text-align: right;
      line-height: 20px; }
      .drawer-dropdown-single .titlebar .confirm-button:active, .drawer-dropdown-multi .titlebar .confirm-button:active {
        color: rgba(23, 122, 255, 0.5); }
    .drawer-dropdown-single .titlebar .next-icon-button, .drawer-dropdown-multi .titlebar .next-icon-button {
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
      display: block;
      flex: 0 0 24px;
      width: 24px;
      height: 24px;
      margin-left: 20px;
      border: 1px solid rgba(60, 60, 67, 0.18);
      border-radius: 4px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnLz4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC44KSIgZD0iTTk1NjUuMzg5IDcxMzMuNjgzdi0xMWEuNS41IDAgMCAxIDEgMHYxMWEuNS41IDAgMCAxLTEgMHptLTcuNjQ2LS4yYS41LjUgMCAwIDEgMC0uNzA4bDQuMS00LjFoLTkuOTQ5YS41LjUgMCAwIDEgMC0xaDEwbC00LjE0Ni00LjE0NmEuNS41IDAgMCAxIC43MDgtLjcwNmw0Ljk1MSA0Ljk0OGEuNS41IDAgMCAxIC4xNDUuMzg2LjUuNSAwIDAgMS0uMTQ3LjM3M2wtNC45NSA0Ljk1MWEuNDk0LjQ5NCAwIDAgMS0uMzUzLjE0Ni41LjUgMCAwIDEtLjM2LS4xNDF6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTU1MC4zOTEgLTcxMTkuMTgyKSIvPgo8L3N2Zz4K);
      background-repeat: no-repeat;
      background-size: 18px 18px;
      background-position: center; }
      .drawer-dropdown-single .titlebar .next-icon-button span, .drawer-dropdown-multi .titlebar .next-icon-button span {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden; }
  .drawer-dropdown-single .control, .drawer-dropdown-multi .control {
    position: relative;
    height: calc(100% - 60px - 23px);
    overflow-y: auto; }
    .drawer-dropdown-single .control .list li, .drawer-dropdown-multi .control .list li {
      width: 100%;
      padding: 15px 20px;
      color: #111111;
      font-size: 15px;
      line-height: 1.47; }
      .drawer-dropdown-single .control .list li:active, .drawer-dropdown-multi .control .list li:active {
        background-color: rgba(60, 60, 67, 0.04); }

.drawer-dropdown-single .control .list li span {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center; }

.drawer-dropdown-single .control .list li.check span:after {
  content: '';
  display: block;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  margin-left: 10px;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiMxNzdhZmYiIGQ9Ik00IDguNjY3YS42NjUuNjY1IDAgMCAxLS40NzEtLjJMLjIgNS4xMzhhLjY2Ny42NjcgMCAwIDEgLjkzOC0uOTM4TDQgNy4wNTggMTAuODYyLjJhLjY2Ny42NjcgMCAwIDEgLjk0My45NDNMNC40NzIgOC40NzJhLjY2NS42NjUgMCAwIDEtLjQ3MS4yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzIDQpIi8+Cjwvc3ZnPgo=) no-repeat; }

.drawer-dropdown-multi .control .list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap; }
  .drawer-dropdown-multi .control .list li span {
    display: block;
    position: relative; }
    .drawer-dropdown-multi .control .list li span.text {
      flex: 0 1 calc(100% - 18px); }
    .drawer-dropdown-multi .control .list li span.checkbox {
      flex: 0 0 18px;
      margin-left: 10px; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25saXN0LnNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcm9wZG93bmxpc3Quc2Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLGVBQWUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWdMakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGNzc2AqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwOyB9XG4gICogaHRtbCB7XG4gICAgZm9udC1zaXplOiAxNXB4OyB9XG4gICogdWwsXG4gICogbGksXG4gICogb2wge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7IH1cbiAgKiBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cbiAgKiBpbWcge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cblxuLmRyb3Bkb3duLWxpc3Qtd3JhcCBsYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuNik7IH1cbiAgOmhvc3QoW3JlcXVpcmVkXSkgLmRyb3Bkb3duLWxpc3Qtd3JhcCBsYWJlbDphZnRlciB7XG4gICAgY29udGVudDogJyonO1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICBjb2xvcjogI2ZjNGM2MDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7IH1cblxuLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGNvbG9yOiAjMTExMTExO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNDc7IH1cbiAgLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAgLnNlbGVjdC1zaGFwZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAyOHB4KTsgfVxuICAgIC5kcm9wZG93bi1saXN0LXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3Qtc2hhcGUgLnNlbGVjdC1pbnB1dCB7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHdvcmQtd3JhcDogbm9ybWFsO1xuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cbiAgICAuZHJvcGRvd24tbGlzdC13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LXNoYXBlIC5zZWxlY3QtbXVsdGkge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICBtYXJnaW4tbGVmdDogNXB4OyB9XG4gICAgICAuZHJvcGRvd24tbGlzdC13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LXNoYXBlIC5zZWxlY3QtbXVsdGkgc3Ryb25nIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxuICAuZHJvcGRvd24tbGlzdC13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LWljb24ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZsZXg6IDAgMCAxOHB4O1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE4cHggMThweDtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OyB9XG4gIC5kcm9wZG93bi1saXN0LXdyYXAgLnNlbGVjdC13cmFwLmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMxNzdhZmY7IH1cbiAgLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAucmVhZG9ubHksIC5kcm9wZG93bi1saXN0LXdyYXAgLnNlbGVjdC13cmFwLmRpc2FibGVkIHtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjAyKTsgfVxuICAuZHJvcGRvd24tbGlzdC13cmFwIC5zZWxlY3Qtd3JhcC5kaXNhYmxlZCB7XG4gICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC42KTsgfVxuXG4uZHJvcGRvd24tbGlzdC13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LWljb24ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4T0NJZ2FHVnBaMmgwUFNJeE9DSWdkbWxsZDBKdmVEMGlNQ0F3SURFNElERTRJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU01TnprNVlUZ2lJR1E5SWsweE56WXVOVFF5SURVd05pNDFZUzQ1TGprZ01DQXdJREV0TGpjME55MHVOREExYkMwMExqQTVNUzAyTGpFeE5XRXVPVGN6TGprM015QXdJREFnTVMwdU1EVTNMUzQ1TnpRdU9UQTNMamt3TnlBd0lEQWdNU0F1T0RBMkxTNDFNRFZvT0M0eE9ESmhMamt3Tmk0NU1EWWdNQ0F3SURFZ0xqZ3dOUzQxTURVdU9UY3hMamszTVNBd0lEQWdNUzB1TURVNUxqazNOR3d0TkM0d09URWdOaTR4TVRWaExqa3VPU0F3SURBZ01TMHVOelE0TGpRd05Yb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0MweE5qY3VOVFF6SUMwME9UTXVOVEEwS1NJdlBnbzhMM04yWno0Syk7IH1cblxuLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAuZm9jdXMgLnNlbGVjdC1pY29uIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SWlNek16TWlJR1E5SWsweE56WXVOVFF5SURVd05pNDFZUzQ1TGprZ01DQXdJREV0TGpjME55MHVOREExYkMwMExqQTVNUzAyTGpFeE5XRXVPVGN6TGprM015QXdJREFnTVMwdU1EVTNMUzQ1TnpRdU9UQTNMamt3TnlBd0lEQWdNU0F1T0RBMkxTNDFNRFZvT0M0eE9ESmhMamt3Tmk0NU1EWWdNQ0F3SURFZ0xqZ3dOUzQxTURVdU9UY3hMamszTVNBd0lEQWdNUzB1TURVNUxqazNOR3d0TkM0d09URWdOaTR4TVRWaExqa3VPU0F3SURBZ01TMHVOelE0TGpRd05Yb2lJSFJ5WVc1elptOXliVDBpY205MFlYUmxLREU0TUNBNU1pNDNOekVnTWpVMUxqYzFNaWtpTHo0S1BDOXpkbWMrQ2c9PSk7IH1cblxuLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAucmVhZG9ubHkgLnNlbGVjdC1pY29uLFxuLmRyb3Bkb3duLWxpc3Qtd3JhcCAuc2VsZWN0LXdyYXAuZGlzYWJsZWQgLnNlbGVjdC1pY29uIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzR4T0NraUlHUTlJazB4TnpZdU5UUXlJRFV3Tmk0MVlTNDVMamtnTUNBd0lERXRMamMwTnkwdU5EQTFiQzAwTGpBNU1TMDJMakV4TldFdU9UY3pMamszTXlBd0lEQWdNUzB1TURVM0xTNDVOelF1T1RBM0xqa3dOeUF3SURBZ01TQXVPREEyTFM0MU1EVm9PQzR4T0RKaExqa3dOaTQ1TURZZ01DQXdJREVnTGpnd05TNDFNRFV1T1RjeExqazNNU0F3SURBZ01TMHVNRFU1TGprM05Hd3ROQzR3T1RFZ05pNHhNVFZoTGprdU9TQXdJREFnTVMwdU56UTRMalF3TlhvaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLQzB4TmpjdU5UUXpJQzAwT1RNdU5UQTBLU0l2UGdvOEwzTjJaejRLKTsgfVxuXG4uZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSB7XG4gIGhlaWdodDogMTAwJTsgfVxuICAuZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAudGl0bGViYXIsIC5kcmF3ZXItZHJvcGRvd24tbXVsdGkgLnRpdGxlYmFyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogbm93cmFwO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMThweCAyMHB4OyB9XG4gICAgLmRyYXdlci1kcm9wZG93bi1zaW5nbGUgLnRpdGxlYmFyIC50aXRsZSwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAudGl0bGViYXIgLnRpdGxlIHtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41OyB9XG4gICAgLmRyYXdlci1kcm9wZG93bi1zaW5nbGUgLnRpdGxlYmFyIC5jb25maXJtLWJ1dHRvbiwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAudGl0bGViYXIgLmNvbmZpcm0tYnV0dG9uIHtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgICAgY29sb3I6ICMxNzdhZmY7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4OyB9XG4gICAgICAuZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAudGl0bGViYXIgLmNvbmZpcm0tYnV0dG9uOmFjdGl2ZSwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAudGl0bGViYXIgLmNvbmZpcm0tYnV0dG9uOmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC41KTsgfVxuICAgIC5kcmF3ZXItZHJvcGRvd24tc2luZ2xlIC50aXRsZWJhciAubmV4dC1pY29uLWJ1dHRvbiwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAudGl0bGViYXIgLm5leHQtaWNvbi1idXR0b24ge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgZmxleDogMCAwIDI0cHg7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQ0lnYUdWcFoyaDBQU0l4T0NJZ2RtbGxkMEp2ZUQwaU1DQXdJREU0SURFNElqNEtJQ0FnSUR4bkx6NEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUluSm5ZbUVvTmpBc05qQXNOamNzTUM0NEtTSWdaRDBpVFRrMU5qVXVNemc1SURjeE16TXVOamd6ZGkweE1XRXVOUzQxSURBZ01DQXhJREVnTUhZeE1XRXVOUzQxSURBZ01DQXhMVEVnTUhwdExUY3VOalEyTFM0eVlTNDFMalVnTUNBd0lERWdNQzB1TnpBNGJEUXVNUzAwTGpGb0xUa3VPVFE1WVM0MUxqVWdNQ0F3SURFZ01DMHhhREV3YkMwMExqRTBOaTAwTGpFME5tRXVOUzQxSURBZ01DQXhJQzQzTURndExqY3dObXcwTGprMU1TQTBMamswT0dFdU5TNDFJREFnTUNBeElDNHhORFV1TXpnMkxqVXVOU0F3SURBZ01TMHVNVFEzTGpNM00yd3ROQzQ1TlNBMExqazFNV0V1TkRrMExqUTVOQ0F3SURBZ01TMHVNelV6TGpFME5pNDFMalVnTUNBd0lERXRMak0yTFM0eE5ERjZJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNndE9UVTFNQzR6T1RFZ0xUY3hNVGt1TVRneUtTSXZQZ284TDNOMlp6NEspO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogMThweCAxOHB4O1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyB9XG4gICAgICAuZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAudGl0bGViYXIgLm5leHQtaWNvbi1idXR0b24gc3BhbiwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAudGl0bGViYXIgLm5leHQtaWNvbi1idXR0b24gc3BhbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAuZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAuY29udHJvbCwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAuY29udHJvbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCAtIDIzcHgpO1xuICAgIG92ZXJmbG93LXk6IGF1dG87IH1cbiAgICAuZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAuY29udHJvbCAubGlzdCBsaSwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAuY29udHJvbCAubGlzdCBsaSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDE1cHggMjBweDtcbiAgICAgIGNvbG9yOiAjMTExMTExO1xuICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDc7IH1cbiAgICAgIC5kcmF3ZXItZHJvcGRvd24tc2luZ2xlIC5jb250cm9sIC5saXN0IGxpOmFjdGl2ZSwgLmRyYXdlci1kcm9wZG93bi1tdWx0aSAuY29udHJvbCAubGlzdCBsaTphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDQpOyB9XG5cbi5kcmF3ZXItZHJvcGRvd24tc2luZ2xlIC5jb250cm9sIC5saXN0IGxpIHNwYW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxuXG4uZHJhd2VyLWRyb3Bkb3duLXNpbmdsZSAuY29udHJvbCAubGlzdCBsaS5jaGVjayBzcGFuOmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbGV4OiAwIDAgMThweDtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQ0lnYUdWcFoyaDBQU0l4T0NJZ2RtbGxkMEp2ZUQwaU1DQXdJREU0SURFNElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTXhOemRoWm1ZaUlHUTlJazAwSURndU5qWTNZUzQyTmpVdU5qWTFJREFnTUNBeExTNDBOekV0TGpKTUxqSWdOUzR4TXpoaExqWTJOeTQyTmpjZ01DQXdJREVnTGprek9DMHVPVE00VERRZ055NHdOVGdnTVRBdU9EWXlMakpoTGpZMk55NDJOamNnTUNBd0lERWdMamswTXk0NU5ETk1OQzQwTnpJZ09DNDBOekpoTGpZMk5TNDJOalVnTUNBd0lERXRMalEzTVM0eUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d6SURRcElpOCtDand2YzNablBnbz0pIG5vLXJlcGVhdDsgfVxuXG4uZHJhd2VyLWRyb3Bkb3duLW11bHRpIC5jb250cm9sIC5saXN0IGxpIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LXdyYXA6IG5vd3JhcDsgfVxuICAuZHJhd2VyLWRyb3Bkb3duLW11bHRpIC5jb250cm9sIC5saXN0IGxpIHNwYW4ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgIC5kcmF3ZXItZHJvcGRvd24tbXVsdGkgLmNvbnRyb2wgLmxpc3QgbGkgc3Bhbi50ZXh0IHtcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDEwMCUgLSAxOHB4KTsgfVxuICAgIC5kcmF3ZXItZHJvcGRvd24tbXVsdGkgLmNvbnRyb2wgLmxpc3QgbGkgc3Bhbi5jaGVja2JveCB7XG4gICAgICBmbGV4OiAwIDAgMThweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XG5gOyJdfQ==