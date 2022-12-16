console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  getKoalas()
  $('body').on('click', '.readyToTranserButton', readyToTransferButton);
  $('body').on('click', '.deleteButton', deleteButton);
  // load existing koalas on page load
  

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object

    let newName = $('#nameIn').val();
    let newAge = $('#ageIn').val();
    let newGender = $('#genderIn').val();
    let newReadyForTransfer = $('#readyForTransferIn').val();
    console.log(newReadyForTransfer);
    let newNotes = $('#notesIn').val();
    
    let koalaToSend = {
      name: newName,
      age: newAge,
      gender: newGender,
      readyForTransfer: newReadyForTransfer,
      notes: newNotes,
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );

    newName = $('#nameIn').val('');
    newAge = $('#ageIn').val('');
    newGender = $('#genderIn').val('');
    newReadyForTransfer = $('#readyForTransferIn').val('');
    newNotes = $('#notesIn').val('');
   }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    //render koalas
    $('#viewKoalas').empty();

  
    for (let koala of response) {
      if (koala.ready_to_transfer === 'Y') {
      $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td></td>
          <td><button class="deleteButton">Delete</button></td>
        </tr>
      `); 
      }
      else {
        $('#viewKoalas').append(`
        <tr data-id=${koala.id}>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transfer}</td>
          <td>${koala.notes}</td>
          <td><button class="readyToTranserButton">Ready for Transfer</button>
          <td><button class ="deleteButton">Delete</button></td>
        </tr>
      `); 
      }
    }
  }).catch(function(error) {
    console.log('error in GET', error);
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 $.ajax({
  type: 'POST',
  url: '/koalas',
  data: newKoala
 }).then(function(response) {
   console.log('Response from server', response);
   //then fetch and render koalas
   getKoalas();
 }).catch(function(error) {
   console.log('Error in POST', error)
   alert('Unable to add new koala at this time.')
 });
}


// update for specific koala
// RFT button only appears for koalas who haven't been "marked"
// for transfer yet
function readyToTransferButton(){
  let idToUpdate = $(this).parent().parent().data().id;
  console.log(idToUpdate);

  $.ajax({
    method: 'PUT',
    url: `/koalas/${idToUpdate}`,
    data: {
      ready_to_transfer: 'Y'
    }
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
      console.log('unable to update', error)
  })
} //end of readyToTransferButton function


function deleteButton() {
  let idToDelete = $(this).parent().parent().data().id;

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${idToDelete}`
  }).then((response) => {
    getKoalas();
  }).catch((error) => {
    console.log('deleteButton broken', error);
  })
}; //end of deleteButton function
