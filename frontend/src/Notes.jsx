import React,{useState} from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Button, Container } from "reactstrap";
import {Input} from "reactstrap";
import { FaLinkedin,FaInstagram,FaGithub } from "react-icons/fa";

export default function Notes() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);


  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
        <div className="main" style={{  display: 'block',paddingTop:'70px' ,marginLeft: 'auto',  marginRight: 'auto',  width: '80%', minHeight:'90vh'}}>
            
            <div className="section section-basic">
                <Container>
                    <h2 className="title">Notes</h2>
                    <div className="table-responsive-md">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Classifier</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Code Snippet</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Naive Bayes</td>
                                    <td>Naive Bayes is a simple probabilistic classifier based on applying Bayes’ theorem with strong (naive) independence assumptions between the features. A Naive Bayes classifier assumes that the presence of a particular feature in a class is unrelated to the presence of any other feature.</td>
                                    <td><a target="_blank" href="https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Decision Tree</td>
                                    <td>Decision trees are a non-parametric supervised learning method used for classification and regression. The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.</td>
                                    <td><a target="_blank" href="https://www.datacamp.com/tutorial/decision-tree-classification-python">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Random Forest</td>
                                    <td>Random Forest is a supervised learning algorithm. It can be used both for classification and regression problems. However, it is mostly used for classification problems in the industry. Random Forest algorithm creates decision trees on randomly selected data samples, gets prediction from each tree and selects the best solution by means of voting.</td>
                                    <td><a target="_blank" href="https://www.datacamp.com/tutorial/random-forests-classifier-python">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Support Vector Machine</td>
                                    <td>Support Vector Machine (SVM) is a supervised machine learning algorithm which can be used for both classification or regression challenges. However,  it is mostly used in classification problems. In this algorithm, we plot each data item as a point in n-dimensional space (where n is number of features you have) with the value of each feature being the value of a particular coordinate.</td>
                                    <td><a target="_blank" href="https://www.datacamp.com/tutorial/svm-classification-scikit-learn-python">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Kth Neighbour Classifier</td>
                                    <td>KNN is a non-parametric method used for classification and regression. A sample is classified by a majority vote of its neighbors, with the sample being assigned to the class most common
among its k nearest neighbors (k is a positive integer, typically small). If k = 1, then the object is simply assigned to the class of that single nearest neighbor.</td>
                                    <td><a target="_blank" href="https://realpython.com/knn-python/">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Adaboost</td>
                                    <td>AdaBoost is a machine learning meta-algorithm formulated by Yoav Freund and Robert Schapire. It is a boosting algorithm that can be used to convert a set of weak learners into a strong learner. The output of the weak learner acts as the input for the strong learner.</td>
                                    <td><a target="_blank" href="https://www.datacamp.com/tutorial/adaboost-classifier-python">Click Here</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Logistic Regression</td>
                                    <td>Logistic regression is a statistical model that in its basic form uses a logistic function to model a binary dependent variable, although many more complex extensions exist. In regression analysis, logistic regression (or logit regression) is estimating the parameters of a logistic model (a form of binary regression).</td>
                                    <td><a target="_blank" href="https://www.datacamp.com/community/tutorials/understanding-logistic-regression-python">Click Here</a></td> 
                                </tr>
                                
                                </tbody>
                        </table>
                    </div>
                    
                </Container>
            </div>
        </div>
        <Footer />
      </div>
      </>
  );
}
