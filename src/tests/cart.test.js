import TestRenderer, { create } from 'react-test-renderer';
import Cart from '../components/cart';
import { GET_ALL_CURRENCY } from '../queries';
import { MockedProvider } from '@apollo/client/testing';

const currrencyMock = [
  {
    request: {
      query: GET_ALL_CURRENCY,
    },
    result: {
      data: {
        currency: ['USD', 'NGN', 'EUR'],
      },
    },
  },
];

const { act } = TestRenderer;

test('renders the cart component with currency options', async () => {
  let cartComponent;

  await act(async () => {
    cartComponent = create(
      <MockedProvider mocks={currrencyMock} addTypename={false}>
        <Cart currency={{ symbol: '$', code: 'USD' }} />
      </MockedProvider>
    );
    return new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(cartComponent.toJSON()).toMatchSnapshot();
});
