var map;
function initMap(){
    if(!google){
        alert("Failed to load Google APIs");
    } else {
        var myStyle = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#a47a40"
                },{
                    "saturation": -8
                }
            ]
        },{
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#93BF9A"
                }
            ]

        },{
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "hue": "#91102C"
                }
            ]

        },
    ];
    
        map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 4.732743, lng: -74.058900},
            zoom: 12,
            styles: myStyle
        });
        //init knockout.js
    //    geoCodeLocations();
        loadData();
        ko.applyBindings(viewModel);
    }
    
}