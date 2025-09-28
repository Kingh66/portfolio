// formManager.js
import { sendEmail, initializeEmailService } from './emailService.js';

export function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    
    // Initialize EmailJS first
    initializeEmailService();
    
    contactForm.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Clear previous errors
    clearErrors(form);
    
    const formData = new FormData(form);
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    // Validation
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            isValid = false;
            showError(field, 'This field is required');
        }
    });

    if (!isValid) return;

    try {
        const emailParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        await sendEmail(emailParams);
        showSuccessMessage();
        form.reset();
    } catch (error) {
        console.error('Email send error:', error);
        showErrorMessage('Failed to send message. Please try again later.');
    }
}

function clearErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

function showError(fieldName, message) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.fontSize = '0.9em';
    
    input.classList.add('error');
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.marginTop = '20px';
    
    const successMessage = document.getElementById('successMessage');
    successMessage.parentNode.insertBefore(errorDiv, successMessage);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'flex';
    successMessage.style.opacity = '1';
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 300);
    }, 3000);
}