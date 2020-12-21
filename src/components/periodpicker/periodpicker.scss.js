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

.period-picker-wrap label {
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .period-picker-wrap label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.period-picker-wrap .select-wrap {
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
  .period-picker-wrap .select-wrap .select-shape {
    display: inline-flex;
    flex: 1 1 auto;
    max-width: calc(100% - 28px); }
    .period-picker-wrap .select-wrap .select-shape .select-input {
      overflow: hidden;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis; }
    .period-picker-wrap .select-wrap .select-shape .select-multi {
      display: inline-block;
      flex: 0 0 auto;
      margin-left: 5px; }
      .period-picker-wrap .select-wrap .select-shape .select-multi strong {
        font-weight: normal; }
  .period-picker-wrap .select-wrap .select-icon {
    display: block;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    margin-left: 10px;
    background-size: 18px 18px;
    background-repeat: no-repeat; }
  .period-picker-wrap .select-wrap.focus {
    border-color: #177aff; }
  .period-picker-wrap .select-wrap.readonly, .period-picker-wrap .select-wrap.disabled {
    border-color: rgba(60, 60, 67, 0.08);
    background-color: rgba(60, 60, 67, 0.02); }
  .period-picker-wrap .select-wrap.disabled {
    color: rgba(60, 60, 67, 0.6); }

.period-picker-wrap .select-wrap .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiM5Nzk5YTgiIGQ9Ik00OTMuMiAxMjI1LjM5YTIgMiAwIDAgMS0yLTJ2LTExYTIgMiAwIDAgMSAyLTJoM3YtLjVhLjUuNSAwIDAgMSAxIDB2LjVoNHYtLjVhLjUuNSAwIDAgMSAxIDB2LjVoM2EyIDIgMCAwIDEgMiAydjExYTIgMiAwIDAgMS0yIDJ6bS0xLTJhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xdi04aC0xNHptMC0xMXYyaDE0di0yYTEgMSAwIDAgMC0xLTFoLTN2LjVhLjUuNSAwIDAgMS0xIDB2LS41aC00di41YS41LjUgMCAwIDEtMSAwdi0uNWgtM2ExIDEgMCAwIDAtMSAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSB0cmFuc2xhdGUoLTQ5MS4yMDUgLTEyMDkuMzkpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=); }

.period-picker-wrap .select-wrap.focus .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik00OTMuMiAxMjI1LjM5YTIgMiAwIDAgMS0yLTJ2LTExYTIgMiAwIDAgMSAyLTJoM3YtLjVhLjUuNSAwIDAgMSAxIDB2LjVoNHYtLjVhLjUuNSAwIDAgMSAxIDB2LjVoM2EyIDIgMCAwIDEgMiAydjExYTIgMiAwIDAgMS0yIDJ6bS0xLTJhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xdi04aC0xNHptMC0xMXYyaDE0di0yYTEgMSAwIDAgMC0xLTFoLTN2LjVhLjUuNSAwIDAgMS0xIDB2LS41aC00di41YS41LjUgMCAwIDEtMSAwdi0uNWgtM2ExIDEgMCAwIDAtMSAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSB0cmFuc2xhdGUoLTQ5MS4yMDUgLTEyMDkuMzkpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=); }

.period-picker-wrap .select-wrap.readonly .select-icon,
.period-picker-wrap .select-wrap.disabled .select-icon {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC4xOCkiIGQ9Ik00OTMuMiAxMjI1LjM5YTIgMiAwIDAgMS0yLTJ2LTExYTIgMiAwIDAgMSAyLTJoM3YtLjVhLjUuNSAwIDAgMSAxIDB2LjVoNHYtLjVhLjUuNSAwIDAgMSAxIDB2LjVoM2EyIDIgMCAwIDEgMiAydjExYTIgMiAwIDAgMS0yIDJ6bS0xLTJhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xdi04aC0xNHptMC0xMXYyaDE0di0yYTEgMSAwIDAgMC0xLTFoLTN2LjVhLjUuNSAwIDAgMS0xIDB2LS41aC00di41YS41LjUgMCAwIDEtMSAwdi0uNWgtM2ExIDEgMCAwIDAtMSAxeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSB0cmFuc2xhdGUoLTQ5MS4yMDUgLTEyMDkuMzkpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=); }

.drawer-period-picker .titlebar {
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  padding: 18px 20px; }
  .drawer-period-picker .titlebar .title {
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
    flex: 1 1 auto;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5; }
  .drawer-period-picker .titlebar .confirm-button {
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
    .drawer-period-picker .titlebar .confirm-button:active {
      color: rgba(23, 122, 255, 0.5); }
  .drawer-period-picker .titlebar .next-icon-button {
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
    .drawer-period-picker .titlebar .next-icon-button span {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden; }

.drawer-period-picker .control {
  position: relative; }

.drawer-period-picker .layer-period-picker-input-wrap {
  zoom: 1;
  padding: 0 20px 24px; }
  .drawer-period-picker .layer-period-picker-input-wrap:before, .drawer-period-picker .layer-period-picker-input-wrap:after {
    content: '';
    display: table; }
  .drawer-period-picker .layer-period-picker-input-wrap:after {
    clear: both; }
  .drawer-period-picker .layer-period-picker-input-wrap .layer-picker-input {
    float: left;
    width: calc(100% - (18px + 10px)); }
  .drawer-period-picker .layer-period-picker-input-wrap .picker-input input {
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
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:focus, .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:active {
      border: 1px solid #177aff;
      outline: none; }
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:disabled {
      color: rgba(60, 60, 67, 0.8);
      background-color: rgba(60, 60, 67, 0.02); }
      .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:disabled:active, .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:disabled:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:read-only {
      background-color: rgba(60, 60, 67, 0.02); }
      .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:read-only:active, .drawer-period-picker .layer-period-picker-input-wrap .picker-input input:read-only:focus {
        border: 1px solid rgba(60, 60, 67, 0.08); }
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input::placeholder {
      color: rgba(60, 60, 67, 0.18); }
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input[type='number'] {
      text-align: right;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none; }
      .drawer-period-picker .layer-period-picker-input-wrap .picker-input input[type='number']::-webkit-inner-spin-button, .drawer-period-picker .layer-period-picker-input-wrap .picker-input input[type='number']::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none; }
    .drawer-period-picker .layer-period-picker-input-wrap .picker-input input[type='number'] {
      text-align: left; }
  .drawer-period-picker .layer-period-picker-input-wrap .clear-button {
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
    .drawer-period-picker .layer-period-picker-input-wrap .clear-button:active {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOC4wMDEiIGhlaWdodD0iMTguMDAxIiB2aWV3Qm94PSIwIDAgMTguMDAxIDE4LjAwMSI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuNikiIGQ9Ik0xMTc5OCAxNjM3NmE5IDkgMCAxIDEgOS05IDguOTQyIDguOTQyIDAgMCAxLTkgOXptMC03LjUyMWwyLjIxNSAyLjIxNWExLjA0NiAxLjA0NiAwIDAgMCAxLjQ3NiAwIDEuMDQzIDEuMDQzIDAgMCAwIDAtMS40NzlsLTIuMjE2LTIuMjE1IDIuMjE2LTIuMjE2YTEuMDQ1IDEuMDQ1IDAgMCAwLTEuNDc2LTEuNDc5bC0yLjIxNiAyLjIyLTIuMjE5LTIuMjE2YTEuMDQzIDEuMDQzIDAgMSAwLTEuNDc2IDEuNDc2bDIuMjE1IDIuMjE2LTIuMjE1IDIuMjE1YTEuMDQ2IDEuMDQ2IDAgMCAwLS4zMDkuNzQ0IDEuMDMxIDEuMDMxIDAgMCAwIC4zMDkuNzM1IDEuMDQ2IDEuMDQ2IDAgMCAwIDEuNDc2IDBsMi4yMTgtMi4yMTV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE3ODkuMDAxIC0xNjM1Ny45OTkpIi8+Cjwvc3ZnPgo=); }
    .drawer-period-picker .layer-period-picker-input-wrap .clear-button span {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden; }

.drawer-period-picker .layer-calendar-wrap {
  padding: 0 20px; }
  .drawer-period-picker .layer-calendar-wrap .calender-header {
    position: relative;
    height: 48px;
    padding: 12px 0;
    border-radius: 14px;
    background-color: #eaf4ff; }
    .drawer-period-picker .layer-calendar-wrap .calender-header .option-button {
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
      .drawer-period-picker .layer-calendar-wrap .calender-header .option-button.selected {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMxNzdhZmYiIGQ9Ik05MjEzLjE2OSAxOTg0M0g5MjA2YTEgMSAwIDEgMSAwLTJoNy4xN2EzLjAwNSAzLjAwNSAwIDAgMSA1LjY2MyAwSDkyMjBhMSAxIDAgMSAxIDAgMmgtMS4xNjlhMyAzIDAgMCAxLTUuNjYyIDB6bTEuODMtMWExIDEgMCAxIDAgMS0xIDEgMSAwIDAgMC0uOTk5IDF6bS04LThhMyAzIDAgMSAxIDMgMyAzIDMgMCAwIDEtMi45OTktM3ptMiAwYTEgMSAwIDEgMCAxLTEgMSAxIDAgMCAwLS45OTkgMXptMy44MyAxYTIuOTU5IDIuOTU5IDAgMCAwIC4xNzQtMSAzIDMgMCAwIDAtLjE3NC0xSDkyMjBhMSAxIDAgMSAxIDAgMnptLTYuODI5IDBhMSAxIDAgMSAxIDAtMmgxLjE3MWEzIDMgMCAwIDAtLjE3NSAxIDIuOTYgMi45NiAwIDAgMCAuMTc1IDF6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTIwMSAtMTk4MjYpIi8+Cjwvc3ZnPgo=); }
      .drawer-period-picker .layer-calendar-wrap .calender-header .option-button span {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden; }
    .drawer-period-picker .layer-calendar-wrap .calender-header .header {
      zoom: 1;
      margin: 0 auto;
      width: 136px; }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header:before, .drawer-period-picker .layer-calendar-wrap .calender-header .header:after {
        content: '';
        display: table; }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header:after {
        clear: both; }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .fast {
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
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .prev,
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .next {
        border: 0;
        border-radius: 0;
        background-color: transparent;
        outline: 0;
        float: left;
        display: block;
        width: 24px;
        height: 24px;
        background-size: 24px 24px; }
        .drawer-period-picker .layer-calendar-wrap .calender-header .header .prev span,
        .drawer-period-picker .layer-calendar-wrap .calender-header .header .next span {
          position: absolute;
          clip: rect(0 0 0 0);
          width: 1px;
          height: 1px;
          margin: -1px;
          overflow: hidden; }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .prev {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik03IDBhMSAxIDAgMCAwLS43MDcuMjkzbC01IDVhMSAxIDAgMCAwIDEuNDE0IDEuNDE0TDcgMi40MTRsNC4yOTMgNC4yOTNhMSAxIDAgMCAwIDEuNDE0LTEuNDE0bC01LTVBMSAxIDAgMCAwIDcgMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEzLjUgNS41KSIvPgo8L3N2Zz4K); }
        .drawer-period-picker .layer-calendar-wrap .calender-header .header .prev:active {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsMC43KSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTUgNWExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw0LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTUtNUExIDEgMCAwIDAgNyAwIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMTMuNSA1LjUpIi8+Cjwvc3ZnPgo=); }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .next {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik03IDBhMSAxIDAgMCAwLS43MDcuMjkzbC01IDVhMSAxIDAgMCAwIDEuNDE0IDEuNDE0TDcgMi40MTRsNC4yOTMgNC4yOTNhMSAxIDAgMCAwIDEuNDE0LTEuNDE0bC01LTVBMSAxIDAgMCAwIDcgMCIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDEwLjUpIi8+Cjwvc3ZnPgo=); }
        .drawer-period-picker .layer-calendar-wrap .calender-header .header .next:active {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsMC43KSIgZD0iTTcgMGExIDEgMCAwIDAtLjcwNy4yOTNsLTUgNWExIDEgMCAwIDAgMS40MTQgMS40MTRMNyAyLjQxNGw0LjI5MyA0LjI5M2ExIDEgMCAwIDAgMS40MTQtMS40MTRsLTUtNUExIDEgMCAwIDAgNyAwIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA1LjUgMTAuNSkiLz4KPC9zdmc+Cg==); }
      .drawer-period-picker .layer-calendar-wrap .calender-header .header .calendar-spinner-title {
        display: block;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        font-family: "Roboto";
        text-align: center;
        line-height: 1.5; }
    .drawer-period-picker .layer-calendar-wrap .calender-header .today-button {
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

.drawer-period-picker .calendar-content {
  overflow: hidden;
  padding-top: 16px; }
  .drawer-period-picker .calendar-content .calendar-flip-wrap {
    display: flex;
    min-width: 100%;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0, 0, 0.25, 1);
    transition-duration: 0ms;
    transform: translate3d(-33.33333%, 0px, 0px);
    width: 300%; }
  .drawer-period-picker .calendar-content .calendar-date {
    display: grid;
    grid-template-columns: repeat(7, minmax(36px, 1fr));
    grid-template-rows: 36px;
    grid-auto-rows: 36px;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    flex-shrink: 0;
    overflow: auto; }
    .drawer-period-picker .calendar-content .calendar-date .day-name {
      position: relative;
      color: rgba(60, 60, 67, 0.8);
      border-bottom: 1px solid rgba(60, 60, 67, 0.18);
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: normal; }
      .drawer-period-picker .calendar-content .calendar-date .day-name:after {
        content: '';
        position: absolute;
        bottom: -1px;
        right: -2px;
        width: 2px;
        height: 1px;
        background-color: rgba(60, 60, 67, 0.18); }
      .drawer-period-picker .calendar-content .calendar-date .day-name:last-of-type:after {
        display: none; }
    .drawer-period-picker .calendar-content .calendar-date .day {
      position: relative;
      z-index: 1;
      color: #111111;
      font-size: 14px;
      text-align: center; }
      .drawer-period-picker .calendar-content .calendar-date .day span {
        display: block;
        max-width: 36px;
        height: 36px;
        margin: 0 auto;
        line-height: 36px;
        text-indent: -1px;
        pointer-events: none; }
      .drawer-period-picker .calendar-content .calendar-date .day:active span {
        border-radius: 100%;
        border-style: none;
        background-color: rgba(60, 60, 67, 0.18);
        line-height: 36px; }
      .drawer-period-picker .calendar-content .calendar-date .day.day-disabled {
        color: rgba(60, 60, 67, 0.3); }
      .drawer-period-picker .calendar-content .calendar-date .day.weekend {
        color: rgba(252, 76, 96, 0.8); }
      .drawer-period-picker .calendar-content .calendar-date .day.today span {
        border: 2px solid rgba(60, 60, 67, 0.18);
        border-radius: 100%;
        line-height: 32px; }
      .drawer-period-picker .calendar-content .calendar-date .day.select span, .drawer-period-picker .calendar-content .calendar-date .day.select.today span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-date .day.select-start span, .drawer-period-picker .calendar-content .calendar-date .day.select-end span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-date .day.select-start:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        right: -2px;
        width: calc(50% + 2px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-date .day.select-start:nth-child(7n):after {
        right: 0; }
      .drawer-period-picker .calendar-content .calendar-date .day.select-end:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: calc(50% + 2px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-date .day.select-period {
        position: relative;
        background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-date .day.select-period:after {
          content: '';
          position: absolute;
          top: 0;
          right: -2px;
          width: 2px;
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-date .day.select-period:nth-child(7n):after {
          display: none; }
  .drawer-period-picker .calendar-content .calendar-month {
    display: grid;
    grid-template-columns: repeat(4, minmax(60px, 1fr));
    grid-template-rows: 60px;
    grid-auto-rows: 60px;
    overflow: auto;
    grid-column-gap: 11px;
    grid-row-gap: 2px;
    width: 100%; }
    .drawer-period-picker .calendar-content .calendar-month .month {
      position: relative;
      z-index: 1;
      color: #111111;
      font-size: 14px;
      text-align: center; }
      .drawer-period-picker .calendar-content .calendar-month .month span {
        margin: 0 auto;
        display: block;
        max-width: 60px;
        height: 60px;
        line-height: 60px; }
      .drawer-period-picker .calendar-content .calendar-month .month:active span {
        background-color: rgba(60, 60, 67, 0.18);
        border-style: none;
        border-radius: 100%; }
      .drawer-period-picker .calendar-content .calendar-month .month.select span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-month .month.month-disabled {
        color: rgba(60, 60, 67, 0.3); }
      .drawer-period-picker .calendar-content .calendar-month .month.select-start span, .drawer-period-picker .calendar-content .calendar-month .month.select-end span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-month .month.select-start:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        right: -11px;
        width: calc(50% + 11px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-month .month.select-start:nth-child(7n):after {
        right: 0; }
      .drawer-period-picker .calendar-content .calendar-month .month.select-end:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: calc(50% + 11px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-month .month.select-period {
        position: relative;
        background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-month .month.select-period:after {
          content: '';
          position: absolute;
          top: 0;
          right: -11px;
          width: 11px;
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-month .month.select-period:nth-child(7n):after {
          display: none; }
  .drawer-period-picker .calendar-content .calendar-year {
    display: grid;
    grid-template-columns: repeat(4, minmax(60px, 1fr));
    grid-template-rows: 60px;
    grid-auto-rows: 60px;
    overflow: auto;
    grid-column-gap: 11px;
    grid-row-gap: 2px;
    width: 100%; }
    .drawer-period-picker .calendar-content .calendar-year .year {
      position: relative;
      z-index: 1;
      color: #111111;
      font-size: 14px;
      text-align: center; }
      .drawer-period-picker .calendar-content .calendar-year .year span {
        margin: 0 auto;
        display: block;
        max-width: 60px;
        height: 60px;
        line-height: 60px; }
      .drawer-period-picker .calendar-content .calendar-year .year:active span {
        background-color: rgba(60, 60, 67, 0.18);
        border-style: none;
        border-radius: 100%; }
      .drawer-period-picker .calendar-content .calendar-year .year.select span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-year .year.select:active span {
        background-color: #0e4c9e; }
      .drawer-period-picker .calendar-content .calendar-year .year.year-disabled {
        color: rgba(60, 60, 67, 0.3); }
      .drawer-period-picker .calendar-content .calendar-year .year.select-start span, .drawer-period-picker .calendar-content .calendar-year .year.select-end span {
        background-color: #177aff;
        border-radius: 100%;
        color: #ffffff; }
      .drawer-period-picker .calendar-content .calendar-year .year.select-start:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        right: -11px;
        width: calc(50% + 11px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-year .year.select-start:nth-child(7n):after {
        right: 0; }
      .drawer-period-picker .calendar-content .calendar-year .year.select-end:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: calc(50% + 11px);
        height: 100%;
        background-color: rgba(23, 122, 255, 0.2); }
      .drawer-period-picker .calendar-content .calendar-year .year.select-period {
        position: relative;
        background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-year .year.select-period:after {
          content: '';
          position: absolute;
          top: 0;
          right: -11px;
          width: 11px;
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-year .year.select-period:nth-child(7n):after {
          display: none; }
  .drawer-period-picker .calendar-content .calendar-date,
  .drawer-period-picker .calendar-content .calendar-month,
  .drawer-period-picker .calendar-content .calendar-year {
    width: 33.33333%;
    min-width: 33.33333%;
    transform: translateZ(0px); }
  .drawer-period-picker .calendar-content .calendar-period-wrap {
    position: relative; }
    .drawer-period-picker .calendar-content .calendar-period-wrap .period {
      margin-bottom: 16px;
      border-radius: 10px;
      background-color: rgba(60, 60, 67, 0.04); }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period:last-of-type {
        margin-bottom: 0; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period ul {
        display: flex;
        flex-wrap: nowrap; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period ul li button {
          border: 0;
          border-radius: 0;
          background-color: transparent;
          outline: 0;
          width: 100%;
          height: 40px;
          padding: 9px 0;
          color: #111111;
          font-size: 14px;
          text-align: center;
          line-height: 1.57; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period ul li.select button {
          color: #ffffff;
          border-radius: 10px;
          background-color: #177aff;
          font-size: 15px;
          line-height: 1.47; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-week li {
        flex: 0 0 25%; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-quarter li {
        flex: 0 0 25%; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-half li {
        flex: 0 0 33.333%; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul {
        display: grid;
        grid-template-columns: repeat(6, minmax(36px, 1fr));
        grid-template-rows: 36px;
        grid-auto-rows: 36px;
        grid-column-gap: 8px;
        grid-row-gap: 8px;
        overflow: auto;
        width: 100%;
        padding: 8px; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li button {
          width: 100%;
          height: 100%;
          padding: 0; }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li button span {
            display: block;
            max-width: 36px;
            height: 36px;
            line-height: 36px;
            margin: 0 auto; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select {
          position: relative; }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select button {
            border-radius: 0;
            background-color: transparent; }
            .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select button span {
              color: #ffffff;
              border-radius: 100%;
              background-color: #177aff;
              font-size: 14px; }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select.select-start:after {
            content: '';
            position: absolute;
            z-index: -1;
            top: 0;
            right: -8px;
            width: calc(50% + 8px);
            height: 100%;
            background-color: rgba(23, 122, 255, 0.2); }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select.select-end:after {
            content: '';
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-start span, .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-end span {
          background-color: #177aff;
          border-radius: 100%;
          color: #ffffff; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-start:after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          right: -8px;
          width: calc(50% + 8px);
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-start:nth-child(7n):after {
          right: 0; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-end:after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: calc(50% + 8px);
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-period {
          position: relative;
          background-color: rgba(23, 122, 255, 0.2); }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-period:after {
            content: '';
            position: absolute;
            top: 0;
            right: -8px;
            width: 8px;
            height: 100%;
            background-color: rgba(23, 122, 255, 0.2); }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-period:nth-child(7n):after {
            display: none; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li.select-period:nth-child(6n):after {
          display: none; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li:nth-child(7).select-start:after {
          right: -8px; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li:nth-child(7).select-period:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: -8px;
          width: 8px;
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li:active button {
          background-color: transparent; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period.period-month ul li:active span {
          border-radius: 100%;
          background-color: rgba(60, 60, 67, 0.18); }
    .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks {
      position: relative; }
      .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul {
        display: grid;
        grid-template-columns: repeat(7, minmax(36px, 1fr));
        grid-template-rows: 36px;
        grid-auto-rows: 36px;
        grid-column-gap: 2px;
        grid-row-gap: 0;
        overflow: auto;
        width: 100%; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li button {
          border: 0;
          border-radius: 0;
          background-color: transparent;
          outline: 0;
          width: 100%;
          height: 100%;
          padding: 0; }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li button span {
            display: block;
            max-width: 36px;
            height: 36px;
            margin: 0 auto;
            color: #111111;
            font-size: 14px;
            line-height: 36px; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select {
          position: relative; }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select span {
            color: #ffffff;
            border-radius: 100%;
            background-color: #177aff; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-start span, .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-end span {
          background-color: #177aff;
          border-radius: 100%;
          color: #ffffff; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-start:after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          right: -2px;
          width: calc(50% + 2px);
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-start:nth-child(7n):after {
          right: 0; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-end:after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: calc(50% + 2px);
          height: 100%;
          background-color: rgba(23, 122, 255, 0.2); }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-period {
          position: relative;
          background-color: rgba(23, 122, 255, 0.2); }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-period:after {
            content: '';
            position: absolute;
            top: 0;
            right: -2px;
            width: 2px;
            height: 100%;
            background-color: rgba(23, 122, 255, 0.2); }
          .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li.select-period:nth-child(7n):after {
            display: none; }
        .drawer-period-picker .calendar-content .calendar-period-wrap .period-weeks ul li:active button span {
          border-radius: 100%;
          background-color: rgba(60, 60, 67, 0.18); }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kcGlja2VyLnNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJpb2RwaWNrZXIuc2Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLGVBQWUsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0Ftd0JqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgY3NzYCoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7IH1cbiAgKiBodG1sIHtcbiAgICBmb250LXNpemU6IDE1cHg7IH1cbiAgKiB1bCxcbiAgKiBsaSxcbiAgKiBvbCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxuICAqIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxuICAqIGltZyB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4ucGVyaW9kLXBpY2tlci13cmFwIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC42KTsgfVxuICA6aG9zdChbcmVxdWlyZWRdKSAucGVyaW9kLXBpY2tlci13cmFwIGxhYmVsOmFmdGVyIHtcbiAgICBjb250ZW50OiAnKic7XG4gICAgZGlzcGxheTogaW5saW5lO1xuICAgIGNvbG9yOiAjZmM0YzYwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMThweDsgfVxuXG4ucGVyaW9kLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiA2cHggMTBweDtcbiAgY29sb3I6ICMxMTExMTE7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS40NzsgfVxuICAucGVyaW9kLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcCAuc2VsZWN0LXNoYXBlIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBmbGV4OiAxIDEgYXV0bztcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIDI4cHgpOyB9XG4gICAgLnBlcmlvZC1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAgLnNlbGVjdC1zaGFwZSAuc2VsZWN0LWlucHV0IHtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxuICAgIC5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3Qtc2hhcGUgLnNlbGVjdC1tdWx0aSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7IH1cbiAgICAgIC5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3Qtc2hhcGUgLnNlbGVjdC1tdWx0aSBzdHJvbmcge1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsOyB9XG4gIC5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3QtaWNvbiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZmxleDogMCAwIDE4cHg7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogMThweCAxOHB4O1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7IH1cbiAgLnBlcmlvZC1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAuZm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzE3N2FmZjsgfVxuICAucGVyaW9kLXBpY2tlci13cmFwIC5zZWxlY3Qtd3JhcC5yZWFkb25seSwgLnBlcmlvZC1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAuZGlzYWJsZWQge1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMDIpOyB9XG4gIC5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwLmRpc2FibGVkIHtcbiAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjYpOyB9XG5cbi5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwIC5zZWxlY3QtaWNvbiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQ0lnYUdWcFoyaDBQU0l4T0NJZ2RtbGxkMEp2ZUQwaU1DQXdJREU0SURFNElqNEtJQ0FnSUR4blBnb2dJQ0FnSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU01TnprNVlUZ2lJR1E5SWswME9UTXVNaUF4TWpJMUxqTTVZVElnTWlBd0lEQWdNUzB5TFRKMkxURXhZVElnTWlBd0lEQWdNU0F5TFRKb00zWXRMalZoTGpVdU5TQXdJREFnTVNBeElEQjJMalZvTkhZdExqVmhMalV1TlNBd0lEQWdNU0F4SURCMkxqVm9NMkV5SURJZ01DQXdJREVnTWlBeWRqRXhZVElnTWlBd0lEQWdNUzB5SURKNmJTMHhMVEpoTVNBeElEQWdNQ0F3SURFZ01XZ3hNbUV4SURFZ01DQXdJREFnTVMweGRpMDRhQzB4TkhwdE1DMHhNWFl5YURFMGRpMHlZVEVnTVNBd0lEQWdNQzB4TFRGb0xUTjJMalZoTGpVdU5TQXdJREFnTVMweElEQjJMUzQxYUMwMGRpNDFZUzQxTGpVZ01DQXdJREV0TVNBd2RpMHVOV2d0TTJFeElERWdNQ0F3SURBdE1TQXhlaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb01TQXhLU0IwY21GdWMyeGhkR1VvTFRRNU1TNHlNRFVnTFRFeU1Ea3VNemtwSWk4K0NpQWdJQ0E4TDJjK0Nqd3ZjM1puUGdvPSk7IH1cblxuLnBlcmlvZC1waWNrZXItd3JhcCAuc2VsZWN0LXdyYXAuZm9jdXMgLnNlbGVjdC1pY29uIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHhuUGdvZ0lDQWdJQ0FnSUR4d1lYUm9JR1pwYkd3OUlpTXpNek1pSUdROUlrMDBPVE11TWlBeE1qSTFMak01WVRJZ01pQXdJREFnTVMweUxUSjJMVEV4WVRJZ01pQXdJREFnTVNBeUxUSm9NM1l0TGpWaExqVXVOU0F3SURBZ01TQXhJREIyTGpWb05IWXRMalZoTGpVdU5TQXdJREFnTVNBeElEQjJMalZvTTJFeUlESWdNQ0F3SURFZ01pQXlkakV4WVRJZ01pQXdJREFnTVMweUlESjZiUzB4TFRKaE1TQXhJREFnTUNBd0lERWdNV2d4TW1FeElERWdNQ0F3SURBZ01TMHhkaTA0YUMweE5IcHRNQzB4TVhZeWFERTBkaTB5WVRFZ01TQXdJREFnTUMweExURm9MVE4yTGpWaExqVXVOU0F3SURBZ01TMHhJREIyTFM0MWFDMDBkaTQxWVM0MUxqVWdNQ0F3SURFdE1TQXdkaTB1TldndE0yRXhJREVnTUNBd0lEQXRNU0F4ZWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9NU0F4S1NCMGNtRnVjMnhoZEdVb0xUUTVNUzR5TURVZ0xURXlNRGt1TXprcElpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz0pOyB9XG5cbi5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwLnJlYWRvbmx5IC5zZWxlY3QtaWNvbixcbi5wZXJpb2QtcGlja2VyLXdyYXAgLnNlbGVjdC13cmFwLmRpc2FibGVkIC5zZWxlY3QtaWNvbiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQ0lnYUdWcFoyaDBQU0l4T0NJZ2RtbGxkMEp2ZUQwaU1DQXdJREU0SURFNElqNEtJQ0FnSUR4blBnb2dJQ0FnSUNBZ0lEeHdZWFJvSUdacGJHdzlJbkpuWW1Fb05qQXNOakFzTmpjc01DNHhPQ2tpSUdROUlrMDBPVE11TWlBeE1qSTFMak01WVRJZ01pQXdJREFnTVMweUxUSjJMVEV4WVRJZ01pQXdJREFnTVNBeUxUSm9NM1l0TGpWaExqVXVOU0F3SURBZ01TQXhJREIyTGpWb05IWXRMalZoTGpVdU5TQXdJREFnTVNBeElEQjJMalZvTTJFeUlESWdNQ0F3SURFZ01pQXlkakV4WVRJZ01pQXdJREFnTVMweUlESjZiUzB4TFRKaE1TQXhJREFnTUNBd0lERWdNV2d4TW1FeElERWdNQ0F3SURBZ01TMHhkaTA0YUMweE5IcHRNQzB4TVhZeWFERTBkaTB5WVRFZ01TQXdJREFnTUMweExURm9MVE4yTGpWaExqVXVOU0F3SURBZ01TMHhJREIyTFM0MWFDMDBkaTQxWVM0MUxqVWdNQ0F3SURFdE1TQXdkaTB1TldndE0yRXhJREVnTUNBd0lEQXRNU0F4ZWlJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9NU0F4S1NCMGNtRnVjMnhoZEdVb0xUUTVNUzR5TURVZ0xURXlNRGt1TXprcElpOCtDaUFnSUNBOEwyYytDand2YzNablBnbz0pOyB9XG5cbi5kcmF3ZXItcGVyaW9kLXBpY2tlciAudGl0bGViYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWZsb3c6IG5vd3JhcDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMThweCAyMHB4OyB9XG4gIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAudGl0bGViYXIgLnRpdGxlIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgd29yZC13cmFwOiBub3JtYWw7XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC50aXRsZWJhciAuY29uZmlybS1idXR0b24ge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmU6IDA7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIGNvbG9yOiAjMTc3YWZmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBsaW5lLWhlaWdodDogMjBweDsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAudGl0bGViYXIgLmNvbmZpcm0tYnV0dG9uOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuNSk7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC50aXRsZWJhciAubmV4dC1pY29uLWJ1dHRvbiB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgb3V0bGluZTogMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmbGV4OiAwIDAgMjRweDtcbiAgICB3aWR0aDogMjRweDtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DSWdhR1ZwWjJoMFBTSXhPQ0lnZG1sbGQwSnZlRDBpTUNBd0lERTRJREU0SWo0S0lDQWdJRHhuTHo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OakFzTmpBc05qY3NNQzQ0S1NJZ1pEMGlUVGsxTmpVdU16ZzVJRGN4TXpNdU5qZ3pkaTB4TVdFdU5TNDFJREFnTUNBeElERWdNSFl4TVdFdU5TNDFJREFnTUNBeExURWdNSHB0TFRjdU5qUTJMUzR5WVM0MUxqVWdNQ0F3SURFZ01DMHVOekE0YkRRdU1TMDBMakZvTFRrdU9UUTVZUzQxTGpVZ01DQXdJREVnTUMweGFERXdiQzAwTGpFME5pMDBMakUwTm1FdU5TNDFJREFnTUNBeElDNDNNRGd0TGpjd05tdzBMamsxTVNBMExqazBPR0V1TlM0MUlEQWdNQ0F4SUM0eE5EVXVNemcyTGpVdU5TQXdJREFnTVMwdU1UUTNMak0zTTJ3dE5DNDVOU0EwTGprMU1XRXVORGswTGpRNU5DQXdJREFnTVMwdU16VXpMakUwTmk0MUxqVWdNQ0F3SURFdExqTTJMUzR4TkRGNklpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0T1RVMU1DNHpPVEVnTFRjeE1Ua3VNVGd5S1NJdlBnbzhMM04yWno0Syk7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE4cHggMThweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7IH1cbiAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLnRpdGxlYmFyIC5uZXh0LWljb24tYnV0dG9uIHNwYW4ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgIHdpZHRoOiAxcHg7XG4gICAgICBoZWlnaHQ6IDFweDtcbiAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cblxuLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jb250cm9sIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIHtcbiAgem9vbTogMTtcbiAgcGFkZGluZzogMCAyMHB4IDI0cHg7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXA6YmVmb3JlLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcDphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgZGlzcGxheTogdGFibGU7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXA6YWZ0ZXIge1xuICAgIGNsZWFyOiBib3RoOyB9XG4gIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5sYXllci1waWNrZXItaW5wdXQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAoMThweCArIDEwcHgpKTsgfVxuICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHBhZGRpbmc6IDdweCAxMHB4O1xuICAgIGNvbG9yOiAjMTExMTExO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjAsIDYwLCA2NywgMC4wOCk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ3O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cbiAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmZvY3VzLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmFjdGl2ZSB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTc3YWZmO1xuICAgICAgb3V0bGluZTogbm9uZTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXQ6ZGlzYWJsZWQge1xuICAgICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC44KTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wMik7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXQ6ZGlzYWJsZWQ6YWN0aXZlLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0OmRpc2FibGVkOmZvY3VzIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjA4KTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXQ6cmVhZC1vbmx5IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4wMik7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5waWNrZXItaW5wdXQgaW5wdXQ6cmVhZC1vbmx5OmFjdGl2ZSwgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDpyZWFkLW9ubHk6Zm9jdXMge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMDgpOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dDo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4xOCk7IH1cbiAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLXBlcmlvZC1waWNrZXItaW5wdXQtd3JhcCAucGlja2VyLWlucHV0IGlucHV0W3R5cGU9J251bWJlciddIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLnBpY2tlci1pbnB1dCBpbnB1dFt0eXBlPSdudW1iZXInXSB7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XG4gIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5jbGVhci1idXR0b24ge1xuICAgIGJvcmRlcjogMDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIG91dGxpbmU6IDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHdpZHRoOiAxOHB4O1xuICAgIGhlaWdodDogMThweDtcbiAgICBtYXJnaW4tdG9wOiA5cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiAxOHB4IDE4cHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeE9DNHdNRElpSUdobGFXZG9kRDBpTVRndU1EQXhJaUIyYVdWM1FtOTRQU0l3SURBZ01UZ3VNREF5SURFNExqQXdNU0krQ2lBZ0lDQThjR0YwYUNCbWFXeHNQU0p5WjJKaEtEWXdMRFl3TERZM0xEQXVNeWtpSUdROUlrMHhNVGM1T0NBeE5qTTNObUU1SURrZ01DQXhJREVnT1MwNUlEZ3VPVFF5SURndU9UUXlJREFnTUNBeExUa2dPWHB0TUMwM0xqVXlNV3d5TGpJeE5TQXlMakl4TldFeExqQTBOaUF4TGpBME5pQXdJREFnTUNBeExqUTNOaUF3SURFdU1EUXpJREV1TURReklEQWdNQ0F3SURBdE1TNDBOemxzTFRJdU1qRTJMVEl1TWpFMUlESXVNakUyTFRJdU1qRTJZVEV1TURRMUlERXVNRFExSURBZ01DQXdMVEV1TkRjMkxURXVORGM1YkMweUxqSXhOaUF5TGpJeUxUSXVNakU1TFRJdU1qRTJZVEV1TURReklERXVNRFF6SURBZ01TQXdMVEV1TkRjMklERXVORGMyYkRJdU1qRTFJREl1TWpFMkxUSXVNakUxSURJdU1qRTFZVEV1TURRMklERXVNRFEySURBZ01DQXdMUzR6TURrdU56UTBJREV1TURNeElERXVNRE14SURBZ01DQXdJQzR6TURrdU56TTFJREV1TURRMklERXVNRFEySURBZ01DQXdJREV1TkRjMklEQnNNaTR5TVRndE1pNHlNVFY2SWlCMGNtRnVjMlp2Y20wOUluUnlZVzV6YkdGMFpTZ3RNVEUzT0RrZ0xURTJNelUzTGprNU9Ta2lMejRLUEM5emRtYytDZz09KTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItcGVyaW9kLXBpY2tlci1pbnB1dC13cmFwIC5jbGVhci1idXR0b246YWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhPQzR3TURFaUlHaGxhV2RvZEQwaU1UZ3VNREF4SWlCMmFXVjNRbTk0UFNJd0lEQWdNVGd1TURBeElERTRMakF3TVNJK0NpQWdJQ0E4Y0dGMGFDQm1hV3hzUFNKeVoySmhLRFl3TERZd0xEWTNMREF1TmlraUlHUTlJazB4TVRjNU9DQXhOak0zTm1FNUlEa2dNQ0F4SURFZ09TMDVJRGd1T1RReUlEZ3VPVFF5SURBZ01DQXhMVGtnT1hwdE1DMDNMalV5TVd3eUxqSXhOU0F5TGpJeE5XRXhMakEwTmlBeExqQTBOaUF3SURBZ01DQXhMalEzTmlBd0lERXVNRFF6SURFdU1EUXpJREFnTUNBd0lEQXRNUzQwTnpsc0xUSXVNakUyTFRJdU1qRTFJREl1TWpFMkxUSXVNakUyWVRFdU1EUTFJREV1TURRMUlEQWdNQ0F3TFRFdU5EYzJMVEV1TkRjNWJDMHlMakl4TmlBeUxqSXlMVEl1TWpFNUxUSXVNakUyWVRFdU1EUXpJREV1TURReklEQWdNU0F3TFRFdU5EYzJJREV1TkRjMmJESXVNakUxSURJdU1qRTJMVEl1TWpFMUlESXVNakUxWVRFdU1EUTJJREV1TURRMklEQWdNQ0F3TFM0ek1Ea3VOelEwSURFdU1ETXhJREV1TURNeElEQWdNQ0F3SUM0ek1Ea3VOek0xSURFdU1EUTJJREV1TURRMklEQWdNQ0F3SURFdU5EYzJJREJzTWk0eU1UZ3RNaTR5TVRWNklpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0TVRFM09Ea3VNREF4SUMweE5qTTFOeTQ1T1RrcElpOCtDand2YzNablBnbz0pOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1wZXJpb2QtcGlja2VyLWlucHV0LXdyYXAgLmNsZWFyLWJ1dHRvbiBzcGFuIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICBtYXJnaW46IC0xcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbi5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCB7XG4gIHBhZGRpbmc6IDAgMjBweDsgfVxuICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogNDhweDtcbiAgICBwYWRkaW5nOiAxMnB4IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWFmNGZmOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLm9wdGlvbi1idXR0b24ge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMTJweDtcbiAgICAgIGxlZnQ6IDEycHg7XG4gICAgICB3aWR0aDogMjRweDtcbiAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOQ0lnYUdWcFoyaDBQU0l5TkNJZ2RtbGxkMEp2ZUQwaU1DQXdJREkwSURJMElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUluSm5ZbUVvTmpBc05qQXNOamNzTUM0NEtTSWdaRDBpVFRreU1UTXVNVFk1SURFNU9EUXpTRGt5TURaaE1TQXhJREFnTVNBeElEQXRNbWczTGpFM1lUTXVNREExSURNdU1EQTFJREFnTUNBeElEVXVOall6SURCSU9USXlNR0V4SURFZ01DQXhJREVnTUNBeWFDMHhMakUyT1dFeklETWdNQ0F3SURFdE5TNDJOaklnTUhwdE1TNDRNeTB4WVRFZ01TQXdJREVnTUNBeExURWdNU0F4SURBZ01DQXdMUzQ1T1RrZ01YcHRMVGd0T0dFeklETWdNQ0F4SURFZ015QXpJRE1nTXlBd0lEQWdNUzB5TGprNU9TMHplbTB5SURCaE1TQXhJREFnTVNBd0lERXRNU0F4SURFZ01DQXdJREF0TGprNU9TQXhlbTB6TGpneklERmhNaTQ1TlRrZ01pNDVOVGtnTUNBd0lEQWdMakUzTkMweElETWdNeUF3SURBZ01DMHVNVGMwTFRGSU9USXlNR0V4SURFZ01DQXhJREVnTUNBeWVtMHROaTQ0TWprZ01HRXhJREVnTUNBeElERWdNQzB5YURFdU1UY3hZVE1nTXlBd0lEQWdNQzB1TVRjMUlERWdNaTQ1TmlBeUxqazJJREFnTUNBd0lDNHhOelVnTVhvaUlIUnlZVzV6Wm05eWJUMGlkSEpoYm5Oc1lYUmxLQzA1TWpBeElDMHhPVGd5TmlraUx6NEtQQzl6ZG1jK0NnPT0pO1xuICAgICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5vcHRpb24tYnV0dG9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5DSWdhR1ZwWjJoMFBTSXlOQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTBJREkwSWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SWlNeE56ZGhabVlpSUdROUlrMDVNakV6TGpFMk9TQXhPVGcwTTBnNU1qQTJZVEVnTVNBd0lERWdNU0F3TFRKb055NHhOMkV6TGpBd05TQXpMakF3TlNBd0lEQWdNU0ExTGpZMk15QXdTRGt5TWpCaE1TQXhJREFnTVNBeElEQWdNbWd0TVM0eE5qbGhNeUF6SURBZ01DQXhMVFV1TmpZeUlEQjZiVEV1T0RNdE1XRXhJREVnTUNBeElEQWdNUzB4SURFZ01TQXdJREFnTUMwdU9UazVJREY2YlMwNExUaGhNeUF6SURBZ01TQXhJRE1nTXlBeklETWdNQ0F3SURFdE1pNDVPVGt0TTNwdE1pQXdZVEVnTVNBd0lERWdNQ0F4TFRFZ01TQXhJREFnTUNBd0xTNDVPVGtnTVhwdE15NDRNeUF4WVRJdU9UVTVJREl1T1RVNUlEQWdNQ0F3SUM0eE56UXRNU0F6SURNZ01DQXdJREF0TGpFM05DMHhTRGt5TWpCaE1TQXhJREFnTVNBeElEQWdNbnB0TFRZdU9ESTVJREJoTVNBeElEQWdNU0F4SURBdE1tZ3hMakUzTVdFeklETWdNQ0F3SURBdExqRTNOU0F4SURJdU9UWWdNaTQ1TmlBd0lEQWdNQ0F1TVRjMUlERjZJaUIwY21GdWMyWnZjbTA5SW5SeVlXNXpiR0YwWlNndE9USXdNU0F0TVRrNE1qWXBJaTgrQ2p3dmMzWm5QZ289KTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLm9wdGlvbi1idXR0b24gc3BhbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIge1xuICAgICAgem9vbTogMTtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgd2lkdGg6IDEzNnB4OyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyOmJlZm9yZSwgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlcjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlcjphZnRlciB7XG4gICAgICAgIGNsZWFyOiBib3RoOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5mYXN0IHtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIHdpZHRoOiA4OHB4O1xuICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAucHJldixcbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIgLm5leHQge1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiAyNHB4O1xuICAgICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4OyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIgLnByZXYgc3BhbixcbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAubmV4dCBzcGFuIHtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcbiAgICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5wcmV2IHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5DSWdhR1ZwWjJoMFBTSXlOQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTBJREkwSWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SWlNek16TWlJR1E5SWswM0lEQmhNU0F4SURBZ01DQXdMUzQzTURjdU1qa3piQzAxSURWaE1TQXhJREFnTUNBd0lERXVOREUwSURFdU5ERTBURGNnTWk0ME1UUnNOQzR5T1RNZ05DNHlPVE5oTVNBeElEQWdNQ0F3SURFdU5ERTBMVEV1TkRFMGJDMDFMVFZCTVNBeElEQWdNQ0F3SURjZ01DSWdkSEpoYm5ObWIzSnRQU0p5YjNSaGRHVW9MVGt3SURFekxqVWdOUzQxS1NJdlBnbzhMM04yWno0Syk7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAucHJldjphY3RpdmUge1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXlOQ0lnYUdWcFoyaDBQU0l5TkNJZ2RtbGxkMEp2ZUQwaU1DQXdJREkwSURJMElqNEtJQ0FnSUR4d1lYUm9JR1pwYkd3OUluSm5ZbUVvTlRFc05URXNOVEVzTUM0M0tTSWdaRDBpVFRjZ01HRXhJREVnTUNBd0lEQXRMamN3Tnk0eU9UTnNMVFVnTldFeElERWdNQ0F3SURBZ01TNDBNVFFnTVM0ME1UUk1OeUF5TGpReE5HdzBMakk1TXlBMExqSTVNMkV4SURFZ01DQXdJREFnTVM0ME1UUXRNUzQwTVRSc0xUVXROVUV4SURFZ01DQXdJREFnTnlBd0lpQjBjbUZ1YzJadmNtMDlJbkp2ZEdGMFpTZ3RPVEFnTVRNdU5TQTFMalVwSWk4K0Nqd3ZjM1puUGdvPSk7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC5oZWFkZXIgLm5leHQge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l5TkNJZ2FHVnBaMmgwUFNJeU5DSWdkbWxsZDBKdmVEMGlNQ0F3SURJMElESTBJajRLSUNBZ0lEeHdZWFJvSUdacGJHdzlJaU16TXpNaUlHUTlJazAzSURCaE1TQXhJREFnTUNBd0xTNDNNRGN1TWpremJDMDFJRFZoTVNBeElEQWdNQ0F3SURFdU5ERTBJREV1TkRFMFREY2dNaTQwTVRSc05DNHlPVE1nTkM0eU9UTmhNU0F4SURBZ01DQXdJREV1TkRFMExURXVOREUwYkMwMUxUVkJNU0F4SURBZ01DQXdJRGNnTUNJZ2RISmhibk5tYjNKdFBTSnliM1JoZEdVb09UQWdOUzQxSURFd0xqVXBJaTgrQ2p3dmMzWm5QZ289KTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmxheWVyLWNhbGVuZGFyLXdyYXAgLmNhbGVuZGVyLWhlYWRlciAuaGVhZGVyIC5uZXh0OmFjdGl2ZSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5DSWdhR1ZwWjJoMFBTSXlOQ0lnZG1sbGQwSnZlRDBpTUNBd0lESTBJREkwSWo0S0lDQWdJRHh3WVhSb0lHWnBiR3c5SW5KblltRW9OVEVzTlRFc05URXNNQzQzS1NJZ1pEMGlUVGNnTUdFeElERWdNQ0F3SURBdExqY3dOeTR5T1ROc0xUVWdOV0V4SURFZ01DQXdJREFnTVM0ME1UUWdNUzQwTVRSTU55QXlMalF4Tkd3MExqSTVNeUEwTGpJNU0yRXhJREVnTUNBd0lEQWdNUzQwTVRRdE1TNDBNVFJzTFRVdE5VRXhJREVnTUNBd0lEQWdOeUF3SWlCMGNtRnVjMlp2Y20wOUluSnZkR0YwWlNnNU1DQTFMalVnTVRBdU5Ta2lMejRLUEM5emRtYytDZz09KTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5sYXllci1jYWxlbmRhci13cmFwIC5jYWxlbmRlci1oZWFkZXIgLmhlYWRlciAuY2FsZW5kYXItc3Bpbm5lci10aXRsZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAubGF5ZXItY2FsZW5kYXItd3JhcCAuY2FsZW5kZXItaGVhZGVyIC50b2RheS1idXR0b24ge1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMTBweDtcbiAgICAgIHJpZ2h0OiAxMnB4O1xuICAgICAgcGFkZGluZzogM3B4IDlweDtcbiAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU0OyB9XG5cbi5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmctdG9wOiAxNnB4OyB9XG4gIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZmxpcC13cmFwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLCAwLCAwLjI1LCAxKTtcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwbXM7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMzMuMzMzMzMlLCAwcHgsIDBweCk7XG4gICAgd2lkdGg6IDMwMCU7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIG1pbm1heCgzNnB4LCAxZnIpKTtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDM2cHg7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IDM2cHg7XG4gICAgZ3JpZC1jb2x1bW4tZ2FwOiAycHg7XG4gICAgZ3JpZC1yb3ctZ2FwOiAycHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgb3ZlcmZsb3c6IGF1dG87IH1cbiAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS1uYW1lIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuOCk7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LW5hbWU6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IC0xcHg7XG4gICAgICAgIHJpZ2h0OiAtMnB4O1xuICAgICAgICB3aWR0aDogMnB4O1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIC5kYXktbmFtZTpsYXN0LW9mLXR5cGU6YWZ0ZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIC5kYXkge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMTtcbiAgICAgIGNvbG9yOiAjMTExMTExO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheSBzcGFuIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC13aWR0aDogMzZweDtcbiAgICAgICAgaGVpZ2h0OiAzNnB4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgICAgIHRleHQtaW5kZW50OiAtMXB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIC5kYXk6YWN0aXZlIHNwYW4ge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXItc3R5bGU6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4xOCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4OyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS5kYXktZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjMpOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS53ZWVrZW5kIHtcbiAgICAgICAgY29sb3I6IHJnYmEoMjUyLCA3NiwgOTYsIDAuOCk7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnRvZGF5IHNwYW4ge1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBsaW5lLWhlaWdodDogMzJweDsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIC5kYXkuc2VsZWN0IHNwYW4sIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnNlbGVjdC50b2RheSBzcGFuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzE3N2FmZjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnNlbGVjdC1zdGFydCBzcGFuLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS5zZWxlY3QtZW5kIHNwYW4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc3YWZmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlIC5kYXkuc2VsZWN0LXN0YXJ0OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IC0ycHg7XG4gICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDJweCk7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnNlbGVjdC1zdGFydDpudGgtY2hpbGQoN24pOmFmdGVyIHtcbiAgICAgICAgcmlnaHQ6IDA7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnNlbGVjdC1lbmQ6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyAycHgpO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS5zZWxlY3QtcGVyaW9kIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLWRhdGUgLmRheS5zZWxlY3QtcGVyaW9kOmFmdGVyIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHJpZ2h0OiAtMnB4O1xuICAgICAgICAgIHdpZHRoOiAycHg7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItZGF0ZSAuZGF5LnNlbGVjdC1wZXJpb2Q6bnRoLWNoaWxkKDduKTphZnRlciB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbm1heCg2MHB4LCAxZnIpKTtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDYwcHg7XG4gICAgZ3JpZC1hdXRvLXJvd3M6IDYwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgZ3JpZC1jb2x1bW4tZ2FwOiAxMXB4O1xuICAgIGdyaWQtcm93LWdhcDogMnB4O1xuICAgIHdpZHRoOiAxMDAlOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1tb250aCAubW9udGgge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMTtcbiAgICAgIGNvbG9yOiAjMTExMTExO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aCBzcGFuIHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXgtd2lkdGg6IDYwcHg7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDYwcHg7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItbW9udGggLm1vbnRoOmFjdGl2ZSBzcGFuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aC5zZWxlY3Qgc3BhbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxNzdhZmY7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aC5tb250aC1kaXNhYmxlZCB7XG4gICAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMyk7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItbW9udGggLm1vbnRoLnNlbGVjdC1zdGFydCBzcGFuLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aC5zZWxlY3QtZW5kIHNwYW4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc3YWZmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1tb250aCAubW9udGguc2VsZWN0LXN0YXJ0OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IC0xMXB4O1xuICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyAxMXB4KTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1tb250aCAubW9udGguc2VsZWN0LXN0YXJ0Om50aC1jaGlsZCg3bik6YWZ0ZXIge1xuICAgICAgICByaWdodDogMDsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1tb250aCAubW9udGguc2VsZWN0LWVuZDphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDExcHgpO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aC5zZWxlY3QtcGVyaW9kIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoIC5tb250aC5zZWxlY3QtcGVyaW9kOmFmdGVyIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHJpZ2h0OiAtMTFweDtcbiAgICAgICAgICB3aWR0aDogMTFweDtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1tb250aCAubW9udGguc2VsZWN0LXBlcmlvZDpudGgtY2hpbGQoN24pOmFmdGVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lOyB9XG4gIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCBtaW5tYXgoNjBweCwgMWZyKSk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA2MHB4O1xuICAgIGdyaWQtYXV0by1yb3dzOiA2MHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGdyaWQtY29sdW1uLWdhcDogMTFweDtcbiAgICBncmlkLXJvdy1nYXA6IDJweDtcbiAgICB3aWR0aDogMTAwJTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhciB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgY29sb3I6ICMxMTExMTE7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhciBzcGFuIHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXgtd2lkdGg6IDYwcHg7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDYwcHg7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhcjphY3RpdmUgc3BhbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC4xOCk7XG4gICAgICAgIGJvcmRlci1zdHlsZTogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci15ZWFyIC55ZWFyLnNlbGVjdCBzcGFuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzE3N2FmZjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhci5zZWxlY3Q6YWN0aXZlIHNwYW4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGU0YzllOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXllYXIgLnllYXIueWVhci1kaXNhYmxlZCB7XG4gICAgICAgIGNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMyk7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhci5zZWxlY3Qtc3RhcnQgc3BhbiwgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci15ZWFyIC55ZWFyLnNlbGVjdC1lbmQgc3BhbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxNzdhZmY7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXllYXIgLnllYXIuc2VsZWN0LXN0YXJ0OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgcmlnaHQ6IC0xMXB4O1xuICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyAxMXB4KTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci15ZWFyIC55ZWFyLnNlbGVjdC1zdGFydDpudGgtY2hpbGQoN24pOmFmdGVyIHtcbiAgICAgICAgcmlnaHQ6IDA7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhci5zZWxlY3QtZW5kOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IGNhbGMoNTAlICsgMTFweCk7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhci5zZWxlY3QtcGVyaW9kIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXllYXIgLnllYXIuc2VsZWN0LXBlcmlvZDphZnRlciB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICByaWdodDogLTExcHg7XG4gICAgICAgICAgd2lkdGg6IDExcHg7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXIteWVhciAueWVhci5zZWxlY3QtcGVyaW9kOm50aC1jaGlsZCg3bik6YWZ0ZXIge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1kYXRlLFxuICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLW1vbnRoLFxuICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXllYXIge1xuICAgIHdpZHRoOiAzMy4zMzMzMyU7XG4gICAgbWluLXdpZHRoOiAzMy4zMzMzMyU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDBweCk7IH1cbiAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4gICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjA0KTsgfVxuICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kOmxhc3Qtb2YtdHlwZSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZCB1bCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogbm93cmFwOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZCB1bCBsaSBidXR0b24ge1xuICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDlweCAwO1xuICAgICAgICAgIGNvbG9yOiAjMTExMTExO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTc7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kIHVsIGxpLnNlbGVjdCBidXR0b24ge1xuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzE3N2FmZjtcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDc7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2Qtd2VlayBsaSB7XG4gICAgICAgIGZsZXg6IDAgMCAyNSU7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtcXVhcnRlciBsaSB7XG4gICAgICAgIGZsZXg6IDAgMCAyNSU7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtaGFsZiBsaSB7XG4gICAgICAgIGZsZXg6IDAgMCAzMy4zMzMlOyB9XG4gICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIHtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgbWlubWF4KDM2cHgsIDFmcikpO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDM2cHg7XG4gICAgICAgIGdyaWQtYXV0by1yb3dzOiAzNnB4O1xuICAgICAgICBncmlkLWNvbHVtbi1nYXA6IDhweDtcbiAgICAgICAgZ3JpZC1yb3ctZ2FwOiA4cHg7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogOHB4OyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkgYnV0dG9uIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgcGFkZGluZzogMDsgfVxuICAgICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkgYnV0dG9uIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM2cHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzZweDtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0IHtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cbiAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdCBidXR0b24ge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XG4gICAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdCBidXR0b24gc3BhbiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc3YWZmO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7IH1cbiAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdC5zZWxlY3Qtc3RhcnQ6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIHJpZ2h0OiAtOHB4O1xuICAgICAgICAgICAgd2lkdGg6IGNhbGMoNTAlICsgOHB4KTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLnBlcmlvZC1tb250aCB1bCBsaS5zZWxlY3Quc2VsZWN0LWVuZDphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdC1zdGFydCBzcGFuLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdC1lbmQgc3BhbiB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzE3N2FmZjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0LXN0YXJ0OmFmdGVyIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHJpZ2h0OiAtOHB4O1xuICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDhweCk7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0LXN0YXJ0Om50aC1jaGlsZCg3bik6YWZ0ZXIge1xuICAgICAgICAgIHJpZ2h0OiAwOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0LWVuZDphZnRlciB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSArIDhweCk7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0LXBlcmlvZCB7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjMsIDEyMiwgMjU1LCAwLjIpOyB9XG4gICAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLnBlcmlvZC1tb250aCB1bCBsaS5zZWxlY3QtcGVyaW9kOmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgcmlnaHQ6IC04cHg7XG4gICAgICAgICAgICB3aWR0aDogOHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpLnNlbGVjdC1wZXJpb2Q6bnRoLWNoaWxkKDduKTphZnRlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGkuc2VsZWN0LXBlcmlvZDpudGgtY2hpbGQoNm4pOmFmdGVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGk6bnRoLWNoaWxkKDcpLnNlbGVjdC1zdGFydDphZnRlciB7XG4gICAgICAgICAgcmlnaHQ6IC04cHg7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLnBlcmlvZC1tb250aCB1bCBsaTpudGgtY2hpbGQoNykuc2VsZWN0LXBlcmlvZDphZnRlciB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICByaWdodDogLThweDtcbiAgICAgICAgICB3aWR0aDogOHB4O1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2QucGVyaW9kLW1vbnRoIHVsIGxpOmFjdGl2ZSBidXR0b24ge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC5wZXJpb2QtbW9udGggdWwgbGk6YWN0aXZlIHNwYW4ge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg2MCwgNjAsIDY3LCAwLjE4KTsgfVxuICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC13ZWVrcyB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cbiAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC13ZWVrcyB1bCB7XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIG1pbm1heCgzNnB4LCAxZnIpKTtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzNnB4O1xuICAgICAgICBncmlkLWF1dG8tcm93czogMzZweDtcbiAgICAgICAgZ3JpZC1jb2x1bW4tZ2FwOiAycHg7XG4gICAgICAgIGdyaWQtcm93LWdhcDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgIHdpZHRoOiAxMDAlOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC13ZWVrcyB1bCBsaSBidXR0b24ge1xuICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHBhZGRpbmc6IDA7IH1cbiAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2Qtd2Vla3MgdWwgbGkgYnV0dG9uIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDM2cHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIGNvbG9yOiAjMTExMTExO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDM2cHg7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpLnNlbGVjdCB7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4gICAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpLnNlbGVjdCBzcGFuIHtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxNzdhZmY7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpLnNlbGVjdC1zdGFydCBzcGFuLCAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2Qtd2Vla3MgdWwgbGkuc2VsZWN0LWVuZCBzcGFuIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTc3YWZmO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgY29sb3I6ICNmZmZmZmY7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpLnNlbGVjdC1zdGFydDphZnRlciB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICByaWdodDogLTJweDtcbiAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyAycHgpO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2Qtd2Vla3MgdWwgbGkuc2VsZWN0LXN0YXJ0Om50aC1jaGlsZCg3bik6YWZ0ZXIge1xuICAgICAgICAgIHJpZ2h0OiAwOyB9XG4gICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC13ZWVrcyB1bCBsaS5zZWxlY3QtZW5kOmFmdGVyIHtcbiAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgd2lkdGg6IGNhbGMoNTAlICsgMnB4KTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpLnNlbGVjdC1wZXJpb2Qge1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzLCAxMjIsIDI1NSwgMC4yKTsgfVxuICAgICAgICAgIC5kcmF3ZXItcGVyaW9kLXBpY2tlciAuY2FsZW5kYXItY29udGVudCAuY2FsZW5kYXItcGVyaW9kLXdyYXAgLnBlcmlvZC13ZWVrcyB1bCBsaS5zZWxlY3QtcGVyaW9kOmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgcmlnaHQ6IC0ycHg7XG4gICAgICAgICAgICB3aWR0aDogMnB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMywgMTIyLCAyNTUsIDAuMik7IH1cbiAgICAgICAgICAuZHJhd2VyLXBlcmlvZC1waWNrZXIgLmNhbGVuZGFyLWNvbnRlbnQgLmNhbGVuZGFyLXBlcmlvZC13cmFwIC5wZXJpb2Qtd2Vla3MgdWwgbGkuc2VsZWN0LXBlcmlvZDpudGgtY2hpbGQoN24pOmFmdGVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cbiAgICAgICAgLmRyYXdlci1wZXJpb2QtcGlja2VyIC5jYWxlbmRhci1jb250ZW50IC5jYWxlbmRhci1wZXJpb2Qtd3JhcCAucGVyaW9kLXdlZWtzIHVsIGxpOmFjdGl2ZSBidXR0b24gc3BhbiB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDYwLCA2MCwgNjcsIDAuMTgpOyB9XG5gOyJdfQ==