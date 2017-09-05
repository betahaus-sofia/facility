import { store } from '../store';

import { ShowFeedbackFormButton, FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { RequestedSupply } from '../requested-supply';
import { SupplyList } from '../supply-list';

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies, showFeedbackForm, requestedSupply } = store.getState();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null,
    requestedSupply ? RequestedSupply(requestedSupply) : null
  ];
};
