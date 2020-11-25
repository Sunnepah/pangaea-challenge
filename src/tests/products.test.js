import TestRenderer, { create } from 'react-test-renderer';
import Products from '../components/products';
import Cart from '../components/cart';
import { GET_PRODUCTS } from '../queries';
import { MockedProvider } from '@apollo/client/testing';

const productsMock = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        currency: 'USD',
      },
    },
    result: {
      data: {
        products: [
          { id: '1', title: 'Seil', price: 700, image_url: '' },
          { id: '2', title: 'Cap', price: 700, image_url: '' },
        ],
      },
      refetch: () => {},
    },
  },
];

const { act } = TestRenderer;
let component;

test('renders product list Component', async () => {
  await act(async () => {
    component = create(
      <MockedProvider mocks={productsMock} addTypename={false}>
        <Products setDisplayCart={() => false} />
      </MockedProvider>
    );
    return new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders Cart with items when the Add to Cart button is clicked', async () => {
  const addToCartButton = component.root.findAllByType('button')[1];
  expect(addToCartButton.children).toContain('Add To Cart');

  await act(async () => {
    component.update(
      <MockedProvider addTypename={false}>
        <Cart currency={{ symbol: '$', code: 'USD' }} />
      </MockedProvider>
    );
    addToCartButton.props.onClick();
    return new Promise((resolve) => setTimeout(resolve, 0));
  });

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders content of the Cart component', async () => {
  const selectElement = component.root.findByType('select');
  const subTotalText = component.root.findAllByType('span');

  expect(selectElement.props.value).toContain('USD');
  expect(component.root.findAllByType('p')[0].children).toContain('YOUR CART');
  expect(subTotalText[2].children).toContain('Subtotal');
});
