var Restaurant = function(data){
    //get restaurants array
    //define main variables from Foursquare API
    this.name = data.name;
    this.people = data.hereNow.count;
    this.address = data.location.address;
    this.cusine = data.categories[0].shortName;
    this.location = data.location;
    this.visible = ko.observable(data.visible);
    this.active = false;
    
    //create infowindow
//    this.myInfoWindow = new google.maps.InfoWindow();
    this.infowindowTitle = "<h3>%data%</h3>";
    // create marker
    this.fish = 'img/fish.png';
    this.cover = 'img/covering.png';
    this.marker = new google.maps.Marker({
//            map: map,
        position: this.location,
        animation: google.maps.Animation.DROP,
        icon: this.fish
    });
    
//        //function binded in the html to the li element
//    this.displayInfoWindow = function(){
//        this.populateInfoWindow(this.marker, myInfoWindow);
//    }
};

Restaurant.prototype.populateInfoWindow = function(marker, infowindow){
    var self = this;
    this.marker.setIcon(this.cover);
    this.title = self.infowindowTitle.replace("%data%",self.name);
    this.image = '<div id="pano"><div>';
    this.infoWindowContent = this.title + this.image;
    console.dir(marker);
    console.dir(infowindow.marker);
//    var processSVData = function(){};
    if(infowindow.marker != marker){
       infowindow.marker = marker;
       infowindow.setContent(this.infoWindowContent);
       infowindow.addListener('closeclick', function(){
          self.marker.setIcon(self.fish);
          infowindow.marker = null;
       });
        
       var sv = new google.maps.StreetViewService();
       var radius = 50;
       sv.getPanoramaByLocation(marker.position, radius, processSVData);
        
       function processSVData(data,status){
           if(status == google.maps.StreetViewStatus.OK){
               var panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"));
               panorama.setPosition(self.location);
           } else {
               document.getElementById("pano").classList.add("error");
               document.getElementById("pano").innerHTML = '<i class="fa fa-exclamation-triangle fa-4x"" aria-hidden="true"></i>';
               document.getElementById("pano").innerHTML +=   '<div class="error-message"><h2>Sorry :(</h2><p>We could not find a Google Street View for ' + self.name + '</p></div>' ;
           }
       };
       infowindow.open(map, marker);
    }

    infowindow.open(map, marker);
};


var viewModel = function(){
    var self = this;
    self.restaurantsArray = ko.observableArray();
    var restaurants = JSON.parse(localStorage.restaurants);
    
    // populates restaurantsArray from restaurants
    restaurants.forEach(function(item){
        self.restaurantsArray.push(new Restaurant(item));
    });
    var myInfoWindow = new google.maps.InfoWindow();

    Restaurant.prototype.displayInfoWindow = function(){
        self.resetIcon();
        this.populateInfoWindow(this.marker, myInfoWindow);
    };
    
    this.resetIcon = function(){
        self.restaurantsArray().forEach(function(item){
            item.marker.setIcon(item.fish);
        });
    }
    
    // loop trough restaurants
    self.restaurantsArray().forEach(function(item){
        item.marker.addListener('click', function(){
            self.resetIcon();
            item.populateInfoWindow(item.marker, myInfoWindow);
        });
    });// end restaurant loop to add elements to the map
    
    //filter list
    //define categories and populate select
    self.foodTypes = ["All"];
    self.restaurantsArray().forEach(function(item){
        var i = self.foodTypes.indexOf(item.cusine);
        if(i === -1){
            self.foodTypes.push(item.cusine); 
        }
    });
    self.selectedfoodType = ko.observable("All");
    self.filterRestaurants = ko.computed(function() {
        var selected = self.selectedfoodType();
        var match;
        return ko.utils.arrayFilter(self.restaurantsArray(), function(item) {
            match = selected === 'All' || selected === item.cusine;
            if (!match) {
              item.marker.setMap(null);
            }
            else {
              item.marker.setMap(map);
              return match;
        }
    });

});
    
};