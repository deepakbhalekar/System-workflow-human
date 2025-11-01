// This JSON object mimics the data fetched and stored in the PostgreSQL database.
// Data is pre-processed, simplified, and ready for display.

const LANGUAGE_PACK = {
    hi: {
        title: "हमारी आवाज़, हमारे अधिकार 📢",
        subtitle: "आपके जिले का मनरेगा प्रदर्शन",
        lang_toggle: "English",
        p_state: "राज्य: राजस्थान",
        l_select: "आपका जिला चुनें:",
        o_default: "--- जिला चुनें ---",
        p_bonus: "🌍 अपने जिले को स्वतः खोजने के लिए अनुमति दें (Bonus)",
        m1_label: "कितने लोगों ने काम माँगा",
        m2_label: "कितने लोगों को काम मिला",
        m3_label: "पैसा सही समय पर मिला?",
        h_title: "पिछले 6 महीनों का प्रदर्शन (ग्राफ)",
        p_footer: "** यह डेटा सरकारी पोर्टल से प्राप्त किया गया है।",
        payment_status_good: "👍 हाँ, बहुत अच्छा (>90%)",
        payment_status_average: "🟡 ठीक-ठाक (70%-90%)",
        payment_status_poor: "👎 नहीं, धीमा (<70%)"
    },
    en: {
        title: "Our Voice, Our Rights 📢",
        subtitle: "Your District's MGNREGA Performance",
        lang_toggle: "हिंदी",
        p_state: "State: Rajasthan",
        l_select: "Select Your District:",
        o_default: "--- Select District ---",
        p_bonus: "🌍 Allow location access to auto-select your district (Bonus)",
        m1_label: "Job Card Demand (People who asked for work)",
        m2_label: "Employment Provided (People who got work)",
        m3_label: "Was Money Paid on Time?",
        h_title: "Last 6 Months Performance (Graph)",
        p_footer: "** Data sourced from the Government portal.",
        payment_status_good: "👍 Yes, Very Good (>90%)",
        payment_status_average: "🟡 Okay (70%-90%)",
        payment_status_poor: "👎 No, Slow (<70%)"
    }
};

const MOCK_DATA = {
    "Jaipur": {
        demand_count: "2,50,000",
        provided_count: "2,25,000",
        payment_timeliness: 92, // %
        history: [50, 60, 75, 80, 85, 92] // Historical payment timeliness for graph
    },
    "Udaipur": {
        demand_count: "1,80,000",
        provided_count: "1,10,000",
        payment_timeliness: 65, // %
        history: [70, 75, 60, 55, 62, 65]
    },
    "Jodhpur": {
        demand_count: "3,10,000",
        provided_count: "3,00,000",
        payment_timeliness: 85, // %
        history: [88, 82, 79, 81, 84, 85]
    }
    // ... data for all Rajasthan districts
};

const DISTRICT_NAMES = Object.keys(MOCK_DATA);
let currentLang = 'hi'; // Default language is Hindi