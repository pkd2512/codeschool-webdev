/* eslint-disable max-len */
import debounce from 'lodash.debounce';
import enterView from 'enter-view';

/**
  ---------------
  VERICAL SCROLLY
  ---------------
 * @param {string} scrollerEl - The HTML id of the scroller block.
 */
export default enterViewScrolly = (scrollerEl) => {
  window.addEventListener('resize', debounce(() => {
    setWidths(scrollerEl);
  }, 250));


  /* Enter Trigger */
  enterView({
    selector: `${scrollerEl} .scroll-enter`,
    // 0 = top of element crosses bottom of viewport (enters screen from bottom).
    // 1 = top of element crosses top of viewport (exits screen top).
    offset: 1,
    enter: (el) => {
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.remove('unfixed');
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.add('fixed');
    },
    exit: (el) => {
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.remove('fixed');
    },
  });

  /* Exit Trigger */
  enterView({
    selector: `${scrollerEl} .scroll-exit`,
    offset: 0,
    enter: (el) => {
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.add('unfixed');
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.remove('fixed');
    },
    exit: (el) => {
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.remove('unfixed');
      document
          .querySelector(`${scrollerEl} .scroll-background`)
          .classList.add('fixed');
    },
  });
  /*
    ------------------------------------------
    Do things here as scroll-sections progress
    ------------------------------------------
  */
  enterView({
    selector: `${scrollerEl} .anno-block`,
    enter: (el) => {
      document
          .querySelectorAll(`${scrollerEl} .slide`)
          .forEach((slide) => slide.classList.remove('active'));

      document
          .querySelector(`${scrollerEl} .slide.${el.id}`)
          .classList.add('active');
    },
    exit: (el) => {
      const prevNode = document.querySelector(`${scrollerEl} .slide.${el.id}`)
          .previousElementSibling;
      if (prevNode) {
        prevNode.classList.add('active');
      }
      document
          .querySelector(`${scrollerEl} .slide.${el.id}`)
          .classList.remove('active');
    },
  });
};

const setWidths = (scrollerEl) => {
  // set widths
  const {width} = document.querySelector(scrollerEl).getBoundingClientRect();
  // console.log(width);

  document
      .querySelectorAll(`${scrollerEl} .slide`)
      .forEach((slide) => {
        slide.style.width = `${width}px`;
      });
};
