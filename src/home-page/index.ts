import { store } from '../store';

import { ShowFeedbackFormButton, FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { Supply } from '../supply';
import { SupplyList } from '../supply-list';
import { RequestedSupply } from '../requested-supply';

let showFeedbackForm = false;
export function setShowFeedbackForm(state: boolean) {
  showFeedbackForm = state;
}

let requestedSupply: Supply;
export function setRequestedSupply(state: Supply) {
  requestedSupply = state;
}

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies } = store.getState();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null,
    requestedSupply ? RequestedSupply(requestedSupply) : null
  ];
};
