const containerDiv = document.getElementById('container');
const addDiv = document.getElementById('addDiv');
const addButton = addDiv.children[0]
let itemDataHandler;

function getItemData(){
    return new Promise(function(res,err){
        chrome.storage.local.get(['items'],({items})=>{res(items)})
    })
}

function setItemData(itemData,callback){
    chrome.storage.local.set({items:itemData},()=>{
        console.log('item modified as:',itemData);    
        callback()
    })
}

export function makeItemDiv(item,index){
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');

    imgDiv.className = 'imageWrapper';
    img.className = 'competitionImage';
    img.src = item.imgSrc;
    img.addEventListener('click',(ev)=>{
        itemDataHandler.splice(index,1);
        setItemData(itemDataHandler,()=>{imgDiv.remove();});
    });

    span.textContent = 'D-day';

    imgDiv.appendChild(img);
    imgDiv.appendChild(span);
    containerDiv.appendChild(imgDiv);
}


function addButtonListener(){
    addButton.addEventListener('click',(ev)=>{
        chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
            console.log(tabs)
            const tabId = tabs[0].id;
            const msgObj = {
                tabId,
                text:'adding item'
            };
            chrome.tabs.sendMessage(tabId,msgObj,{},()=>{
                console.log('send message');
            })
        })

    })
}


(async function init(){
    itemDataHandler = await getItemData();

    itemDataHandler.forEach((item,index)=>{
            makeItemDiv(item,index);
    });

    addButtonListener();
})();

chrome.runtime.onMessage.addListener((msgObj,sender,sendResponse)=>{
    console.log(msgObj)
    chrome.storage.local.get(['items'],({items})=>{
        const obj = {
            imgSrc:msgObj.imgSrc,
            title:msgObj.title
        };
        items.push(obj);
        makeItemDiv(obj)
        chrome.storage.local.set({items},()=>{
            console.log('set items')
        })
    })
})