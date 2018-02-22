$(document).ready(() => {
  $('#pictureoftheday').click(showDaily);
  $('#earth').click(showEarth);

})

// Primer llamado ajax
function showDaily() {
  $.ajax({
    // ocupo un archivo json local
    url: 'https://api.nasa.gov/planetary/apod?api_key=uZqjUdT9VR4OPl2blitAZDgVQLxEtTIzJd4DKTJj',
    type: 'GET',
    // no ess que siempre devuelva un json, pero la información obtenida la trata como tal
    datatype: 'json',
  })

  // puede ser cualquier nombre de parámetro
    .done(function(response) {
      console.log(response);
      // si el llamado fue correcto, llama a la función
      showFirstInfo(response);
    })
    .fail(function(error) {
      // si el llamado falla
      console.log('error');
    })
}

// primera función, recibe el mismo archivo json, el parámetro no necesariamente debe tener el mismo nombre
function showFirstInfo(info) {
  $('#contenedorVacio').empty()
  $('#contenedorVacio').append(`<img src="${info.url}"><p>${info.explanation}</p>`);
}



function showEarth() {
  $.ajax({
    // ocupo un archivo json local
    url: 'https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2017-02-01&cloud_score=True&api_key=uZqjUdT9VR4OPl2blitAZDgVQLxEtTIzJd4DKTJj',
    type: 'GET',
    // no ess que siempre devuelva un json, pero la información obtenida la trata como tal
    datatype: 'json',
  })

  // puede ser cualquier nombre de parámetro
    .done(function(response) {
      console.log(response);
      // si el llamado fue correcto, llama a la función
      showSecondInfo(response);
    })
    .fail(function(error) {
      // si el llamado falla
      console.log('error');
    })
}

// primera función, recibe el mismo archivo json, el parámetro no necesariamente debe tener el mismo nombre
function showSecondInfo(info) {
  console.log(info.url)
  $('#contenedorVacio').empty()
  //$('#contenedorVacio').append(`<img src="${info.url}"`);
  $('#contenedorVacio').append(`<img src="${info.url} alt=""><div class="responsive-img"</div>`);
}

// boton de busqueda
$('#search').click(function() {
 const inputValue = $('#input-search').val();
 const inputValueLower = inputValue.toLowerCase();
 $.ajax({
   url : `https://images-api.nasa.gov/search?q=${inputValueLower}`,
   type: 'GET',
   datatype: 'json',
   success: function(result) {
     console.log(result.collection.items);
     $.ajax({
     url: result.collection.items[0].href,
     type: 'GET',
     datatype: 'json',
     success: function(result) {
       /*
       * For each recibe cada elemento
       * Las condiciones del if permiten que al recibir un video quede "apendeado" en un iframe
       * En caso de ser una imagen se apendea en una etiqueta img.
       */
       result.forEach(el => {
        /*
           $('#contenedorVacio').append(`
           <div class="col s12 xl12 col l12 col m12">
           <div class="video-container">
           
           </div>
           </div>`);
           */
          console.log(el)
           $('#image-container').append(`<div class="col s12 xl12 col l12 col m12">
            <iframe class="responsive-video" controls autoplay="false" src="${el.url}" type="text/html" frameborder="0"></iframe>
            <img src="${el}" alt="" class="responsive-img"></div>`);
       });
     }
   })
   $('#image-container').empty();
   }
 })
});



