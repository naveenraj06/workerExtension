/// <reference types="chrome"/>


export const sessionCallbacks = () => {
    
console.log("Session script running...");
console.log("Session ID:", chrome.runtime.id, chrome.storage);
}