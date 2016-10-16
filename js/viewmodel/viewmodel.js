var viewModel = function(){
    var self = this;
    self.restaurantsArray = ko.observableArray();
    var restaurants = JSON.parse(localStorage.restaurants);
    
    // populates restaurantsArray from restaurants
    restaurants.forEach(function(item){
//        console.log(item.location);
        self.restaurantsArray.push(new Restaurant(item));
    });
    
    //filter list
    self.foodTypes = ["All","Fast Food", "Italian", "Colombian", "Chinese", "Sushi"];
    self.selectedfoodType = ko.observable("All");
    
    self.filterRestaurants = ko.computed(function(){
        var select = document.getElementById("which");
        var infowindowTitle = "<h3>%data%</h3>";
        var myInfoWindow;
        var markers = [];
        var visibleMarkers = [];
        self.restaurantsArray().forEach(function(item){
            // create marker
            var marker = new google.maps.Marker({
//                map: map,
                position: item.location,
                animation: google.maps.Animation.DROP,
            });
            
            if (item.cusine() === self.selectedfoodType()){
                console.log(item.cusine() + " ------- " + self.selectedfoodType());
                if(visibleMarkers.length>0){
                    for(var m = 0; m<visibleMarkers.length;m++){
                        visibleMarkers[m].setMap(null);
                    }
                }
                marker.setMap(map);
                visibleMarkers.push(marker);
            }
//            console.log(markers);
            //reset hidden items
            if(!item.visible()){
                item.visible(true);
            }
            //initial value
            if(self.selectedfoodType() === "All"){
                item.visible(true);
//                marker.setMap(map);
            } else if(self.selectedfoodType() != item.cusine()){
                item.visible(false);
//                console.log(self.selectedfoodType() + " != " + item.cusine());
            }
            ////// end list filter /////
            
            marker.addListener('click', function(){
               populateInfoWindow(this, myInfoWindow);
            });
        
            myInfoWindow = new google.maps.InfoWindow();

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
        }); // end forEach loop restaurantsArray
    }); // endfilterRestaurans ko.computed
    
};