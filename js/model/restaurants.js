function geoCodeLocations() {
    if (!localStorage.restaurants) {
        console.log('Searching for coordinates...');
        // hard coded restaurants
        var restaurants = [
            {
                'name': 'Nobu Yaki',
                'facebook': 'https://www.facebook.com/nobu.yaki',
                'address': 'Alameda de los Descalzos #90-16, Bogotá',
                'cusine': 'Sushi',
                'location': {lat: 4.6741453, lng: -74.05227730000001}
            },{
                'name': 'Lai fu',
                'facebook': 'https://www.facebook.com/LAI-FU-comida-china-386610398215900/',
                'address': 'Cra. 50 #14966, Bogotá',
                'cusine': 'Chinese',
                'location': {'lat': 4.7322355, 'lng': -74.05299919999999}
            },{
                'name': 'Mr Bross',
                'facebook': 'https://www.facebook.com/MrBross-250044611853531/',
                'address': 'Cl. 116 #19a32, Bogotá',
                'cusine': 'Fast Food',
                'location': {lat: 4.6998269, lng: -74.05737440000001}
            },{
                'name': 'Mi Gran Parrilla Boyacense',
                'facebook': 'https://www.facebook.com/parrillaboyacense/',
                'address': 'Cl. 162 #22-68, Bogotá',
                'cusine': 'Colombian',
                'location': {lat: 4.743061700000001, lng: -74.0471475}
            },{
                'name': 'Burger Music',
                'facebook': 'https://www.facebook.com/BurgerMusic/',
                'address': 'Cl. 116 #45 a 46, Bogotá',
                'cusine': 'Fast Food',
                'location': {lat: 4.6956824, lng: -74.0403925}
            },{
                'name': 'Crepes & Waffles',
                'facebook': 'https://es-la.facebook.com/CrepesyWafflesOficial/',
                'address': 'Kr 19 #138-17, Bogotá',
                'cusine': 'Colombian',
                'location': {lat: 4.722226099999999, lng: -74.04655739999998}
            },{
                'name': 'Pizzeria Da Quei Matti',
                'facebook': 'https://www.facebook.com/daqueimatti/',
                'address': 'Cra. 58 #128-45, Bogotá',
                'cusine': 'Italian',
                'location': {lat: 4.714338000000001, lng: -74.07017480000002}
            },{
                'name': 'Il Mercatino',
                'facebook': 'https://www.facebook.com/ilmercatinobog/',
                'address': 'Cra. 10a #7050, Bogotá',
                'cusine': 'Italian',
                'location': {lat: 4.6549642, lng: -74.0591698}
            },{
                'name': 'El Corral',
                'facebook': 'https://es-la.facebook.com/hamburguesaselcorral',
                'address': 'Cl. 138 #58-74, Bogotá',
                'cusine': 'Fast Food',
                'location': {lat: 4.7288122, lng: -74.06602750000002}
            },
        ];
        
        localStorage.restaurants = JSON.stringify(restaurants);
    }
};

var Restaurant = function(data){
    //get restaurants array
    this.name = data.name;
    this.facebook = data.facebook;
    this.address = data.address;
    this.cusine = data.cusine;
    this.location = data.location;
}