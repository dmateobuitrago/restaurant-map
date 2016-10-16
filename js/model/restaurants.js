

function geoCodeLocations() {
    if (!localStorage.restaurants) {
        console.log('Searching for coordinates...');
        var geocoder;
        // hard coded restaurants
        var restaurants = [
            {
                'name': 'Nobu',
                'facebook': 'https://www.facebook.com/nobu.yaki',
                'address': 'Alameda de los Descalzos #90-16, Bogotá',
                'cusine': 'Sushi',
            },{
                'name': 'Lai fu',
                'facebook': 'https://www.facebook.com/LAI-FU-comida-china-386610398215900/',
                'address': 'Cra. 50 #14966, Bogotá',
                'cusine': 'Chinese',
            },{
                'name': 'Mr Bross',
                'facebook': 'https://www.facebook.com/MrBross-250044611853531/',
                'address': 'Cl. 116 #19a32, Bogotá',
                'cusine': 'Fast Food',
            },{
                'name': 'Mi Gran Parrilla Boyacense',
                'facebook': 'https://www.facebook.com/parrillaboyacense/',
                'address': 'Cl. 162 #22-68, Bogotá',
                'cusine': 'Colombian',
                'location': ""
            },{
                'name': 'Burger Music',
                'facebook': 'https://www.facebook.com/BurgerMusic/',
                'address': 'Cl. 116 #45 a 46, Bogotá',
                'cusine': 'Fast Food',
            },{
                'name': 'Crepes & Waffles',
                'facebook': 'https://es-la.facebook.com/CrepesyWafflesOficial/',
                'address': 'Kr 19 #138-17, Bogotá',
                'cusine': 'Colombian',
            },{
                'name': 'Pizzeria Da Quei Matti',
                'facebook': 'https://www.facebook.com/daqueimatti/',
                'address': 'Cra. 58 #128-45, Bogotá',
                'cusine': 'Italian',
            },{
                'name': 'Il Mercatino',
                'facebook': 'https://www.facebook.com/ilmercatinobog/',
                'address': 'Cra. 10a #7050, Bogotá',
                'cusine': 'Italian',
            },{
                'name': 'El Corral',
                'facebook': 'https://es-la.facebook.com/hamburguesaselcorral',
                'address': 'Cl. 138 #58-74, Bogotá',
                'cusine': 'Fast Food',
            },
        ];
        
        var coordinates = [];
        for(var j = 0; j<restaurants.length; j++){
            console.dir(restaurants[j].address);
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': restaurants[j].address}, function(results, status){
                if(status == google.maps.GeocoderStatus.OK) {
//                    coordinates[j] = {
//                       lat: results[0].geometry.location.lat(),
//                       lng: results[0].geometry.location.lng()
//                   };
                    StoreLocation(results[0].geometry.location);
                } else {
                   window.alert("Geocoder error: "+ status);
               }
            });//geocoder
            
            function StoreLocation(result){
                coordinates[j] = result.lat();
            }
        }; //end for
                        console.log(coordinates);
//        restaurants[j].location = location[j];
        localStorage.restaurants = JSON.stringify(restaurants);
    }
};

var Restaurant = function(data){
    //get restaurants array
    this.name = data.name;
    this.facebook = data.facebook;
    this.address = data.address;
    this.cusine = data.cusine;
}