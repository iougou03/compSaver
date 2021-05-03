const container = document.getElementById('container');
const textArea = document.querySelector('#container textarea');

function write(text){
    textArea.value += text;
}

function clickEventHandler(){
    container.addEventListener("click",(ev)=>{
        chrome.tabs.query({active:true,lastFocusedWindow:true},(tabs)=>{
            let msgObj ={
                tabId : tabs[0].id
            };
            chrome.tabs.sendMessage(tabs[0].id,msgObj,{},(response)=>{
                write(response.position)
            })
        })
    })
}

function init(){
    clickEventHandler();
}

init();