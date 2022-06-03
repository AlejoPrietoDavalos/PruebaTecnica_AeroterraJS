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

    const pointLayer = new GraphicsLayer();                     // Se crea una capa de puntos.
    map.add(pointLayer);                                        // Y se agrega al mapa.


    /**Generamos un ID único para cada punto, para poder identificarlos.
     * Almacenamos en "description" la descripción del punto, para poder discriminarlo del resto de puntos.
     * Y en "pointGraphicObject" el objeto pointGraphic que lo necesitamos para luego
     * poder removerlo en caso de que el usuario quisiera borrar el punto agregado.*/
    var addedPoints = {
        "LastIDUsed": -1,       // El primer objeto tomará el ID=0, ya que se le suma 1 antes de asignarle un ID.
        "ID": [],
        "description": [],
        "pointGraphicObject": []
    };

    // -------------------------- FORMULARIO --------------------------
    const formSelector = document.querySelector("#form");
    formSelector.addEventListener('submit', CreatePoint);       // Se agrega una escucha para el evento "submit" del formulario.
    

    /**Crea un punto en el mapa en la ubicación dada por el usuario.
     * El color del punto depende de la categoría, y contiene un Pop-up
     * con la información del formulario.*/
    function CreatePoint(e){
        e.preventDefault();
        
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

        // Agrego la descripción y el objeto punto para poder removerlo eventualmente, si el usuario quisiera.
        addedPoints["LastIDUsed"] += 1;
        addedPoints["ID"].push(addedPoints["LastIDUsed"])
        addedPoints["description"].push(descriptionPoint)
        addedPoints["pointGraphicObject"].push(pointLayer)
        
        // Agrego el punto al gráfico y seteo los valores del formulario a predeterminado.
        pointLayer.add(pointGraphic);
        SetFormValuesDefault(formSelector);
    }


    /**Recibe como parámetro el ID del punto a remover, y la capa de puntos del mapa.
     * Remueve dicho punto, y lo elimina del registro de puntos "addedPoints".
     * 
     * @param {int} ID Identificador único del punto.
     * @param {object} pointLayer Capa de puntos del mapa.
     * @param {object} addedPoints Registro de los puntos existentes en el mapa.
     */
    function RemovePointByID(ID, pointLayer, addedPoints){
        let indexPoint = addedPoints["ID"].indexOf(ID);
        
        if (indexPoint != -1){
            pointLayer.remove(addedPoints["pointGraphicObject"][indexPoint]);       // Se elimina el punto del mapa.
            addedPoints["ID"].splice(indexPoint);
            addedPoints["description"].splice(indexPoint);
            addedPoints["pointGraphicObject"].splice(indexPoint);
        }else{
            console.log("Arrojar una excepción, no se cual es la manera correcta en JS.")
        }   
    }
});