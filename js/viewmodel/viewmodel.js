var viewModel = function(){
    var self = this;
    self.restaurantsArray = ko.observableArray();
    var restaurants = JSON.parse(localStorage.restaurants);
    
    //filter
    self.foodTypes = ["All","Fast Food", "Italian", "Colombian", "Chinese", "Sushi"];
    self.selectedfoodType = ko.observable("Italian");
    
    console.dir(self.selectedfoodType());
    
    // populates restaurantsArray from restaurants
    restaurants.forEach(function(item){
//        console.log(item);
        self.restaurantsArray.push(new Restaurant(item));
    });
    
    //infowindow content
    var infowindowTitle = "<h3>%data%</h3>";
    
    var myInfoWindow;
    // loop trough restaurants
    self.restaurantsArray().forEach(function(item){
//        console.log(item);
        myInfoWindow = new google.maps.InfoWindow();
               // create marker
               var marker = new google.maps.Marker({
                   map: map,
                   position: item.location
                   // position directly from object NO geocoding
               });
               
               marker.addListener('click', function(){
                   populateInfoWindow(this, myInfoWindow);
               });
               
               function populateInfoWindow(marker, infowindow){
                   var title = infowindowTitle.replace("%data%",item.name);
                   var image = '<div id="pano"><div>';
                   var infoWindowContent = title + image;
                   if(infowindow.marker != marker){
                       infowindow.marker = marker;
                       infowindow.setContent(title + image);
                       infowindow.addListener('closeclick', function(){
                          infowindow.marker = null; 
                       });
                       var sv = new google.maps.StreetViewService();
                       var radius = 50;
                       sv.getPanoramaByLocation(marker.position, radius, processSVData);;
                       function processSVData(data,status){
                           if(status == google.maps.StreetViewStatus.OK){
                               var panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"));
                               panorama.setPosition(location);
                           }
                       }
                       infowindow.open(map, marker);
                   }
               };
    });// end restaurant loop to add items to the map
};