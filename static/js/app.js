    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
    var apiKey = '676e50341c60a74423a05f38e25b23c6';
 
 
    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: '676e50341c60a74423a05f38e25b23c6'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }
 
   function setEventHandlers(config) {
            $('#form-search').submit(function() {
                var query = $('.input-query').val();
                searchMovie(query);
               
            });
 
            $('.show').click(function() {
                loadNowShowing();
 
            });
 
            $('.upcoming').click(function() {
                loadUpComing();
               
            });
 
            $('.popular').click(function() {
                loadPopular();
               
            });
 
 
            $('.toprated').click(function() {
                loadTopRated();
       
            });
 
            loadNowShowing();
    }
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    function displayMovies(data) {
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            var htmlStr = [
                            '<div class="col-md-4 portfolio-item">',
                                '<a href="/view/'+movie.id+'">',
                                    '<img class="img-responsive" style="height:500px;width:350px"src="' + imageSrc + '" alt="">',
                                '</a>',
                                '<h3><center><font face="Maiandra GD">',
                                    '<a href="/view/'+movie.id+'" style="color:cyan">' + movie.title +'</a>',
                                '</font></center></h3>',
                            '</div>'
                            ];
            $('.movies-list').append($(htmlStr.join('')));
        });
    }
 
    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
   
 
    function loadUpComing() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
   
 
    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
 
    function loadTopRated() {
        var topratedUrl = baseUrl + 'movie/top-rated';
        $('.movies-list').html('');
        $.get(topratedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
   
   
 
    function viewMovie(id){
    $(".movie-list").hide();
    console.log(id);
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:apiKey};
    $.get(url,reqParam,function(response){
        $("#title").html(response.original_title);
        $("#overview").html(response.overview);
 
        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            var html = '<embed width="600" height="400" src="https://www.youtube.com/v/'+response.results[0].key+'" type="application/x-shockwave-flash">'
            $("#trailer").html(html);
        });
 
        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var casts = "";
            for(var i=0;i<response.cast.length;i++){
                casts+= (i!=response.cast.length-1)?response.cast[i].name+", "
                    : " and "+response.cast[i].name;
            }
            $("#casts").html(casts);
        });
 
        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            for(var i=0;i<movies.length;i++){
                allMovies += (i==movies.length-1)? '<a href="/movie/'+movies[i].id+'">'+movies[i].title+'</a>, '
                    : '<a href="/movie/'+movies[i].id+'">'+movies[i].title+'</a>';
            }
            $("#similar").html(allMovies);
        });
 
    });
}
$(document).ready(function(){
 
    $(".btn-top-rated, .btn-popular, .btn-upcoming, .btn-now-showing").click(function(){
        $(".movie-view").hide();
        $(".movies-list").show();
    });
    initialize(setEventHandlers);
});