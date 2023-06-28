class SkillsCollection {
  
  constructor(initialCollection) {
    this.collection = Array.from(initialCollection);
    this.margin = 32;
    this.padding = 32;
    this.itemWidth = 125;
    this.itemHeight = 125;
    this.iterator = 1;
    this.newCollection = new Array;
  }
  
  getRandomNumber(coor = 'x') {
    let num;
    if (coor == 'x') {
      num = Math.ceil(Math.random() * (this.container.width 
                                     - this.itemWidth 
                                     - this.padding));
    }
    
    else { 
      num = Math.ceil(Math.random() * (this.container.height 
                                     - this.itemHeight 
                                     - this.padding));
    }
    
    return num;
  }
  
  setContainer(container) {
    this.container = {
      width: container.offsetWidth,
      height: container.offsetHeight,
      node: container,
    };
  }
  
  setPosAll() {
    for(let i = 0; i < this.collection.length; i++) {
      let x;
      let y;
      let internal_i = 0; // Avoid infinite loop
      
      // Execute on first element
      if ( !i ) {
        x = this.getRandomNumber();
        y = this.getRandomNumber('y');
        this.newCollection.push({
          node: this.collection[i],
          initial_x: x - this.margin - this.collection[i].offsetWidth,
          final_x: x + this.margin + this.collection[i].offsetWidth,
          initial_y: y - this.margin - this.collection[i].offsetHeight,
          final_y: y + this.margin + this.collection[i].offsetHeight
        });

        this.setPos({ node: this.collection[i], x, y });

        if ( x > Math.floor(this.container.width / 2) ) 
          this.collection[i].classList.add('left');
        
        continue;
      }
      
      while(  ( internal_i < 100) &&
              !this.isPosValid(x = this.getRandomNumber() ,
                               y = this.getRandomNumber('y'))
            )
      {
        internal_i++;
      }
      
      this.newCollection.push({
          node: this.collection[i],
          initial_x: x - this.margin - this.collection[i].offsetWidth,
          final_x: x + this.margin + this.collection[i].offsetWidth,
          initial_y: y - this.margin - this.collection[i].offsetHeight,
          final_y: y + this.margin + this.collection[i].offsetHeight
        });
        
      if ( x > Math.floor(this.container.width / 2) ) 
          this.collection[i].classList.add('left')

      this.setPos({ node: this.collection[i], x, y });
    }
    // console.log(this.newCollection)
  }
 
  isPosValid(x, y) {
    // console.log(`Box #${this.iterator} Begins:`)
    for(let i = 0; i < this.newCollection.length; i++ ) {
      
      let initial_x = this.newCollection[i].initial_x;
      let final_x = this.newCollection[i].final_x;
      
      let initial_y = this.newCollection[i].initial_y;
      let final_y = this.newCollection[i].final_y;

      // console.log(`Comparing box #${this.iterator}(${x},${y}) against box #${this.newCollection[i].node.textContent} (x: ${initial_x} ${final_x}), ${x >= initial_x && x <= final_x}) (y: ${this.newCollection[i].initial_y} ${this.newCollection[i].final_y}), ${y >= initial_y && y <= final_y})`) ;
      
      if ( x >= initial_x && x <= final_x ) {
        if( y >= initial_y && y <= final_y )  
        { 
          // console.log(`Actual Coords(${x},${y}) aren't valid`); 
          return false; 
        }
      }
      
    }
      // console.log('Coords are valid')
      return true;
  }

  setPos({node, x, y}) {
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
  }

  setShowTime() {
    this.collection.forEach( (item, index) => {
    
      item.setAttribute('data-show-delay', index * 100);
      item.style.animationDuration = '250ms';
      item.style.animationName = 'show_skill';
      item.style.animationTimingFunction = 'ease-out';
      item.style.animationDelay = `${item.getAttribute('data-show-delay') || 200}ms`;
      item.animationHandler = () => { 
        item.style.visibility = 'visible';
        item.style.animationDelay = null;
        item.style.animationName = null;
        item.removeEventListener('animationend', item.animationHandler); 
      };

      item.addEventListener('animationend', item.animationHandler);
    });
  }
}

export default SkillsCollection;