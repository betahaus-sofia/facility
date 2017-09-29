import { store } from '../store';

import { FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { RequestedSupply } from '../requested-supply';
import { SupplyList } from '../supply-list';

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies, requestedSupply } = store.getState();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    FeedbackForm(process.env.FEEDBACK_FORM_URL),
    requestedSupply ? RequestedSupply(requestedSupply) : null
  ];
};
