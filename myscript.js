async function obtenerFeriados() {
    try {
        const response = await fetch('https://apis.digital.gob.cl/fl/feriados');
        if (!response.ok) {
            console.error('Error en la respuesta de la API', response);
            return [];
        }
        const data = await response.json();
        const esteAno = (new Date()).getFullYear();
        const proximoAno = esteAno + 1;
        const feriados = data.filter(feriado => feriado.fecha.startsWith(esteAno) || feriado.fecha.startsWith(proximoAno));
        return feriados;
    } catch (error) {
        console.error('Error al obtener feriados:', error);
        return [];
    }
}


function esFeriado(date, feriados) {
    const fecha = date.toISOString().split('T')[0];
    return feriados.some(feriado => feriado.fecha === fecha);
}

function siguienteDiaHabil(date, feriados) {
    const nextDate = new Date(date);
    do {
        nextDate.setDate(nextDate.getDate() + 1);
    } while (nextDate.getDay() === 0 || nextDate.getDay() === 6 || esFeriado(nextDate, feriados));
    return nextDate;
}

function checkWeek(now) {
    const diaSemana = now.getDay();
    return diaSemana >= 1 && diaSemana <= 5;
}

function updateCountdown(cutOffTime) {
    const now = new Date();
    let timeDifference = cutOffTime.getTime() - now.getTime();
    timeDifference = Math.max(timeDifference, 0);
    const horasFaltantes = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutosFaltantes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const segundosFaltantes = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining-time'>" + Math.abs(horasFaltantes) + " horas, " + Math.abs(minutosFaltantes) + " minutos, y " + Math.abs(segundosFaltantes) + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";
}

async function deliveryMessage() {
    const feriados = await obtenerFeriados();

    const now = new Date();
    const cutOffTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);

    if (esFeriado(now, feriados)) {
        document.getElementById("delivery-message").innerHTML = 'Entrega al día siguiente hábil';
    } else if (checkWeek(now) && now.getTime() > cutOffTime.getTime() && esFeriado(siguienteDiaHabil(now, feriados), feriados)) {
        document.getElementById("delivery-message").innerHTML = 'El despacho es el próximo día laboral hábil';
    } else if (checkWeek(now)) {
        if (now.getDay() === 5 && now.getTime() > cutOffTime.getTime()) {
            document.getElementById("delivery-message").innerHTML = 'Tu pedido llega el Lunes porque hoy es Viernes después del mediodía';
            console.log('Es viernes, pero se pasó la hora de corte.' + ' Hoy es el día nº ' + now.getDay())
        } else if ([1, 2, 3, 4].includes(now.getDay()) && now.getTime() < cutOffTime.getTime()) {
            updateCountdown(cutOffTime);
            setInterval(() => updateCountdown(cutOffTime), 1000);
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
