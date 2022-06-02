let descriptionTemplate = {
    "Direction": "<b><i>Dirección: </i></b>",
    "Phone": "<b><i>Teléfono: </i></b>",
    "Category": "<b><i>Categoría: </i></b>",
    "Longitude": "<b><i>Longitud: </i></b>",
    "Latitude": "<b><i>Latitud: </i></b>"
}

/**Recibe los valores del formulario y crea una descripción para el nuevo punto.
 * 
 * @param {object} formValues Valores del formulario rellenado por el usuario.
 * @param {object} optionalFormValues Listado de los campos opcionales del formulario.
 * @returns Retorna la descripción del Pop-up del nuevo punto.
 */
function SetPointDescription(formValues, optionalFormValues){
    let description = "";

    for (var key in descriptionTemplate){
        if (!optionalFormValues.includes(key)){                                                 // Si es campo obligatorio agrega la descripción.
            description += descriptionTemplate[key] + formValues[key].trim() + "\n";
        }else if (formValues[key].trim()!=""){                                                  // Si es un campo opcional, pero fué respondido también agrega la descipción.
            description += descriptionTemplate[key] + formValues[key].trim() + "\n";
        }                                                                                       // Si es un campo opcional y no fué respondido, no se agrega.
    }
    return description.trim();          // Le saco el último salto de línea.
}

