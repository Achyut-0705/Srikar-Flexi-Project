import React, { useState } from "react";

import axios from "axios";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Button, Container } from "reactstrap";
import { Input } from "reactstrap";
import Chart from "react-apexcharts";

export default function Analyse() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  const [dataset, setDataset] = useState([
    { datasetSel: "", datasetFile: "", datasetOuputCol: "" },
  ]);
  const handleOnChangeDataset = (e, index) => {
    const { name, value } = e.target;
    const opt = e.target.value;
    if (opt === "") {
      alert("Please choose a dataset");
    }
    const list = [...dataset];
    list[index][name] = value;
    setDataset(list);
  };
  const [dfile, setdFile] = useState();
  const handleOnChangeDatasetFile = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataset];
    list[index][name] = value;
    setdFile(e.target.files[0]);
    setDataset(list);
  };
  const handleOnChangeDatasetOutput = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataset];
    list[index][name] = value;
    setDataset(list);
  };

  const [classifierList, setClassifierList] = useState([
    { select: "", number: "-1" },
  ]);

  const handleClassifierList = (e, index) => {
    const { name, value } = e.target;
    const list = [...classifierList];
    list[index][name] = value;
    setClassifierList(list);
  };
  const handleClassifierListKVal = (e, index) => {
    const { name, value } = e.target;
    const opt = e.target.value;
    if (opt === "") {
      alert("Please choose a classifer");
    }
    const list = [...classifierList];
    list[index][name] = value;
    setClassifierList(list);
  };
  // const list = [dataset, classifierList];
  const [result, setResult] = useState([]);
  const handleFinalList = () => {
    let formData = new FormData();
    // add token to header
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    if (dfile != null) {
      formData.append("datasetFile", dfile);
    }
    formData.append("datasetSel", dataset[0].datasetSel);
    if (dataset[0].datasetOuputCol !== "") {
      formData.append("datasetOuputCol", dataset[0].datasetOuputCol);
    }

    formData.append("classifierList", JSON.stringify(classifierList));

    axios
      .post("http://localhost:8000/analysePage", formData)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  let resDataset;
  const resClassifierList = [];
  const resClassifier = [];
  const resAccuracy = [];
  const resPrecision = [];
  const resRecall = [];
  const resF1Score = [];

  let finalClassifier,
    finalAcc = 0;

  //dataset result
  if (result.length > 0) {
    resDataset = result[0][0]["datasetSelected"];
  }

  //classifier result
  if (result.length > 0) {
    for (let i = 1; i < result.length; i++) {
      resClassifierList.push(result[i][0]);
      resClassifier.push(result[i][0]["classifier"]);
      resAccuracy.push(parseFloat(result[i][0]["accuracy"]).toFixed(2));
      resPrecision.push(parseFloat(result[i][0]["precisons"]).toFixed(2));
      resRecall.push(parseFloat(result[i][0]["recall"]).toFixed(2));
      resF1Score.push(parseFloat(result[i][0]["f1score"]).toFixed(2));
      if (parseFloat(result[i][0]["accuracy"].toFixed(2)) > finalAcc) {
        finalAcc = parseFloat(result[i][0]["accuracy"].toFixed(2));
        finalClassifier = result[i][0]["classifier"];
      }
    }
  }

  const optionsL = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: resClassifier,
      labels: {
        style: {
          colors: [
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
            "#ffffff",
          ],
          fontSize: "16px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#ffffff"],
          fontSize: "16px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    fill: {
      colors: ["#f44336"],
    },
  };
  const seriesAcc = [
    {
      name: "Accuracy",
      data: resAccuracy,
    },
  ];
  const seriesPre = [
    {
      name: "Precision",
      data: resPrecision,
    },
  ];
  const seriesRec = [
    {
      name: "Recall",
      data: resRecall,
    },
  ];
  const seriesF1 = [
    {
      name: "F1 Score",
      data: resF1Score,
    },
  ];

  return (
    <>
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />

      <IndexNavbar />
      <div className="wrapper">
        <div
          className="main"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
            minHeight: "90vh",
          }}
        >
          <div className="section section-basic" id="input-form">
            <Container>
              <h2 className="title">Analyze Here</h2>
              <form>
                <h6>Choose Dataset:</h6>
                {dataset.map((datasetService, index) => (
                  <div key={index}>
                    <Input
                      type="select"
                      name="datasetSel"
                      id="exampleSelect"
                      style={{ backgroundColor: "#171941" }}
                      onChange={(e) => handleOnChangeDataset(e, index)}
                      required
                    >
                      <option value="">--choose from here--</option>
                      <option value="diabetes">Diabetes</option>
                      <option value="heartStroke">Heart Stroke</option>
                      <option value="customDataset">Custom Dataset</option>
                    </Input>
                    {dataset[index].datasetSel === "customDataset" && (
                      <div>
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <h6>Upload Dataset (.csv format):</h6>
                          <Input
                            type="file"
                            name="datasetFile"
                            id="exampleFile"
                            onChange={(e) =>
                              handleOnChangeDatasetFile(e, index)
                            }
                            required
                          />
                        </div>
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <h6>Enter result column name:</h6>
                          <Input
                            type="text"
                            name="datasetOuputCol"
                            id="exampleText"
                            placeholder="Enter Output Column Name"
                            onChange={(e) =>
                              handleOnChangeDatasetOutput(e, index)
                            }
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {classifierList.map((singleService, index) => (
                  <div key={index}>
                    <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                      <h6>Choose a classifer:</h6>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        style={{ backgroundColor: "#171941" }}
                        onChange={(e) => handleClassifierList(e, index)}
                        required
                      >
                        <option value="">--choose from here--</option>
                        <option value="decisionTree">Decision Tree</option>
                        <option value="randomForest">Random Forest</option>
                        <option value="knn">KNN</option>
                        <option value="svm">SVM</option>
                        <option value="naiveBayes">Naive Bayes</option>
                        <option value="adaBoost">Adaboot</option>
                        <option value="logisticRegression">
                          Logistic Regression
                        </option>
                      </Input>
                      {
                        //when user select knn then show k value
                        classifierList[index].select === "knn" && (
                          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <h6>Enter K value:</h6>
                            <Input
                              type="number"
                              name="number"
                              id="exampleNumber"
                              placeholder="Enter K value"
                              required
                              onChange={(e) =>
                                handleClassifierListKVal(e, index)
                              }
                            />
                          </div>
                        )
                      }
                    </div>
                    {classifierList.length - 1 === index &&
                      classifierList.length < 7 && (
                        <Button
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setClassifierList([
                              ...classifierList,
                              { select: "", number: "-1" },
                            ]);
                          }}
                        >
                          Add another classifier
                        </Button>
                      )}
                    {classifierList.length - 1 === index &&
                      classifierList.length > 1 && (
                        <Button
                          color="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            setClassifierList(classifierList.slice(0, -1));
                          }}
                        >
                          Remove classifier
                        </Button>
                      )}
                  </div>
                ))}
                <br />
                <Button color="info" onClick={(e) => handleFinalList(e)}>
                  Submit
                </Button>
              </form>
              {result.length === 0 && (
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <br />
                  <h3>Result:</h3>
                  <div className="alert alert-danger" role="alert">
                    Please submit to see the result
                  </div>
                </div>
              )}
              {result.length > 0 && (
                <div>
                  <br />
                  <h3>Result:</h3>
                  <div className="alert alert-success" role="alert">
                    Best Classifier: {finalClassifier} <br />
                    Accuracy: {finalAcc} %
                    <br />
                  </div>
                  <h4>Dataset Selected: {resDataset}</h4>
                  <div className="table-responsive-md">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Classifier</th>
                          <th scope="col">Accuracy (%)</th>
                          <th scope="col">Precision</th>
                          <th scope="col">Recall</th>
                          <th scope="col">F1 Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resClassifier.map((singleService, index) => (
                          <tr key={index}>
                            <td>{resClassifier[index]}</td>
                            <td>{resAccuracy[index]}</td>
                            <td>{resPrecision[index]}</td>
                            <td>{resRecall[index]}</td>
                            <td>{resF1Score[index]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h4>Comaparative Analysis:</h4>
                  <h4>Accuracy:</h4>
                  <div className="table-responsive-md">
                    <br />
                    <div className="mixed-chart">
                      <Chart
                        options={optionsL}
                        series={seriesAcc}
                        type="bar"
                        width="600"
                      />
                    </div>
                  </div>
                  <h4>Precision:</h4>
                  <div className="table-responsive-md">
                    <br />
                    <div className="mixed-chart">
                      <Chart
                        options={optionsL}
                        series={seriesPre}
                        type="bar"
                        width="600"
                      />
                    </div>
                  </div>
                  <h4>Recall:</h4>
                  <div className="table-responsive-md">
                    <br />
                    <div className="mixed-chart">
                      <Chart
                        options={optionsL}
                        series={seriesRec}
                        type="bar"
                        width="600"
                      />
                    </div>
                  </div>
                  <h4>F1 Score:</h4>
                  <div className="table-responsive-md">
                    <br />
                    <div className="mixed-chart">
                      <Chart
                        options={optionsL}
                        series={seriesF1}
                        type="bar"
                        width="600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
