$(document).ready(function(){
  $.getJSON('https://calm-thicket-39625.herokuapp.com/api/notes')
    .then(function(response){
      response.notes.forEach(function(note){
        var display_notes = template(note)
        $('#handlebar_notes').prepend(display_notes)
      })
    })

  if(window.location.hash.match(/#\d+/).length > 0) {
   id = window.location.hash.substring(1)
   $.getJSON('https://calm-thicket-39625.herokuapp.com/api/notes/' + id)
   .then(function(response){
     console.log(response)
     var modal = modal_template(response.note)
     $('#note_modal').prepend(modal)
   })
   }
})

var modal_source   = $("#modal-template").html()
var modal_template = Handlebars.compile(modal_source)

var note_source   = $("#note-template").html()
var template = Handlebars.compile(note_source)

function handle_note_form(response){
  var display_notes = template(response.note)
  $('#handlebar_notes').prepend(display_notes)
  clear_form('#note')
}
function clear_form(selector){
  $(selector)[0].reset()
}
$('#note').on('submit', function (ev){
  ev.preventDefault()
  $.post('https://calm-thicket-39625.herokuapp.com/api/notes',
  $(this).serializeArray()
).done(function(response){
  handle_note_form(response)
  })
})
$('#handlebar_notes').on('click', '.tag_link', function(ev){
  ev.preventDefault()
  $('#handlebar_notes').html('')
  $.getJSON('https://calm-thicket-39625.herokuapp.com/api/notes/tag/' + $(this).html())
  .then(function(response){
  response.tag.notes.forEach(function(notes){
    var display_notes = template(notes)
    $('#handlebar_notes').prepend(display_notes)
    $('#header').html('')
    $('#header').append('Notemeister 5000: ' + response.tag.name)
  })
  })

})
