import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Tooltip, TooltipOptions } from '../src/components/tooltip/tooltip';

export default {
  title: 'Tooltip'
};

export const Tooltip1 = () => html`<style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <button
      id="showTooltip"
      @click="${() => {
        showTooltip(document.querySelector('#targetDiv'), {
          type: 'normal',
          text:
            'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip' +
            'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip' +
            'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip' +
            'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip' +
            'tooltiptooltiptooltiptooltiptooltiptooltiptooltiptooltip' +
            'tooltiptooltiptooltip',
          position: 'bottom',
          fadeOutTime: 0,
          durationTime: 2000
        });
      }}"
    >
      showTooltip
    </button>

    <button
      id="showTooltip"
      @click="${() => {
        showTooltip(document.querySelector('#targetDiv2'), {
          // type: 'title',
          text: 'tooltipTop',
          position: 'top',
          closeButton: false,
          title: 'TITLE',
          // durationTime: 2000,
          fadeOutTime: 5000
        });
      }}"
    >
      showTooltipTop
    </button>

    <button
      id="showTooltip"
      @click="${() => {
        showTooltip(document.querySelector('#targetDiv2'), {
          type: 'title',
          text: 'title text',
          position: 'top',
          // closeButton: false,
          title: 'TITLE',
          // durationTime: 2000,
          fadeOutTime: 5000
        });
      }}"
    >
      showTitle
    </button>

    <button
      id="showTooltip"
      @click="${() => {
        showTooltip(document.querySelector('#targetDiv'), {
          type: 'required',
          text: 'tooltipTop',
          position: 'bottom',
          closeButton: true,
          title: 'TITLE',
          durationTime: 2000,
          fadeOutTime: 3000
        });
      }}"
    >
      requiredTooltip
    </button>
    <div id="targetDiv" style="margin: 200px; border: 1px solid red; width: 600px; height: 300px;">DIV</div>
    <div id="targetDiv2" style="border: 1px solid blue; width: 300px; height: 300px;">DIV</div>
  </div>`;

function showTooltip(target: HTMLElement | null, options: TooltipOptions) {
  const tooltip = new Tooltip(target as HTMLElement, options);
  tooltip.show();
}
