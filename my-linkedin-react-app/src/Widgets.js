import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className='widgets'>
      <div className='widgets__header'>
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Terry Crews was named King of the world'," 'Way too expensive, I don't want it', he said.")}
      {newsArticle('JavaScript sucks!', 'Said the python programmer')}
      {newsArticle('40% of the world population now uses cryptocurrency', "And dollar's value keep going down!")}
      {newsArticle('Gil was hired as a Blockchain Developer', 'Everyone wants to hire him!')}
      {newsArticle('BKAI is worth 10 dollars each!', 'Every BKAI owner is now cellebrating')}
    </div>
  )
}

export default Widgets