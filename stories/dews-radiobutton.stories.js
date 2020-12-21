import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'Radiobutton'
};
export const RadioButton = () => html `<div style="width: 360px">
    <dews-radiobutton-group title="title!!">
      <dews-radiobutton title="button1"></dews-radiobutton>
      <dews-radiobutton title="button2"></dews-radiobutton>
      <dews-radiobutton title="button3"></dews-radiobutton>
    </dews-radiobutton-group>
  </div>
  <div style="width: 360px">
    <dews-radiobutton-group title="title!!" disabled align="vertical">
      <dews-radiobutton title="button1"></dews-radiobutton>
      <dews-radiobutton title="button2" checked disabled></dews-radiobutton>
      <dews-radiobutton title="button3"></dews-radiobutton>
    </dews-radiobutton-group>
  </div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1yYWRpb2J1dHRvbi5zdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV3cy1yYWRpb2J1dHRvbi5zdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyx1QkFBdUIsQ0FBQztBQUUvQixlQUFlO0lBQ2IsS0FBSyxFQUFFLGFBQWE7Q0FDckIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUE7Ozs7Ozs7Ozs7Ozs7U0FhNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdSYWRpb2J1dHRvbidcbn07XG5cbmV4cG9ydCBjb25zdCBSYWRpb0J1dHRvbiA9ICgpID0+IGh0bWxgPGRpdiBzdHlsZT1cIndpZHRoOiAzNjBweFwiPlxuICAgIDxkZXdzLXJhZGlvYnV0dG9uLWdyb3VwIHRpdGxlPVwidGl0bGUhIVwiPlxuICAgICAgPGRld3MtcmFkaW9idXR0b24gdGl0bGU9XCJidXR0b24xXCI+PC9kZXdzLXJhZGlvYnV0dG9uPlxuICAgICAgPGRld3MtcmFkaW9idXR0b24gdGl0bGU9XCJidXR0b24yXCI+PC9kZXdzLXJhZGlvYnV0dG9uPlxuICAgICAgPGRld3MtcmFkaW9idXR0b24gdGl0bGU9XCJidXR0b24zXCI+PC9kZXdzLXJhZGlvYnV0dG9uPlxuICAgIDwvZGV3cy1yYWRpb2J1dHRvbi1ncm91cD5cbiAgPC9kaXY+XG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDogMzYwcHhcIj5cbiAgICA8ZGV3cy1yYWRpb2J1dHRvbi1ncm91cCB0aXRsZT1cInRpdGxlISFcIiBkaXNhYmxlZCBhbGlnbj1cInZlcnRpY2FsXCI+XG4gICAgICA8ZGV3cy1yYWRpb2J1dHRvbiB0aXRsZT1cImJ1dHRvbjFcIj48L2Rld3MtcmFkaW9idXR0b24+XG4gICAgICA8ZGV3cy1yYWRpb2J1dHRvbiB0aXRsZT1cImJ1dHRvbjJcIiBjaGVja2VkIGRpc2FibGVkPjwvZGV3cy1yYWRpb2J1dHRvbj5cbiAgICAgIDxkZXdzLXJhZGlvYnV0dG9uIHRpdGxlPVwiYnV0dG9uM1wiPjwvZGV3cy1yYWRpb2J1dHRvbj5cbiAgICA8L2Rld3MtcmFkaW9idXR0b24tZ3JvdXA+XG4gIDwvZGl2PmA7XG4iXX0=