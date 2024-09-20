let bookingDetails = {};

document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            showConfirmationPopup();
        }
    });
});

function validateForm() {
    // Add validation logic here
    // Return true if all fields are filled, false otherwise
    return true;
}

function showConfirmationPopup() {
    const confirmed = confirm("Are you sure you want to book this ticket? Please confirm your booking details.");
    
    if (confirmed) {
        // Collect booking details
        bookingDetails = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            amount: calculateAmount() // Implement this function to calculate the total amount
        };
        
        // Initiate Paystack payment
        initiatePaystackPayment();
    }
}

function initiatePaystackPayment() {
    let handler = PaystackPop.setup({
        key: 'YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual Paystack public key
        email: bookingDetails.email,
        amount: bookingDetails.amount * 100, // Paystack expects amount in kobo
        currency: 'NGN', // or your preferred currency
        ref: 'TRN'+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference
        callback: function(response) {
            // This function is called when the payment is successful
            alert('Payment complete! Reference: ' + response.reference);
            document.getElementById('bookingForm').submit();
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });
    handler.openIframe();
}

function calculateAmount() {
    // Implement logic to calculate the total amount based on selected options
    // This is a placeholder function
    return 5000; // Example: 5000 NGN
}
function fetchCustomerData() {
    // Fetch customer data from the server and populate the table
    // This is a placeholder and should be replaced with actual API call
    const customerData = [
        { id: 1, fullName: 'John Doe', phoneNumber: '1234567890', idNumber: 'ID123456' },
        { id: 2, fullName: 'Jane Smith', phoneNumber: '0987654321', idNumber: 'ID789012' }
    ];

    const tableBody = document.getElementById('customerTable');
    tableBody.innerHTML = '';

    customerData.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.fullName}</td>
                <td>${customer.phoneNumber}</td>
                <td>${customer.idNumber}</td>
                <td>
                    <button class="btn btn-sm btn-info">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function addCustomer() {
    // Implement add customer functionality
    console.log('Add customer');
}

function editCustomer() {
    // Implement edit customer functionality
    console.log('Edit customer');
}

function deleteCustomer() {
    // Implement delete customer functionality
    console.log('Delete customer');
}
// Check for URL parameters
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
if (message) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;
    messageArea.classList.remove('d-none');
}

document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    
    // Simulating a check if user exists (replace this with actual API call)
    const userExists = Math.random() < 0.5; // 50% chance user exists

    const messageArea = document.getElementById('message-area');
    
    if (userExists) {
        messageArea.textContent = `Welcome back, ${username}! Redirecting to booking page...`;
        messageArea.classList.remove('d-none', 'alert-info');
        messageArea.classList.add('alert-success');
        
        // Redirect to booking page after a short delay
        setTimeout(() => {
            window.location.href = 'booking.html';
        }, 2000);
    } else {
        messageArea.textContent = `User ${username} not found. Please register.`;
        messageArea.classList.remove('d-none', 'alert-info');
        messageArea.classList.add('alert-warning');
    }
    
    messageArea.classList.remove('d-none');
});

function checkTrainStatus() {
    // Simulating an API call to get train status
    const delays = [
        { train: "Express 101", delay: "20 minutes" },
        { train: "Local 202", delay: "10 minutes" }
    ];
    const maintenance = [
        { train: "Rapid 303", maintenance: "Track maintenance, service suspended" }
    ];

    let message = "";
    if (delays.length > 0) {
        message += "Delays: ";
        delays.forEach(delay => {
            message += `${delay.train} - ${delay.delay}. `;
        });
    }
    if (maintenance.length > 0) {
        message += "Maintenance: ";
        maintenance.forEach(item => {
            message += `${item.train} - ${item.maintenance}. `;
        });
    }

    const notificationArea = document.getElementById('notification-area');
    const notificationContent = document.getElementById('notification-content');
    if (message) {
        notificationContent.textContent = message;
        notificationArea.classList.remove('d-none');
    } else {
        notificationArea.classList.add('d-none');
    }
}

// Check train status when the page loads
window.onload = checkTrainStatus;

// Check train status every 5 minutes
setInterval(checkTrainStatus, 300000);
