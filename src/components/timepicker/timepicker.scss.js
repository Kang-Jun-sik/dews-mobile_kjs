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

.time-picker-wrap label {
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .time-picker-wrap label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.time-picker-wrap .select-wrap {
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
  .time-picker-wrap .select-wrap .select-shape {
    display: inline-flex;
    flex: 1 1 auto;
    max-width: calc(100% - 28px); }
    .time-picker-wrap .select-wrap .select-shape .select-input {
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis; }
    .time-picker-wrap .select-wrap .select-shape .select-multi {
      display: inline-block;
      flex: 0 0 auto;
      margin-left: 5px; }
      .time-picker-wrap .select-wrap .select-shape .select-multi strong {
        font-weight: normal; }
  .time-picker-wrap .select-wrap .select-icon {
    display: block;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    margin-left: 10px;
    background-size: 18px 18px;
    background-repeat: no-repeat; }
  .time-picker-wrap .select-wrap.focus {
    border-color: #177aff; }
  .time-picker-wrap .select-wrap.readonly, .time-picker-wrap .select-wrap.disabled {
    border-color: rgba(60, 60, 67, 0.08);
    background-color: rgba(60, 60, 67, 0.02); }
  .time-picker-wrap .select-wrap.disabled {
    color: rgba(60, 60, 67, 0.6); }

.time-picker-wrap .select-wrap .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiM5Nzk5YTgiIGQ9Ik05NjIwIDE4NzM1LjVhOC41IDguNSAwIDEgMSA4LjUgOC41IDguNTA4IDguNTA4IDAgMCAxLTguNS04LjV6bTEgMGE3LjUgNy41IDAgMSAwIDcuNS03LjUgNy41MDYgNy41MDYgMCAwIDAtNy41IDcuNXptNy41LjVhLjUuNSAwIDAgMS0uNS0uNXYtNWEuNS41IDAgMCAxIDEgMHY0LjVoNC41YS41LjUgMCAxIDEgMCAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2MjAgLTE4NzI2KSIvPgo8L3N2Zz4K); }

.time-picker-wrap .select-wrap.focus .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik05NjIwIDE4NzM1LjVhOC41IDguNSAwIDEgMSA4LjUgOC41IDguNTA4IDguNTA4IDAgMCAxLTguNS04LjV6bTEgMGE3LjUgNy41IDAgMSAwIDcuNS03LjUgNy41MDYgNy41MDYgMCAwIDAtNy41IDcuNXptNy41LjVhLjUuNSAwIDAgMS0uNS0uNXYtNWEuNS41IDAgMCAxIDEgMHY0LjVoNC41YS41LjUgMCAxIDEgMCAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2MjAgLTE4NzI2KSIvPgo8L3N2Zz4K); }

.time-picker-wrap .select-wrap.readonly .select-icon,
.time-picker-wrap .select-wrap.disabled .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC4xOCkiIGQ9Ik05NjIwIDE4NzM1LjVhOC41IDguNSAwIDEgMSA4LjUgOC41IDguNTA4IDguNTA4IDAgMCAxLTguNS04LjV6bTEgMGE3LjUgNy41IDAgMSAwIDcuNS03LjUgNy41MDYgNy41MDYgMCAwIDAtNy41IDcuNXptNy41LjVhLjUuNSAwIDAgMS0uNS0uNXYtNWEuNS41IDAgMCAxIDEgMHY0LjVoNC41YS41LjUgMCAxIDEgMCAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2MjAgLTE4NzI2KSIvPgo8L3N2Zz4K); }

.drawer-time-picker .titlebar {
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  padding: 18px 20px; }
  .drawer-time-picker .titlebar .title {
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    flex: 1 1 auto;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5; }
  .drawer-time-picker .titlebar .confirm-button {
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
    .drawer-time-picker .titlebar .confirm-button:active {
      color: rgba(23, 122, 255, 0.5); }
  .drawer-time-picker .titlebar .next-icon-button {
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
    .drawer-time-picker .titlebar .next-icon-button span {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden; }

.drawer-time-picker .control {
  position: relative; }

.drawer-time-picker .layer-time-picker-input-wrap {
  zoom: 1;
  padding: 0 20px 24px; }
  .drawer-time-picker .layer-time-picker-input-wrap:before, .drawer-time-picker .layer-time-picker-input-wrap:after {
    content: '';
    display: table; }
  .drawer-time-picker .layer-time-picker-input-wrap:after {
    clear: both; }
  .drawer-time-picker .layer-time-picker-input-wrap .layer-picker-input {
    float: left;
    width: calc(100% - (18px + 10px)); }
  .drawer-time-picker .layer-time-picker-input-wrap .picker-input input {
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
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:focus, .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:active {
      border: 1px solid #177aff;
      outline: none; }
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:disabled {
      color: rgba(60, 60, 67, 0.8);
      background-color: rgba(60, 60, 67, 0.02); }
      .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:disabled:active, .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:disabled:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:read-only {
      background-color: rgba(60, 60, 67, 0.02); }
      .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:read-only:active, .drawer-time-picker .layer-time-picker-input-wrap .picker-input input:read-only:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input::placeholder {
      color: rgba(60, 60, 67, 0.18); }
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input[type='number'] {
      text-align: right;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none; }
      .drawer-time-picker .layer-time-picker-input-wrap .picker-input input[type='number']::-webkit-inner-spin-button, .drawer-time-picker .layer-time-picker-input-wrap .picker-input input[type='number']::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none; }
    .drawer-time-picker .layer-time-picker-input-wrap .picker-input input[type='number'] {
      text-align: left; }
  .drawer-time-picker .layer-time-picker-input-wrap .clear-button {
    border: 0;
    border-radius: 0;
    background-color: transparent;
    outline: 0;
    display: block;
    float: right;
    width: 18px;
    height: 18px;
    margin-top: 9px;
    margin-left: 10px;
    background-size: 18px 18px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOC4wMDIiIGhlaWdodD0iMTguMDAxIiB2aWV3Qm94PSIwIDAgMTguMDAyIDE4LjAwMSI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuMykiIGQ9Ik0xMTc5OCAxNjM3NmE5IDkgMCAxIDEgOS05IDguOTQyIDguOTQyIDAgMCAxLTkgOXptMC03LjUyMWwyLjIxNSAyLjIxNWExLjA0NiAxLjA0NiAwIDAgMCAxLjQ3NiAwIDEuMDQzIDEuMDQzIDAgMCAwIDAtMS40NzlsLTIuMjE2LTIuMjE1IDIuMjE2LTIuMjE2YTEuMDQ1IDEuMDQ1IDAgMCAwLTEuNDc2LTEuNDc5bC0yLjIxNiAyLjIyLTIuMjE5LTIuMjE2YTEuMDQzIDEuMDQzIDAgMSAwLTEuNDc2IDEuNDc2bDIuMjE1IDIuMjE2LTIuMjE1IDIuMjE1YTEuMDQ2IDEuMDQ2IDAgMCAwLS4zMDkuNzQ0IDEuMDMxIDEuMDMxIDAgMCAwIC4zMDkuNzM1IDEuMDQ2IDEuMDQ2IDAgMCAwIDEuNDc2IDBsMi4yMTgtMi4yMTV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE3ODkgLTE2MzU3Ljk5OSkiLz4KPC9zdmc+Cg==); }
    .drawer-time-picker .layer-time-picker-input-wrap .clear-button:active {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOC4wMDEiIGhlaWdodD0iMTguMDAxIiB2aWV3Qm94PSIwIDAgMTguMDAxIDE4LjAwMSI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuNikiIGQ9Ik0xMTc5OCAxNjM3NmE5IDkgMCAxIDEgOS05IDguOTQyIDguOTQyIDAgMCAxLTkgOXptMC03LjUyMWwyLjIxNSAyLjIxNWExLjA0NiAxLjA0NiAwIDAgMCAxLjQ3NiAwIDEuMDQzIDEuMDQzIDAgMCAwIDAtMS40NzlsLTIuMjE2LTIuMjE1IDIuMjE2LTIuMjE2YTEuMDQ1IDEuMDQ1IDAgMCAwLTEuNDc2LTEuNDc5bC0yLjIxNiAyLjIyLTIuMjE5LTIuMjE2YTEuMDQzIDEuMDQzIDAgMSAwLTEuNDc2IDEuNDc2bDIuMjE1IDIuMjE2LTIuMjE1IDIuMjE1YTEuMDQ2IDEuMDQ2IDAgMCAwLS4zMDkuNzQ0IDEuMDMxIDEuMDMxIDAgMCAwIC4zMDkuNzM1IDEuMDQ2IDEuMDQ2IDAgMCAwIDEuNDc2IDBsMi4yMTgtMi4yMTV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE3ODkuMDAxIC0xNjM1Ny45OTkpIi8+Cjwvc3ZnPgo=); }
    .drawer-time-picker .layer-time-picker-input-wrap .clear-button span {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden; }

.drawer-time-picker .layer-calendar-wrap {
  padding: 0 20px; }
  .drawer-time-picker .layer-calendar-wrap .calender-header {
    position: relative;
    height: 48px;
    padding: 12px 0;
    border-radius: 14px;
    background-color: #eaf4ff; }
    .drawer-time-picker .layer-calendar-wrap .calender-header .option-button {
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
      position: absolute;
      top: 12px;
      left: 12px;
      width: 24px;
      height: 24px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC44KSIgZD0iTTkyMTMuMTY5IDE5ODQzSDkyMDZhMSAxIDAgMSAxIDAtMmg3LjE3YTMuMDA1IDMuMDA1IDAgMCAxIDUuNjYzIDBIOTIyMGExIDEgMCAxIDEgMCAyaC0xLjE2OWEzIDMgMCAwIDEtNS42NjIgMHptMS44My0xYTEgMSAwIDEgMCAxLTEgMSAxIDAgMCAwLS45OTkgMXptLTgtOGEzIDMgMCAxIDEgMyAzIDMgMyAwIDAgMS0yLjk5OS0zem0yIDBhMSAxIDAgMSAwIDEtMSAxIDEgMCAwIDAtLjk5OSAxem0zLjgzIDFhMi45NTkgMi45NTkgMCAwIDAgLjE3NC0xIDMgMyAwIDAgMC0uMTc0LTFIOTIyMGExIDEgMCAxIDEgMCAyem0tNi44MjkgMGExIDEgMCAxIDEgMC0yaDEuMTcxYTMgMyAwIDAgMC0uMTc1IDEgMi45NiAyLjk2IDAgMCAwIC4xNzUgMXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MjAxIC0xOTgyNikiLz4KPC9zdmc+Cg==);
      background-size: 24px 24px; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .option-button.selected {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMxNzdhZmYiIGQ9Ik05MjEzLjE2OSAxOTg0M0g5MjA2YTEgMSAwIDEgMSAwLTJoNy4xN2EzLjAwNSAzLjAwNSAwIDAgMSA1LjY2MyAwSDkyMjBhMSAxIDAgMSAxIDAgMmgtMS4xNjlhMyAzIDAgMCAxLTUuNjYyIDB6bTEuODMtMWExIDEgMCAxIDAgMS0xIDEgMSAwIDAgMC0uOTk5IDF6bS04LThhMyAzIDAgMSAxIDMgMyAzIDMgMCAwIDEtMi45OTktM3ptMiAwYTEgMSAwIDEgMCAxLTEgMSAxIDAgMCAwLS45OTkgMXptMy44MyAxYTIuOTU5IDIuOTU5IDAgMCAwIC4xNzQtMSAzIDMgMCAwIDAtLjE3NC0xSDkyMjBhMSAxIDAgMSAxIDAgMnptLTYuODI5IDBhMSAxIDAgMSAxIDAtMmgxLjE3MWEzIDMgMCAwIDAtLjE3NSAxIDIuOTYgMi45NiAwIDAgMCAuMTc1IDF6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTIwMSAtMTk4MjYpIi8+Cjwvc3ZnPgo=); }
      .drawer-time-picker .layer-calendar-wrap .calender-header .option-button span {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden; }
    .drawer-time-picker .layer-calendar-wrap .calender-header .header {
      zoom: 1;
      margin: 0 auto;
      width: 136px; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header:before, .drawer-time-picker .layer-calendar-wrap .calender-header .header:after {
        content: '';
        display: table; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header:after {
        clear: both; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .fast {
        border: 0;
        border-radius: 0;
        background-color: transparent;
        outline: 0;
        float: left;
        width: 88px;
        color: #000000;
        font-family: "Roboto";
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        line-height: 1.5; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .prev,
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .next {
        border: 0;
        border-radius: 0;
        background-color: transparent;
        outline: 0;
        float: left;
        display: block;
        width: 24px;
        height: 24px;
        background-size: 24px 24px; }
        .drawer-time-picker .layer-calendar-wrap .calender-header .header .prev span,
        .drawer-time-picker .layer-calendar-wrap .calender-header .header .next span {
          position: absolute;
          clip: rect(0 0 0 0);
          width: 1px;
          height: 1px;
          margin: -1px;
          overflow: hidden; }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .prev {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik03IDBhMSAxIDAgMCAwLS43MDcuMjkzbC01IDVhMSAxIDAgMCAwIDEuNDE0IDEuNDE0TDcgMi40MTRsNC4yOTMgNC4yOTNhMSAxIDAgMCAwIDEuNDE0LTEuNDE0bC01LTVBMSAxIDAgMCAwIDcgMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEzLjUgNS41KSIvPgo8L3N2Zz4K); }
        .drawer-time-picker .layer-calendar-wrap .calender-header .header .prev:active {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsMC43KSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTUgNWExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw0LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTUtNUExIDEgMCAwIDAgNyAwIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMTMuNSA1LjUpIi8+Cjwvc3ZnPgo=); }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .next {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik03IDBhMSAxIDAgMCAwLS43MDcuMjkzbC01IDVhMSAxIDAgMCAwIDEuNDE0IDEuNDE0TDcgMi40MTRsNC4yOTMgNC4yOTNhMSAxIDAgMCAwIDEuNDE0LTEuNDE0bC01LTVBMSAxIDAgMCAwIDcgMCIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDEwLjUpIi8+Cjwvc3ZnPgo=); }
        .drawer-time-picker .layer-calendar-wrap .calender-header .header .next:active {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsMC43KSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTUgNWExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw0LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTUtNUExIDEgMCAwIDAgNyAwIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA1LjUgMTAuNSkiLz4KPC9zdmc+Cg==); }
      .drawer-time-picker .layer-calendar-wrap .calender-header .header .calendar-spinner-title {
        display: block;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        font-family: "Roboto";
        text-align: center;
        line-height: 1.5; }
    .drawer-time-picker .layer-calendar-wrap .calender-header .today-button {
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
      position: absolute;
      top: 10px;
      right: 12px;
      padding: 3px 9px;
      color: rgba(60, 60, 67, 0.8);
      border: 1px solid rgba(60, 60, 67, 0.18);
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.54; }

.drawer-time-picker .calendar-content {
  overflow: hidden;
  padding-top: 16px; }

.drawer-time-picker .calendar-spinner-wrap {
  position: relative;
  display: flex;
  flex-flow: nowrap;
  overflow: hidden;
  width: 100%; }
  .drawer-time-picker .calendar-spinner-wrap .spinner-wrap {
    position: relative;
    flex: 1 1 88px;
    margin-right: 28px;
    text-align: center; }
    .drawer-time-picker .calendar-spinner-wrap .spinner-wrap:last-child {
      margin-right: 0; }
    .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .selector {
      position: absolute;
      top: calc(35px * 2);
      left: 0;
      width: 100%;
      height: 35px;
      border-top: 1px solid #177aff;
      border-bottom: 1px solid #177aff;
      background-color: transparent; }
    .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content {
      position: relative;
      z-index: 2000;
      overflow: hidden;
      height: calc(35px * 5);
      background: transparent; }
      .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        transform: translate3d(0px, 0px, 0px);
        transition-property: -webkit-transform;
        transition-duration: 0ms;
        transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
        -webkit-overflow-scrolling: touch; }
        .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div .moving-list:before {
          content: '';
          display: block;
          padding-top: calc(35px * 2); }
        .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div .moving-list:after {
          content: '';
          display: block;
          padding-bottom: calc(35px * 2); }
        .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div .moving-list li button {
          border: 0;
          border-radius: 0;
          background-color: transparent;
          outline: 0;
          width: 100%;
          height: 35px;
          color: rgba(60, 60, 67, 0.6);
          font-size: 15px;
          text-align: center;
          line-height: 1.47;
          letter-spacing: normal; }
        .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div .moving-list li.select button {
          color: #177aff;
          font-size: 18px;
          font-weight: bold; }
        .drawer-time-picker .calendar-spinner-wrap .spinner-wrap .spinner-box .content div .moving-list li.select.clear button {
          color: rgba(60, 60, 67, 0.6);
          font-size: 15px;
          font-weight: normal; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5zY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGltZXBpY2tlci5zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsZUFBZSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNFhqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4udGltZS1waWNrZXItd3JhcCBsYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuNik7IH1cbiAgOmhvc3QoW3JlcXVpcmVkXSkgLnRpbWUtcGlja2VyLXdyYXAgbGFiZWw6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcqJztcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgY29sb3I6ICNmYzRjNjA7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxOHB4OyB9XG5cbi50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgY29sb3I6ICMxMTExMTE7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS40NzsgfVxuICAudGltZS1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAgLnNlbGVjdC1zaGFwZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSAyOHB4KTsgfVxuICAgIC50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LXNoYXBlIC5zZWxlY3QtaW5wdXQge1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB9XG4gICAgLnRpbWUtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3Qtc2hhcGUgLnNlbGVjdC1tdWx0aSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7IH1cbiAgICAgIC50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LXNoYXBlIC5zZWxlY3QtbXVsdGkgc3Ryb25nIHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxuICAudGltZS1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAgLnNlbGVjdC1pY29uIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAwIDAgMThweDtcbiAgICB3aWR0aDogMThweDtcbiAgICBoZWlnaHQ6IDE4cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxOHB4IDE4cHg7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxuICAudGltZS1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAuZm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzE3N2FmZjsgfVxuICAudGltZS1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAucmVhZG9ubHksIC50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcC5kaXNhYmxlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wMik7IH1cbiAgLnRpbWUtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwLmRpc2FibGVkIHtcbiAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpOyB9XG5cbi50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LWljb24ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4T0NJZ2FHVnBaMmgwUFNJeE9DSWdkbWxsZDBKdmVEMGlNQ0F3SURFNElERTRJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU01TnprNVlUZ2lJR1E5SWswNU5qSXdJREU0TnpNMUxqVmhPQzQxSURndU5TQXdJREVnTVNBNExqVWdPQzQxSURndU5UQTRJRGd1TlRBNElEQWdNQ0F4TFRndU5TMDRMalY2YlRFZ01HRTNMalVnTnk0MUlEQWdNU0F3SURjdU5TMDNMalVnTnk0MU1EWWdOeTQxTURZZ01DQXdJREF0Tnk0MUlEY3VOWHB0Tnk0MUxqVmhMalV1TlNBd0lEQWdNUzB1TlMwdU5YWXROV0V1TlM0MUlEQWdNQ0F4SURFZ01IWTBMalZvTkM0MVlTNDFMalVnTUNBeElERWdNQ0F4ZWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9MVGsyTWpBZ0xURTROekkyS1NJdlBnbzhMM04yWno0Syk7IH1cblxuLnRpbWUtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwLmZvY3VzIC5zZWxlY3QtaWNvbiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQ0lnYUdWcFoyaDBQU0l4T0NJZ2RtbGxkMEp2ZUQwaU1DQXdJREU0SURFNElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTXpNek1pSUdROUlrMDVOakl3SURFNE56TTFMalZoT0M0MUlEZ3VOU0F3SURFZ01TQTRMalVnT0M0MUlEZ3VOVEE0SURndU5UQTRJREFnTUNBeExUZ3VOUzA0TGpWNmJURWdNR0UzTGpVZ055NDFJREFnTVNBd0lEY3VOUzAzTGpVZ055NDFNRFlnTnk0MU1EWWdNQ0F3SURBdE55NDFJRGN1TlhwdE55NDFMalZoTGpVdU5TQXdJREFnTVMwdU5TMHVOWFl0TldFdU5TNDFJREFnTUNBeElERWdNSFkwTGpWb05DNDFZUzQxTGpVZ01DQXhJREVnTUNBeGVpSWdkSEpoYm5ObWIzSnRQU0owY21GdWMyeGhkR1VvTFRrMk1qQWdMVEU0TnpJMktTSXZQZ284TDNOMlp6NEspOyB9XG5cbi50aW1lLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcC5yZWFkb25seSAuc2VsZWN0LWljb24sXG4udGltZS1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAuZGlzYWJsZWQgLnNlbGVjdC1pY29uIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzR4T0NraUlHUTlJazA1TmpJd0lERTROek0xTGpWaE9DNDFJRGd1TlNBd0lERWdNU0E0TGpVZ09DNDFJRGd1TlRBNElEZ3VOVEE0SURBZ01DQXhMVGd1TlMwNExqVjZiVEVnTUdFM0xqVWdOeTQxSURBZ01TQXdJRGN1TlMwM0xqVWdOeTQxTURZZ055NDFNRFlnTUNBd0lEQXROeTQxSURjdU5YcHROeTQxTGpWaExqVXVOU0F3SURBZ01TMHVOUzB1TlhZdE5XRXVOUzQxSURBZ01DQXhJREVnTUhZMExqVm9OQzQxWVM0MUxqVWdNQ0F4SURFZ01DQXhlaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xUazJNakFnTFRFNE56STJLU0l2UGdvOEwzTjJaejRLKTsgfVxuXG4uZHJhd2VyLXRpbWUtcGlja2VyIC50aXRsZWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogbm93cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxOHB4IDIwcHg7IH1cbiAgLmRyYXdlci10aW1lLXBpY2tlciAudGl0bGViYXIgLnRpdGxlIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7IH1cbiAgLmRyYXdlci10aW1lLXBpY2tlciAudGl0bGViYXIgLmNvbmZpcm0tYnV0dG9uIHtcbiAgICBib3JkZXI6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgIGhlaWdodDogMjBweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBjb2xvcjogIzE3N2FmZjtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7IH1cbiAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC50aXRsZWJhciAuY29uZmlybS1idXR0b246YWN0aXZlIHtcbiAgICAgIGNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC41KTsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC50aXRsZWJhciAubmV4dC1pY29uLWJ1dHRvbiB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgb3V0bGluZTogMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAwIDAgMjRweDtcbiAgICB3aWR0aDogMjRweDtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHhuTHo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzQ0S1NJZ1pEMGlUVGsxTmpVdU16ZzVJRGN4TXpNdU5qZ3pkaTB4TVdFdU5TNDFJREFnTUNBeElERWdNSFl4TVdFdU5TNDFJREFnTUNBeExURWdNSHB0TFRjdU5qUTJMUzR5WVM0MUxqVWdNQ0F3SURFZ01DMHVOekE0YkRRdU1TMDBMakZvTFRrdU9UUTVZUzQxTGpVZ01DQXdJREVnTUMweGFERXdiQzAwTGpFME5pMDBMakUwTm1FdU5TNDFJREFnTUNBeElDNDNNRGd0TGpjd05tdzBMamsxTVNBMExqazBPR0V1TlM0MUlEQWdNQ0F4SUM0eE5EVXVNemcyTGpVdU5TQXdJREFnTVMwdU1UUTNMak0zTTJ3dE5DNDVOU0EwTGprMU1XRXVORGswTGpRNU5DQXdJREFnTVMwdU16VXpMakUwTmk0MUxqVWdNQ0F3SURFdExqTTJMUzR4TkRGNklpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0T1RVMU1DNHpPVEVnTFRjeE1Ua3VNVGd5S1NJdlBnbzhMM04yWno0Syk7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE4cHggMThweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IH1cbiAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC50aXRsZWJhciAubmV4dC1pY29uLWJ1dHRvbiBzcGFuIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW46IC0xcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5kcmF3ZXItdGltZS1waWNrZXIgLmNvbnRyb2wge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cblxuLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCB7XG4gIHpvb206IDE7XG4gIHBhZGRpbmc6IDAgMjBweCAyNHB4OyB9XG4gIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXA6YmVmb3JlLCAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwOmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBkaXNwbGF5OiB0YWJsZTsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwOmFmdGVyIHtcbiAgICBjbGVhcjogYm90aDsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwIC5sYXllci1waWNrZXItaW5wdXQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAoMThweCArIDEwcHgpKTsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXQge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgcGFkZGluZzogN3B4IDEwcHg7XG4gICAgY29sb3I6ICMxMTExMTE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDc7XG4gICAgdGV4dC1hbGlnbjogbGVmdDsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDpmb2N1cywgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmFjdGl2ZSB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTc3YWZmO1xuICAgICAgb3V0bGluZTogbm9uZTsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDpkaXNhYmxlZCB7XG4gICAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjgpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjAyKTsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmRpc2FibGVkOmFjdGl2ZSwgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmRpc2FibGVkOmZvY3VzIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDpyZWFkLW9ubHkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjAyKTsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OnJlYWQtb25seTphY3RpdmUsIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDpyZWFkLW9ubHk6Zm9jdXMge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpOyB9XG4gICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OjpwbGFjZWhvbGRlciB7XG4gICAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dFt0eXBlPSdudW1iZXInXSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbiAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItdGltZS1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7IH1cbiAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXRbdHlwZT0nbnVtYmVyJ10ge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwIC5jbGVhci1idXR0b24ge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmU6IDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBtYXJnaW4tdG9wOiA5cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxOHB4IDE4cHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DNHdNRElpSUdobGFXZG9kRDBpTVRndU1EQXhJaUIyYVdWM1FtOTRQU0l3SURBZ01UZ3VNREF5SURFNExqQXdNU0krQ2lBZ0lDQThjR0YwYUNCbWFXeHNQU0p5WjJKaEtEWXdMRFl3TERZM0xEQXVNeWtpSUdROUlrMHhNVGM1T0NBeE5qTTNObUU1SURrZ01DQXhJREVnT1MwNUlEZ3VPVFF5SURndU9UUXlJREFnTUNBeExUa2dPWHB0TUMwM0xqVXlNV3d5TGpJeE5TQXlMakl4TldFeExqQTBOaUF4TGpBME5pQXdJREFnTUNBeExqUTNOaUF3SURFdU1EUXpJREV1TURReklEQWdNQ0F3SURBdE1TNDBOemxzTFRJdU1qRTJMVEl1TWpFMUlESXVNakUyTFRJdU1qRTJZVEV1TURRMUlERXVNRFExSURBZ01DQXdMVEV1TkRjMkxURXVORGM1YkMweUxqSXhOaUF5TGpJeUxUSXVNakU1TFRJdU1qRTJZVEV1TURReklERXVNRFF6SURBZ01TQXdMVEV1TkRjMklERXVORGMyYkRJdU1qRTFJREl1TWpFMkxUSXVNakUxSURJdU1qRTFZVEV1TURRMklERXVNRFEySURBZ01DQXdMUzR6TURrdU56UTBJREV1TURNeElERXVNRE14SURBZ01DQXdJQzR6TURrdU56TTFJREV1TURRMklERXVNRFEySURBZ01DQXdJREV1TkRjMklEQnNNaTR5TVRndE1pNHlNVFY2SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3RNVEUzT0RrZ0xURTJNelUzTGprNU9Ta2lMejRLUEM5emRtYytDZz09KTsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLXRpbWUtcGlja2VyLWlucHV0LXdyYXAgLmNsZWFyLWJ1dHRvbjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DNHdNREVpSUdobGFXZG9kRDBpTVRndU1EQXhJaUIyYVdWM1FtOTRQU0l3SURBZ01UZ3VNREF4SURFNExqQXdNU0krQ2lBZ0lDQThjR0YwYUNCbWFXeHNQU0p5WjJKaEtEWXdMRFl3TERZM0xEQXVOaWtpSUdROUlrMHhNVGM1T0NBeE5qTTNObUU1SURrZ01DQXhJREVnT1MwNUlEZ3VPVFF5SURndU9UUXlJREFnTUNBeExUa2dPWHB0TUMwM0xqVXlNV3d5TGpJeE5TQXlMakl4TldFeExqQTBOaUF4TGpBME5pQXdJREFnTUNBeExqUTNOaUF3SURFdU1EUXpJREV1TURReklEQWdNQ0F3SURBdE1TNDBOemxzTFRJdU1qRTJMVEl1TWpFMUlESXVNakUyTFRJdU1qRTJZVEV1TURRMUlERXVNRFExSURBZ01DQXdMVEV1TkRjMkxURXVORGM1YkMweUxqSXhOaUF5TGpJeUxUSXVNakU1TFRJdU1qRTJZVEV1TURReklERXVNRFF6SURBZ01TQXdMVEV1TkRjMklERXVORGMyYkRJdU1qRTFJREl1TWpFMkxUSXVNakUxSURJdU1qRTFZVEV1TURRMklERXVNRFEySURBZ01DQXdMUzR6TURrdU56UTBJREV1TURNeElERXVNRE14SURBZ01DQXdJQzR6TURrdU56TTFJREV1TURRMklERXVNRFEySURBZ01DQXdJREV1TkRjMklEQnNNaTR5TVRndE1pNHlNVFY2SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3RNVEUzT0RrdU1EQXhJQzB4TmpNMU55NDVPVGtwSWk4K0Nqd3ZjM1puUGdvPSk7IH1cbiAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci10aW1lLXBpY2tlci1pbnB1dC13cmFwIC5jbGVhci1idXR0b24gc3BhbiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBjbGlwOiByZWN0KDAgMCAwIDApO1xuICAgICAgd2lkdGg6IDFweDtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4uZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIHtcbiAgcGFkZGluZzogMCAyMHB4OyB9XG4gIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogNDhweDtcbiAgICBwYWRkaW5nOiAxMnB4IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFmNGZmOyB9XG4gICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5vcHRpb24tYnV0dG9uIHtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDEycHg7XG4gICAgICBsZWZ0OiAxMnB4O1xuICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJbkpuWW1Fb05qQXNOakFzTmpjc01DNDRLU0lnWkQwaVRUa3lNVE11TVRZNUlERTVPRFF6U0RreU1EWmhNU0F4SURBZ01TQXhJREF0TW1nM0xqRTNZVE11TURBMUlETXVNREExSURBZ01DQXhJRFV1TmpZeklEQklPVEl5TUdFeElERWdNQ0F4SURFZ01DQXlhQzB4TGpFMk9XRXpJRE1nTUNBd0lERXROUzQyTmpJZ01IcHRNUzQ0TXkweFlURWdNU0F3SURFZ01DQXhMVEVnTVNBeElEQWdNQ0F3TFM0NU9Ua2dNWHB0TFRndE9HRXpJRE1nTUNBeElERWdNeUF6SURNZ015QXdJREFnTVMweUxqazVPUzB6ZW0weUlEQmhNU0F4SURBZ01TQXdJREV0TVNBeElERWdNQ0F3SURBdExqazVPU0F4ZW0wekxqZ3pJREZoTWk0NU5Ua2dNaTQ1TlRrZ01DQXdJREFnTGpFM05DMHhJRE1nTXlBd0lEQWdNQzB1TVRjMExURklPVEl5TUdFeElERWdNQ0F4SURFZ01DQXllbTB0Tmk0NE1qa2dNR0V4SURFZ01DQXhJREVnTUMweWFERXVNVGN4WVRNZ015QXdJREFnTUMwdU1UYzFJREVnTWk0NU5pQXlMamsySURBZ01DQXdJQzR4TnpVZ01Yb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0MwNU1qQXhJQzB4T1RneU5pa2lMejRLUEM5emRtYytDZz09KTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyB9XG4gICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLm9wdGlvbi1idXR0b24uc2VsZWN0ZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU14TnpkaFptWWlJR1E5SWswNU1qRXpMakUyT1NBeE9UZzBNMGc1TWpBMllURWdNU0F3SURFZ01TQXdMVEpvTnk0eE4yRXpMakF3TlNBekxqQXdOU0F3SURBZ01TQTFMalkyTXlBd1NEa3lNakJoTVNBeElEQWdNU0F4SURBZ01tZ3RNUzR4TmpsaE15QXpJREFnTUNBeExUVXVOall5SURCNmJURXVPRE10TVdFeElERWdNQ0F4SURBZ01TMHhJREVnTVNBd0lEQWdNQzB1T1RrNUlERjZiUzA0TFRoaE15QXpJREFnTVNBeElETWdNeUF6SURNZ01DQXdJREV0TWk0NU9Ua3RNM3B0TWlBd1lURWdNU0F3SURFZ01DQXhMVEVnTVNBeElEQWdNQ0F3TFM0NU9Ua2dNWHB0TXk0NE15QXhZVEl1T1RVNUlESXVPVFU1SURBZ01DQXdJQzR4TnpRdE1TQXpJRE1nTUNBd0lEQXRMakUzTkMweFNEa3lNakJoTVNBeElEQWdNU0F4SURBZ01ucHRMVFl1T0RJNUlEQmhNU0F4SURBZ01TQXhJREF0TW1neExqRTNNV0V6SURNZ01DQXdJREF0TGpFM05TQXhJREl1T1RZZ01pNDVOaUF3SURBZ01DQXVNVGMxSURGNklpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0T1RJd01TQXRNVGs0TWpZcElpOCtDand2YzNablBnbz0pOyB9XG4gICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLm9wdGlvbi1idXR0b24gc3BhbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIHtcbiAgICAgIHpvb206IDE7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIHdpZHRoOiAxMzZweDsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXI6YmVmb3JlLCAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlcjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXI6YWZ0ZXIge1xuICAgICAgICBjbGVhcjogYm90aDsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIgLmZhc3Qge1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgd2lkdGg6IDg4cHg7XG4gICAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBsaW5lLWhlaWdodDogMS41OyB9XG4gICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAucHJldixcbiAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5uZXh0IHtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogMjRweDtcbiAgICAgICAgaGVpZ2h0OiAyNHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDI0cHggMjRweDsgfVxuICAgICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAucHJldiBzcGFuLFxuICAgICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAubmV4dCBzcGFuIHtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG4gICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAucHJldiB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOQ0lnYUdWcFoyaDBQU0l5TkNJZ2RtbGxkMEp2ZUQwaU1DQXdJREkwSURJMElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTXpNek1pSUdROUlrMDNJREJoTVNBeElEQWdNQ0F3TFM0M01EY3VNamt6YkMwMUlEVmhNU0F4SURBZ01DQXdJREV1TkRFMElERXVOREUwVERjZ01pNDBNVFJzTkM0eU9UTWdOQzR5T1ROaE1TQXhJREFnTUNBd0lERXVOREUwTFRFdU5ERTBiQzAxTFRWQk1TQXhJREFnTUNBd0lEY2dNQ0lnZEhKaGJuTm1iM0p0UFNKeWIzUmhkR1VvTFRrd0lERXpMalVnTlM0MUtTSXZQZ284TDNOMlp6NEspOyB9XG4gICAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5wcmV2OmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5DSWdhR1ZwWjJoMFBTSXlOQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTBJREkwSWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OVEVzTlRFc05URXNNQzQzS1NJZ1pEMGlUVGNnTUdFeElERWdNQ0F3SURBdExqY3dOeTR5T1ROc0xUVWdOV0V4SURFZ01DQXdJREFnTVM0ME1UUWdNUzQwTVRSTU55QXlMalF4Tkd3MExqSTVNeUEwTGpJNU0yRXhJREVnTUNBd0lEQWdNUzQwTVRRdE1TNDBNVFJzTFRVdE5VRXhJREVnTUNBd0lEQWdOeUF3SWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNndE9UQWdNVE11TlNBMUxqVXBJaTgrQ2p3dmMzWm5QZ289KTsgfVxuICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIgLm5leHQge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU16TXpNaUlHUTlJazAzSURCaE1TQXhJREFnTUNBd0xTNDNNRGN1TWpremJDMDFJRFZoTVNBeElEQWdNQ0F3SURFdU5ERTBJREV1TkRFMFREY2dNaTQwTVRSc05DNHlPVE1nTkM0eU9UTmhNU0F4SURBZ01DQXdJREV1TkRFMExURXVOREUwYkMwMUxUVkJNU0F4SURBZ01DQXdJRGNnTUNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb09UQWdOUzQxSURFd0xqVXBJaTgrQ2p3dmMzWm5QZ289KTsgfVxuICAgICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAubmV4dDphY3RpdmUge1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOQ0lnYUdWcFoyaDBQU0l5TkNJZ2RtbGxkMEp2ZUQwaU1DQXdJREkwSURJMElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUluSm5ZbUVvTlRFc05URXNOVEVzTUM0M0tTSWdaRDBpVFRjZ01HRXhJREVnTUNBd0lEQXRMamN3Tnk0eU9UTnNMVFVnTldFeElERWdNQ0F3SURBZ01TNDBNVFFnTVM0ME1UUk1OeUF5TGpReE5HdzBMakk1TXlBMExqSTVNMkV4SURFZ01DQXdJREFnTVM0ME1UUXRNUzQwTVRSc0xUVXROVUV4SURFZ01DQXdJREFnTnlBd0lpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZzVNQ0ExTGpVZ01UQXVOU2tpTHo0S1BDOXpkbWMrQ2c9PSk7IH1cbiAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5jYWxlbmRhci1zcGlubmVyLXRpdGxlIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBsaW5lLWhlaWdodDogMS41OyB9XG4gICAgLmRyYXdlci10aW1lLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC50b2RheS1idXR0b24ge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMTBweDtcbiAgICAgIHJpZ2h0OiAxMnB4O1xuICAgICAgcGFkZGluZzogM3B4IDlweDtcbiAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU0OyB9XG5cbi5kcmF3ZXItdGltZS1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLXRvcDogMTZweDsgfVxuXG4uZHJhd2VyLXRpbWUtcGlja2VyIC5jYWxlbmRhci1zcGlubmVyLXdyYXAge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZmxvdzogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogMTAwJTsgfVxuICAuZHJhd2VyLXRpbWUtcGlja2VyIC5jYWxlbmRhci1zcGlubmVyLXdyYXAgLnNwaW5uZXItd3JhcCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGZsZXg6IDEgMSA4OHB4O1xuICAgIG1hcmdpbi1yaWdodDogMjhweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cbiAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5jYWxlbmRhci1zcGlubmVyLXdyYXAgLnNwaW5uZXItd3JhcDpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxuICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmNhbGVuZGFyLXNwaW5uZXItd3JhcCAuc3Bpbm5lci13cmFwIC5zZWxlY3RvciB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IGNhbGMoMzVweCAqIDIpO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMxNzdhZmY7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzE3N2FmZjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XG4gICAgLmRyYXdlci10aW1lLXBpY2tlciAuY2FsZW5kYXItc3Bpbm5lci13cmFwIC5zcGlubmVyLXdyYXAgLnNwaW5uZXItYm94IC5jb250ZW50IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDIwMDA7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgaGVpZ2h0OiBjYWxjKDM1cHggKiA1KTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XG4gICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5jYWxlbmRhci1zcGlubmVyLXdyYXAgLnNwaW5uZXItd3JhcCAuc3Bpbm5lci1ib3ggLmNvbnRlbnQgZGl2IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1xuICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiAtd2Via2l0LXRyYW5zZm9ybTtcbiAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMG1zO1xuICAgICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMSwgMC41NywgMC4xLCAxKTtcbiAgICAgICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoOyB9XG4gICAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmNhbGVuZGFyLXNwaW5uZXItd3JhcCAuc3Bpbm5lci13cmFwIC5zcGlubmVyLWJveCAuY29udGVudCBkaXYgLm1vdmluZy1saXN0OmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgcGFkZGluZy10b3A6IGNhbGMoMzVweCAqIDIpOyB9XG4gICAgICAgIC5kcmF3ZXItdGltZS1waWNrZXIgLmNhbGVuZGFyLXNwaW5uZXItd3JhcCAuc3Bpbm5lci13cmFwIC5zcGlubmVyLWJveCAuY29udGVudCBkaXYgLm1vdmluZy1saXN0OmFmdGVyIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogY2FsYygzNXB4ICogMik7IH1cbiAgICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAuY2FsZW5kYXItc3Bpbm5lci13cmFwIC5zcGlubmVyLXdyYXAgLnNwaW5uZXItYm94IC5jb250ZW50IGRpdiAubW92aW5nLWxpc3QgbGkgYnV0dG9uIHtcbiAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMzVweDtcbiAgICAgICAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDc7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDsgfVxuICAgICAgICAuZHJhd2VyLXRpbWUtcGlja2VyIC5jYWxlbmRhci1zcGlubmVyLXdyYXAgLnNwaW5uZXItd3JhcCAuc3Bpbm5lci1ib3ggLmNvbnRlbnQgZGl2IC5tb3ZpbmctbGlzdCBsaS5zZWxlY3QgYnV0dG9uIHtcbiAgICAgICAgICBjb2xvcjogIzE3N2FmZjtcbiAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiAgICAgICAgLmRyYXdlci10aW1lLXBpY2tlciAuY2FsZW5kYXItc3Bpbm5lci13cmFwIC5zcGlubmVyLXdyYXAgLnNwaW5uZXItYm94IC5jb250ZW50IGRpdiAubW92aW5nLWxpc3QgbGkuc2VsZWN0LmNsZWFyIGJ1dHRvbiB7XG4gICAgICAgICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC42KTtcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxuYDsiXX0=