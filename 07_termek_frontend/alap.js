/*
fetch("http://localhost:3000/tipus")
.then(x => x.json())
.then(y => megjelenitTipus(y));

function megjelenitTipus(y){
    console.log(y)
    let sz="<ul>"
    for (const elem of y) {
        sz+=`
        <li>${elem.tipus_nev}</li>
        `
    }
    sz+="</ul>"
    document.body.innerHTML+=sz
}
*/

//lenyilo lista, tipus async-el
async function betoltTipus() {
    try{
        let response = await fetch("http://localhost:3000/tipus");
        let data = await response.json();
        if (!response.ok){
            console.log(data.error)
            document.getElementById("lenyiloKeret").innerHTML=data.error
        }
        else{
            megjelenitLenyilo(data)
        }
    }
    catch(err){
        console.log("Hiba",err)
    }
}

betoltTipus()

function megjelenitLenyilo(data){
    let sz="<select id='termek_tipus'>"
    for (const elem of data) {
        sz+=`
        <option value="${elem.tipus_id}">${elem.tipus_nev}</option>
        `
    }
    sz+="</select>"
    document.getElementById("lenyiloKeret").innerHTML=sz
}

async function termekFelvitel(){
    //alert("Kattintas")
    const adatok={
        "termek_nev":document.getElementById("termek_nev").value,
        "termek_ar":document.getElementById("termek_ar").value,
        "termek_tipus":document.getElementById("termek_tipus").value
    }
    //alert(adatok.termek_tipus)
    
    let response = await fetch("http://localhost:3000/termekFelvitel",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(adatok)
          });
    let data = await response.json();
    if (!response.ok){
        console.log(data.error)
    }
    else{
        console.log(data.message)
    }
}

async function termekTorles(){
    //alert("Kattintas")
    const adatok={
        "termek_id":document.getElementById("termek_id").value,
   }
   
    let response = await fetch(`http://localhost:3000/termekTorlesPara/${adatok.termek_id}`,{
          method: "DELETE"
         });
    let data = await response.json();
    if (!response.ok){
        console.log(data.error)
    }
    else{
        console.log(data.message)
    }
}

