// Initial Variables
let sketchpadResolution = 8;
let isBrushOn = false;

// Selecting DOM elements
const sketchArea = document.querySelector('#sketch-area');
const createBtn = document.querySelector('#create');
const brushStateText = document.querySelector('#brush-state');

// Event listeners
createBtn.addEventListener('click', ClickCreate);
sketchArea.addEventListener('click', ToggleBrush);
sketchArea.addEventListener('touchstart', TurnBrushOn);
sketchArea.addEventListener('touchend', TurnBrushOff);
sketchArea.addEventListener('touchmove', FingerPaint);


// Start-up
CreateGrid(sketchpadResolution);

// Functions
function ClickCreate() {
    RemoveAllChildren(sketchArea);

    let resolutionInput = document.querySelector('#grid-size').value;

    if (resolutionInput >= 8 && resolutionInput <= 64) {
        sketchpadResolution = resolutionInput;
        
        CreateGrid(sketchpadResolution);
    }

    else {
        alert('Grid size must be between 8 and 64.');
        CreateGrid(sketchpadResolution);   
    }
}

function RemoveAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function CreateGrid(sketchpadResolution) {
    let pixelSize = `${600 / sketchpadResolution}px`
    
    for (let i = 1; i <= (sketchpadResolution * sketchpadResolution); i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('sketch-pixel');
        pixel.setAttribute('style', `height: ${pixelSize}; width: ${pixelSize}`)
        pixel.addEventListener('mouseenter', Paint);

        sketchArea.appendChild(pixel);
    }
}

function Paint(e) {
    if (isBrushOn) {
        e.target.style.backgroundColor = 'black';
    }
}

function ToggleBrush() {
    if (!isBrushOn) {
        isBrushOn = true;
    }
    else isBrushOn = false;

    UpdateBrushText();
}

function TurnBrushOn(e) {
    isBrushOn = true;
    UpdateBrushText();
}

function TurnBrushOff(e) {
    isBrushOn = false;
    UpdateBrushText();
}

function UpdateBrushText() {
    if (isBrushOn) { brushStateText.textContent = 'On'; }
    else { brushStateText.textContent = 'Off'; }
}

function ReleasePointer(e) {
    e.target.releasePointerCapture(e.pointerId);
}

function FingerPaint (e) {

    let element = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
    
    if (isBrushOn && element.className == 'sketch-pixel') {
        element.style.backgroundColor = 'black';
    }
}