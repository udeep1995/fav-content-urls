const {shell} = require("electron");
let items = document.getElementById("items");
const LOCAL_STORAGE = "content-key"

exports.openItemNative = () => {
  if(!this.storage.length) return;

  let selectedItem = this.getSelectedItem();

  shell.openExternal(selectedItem.node.dataset.url);
}

exports.deleteItem =() => {
    let itemIndex = this.getSelectedItem().index;
    items.removeChild(items.childNodes[itemIndex + 1]);
     this.storage.splice(itemIndex, 1);
     this.save();
    if(this.storage.length) {
        let newSelectedItemIndex = (itemIndex === 0) ? 0: itemIndex-1;
        document.getElementsByClassName("read-item")[newSelectedItemIndex].classList.add("selected");
    }
};

exports.getSelectedItem = () => {
  let currentItem = document.getElementsByClassName("read-item selected")[0];
  let itemIndex = 0;
  let child = currentItem;
  while ((child = child.previousElementSibling) !== null) {
    itemIndex++;
  }
  return { node: currentItem, index: itemIndex };
};

exports.select = (e) => {
  if(items.childNodes) {
      items.childNodes.forEach(child => {
          if(child === e.currentTarget)
          {
              this.getSelectedItem().node.classList.remove("selected");
              e.currentTarget.classList.add("selected");
          }
      })
  }
  
};

exports.changeSelection = (direction) => {
  let currentItem = this.getSelectedItem().node;
  if (direction === "ArrowUp" && currentItem.previousElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.previousElementSibling.classList.add("selected");
  } else if (direction === "ArrowDown" && currentItem.nextElementSibling) {
    currentItem.classList.remove("selected");
    currentItem.nextElementSibling.classList.add("selected");
  }
};

exports.storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE)) || [];

exports.save = () => {
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(this.storage));
};

exports.open = () => {
  if (!this.storage.length) return;
  let selectedItem = this.getSelectedItem();
  let contentURL = selectedItem.node.dataset.url;
  let readerWin = window.open(
    contentURL,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    height=600,
    width=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
    `
  );
};

exports.addItem = (item, isNew = false) => {
  let itemNode = document.createElement("div");
  itemNode.setAttribute("class", "read-item");
  itemNode.setAttribute("data-url", item.url);
  itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`;

  itemNode.addEventListener("click", this.select);
  itemNode.addEventListener("dblclick", this.open);

  let removeNode = document.createElement("span");
  removeNode.setAttribute("class", "remove");
  removeNode.innerHTML = `Remove`;
  removeNode.addEventListener("click", e=> {
    itemNode.click();
    this.deleteItem();
  });
  itemNode.appendChild(removeNode);
  items.appendChild(itemNode);

  if (document.getElementsByClassName("read-item").length === 1) {
    itemNode.classList.add("selected");
  }

  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

this.storage.forEach((item) => {
  this.addItem(item);
});
