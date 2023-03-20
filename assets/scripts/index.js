
const contenedor = document.querySelector('#container')
const contenedorCheck = document.querySelector('#categorias')
const input = document.querySelector('input')



let cards =[]
function traerDatos(){
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(datosApi => {

    cards = datosApi.events
    cargarCard(cards)
    crearCheckBoxes(cards)

})
.catch(error => console.log(error.message))
}




traerDatos()
input.addEventListener('input', filtrar)
contenedorCheck.addEventListener('change', filtrar)

function filtrarXBuscador(cards, texto){
    
    let arrayFiltrado = cards.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado

}

function filtrarXCategoria(cards){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    console.log(arrayChecksCheckedValues);
    let arrayFiltrado = cards.filter(elemento => arrayChecksCheckedValues.includes(elemento.category))
    if(arrayChecksChecked.length > 0){
        return arrayFiltrado
    }
    return cards
}





function filtrar(){
    let searchFilter = filtrarXBuscador(cards, input.value)
    let checkFilter = filtrarXCategoria(searchFilter)
    cargarCard(checkFilter)
}



function crearCheckBoxes(cards){
    let arrayCategorias = cards.map(card => card.category)
    let setCategorias = new Set(arrayCategorias)
    let arrayChecks = Array.from(setCategorias)
    let checkBoxes = ''
    arrayChecks.forEach(categoria => {
        checkBoxes += 
            `<div class="form-check form-check-inline">
                <label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
                <input class="form-check-input" type="checkbox" name="categoria" id="" value=${categoria}>
            </div>`
    })
    contenedorCheck.innerHTML = checkBoxes
}

function cargarCard(cards){
    let container = document.querySelector('#container');
    if(cards.length == 0){
        contenedor.innerHTML = `<h3 class="fw-bolder text-center">No hay coincidencias</h3>`
        return
    }
    let cardsContainer=''
    cards.forEach(card => {
    cardsContainer += `
    <div class="col">
            <div class="card" value="card">
                <img class="card-img" id="img-card" src=${card.image} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center text-color-dark" id="card-name">${card.name}</h5>
                    <p class="card-text text-center">${card.description}</p>
                </div>
                <p class="card-text text-center">Date: ${card.date}</p>
                <div class="row card-footer">
                    <div class="col-6">
                        <small class="text" id="price">Price $${card.price}</small>
                    </div>
                    <div class="col-6">
                        <input type="button" id="btn-details" onClick="mostrarDetalles('${card._id}')" value="Details"></input>
                    </div>
                </div>
            </div>
    </div>
       `
    })
    container.innerHTML = cardsContainer
}




function mostrarDetalles(id){
    window.location.href = `./details.html?id=${id}`
}


  
  
  
