// ----------------------------------------
// Initialization and Setup
// ----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    populateDistrictDropdown();
    applyLanguage(currentLang);
    // BONUS: Attempt to geolocate and auto-select district
    // autoSelectDistrictByLocation();
});

function populateDistrictDropdown() {
    const select = document.getElementById('district-select');
    DISTRICT_NAMES.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        select.appendChild(option);
    });
}

// ----------------------------------------
// Language Toggle
// ----------------------------------------

function applyLanguage(lang) {
    const pack = LANGUAGE_PACK[lang];
    document.querySelector('h1').textContent = pack.title;
    document.querySelector('h2').textContent = pack.subtitle;
    document.getElementById('lang-toggle').textContent = pack.lang_toggle;
    document.getElementById('p-state').textContent = pack.p_state;
    document.getElementById('l-select').textContent = pack.l_select;
    document.getElementById('o-default').textContent = pack.o_default;
    document.getElementById('p-bonus').textContent = pack.p_bonus;
    document.getElementById('m1-label').textContent = pack.m1_label;
    document.getElementById('m2-label').textContent = pack.m2_label;
    document.getElementById('m3-label').textContent = pack.m3_label;
    document.getElementById('h-title').textContent = pack.h_title;
    document.getElementById('p-footer').textContent = pack.p_footer;
    currentLang = lang;
    
    // If a district is already selected, re-load to apply new language strings
    const selectedDistrict = document.getElementById('district-select').value;
    if (selectedDistrict) {
        loadDistrictPerformance(selectedDistrict);
    }
}

function toggleLanguage() {
    const newLang = (currentLang === 'hi') ? 'en' : 'hi';
    applyLanguage(newLang);
}

// ----------------------------------------
// Performance Loading and Display
// ----------------------------------------

function loadDistrictPerformance(district) {
    const data = MOCK_DATA[district];
    if (!data) return;

    // 1. Update Report Title
    document.getElementById('report-title').textContent = district;

    // 2. Update Basic Metrics
    document.getElementById('metric-demand').textContent = data.demand_count;
    document.getElementById('metric-provided').textContent = data.provided_count;
    
    // 3. Update Payment Timeliness (R/Y/G Color-Coding)
    const paymentRateElement = document.getElementById('metric-payment-rate');
    const paymentIconElement = document.getElementById('payment-icon');
    
    paymentIconElement.className = 'icon'; // Reset classes
    paymentRateElement.className = 'metric-value';

    let paymentStatusText;
    
    if (data.payment_timeliness >= 90) {
        paymentStatusText = LANGUAGE_PACK[currentLang].payment_status_good;
        paymentIconElement.classList.add('payment-good');
        paymentIconElement.innerHTML = '✅';
    } else if (data.payment_timeliness >= 70) {
        paymentStatusText = LANGUAGE_PACK[currentLang].payment_status_average;
        paymentIconElement.classList.add('payment-average');
        paymentIconElement.innerHTML = '⚠️';
    } else {
        paymentStatusText = LANGUAGE_PACK[currentLang].payment_status_poor;
        paymentIconElement.classList.add('payment-poor');
        paymentIconElement.innerHTML = '❌';
    }

    paymentRateElement.textContent = `${data.payment_timeliness}% - ${paymentStatusText}`;

    // 4. Update Historical Chart Placeholder (Simple Visualization for low-literacy)
    drawSimpleBarChart(data.history);

    // 5. Show the report
    document.getElementById('performance-report').classList.remove('hidden');
}

// Simple Bar Chart Drawing (Conceptual/Illustrative)
function drawSimpleBarChart(historyData) {
    const chartDiv = document.getElementById('historical-chart');
    chartDiv.innerHTML = ''; // Clear previous content
    
    const maxVal = 100; // Max percentage
    
    // Use simple divs to represent a bar chart for low-end devices
    historyData.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.style.width = '12%';
        bar.style.backgroundColor = value > 70 ? '#4caf50' : '#ffeb3b';
        bar.style.marginRight = '1%';
        bar.style.display = 'inline-block';
        bar.style.borderRadius = '2px';
        bar.style.alignSelf = 'flex-end';
        bar.title = `${index + 1} महीने पहले: ${value}%`;
        chartDiv.appendChild(bar);
    });
    
    // Simple Flexbox for alignment
    chartDiv.style.display = 'flex';
    chartDiv.style.alignItems = 'flex-end';
    chartDiv.style.height = '100px';
    chartDiv.style.backgroundColor = '#e0e0e0';
    chartDiv.style.padding = '5px';
}


// ----------------------------------------
// BONUS: Geolocation for Auto-Selection
// (Requires a backend Reverse Geocoding service/API call)
// ----------------------------------------

function autoSelectDistrictByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // In a real app, this would be an AJAX call to the backend:
            // fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`)
            // .then(response => response.json())
            // .then(data => {
            //     const foundDistrict = data.districtName; // e.g., "Jaipur"
            //     if (MOCK_DATA[foundDistrict]) {
            //         document.getElementById('district-select').value = foundDistrict;
            //         loadDistrictPerformance(foundDistrict);
            //         document.getElementById('p-bonus').textContent = `✅ जिला स्वतः चुना गया: ${foundDistrict}`;
            //     }
            // });
            
            // Mocking the successful location detection for demonstration:
            const mockFoundDistrict = "Jaipur"; 
            if (MOCK_DATA[mockFoundDistrict]) {
                document.getElementById('district-select').value = mockFoundDistrict;
                loadDistrictPerformance(mockFoundDistrict);
                const message = (currentLang === 'hi') ? 
                    `✅ जिला स्वतः चुना गया: ${mockFoundDistrict}` : 
                    `✅ District auto-selected: ${mockFoundDistrict}`;
                document.getElementById('p-bonus').textContent = message;
            }

        }, error => {
            console.error("Geolocation error:", error);
            // Inform user that auto-detection failed
            const message = (currentLang === 'hi') ? 
                '❌ स्थान खोजने की अनुमति नहीं दी गई, कृपया मैन्युअल रूप से चुनें।' : 
                '❌ Location permission denied, please select manually.';
            document.getElementById('p-bonus').textContent = message;
        });
    }
}