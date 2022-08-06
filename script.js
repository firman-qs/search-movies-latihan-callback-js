$('.row .col form button').on('click', function () {

    // $('.movie-container').html(''); //jquery selector

    $.ajax({
        url: `https://www.omdbapi.com/?apikey=dca61bcc&s=${$('.input-keyword').val()}`,
        // url: `database/${$('.input-keyword').val()}.json`, //jika batas pakai API habis (untuk tes)
        success: result => {
            const movies = result.Search;
            let cards = ''
            movies.forEach(e => {
                cards += showCard(e);
                $('.movie-container').html(cards);
                $('.modal-detail-button').on('click', function () {
                    $.ajax({
                        url: `https://www.omdbapi.com/?apikey=dca61bcc&i=${$(this).data('imdbid')}`,
                        // url: `database/avengers2.json`, //jika batas pakai API habis (untuk tes)
                        success: result => {
                            $('.modal-title').html(result.Genre)
                            $('.modal-body .title').html(`<h4>${result.Title}</h4>`)
                            $('.modal-body .plot').html(`<h6>Plot:</h6>${result.Plot}`)
                            $('.modal-body .director').html(`<h6>Director:</h6>${result.Director}`)
                            $('.modal-body .writer').html(`<h6>Writer:</h6>${result.Writer}`)
                            $('.modal-body .actor').html(`<h6>Actor:</h6>${result.Actors}`)
                            $('.modal-body .released').html(`<h6>Released:</h6>${result.Released}`)
                            $('.img-thumbnail').attr("src", `${result.Poster}`)
                        }, error: () => {
                            $('.modal-body').html(`<h2>ERROR 404 NOT FOUND !</h2>`)
                        }
                    })
                })
            });
        },
        error: (e) => {
            console.log(e.responseText)
        }
    })
})


// function
function showCard(e) {
    return `<div class="col-md-3 my-3">
        <div class="card h-100">
            <img src="${e.Poster}" class="card-img-top h-100">
            <div class="card-body h-100">
                <h6 class="mb-3 card-title">${e.Title}</h6>
                <h6 class="mb-3 card-subtitle mb-2 text-muted"><small><strong>Released :</strong> ${e.Year}</small></h6>
                <a href="${e.Poster}" class="mb-1 btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdbid ="${e.imdbID}"><small>show details</small></a>
            </div>
        </div>
    </div>`
}

