import React,{useState, useEffect} from 'react';
// import React from 'react';
import './Analytics.css';

// import GraphSlider from './GraphSlider';
// import Linechart from './graphs/Linechart';
// import Bar from '../analytics/graphs/Bar';
import Loader from '../../helpers/loader/Loader';
import Doughnut from '../analytics/graphs/Doughnut';
import Radar from '../analytics/graphs/Radar';
import Polar from '../analytics/graphs/Polararea';

function Analytics (props) {

  console.log(props);

  const [userData, setUserdata] = useState([]);
  const [stanceData, setStanceData] = useState({});
  const [publisherData, setPublisherData] = useState([]);
  const [interestData, setInterestData] = useState({});
  const [mostInterestData, setMostInterestData] = useState([]);

  const getDataset =  () => {
    let dataset = [];

    for (let i = 0; i < props.loginUser.article.length; i++) {
      let datapair = {};
      datapair.stance = props.loginUser.article[i].stance;
      datapair.source = props.loginUser.article[i].source;
      dataset.push(datapair);
    }

    return dataset;
  };

  const getStanceDictionary = (userdataset) => {
    let userstanceData = {};

    for (let i = 0; i < userdataset.length; i++) {
      if (userdataset[i].stance === 10) {
        let stance = 'Right';
        userstanceData[stance] = userstanceData[stance] ? userstanceData[stance] + 1: 1;
      } else if (userdataset[i].stance === 1) {
        let stance = 'Left';
        userstanceData[stance] = userstanceData[stance] ? userstanceData[stance] + 1: 1;
      } else if (userdataset[i].stance === 5) {
        let stance = 'Middle';
        userstanceData[stance] = userstanceData[stance] ? userstanceData[stance] + 1: 1;
      } else if (userdataset[i].stance === 11) {
        let stance = 'Not defined';
        userstanceData[stance] = userstanceData[stance] ? userstanceData[stance] + 1: 1;
      }
    }

    return userstanceData;
  };

  const calcStance = (userdataset) => {
    const userStanceDictonary = getStanceDictionary(userdataset);
    
    const rightArticle = userStanceDictonary.Right;
    const leftArticle = userStanceDictonary.Left;

    const rightstance =( rightArticle / (rightArticle + leftArticle));
    const leftstance = (leftArticle / (rightArticle + leftArticle));

    let userstanceAttributes = {};
    let userstance = '';
    if (rightstance > 0.5) {
      userstance = 'slightly centre-right';
    } else if (rightstance > 0.8) {
      userstance = 'centre-right';
    } else if (leftstance > 0.5) {
      userstance = 'slightly centre-left';
    } else if (leftstance > 0.8) {
      userstance = 'centre-left';
    } else {
      userstance = 'middle';
    }

    userstanceAttributes.opacity = Math.max(leftstance, rightstance);
    userstanceAttributes.userstance = userstance;
    return userstanceAttributes;
  };


  const defineBackground = () => {
    const userAttributes = {};
    userAttributes.userstance = stanceData.userstance;
    userAttributes.opacity = stanceData.opacity;

    let style = {};

    switch (userAttributes.userstance) {
    case 'slightly centre-right':
      style = {backgroundColor: `rgb(168, 226, 255, ${userAttributes.opacity})`};
      return style;
    case 'centre-right':
      style = {backgroundColor: `rgb(1, 149, 223, ${userAttributes.opacity})`};
      return style;
    case 'slightly centre-left':
      style = {backgroundColor: `rgb(250, 174, 173, ${userAttributes.opacity})`};
      return style;
    case 'centre-left':
      style = {backgroundColor: `rgb(225, 31, 28 ${userAttributes.opacity})`};
      return style;
    default:  
      style = {backgroundColor: 'rgb(238, 238, 238)'};
      return style;
    }      
  };
  
  const backgroundAttribute = defineBackground();

  const publisherDictionary = (userdataset) => {
    let dataset = [];
    for (let i = 0; i < userdataset.length; i++) {
      let datapair = {};
      datapair.stance = userdataset[i].stance;
      datapair.source = userdataset[i].source;
      dataset.push(datapair);
    }
  
    let labeldata = {};
  
    for (let i = 0; i < dataset.length; i++) {
      const source = dataset[i].source;
    
      if (source in labeldata) {
        labeldata[source] += 1;
      } else {
        labeldata[source] = 1;
      }
    }
    return labeldata;
  };

  const getInterestDictionary = (userdataset) => {
   
    const interestsData = {};

    for (let i = 0; i < userdataset.length; i++) {
      if (userdataset[i].category === 'businesses') {
        let categoryName = 'businesses';
        interestsData[categoryName] = interestsData[categoryName]? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'entertainments') {
        let categoryName = 'entertainments';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'health') {
        let categoryName = 'health';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'sciences') {
        let categoryName = 'sciences';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'sports') {
        let categoryName = 'sports'; 
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'technologies') {
        let categoryName = 'technologies';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'worlds') {
        let categoryName = 'worlds';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      } else if (userdataset[i].category === 'uk') {
        let categoryName = 'headline';
        interestsData[categoryName] = interestsData[categoryName] ? interestsData[categoryName] + 1: 1;
      }
    }
    
    return interestsData;
  };

  useEffect(() => {
    const userdataset = getDataset();
    setUserdata(userdataset);

    if (userdataset.length > 30) {
      setStanceData(calcStance(userdataset));
    }

    const interests = getInterestDictionary(props.loginUser.article);
    console.log(interests);

    let sortedInterestItems = Object.keys(interests).map(function (key) {
      return [key, interests[key]];
    });
    
    sortedInterestItems.sort(function (first, second) {
      return second[1] - first[1];
    });
  
    setInterestData(interests);
    setMostInterestData(sortedInterestItems);
    
    
    const publishers = publisherDictionary(userdataset);
    // console.log(publishers);
    let items = Object.keys(publishers).map(function (key) {
      return [key, publishers[key]];
    });
    
    items.sort(function (first, second) {
      return second[1] - first[1];
    });
    setPublisherData(items.slice(0,10));
  }, []);
  
  console.log(mostInterestData);


  return props ? 
    <div className='totalsummary-wrapper'  style={backgroundAttribute}>
      <h1>Summary</h1>
      <h2>You have read a total of {userData.length} articles so far</h2>
      <div className='polarchart-container'>
        <Polar loginUser={props.loginUser} userData={userData} setUserdata={setUserdata}/>
        <h3>Your reading habits are {stanceData.userstance}</h3>
      </div>
      <div className='radarchart-container'>
        <Radar loginUser={props.loginUser} interestData={interestData} setInterestData={setInterestData}/>
        <h3>Your main interest is { mostInterestData.length ===0 ? null : mostInterestData[0][0]} </h3>
      </div>
      <div className='doughnutchart-container'>
        <Doughnut loginUser={props.loginUser} publisherData={publisherData} setPublisherData={setPublisherData}/>
        <h3>Your favourite publisher is {publisherData.length === 0 ? null : publisherData[0][0]}</h3>
      </div>
    </div>
    : <Loader/>;
}

export default Analytics;
