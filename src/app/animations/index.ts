import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

export const fade = trigger('fade', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate(100)
  ]),
  transition('* => void', [
    animate(100, style({ opacity: 0 }))
  ])
]);
