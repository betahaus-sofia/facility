import { route } from 'mithril';

import { getRooms } from '../room';
import { store } from '../store';

import { ShowFeedbackFormButton, FeedbackForm } from '../feedback';
import { RoomList } from '../room-list';
import { SupplyList } from '../supply-list';

export const HomePage = () => {
  const { rooms, selectedRoom, selectedRoomSupplies, showFeedbackForm } = store.getState();
  return [
    RoomList(rooms),
    SupplyList(selectedRoom, selectedRoomSupplies),
    ShowFeedbackFormButton(),
    showFeedbackForm ? FeedbackForm(process.env.FEEDBACK_FORM_URL) : null
  ];
};

export function initializeRouter() {
  route.prefix('');

  const container = document.querySelector('#container');
  route(container, '/', {
    '/': {
      onmatch: getRooms,
      render: HomePage
    }
  });
}
