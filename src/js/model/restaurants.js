var enableInit = false;
(function() {
    var url = "https://api.foursquare.com/v2/venues/search?";
    url += $.param({
    'near': "Bogota",
    'categoryId': "4bf58dd8d48988d142941735,55a59bace4b013909087cb24",
    'limit': 50,
    'client_id': "4BT03HQEPTGWRUWGW40PEEGSXRBH3X5WJZETXAEYHFZNTWYQ",
    'client_secret': "VSVSDNA3SFNRIHCO14BYKKZOPFAIU525N3IQQ5YNJB5YHODP",
    'v': 20160101,
    'm': "foursquare"
    });
    
    $.ajax({
        url: url,
        dataType: 'json'
    }).done(function(data){
        console.log(data.response.venues);
        if(!localStorage.restaurants){
            localStorage.restaurants = JSON.stringify(data.response.venues);
            ko.applyBindings(viewModel);
        }
    }).fail(function(){
        alert("Failed to load Foursquare info");
    });
    
}());