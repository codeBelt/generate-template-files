import styles from './__name__.module.scss';

import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';

interface IState {}
interface IProps {}
interface IStateToProps {}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({});

class __name__ extends React.Component<IProps & IStateToProps & DispatchProp<IAction<any>>, IState> {

    public render(): JSX.Element {
        return (
            <div>
                __name__(sentenceCase)
            </div>
        );
    }

}

export default connect(mapStateToProps)(__name__);
