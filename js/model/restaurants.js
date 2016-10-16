// hard coded restaurants
var restaurants = [
    {
        'name': 'Nobu',
        'facebook': 'https://www.facebook.com/nobu.yaki',
        'address': 'Alameda de los Descalzos #90-16, Bogotá',
        'cusine': 'Sushi'
    },{
        'name': 'Lai fu',
        'facebook': 'https://www.facebook.com/LAI-FU-comida-china-386610398215900/',
        'address': 'Cra. 50 #14966, Bogotá',
        'cusine': 'Chinese'
    },{
        'name': 'Mr Bross',
        'facebook': 'https://www.facebook.com/MrBross-250044611853531/',
        'address': 'Cl. 116 #19a32, Bogotá',
        'cusine': 'Fast food'
    },{
        'name': 'Mi Gran Parrilla Boyacense',
        'facebook': 'https://www.facebook.com/parrillaboyacense/',
        'address': 'Cl. 162 #22-68, Bogotá',
        'cusine': 'Colombian'
    },{
        'name': 'Burger Music',
        'facebook': 'https://www.facebook.com/BurgerMusic/',
        'address': 'Cl. 116 #45 a 46, Bogotá',
        'cusine': 'Fast food'
    },
];

var Restaurant = function(data){
    //get restaurants array
    this.name = data.name;
    this.facebook = data.facebook;
    this.address = data.address;
    this.cusine = data.cusine;
}