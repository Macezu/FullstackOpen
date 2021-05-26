import React from 'react';
import Header from "./components/header"
import Content from "./components/content"
import Footer from "./components/footer"

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Footer courseParts= {courseParts}/>
    </div>
  );
};

export default App;