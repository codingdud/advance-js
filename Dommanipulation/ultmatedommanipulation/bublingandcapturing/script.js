const parent0 = document.getElementById("parent_0");
function handelEvent(type, selector, handeler, capture = false) {
  document.querySelector(selector).addEventListener(type, handeler, capture);
}

handelEvent("click", "#addchild", add);
handelEvent("click", "#removechild", remove);

function add() {
  //console.log(parent0.childNodes)
  let c=1;
  const lastparentdev = (parent) => {
    for (let it of parent.childNodes) {
      if (it && it.id && it.id.includes("parent")) {
        c++;
        return lastparentdev(it);
      }
    }
    return [c, parent];
  };
  let[count,parent]=lastparentdev(parent0);
  parent.innerHTML = `
    <div class="controls">
    <span class="control">
        <label for="check_capture_${count}">stop capturing</label>
        <input type="checkbox" id="check_capture_${count}" />
    </span>
    <span> parent_${count} </span>
      <span class="control">
        <label for="check_bubble_${count}">stop Bubbling</label>
        <input type="checkbox" id="check_bubble_${count}" />
      </span>
    </div>
    <div class="parent" id="parent_${count}"></div>
  `;
  parent.addEventListener("click", (e) => {
    console.log(`capture parent_${count}`);
    const stopCapture = document.getElementById(`check_capture_${count}`);
    if (stopCapture && stopCapture.checked) {
      e.stopPropagation();
      console.log(`stopped capture parent_${count}`);
    }
  }, true);
  parent.addEventListener("click", (e) => {
    console.log(`bubbling parent_${count}`);
    const stopBubble = document.getElementById(`check_bubble_${count}`);
    if (stopBubble && stopBubble.checked) {
      e.stopPropagation();
      console.log(`stopped bubbling parent_${count}`);
    }
  });
}

function remove() {
    const lastparentdev = (parent) => {
    for (let it of parent.childNodes) {
      if (it && it.id && it.id.includes("parent")) {
        return lastparentdev(it);
      }
    }
    return parent;
  };
  const child=lastparentdev(parent0)
  if(child===parent0) return;
  child.remove();
}
