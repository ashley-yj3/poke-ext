const productiveSites = ["github.com","leetcode.com","learn.uwaterloo.ca","docs.google.com","notion.com","calendar.google.com","trello.com"]
let active_tab = null;
let time_spent = {};

chrome.tabs.onActivated.addListener((active_info)=>{
    chrome.tabs.get(active_info.tab_id,(tab)=>{
        if(tab){
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
    if(alarm.name == "track_time"&&productiveSites.includes(active_tab)){
        time_spent[active_tab]++;
        if(time_spent[active_tab]==1||time_spent[active_tab]==120||time_spent[active_tab]==240){ //how to get timed intervals
            chrome.runtime.sendMessage({action: "show_pokemon", time: time_spent[active_tab]});
        }
    }
});