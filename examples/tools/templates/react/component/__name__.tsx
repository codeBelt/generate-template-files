import styles from './__name__.module.scss';

import * as React from 'react';

interface IProps {}
interface IState {}

export default class __name__ extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {};

    public state: IState = {};

    public render(): JSX.Element {
        return (
            <div className={styles.wrapper}>
                __name__(sentenceCase)
            </div>
        );
    }

}
