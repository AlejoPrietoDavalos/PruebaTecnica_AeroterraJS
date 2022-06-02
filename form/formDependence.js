let optionalFormValues = ["Phone"]      // Si hubieran mas valores opcionales, agregar para que no aparescan en la descripción si no son rellenados.

var formValues = {                      // Se almacenan los valores del formulario.
    "POI": "",
    "Direction": "",
    "Phone": "",
    "Category": "",
    "Longitude": "",
    "Latitude": ""
}

/**Recibe el documento del formulario y guarda las respuestas
 * en "formValues" para poder agregar el punto al mapa.
 * 
 * @param {object} formSelector Contiene toda la información del formulario.
 */
function GetFormValues(formSelector){
    formValues["POI"] = formSelector.POI.value;
    formValues["Direction"] = formSelector.Direction.value;
    formValues["Phone"] = formSelector.Phone.value;
    formValues["Category"] = formSelector.Category.value;
    formValues["Longitude"] = formSelector.Longitude.value;
    formValues["Latitude"] = formSelector.Latitude.value;
}

/**Recibe el documento del formulario y reinicia los campos a los valores por defecto.
 * 
 * @param {object} formSelector Contiene toda la información del formulario.
 */
function SetFormValuesDefault(formSelector){
    formSelector.POI.value = "";
    formSelector.Direction.value = "";
    formSelector.Phone.value = "";
    formSelector.Category.value = "";
    formSelector.Longitude.value = "";
    formSelector.Latitude.value = "";
}

