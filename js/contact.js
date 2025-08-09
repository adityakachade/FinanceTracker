// Contact form functionality
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');
    const faqItems = document.querySelectorAll('.faq-item');

    let currentUser = null;

    // Track logged-in user
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
        } else {
            currentUser = null;
        }
    });

    // Contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!currentUser) {
            showMessage('You must be logged in to send a message.', 'error');
            return;
        }

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            userId: currentUser.uid, // Link to logged-in user
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);

        try {
            // Save contact form submission to Firestore
            await db.collection('contacts').add(formData);

            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();

        } catch (error) {
            console.error('Error submitting contact form:', error);
            showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            setButtonLoading(submitBtn, false);
        }
    });

    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => faqItem.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    function showMessage(message, type) {
        contactMessage.textContent = message;
        contactMessage.className = `contact-message ${type}`;
        contactMessage.style.display = 'block';

        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    }

    function setButtonLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
});
