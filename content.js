chrome.runtime.onMessage.addListener((msgObj,sender,sendResponse)=>{
    let x,y;

    if (msgObj.text == 'adding item'){
        sendResponse({data:"connected to "+document.title})
        document.addEventListener('mouseover',function (e){
        x = e.clientX;
        y = e.clientY;

        let item = document.elementFromPoint(x, y);    

        item.addEventListener('mouseenter',()=>{
            item.style.filter = 'brightness(0.2)'
        })
        
        item.addEventListener('mouseout',function(){
            item.style.filter = 'brightness(1)'
        })

        item.addEventListener('mousedown',function(){
            console.log(item.tagName)
            if(item.tagName == 'IMG'){
                chrome.runtime.sendMessage({
                    imgSrc:item.src,
                    title:item.alt
                },()=>{
                    location.reload();
                })
            }else{
                console.log('please click image')    
            }
            })
        })  
    }          
})
