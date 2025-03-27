// Basic JS for the profile page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const button = form.querySelector('button');

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Basic validation
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Simulate sending
        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            alert('Message sent successfully!');
            form.reset();
            button.textContent = 'Send Message';
            button.disabled = false;
        }, 1000);
    });
});