require(
    [
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "apiKey.js",
    "map/mapStyle.js",
    "map/point/popupPoint.js",
    "map/point/pointStyle.js",
    "form/formDependence.js"
    ],
    
    function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

    esriConfig.apiKey = MyApiKey;

    // -------------------------- MAPA --------------------------
    const map = new Map({                                       // Se crea el mapa.
        basemap: modelMap                                       //#######Asumo que deben haber diferentes modelos de mapa, buscar esto.
    });

    const view = new MapView({                                  // Se agrega el mapa a la vista, y se le asigna a la "caja" contenedora "viewMap".
        map: map,
        center: centerMapDefault,
        zoom: zoomMapDefault,
        container: "viewMap"
    });

    const point_layer = new GraphicsLayer();                    // Se crea una capa de puntos.
    map.add(point_layer);                                       // Y se agrega al mapa.

    // -------------------------- FORMULARIO --------------------------
    const formSelector = document.querySelector("#form");
    formSelector.addEventListener('submit', CreatePoint);       // Se agrega una escucha para el evento "submit" del formulario.
    

    /**Crea un punto en el mapa en la ubicación dada por el usuario.
     * El color del punto depende de la categoría, y contiene un Pop-up
     * con la información del formulario.*/
    function CreatePoint(event){
        event.preventDefault();
        
        GetFormValues(formSelector);

        let colorPoint = categoryColorPoint[formValues["Category"]];    // El color del punto depende de la categoría de éste.
        let descriptionPoint = SetPointDescription(formValues, optionalFormValues);
        

        const geometry = {                                              // Se agrega el punto en las coordenadas especificadas.
            type: "point",                                              // En este programa solo necesito añadir puntos.
            longitude: parseFloat(formValues["Longitude"]),
            latitude: parseFloat(formValues["Latitude"])
        };

        const point_style = {                                           // Se agrega color y estilo al punto.
            type: "simple-marker",
            color: colorPoint,
            outline: {                                                  // Estilo del borde del punto
                color: colorEdgePoint,
                width: widthEdgePoint
            }
        };

        const popupTemplate = {                                         // Template del Pop-up de la descripción del punto.
            title: "{Name}",
            content: "{Description}"
        };

        const attributes = {                                            // Contenido del Pop-up de la descripción del punto.
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
        SetFormValuesDefault(formSelector);
    }
});