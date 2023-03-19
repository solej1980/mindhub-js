let cards =[]
let params = new URLSearchParams(document.location.search)
  let id = params.get("id")
function traerDatos(){
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(datosApi => {
  cards = datosApi.events
  mostrarCard(cards,id)
  
})
.catch(error => console.log(error.message))
}
  
 traerDatos()
 

 
  
  function mostrarCard(cards,id){
  let profile = (cards).filter(info=>info._id==id);

  const container = document.querySelector('#card-details')
  container.innerHTML = `
          <div> 
            <img src=${profile[0].image} id="img-detail" alt="imagen-evento">
          </div>
          <div class="card-body" id="card-body">
          <a href="javascript:history.back()"><svg xmlns="http://www.w3.org/2000/svg" id="cerrar" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg><i class="fa-solid fa-xmark"></i></a>

            <h5 class="card-title text-center text-color-dark">${profile[0].name}</h5>
            <ul>
              <li class="card-text">${profile[0].description}</li>
              <li class="card-text">Date: ${profile[0].date}</li>
              <li class="card-text">Price: $${profile[0].price}</li>
              <li class="card-text">Category: ${profile[0].category}</li>
              <li class="card-text">Capacity: ${profile[0].capacity}</li>
              <li id="opcion"></li> 
            </ul>
            
          </div>
          ;`
const li = document.querySelector('#opcion')
if (profile[0].hasOwnProperty('assistance')){
  li.innerHTML = `<li class="card-text">Assistance:  ${profile[0].assistance}</li>`
}else{
  li.innerHTML = `<li class="card-text">Estimate: ${profile[0].estimate}</li>`
}
}
