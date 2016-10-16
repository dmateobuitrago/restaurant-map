var viewModel = function(){
    var self = this;
    self.restaurantsArray = ko.observableArray();
    
    // populates restaurantsArray from restaurants
    restaurants.forEach(function(item){
//        console.log(item);
        self.restaurantsArray.push(new Restaurant(item));
    });
    
    var geocoder;
    self.restaurantsArray().forEach(function(item){
//        console.log(item);
        geocoder = new google.maps.Geocoder();
        var address = item.address;
        geocoder.geocode({'address': address}, function(results, status){
           if(status == google.maps.GeocoderStatus.OK) {
               console.log(results[0].geometry.location);
               var infoWindowContent = "<h3>" + item.name + "</h3>";
               var infoWindow = new google.maps.InfoWindow({
                   content: infoWindowContent
               });
               var marker = new google.maps.Marker({
                   map: map,
                   position: results[0].geometry.location
               });
               marker.addListener('click', function(){
                   console.log("click");
                   infoWindow.open(map, marker);
               });
           } else {
               window.alert("Geocoder error: "+ status);
           }
        });
    });
};