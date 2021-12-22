const divisaInput = document.querySelector("#divisa-input");
const btnBuscar = document.querySelector("#btn-buscar");
const tituloDivisas = document.querySelector("#titulo-divisas");
const listaDivisas = document.querySelector("#lista-divisas");
const piePagina = document.querySelector("#pie-pagina");
//agregar key a la URL
const URL = "https://v6.exchangerate-api.com/v6/bc1cd6e59914051089cce8f5/latest/";

btnBuscar.onclick = ()=>{      
    mostrarDivisas();
};


function mostrarDivisas (){
    
    fetch (`${URL}/${divisaInput.value.toUpperCase()}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            
            tituloDivisas.textContent = `Cotización base ${respuestaJSON.base_code} actualizada al ${respuestaJSON.time_last_update_utc}`;                        
            const conversionRates = respuestaJSON.conversion_rates;           
            for (divisa in conversionRates){
                const li = document.createElement ("li");
                li.textContent = `${divisa}: ${conversionRates[divisa]}`;                
                listaDivisas.appendChild (li);
            }
         })
        .catch(error => mostrarAlertaError(error));
}

function mostrarAlertaError (error){
    alert(`No se pudo buscar la moneda ingresada, error ${error}`);
}
