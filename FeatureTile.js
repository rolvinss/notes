import React from 'react';
import { render, screen, fireEvent, queryByAttribute, waitFor } from '@testing-library/react';
import '@babel/polyfill';
import { Provider } from 'react-redux';
import { store } from '../../../../configureStore';
import PaymentType from '../../../../components/Web/PaymentInfoRedesign/FuncComp/paymentTypes';
import {
  paymentTypeProps,
} from './paymentTypesTestData';
import { Constants } from './constants';

describe('Check for paymentInfo', () => {
  test('render Page component without crashing', async () => {
    const dom = render(
      <Provider store={store}>
        <PaymentType {...paymentTypeProps} />
      </Provider>,
    );

    const creditCard1111 = screen.getByLabelText('Credit card ending in 1111 not selected');
    fireEvent.click(creditCard1111);

    const getById = queryByAttribute.bind(null, 'id');
    const cvvText = await waitFor(() => getById(dom.container, 'cvv'));

    console.log(cvvText); // Add this line to see what cvvText is

    fireEvent.change(cvvText, { target: { value: '1' } });
    fireEvent.change(cvvText, { target: { value: '12' } });
    fireEvent.change(cvvText, { target: { value: '123' } });
    fireEvent.click(cvvText);

    const nextButton = screen.getByRole('button', { name: 'Button' });
    fireEvent.click(nextButton);
  });
});

