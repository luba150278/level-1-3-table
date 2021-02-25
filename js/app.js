window.onload = () => {
  //-------------OWN SOLUTION--------------
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
  let tableRow;
  let idTable;
  let newData = tableData(config1, users); //Select data equals config colums; 
  DataTable(config1); //Start adding table

  /**
  * Select data to the table
  * @param {*} config 
  * @param {*} data 
  */
  function tableData(config, data) {
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
   * Main function - form data, create table and add it in HTML
   * @param {*} config - data about table titles and needed columns
   */
  function DataTable(config) {
    idTable = config.parent.substring(1);
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    tableRow = document.createElement('tr');

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableHead.appendChild(tableRow);

    formCells('th', 0, true);  //form table head

    //form table body
    for (let i = 1; i < newData.length; i++) {
      tableRow = document.createElement('tr');
      tableBody.appendChild(tableRow);
      formCells('td', i, false);
    }
    document.getElementById(idTable).append(table);
    formEventForFilter();
  }

  /**
   * Form cells in table 
   * @param {*} el element
   * @param {*} index index in the table
   * @param {*} isArrow just for header - add filter arrow
   */
  function formCells(el, index, isArrow) {
    let i = 1;
    for (let key in newData[index]) {
      tableRow.appendChild(addTextToCell(el, newData[index][key], isArrow, key));
    }
  }

  /**
   * Add text to row cell
   * @param {*} element 
   * @param {*} text 
   */
  function addTextToCell(element, text, isArrow, id) {
    let th = document.createElement(element);
    let textNode = document.createTextNode(text);
    th.appendChild(textNode);

    if (isArrow) {
      th.id = `th_${id}`;
      let arrow = document.createElement("div");
      arrow.className = "arrow arrow-up";
      th.appendChild(arrow);
    }

    return th;
  }

  /**
   * Add "click" listener for header columns. Start sort by click
   */
  function formEventForFilter() {
    let headerCols = document.querySelectorAll("thead > tr th");
    headerCols.forEach(item => {
      let el = document.getElementById(item.id);
      let columnName = item.id.substring(3);
      el.addEventListener("click", (event) => {
        sortTable(columnName);
        reloadTable();
      });
    })
  }

  /**
   * Sort table by column
   * @param {*} columnName name of column
   */
  function sortTable(columnName) {
    let bodyTable = newData.filter((item, i) => i > 0)
    bodyTable.sort((a, b) => a[columnName] < b[columnName] ? -1 : 1)
    newData = tableData(config1, bodyTable);
  }

  /**
   * Repaint sorted table
   */
  function reloadTable() {
    let element = document.getElementById(idTable);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    DataTable(config1)
  }


  //----------USE EXTERNAL LIBRARY-----------
  /**
   * For "Tabulator library" form table without title. Title is key in usedData array
   * @param {*} config - data about table titles and needed columns
   * @param {*} data - data for table
   */
  function tableForLibrary(config, data) {
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
        if (keyValue.length == 1) {
          items[keyValue[0][key]] = arr[key];
        }
      }
      usedData.push(items);
    })

    return (usedData);
  }

  /**
   * Use tabulator for from table
   */
  new Tabulator("#usersTableLib", {
    data: tableForLibrary(config1, users),
    autoColumns: true,
  });
}