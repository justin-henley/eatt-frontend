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
  let meatIcon, categoryIcon;

  // Choose the meat icon
  switch (item.meat) {
    case 'beef':
      meatIcon = <BeefIcon />;
      break;
    case 'pork':
      meatIcon = <PorkIcon />;
      break;
    case 'bird':
      meatIcon = <BirdIcon />;
      break;
    case 'fish':
      meatIcon = <FishIcon />;
      break;
    case 'veg':
      meatIcon = <VegIcon />;
      break;
    case 'other':
      categoryIcon = <OtherIcon />;
      break;
    case 'unknown':
      categoryIcon = <UnknownIcon />;
      break;
    default:
  }

  // Choose the category icon
  switch (item.category) {
    case 'Rice':
      categoryIcon = <RiceIcon />;
      break;
    case 'Noodle':
      categoryIcon = <NoodleIcon />;
      break;
    case 'Bread':
      categoryIcon = <BreadIcon />;
      break;
    case 'Soup':
      categoryIcon = <SoupIcon />;
      break;
    case 'Drink':
      categoryIcon = <DrinkIcon />;
      break;
    case 'Other':
      categoryIcon = <OtherIcon />;
      break;
    case 'Unknown':
      categoryIcon = <UnknownIcon />;
      break;
    default:
  }

  return (
    <Tile>
      <h1>{item.zhtw}</h1>
      <h3>{item.pinyin}</h3>
      <p>{item.en}</p>

      {meatIcon}
      {categoryIcon}
    </Tile>
  );
};

export default Dish;

// Dish tile style
const Tile = styled.div`
  width: 300px;
  border: 1px solid gray;
`;

// Styling for Meat and Category Icons
const iconStyle = `
margin: 5px;
font-size: 2em;
color: gray;
`;
// Icons
const BeefIcon = styled(SiHappycow)`
  ${iconStyle}
`;
const PorkIcon = styled(GiPig)`
  ${iconStyle}
`;
const BirdIcon = styled(GiChicken)`
  ${iconStyle}
`;
const FishIcon = styled(FaFish)`
  ${iconStyle}
`;
const VegIcon = styled(GiBroccoli)`
  ${iconStyle}
`;
const RiceIcon = styled(GiBowlOfRice)`
  ${iconStyle}
`;
const SoupIcon = styled(GiBubblingBowl)`
  ${iconStyle}
`;
const NoodleIcon = styled(GiNoodles)`
  ${iconStyle}
`;
const BreadIcon = styled(FaBreadSlice)`
  ${iconStyle}
`;
const UnknownIcon = styled(FaQuestionCircle)`
  ${iconStyle}
`;
const OtherIcon = styled(FaQuestionCircle)`
  ${iconStyle}
`;
const DrinkIcon = styled(GiCoffeeCup)`
  ${iconStyle}
`;
