import React, { useContext, useState, useEffect } from "react";
import styles from "./CSV.module.css";

import { Octokit } from "@octokit/rest";
import { AuthContext } from "../../App";
import { parse } from "papaparse";

const CSV: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [csvData, setCsvData] = useState({});
  const repoOwner = state.user.login
  const targetRepo = "octokit-test-app"
  const targetRepoPath = 'src/sample_data'
  const fileName = "big_sample.csv"
  const targetBranch = "heads/master"
  const newBranch = "heads/chore/update_sample_data"


  const octokit = new Octokit({
    auth: state.access_token,
  });

  useEffect(() => {
    getSampleData();
    console.log(csvData)
  }, []);
  const getFileSha = async () => {
    return await octokit.repos
      .getContent({
        owner: state.user.login,
        repo: targetRepo,
        path: targetRepoPath,
      })
      .then((result) => {
        if (Array.isArray(result.data)) {
          const csvFile = result.data.find(
            (file) => file.name === fileName
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
          repo: targetRepo,
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

  const createBranch = async (_sha: string) => {
    return await octokit.git.createRef({
      owner: repoOwner,
      repo: targetRepo,
      ref: newBranch,
      sha: _sha
    })
  }


  const getMasterRef = async () => {
    return await octokit.git.getRef({
      owner: repoOwner,
      repo: targetRepo,
      ref: targetBranch
    }).then(result => result.data.object)
  }

  return (
    <div className={styles.CSV} data-testid="CSV">
    </div>
  );
};

export default CSV;
export interface Row {
  id: number;
  title: string;
  count: number;
}
