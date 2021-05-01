'use strict';

const headerBtn = document.querySelector('.header__btn');
const storyBtn = document.querySelector('.story__btn');
const sectionHomes = document.querySelector('.homes');

const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');

const features = document.querySelector('.features');

///////////////////////////////////////
// SMOOTH SCROLLING

[headerBtn, storyBtn].forEach(btn =>
  btn.addEventListener('click', () =>
    sectionHomes.scrollIntoView({ behavior: 'smooth' })
  )
);

///////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL

const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealOnScroll);

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// LAZY LOADING IMAGES

const lazyLoad = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.setAttribute('src', entry.target.dataset.src);

    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(lazyLoad);

images.forEach(img => {
  imgObserver.observe(img);
  img.classList.add('lazy-img');
});

///////////////////////////////////////
// FEATURES SECTION - Hover Effects

const handleHover = (opacity, e) => {
  const feature = e.target.closest('.feature');

  if (!feature) return;
  const features = feature.closest('.features').querySelectorAll('.feature');

  features.forEach(el => {
    if (el !== feature) el.style.opacity = opacity;
  });
};

features.addEventListener('mouseover', handleHover.bind(null, 0.5));
features.addEventListener('mouseout', handleHover.bind(null, 1));
