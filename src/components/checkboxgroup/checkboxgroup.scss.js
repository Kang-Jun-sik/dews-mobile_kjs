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

.dews-checkbox-group-wrap .checkbox-group-label {
  display: block;
  display: block;
  width: 100%;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: rgba(60, 60, 67, 0.6); }
  :host([required]) .dews-checkbox-group-wrap .checkbox-group-label:after {
    content: '*';
    display: inline;
    color: #fc4c60;
    font-size: 12px;
    line-height: 18px; }

.dews-checkbox-group-wrap .checkbox-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 36px; }
  .dews-checkbox-group-wrap .checkbox-group .group-item {
    display: inline-block;
    margin-right: 10px;
    padding: 7px 0; }
  .dews-checkbox-group-wrap .checkbox-group.vertical {
    flex-wrap: wrap; }
    .dews-checkbox-group-wrap .checkbox-group.vertical .group-item {
      display: block;
      margin-right: 0;
      width: 100%; }
      .dews-checkbox-group-wrap .checkbox-group.vertical .group-item:last-of-type {
        margin-bottom: 0; }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hncm91cC5zY3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tib3hncm91cC5zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsZUFBZSxHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWdEakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGNzc2AqIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwOyB9XG4gICogaHRtbCB7XG4gICAgZm9udC1zaXplOiAxNXB4OyB9XG4gICogdWwsXG4gICogbGksXG4gICogb2wge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7IH1cbiAgKiBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cbiAgKiBpbWcge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cblxuLmRld3MtY2hlY2tib3gtZ3JvdXAtd3JhcCAuY2hlY2tib3gtZ3JvdXAtbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAycHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6IHJnYmEoNjAsIDYwLCA2NywgMC42KTsgfVxuICA6aG9zdChbcmVxdWlyZWRdKSAuZGV3cy1jaGVja2JveC1ncm91cC13cmFwIC5jaGVja2JveC1ncm91cC1sYWJlbDphZnRlciB7XG4gICAgY29udGVudDogJyonO1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICBjb2xvcjogI2ZjNGM2MDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7IH1cblxuLmRld3MtY2hlY2tib3gtZ3JvdXAtd3JhcCAuY2hlY2tib3gtZ3JvdXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDM2cHg7IH1cbiAgLmRld3MtY2hlY2tib3gtZ3JvdXAtd3JhcCAuY2hlY2tib3gtZ3JvdXAgLmdyb3VwLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgcGFkZGluZzogN3B4IDA7IH1cbiAgLmRld3MtY2hlY2tib3gtZ3JvdXAtd3JhcCAuY2hlY2tib3gtZ3JvdXAudmVydGljYWwge1xuICAgIGZsZXgtd3JhcDogd3JhcDsgfVxuICAgIC5kZXdzLWNoZWNrYm94LWdyb3VwLXdyYXAgLmNoZWNrYm94LWdyb3VwLnZlcnRpY2FsIC5ncm91cC1pdGVtIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgd2lkdGg6IDEwMCU7IH1cbiAgICAgIC5kZXdzLWNoZWNrYm94LWdyb3VwLXdyYXAgLmNoZWNrYm94LWdyb3VwLnZlcnRpY2FsIC5ncm91cC1pdGVtOmxhc3Qtb2YtdHlwZSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7IH1cbmA7Il19