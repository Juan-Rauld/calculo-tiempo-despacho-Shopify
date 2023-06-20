const now = new Date();
const cutOffTime = new Date();
cutOffTime.setHours(12);
cutOffTime.setMinutes(0);
cutOffTime.setSeconds(0);

// calcular tiempo restante
const horasFaltantes = now.getHours() - cutOffTime.getHours();
const minutosFaltantes = now.getMinutes() - cutOffTime.getMinutes();
const segundosFaltantes = now.getSeconds() - cutOffTime.getSeconds();

function checkWeek(now) {
    const diaSemana = now.getDay();
    return diaSemana >= 1 && diaSemana <= 5
}

function mensajeHoras() {
    return 'document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining - time'>" + horasFaltantes + " hora, " + minutosFaltantes + " minutos, y " + segundosFaltantes + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";'
}

checkWeek(now);

function deliveryMessage() {
    if (checkWeek(now) === 6) {
        console.log('tu pedido llega el Lunes porque hoy es Sabado')
    } else if (checkWeek(now) === 0) {
        console.log('tu pedido llega el Lunes porque hoy es Domingo')
    } else {
        console.log('dia de semana')
        if (now.getTime() < cutOffTime.getTime()) {
            console.log('tu pedido llega hoy')
            return mensajeHoras()
        } else now.getTime() > cutOffTime.getTime(){
            console.log('tu pedido llega mañana')
        }
    }
}

deliveryMessage();

// calcular tiempo restante
const remainingHours = now.getHours() - cutOffTime.getHours();
const remainingMinutes = now.getMinutes() - cutOffTime.getMinutes();
const remainingSeconds = now.getSeconds() - cutOffTime.getSeconds();


