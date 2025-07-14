Number.prototype.for = function (call) {
    let number = Number(this);
    for (let i = 0; i < number; i++) {
        call({
            value: i,
            val: i,
            v: i,
            n: i,
            num: i,
            number: i
        });
    }
};
Number.prototype.isOdd = function () { return this % 2 == 1; };
Number.prototype.isEven = function () { return this % 2 == 0; };
Number.prototype.isNegative = function () { return this < 0; };
