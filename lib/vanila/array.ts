interface Array<T> {
    for(from:number,call:IForCall): void;
    foreach(call:IForCall) :void;
    mapFrom(i:number,call:any) :any[];
    copy(from:number) :any[];
    removeByIndex(index:number) :any[];
    removeByValue(value:any) :any[];
    isFind(value:any) :boolean;
    replace(old:any,value:any) :boolean;
    pushOne(value:any) :boolean;
    pushOneCall(value:any,key,val) :boolean;
}


Array.prototype.for = function(from:number,call:IForCall){
    from = from<0 ? this.length-from : from; 
    for(let i=from; i<this.length;i++){
        call({index:i,value:this[i] , i,val:this[i],v:this[i]})
    }
}
Array.prototype.mapFrom = function(i:number,call:any){
    return this.map((v,index)=>{
        if(index < i) return;
        return call(v,index)
    })
}


Array.prototype.foreach = function(call:IForCall){
    for(let i=0; i<this.length;i++){
        call({index:i,value:this[i],i,val:this[i],v:this[i]})
    }
}

Array.prototype.copy = function(from:number=0){
    from = from<0 ? this.length-from : from; 
    let arr :any[]= []
    for(let i=from; i<this.length;i++)
        arr[i] = this[i]
    return arr
}

Array.prototype.removeByIndex = function(index:number){ 
    return this.filter((val,i)=>i!=index)
}
Array.prototype.removeByValue = function(value:any){
    return this.filter((val,i)=>val!=value)    
}

Array.prototype.replace = function(old:any,value:any){
    return this.map(val=> val===old?value:val);
}
Array.prototype.pushOne = function(value:any){
    for(let i=0; i<this.length;i++){
        if(this[i]==value){
            return false;
        }
    }
    this.push(value);
    return true;
}
Array.prototype.pushOneCall = function(value:any,key,val){
    for(let i=0; i<this.length;i++){
        if( value[key] == val )
            return false;
    }
    this.push(value);
    return true;
}


Array.prototype.isFind = function(value:any){
    for(let i=0;i<this.length;i++){
        if(this[i]==value)
            return true;
    }
    return false
}







type IForCall = (x:IFor)=>void 

interface IFor{
    value:any
    val:any
    v:any
    index:number
    i:number
}