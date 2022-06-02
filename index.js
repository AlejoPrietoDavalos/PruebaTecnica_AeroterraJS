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

    // -------------------------- FORMULARIO --------------------------
    const formSelector = document.querySelector("#form");
    formSelector.addEventListener('submit', CreatePoint);
    
    var formValues = {                      // Se almacenan los valores del formulario.
        "POI": null,
        "Direction": null,
        "Phone": null,
        "Category": null,
        "Longitude": null,
        "Latitude": null
    }

    const categoryColorPoint = {            // Dada una categoría, se setea el color del punto.
        "Comercial": [137, 10, 29],         // Bordó.
        "Residencial": [117, 89, 213],      // Violeta.
        "Mixta": [71, 162, 184]             // Azul marino.
    }

    // -------------------------- PUNTO --------------------------
    const point_layer = new GraphicsLayer();
    map.add(point_layer);

    
    function GetFormValues(){
        formValues["POI"] = formSelector.POI.value;
        formValues["Direction"] = formSelector.Direction.value;
        formValues["Phone"] = formSelector.Phone.value;
        formValues["Category"] = formSelector.Category.value;
        formValues["Longitude"] = formSelector.Longitude.value;
        formValues["Latitude"] = formSelector.Latitude.value;
    }

    function SetFormValuesDefault(){
        formSelector.POI.value = "";
        formSelector.Direction.value = "";
        formSelector.Phone.value = "";
        formSelector.Category.value = "";
        formSelector.Longitude.value = "";
        formSelector.Latitude.value = "";
    }

    function SetDescriptionPoint(){
        let description = "";
        // Poner la lógica para agregar una descripción ignorando los valores opcionales en caso de que no fueran rellenados.
        return description;
    }
    
    function CreatePoint(event){
        event.preventDefault();

        GetFormValues();

        let colorPoint = categoryColorPoint[formValues["Category"]];    // El color del punto depende de la categoría de éste.
        let descriptionPoint = SetDescriptionPoint();
        

        const geometry = {                                              // Se agrega el punto en las coordenadas especificadas.
            type: "point",
            longitude: parseFloat(formValues["Longitude"]),
            latitude: parseFloat(formValues["Latitude"])
        };

        const point_style = {                                           // Se agrega color y estilo al punto.
            type: "simple-marker",
            color: colorPoint,
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        };

        const popupTemplate = {                                         // Template del Popup de la descripción del punto.
            title: "{Name}",
            content: "{Description}"
        };

        const attributes = {                                            // Contenido del Popup de la descripción del punto.
            Name: formValues["POI"],
            Description: descriptionPoint
        };

        const pointGraphic = new Graphic({                              // Se crea el gráfico del punto con todos los elementos definidos anteriormente.
            geometry: geometry,
            symbol: point_style,
            attributes: attributes,
            popupTemplate: popupTemplate
        });

        // Agrego el punto al gráfico y seteo los valores del formulario a predeterminado.
        point_layer.add(pointGraphic);
        SetFormValuesDefault();
    }
});