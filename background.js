const productiveSites = ["github.com","leetcode.com","learn.uwaterloo.ca","docs.google.com","notion.com","calendar.google.com","trello.com"]
let active_tab = null;
let time_spent = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
    updateActiveTab(activeInfo.tabId);
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        updateActiveTab(tabId);
    }
});

function updateActiveTab(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !tab || !tab.url) {
            active_tab = null;
            return;
        }
        
        const url = new URL(tab.url);
        const hostname = url.hostname;

        const isProductive = productiveSites.some(site => hostname.includes(site));
        if (isProductive) {
            active_tab = hostname;
            if (!time_spent[active_tab]) {
                time_spent[active_tab] = 0;
            }
        } else {
            active_tab = null;
        }
    });
}


chrome.alarms.create("track_time", { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(()=> {
    if (active_tab) {
        time_spent[active_tab]++;
        if (time_spent[active_tab] === 0.5 || time_spent[active_tab] % 120 === 0) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                
                if (tabs[0]) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                    action: "show_pokemon",
                    time: time_spent[active_tab]
                  });
                }
            }); 
    }
}
});