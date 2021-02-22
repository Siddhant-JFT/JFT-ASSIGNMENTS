
fetched = false
data = []
var a;

const load = async () => {
    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let json = await result.json()
    json.forEach(item => {
        data.push(item)
    })
    fetched = true
}


const toAdd = async () => {
    if (!fetched) {
        await load();
    }
    // console.log(data)
    let rowTag = document.createElement('div')
    rowTag.classList.add('row')

    const iHead = createHeader('col-md-1', 'ID')
    const nHead = createHeader('col-md-3', 'Name')
    const uHead = createHeader('col-md-3', 'Username')
    const wHead = createHeader('col-md-5', 'Website')

    iHead.classList.add('d-none', 'd-md-block')
    nHead.classList.add('d-none', 'd-md-block')
    uHead.classList.add('d-none', 'd-md-block')
    wHead.classList.add('d-none', 'd-md-block')

    rowTag.appendChild(iHead)
    rowTag.appendChild(nHead)
    rowTag.appendChild(uHead)
    rowTag.appendChild(wHead)
    let i = 1;
    data.forEach((user) => {

        let idDisplay = createData('col-md-1', i++)
        let nameDisplay = createData('col-md-3', user.name)
        let unameDisplay = createData('col-md-3', user.username)
        let websDisplay = createData('col-md-3', user.website)


        let editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-primary', 'col-md-1')
        editBtn.innerHTML = "Edit"

        let delBtn = document.createElement('button');
        delBtn.classList.add('btn', 'btn-danger', 'col-md-1');
        delBtn.addEventListener("click", function () {
            deleteFunction(user.id)
        });
        delBtn.innerText = "Delete";

        rowTag.appendChild(idDisplay)
        rowTag.appendChild(nameDisplay)
        rowTag.appendChild(unameDisplay)
        rowTag.appendChild(websDisplay)
        rowTag.appendChild(editBtn)
        rowTag.appendChild(delBtn)
        rowTag.appendChild(document.createElement('hr'))
    })

    document.getElementById('test1').appendChild(rowTag)


}

toAdd();
// console.log(data)

const createHeader = (className, text) => {
    const el = document.createElement('h5')
    el.classList.add(className)
    el.innerHTML = text
    return el
}

const createData = (className, text) => {
    const p = document.createElement('p')
    p.innerHTML = text
    p.classList.add(className)
    return p
}

function addData() {

    let id;

    let newObj = {
        id: (data.length > 0) ? (id = data[data.length - 1].id + 1) : (id = 1),
        name: document.getElementById("name").value,
        username: document.getElementById("uname").value,
        website: document.getElementById("webs").value
    }
    data.push(newObj)
    // console.log(data)
    document.getElementById('test1').innerHTML = ''
    toAdd()
    document.getElementById("uname").value = ''
    document.getElementById("name").value = ''
    document.getElementById("webs").value = ''
}

function deleteFunction(x) {
    data.splice((x - 1), 1);
    toAdd();
}
// console.log(data)