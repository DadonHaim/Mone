
type IEventFunction = (event : any) =>VoidFunction
class Dom{
    private element         :HTMLElement;
    private ids             :string[];
    private classNames      :string[];
    private style           :IStyle;

    private onClickHandlers :IEventFunction[];
    private onInputHandlers :IEventFunction[];

    constructor(init:IDomInit){
        if(init.query)
            this.element = document.querySelector(init.query);
        else
            this.element = document.createElement(init.tag||"div")
        this.ids        = init.id || [];
        this.classNames = init.className || [];
        this.style = init.style || {}
    }

    private updateStyle(){
        for(let key in this.style)
            this.element.style[key] = this.style[key];
    }
    private updateAttributs(){
        this.element.id = this.ids.toString().replaceAll(","," ");
        this.element.className = this.classNames.toString().replaceAll(","," ");
    }

    public UpdateDom(){
        this.updateStyle();
        this.updateAttributs();
    }

    public AddOnClick(event:IEventFunction){
        this.onClickHandlers.push(event);
        this.element.addEventListener("click",event);
    }
    public AddOnInput(event:IEventFunction){
        this.onInputHandlers.push(event);
        this.element.addEventListener("input",event);
    }

    public SetStyle(style:IStyle){
        for(let key in style){
            this.style[key] = style[key];
            this.element.style[key] = style[key];
        }
    }

    public getIds(){return this.ids;}
    public getClassNames(){return this.classNames;}
    public removeClassName(className:string){
        this.classNames.removeByValue(className);
        this.updateAttributs();
    }
    public removeId(id:string){
        this.ids.removeByValue(id);
        this.updateAttributs();
    }
    public replaceId(old:string , id:string){
        this.ids.replace(old,id);
        this.updateAttributs();
    }
    public replaceClassName(old:string , className:string){
        this.classNames.replace(old,className);
        this.updateAttributs();
    }


}

function getElementsByIds(...arr){
    let ressult = [];
    arr.forEach(id=>{
        ressult.push(
            document.getElementById(id)
        )
    })
    return ressult;
}


function createElement(obj){
    let elem = document.createElement(obj.tag ||"div")
    elem.id = obj.id ||""
    elem.className = obj.className ||""
    elem.innerHTML = obj.html ||""
    if(obj.src)
        elem.src = obj.src
    elem.onclick = (e:MouseEvent)=>{
        if(obj.tag=="button"){
            e.stopPropagation()
        }
        if(obj.onClick){
            obj.onClick()
        }
    } 
    if(obj.dad ){
        if(typeof obj.dad =="string") document.getElementById(obj.dad).appendChild(elem)
        else obj.dad.appendChild(elem)
    }
    
    if(obj.children){
        obj.children.forEach(el=>{
            if(el)
                elem.appendChild(el)
        })
    }

    return elem
}

function getSelectedValue(elen: HTMLSelectElement): string {
    return elen.value;
}
function setSelect(elen: HTMLSelectElement, value: string) {
    // Set the select's value to the specified option value
    elen.value = value;

    // Try to find the option with the matching value
    const option = Array.from(elen.options).find(opt => opt.value === value);
    
    if (option) {
        // Scroll the option into view (optional, mainly visual for some UIs)
        option.scrollIntoView({ block: "nearest" });
    }

    // Trigger change event in case listeners are attached
    const event = new Event('change', { bubbles: true });
    elen.dispatchEvent(event);
}

function switchDisplay(elem,dis="block"){ 
    if(typeof elem =="string") elem =document.getElementById(elem)
    if(elem.className.includes("none")){
        elem.classList.remove("none")
        elem.classList.add(dis) 
    }
    else if(elem.className.includes(dis)){
        elem.classList.remove(dis)
        elem.classList.add("none")
    }
}

function noneDisplay(...ids){
    ids.forEach(id=>{
        document.getElementById(id).style.display = "none"     
    })
}
function blockDisplay(...ids){
    ids.forEach(id=>{
        document.getElementById(id).style.display = "block"     
    })
}


function CreateElement<T=HTMLDivElement>(tag:string , id?:string, className?:string ,dad?:HTMLElement):T{
    let elem = document.createElement(tag) as HTMLElement;
    elem.id = id ||""
    elem.className = className ||""
    if(dad)
        dad.appendChild(elem);
    return elem  as T
}




function copyElement<T = HTMLDivElement>(
    elem: HTMLElement,
    obj: any = {},
): HTMLDivElement {
    const clone = elem.cloneNode(true) as HTMLDivElement;

    // set ID
    if (obj.id) clone.id = obj.id;
    if(obj.classNameAdd) {
        clone.classList.add(obj.classNameAdd)
    }
    // set onclick on wrapper (if needed)
    if (typeof obj.onclick === "function") {
        clone.onclick = obj.onclick;
    }

    // fill inner content based on class name
    const ignoredKeys = ["id", "onclick", "onclicks"];

    for (let key in obj) {
        if (ignoredKeys.includes(key)) continue;
        if(key=="classNameAdd") continue;
        if(key=="dad") continue;

        const target = clone.querySelector("." + key);
        if (target) target.innerHTML = obj[key];
    }

    // set onclick handlers on inner elements
    if (obj.onclicks) {
        for (let key in obj.onclicks) {
            const target = clone.querySelector("." + key) as HTMLElement;
            if (target) target.onclick = (e)=> {e.stopPropagation() ;obj.onclicks[key]() };
        }
    }

    if (obj.dad) obj.dad.appendChild(clone);

    return clone;
}
