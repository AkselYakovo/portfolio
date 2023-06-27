import SkillsCollection from "/js/classes/SkillsCollection.js";

const collection = new SkillsCollection(document.querySelectorAll('.skills > .container > *'));
collection.setContainer(collection.collection[0].parentNode);
collection.setPosAll();
collection.setShowTime();