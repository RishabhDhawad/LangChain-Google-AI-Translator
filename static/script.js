// Get references to the HTML elements
const form = document.getElementById('translation-form');
const textInput = document.getElementById('text-input');
const languageSelect = document.getElementById('target-language');
const resultText = document.getElementById('result-text');

// Listen for the form submission
form.addEventListener('submit', (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Send the data to the /translate endpoint
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: textInput.value,
            target_language: languageSelect.value,
        }),
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        // Update the result paragraph with the translated text
        resultText.textContent = data.translated_text;
    });
});