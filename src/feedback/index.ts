import { iframe, div } from 'compote/html';

export const FeedbackForm = (src: string) => (
  div({ class: 'bg-primary' }, [
    iframe({
      class: 'feedback-form-frame',
      src,
      width: '100%',
      style: {
        display: 'block', // iOS
        minHeight: '1600px',
        border: '0',
        frameborder: 0,
        marginheight: 0,
        marginwidth: 0
      }
    },
      'Loading...'
    )
  ])
);
