var viewModel = function(){
    var self = this;
    self.restaurantsArray = ko.observableArray();
    var restaurants = JSON.parse(localStorage.restaurants);
    
    // populates restaurantsArray from restaurants
    restaurants.forEach(function(item){
//        console.log(item.location);
        self.restaurantsArray.push(new Restaurant(item));
    });
    
    //infowindow content
    var infowindowTitle = "<h3>%data%</h3>";
    var myInfoWindow;
    // loop trough restaurants
    self.restaurantsArray().forEach(function(item){
//        console.log(item.location);
        myInfoWindow = new google.maps.InfoWindow();
               // create marker
        var marker = new google.maps.Marker({
//            map: map,
            position: item.location,
            animation: google.maps.Animation.DROP
           // position directly from object NO geocoding
        });
        
        item.marker = marker;

       marker.addListener('click', function(){
           populateInfoWindow(this, myInfoWindow);
       });
               
       function populateInfoWindow(marker, infowindow){
           var title = infowindowTitle.replace("%data%",item.name());
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
                       panorama.setPosition(item.location);
                   }
               }
               infowindow.open(map, marker);
           }
       };
    });// end restaurant loop to add elements to the map
    
    //filter list
    self.foodTypes = ["All","Fast Food", "Italian", "Colombian", "Chinese", "Sushi"];
    self.selectedfoodType = ko.observable("All");
    
    self.filterRestaurants = ko.computed(function(){
        self.restaurantsArray().forEach(function(item){
            //reset hidden items
            if(!item.visible()){
                item.visible(true);
            }
            //initial value
            if(self.selectedfoodType() === "All"){
                item.visible(true);
            } else if(self.selectedfoodType() != item.cusine()){
                item.visible(false);
//                console.log(self.selectedfoodType() + " != " + item.cusine());
            }
            ////// end list filter /////
            if(self.selectedfoodType() === "All"){
                item.marker.setMap(map);
            } else if(item.cusine() === self.selectedfoodType()){
                item.marker.setMap(map);
            } else {
                item.marker.setMap(null);
            }
        });
    });
    
};