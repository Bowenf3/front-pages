import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import NewsFeed from '../pages/news-feed/News-feed';

import {
  getStories,
  getBusiness,
  getSports,
  getScience,
  getHealth,
  getEntertainment,
  getTechnology,
  getWorld, } from '../../services/api';




function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box>
        <Typography>{children}</Typography>
      </Box>

    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function selectedProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  Tab: {
    fontSize: 13,
  },
  indicator: {
    backgroundColor: '#0195df',
  },
}));

export default function CategoryTabs (props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="UK" {...selectedProps(0)} className={classes.Tab} />
          <Tab label="World" {...selectedProps(1)} className={classes.Tab} />
          <Tab label="Business" {...selectedProps(2)} className={classes.Tab}/>
          <Tab label="Entertainment" {...selectedProps(3)} className={classes.Tab}/>
          <Tab label="Health" {...selectedProps(4)} className={classes.Tab}/>
          <Tab label="Sports" {...selectedProps(5)} className={classes.Tab}/>
          <Tab label="Tech" {...selectedProps(6)} className={classes.Tab}/>
          <Tab label="Science" {...selectedProps(7)} className={classes.Tab}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.stories} setStories={props.setStories} setStoryApi={getStories}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.world} setStories={props.setWorld} setStoryApi={getWorld}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.business} setStories={props.setBusiness} setStoryApi={getBusiness}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.entertainment} setStories={props.setEntertainment} setStoryApi={getEntertainment}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.health} setStories={props.setHealth} setStoryApi={getHealth}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.sports} setStories={props.setSports} setStoryApi={getSports}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.technology} setStories={props.setTechnology} setStoryApi={getTechnology}></NewsFeed>
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
          <NewsFeed setClickedStory={props.setClickedStory} stories={props.science} setStories={props.setScience} setStoryApi={getScience}></NewsFeed>
        </TabPanel>
      </SwipeableViews>

    </div>
  );
}

