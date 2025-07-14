Array.prototype.for = function (from, call) {
    from = from < 0 ? this.length - from : from;
    for (let i = from; i < this.length; i++) {
        call({ index: i, value: this[i], i, val: this[i], v: this[i] });
    }
};
Array.prototype.mapFrom = function (i, call) {
    return this.map((v, index) => {
        if (index < i)
            return;
        return call(v, index);
    });
};
Array.prototype.foreach = function (call) {
    for (let i = 0; i < this.length; i++) {
        call({ index: i, value: this[i], i, val: this[i], v: this[i] });
    }
};
Array.prototype.copy = function (from = 0) {
    from = from < 0 ? this.length - from : from;
    let arr = [];
    for (let i = from; i < this.length; i++)
        arr[i] = this[i];
    return arr;
};
Array.prototype.removeByIndex = function (index) {
    return this.filter((val, i) => i != index);
};
Array.prototype.removeByValue = function (value) {
    return this.filter((val, i) => val != value);
};
Array.prototype.replace = function (old, value) {
    return this.map(val => val === old ? value : val);
};
Array.prototype.pushOne = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return false;
        }
    }
    this.push(value);
    return true;
};
Array.prototype.pushOneCall = function (value, key, val) {
    for (let i = 0; i < this.length; i++) {
        if (value[key] == val)
            return false;
    }
    this.push(value);
    return true;
};
Array.prototype.isFind = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == value)
            return true;
    }
    return false;
};
