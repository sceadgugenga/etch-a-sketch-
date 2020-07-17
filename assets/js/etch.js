// Make container
// make grid 

function setUp() {
    let body = document.querySelector("body")
    let controls = document.createElement("div")
    let title = document.createElement("div")
    title.classList.add("title", "flex-center")
    title.textContent = "Etch-a-Sketch"

    controls.id = "controls"
    // controls.style.width="600px"
    // controls.style.height="100px"
    controls.classList.add("flex-center")

    let buttons = {
        "setgrid-btn": "Set Grid Size",
        "clear-btn": "Clear",
        "color-btn": "Random",
        "additive-btn": "Additive",
        "erase-btn": "Eraser"
    }
    for (let key in buttons) {
        console.log(key)
        let div = document.createElement("div")
        div.id = key + "-div"
        div.classList.add("ctrl-div")

        let btn = document.createElement("button")
        btn.id = key
        btn.addEventListener("mousedown", e => {
            controlAction(e)
        })
        btn.classList.add("ctrl-btn")
        btn.textContent = buttons[key]
        if (key == "color-btn") {
            btn.classList.add("active-btn")
        }
        div.append(btn)
        controls.append(div)
    };



    let mainContainer = document.createElement("div")
    mainContainer.id = "main-container"
    mainContainer.classList.add("flex-center")
    mainContainer.style.width = "600px"
    mainContainer.style.height = "600px"

    let pageContainer = document.createElement("div")
    pageContainer.id = "page-container"
    // pageContainer.style.width="600px"
    // pageContainer.style.height="600px"

    pageContainer.append(title)
    pageContainer.append(controls)
    pageContainer.append(mainContainer)
    body.append(pageContainer)
}

function makeGrid(size = 16) {
    let mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ''
    let xSize = mainContainer.clientWidth

    let gridSize = xSize / size
    console.log(gridSize)

    for (let i = 0; i < size; i++) {
        let gridRow = document.createElement("div")
        gridRow.classList.add("grid-row")
        for (let c = 0; c < size; c++) {
            let gridEl = document.createElement("div")
            gridEl.style.width = gridSize + "px"
            gridEl.style.height = gridSize + "px"
            gridEl.classList.add("cell")
            gridEl.addEventListener("mouseover", function (e) {
                hoverAction(e)
            })
            gridRow.append(gridEl)
        }

        mainContainer.append(gridRow)
    }
}



function controlAction(event) {
    let btn = event.target
    let colorBtn = document.getElementById("color-btn")
    let addBtn = document.getElementById("additive-btn")    
    let eraseBtn = document.getElementById("erase-btn")

    if (btn.id == "clear-btn") {
        let cells = document.querySelectorAll(".cell")
        cells.forEach(element => {
            element.style.backgroundColor = ""
        });

    }
    
    if (btn.id == "color-btn") {
        if (!btn.dataset.color || btn.dataset.color == "black") {
            btn.dataset.color = "random"
            btn.textContent = "Black"
        } else {
            colorBtn.dataset.color = "black"
            btn.textContent = "Random"
        }
        
        colorBtn.classList.add("active-btn")
        eraseBtn.dataset.erase = "false"
        addBtn.disabled = false
        eraseBtn.classList.remove("active-btn")
    } 
    
    if (btn.id == "additive-btn") {
        if (!btn.dataset.additive || btn.dataset.additive == "false") {
            btn.dataset.additive = "true"
            
            addBtn.classList.add("active-btn")
            
            eraseBtn.classList.remove("active-btn")
            eraseBtn.dataset.erase = "false"
        } else {
            btn.dataset.additive = "false"
            addBtn.classList.remove("active-btn")
        }
        
    } 
    
    if (btn.id == "setgrid-btn") {
        let gridSize = NaN
        while (isNaN(gridSize)) {
            gridSize = prompt("Enter grid cell size:  ")
            gridSize = parseInt(gridSize)

        }
        makeGrid(gridSize)
    } 
    
    if (btn.id == "erase-btn") {
        if (!btn.dataset.erase || btn.dataset.erase == "false") {
            btn.dataset.erase = "true"
            colorBtn.classList.remove("active-btn")
            addBtn.classList.remove("active-btn")
            addBtn.disabled = true
            eraseBtn.classList.add("active-btn")
        } else {
            btn.dataset.erase = "false"
            colorBtn.classList.add("active-btn")
            addBtn.classList.remove("active-btn")
            addBtn.disabled = false
            eraseBtn.classList.remove("active-btn")

        }
        addBtn.dataset.additive = "false"
    }
}
    function hoverAction(event) {
        let cellColor
        let colorEl = document.getElementById("color-btn")
        let additiveEl = document.getElementById("additive-btn")    
        let eraseEl = document.getElementById("erase-btn")

        let additiveFill = additiveEl.dataset.additive || false
        let eraseFill = eraseEl.dataset.erase || false
        let fillType = colorEl.dataset.color || "black"
        if (fillType == "random") {
            let r = Math.floor(Math.random() * 254)
            let g = Math.floor(Math.random() * 254)
            let b = Math.floor(Math.random() * 254)
            let o = 1
            cellColor = `rgb(${r},${g},${b})`
        } else {
            cellColor = "black"
        }
        if (additiveFill == "true") {
            let opacity = event.target.style.opacity
            if (opacity != "") {
                event.target.style.opacity = parseFloat(opacity) + .1
            } else {
                event.target.style.opacity = 0.1
            }
        } else {
            console.log(additiveFill)
            event.target.style.opacity = 1
        }



        // 
        if (eraseFill == "true") {
            cellColor = ""
            // makeActive("erase-btn")
        }


        event.target.style.backgroundColor = cellColor
    }

    function makeActive(elementId) {
        let eraseBtn = document.getElementById("erase-btn")
        let colorBtn = document.getElementById("color-btn")
        let addBtn = document.getElementById("additive-btn")
        

        switch (elementId) {
            case eraseBtn.id:
                // eraseBtn.classList.remove("active-btn")
                colorBtn.classList.remove("active-btn")
                addBtn.classList.remove("active-btn")
                addBtn.disabled = true
                eraseBtn.classList.add("active-btn")
                break;
            case colorBtn.id:
                eraseBtn.classList.remove("active-btn")
                addBtn.disabled = false
                colorBtn.classList.add("active-btn")
                break;
            case addBtn.id:
                eraseBtn.classList.remove("active-btn")
                // addBtn.classList.remove("active-btn")
                addBtn.classList.add("active-btn")
                break;

        }
    }



    setUp()
    makeGrid()