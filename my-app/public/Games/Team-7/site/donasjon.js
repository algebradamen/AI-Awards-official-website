// Donation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage
    let totalAmount = parseInt(localStorage.getItem('totalDonationAmount')) || 0;
    let treesPlanted = parseInt(localStorage.getItem('treesPlanted')) || 0;
    let waterProtected = parseInt(localStorage.getItem('waterProtected')) || 0;
    let businessesSupported = parseInt(localStorage.getItem('businessesSupported')) || 0;
    let climateActions = parseInt(localStorage.getItem('climateActions')) || 0;

    // Update display
    updateDisplay();

    // Amount buttons
    const amountButtons = document.querySelectorAll('.amount-btn');
    let selectedAmount = 0;

    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedAmount = parseInt(this.dataset.amount);
            document.getElementById('customAmount').value = '';
        });
    });

    // Custom amount input
    const customAmountInput = document.getElementById('customAmount');
    customAmountInput.addEventListener('input', function() {
        if (this.value) {
            amountButtons.forEach(b => b.classList.remove('active'));
            selectedAmount = parseInt(this.value) || 0;
        }
    });

    // Donate button
    const donateBtn = document.getElementById('donateBtn');
    const donationMessage = document.getElementById('donationMessage');

    donateBtn.addEventListener('click', function() {
        const customAmount = parseInt(customAmountInput.value);
        const amount = customAmount || selectedAmount;

        if (amount <= 0) {
            showMessage('Vennligst velg eller skriv inn et beløp', 'error');
            return;
        }

        // Get selected cause
        const selectedCause = document.querySelector('input[name="cause"]:checked').value;

        // Process donation
        processDonation(amount, selectedCause);
    });

    function processDonation(amount, cause) {
        // Update totals
        totalAmount += amount;

        // Update cause-specific stats
        switch(cause) {
            case 'trees':
                treesPlanted += Math.floor(amount / 100);
                break;
            case 'water':
                waterProtected += Math.floor(amount / 0.5);
                break;
            case 'business':
                businessesSupported += Math.floor(amount / 500);
                break;
            case 'climate':
                climateActions += Math.floor(amount / 1000);
                break;
        }

        // Save to localStorage
        localStorage.setItem('totalDonationAmount', totalAmount);
        localStorage.setItem('treesPlanted', treesPlanted);
        localStorage.setItem('waterProtected', waterProtected);
        localStorage.setItem('businessesSupported', businessesSupported);
        localStorage.setItem('climateActions', climateActions);

        // Update display
        updateDisplay();

        // Show success message
        const causeNames = {
            'trees': 'planting av trær',
            'water': 'vannbeskyttelse',
            'business': 'bærekraftige bedrifter',
            'climate': 'klimaaksjoner'
        };

        showMessage(`Takk for din donasjon på ${amount} kr til ${causeNames[cause]}! 🌱`, 'success');

        // Reset form
        selectedAmount = 0;
        customAmountInput.value = '';
        amountButtons.forEach(b => b.classList.remove('active'));
    }

    function updateDisplay() {
        // Animate total amount
        animateValue('totalAmount', parseInt(document.getElementById('totalAmount').textContent) || 0, totalAmount, 1000);
        
        // Update stats
        setTimeout(() => {
            document.getElementById('treesPlanted').textContent = treesPlanted;
            document.getElementById('waterProtected').textContent = waterProtected.toLocaleString('no-NO');
            document.getElementById('businessesSupported').textContent = businessesSupported;
            document.getElementById('climateActions').textContent = climateActions;
        }, 500);
    }

    function animateValue(elementId, start, end, duration) {
        const element = document.getElementById(elementId);
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('no-NO');
        }, 16);
    }

    function showMessage(text, type) {
        donationMessage.textContent = text;
        donationMessage.className = `donation-message ${type}`;
        donationMessage.style.display = 'block';

        setTimeout(() => {
            donationMessage.style.opacity = '0';
            setTimeout(() => {
                donationMessage.style.display = 'none';
                donationMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});

