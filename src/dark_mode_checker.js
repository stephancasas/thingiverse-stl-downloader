if (window) {
    const darkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
    chrome.runtime.sendMessage({darkMode: darkModeEnabled}, () => {
        // Close the window after sending the message.
        window.close();
    });
} else {
    // window object didn't exist yet. Default to false and close the window.
    chrome.runtime.sendMessage({darkMode: false}, () => {
        window.close();
    });
}
