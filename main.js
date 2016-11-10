$.getJSON('https://calm-thicket-39625.herokuapp.com/api/notes')
  .then(function(response){
    response.notes.forEach(function(note){
      $('#notes').prepend('<h3>'+ note.title + '</h3>' + '<p>' + note.body + '</p>')
    })
  })
