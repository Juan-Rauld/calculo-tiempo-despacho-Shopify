const now = new Date();
const cutOffTime = new Date();
cutOffTime.setHours(12);
cutOffTime.setMinutes(0);
cutOffTime.setSeconds(0);

// Calcular tiempo restante
let horasFaltantes = Math.abs(cutOffTime.getHours() - now.getHours());
let minutosFaltantes = Math.abs(cutOffTime.getMinutes() - now.getMinutes());
let segundosFaltantes = Math.abs(cutOffTime.getSeconds() - now.getSeconds());

function checkWeek(now) {
    const diaSemana = now.getDay();
    return diaSemana >= 1 && diaSemana <= 5;
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

// Calcular tiempo restante
const remainingHours = cutOffTime.getHours() - now.getHours();
const remainingMinutes = cutOffTime.getMinutes() - now.getMinutes();
const remainingSeconds = cutOffTime.getSeconds() - now.getSeconds();