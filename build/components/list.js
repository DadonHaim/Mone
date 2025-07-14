function lensNew(arr) {
    let res = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].read == false && arr[i].unRead == "--")
            res++;
    }
    return res;
}
function list() {
    let List = document.getElementById("listPage");
    List.innerHTML = "";
    var status = createElement({
        id: `status`,
        className: `status`,
        html: "ss",
        dad: List,
    });
    for (let key in AllMonesObj) {
        if (key == "data")
            continue;
        let newsLen = lensNew(AllMonesObj[key]);
        let category = key;
        let data = AllMonesObj[key][0];
        let mones = AllMonesObj[key];
        var categoryElem = createElement({
            id: `categories-${category}`,
            className: `category ${newsLen < 1 ? "finish" : ""}`,
            html: `${category} <br>  ${data.numbers.toString().replaceAll(",", " , ")}`,
            dad: List,
            children: [
                createElement({ id: `categories-${category}-new`, className: "red", html: `${newsLen}` }),
                createElement({ tag: "button", className: `wazeCategory ${newsLen < 1 ? "none" : ""}`, html: `נווט`, onClick: () => {
                        wazeCategory(mones);
                    } })
            ],
            onClick: () => { switchDisplay(`items-${category}`); }
        });
        var item = createElement({
            id: `items-${category}`,
            className: `items none`,
            dad: List,
            children: mones.mapFrom(1, (mone) => {
                return createElement({
                    id: `mone-${mone.id}`,
                    className: `mone-item ${mone.read ? "read" : mone.unRead != "--" ? "unRead" : ""}`,
                    onClick: () => {
                        setActiveMone(mone);
                        setPage("mone");
                        console.log(`mone - ${mone.id} click`);
                    },
                    children: [
                        createElement({
                            className: "mone-item-col1",
                            children: [
                                createElement({
                                    className: "row",
                                    children: [
                                        createElement({ html: mone.number }),
                                        createElement({ className: "listName", html: mone.name }),
                                        createElement({ className: "listName", html: mone.location }),
                                    ]
                                }),
                                createElement({ className: "addressItem", html: mone.address || "--" }),
                                createElement({ className: "", html: `${mone.street || "--"} ${mone.streetNumber || "-"} ד-${mone.house || "-"} כ-${mone.entry || "-"} ק-${mone.floor || "-"}` }),
                            ]
                        }),
                        createElement({
                            className: "mone-item-col2",
                            children: [
                                createElement({ tag: "button", className: `${mone.phone1 ? "" : "disable"}`, html: "call", onClick: () => { call(mone); } }),
                                createElement({ tag: "button", className: `${mone.phone1 ? "" : "disable"}`, html: "msg", onClick: () => msg(mone) }),
                                createElement({ tag: "button", html: "waze", onClick: () => waze(mone) }),
                            ]
                        }),
                    ]
                });
            })
        });
    }
    function call(mone) {
        if (mone.phone1)
            window.location.href = `tel:${mone.phone1}`;
    }
    function msg(mone) {
        if (mone.phone1) {
            let message;
            const message1 = `שלום ${mone.name || ""},
אני חיים קורא מונים מטעם חברת החשמל.

אני צריך לצלם את המונה חשמל אצלך ב:
*עיר*: ${mone.city}
*רחוב*: ${mone.street} ${mone.streetNumber}
*מיקום המונה*: ${mone.location == "--" ? "בפנים" : mone.location}
*חמש ספרות אחרונות של המונה*: ${mone.number}

*אם הפרטים הרשומים אצלי שגויים אנא תקן אותי כאן בוואצאפ או צור איתי קשר טלפונית.*
ניתן לצלם ידנית את המונה ולשלוח כאן עד השעה 20:00 ובכך לחסוך לי הגעה :)

אם לא אצליח במהלך היום להגיע ואין באפשרותך לצלם, אוכל להדריך אותך כיצד לדווח עצמאית לחברת החשמל

בתודה,
חיים דדון.`;
            const message2 = `שלום ${mone.name || ""},
אני חיים קורא מונים מטעם חברת החשמל.

לאחר חיפושים באזור מגורך לא הצלחתי למצוא את המונה חשמל. 
יתכן שהפרטים אצלי שגויים או שהמונה בתוך הבית ואין לי גישה אליו.

על פי הנתונים הרשומים אצלי. המונה נמצא ב:
*עיר*: ${mone.city}
*רחוב*: ${mone.street} ${mone.streetNumber}
*מיקום המונה*: ${mone.location == "--" ? "בפנים" : mone.location}
*חמש ספרות אחרונות של המונה*: ${mone.number}

*אם הפרטים הרשומים אצלי שגויים אנא תקן אותי כאן בוואצאפ או צור איתי קשר טלפונית.*
ניתן לצלם ידנית את המונה ולשלוח כאן עד השעה 20:00 ובכך לחסוך לי הגעה :)

אם לא אצליח במהלך היום להגיע ואין באפשרותך לצלם, אוכל להדריך אותך כיצד לדווח עצמאית לחברת החשמל

בתודה,
חיים דדון.`;
            let confirm1 = window.confirm(`מצאתי או לא מצאתי`);
            let confirm2;
            if (confirm1)
                message = message1;
            else
                message = message2;
            confirm2 = window.confirm(message);
            if (confirm2)
                POST("/sendWhathapp", { phone: mone.phone1, moneId: mone.id, message }).then(() => {
                    Alert("ההודעה נשלחה בהצלחה", "green");
                }).catch(() => {
                    Alert("ההודעה נכשלה", "red");
                });
        }
    }
    function waze(mone) {
        const encodedAddress = encodeURIComponent(mone.city + " " + mone.street + " " + mone.streetNumber);
        const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(url, '_blank'); // פותח בלשונית חדשה
    }
}
function wazeCategory(arr) {
    let addresses = [];
    arr.forEach(mone => {
        if (!mone)
            return;
        if (!mone.city)
            return;
        if (!mone.street)
            return;
        if (!mone.streetNumber)
            return;
        addresses.push(`${mone.city}, ${mone.street} ${mone.streetNumber}`);
    });
    navigateToAddresses(addresses);
}
function navigateToAddresses(addresses) {
    if (!Array.isArray(addresses) || addresses.length === 0) {
        console.error("Address list is empty or invalid");
        return;
    }
    const destination = encodeURIComponent(addresses[addresses.length - 1]);
    const waypoints = addresses.slice(0, -1).map(encodeURIComponent).join('|');
    let url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    if (waypoints) {
        url += `&waypoints=${waypoints}`;
    }
    // This tells Google Maps to start navigation
    url += `&travelmode=driving`;
    window.open(url, '_blank');
}
