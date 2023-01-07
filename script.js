// COLOR PALETTES. A color palette is an array of swatches defined as hex code strings.
let blackPalette = ['#000000'];
let randomPalette = ['random'];
let eraserPalette = ['whitesmoke'];

// DOM ELEMENTS
const sketchArea = document.querySelector('#sketch-area');
const createBtn = document.querySelector('#create');
const brushStateText = document.querySelector('#brush-state');
const clearBtn = document.querySelector('#clear');
const resolutionInput = document.querySelector('#grid-size');
const paletteBtns = document.querySelectorAll('.palette-button');
const paletteStateText = document.querySelector('#palette-state');

// INITIAL GLOBAL VARIABLES
let sketchpadResolution = 16;
resolutionInput.value = sketchpadResolution;
let isBrushOn = false;
let palette = blackPalette;
let paletteState = 'Black';


// EVENT LISTENERS
createBtn.addEventListener('click', ClickCreate);
clearBtn.addEventListener('click', ClickClear);
sketchArea.addEventListener('click', ToggleBrush);
sketchArea.addEventListener('touchstart', TurnBrushOn);
sketchArea.addEventListener('touchend', TurnBrushOff);
sketchArea.addEventListener('touchmove', FingerPaint);
paletteBtns.forEach(btn => btn.addEventListener('click', SelectPalette));


// START-UP
document.querySelector('#grid-size').value = sketchpadResolution;
CreateGrid(sketchpadResolution);

// FUNCTIONS
function ClickCreate() {
    RemoveAllChildren(sketchArea);

    let newResolution = resolutionInput.value

    if (newResolution >= 8 && newResolution <= 64) {
        sketchpadResolution = newResolution;
        
        CreateGrid(sketchpadResolution);
    }

    else {
        alert('Grid size must be between 8 and 64.');
        CreateGrid(sketchpadResolution);   
    }
}

function ClickClear() {
    RemoveAllChildren(sketchArea);
    CreateGrid(sketchpadResolution); 
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
        e.target.style.backgroundColor = PickColor(palette);
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
        element.style.backgroundColor = PickColor(palette);
    }
}

function SelectPalette(e) {
    let selectedPalette = e.target.id; 

    switch (selectedPalette) {
        case 'black-palette':
            palette = blackPalette;
            paletteState = 'Black';
            break;
        case 'random-palette':
            palette = randomPalette;
            paletteState = 'Random';
            break;
        case 'eraser-palette':
            palette = eraserPalette;
            paletteState = 'Eraser';
            break; 
        default:
            palette = blackPalette;
            paletteState = 'Black';
            break;
    }

    paletteStateText.textContent = paletteState;
}

//Selects a random color from a palette
function PickColor(palette) {
    if (palette[0] == 'random') { return RandomColor(); }
    else {
        let swatch = Math.floor(Math.random() * palette.length);    
        let color = palette[swatch];
        return color;
    }
}

//Returns a random color hexcode string
function RandomColor() {
    let red = Random255().toString(16);
    let blue = Random255().toString(16);
    let green = Random255().toString(16);
    return `#${red}${blue}${green}`;
}

//Picks a random integer between 1 and 255
function Random255() {
    return Math.floor(Math.random() * 255) + 1;
}