let container = document.querySelector(".container");
let gridButton = document.getElementById("Create-Grid-btn");
let clearGridButton = document.getElementById("Clear-Grid-btn");
let gridWidth = document.getElementById("grid-width-input");
let gridHeight = document.getElementById("grid-height-input");
let colorButton = document.getElementById("Color-Input");
let eraseBtn = document.getElementById("Erase-btn");
let paintBtn = document.getElementById("Paint-btn");
let widthValue = document.getElementById("grid-width-value");
let heightValue = document.getElementById("grid-height-value");

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    deviceType = "touch";
    console.log("touch");
    return true;
  } else {
    deviceType = "mouse";
    console.log("mouse");
    return false;
  }
};

isTouchDevice();

gridButton.addEventListener("click", function (e) {
  container.innerHTML = "";
  let height = gridHeight.value;
  let width = gridWidth.value;

  let count = 0;
  for (let i = 0; i < height; i++) {
    count += 1;

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("gridRow");

    for (let j = 0; j < width; j++) {
      count += 1;

      let columnCell = document.createElement("div");
      columnCell.classList.add("gridCol");
      columnCell.setAttribute("id", `cell${count}`);

      columnCell.addEventListener(events[deviceType].down, function (e) {
        draw = true;
        if (erase) {
          !isTouchDevice()
            ? (document.elementFromPoint(
                e.clientX,
                e.clientY
              ).style.backgroundColor = "transparent")
            : (document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
              ).style.backgroundColor = "transparent");
        } else {
          !isTouchDevice()
            ? (document.elementFromPoint(
                e.clientX,
                e.clientY
              ).style.backgroundColor = colorButton.value)
            : (document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
              ).style.backgroundColor = colorButton.value);
        }
      });

      columnCell.addEventListener(events[deviceType].move, (e) => {
        let elementClickedId = !isTouchDevice()
          ? document.elementFromPoint(e.clientX, e.clientY).id
          : document.elementFromPoint(
              e.touches[0].clientX,
              e.touches[0].clientY
            ).id;

        doTheJob(elementClickedId);
      });

      columnCell.addEventListener(events[deviceType].up, function () {
        draw = false;
      });

      rowContainer.appendChild(columnCell);
    }
    container.appendChild(rowContainer);
  }
});

function doTheJob(elementId) {
  let elementa = document.getElementById(elementId);
  if (draw && !erase) {
    elementa.style.backgroundColor = colorButton.value;
  } else if (draw && erase) {
    elementa.style.backgroundColor = "transparent";
  }
}

clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
  erase = true;
});

paintBtn.addEventListener("click", () => {
  erase = false;
});

gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
