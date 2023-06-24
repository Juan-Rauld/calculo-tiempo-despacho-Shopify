/* 
// Set the cut-off time for same-day delivery (12:00 am)
var cutOffTime = new Date();
cutOffTime.setHours(12);
cutOffTime.setMinutes(0);
cutOffTime.setSeconds(0);

// Check if the cut-off time is on a Saturday
if (cutOffTime.getDay() === 6) {
    // If the cut-off time is on a Saturday, add two days to the date
    cutOffTime.setDate(cutOffTime.getDate() + 2);
}
// Check if the cut-off time is on a Sunday
else if (cutOffTime.getDay() === 0) {
    // If the cut-off time is on a Sunday, add one day to the date
    cutOffTime.setDate(cutOffTime.getDate() + 1);
}

// Get the current time
const now = new Date();

// Calculate the remaining time until the cut-off time
var remainingTime = cutOffTime.getTime() - now.getTime();
var remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
var remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
var remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

// Check if the current time is before the cut-off time
if (now < cutOffTime.getTime()) {
    // If so, show a message that the order will arrive today, along with the remaining time until the cut-off time
    document.getElementById("delivery-message").innerHTML = "Si compras ahora tu pedido llegará hoy.<br> Compra dentro de <span class='remaining-time'>" + remainingHours + " hora, " + remainingMinutes + " minutos, y " + remainingSeconds + " segundos.</span><br><span class='santiago'>Sólo en la provincia de Santiago</span>";
} else {
    // If not, show a message that the order will arrive tomorrow
    document.getElementById("delivery-message").innerHTML = "Si compras hoy tu pedido llegará mañana";

    const deliveryMessage = document.querySelector('.delivery-message .message');
    const deadline = document.querySelector('.delivery-message .deadline');

    const dayOfWeek = now.getDay();
    const isFriday = dayOfWeek === 5;
    const isSaturday = dayOfWeek === 6;

    if (isFriday && now.getHours() >= 12 || isSaturday) {
        deliveryMessage.textContent = 'Si compras hoy tu pedido llegará el Lunes.';
    } else {
        const cutoffTime = new Date();
        cutoffTime.setHours(12, 0, 0, 0);

        if (now.getTime() <= cutoffTime.getTime()) {
            const diffTime = cutoffTime.getTime() - now.getTime();
            const diffSeconds = Math.round(diffTime / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);

            deliveryMessage.textContent = `If you order now, your order will arrive today in ${diffHours} hours, ${diffMinutes % 60} minutes, and ${diffSeconds % 60} seconds.`;
            deadline.textContent = `Cutoff time: ${cutoffTime.toLocaleTimeString()}`;
        } else {
            deliveryMessage.textContent = 'If you order now, your order will arrive tomorrow.';
            deadline.textContent = `Cutoff time: ${cutoffTime.toLocaleTimeString()}`;
        }
    }

    function updateTimer() {
        const now = new Date();
        const cutoffTime = new Date();
        cutoffTime.setHours(12, 0, 0, 0);

        if (now.getTime() <= cutoffTime.getTime()) {
            const diffTime = cutoffTime.getTime() - now.getTime();
            const diffSeconds = Math.round(diffTime / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);

            deadline.textContent = `Cutoff time: ${cutoffTime.toLocaleTimeString()}. Time remaining: ${diffHours} hours, ${diffMinutes % 60} minutes, and ${diffSeconds % 60} seconds.`;
        } else {
            deadline.textContent = `Cutoff time: ${cutoffTime.toLocaleTimeString()}.`;
        }
    }
    setInterval(updateTimer, 1000);
}

 */