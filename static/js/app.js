    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
     apiKey = '676e50341c60a74423a05f38e25b23c6';
    var api_key = '676e50341c60a74423a05f38e25b23c6';

 
 
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
            var backdrop = config.images.base_url + config.images.poster_sizes[6] + movie.backdrop_path;
             
                         var zee = {
                            "movie-id" : movie.id,
                            "img" : imageSrc,
                            "title": movie.title,
                            "bdrop": backdrop
                         }
            var raw = $('#tple-tweet').html();
            var  template = Handlebars.compile(raw);
            var html = template(zee);
            $('.movies-list').append(html);

            viewCast(movie.id);
            
        });
    }
 

    function viewCast(id){
        reqParam = {api_key:api_key};
            url = baseUrl +  "movie/"+id+"/credits";
            $.get(url, reqParam, function(response){
                for(var i=0; i<4; i++){
                    $('#'+id).append('<li>'+response.cast[i].name+'</li>');
               }

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
               var casts = response.cast;
            var allCasts = "";    
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] ;                  
            for(var i=0;i<casts.length;i++){
                allCasts += '<div class="col-sm-3 col-xs-6">'+
                                
                                '<center><div id="'+casts[i].id+'">'+
                                '<img id="movie-image" class="img-responsive portfolio-item" style="border-style:solid;border-width:5px;border-color:black; max-height: 200px;" src="'+imageSrc+casts[i].profile_path+'" alt="">'+
                                '</center><br>'+

                                '<center><h5><br>'+
                                    '<p style="color:#fff;">' +casts[i].name+ ' <br> as <br>' +casts[i].character+ '<br></p>'+
                                '</h5></center>'+

                              '<br></div></div>';
                              }
            $("#casts").html(allCasts);
        });

    url = baseUrl + "movie/"+id+"/similar";
    $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var imageSrc = config.images.base_url + config.images.poster_sizes[3];            
            for(var i=0;i<movies.length;i++){
                allMovies += '<div class="col-sm-3 col-xs-6">'+
                                '<center><h5>'+
                                    '<a style="color:#fff;" href="/view/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5></center><br>'+

                                '<center><a href="/view/'+movies[i].id+'">'+
                                    '<img id="movie-image" class="img-responsive portfolio-item" style="border-style:solid;border-width:5px;border-color:black; max-height: 150px;" src="'+imageSrc+movies[i].backdrop_path+'" alt="">'+
                                '</a></center><br>'+
                                '<br>' +
                              '</div>';
            }
            $("#similar").html(allMovies);
        });
    url = baseUrl + "movie/"+id+"/images";
        $.get(url,reqParam,function(response){          
            var backdrop = response.backdrops;
            var allBackdrops = "";    
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] ;                  
            for(var i=0;i<backdrop.length;i++){
                allBackdrops += '<div id="backdrops" class="col-sm-4 col-xs-4">'+
                                '<img style="border-style:solid;border-width:3px;border-color:black; max-height: 200px;" src="'+imageSrc+backdrop[i].file_path+'" alt="">'+
                                '</center>'+

                                '<br>' +
                              '</div></div>';
            }
            $("#backdrops").html(allBackdrops);
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