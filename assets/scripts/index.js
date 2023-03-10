
function cargarCard(cards){
    let container = document.querySelector('#container');
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
                        <input type="button" id="btn-details" onClick="mostrarDetalles('${card._id}')" id="details" value="Details"</input>
                    </div>
                </div>
            </div>
    </div>
       `
    })
    container.innerHTML = cardsContainer
}


function filtrarCards(array){
    let cardsFiltradas =[]
    for (let i=0; i<array.length;i++){
        cardsFiltradas = cardsFiltradas.concat((data.events).filter (card => card.category == array[i]))
    }
    return cardsFiltradas;
}

cargarCard(data.events)
const categorias = document.querySelectorAll('input[type=checkbox]');
let values ='';
let categoriaChecked='';
for (let categoria of categorias){
    categoria.addEventListener('change', ()=> {
        categoriaChecked = document.querySelectorAll('input[type=checkbox]:checked')
        values = Array.from(categoriaChecked).map(categoria => categoria.value)
        let cardsFiltradas= filtrarCards(values)
            if (cardsFiltradas ==''){
                cargarCard(data.events)
            }else{
                cargarCard(cardsFiltradas)
                
            }    
    })
}   
    
    










    function mostrarDetalles(id){
        window.location.href = `./details.html?id=${id}`
      }


  
  
  
