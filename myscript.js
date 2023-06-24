function checkWeek(now) {
    const diaSemana = now.getDay();
    return diaSemana >= 1 && diaSemana <= 5;
}

// Función para actualizar la cuenta regresiva cada segundo
function updateCountdown(cutOffTime) {
    const now = new Date();
    let timeDifference = cutOffTime.getTime() - now.getTime();
    timeDifference = Math.max(timeDifference, 0);
    const horasFaltantes = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutosFaltantes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const segundosFaltantes = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining-time'>" + Math.abs(horasFaltantes) + " horas, " + Math.abs(minutosFaltantes) + " minutos, y " + Math.abs(segundosFaltantes) + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";
}

function deliveryMessage() {
    const now = new Date();
    const cutOffTime = new Date();
    cutOffTime.setHours(12);
    cutOffTime.setMinutes(0);
    cutOffTime.setSeconds(0);

    if (checkWeek(now)) {
        if (now.getDay() === 5 && now.getTime() > cutOffTime.getTime()) {
            document.getElementById("delivery-message").innerHTML = 'Tu pedido llega el Lunes porque hoy es Viernes después del mediodía';
            console.log('Es viernes, pero se pasó la hora de corte.' + ' Hoy es el día nº ' + now.getDay())

        } else if (now.getDay() === 1 && now.getTime() < cutOffTime.getTime()) {
            updateCountdown(cutOffTime);
            setInterval(() => updateCountdown(cutOffTime), 1000);
            document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining-time'>" + Math.abs(horasFaltantes) + " horas, " + Math.abs(minutosFaltantes) + " minutos, y " + Math.abs(segundosFaltantes) + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";
            console.log('Sí se cumplen las condiciones para el despacho el mismo día. Dia Laboral (entre Lunes y Viernes, antes de las 12' + ' Hoy es el día nº ' + now.getDay())
        } else {
            console.log('Es día Laboral y ya pasó la hora de corte' + ' Hoy es el día nº ' + now.getDay())
            document.getElementById("delivery-message").innerHTML = 'Tu pedido llega mañana';
        }
    } else {
        console.log('Es fin de semana, la regla genera que se despache el próximo Lunes.' + ' Hoy es el día nº ' + now.getDay())
        document.getElementById("delivery-message").innerHTML = 'Tu pedido llega el Lunes';
    }
}

deliveryMessage();