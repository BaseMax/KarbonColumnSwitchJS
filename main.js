// Elements
const elm_leftSide = document.querySelector(".left-side");
const elm_rightSide = document.querySelector(".right-side");

const elm_all_2_right= document.querySelector(".all-to-right");
const elm_all_2_left= document.querySelector(".all-to-left");

const elm_2_right= document.querySelector(".checked-to-right");
const elm_2_left= document.querySelector(".checked-to-left");

// InitialValues
let leftList = [
  { id: "item1", checked: false, title: "PHP" },
  { id: "item2", checked: false, title: "Python" },
  { id: "item3", checked: false, title: "Ruby" },
  { id: "item4", checked: false, title: "C++" },
];
let rightList = [
  { id: "item5", checked: false, title: "HTML" },
  { id: "item6", checked: false, title: "Css" },
  { id: "item7", checked: false, title: "JavaScript" },
  { id: "item8", checked: false, title: "Java" },
];


const refresh = () => {
  renderDom(leftList, rightList);
}

// Render Dom
const renderDom = (leftListToRender, rightListToRender) => {
  clearDom();
  leftListToRender.forEach((item) => {
    elm_leftSide.innerHTML += `<div class="box">
        <input type="checkbox" class="input-box" id="${item.id}" />
        <label for="${item.id}">${item.title}</label>
        </div>`;
  });

  rightListToRender.forEach((item) => {
    elm_rightSide.innerHTML += `<div class="box">
          <input type="checkbox" class="input-box" id="${item.id}" />
          <label for="${item.id}">${item.title}</label>
          </div>`;
  });
  registerEvents();
  updateActions();
};

// Clear Dom
const put_ids = (array) => {
  for(let i=0; i <array.length; i++)  {
    array[i].id = `item${i+1}`;
    console.log(i, array[i].id);
  }
  return array;

  // console.log("put_ids");
  // return array.map((item, index) => {
  //   // console.log(item, index);
  //   item.id = `item${index}`;
  //   // console.log(item.id);
  //   return item;
  //   console.log(item);
  // });
};

const clearDom = () => {
  document.querySelectorAll(".side").forEach((el) => {
    el.innerHTML = "";
  });
};

// Update action buttons
const updateActions = () => {
  // Set default
  elm_all_2_left.classList.remove("disabled");
  elm_all_2_right.classList.remove("disabled");
  elm_2_right.classList.remove("disabled");
  elm_2_left.classList.remove("disabled");

  if(rightList.length === 0)
    elm_all_2_left.classList.add("disabled");

  if(leftList.length === 0)
    elm_all_2_right.classList.add("disabled");

  const left_selecteds = elm_leftSide.querySelectorAll(`input[type="checkbox"]:checked`);
  if(left_selecteds.length === 0)
    elm_2_right.classList.add("disabled");

  const right_selecteds = elm_rightSide.querySelectorAll(`input[type="checkbox"]:checked`);
  if(right_selecteds.length === 0)
    elm_2_left.classList.add("disabled");
  else {
    
  }
};

Array.prototype.removeByIndex = function(i) {
  if(!Number.isInteger(i) || i < 0) {
      return this; // access to THIS
  }
  return this.filter((f, indx) => indx !== i)
}
// const removeAIndex = (array, index) => {
//   // Bad way: delete leftList[index];
//   // return array.slice(0, index)
//   //             .concat(array.slice(index+1));
// };

const getIndexById = (array, id) => {
  // Can rewrite this function with modern JS, I love old method. it's cool.
  for(let i=0; i < array.length; i++) {
    if(array[i].id === id) {
      return i;
    }
  }
  return -1;
};

// Event
const handler_all_2_right = () => {
  console.log("elm_all_2_right");
  // const _left = [...leftList]; // Shallow copy
  let removed = 0;
  leftList.forEach((item, index) => {
    rightList.push(item);

    leftList = leftList.removeByIndex(index - removed);
    removed++;
  });

  // rightList = put_ids(rightList);

  refresh();
};

const handler_all_2_left = () => {
  console.log("elm_all_2_left");
  let removed = 0;
  // const _right = [...rightList]; // Shallow copy
  rightList.forEach((item, index) => {
    leftList.push(item);

    rightList = rightList.removeByIndex(index - removed);
    removed++;
  });

  // leftList = put_ids(leftList);

  refresh();
};

const handler_2_right = () => {
  console.log("elm_2_right");
  const left_selecteds = elm_leftSide.querySelectorAll(`input[type="checkbox"]:checked`);
  console.log(left_selecteds);
  for(const left_select of left_selecteds) {
    const i = getIndexById(leftList, left_select.id);
    if(i !== -1) {
      rightList.push(leftList[i]);
      leftList = leftList.removeByIndex(i);
    }
  }
  refresh();
};

const handler_2_left = () => {
  console.log("elm_2_left");
  const right_selecteds = elm_rightSide.querySelectorAll(`input[type="checkbox"]:checked`);
  console.log(right_selecteds);
  for(const right_select of right_selecteds) {
    const i = getIndexById(rightList, right_select.id);
    if(i !== -1) {
      leftList.push(rightList[i]);
      rightList = rightList.removeByIndex(i);
    }
  }
  refresh();
};

const registerEvents = () => {
  elm_all_2_right.removeEventListener('click', handler_all_2_right); // Can puyt third argument TRUE (mean: `, true)`) to make it once/one time callable function!
  elm_all_2_left.removeEventListener('click', handler_all_2_left);
  elm_2_right.removeEventListener('click', handler_2_right);
  elm_2_left.removeEventListener('click', handler_2_left);

  console.log(leftList.length, rightList.length);

  if(leftList.length > 0)
    elm_all_2_right.addEventListener('click', handler_all_2_right);

  if(rightList.length > 0)
    elm_all_2_left.addEventListener('click', handler_all_2_left);

  elm_2_right.addEventListener('click', handler_2_right);
  elm_2_left.addEventListener('click', handler_2_left);

  document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
    checkbox.removeEventListener("click", updateActions);
    checkbox.addEventListener("click", updateActions);
  });
};

window.addEventListener("load", () => {
  refresh()
});

