const now = new Date();
const cutOffTime = new Date();
cutOffTime.setHours(12);
cutOffTime.setMinutes(0);
cutOffTime.setSeconds(0);

//Revisa si es día de semana o no.
function checkWeek(now) {
    const diaSemana = now.getDay();
    return diaSemana >= 1 && diaSemana <= 5;
}

// Calcular tiempo restante separado horas, minutos, segundos
let horasFaltantes = cutOffTime.getHours() - now.getHours();
let minutosFaltantes = cutOffTime.getMinutes() - now.getMinutes();
let segundosFaltantes = cutOffTime.getSeconds() - now.getSeconds();

// Calcular la diferencia de tiempo
let timeDifference = cutOffTime.getTime() - now.getTime();
timeDifference = Math.max(timeDifference, 0);

// Función para actualizar la cuenta regresiva cada segundo
function updateCountdown() {
    const now = new Date();
    let timeDifference = cutOffTime.getTime() - now.getTime();
    timeDifference = Math.max(timeDifference, 0);
    horasFaltantes = Math.floor(timeDifference / (1000 * 60 * 60));
    minutosFaltantes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    segundosFaltantes = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    mensajeHoras();
}


function mensajeHoras() {
    document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining-time'>" + horasFaltantes + " hora, " + minutosFaltantes + " minutos, y " + segundosFaltantes + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";
}

function deliveryMessage() {
    if (checkWeek(now)) {
        console.log('Día de semana');
        if (now.getTime() < cutOffTime.getTime()) {
            console.log('Tu pedido llega hoy');
            mensajeHoras();
            setInterval(updateCountdown, 1000);
        } else {
            console.log('Tu pedido llega mañana');
        }
    } else if (now.getDay() === 6) {
        console.log('Tu pedido llega el Lunes porque hoy es Sábado');
    } else if (now.getDay() === 0) {
        console.log('Tu pedido llega el Lunes porque hoy es Domingo');
    }
}

deliveryMessage();