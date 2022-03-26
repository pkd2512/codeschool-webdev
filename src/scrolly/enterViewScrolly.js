/* eslint-disable max-len */
import debounce from 'lodash.debounce';
import enterView from 'enter-view';
/**
  ---------------
  VERICAL SCROLLY
  ---------------
 * @param {string} scrollerEl - The HTML id of the scroller block.
 * @param {boolean} stacked - If true, the graphics layers will stack on scroll.
 */
const enterViewScrolly = (scrollerEl, stacked) => {
  // set the sizes onload and on resize

  window.addEventListener('DOMContentLoaded', debounce(() => {
    _resize(scrollerEl);
  }, 150));

  window.addEventListener('resize', debounce(() => {
    _resize(scrollerEl);
  }, 150));


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
      (!stacked) && document
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

        document
            .querySelector(`${scrollerEl} .slide.${el.id}`)
            .classList.remove('active');
      }
    },
  });
};

const _resize = (scrollerEl) => {
  // set widths
  const {width} = document.querySelector(scrollerEl).getBoundingClientRect();

  // set heights
  const height = window.innerHeight;
  // console.log(height);

  document
      .querySelectorAll(`${scrollerEl} .slide`)
      .forEach((slide) => {
        slide.style.width = `${width}px`;
      });

  document
      .querySelector(`${scrollerEl} .scroll-background `).style.height = `${height}px`;

  document
      .querySelector(`${scrollerEl} .scroll-row`).style.height = `${height}px`;
};

export default enterViewScrolly;
