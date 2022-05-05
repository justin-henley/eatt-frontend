import Dish from './Dish';
import styled from 'styled-components';

const DishDisplay = ({ dishes }) => {
  return (
    <Display>
      {dishes?.map((dish) => (
        <Dish key={dish._id} item={dish} />
      ))}
    </Display>
  );
};

export default DishDisplay;

const Display = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  margin: 2em auto 2em auto;

  @media only screen and (min-width: 768px) {
    width: 100vw;
    max-width: 1200px;
  }
`;
