import SkillsCollection from "/js/classes/SkillsCollection.js";
import glide from "/js/classes/ContainerGlider.js";

const collection = new SkillsCollection(document.querySelectorAll('.skills > .container > *'));
collection.setContainer(collection.collection[0].parentNode);
collection.setPosAll();
collection.setShowTime();

const collectionContainer = glide('.skills > .container');
const portfolioNode = document.querySelector('section.portfolio');
const Portfolio = {
  current: 1,
  isActive: false,
  setCurrent(i) {
    this.isActive = true;
    if (i > this.current) {
      this.targetWebsite = this.websites[i - 1];
      this.current = i;
      this.activeWebsite.style.transitionProperty = 'transform';
      this.targetWebsite.style.transitionProperty = 'transform';
      this.activeWebsite.addEventListener('transitionend', this.websiteTransitionHandler);
      this.activeWebsite.classList.add('left');
      this.targetWebsite.classList.add('active');

      if (this.targetWebsite.classList.contains('left')) {
        this.targetWebsite.classList.remove('left');

      } else if (this.targetWebsite.classList.contains('right')) {
        this.targetWebsite.classList.remove('right');
      }

    }
    else {
      this.targetWebsite = this.websites[i - 1];
      this.current = i;
      this.activeWebsite.style.transitionProperty = 'transform';
      this.targetWebsite.style.transitionProperty = 'transform';
      this.activeWebsite.addEventListener('transitionend', this.websiteTransitionHandler);
      this.activeWebsite.classList.add('right');
      this.targetWebsite.classList.add('active');

      if (this.targetWebsite.classList.contains('left')) {
        this.targetWebsite.classList.remove('left');
        console.log('else -> if()')

      } else if (this.targetWebsite.classList.contains('right')) {
        this.targetWebsite.classList.remove('right');
        this.targetWebsite.classList.add('left');
        this.targetWebsite.classList.remove('left');

      }

    }

  },
  controlsParent: portfolioNode.querySelector('.controls'),
  controls: portfolioNode.querySelectorAll('.controls > li'),
  websites: portfolioNode.querySelectorAll('.websites-container > .website'),
  targetWebsite: null,
  activeWebsite: portfolioNode.querySelector('.website.active'),
  websiteTransitionHandler(e) {
    Portfolio.isActive = false;
    Portfolio.activeWebsite.removeEventListener('transitionend', Portfolio.websiteTransitionHandler);
    Portfolio.activeWebsite.classList.remove('active');
    Portfolio.activeWebsite = Portfolio.targetWebsite;
    Portfolio.targetWebsite.style.transitionProperty = 'transform';
    Portfolio.activeWebsite.style.transitionProperty = 'transform';
  }
};

// Click listener for each control element
Portfolio.controls.forEach((item) => item.addEventListener('click', (e) => {
  if (Portfolio.isActive) return;
  if (e.target.matches('li') &&
    !e.target.classList.contains('active')) {
    let index = Array.from(Portfolio.controls).findIndex((item, i) => item === e.currentTarget);
    Portfolio.setCurrent(index + 1);
    Portfolio.controlsParent.querySelector('li.active')
      .classList.remove('active');
    e.target.classList.add('active');
  }
}));

// Add link buttons redirecting functionality
document.querySelectorAll('.portfolio .website').forEach(item => {
  item.querySelector('button[class=link]').addEventListener('click', (e) => {
    const attr = e.currentTarget.getAttribute('data-link');
    window.location = (
      location.protocol +
      '//' +
      window.location.host +
      ((attr.length > 1) ? '/projects/' + attr : '')
    );
  });
});