<template>
  <div id="container">
    <table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{ width: header.width + 'px' }"
            class="resize-header"
          >
            <div class="header-content">
              <span class="ellipsis-text">{{ header.name }}</span>
              <div
                class="resizer"
                @mousedown="startResize($event, index)"
              ></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td
          v-for="(header, index) in headers"
          :key="index"
          :style="{ width: header.width + 'px' }"
          class="ellipsis-text"
        >
          {{ row[`column${index + 1}`] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  data() {
    return {
      headers: [
        { name: "Column 1", width: 150 },
        { name: "Column 2", width: 150 },
        { name: "Column 3", width: 150 },
        { name: "Column 4", width: 150 },
        { name: "Column 5", width: 150 },
        { name: "Column 6", width: 150 },
      ],
      resizing: null,
      startX: 0,
      startWidth: 0,
      rows: [
        {
          column1: "Row 1, Cell with very long content that should be truncated with ellipsis.",
          column2: "Row 1, Cell 2",
          column3: "Row 1, Cell 3",
          column4: "Row 1, Cell 4",
          column5: "Row 1, Cell 5",
          column6: "Row 1, Cell 6",
        },
        {
          column1: "Row 2, Cell 1",
          column2: "Row 2, Cell 2",
          column3: "Row 2, Cell 3",
          column4: "Row 2, Cell 4",
          column5: "Row 2, Cell 5",
          column6: "Row 2, Cell 6",
        },
      ],
    };
  },
  methods: {
    startResize(event, index) {
      this.resizing = index;
      this.startX = event.clientX;
      this.startWidth = this.headers[index].width;

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.stopResize);
    },
    onMouseMove(event) {
      if (this.resizing !== null) {
        const delta = event.clientX - this.startX;
        this.headers[this.resizing].width = Math.max(50, this.startWidth + delta);
      }
    },
    stopResize() {
      this.resizing = null;
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.stopResize);
    },
  },
};
</script>

<style scoped>
#container {
  padding: 15px;
  border: 3px solid #000;
  overflow: auto;
}

#container table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed; /* Force fixed column widths */
}

#container th,
#container td {
  border: 1px solid black;
  padding: 8px;
  box-sizing: border-box; /* Prevent padding from affecting the width */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Add ellipsis */
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.resizer {
  cursor: col-resize;
  width: 5px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #ccc;
  z-index: 2;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: table-cell;
}
</style>




