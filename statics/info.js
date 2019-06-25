const URL = "http://127.0.0.1:8080/"
let current_movies = [];

$(document).ready(() => {
    let id = window.location.href.split("=")[1];  // get id
    query({'opt':"id", 'id': id});
});

function query(data) {
    $.ajax({
        'url': URL+"api",
        'type': "POST",
        'contentType': "text/plain",
        'data': JSON.stringify(data),
        'success': (res) => {
            parseJson(res);
            if (data.opt === "id") {
                updateInfos();
            } else if (data.opt === "recommend") {
                updateRecommendations();
            }
        }
    });
}

function parseJson(res) {
    let data = JSON.parse(res);
    current_movies = [];  // clear
    data.forEach(element => {
        current_movies.push({
            'id': element.id,
            'alt': element.alt,
            'year': element.year,
            'title': element.title,
            'rating': element.rating,
            'original_title': element.title,
            'directors': element.directors,
            'casts': element.casts,
            'genres': element.genres,
            'image': element.image
        });
    });
}

function updateInfos() {
    let infos;
    if (current_movies.length > 0) infos = current_movies[0];
    else return;

    document.title = infos.title;
    $('#title').html(infos.title+' '+infos.original_title);
    $('#post img').attr('src', infos.image);
    $(".director")[0].innerText = infos.directors.split(",").slice(0, 3).join(' / ');
    $(".actor")[0].innerText = infos.casts.split(",").slice(0, 3).join(' / ');
    $(".genre")[0].innerText = infos.genres.split(',').join(' / ');
    $(".release-date")[0].innerText = infos.year;

    let genres = current_movies[0].genres.split(",");
    query({'opt':"recommend", 'tags': genres, 'limit': 4});
}

function updateRecommendations() {
    $("#recommendations").html("");

    // random shuffle movies list
    for (let i=0; i<current_movies.length && i<4; i++) {
        let idx = Math.floor(Math.random() * current_movies.length);
        let ele = current_movies[idx];
        $("#recommendations").append(
            `<div class="item" id=${ele.id}>
                <img src=${ele.image} alt=${ele.alt}>
                <p>
                    ${ele.original_title} 
                </p>
            </div>`);
    }

    $(".item img, .item p").on("click", (e)=>{
        let id = e.target.parentElement.id;
        // movie info query
        window.location.href = 'info.html?id='+id;
    });
}
