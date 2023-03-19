

function crearArrayCategorias(cards){
  let arrayCategorias = cards.map(card => card.category)
  let setCategorias = new Set(arrayCategorias)
  let categorias = Array.from(setCategorias)
  
  return categorias
  
  
}




function gananciaXCategoria(cards, categoria, eventoPasado){
  let total = 0
  if (eventoPasado){
    cardsFiltradas = cards.filter(card => (card.category == categoria && card.hasOwnProperty('assistance')));
    for (let card of cardsFiltradas){
    
      total += (card.assistance*card.price)
    }
  }else{
    cardsFiltradas = cards.filter(card => (card.category == categoria && card.hasOwnProperty('estimate')));
    for (let card of cardsFiltradas){
    
      total += (card.estimate*card.price)
    }
  }
  return total
}


function mayorCapacidad(cards){
  let mayor = cards[0].capacity
  let name = cards[0].name
  cards.forEach(card => {
    if (card.capacity>mayor){
      mayor = card.capacity
      name = card.name
    }
  });
  return name+' ('+mayor+')'
}

function porcent(card){
  let porcentaje = (card.assistance*100/card.capacity).toFixed(2)
  return porcentaje
}

function porcentAsistenciaXCateg(cards, categoria, eventoPasado){
 
  let total = 0
  let cont = 0
  if (eventoPasado){
    cards = cardsFiltradas.filter(card => (card.category == categoria && card.hasOwnProperty('assistance')))
    cards.forEach(card =>{
      cont++
      total += (card.assistance*100/card.capacity)
    })
  }else{
    cards = cardsFiltradas.filter(card => (card.category == categoria && card.hasOwnProperty('estimate')))
    cards.forEach(card =>{
      cont++
      total += (card.estimate*100/card.capacity)
    })
  }
  
  total = (total/cont).toFixed(2)

  return total
}



function eventoMasConcurrido(cards){
  
  let mayor = porcent(cards[0])
  let evento = cards[0].name
  cards.forEach(card =>{ 
      let porcentaje = porcent(card)
      if (porcentaje>mayor){
        mayor = porcentaje
        evento = card.name
      }
    
  })

  return evento+' ('+mayor+'%)'
}

function eventoMenosConcurrido(cards){
  let menor = porcent(cards[0])
  let evento = cards[0].name
  cards.forEach(card =>{
      let porcentaje = porcent(card) 
      if (porcentaje<menor){
        menor = porcentaje
        evento = card.name
      }
  })
  return evento+' ('+menor+'%)'
}

let cards =[]

function traerDatos(){
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(datosApi => {
    cards = datosApi.events
    let categorias = crearArrayCategorias(cards)
    pintarTabla(cards,categorias)
  })
  .catch(error => console.log(error.message))
}


function pintarTabla(cards, categorias){
  const container = document.querySelector('#stats')
  let mayor = mayorCapacidad(cards)
  let eventoMayor = eventoMasConcurrido(cards.filter(card => card.hasOwnProperty('assistance')))
  let eventoMenor = eventoMenosConcurrido(cards.filter(card => card.hasOwnProperty('assistance')))
  let tableContainer =''
  tableContainer = `
                        <tr>
                          <th colspan="3" class="text-center">Events statistics</th>
                        </tr>
                        <tr>
                          <th>Events with the highest percentage of attendance</th>
                          <th>Events with the lowest percentage of attendance</th>
                          <th>Event with larger capacity</th>
                        </tr>
                        <tr>
                          <td>${eventoMayor}</td>
                          <td>${eventoMenor}</td>
                          <td>${mayor}</td>
                        </tr>

                        <tr>
                          <th colspan="3" class="text-center">Upcoming events statistics by category</th>
                        </tr>
                        <tr>
                          <th>Categories</th>
                          <th>Revenues</th>
                          <th>Percentage of attendance</th>
                        </tr>`
                        
                        categorias.forEach(categoria =>{
                          ganancia = gananciaXCategoria(cards, categoria,false);
                          porcentAsistencia = porcentAsistenciaXCateg(cards, categoria, false);
                          if (ganancia>0){
                            tableContainer += `<tr>
                                              <td>${categoria}</td>   
                                              <td>$${ganancia}</td>  
                                              <td>${porcentAsistencia}%</td>      
                                            </tr>`
                          }
                          
                        })
                          
                        tableContainer+=`<tr>
                          <th colspan="3" class="text-center">Past events statistics by category</th>
                        </tr>
                        <tr>
                          <th>Categories</th>
                          <th>Revenues</th>
                          <th>Percentage of attendance</th>
                        </tr> `
                        
                        categorias.forEach(categoria =>{
                          ganancia = gananciaXCategoria(cards, categoria, true);
                          porcentAsistencia = porcentAsistenciaXCateg(cards, categoria, true);
                          if (ganancia>0){
                            tableContainer += `<tr>
                                                <td>${categoria}</td>   
                                                <td>$${ganancia}</td>  
                                                <td>${porcentAsistencia}%</td>      
                                              </tr>`
                          }
                        })
                  
                        
                      
container.innerHTML = tableContainer
}

traerDatos()