import './index.scss';

function initPricingCarousel() {
  const tabButtons = document.querySelectorAll('.tabs-pricing__button');
  const panes = document.querySelectorAll('.pricing__pane');
  const sliderLine = document.querySelector('.tabs-pricing__slider');

  if (!tabButtons.length || !panes.length) return;

  const tabOrder = ['monthly', 'yearly'];
  let isAnimating = false;

  tabButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      if (
        isAnimating ||
        this.classList.contains('tabs-pricing__button--active')
      )
        return;

      const currentActivePane = document.querySelector(
        '.pricing__pane._pane-active',
      );
      const targetId = this.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);

      if (!currentActivePane || !targetPane) return;

      isAnimating = true;

      const currentIndex = tabOrder.indexOf(currentActivePane.id);
      const targetIndex = tabOrder.indexOf(targetId);
      const direction = targetIndex > currentIndex ? 'right' : 'left';

      tabButtons.forEach((btn) =>
        btn.classList.remove('tabs-pricing__button--active'),
      );
      this.classList.add('tabs-pricing__button--active');
      if (sliderLine) {
        sliderLine.style.transform =
          targetId === 'yearly' ? 'translateX(100%)' : 'translateX(0)';
      }

      panes.forEach((pane) => {
        pane.classList.remove(
          '_slide-out-left',
          '_slide-out-right',
          '_slide-in-left',
          '_slide-in-right',
        );
      });

      if (direction === 'right') {
        targetPane.classList.add('_slide-in-right');
      } else {
        targetPane.classList.add('_slide-in-left');
      }

      targetPane.offsetHeight;

      if (direction === 'right') {
        currentActivePane.classList.add('_slide-out-left');
        targetPane.classList.add('_pane-active');
      } else {
        currentActivePane.classList.add('_slide-out-right');
        targetPane.classList.add('_pane-active');
      }

      currentActivePane.classList.remove('_pane-active');

      setTimeout(() => {
        panes.forEach((pane) => {
          pane.classList.remove(
            '_slide-out-left',
            '_slide-out-right',
            '_slide-in-left',
            '_slide-in-right',
          );
        });

        const grid = targetPane.querySelector('.pricing__grid');
        if (grid) grid.scrollLeft = 0;

        isAnimating = false;
      }, 500);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingCarousel);
} else {
  initPricingCarousel();
}
