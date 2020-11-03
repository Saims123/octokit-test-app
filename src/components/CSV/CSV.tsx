import React, { useContext, useState, useEffect } from "react";
import styles from "./CSV.module.css";
// import DataGrid, {Column} from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import { Octokit } from "@octokit/rest";
import { AuthContext } from "../../App";
import { parse } from "papaparse";

const CSV: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [csvData, setCsvData] = useState({});
  const octokit = new Octokit({
    auth: state.access_token,
  });
  // const columns: Column<any>[] = [
  //   { key: "id", name: "ID" },
  //   { key: "title", name: "Title" },
  //   { key: "count", name: "Count" },
  // ];
  // const rows: Row[] = [
  //   { id: 0, title: "row1", count: 20 },
  //   { id: 1, title: "row1", count: 40 },
  //   { id: 2, title: "row1", count: 60 },
  // ];
  useEffect(() => {
    getSampleData();
    console.log(csvData)
  }, []);
  const getFileSha = async () => {
    return await octokit.repos
      .getContent({
        owner: state.user.login,
        repo: "octokit-test-app",
        path: "src/sample_data",
      })
      .then((result) => {
        if (Array.isArray(result.data)) {
          const csvFile = result.data.find(
            (file) => file.name === "big_sample.csv"
          );
          return (csvFile?.sha || "").toString();
        }
      });
  };
  const getSampleData = async () => {
    getFileSha().then((fileSha) => {
      console.log('PHASE 2', fileSha)
      octokit.git
        .getBlob({
          owner: state.user.login,
          repo: "octokit-test-app",
          file_sha: fileSha,
        })
        .then((result) => {
          return Buffer.from(result.data.content, "base64").toString();
        })
        .then((csv) => setCsvData(parse(csv, {header: true, fastMode: true}).data))
        .catch((error) => {
          console.error(error);
        });
    });
  };
  return (
    <div className={styles.CSV} data-testid="CSV">
      CSV Component
      {/* <DataGrid
        rows={rows}
        columns={columns}
      /> */}
      {/* <p>{csvData}</p> */}
    </div>
  );
};

export default CSV;
export interface Row {
  id: number;
  title: string;
  count: number;
}
