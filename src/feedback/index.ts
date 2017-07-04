import './style.scss';

import { ComponentNode, iframe, div, svg, path } from 'compote/html';
import { getAnimationDuration } from 'compote/css';

import { Actions, store } from '../store';

export const FeedbackForm = (src: string) => (
  div({
    class: 'feedback-form fixed stretch fade-in-animation',
    oncreate() {
      document.body.classList.add('overflow-hidden');
    },
    onbeforeremove({ dom }) {
      dom.classList.add('fade-out-animation');
      return new Promise((resolve) => {
        setTimeout(resolve, 0.95 * getAnimationDuration(dom) * 1e3);
      }).then(() => {
        document.body.classList.remove('overflow-hidden');
      });
    }
  }, [
    iframe({
      src,
      width: '100%',
      height: '1600px',
      style: {
        border: '0',
        frameborder: 0,
        marginheight: 0,
        marginwidth: 0
      }
    },
      'Loading...'
    ),

    div({
      class: 'feedback-form-back-button flex-row justify-content-center align-items-center',
      onclick: hideFeedbackForm
    }, [
      svg(<any>{ width: 36, height: 24, viewBox: '0 0 24 24' }, [ // TODO: Type
        path({
          d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
        })
      ]),
      'Back'
    ])
  ])
);

export const ShowFeedbackFormButton = () => (
  div({
    class: 'show-feedback-form-button flex-row justify-content-center align-items-center',
    title: 'Feedback',
    onclick: showFeedbackForm
  },
    svg(<any>{ width: 24, height: 24, viewBox: '0 0 24 24' }, [ // TODO: Type
      path({
        d: 'M.054 23c.971-1.912 2.048-4.538 1.993-6.368-1.308-1.562-2.047-3.575-2.047-5.625 0-5.781 5.662-10.007 12-10.007 6.299 0 12 4.195 12 10.007 0 6.052-6.732 11.705-15.968 9.458-1.678 1.027-5.377 2.065-7.978 2.535z'
      })
    ])
  )
);

const toggleFeedbackForm = (show: boolean) => () => store.dispatch({ type: Actions.SHOW_FEEDBACK_FORM, show });
const showFeedbackForm = toggleFeedbackForm(true);
const hideFeedbackForm = toggleFeedbackForm(false);
