require(
    [
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer"
    ],
    
    function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPKf9d9f53219054831bb76348f58f1eb0dYJCvTiMxDfv6RYO496IGoi59tqM5jFQxnvWrs2P6sk1eSHUYbEKd6w1Eqbi1LvRc";

    // -------------------------- MAPA --------------------------
    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        map: map,
        center: [-58.3724715,-34.595986],
        zoom: 15,
        container: "viewMap"
    });


    // -------------------------- PUNTO --------------------------
    const point_layer = new GraphicsLayer();
    map.add(point_layer);

    function CreatePoint(point_layer, longitude, latitude){
        const geometry = {                      //Create a point
            type: "point",
            longitude: longitude,
            latitude: latitude
        };

        const point_style = {   //########### Poner un color u otro dependiendo de la categoria
            type: "simple-marker",
            color: [226, 119, 40],              // Orange
            outline: {
                color: [255, 255, 255],         // White
                width: 1
            }
        };

        const attributes = {
            Name: "Graphic",
            Description: "I am a polygon"
        }

        const popupTemplate = {
            title: "{Name}",
            content: "{Description}"
        }

        const pointGraphic = new Graphic({
            geometry: geometry,
            symbol: point_style,
            attributes: attributes,
            popupTemplate: popupTemplate
        });

        // Agrego el punto al gráfico
        point_layer.add(pointGraphic);
    }

    CreatePoint(point_layer,-58.3724715,-34.595986)
    

    

    

    


    //const submit_button = document.getElementById("submit_button")


    //submit_button.addEventListener("submit", AddPoint())
    function AddPoint(name, direccion, telefono, categoria, longitude, latitude){
    //const AddPoint = (name, direccion, telefono, categoria, longitude, latitude)=>{

        //--- Verificacion ---
        
        //--- Verificacion ---

        let atributos = {
            nombre : name,
            direccion : direccion,
            telefono: telefono,
            categoria: categoria
        };

        let point = new Graphic({
            geometry: {
                type: "point",
                longitude: longitude,
                latitude: latitude
            },
            symbol: point_style,
            attributes: atributos
        })

        point_layer.add(point);
    };

    // -------------------------- PopUp ------------------
    
});