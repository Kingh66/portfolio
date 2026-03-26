<<<<<<< HEAD
export function initializeEmailService() {
    emailjs.init('q69sk-XmcTj6GEzjl'); // Your EmailJS User ID
}

export function sendEmail(params) {
    return emailjs.send(
        'service_fcdwhbc', // Service ID
        'template_uim1xoc', // Template ID
        params
    );
=======
export function initializeEmailService() {
    emailjs.init('q69sk-XmcTj6GEzjl'); // Your EmailJS User ID
}

export function sendEmail(params) {
    return emailjs.send(
        'service_fcdwhbc', // Service ID
        'template_uim1xoc', // Template ID
        params
    );
>>>>>>> 74b5070 (added a new project and experience)
}