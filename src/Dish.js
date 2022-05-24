import styled from 'styled-components';
import { SiHappycow } from 'react-icons/si';
import {
  GiPig,
  GiChicken,
  GiBroccoli,
  GiCoffeeCup,
  GiBowlOfRice,
  GiBubblingBowl,
  GiNoodles,
} from 'react-icons/gi';
import { FaFish, FaBreadSlice, FaQuestionCircle } from 'react-icons/fa';

const Dish = ({ item }) => {
  // Lists of meat and category icons
  const icons = {
    meat: {
      beef: <SiHappycow />,
      pork: <GiPig />,
      bird: <GiChicken />,
      fish: <FaFish />,
      veg: <GiBroccoli />,
      other: <FaQuestionCircle />,
      unknown: <FaQuestionCircle />,
    },
    category: {
      rice: <GiBowlOfRice />,
      noodle: <GiNoodles />,
      bread: <FaBreadSlice />,
      soup: <GiBubblingBowl />,
      drink: <GiCoffeeCup />,
      other: <FaQuestionCircle />,
      unknown: <FaQuestionCircle />,
    },
  };

  // Select the meat and category icons for this dish
  const meatIcon = icons.meat[item.meat];
  const categoryIcon = icons.category[item.category];

  return (
    <Tile>
      <Icons>
        {meatIcon}
        {categoryIcon}
      </Icons>
      <Text>
        <Chinese>{item.zhtw}</Chinese>
        <Translation>
          <Pinyin>{item.pinyin}</Pinyin>
          <English>{item.en}</English>
        </Translation>
      </Text>
    </Tile>
  );
};

export default Dish;

// Dish tile style BOXY
/* const Tile = styled.div`
  width: 50%;
  max-width: 200px;
  padding: 1em;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
`; */
// WIDE
const Tile = styled.div`
  width: 100%;
  height: 4em;
  //max-width: 400px;
  //padding: 1em;
  margin: 0.1em;
  border: 1px solid gray;
  display: flex;
  flex-direction: row;
  //align-items: center;
  //justify-content: space-between
`;

const Text = styled.div`
  //background-color: gray;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Chinese = styled.h1`
  //color: red;
  font-size: 2.5em;
  text-align: end;
  width: 50%;
  padding-right: 0.1em;
  //border: 1px solid blue;
  &:hover {
    color: red;
  }
`;

const Translation = styled.div`
  width: 50%;
  //border: 1px solid red;
  padding-left: 0.1em;
`;

const Pinyin = styled.h2`
  //color: blue;
  font-size: 1.5em;
`;

const English = styled.h3`
  //color: green;
  font-size: 0.75em;
`;

const Icons = styled.div`
  background-color: darkgrey;
  height: 100%;
  width: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // Selects the children, which should only be icons
  & > * {
    color: gray;
    font-size: 2em;
  }
`;
