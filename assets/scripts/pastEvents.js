let cards= (data.events).filter(card => card.date < data.currentDate);
function cargarCard(cards){
  let container = document.querySelector('#container');
  let cardsContainer =''
  cards.forEach(card => {
    cardsContainer += `
    <div class="col">
            <div class="card">
                <img class="card-img rounded-4" src=${card.image} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-center text-color-dark">${card.name}</h5>
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
    `;
  });
  container.innerHTML = cardsContainer
}

cargarCard(cards)

function filtrarCards(array){
  let cardsFiltradas =[]
  for (let i=0; i<array.length;i++){
      cardsFiltradas = cardsFiltradas.concat((cards).filter (card => card.category == array[i]))
  }
  return cardsFiltradas;
}


const categorias = document.querySelectorAll('input[type=checkbox]');
let values =[];
let categoriaChecked;
for (let categoria of categorias){
  categoria.addEventListener('change', ()=> {
      categoriaChecked = document.querySelectorAll('input[type=checkbox]:checked')
      values = Array.from(categoriaChecked).map(categoria => categoria.value)
      let cardsFiltradas= filtrarCards(values)
      if (cardsFiltradas ==''){
          cargarCard(cards)
      }else{
          cargarCard(cardsFiltradas)   
      }    
  })
}   



function mostrarDetalles(id){
  window.location.href = `./details.html?id=${id}`
} 
  