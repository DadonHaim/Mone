class Dom {
    element;
    ids;
    classNames;
    style;
    onClickHandlers;
    onInputHandlers;
    constructor(init) {
        if (init.query)
            this.element = document.querySelector(init.query);
        else
            this.element = document.createElement(init.tag || "div");
        this.ids = init.id || [];
        this.classNames = init.className || [];
        this.style = init.style || {};
    }
    updateStyle() {
        for (let key in this.style)
            this.element.style[key] = this.style[key];
    }
    updateAttributs() {
        this.element.id = this.ids.toString().replaceAll(",", " ");
        this.element.className = this.classNames.toString().replaceAll(",", " ");
    }
    UpdateDom() {
        this.updateStyle();
        this.updateAttributs();
    }
    AddOnClick(event) {
        this.onClickHandlers.push(event);
        this.element.addEventListener("click", event);
    }
    AddOnInput(event) {
        this.onInputHandlers.push(event);
        this.element.addEventListener("input", event);
    }
    SetStyle(style) {
        for (let key in style) {
            this.style[key] = style[key];
            this.element.style[key] = style[key];
        }
    }
    getIds() { return this.ids; }
    getClassNames() { return this.classNames; }
    removeClassName(className) {
        this.classNames.removeByValue(className);
        this.updateAttributs();
    }
    removeId(id) {
        this.ids.removeByValue(id);
        this.updateAttributs();
    }
    replaceId(old, id) {
        this.ids.replace(old, id);
        this.updateAttributs();
    }
    replaceClassName(old, className) {
        this.classNames.replace(old, className);
        this.updateAttributs();
    }
}
function getElementsByIds(...arr) {
    let ressult = [];
    arr.forEach(id => {
        ressult.push(document.getElementById(id));
    });
    return ressult;
}
function createElement(obj) {
    let elem = document.createElement(obj.tag || "div");
    elem.id = obj.id || "";
    elem.className = obj.className || "";
    elem.innerHTML = obj.html || "";
    if (obj.src)
        elem.src = obj.src;
    elem.onclick = (e) => {
        if (obj.tag == "button") {
            e.stopPropagation();
        }
        if (obj.onClick) {
            obj.onClick();
        }
    };
    if (obj.dad) {
        if (typeof obj.dad == "string")
            document.getElementById(obj.dad).appendChild(elem);
        else
            obj.dad.appendChild(elem);
    }
    if (obj.children) {
        obj.children.forEach(el => {
            if (el)
                elem.appendChild(el);
        });
    }
    return elem;
}
function getSelectedValue(elen) {
    return elen.value;
}
function setSelect(elen, value) {
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
function switchDisplay(elem, dis = "block") {
    if (typeof elem == "string")
        elem = document.getElementById(elem);
    if (elem.className.includes("none")) {
        elem.classList.remove("none");
        elem.classList.add(dis);
    }
    else if (elem.className.includes(dis)) {
        elem.classList.remove(dis);
        elem.classList.add("none");
    }
}
function noneDisplay(...ids) {
    ids.forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}
function blockDisplay(...ids) {
    ids.forEach(id => {
        document.getElementById(id).style.display = "block";
    });
}
function CreateElement(tag, id, className, dad) {
    let elem = document.createElement(tag);
    elem.id = id || "";
    elem.className = className || "";
    if (dad)
        dad.appendChild(elem);
    return elem;
}
function copyElement(elem, obj = {}) {
    const clone = elem.cloneNode(true);
    // set ID
    if (obj.id)
        clone.id = obj.id;
    if (obj.classNameAdd) {
        clone.classList.add(obj.classNameAdd);
    }
    // set onclick on wrapper (if needed)
    if (typeof obj.onclick === "function") {
        clone.onclick = obj.onclick;
    }
    // fill inner content based on class name
    const ignoredKeys = ["id", "onclick", "onclicks"];
    for (let key in obj) {
        if (ignoredKeys.includes(key))
            continue;
        if (key == "classNameAdd")
            continue;
        if (key == "dad")
            continue;
        const target = clone.querySelector("." + key);
        if (target)
            target.innerHTML = obj[key];
    }
    // set onclick handlers on inner elements
    if (obj.onclicks) {
        for (let key in obj.onclicks) {
            const target = clone.querySelector("." + key);
            if (target)
                target.onclick = (e) => { e.stopPropagation(); obj.onclicks[key](); };
        }
    }
    if (obj.dad)
        obj.dad.appendChild(clone);
    return clone;
}
