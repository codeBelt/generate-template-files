import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import __name__ from './__name__';

describe('__name__', () => {

    describe('render component', () => {
        it('renders default state', () => {
            const component = renderer
                .create(
                    <__name__ />,
                )
                .toJSON();

            expect(component).toMatchSnapshot();
        });
    });

});
