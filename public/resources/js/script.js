const wetBin = document.getElementById('wet'),
            dryBin = document.getElementById('dry');
document.addEventListener("DOMContentLoaded", function(event) {
    getStatus();
  });





async function getStatus(){
    try{
        let dryStatus = await ajax('GET','/dry','application/json'),
            wetStatus = await ajax('GET','/wet','application/json');
            dryBin.style.height = dryStatus;
            // wetBin.style.height = "100px";
            let style = getComputedStyle(wetBin),
            dry = getComputedStyle(dryBin);
            console.log(dryStatus);
            wetBin.style.height = wetStatus+"%";
            dryBin.style.height = dryStatus+"%";
            if(wetStatus < 5)
                wetBinFull();
            if(dryStatus < 5)
                dryBinFull();
        setTimeout(getStatus,100);
    }catch(e){
        return console.log("error occurred");
    }
}


// User defined functions
function ajax(method, theUrl,responseType, data=null) {
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if(req.status <400)
                    return resolve(req.responseText);
                return reject('request failed');
            }
        };
        req.open(method, theUrl, true);
        req.setRequestHeader('Accept', responseType);
        if (method.toLowerCase() !== 'get') {
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            req.send(data);
        } else req.send();
    })
}
async function wetBinFull(){
    try{
        let response = await ajax('GET', '/wet-full','application/json');
        return;
    }catch(e){
        return console.log("Error while reporting full dustbin");
    }
}
async function dryBinFull(){
    try{
        let response = await ajax('GET', '/dry-full','application/json');
        return;
    }catch(e){
        return console.log("Error while reporting full dustbin");
    }
}