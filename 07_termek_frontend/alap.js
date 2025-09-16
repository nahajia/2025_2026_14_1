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

//lenyilo lista, tipus async-el
async function betoltTipus() {
    let x = await fetch("http://localhost:3000/tipus");
    let y = await x.json();
    let sz="<select>"
    for (const elem of y) {
        sz+=`
        <option>${elem.tipus_nev}</option>
        `
    }
    sz+="</select>"
    document.body.innerHTML+=sz
}

betoltTipus()