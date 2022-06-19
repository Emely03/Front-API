//metodo que realiza consumo al api get
let drawTable = () => {
    fetch('http://localHost:3000/api/empleados', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            renderTable(data)
        })
}

drawTable();

let renderTable= (data) => {
    const table = document.querySelector('.table')
    var bodytable = document.createElement('tbody');
    bodytable.className = "tbody"
    table.appendChild(bodytable);
 
    for (var i = 0;  i < data.length; i++) {
       var tr = document.createElement('tr');
       var td1 = document.createElement('td');
       var td2 = document.createElement('td');
       var td3 = document.createElement('td');
       var td4 = document.createElement('td');
       var td5 = document.createElement('td');
       var td6 = document.createElement('td');

       var text1 = document.createTextNode(data[i].fechaingreso);
       var text2 = document.createTextNode(data[i].nombre);
       var text3 = document.createTextNode(data[i].cargo)
       var text4 = document.createTextNode(data[i].salario);
       var text5 = document.createTextNode(data[i].email);
       var text6 = document.createTextNode(data[i].direccion);

       td1.appendChild(text1);
       td2.appendChild(text2);
       td3.appendChild(text3);
       td4.appendChild(text4);
       td5.appendChild(text5);
       td6.appendChild(text6);

       tr.appendChild(td1);
       tr.appendChild(td2);
       tr.appendChild(td3);
       tr.appendChild(td4);
       tr.appendChild(td5);
       tr.appendChild(td6);

       bodytable.appendChild(tr);



        
    }

}
//POST

let createItem = () => {

    const fechaingreso = document.querySelector('#fechaingreso').value
    const nombre = document.querySelector('#nombre').value
    const cargo= document.querySelector('#cargo').value
    const salario = document.querySelector('#salario').value
    const email = document.querySelector('#email').value
    const direccion = document.querySelector('#direccion').value

    let newCourse = {
        "fechaingreso": fechaingreso,
        "nombre": nombre,
        "cargo": cargo,
        "salario": salario,
        "email": email,
        "direccion": direccion

    }

    fetch('http://localHost:3000/api/empleados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            renderResult(true)
        })
        .catch((err) => {
            renderResult(false)
        })
}

let renderResult = (result) => {
    const textResult = document.querySelector('#resultado')
    if (result) {
        textResult.textContent = 'Guardado exitosamente'
    } else {
        textResult.textContent = 'Ocurrio un error al guardar'
    }
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    const tableBody = document.querySelector('.tbody')
    tableBody.remove();
    drawTable();
}
