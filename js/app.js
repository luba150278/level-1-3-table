window.onload = () => {
  function DataTable(config, data) {
    let idTable = config.parent.substring(1);
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let dataToArray;

    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tr);
    tr.appendChild(addItem('th', '№'));

    config.columns.map(arr => tr.appendChild(addItem('th', arr.title)));

    dataToArray = data.map(arr => [arr.id, arr.name, arr.surname, arr.age]);    
    for (let i = 0; i < dataToArray.length; i++) {
      tr = document.createElement('tr');
      tbody.appendChild(tr);
      for (let j = 0; j < dataToArray[0].length; j++) {
        tr.appendChild(addItem('th', (j == 0) ? i + 1 : dataToArray[i][j]));
      }
    }
    document.getElementById(idTable).append(table);
  }

  function addItem(el, text) {
    let th = document.createElement(el);
    let textNode = document.createTextNode(text);
    th.appendChild(textNode);
    return th;
  }

  const config1 = {
    parent: '#usersTable',
    columns: [
      { title: 'Имя', value: 'name' },
      { title: 'Фамилия', value: 'surname' },
      { title: 'Возраст', value: 'age' },
    ]
  };

  const users = [
    { id: 30050, name: 'Вася', surname: 'Петров', age: 12 },
    { id: 30051, name: 'Иван', surname: 'Васечкин', age: 15 },
    { id: 30051, name: 'Анжела', surname: 'Иванова', age: 15 },
    { id: 30051, name: 'Вячеслав', surname: 'Андреев', age: 15 },
  ];
  DataTable(config1, users);

  //Use Library
  let tableForLibrary = (config, users) => {
    let arr = [];
    let arrItem;
    let dataToArray = users.map(arr => [arr.name, arr.surname, arr.age]);

    for (let i = 0; i < dataToArray.length; i++) {
      let j = 0;
      arrItem = {};
      config.columns.map(item => {
        arrItem['№'] = i + 1;
        arrItem[item.title] = dataToArray[i][j++];
      })     
      arr[i] = arrItem;
    }
    return arr;
  }

  let table = new Tabulator("#usersTableLib", {
    data: tableForLibrary(config1, users),
    autoColumns: true,
  });
}