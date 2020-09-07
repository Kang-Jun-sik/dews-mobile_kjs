import { html, property, customElement, LitElement, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('form-section')
class FormSection extends LitElement {
  static styles = css`
    :host([opened]) [part='content'] {
      display: block;
    }
    .form-section-title {
      width: 100%;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRBN0VGQjc4QzQ0NzExRTdCN0FDRUVBNkJCOUIyNzM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRBN0VGQjc5QzQ0NzExRTdCN0FDRUVBNkJCOUIyNzM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEE3RUZCNzZDNDQ3MTFFN0I3QUNFRUE2QkI5QjI3MzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEE3RUZCNzdDNDQ3MTFFN0I3QUNFRUE2QkI5QjI3MzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SLtaJAAAAR0lEQVR42nyQUQoAQAQFcSL3vwQ3sksp6WU+GY+wmQV9VJXpwN3Lkxa7cMnpykxHQ1OuDd1AQ1tOOCJg4g5qZJ8wBfSIJ8AAcp4nltyI8nsAAAAASUVORK5CYII=)
        no-repeat right 10px top 50%;
      background-color: #036ddd;
      color: #fff;
      transition: 0.5s;
      border-radius: 8px;
      margin-top: 7px;
      margin-bottom: 0px;
    }
    .selected {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1MkIyRTc2QzQ0NzExRTc4Q0JGREFDRTg4NDRCRDFDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1MkIyRTc3QzQ0NzExRTc4Q0JGREFDRTg4NDRCRDFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTUyQjJFNzRDNDQ3MTFFNzhDQkZEQUNFODg0NEJEMUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTUyQjJFNzVDNDQ3MTFFNzhDQkZEQUNFODg0NEJEMUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Yck3oAAAAPklEQVR42mL8//8/AzpIT08HC86cOZMRXY4Jl2J0NlYNyCbDTEfXxITPGdg0MRFyM7omxrS0NJyKsTkXIMAAn7Mpobntu+EAAAAASUVORK5CYII=);
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    .form-section-list {
      background-color: #e6f5ff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      width: 100%;
    }
  `;

  @property({ type: Number, attribute: 'panel-height' })
  panelHeight = 35;

  @property({ type: Boolean })
  opened = false;

  @property({ type: String })
  title = '기본정보';

  private FormListToggle() {
    this.opened = !this.opened;
  }
  render() {
    const panelStyle = styleMap({
      height: `${this.panelHeight}px`,
      lineHeight: `${this.panelHeight}px`,
    });

    return html`
      <div class="form-section">
        <div @click="${this.FormListToggle}">
          <h4 class="form-section-title ${this.opened ? 'selected' : ''}" style="${panelStyle}">&nbsp;${this.title}</h4>
        </div>
        ${this.opened
          ? html`
              <div class="form-section-list">
                <slot></slot>
              </div>
            `
          : null}
      </div>
    `;
  }
}
export default FormSection;
