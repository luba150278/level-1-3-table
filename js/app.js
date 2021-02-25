window.onload = () => {
  //-------------User own solution--------------
  //Input data
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

  let newData; //Select data equals config colums
  let tableRow;
  /**
   * Main function - form data, create table and add it in HTML
   * @param {*} config - data about table titles and needed columns
   * @param {*} data - data for table
   */
  function DataTable(config, data) {   
    newData = tableData(config, data);
    let idTable = config.parent.substring(1);
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    tableRow = document.createElement('tr');

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableHead.appendChild(tableRow);
   
    formRow(0);  //form table head

    //form table body
    for (let i = 1; i < newData.length; i++) {
      tableRow = document.createElement('tr');
      tableBody.appendChild(tableRow);
      formRow(i);
    }
    document.getElementById(idTable).append(table);
  }

  /**
   * Select data to the table
   * @param {*} config 
   * @param {*} data 
   */
  tableData = (config, data) => {
    let usedData = []
    let title = {}
    //Form data for header table
    title['number'] = '№'
    config.columns.map((arr, i) => {
      title[arr.value] = arr.title
    })
    usedData.push(title)
    
    //For data for body table
    data.map((arr, i) => {
      let items = {}
      items['number'] = i + 1
      for (let key in arr) {
        if (title[key]) {
          items[key] = arr[key]
        }
      }
      usedData.push(items)
    })

    return usedData
  }

  /**
   * Form row to table 
   * @param {*} index index in the table
   */
  function formRow(index) {
    for (let key in newData[index]) {
      tableRow.appendChild(addTextToCell('th', newData[index][key]));
    }

  }

  /**
   * Add text to row cell
   * @param {*} element 
   * @param {*} text 
   */
  function addTextToCell(element, text) {
    let th = document.createElement(element);
    let textNode = document.createTextNode(text);
    th.appendChild(textNode);
    return th;
  }

  DataTable(config1, users); //Start adding table

  //----------Use External Library-----------
  /**
   * For "Tabulator library" form table without title. Title is key in usedData array
   * @param {*} config - data about table titles and needed columns
   * @param {*} data - data for table
   */
  tableForLibrary = (config, data) => {
    let configData = [];
    let usedData = [];
    //create info for column titles
    config.columns.map(item => {
      let itemTo = {};
      itemTo[item.value] = item.title;
      configData.push(itemTo); 
    })
    //create info for data table
    data.map((arr, i) => {
      let items = {};
      items['№'] = i + 1;
      for (let key in arr) {
        let keyValue = configData.filter(item => item[key]);       
        if(keyValue.length==1){         
          items[keyValue[0][key]] = arr[key];
        }
      }
      usedData.push(items);
    })

    return(usedData);
  }

  /**
   * Use tabulator for from table
   */
  new Tabulator("#usersTableLib", {
    data: tableForLibrary(config1, users),
    autoColumns: true,
  });
}