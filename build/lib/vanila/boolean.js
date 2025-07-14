class _Bool {
    bool;
    _ret;
    constructor(bool, call) {
        this.bool = bool;
        if (this.bool)
            this._ret = call(true);
    }
    else(call) {
        if (!this.bool)
            this._ret = call(false);
        return this;
    }
    ret() {
        return this.ret;
    }
}
Boolean.prototype.then = function (call) {
    return new _Bool(this, call);
};
