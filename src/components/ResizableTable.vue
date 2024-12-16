<template>
    <div class="table-container">
      <table ref="resizableTable" class="resizable" id="tableId">
        <thead>
          <tr>
            <th id="1"><input type="checkbox" /></th>
            <th id="2">Index</th>
            <th id="3">Size</th>
            <th id="4">File</th>
            <th id="5">Age</th>
            <th id="6">Created At</th>
            <th id="7">Sample</th>
            <th id="8">Sample 2</th>

          </tr>
        </thead>
        <tbody>
        <!-- Use v-for to iterate over the rows array -->
        <tr v-for="(row, index) in tableData" :key="index">
          <td><input type="checkbox" /></td>
          <td>{{ row.index }}</td>
          <td>{{ row.size }}</td>
          <td>{{ row.file }}</td>
          <td>{{ row.age }}</td>
          <td>{{ row.createdAt }}</td>
          <td>{{ row.sample }}</td>
          <td>{{ row.sample2 }}</td>

        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      // Your rows data, each row being an object with size and file properties
      tableData: [
        { width:'10px', index: '0', size: '10Mb', file: 'C:\\Usabc.txtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt', name: 'test', age: '26', createdAt: '2026-10-01', sample: 'test', sample2: 'test2' },
        { width:'100px', index: '1', size: '10Mb', file: 'C:\\File.txt', name: 'test', age: '26', createdAt: '2026-10-01', sample: 'test', sample2: 'test2' },
        { width:'100px',  index: '2',size: '10Mb', file: 'C:\\File.txt', name: 'test', age: '26', createdAt: '2026-10-01', sample: 'test', sample2: 'test2' },
        { width:'150px', index: '3',  size: '10Mb', file: 'C:\\Another.txt', name: 'test', age: '26', createdAt: '2026-10-01', sample: 'test', sample2: 'test2' },
      ]
    };
   },
    mounted() {
      this.initResizableGrid();
      this.adjustTableWidth(); // Adjust table width when the component is mounted
    window.addEventListener('resize', this.adjustTableWidth); // Adjust table width on window resize
    },
    beforeUnmount() {
    window.removeEventListener('resize', this.adjustTableWidth); // Clean up resize event listener
  },
    methods: {
   adjustTableWidth() {
    let table = document.getElementById('tableId');
    let tableWidth = 0;

    // Loop through the header cells and calculate the total width needed
    let headers = table.querySelectorAll('th');
    headers.forEach((header) => {
      tableWidth += header.offsetWidth;
    });

    // Set the table's width dynamically based on the header columns' width
    table.style.width = tableWidth + 'px';
    },
      initResizableGrid() {
        const table = this.$refs.resizableTable;
        const rows = table.getElementsByTagName('tr');
        // This grabs the first row of the table, which contains the table headers
        const firstRow = rows[0];
        //: If the first row exists, we get its columns (the <th> elements). If the first row doesn't exist, we return undefined.
        const cols = firstRow ? firstRow.children : undefined;
  
        // If there are no columns, we stop the function (this prevents errors).
        if (!cols) return;
  
        // This saves the height of the table so we can use it when creating resize handles (the divs).
        const tableHeight = table.offsetHeight;
  

        //This converts the columns into an array and loops through each column to add a resize handle and event listeners.
        Array.from(cols).forEach((col,index) => {

        // Set the initial column widths
        col.style.width = '100px'

        //Disable resizing for first and last columns
        if(index === 0 || (index === cols.length-1)) return
         //Creates a new div (resize handle) for each column.
          const div = this.createDiv(tableHeight);

          //: Adds the resize handle inside each column
          col.appendChild(div);

          //: Ensures the columns are positioned relative to their normal position so we can place the resize handle over them
          col.style.position = 'relative';

          //Sets up event listeners for resizing on each column.
          this.setListeners(div);
        });
      },
      createDiv(height) {
        const div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = `${height}px`;
        return div;
      },
      setListeners(div) {
        /* eslint-disable no-unused-vars */
        //These are variables used to track the current state during the resizing process:

        //: Stores the X position of the mouse when the user starts dragging.
        let pageX;

        // The column the user is resizing
        let curCol;

        //The next column (if there is one) to resize simultaneously.
        let nxtCol;

        //The original width of the column being resized.
        let curColWidth;
  
        //* When it's triggered: When the user presses a mouse button down.
        //What it means: This event occurs as soon as the user clicks a mouse button (left, right, or middle).
        //Use case: Useful when you want to detect the start of a click or when a drag operation begins. **/
        div.addEventListener('mousedown', (e) => {
          curCol = e.target.parentElement;
          nxtCol = curCol.nextElementSibling;
          pageX = e.pageX;
          curColWidth = parseInt(curCol.style.width, 10);
        });
  

        /** When the mouse is over the resize handle, a blue border is shown to indicate that it's resizable. */
        div.addEventListener('mouseover', (e) => {
          e.target.style.borderRight = '2px solid #0000ff';
        });
  
        /**  When the mouse leaves the resize handle, the border is removed. */
        div.addEventListener('mouseout', (e) => {
          e.target.style.borderRight = '';
        });
  
        //When it's triggered: When the user moves the mouse over an element.
        //What it means: This event is continuously triggered as the mouse moves across the screen or over a particular element.
        //Use case: Used for tracking mouse movement, such as creating drawing apps, or detecting when the mouse is hovering over an element.
        document.addEventListener('mousemove', (e) => {
          if (curCol) {
            console.log('#### Current col', curCol )
            // Calculates how far the mouse has moved since the mousedown event.
            const diffX = e.pageX - pageX;
            //Updates the width of the column being resized.
            console.log('#### Width Initial', curCol.style.width )
            curCol.style.width = `${curColWidth + diffX}px`; // Ensure minimum width of 20px

            let currentWidth = parseInt(curCol.style.width, 10)

            console.log('#### curColWidth ', curColWidth  )
            console.log('#### diffX  now  ', e.pageX , ' initial ' , pageX , ' diff '  , (e.pageX - pageX))
            console.log('#### Width Final', `${curColWidth + diffX}px`, currentWidth )
            console.log('##############' )

                 // Optionally, you can also update the next column (nxtCol) width to resize both columns simultaneously
            // if (nxtCol && currentWidth >= 10) {
            //     nxtCol.style.width = `${nxtCol.offsetWidth - diffX}px`; // Reduce the width of the next column based on mouse movement
            // }
          }
        });
  
        //When it's triggered: When the user releases a mouse button.
        //What it means: This event occurs when the mouse button that was previously pressed down is released.
        //Use case: Used to detect when a user completes a click or finishes a drag operation.
        /** When the mouse button is released, stop resizing. */
        document.addEventListener('mouseup', () => {
          curCol = undefined;
          nxtCol = undefined;
          pageX = undefined;
          curColWidth = undefined;
        });
        /* eslint-disable no-unused-vars */
      },
      paddingDiff(col) {
        if (this.getStyleVal(col, 'box-sizing') === 'border-box') {
          return 0;
        }
        const padLeft = this.getStyleVal(col, 'padding-left');
        const padRight = this.getStyleVal(col, 'padding-right');
        return parseInt(padLeft) + parseInt(padRight);
      },
      getStyleVal(elm, css) {
        return window.getComputedStyle(elm, null).getPropertyValue(css);
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }
  
  table {
    border-collapse: collapse;
    min-width: 80%;
    width: 100%;
  }
  
  td,
  th {
    padding: 5px 15px;
    text-align: left;
  }

  td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  table,
  th,
  td {
    border: 1px solid #000;
  }

  

  </style>
  