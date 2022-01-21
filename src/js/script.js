// variaveis que pegam os elementos que são tags de botões 
const btnBack = document.getElementsByClassName("btn__back")[0]
const btnForward = document.getElementsByClassName("btn__forward")[0]

// variável que pega o os elementos que compoem as imagens
const imgLogoApp = document.getElementsByClassName("img__logoApp")[0]
const imgPhotoOverlay = document.getElementsByClassName("img__photoOverlay")[0]
const linkImg = document.getElementById("linkImg")

// Obtem a localização geográfica do navegador
function getLocation (){
  navigator.geolocation.getCurrentPosition(function(position) {
    getImg(position.coords.latitude, position.coords.longitude)
  })

  function locationError() {
      const latitude = -25.4284
      const longitude = -49.2733
      getImg(latitude, longitude)
  }

  if(!navigator.geolocation){
      console.log("Serviço de localização não suportado em seu navegador")

    }else{
        navigator.geolocation.getCurrentPosition(locationError)
      }
  
}
getLocation()
 
//função que constrói a URL da fonte de imagens 
function constructImageURL (photoObj) {
  return "https://farm" + photoObj.farm +
   ".staticflickr.com/" + photoObj.server +
    "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


const getImg = (latitude, longitude) => {
  // chave api do Flickr
  let keyApiUrl = `https://shrouded-mountain-15003.herokuapp.com/https://www.flickr.com/services/rest/?api_key=4a014f54d64de29f0a87094ceae35ddd&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}&lon=${longitude}&text=cachorros`
  fetch(keyApiUrl)
    .then(res => res.json())
    .then(data => {

      // pega o valor de resposta para construir a imagem
      let indice = 0
      let imageUrl = constructImageURL(data.photos.photo[indice]);
      
      //constroi a primeira imagem assim que é carregada a pagina
      let imgGenerate = document.getElementsByClassName("img__photo")[0]
      imgGenerate.style.backgroundImage = `url(${imageUrl})`
      linkImg.setAttribute("href",imageUrl) 

      // se a imagem é gerada esconde a logo de fundo
      if(imgGenerate){
        imgLogoApp.style.display = "none"
      }

       // botão que avança a imagem
       btnForward.addEventListener("click", function(){
        imgPhotoOverlay.style.animation = ""
        setTimeout(() => imgPhotoOverlay.style.animation = "changeBGphotoApp linear 2s", 5)

        if(indice < data.photos.photo.length - 1){
          indice++
        }else{
          indice = 0
        }

        let imageUrl = constructImageURL(data.photos.photo[indice])
        let newImg = document.getElementsByClassName("img__photo")[0]
        newImg.style.backgroundImage = `url(${imageUrl})`
        linkImg.setAttribute("href",imageUrl) 
          
      }) 

      // botão que retrocede a imagem
      btnBack.addEventListener("click", function(){
        imgPhotoOverlay.style.animation = ""
        setTimeout(() => imgPhotoOverlay.style.animation = "changeBGphotoApp linear 2s", 5)
           
         
        if(indice < data.photos.photo.length && indice > 0){
          indice--
        }else{
          indice = 0
        }

        let imageUrl = constructImageURL(data.photos.photo[indice])
        let newImg = document.getElementsByClassName("img__photo")[0]
        newImg.style.backgroundImage = `url(${imageUrl})`
        linkImg.setAttribute("href",imageUrl) 
        
        
      })
  })
     
}







