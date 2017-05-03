import { getShowFeedbackForm, getRequestedSupply } from './data';
import { store } from '../store';

import { ShowFeedbackFormButton, FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { SupplyList } from '../supply-list';
import { RequestedSupply } from '../requested-supply';

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies } = store.getState();
  const showFeedbackForm = getShowFeedbackForm();
  const requestedSupply = getRequestedSupply();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null,
    requestedSupply ? RequestedSupply(requestedSupply) : null
  ];
};
