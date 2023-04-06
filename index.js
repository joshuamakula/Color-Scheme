const inputColor = document.getElementById('input-color')
const getColorBtn = document.getElementById('get-color-btn')
const selectScheme = document.getElementById('select-scheme')
const colorSection = document.getElementById('color-section')
const footer = document.getElementById('footer')

let mode = selectScheme.value

const getSchemes = (colorInHex) => {
    let scheme = ''
    for(let i =0; i < 5; i++) {
        if(colorInHex) {
            scheme += `
                <div style="background: ${colorInHex}" class="color-shade"></div>
            `
        }
    }
    if(scheme !== undefined){
        colorSection.innerHTML += scheme
    }
}

getSchemes()

getColorBtn.addEventListener('click', () => {
    colorSection.innerHTML = ''
    const selectedColor = selectScheme.value
    const pickedColor = inputColor.value.replace(/\W/g, "")
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${pickedColor}&mode=${selectedColor}&count=6`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = ''
            const colorSchemeArr = data.colors
            colorSchemeArr.map(colorSection => {
                const colorsHex = colorSection.hex.value
                html += `
                <div class="hex-input">${colorsHex}</div>`
                    getSchemes(colorsHex)
            })
            footer.innerHTML = html
        }) 
})