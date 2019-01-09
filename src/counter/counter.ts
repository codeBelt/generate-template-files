export class Counter {
    private value = 0;

    getValue() {
        return this.value;
    }

    add() {
        this.value = this.value + 1;
    }

    subtract() {
        this.value = this.value - 1;
    }
}

