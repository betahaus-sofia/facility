import { Supply } from '../supply';

// Show feedback form
let showFeedbackForm = false;

export function getShowFeedbackForm(): boolean {
  return showFeedbackForm;
}

export function setShowFeedbackForm(state: boolean) {
  showFeedbackForm = state;
}

// Requested supply
let requestedSupply: Supply;

export function getRequestedSupply(): Supply {
  return requestedSupply;
}

export function setRequestedSupply(state: Supply) {
  requestedSupply = state;
}
