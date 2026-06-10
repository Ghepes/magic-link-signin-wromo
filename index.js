import { mount } from './wromo-auth-widget.js';

// We export the main widget object that contains the mount function
const WromoAuthWidget = {
  mount: mount
};

// We allow default import
export default WromoAuthWidget;

// Attach the widget directly to the window object for maximum flexibility in the browser
if (typeof window !== 'undefined') {
  window.WromoAuthWidget = WromoAuthWidget;
}
