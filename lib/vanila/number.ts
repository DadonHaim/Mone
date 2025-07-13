interface Number {
    for( call:(x:IForCallNumber)=>void ): void;
    isOdd():boolean;
    isEven():boolean;
    isNegative():boolean;

}


Number.prototype.for = function(call:(x:IForCallNumber)=>void ){
    let number = Number(this)
    for(let i=0; i< number ;i++){
        call({
            value :i,
            val   :i,
            v     :i,
            n     :i,
            num   :i,
            number:i
        })
    }
}

Number.prototype.isOdd = function(){return this%2==1}
Number.prototype.isEven = function(){return this%2==0}
Number.prototype.isNegative = function(){return this<0}



interface IForCallNumber{
    value :number;
    val   :number;
    v     :number;
    n     :number;
    num   :number;
    number:number;
}

