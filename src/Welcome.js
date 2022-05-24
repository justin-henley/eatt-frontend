import Dish from './Dish';
// import styled from 'styled-components';

const Welcome = () => {
  // A demo dish to label the parts for new users
  const demoDish = {
    meat: 'unknown',
    category: 'unknown',
    zhtw: 'Chinese',
    pinyin: 'Hanyu Pinyin',
    en: 'English translation',
  };

  // The welcome page
  return (
    <div>
      <h1>Welcome to the Menu Translation website!</h1>
      <p>
        This website is the interactive front-end for the Menu Translation
        database, a repository of Taiwanese dishes with their English names.
      </p>

      <Dish item={demoDish} />
    </div>
  );
};

export default Welcome;
