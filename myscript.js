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
        } else if (now.getTime() < cutOffTime.getTime()) {
            updateCountdown(cutOffTime);
            setInterval(() => updateCountdown(cutOffTime), 1000);
        } else {
            document.getElementById("delivery-message").innerHTML = 'Tu pedido llega mañana';
        }
    } else {
        document.getElementById("delivery-message").innerHTML = 'Tu pedido llega el Lunes';
    }
}

deliveryMessage();