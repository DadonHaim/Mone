interface Boolean {
    then(call:(x?:any)=>any):_Bool
}


class _Bool{
    private bool :boolean
    private _ret : any;
    constructor(bool:boolean,call:(x?:any)=>any){
        this.bool = bool
        if(this.bool)
            this._ret = call(true)
    }

    else(call:(x?:any)=>any){
        if(!this.bool)
            this._ret = call(false)
        return this
    }
    ret(){
        return this.ret;
    }
}


Boolean.prototype.then = function(call:(x?:any)=>any){
    return new _Bool(this,call)
}


