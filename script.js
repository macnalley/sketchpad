let sketchpadResolution = 10;

// Selecting DOM elements

const sketchArea = document.querySelector('#sketch-area');
const createBtn = document.querySelector('#create');

// Event listeners

createBtn.addEventListener('click', CreateClick);


// Creating the sketchpad
CreateGrid(sketchpadResolution);



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
    let pixelSize = `${500 / sketchpadResolution}px`
    
    for (let i = 1; i <= (sketchpadResolution * sketchpadResolution); i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('sketch-pixel');
        pixel.setAttribute('style', `height: ${pixelSize}; width: ${pixelSize}`)
        
        sketchArea.appendChild(pixel);
    }
}