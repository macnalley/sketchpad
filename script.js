let sketchpadResolution = 10;

// Selecting DOM elements

const sketchArea = document.querySelector('#sketch-area');

// Creating the sketchpad

CreateGrid(sketchpadResolution);

function CreateGrid(sketchpadResolution) {
    const pixelSize = `${500 / sketchpadResolution}px`
    
    for (let i = 1; i <= (sketchpadResolution * sketchpadResolution); i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('sketch-pixel');
        pixel.setAttribute('style', `height: ${pixelSize}; width: ${pixelSize}`)
        
        sketchArea.appendChild(pixel);
    }
}