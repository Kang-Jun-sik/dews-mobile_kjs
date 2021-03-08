import { Loading, Messagebox, Progressbar, Snackbar, Tooltip } from '../components/exports.js';
import { LoadingOptions } from '../components/loading/loading.js';
import { TooltipOptions } from '../components/tooltip/tooltip.js';
import { ProgressbarOptions } from '../components/progressbar/progressbar.js';
import { ICON_LIST, SnackbarOptions } from '../components/snackbar/snackbar.js';
import { MESSAGEBOX_TYPE, MessageboxOptions } from '../components/messagebox/messagebox.js';

export interface GlobalComponentRegister {
  loading: (options: LoadingOptions) => Loading;
  tooltip: (target: HTMLElement, options: TooltipOptions) => Tooltip;
  progressbar: (id: string, options: ProgressbarOptions) => Progressbar;
  snackbar: (message: string, options: SnackbarOptions | ICON_LIST | boolean) => Snackbar;
  alert: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => Messagebox;
  confirm: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => Messagebox;
  error: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => Messagebox;
}

const ui: GlobalComponentRegister = {
  loading: (options: LoadingOptions) => {
    return new Loading(options);
  },
  tooltip: (target: HTMLElement, options: TooltipOptions) => {
    return new Tooltip(target, options);
  },
  progressbar: (id: string, options: ProgressbarOptions) => {
    return new Progressbar(id, options);
  },
  snackbar: (message: string, options: SnackbarOptions | ICON_LIST | boolean) => {
    return new Snackbar(message, options);
  },
  alert: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => {
    return new Messagebox(message, 'alert', options);
  },
  confirm: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => {
    return new Messagebox(message, 'confirm', options);
  },
  error: (message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) => {
    return new Messagebox(message, 'error', options);
  }
};

export { ui };
