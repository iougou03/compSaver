let clicked = false;

async function clickFunction({tabId},item){
    while (!clicked){
        continue
    }
    return await new Promise(res=>{
        alert('clicked');
        res(item);
    })
}

chrome.runtime.onMessage.addListener((msgObj,sender,sendResponse)=>{
    let x,y;

    console.log(msgObj)
    document.addEventListener('mouseover',function (e){
        x = e.clientX;
        y = e.clientY;

        let item = document.elementFromPoint(x, y);    
        console.log(x,y,item)

        item.addEventListener('mouseenter',()=>{
            item.style.backgroundColor = 'pink';
        })
        
        item.addEventListener('mouseout',function(){
            item.style.backgroundColor = 'white';
        })

        item.addEventListener('click',function(){
            clicked = true;
        })
        let sendMsgObj = await clickFunction(msgObj,item);
        
        sendMsgObj.then(itemDiv=>{
            sendResponse(itemDiv)
        });
    })
})
