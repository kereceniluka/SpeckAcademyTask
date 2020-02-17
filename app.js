const toolList = document.querySelector('.list-group');
const errorContainer = document.querySelector('.error-container');
const toolboxList = document.querySelector('#toolbox-group');
const toolboxGroup = document.querySelector('#toolbox-group');
const jsTools = ['čekić', 'bušilica', 'guma', 'mač'];

const handleVerticalScroll = addOrRemove => {
  addOrRemove === 'add' ? toolboxGroup.classList.add('scroll-vertical') : toolboxGroup.classList.remove('scroll-vertical');
};

const checkHasChildren = node => {
  node.hasChildNodes() ? errorContainer.innerHTML = '' : errorContainer.innerHTML = '<p class="empty-list">The list is empty!</p>';
  if(toolboxList.childElementCount > 7) {
    handleVerticalScroll('add');
  }
};

const createItemNode = val => {
  const node = document.createElement('li');
  node.innerHTML = val;
  node.classList.add('list-group-item'); //toolbox items
  
  node.addEventListener('click', () => removeItemNode(node));
  
  return node;
};

const removeItemNode = node => {
  node.parentNode.removeChild(node);
  checkHasChildren(toolboxList);
  
  if(toolboxList.childElementCount <= 7) {
    handleVerticalScroll('remove');
  }
};

const renderItem = (item, container) => {
  const html = `<li class="list-group-item">${item}</li>`;
  container.innerHTML += html;
};

const showTools = () => {
  jsTools.forEach(tool => {
    renderItem(tool, toolList, jsTools);
  });
};

const addItem = () => {
  const allTools = document.querySelectorAll('.list-group-item');

  allTools.forEach(tool => {
    tool.addEventListener('click', e => {
      const selectedItem = e.target;
      const newNode = createItemNode(e.target.innerText);
      toolboxList.insertBefore(newNode, toolboxList.childNodes[0]);
      checkHasChildren(toolboxList);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  showTools();
  addItem();
  checkHasChildren(toolboxList);
});

