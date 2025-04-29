const productiveSites = ["github.com","leetcode.com","docs.google.com","notion.com","calendar.google.com","trello.com","chatgpt.com"]
let active_tab = null;
let time_spent = 0;
let prod_tab_id = null;

const resetTimer = () => {
    chrome.alarms.clearAll();
    time_spent = 0;
    console.log("Stopping the alarm!");
  };


const startAlarm = () => {
  console.log("Starting the alarm!");
    chrome.alarms.create("track_time", { periodInMinutes: 1 }); 
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //when users access a new page within site
    if (changeInfo.url) {
      let newUrl = new URL(changeInfo.url);
      if (productiveSites.includes(newUrl.hostname)) {
        if (!active_tab) {
          startAlarm(); 
        }
        active_tab = newUrl.hostname; 
        prod_tab_id = tab.id;
      } else {
        active_tab = null;
        resetTimer(); 
      }
    }
  });

  chrome.tabs.onActivated.addListener((activeInfo) => { //for when user switches tabs
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url) {
        let newUrl = new URL(tab.url);
        if (productiveSites.includes(newUrl.hostname)) {
          if (!active_tab) {
            startAlarm(); 
          }
          active_tab = newUrl.hostname; 
          prod_tab_id = tab.id;
        } else {
          active_tab = null;
          resetTimer(); 
        }
      }
    });
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "track_time" && active_tab) {
      time_spent += 1; 
      console.log(`Total productive time: ${time_spent} minutes`);
  
      if (time_spent === 1 || time_spent % 120 === 0) { 
            console.log("sending message");
            chrome.scripting.executeScript({
              target: { tabId: prod_tab_id },
              files: ["content.js"]
            }, () => {
              chrome.tabs.sendMessage(prod_tab_id, {
                action: "show_pokemon",
                time: time_spent,
              });
            });
      }
    }
  });