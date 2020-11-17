import React from 'react';
import styles from './Editor.module.css';
import DataGrid, {Column} from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
const Editor: React.FC = () => {
  const columns: Column<any>[] = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
    { key: "count", name: "Count" },
  ];
  const rows: readonly Row[] = [
    { id: 0, title: "row1", count: 20 },
    { id: 1, title: "row1", count: 40 },
    { id: 2, title: "row1", count: 60 },
  ];
  return(
  <div className={styles.Editor} data-testid="Editor">
    Editor Component
    <DataGrid rows={rows} columns={columns}/>
  </div>
  )
};
export interface Row {
  id: number;
  title: string;
  count: number;
}
export default Editor;
