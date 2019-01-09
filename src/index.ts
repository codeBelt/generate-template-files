import {Counter} from './counter/counter';
import {someHelpfulUtilFunction} from './util';


export interface Props {
    x: number;
    y: number;
}

export class Value {
    private value = 10;
    private props: Props = {x: 0, y: 0};

    getValue(): number {
        return this.value;
    }

    setValue(value: number): void {
        this.value = value;
    }

    setProps(props: Props) {
        this.props = props;
    }

    getProps(): Props {
        return someHelpfulUtilFunction(this.props);
    }
}

new Value().setValue(1000);
new Value().setProps({x: 1000, y: 1000});

const counter = new Counter();
counter.add();
counter.add();
counter.add();

counter.getValue();

counter.subtract();
counter.subtract();
counter.getValue();
