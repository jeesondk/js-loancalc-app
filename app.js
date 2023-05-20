// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show loader
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(calculateResults, 1000);

    e.preventDefault();
});

// Calculate Results
function calculateResults() {
    console.log('Calculating...')

    // UI Vars

    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const yearsToRepay = document.querySelector('#years-to-repay');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterst = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsToRepay.value) * 12;

    // Computed monthly payment
    const x = Math.pow(1 + calculatedInterst, calculatedPayments);
    const monthly = (principal * x * calculatedInterst) /  (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value  = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// Show Error
function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    
    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // Create div
    const errDiv = document.createElement('div');
    
    // Add class
    errDiv.className = 'alert alert-danger';
    
    // Create text node and append to div
    errDiv.appendChild(document.createTextNode(error));
    
    // Insert error above heading
    card.insertBefore(errDiv, heading);

    // Clear error after 3 sec.
    setTimeout(clearError, 3000);

};

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
} 