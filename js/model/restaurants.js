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
            dataType: 'json',
            success: function(data){
                console.log(data.response.venues);
                if(!localStorage.restaurants){
                    localStorage.restaurants = JSON.stringify(data.response.venues);
                }
            }, error: function(){
                alert("Failed to load Foursquare info");
            }
        });
    
}());

var Restaurant = function(data){
    //get restaurants array
    this.name = data.name;
    this.people = data.hereNow.summary;
    this.address = data.location.address;
    this.cusine = data.categories[0].shortName;
    this.location = data.location;
    this.visible = ko.observable(data.visible);
}