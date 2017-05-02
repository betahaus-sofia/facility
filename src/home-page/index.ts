import { store } from '../store';

import { ShowFeedbackFormButton, FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { SupplyList } from '../supply-list';
import { RequestedSupply } from '../requested-supply';

let showFeedbackForm = false;
export function toggleFeedbackForm(state: boolean) {
  showFeedbackForm = state;
}

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies, requestedSupply } = store.getState();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null,
    requestedSupply ? RequestedSupply(requestedSupply) : null
  ];
};
