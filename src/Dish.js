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
  meatIcon =
    item.meat === 'beef' ? (
      <BeefIcon />
    ) : item.meat === 'pork' ? (
      <PorkIcon />
    ) : item.meat === 'bird' ? (
      <BirdIcon />
    ) : item.meat === 'fish' ? (
      <FishIcon />
    ) : item.meat === 'veg' ? (
      <VegIcon />
    ) : item.meat === 'other' ? (
      <OtherIcon />
    ) : item.meat === 'unknown' ? (
      <UnknownIcon />
    ) : null;

  // Choose the category icon
  categoryIcon =
    item.category === 'rice' ? (
      <RiceIcon />
    ) : item.category === 'noodle' ? (
      <NoodleIcon />
    ) : item.category === 'bread' ? (
      <BreadIcon />
    ) : item.category === 'soup' ? (
      <SoupIcon />
    ) : item.category === 'drink' ? (
      <DrinkIcon />
    ) : item.category === 'other' ? (
      <OtherIcon />
    ) : item.category === 'unknown' ? (
      <UnknownIcon />
    ) : null;

  return (
    <Tile>
      <h1>{item.zhtw}</h1>
      <h3>{item.pinyin}</h3>
      <p>{item.en}</p>
      <div>
        {meatIcon}
        {categoryIcon}
      </div>
    </Tile>
  );
};

export default Dish;

// Dish tile style
const Tile = styled.div`
  width: 50%;
  max-width: 200px;
  padding: 1em;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
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
