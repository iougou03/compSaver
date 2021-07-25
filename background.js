chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.get(['items'],({items})=>{
        if(items){
            console.log('got the items :',items);
        }else{
            chrome.storage.local.set({items:[]},()=>{
                console.log('start apps and set items')
            })
        }
    })
})

