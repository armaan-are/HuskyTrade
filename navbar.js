window.onload = function() {
    // Get the current page URL
    const currentPage = window.location.pathname.split('/').pop();

    // Map the buttons to their corresponding page
    const buttons = {
        "index.html": "home-btn",
        "projects.html": "projects-btn",
        "about.html": "about-btn",
        "contact.html": "contact-btn",
    };

    // Remove active class from all buttons
    for (const buttonId in buttons) {
        document.getElementById(buttons[buttonId]).classList.remove('active');
    }

    // Add active class to the corresponding button
    if (buttons[currentPage]) {
        document.getElementById(buttons[currentPage]).classList.add('active');
    }
};