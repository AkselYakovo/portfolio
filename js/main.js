import SkillsCollection from "/js/classes/SkillsCollection.js";
import glide from "/js/classes/ContainerGlidder.js";

const collection = new SkillsCollection(document.querySelectorAll('.skills > .container > *'));
collection.setContainer(collection.collection[0].parentNode);
collection.setPosAll();
collection.setShowTime();

const collectionContainer = glide('.skills > .container');