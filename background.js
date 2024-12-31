const productiveSites = ["github.com","leetcode.com","learn.uwaterloo.ca","docs.google.com","notion.com","calendar.google.com","trello.com"]
let active_tab = null;
let time_spent = {};

chrome.tabs.onActivated.addListener((activeInfo)=>{
    chrome.tabs.get(activeInfo.tabId,(tab)=>{
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }
        if(tab && tab.url){
            const url = new URL(tab.url);
            active_tab = url.hostname;
            if(!time_spent[active_tab]){
                time_spent[active_tab]=0;
            }
        }
    });
});

chrome.alarms.create("track_time", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm)=> {
    if(alarm.name === "track_time"&&productiveSites.includes(active_tab)){
        
        console.log("Alarm triggered:", alarm.name);
        console.log("Active tab:", active_tab);
        
        time_spent[active_tab]++;
        if(time_spent[active_tab]==1||time_spent[active_tab]%120==0){ 
            console.log("Sending show_pokemon message for:", active_tab);
            chrome.runtime.sendMessage({action: "show_pokemon", time: time_spent[active_tab]});
        }
    }
});