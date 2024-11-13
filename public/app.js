// Example of simple form validation on employee registration

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.querySelector('form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const department = document.getElementById('department').value;
            const salary = document.getElementById('salary').value;

            // Simple form validation
            if (!name || !email || !department || !salary) {
                e.preventDefault();
                alert('All fields are required!');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
        });
    }
});

// If you need to do any dynamic actions, you can add them here
