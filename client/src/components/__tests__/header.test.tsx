import React from 'react';
import { Provider } from 'react-redux';
import { Header } from '..';
import { store } from '../../stateManagement/store';

import { render, cleanup } from '../../test-utils';
import PageContainer from '../page-container';

describe('Header', () => {
    // automatically unmount and cleanup DOM after the test is finished.
    afterEach(cleanup);

    it('renders without error', () => {
        render(<Provider store={store}>
            <Header />
        </Provider>);
    });
});
