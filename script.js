// Initial Variables
let sketchpadResolution = 10;
let brushOn = false;

// Selecting DOM elements
const sketchArea = document.querySelector('#sketch-area');
const createBtn = document.querySelector('#create');
const brushStateText = document.querySelector('#brush-state');

// Event listeners
createBtn.addEventListener('click', CreateClick);
sketchArea.addEventListener('click', ToggleBrush);

// Start-up
CreateGrid(sketchpadResolution);

// Functions
function CreateClick() {
    RemoveAllChildren(sketchArea);

    let resolutionInput = document.querySelector('#grid-size').value;

    if (resolutionInput >= 10 && resolutionInput <= 100) {
        sketchpadResolution = resolutionInput;
        
        CreateGrid(sketchpadResolution);
    }

    else {
        alert('Grid Size must be between 10 and 100.');
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
    if (brushOn) {
        e.target.style.backgroundColor = 'black';
    }
}

function ToggleBrush() {
    if (!brushOn) {
        brushOn = true;
    }
    else brushOn = false;

    UpdateBrushText();
}

function UpdateBrushText() {
    if (brushOn) brushStateText.textContent = 'On';
    else brushStateText.textContent = 'Off';
}