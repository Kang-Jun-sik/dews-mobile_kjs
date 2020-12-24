import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'Checkbox'
};
export const CheckBox = () => html ` <div style="width: 360px">
    <dews-checkbox-group>
      <dews-checkbox title="Check Box1" bookmark> </dews-checkbox>
      <dews-checkbox title="Check Box2"> </dews-checkbox>
      <dews-checkbox title="Check Box3"> </dews-checkbox>
      <dews-checkbox title="Check Box4"> </dews-checkbox>
    </dews-checkbox-group>
    <br />
    <dews-checkbox-group align="vertical">
      <dews-checkbox title="Check Box1" bookmark> </dews-checkbox>
      <dews-checkbox title="Check Box2"> </dews-checkbox>
      <dews-checkbox title="Check Box3"> </dews-checkbox>
      <dews-checkbox title="Check Box4"> </dews-checkbox>
    </dews-checkbox-group>
    <br />
  </div>
  <div style="width: 360px">
    <dews-checkbox disabled title="Check Box"> </dews-checkbox>
  </div>
  <div style="width: 360px">
    <dews-checkbox disabled checked title="Disabled Check Box"> </dews-checkbox>
  </div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1jaGVja2JveC5zdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV3cy1jaGVja2JveC5zdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixlQUFlO0lBQ2IsS0FBSyxFQUFFLFVBQVU7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXFCekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDaGVja2JveCdcbn07XG5cbmV4cG9ydCBjb25zdCBDaGVja0JveCA9ICgpID0+IGh0bWxgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzYwcHhcIj5cbiAgICA8ZGV3cy1jaGVja2JveC1ncm91cD5cbiAgICAgIDxkZXdzLWNoZWNrYm94IHRpdGxlPVwiQ2hlY2sgQm94MVwiIGJvb2ttYXJrPiA8L2Rld3MtY2hlY2tib3g+XG4gICAgICA8ZGV3cy1jaGVja2JveCB0aXRsZT1cIkNoZWNrIEJveDJcIj4gPC9kZXdzLWNoZWNrYm94PlxuICAgICAgPGRld3MtY2hlY2tib3ggdGl0bGU9XCJDaGVjayBCb3gzXCI+IDwvZGV3cy1jaGVja2JveD5cbiAgICAgIDxkZXdzLWNoZWNrYm94IHRpdGxlPVwiQ2hlY2sgQm94NFwiPiA8L2Rld3MtY2hlY2tib3g+XG4gICAgPC9kZXdzLWNoZWNrYm94LWdyb3VwPlxuICAgIDxiciAvPlxuICAgIDxkZXdzLWNoZWNrYm94LWdyb3VwIGFsaWduPVwidmVydGljYWxcIj5cbiAgICAgIDxkZXdzLWNoZWNrYm94IHRpdGxlPVwiQ2hlY2sgQm94MVwiIGJvb2ttYXJrPiA8L2Rld3MtY2hlY2tib3g+XG4gICAgICA8ZGV3cy1jaGVja2JveCB0aXRsZT1cIkNoZWNrIEJveDJcIj4gPC9kZXdzLWNoZWNrYm94PlxuICAgICAgPGRld3MtY2hlY2tib3ggdGl0bGU9XCJDaGVjayBCb3gzXCI+IDwvZGV3cy1jaGVja2JveD5cbiAgICAgIDxkZXdzLWNoZWNrYm94IHRpdGxlPVwiQ2hlY2sgQm94NFwiPiA8L2Rld3MtY2hlY2tib3g+XG4gICAgPC9kZXdzLWNoZWNrYm94LWdyb3VwPlxuICAgIDxiciAvPlxuICA8L2Rpdj5cbiAgPGRpdiBzdHlsZT1cIndpZHRoOiAzNjBweFwiPlxuICAgIDxkZXdzLWNoZWNrYm94IGRpc2FibGVkIHRpdGxlPVwiQ2hlY2sgQm94XCI+IDwvZGV3cy1jaGVja2JveD5cbiAgPC9kaXY+XG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzYwcHhcIj5cbiAgICA8ZGV3cy1jaGVja2JveCBkaXNhYmxlZCBjaGVja2VkIHRpdGxlPVwiRGlzYWJsZWQgQ2hlY2sgQm94XCI+IDwvZGV3cy1jaGVja2JveD5cbiAgPC9kaXY+YDtcbiJdfQ==