let gateSnap = true;
setInterval(() => {
    if (gateSnap == false) {
        gateSnap = true;
    }
}, 1000);
function mone() {
    let monePage = document.getElementById("monePage");
    monePage.innerHTML = `
        <div id="menuImage" >
                <video id="camera" autoplay playsinline></video>
                <canvas id="photo" style="display: none;"></canvas>
                <div id="albom"> </div>
        </div>
        <div id="menuSubmit">
            <button id="submit2">שלח</button>
            <button id="update2">עדכן</button>
        </div>
        <div id="mone-form">
            <div id="row">
                <span class="w60p" id="mone-id"></span>
                <input type="text" class="w30" id="mone-gashash" readonly/>
                <select id="unReadSelect" class="w30p">
                    <option value="--">--</option>
                    <option value="מקום סגור ">מקום סגור </option>
                    <option value="מונה הוסר">מונה הוסר</option>
                    <option value="אין מפתח לארון">אין מפתח לארון</option>
                    <option value="לא נמצא">לא נמצא</option>
                    <option value="אין מענה">אין מענה</option>
                    <option value="אין מענה ונשלח הודעה">אין מענה ונשלח הודעה</option>
                    <option value="התנגדות">התנגדות</option>
                    <option value="יש כלב שמפריע">יש כלב שמפריע</option>
                    <option value="דיווח עצמאי">דיווח עצמאי</option>
                    <option value="פירוט בהודעות">פירוט בהודעות</option>
                </select>
            <div>
            <div class="label">שם לקוח וטלפון</div>
            <div class="row gap2">
                <input type="text" id="mone-name"   class="w40p" placeholder="שם הלקוח"/>
                <input type="number" id="mone-phone1" class="w24p center" placeholder="טלפון 1"/>
                <input type="number" id="mone-phone2" class="w24p center" placeholder="טלפון 2"/>
            </div>
            <div class="margin10"></div>
            <label  class="label">כתובת מלאה</label>
            <input type="text" class="w60p" id="mone-address" readonly placeholder="כתובת מלאה"/>
            <div class="margin10"></div>
            <div>
                  <input type="text"   class="w35p" id="mone-street" placeholder="רחוב"/>
                  <input type="number" class="w25" id="mone-streetNumber" placeholder="מס"/>
                כ-<input type="number" class="w25" id="mone-entry" placeholder=""/>
                ק-<input type="number" class="w25" id="mone-floor" placeholder=""/>
                ד-<input type="number" class="w25" id="mone-house" placeholder=""/>
            </div>
            <div class="margin10"></div>
            <div>
                <label class="label">סוג בית</label>
                <select id="typeHouse">
                    <option value="--">--</option>
                    <option value="בניין">בניין</option>
                    <option value="פרטי">פרטי</option>
                    <option value="רחוב">רחוב</option>
                </select>
                <label class="label">מיקום:</label>
                <select id="locationSelect">
                    <option value="--">--</option>
                    <option value="לא ידוע">לא ידוע</option>
                    <option value="בפנים">בפנים</option>
                    <option value="בחוץ">בחוץ</option>
                    <option value="בתוך הבית">בתוך הבית</option>
                    <option value="ליד הדלת">ליד הדלת</option>
                    <option value="ארון רחוב">ארון רחוב</option>
                    <option value="מאחורי הבית">מאחורי הבית</option>
                    <option value="בצד הבית">בצד הבית</option>
                    <option value="בחצר">בחצר</option>
                    <option value="בחנייה">בחנייה</option>
                    <option value="דלת מיוחדת">דלת מיוחדת</option>
                    <option value="רחוק">רחוק</option>
                    <option value="בבית אחר">בבית אחר</option>
                    <option value="פירוט בהודעה">פירוט בהודעה</option>
                </select>
            </div>

            <div class="margin10"></div>
            <textarea id="mone-message"></textarea>

            <div class="row">
                <button id="submit">שלח</button>
                <button id="snap">צלם</button>
                <button id="snap2">צלם</button>
                <button id="update">עדכן</button>
                <button id="cancelRead">בטל קריאה</button>
            </div>
        </div>
    `;
    async function render() {
        let _activeMone = await GET("/getMone/" + activeMone.id);
        const [albom, unReadSelect, update, update2, submit2, cancelRead] = getElementsByIds("albom", "unReadSelect", "update", "update2", "submit2", "cancelRead");
        const [moneId, moneGashash, moneName, phone1, phone2, address, street, streetNumber, entry, floor, house,] = getElementsByIds("mone-id", "mone-gashash", "mone-name", "mone-phone1", "mone-phone2", "mone-address", "mone-street", "mone-streetNumber", "mone-entry", "mone-floor", "mone-house");
        const [typeHouse, locationSelect, message, submit] = getElementsByIds("typeHouse", "locationSelect", "mone-message", "submit");
        albom.innerHTML = "";
        moneId.innerHTML = `${_activeMone.id.substring(0, _activeMone.id.length - 5)}<span class="numberMone">${_activeMone.number}<span>`;
        moneGashash.value = _activeMone.gashash == "גשש" ? "גשש" : "רגיל";
        moneName.value = _activeMone.name;
        phone1.value = _activeMone.phone1;
        phone2.value = _activeMone.phone2;
        address.value = _activeMone.address;
        street.value = _activeMone.street;
        streetNumber.value = _activeMone.streetNumber;
        entry.value = _activeMone.entry;
        floor.value = _activeMone.floor;
        house.value = _activeMone.house;
        street.value = _activeMone.street;
        message.value = _activeMone.message;
        setSelect(typeHouse, _activeMone.type);
        setSelect(unReadSelect, _activeMone.unRead);
        setSelect(locationSelect, _activeMone.location);
        submit.onclick = () => { onSubmit(); };
        submit2.onclick = () => { onSubmit(); };
        update.onclick = () => { onSubmit(true); };
        update2.onclick = () => { onSubmit(true); };
        cancelRead.onclick = () => { onSubmit(true, true); };
        _activeMone.images.forEach((im) => {
            AlbomItem(_activeMone, im, albom);
        });
        function onSubmit(upd = false, canceRead = false) {
            _activeMone.gashash = moneGashash.value;
            _activeMone.name = moneName.value;
            _activeMone.phone1 = phone1.value;
            _activeMone.phone2 = phone2.value;
            _activeMone.address = address.value;
            _activeMone.street = street.value;
            _activeMone.streetNumber = streetNumber.value;
            _activeMone.entry = entry.value;
            _activeMone.floor = floor.value;
            _activeMone.house = house.value;
            _activeMone.street = street.value;
            _activeMone.message = message.value;
            _activeMone.type = typeHouse.value;
            _activeMone.location = locationSelect.value;
            _activeMone.unRead = unReadSelect.value;
            if (canceRead || _activeMone.unRead != "--") {
                _activeMone.read = false;
            }
            else {
                _activeMone.read = true;
            }
            if (_activeMone.images.length < 1 && upd == false) {
                alert("אין תמונה");
            }
            else {
                POST("/updatMone", _activeMone)
                    .then((d) => {
                    if (upd) {
                        Alert("הדיווח נשלח בהצלחה");
                        return;
                    }
                    if (_activeMone.unRead != "--") {
                        setUnRead(_activeMone);
                    }
                    else {
                        setRead(_activeMone);
                    }
                    Alert("הדיווח נשלח בהצלחה");
                    setPage("list");
                })
                    .catch(err => {
                    console.log("err", err);
                    alert("ישנה שגיאה");
                });
            }
        }
        const video = document.getElementById('camera');
        const canvas = document.getElementById('photo');
        const snapBtn = document.getElementById('snap');
        const snapBtn2 = document.getElementById('snap2');
        async function initCamera() {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false });
            video.srcObject = stream;
        }
        function snap() {
            console.log("snap");
            if (!gateSnap)
                return;
            gateSnap = false;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const base64Image = canvas.toDataURL('image/png');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _activeMone.images.push(base64Image);
            AlbomItem(_activeMone, base64Image, albom);
        }
        snapBtn2.addEventListener('click', () => { snap(); });
        snapBtn.addEventListener('click', () => { snap(); });
        video.addEventListener('click', () => { snap(); });
        initCamera();
    }
    onActivePage("mone", () => {
        render();
    });
}
function AlbomItem(mone, base64, dad) {
    let image = createElement({
        className: "albomItem",
        onClick: () => {
        },
        children: [
            createElement({
                tag: "button",
                className: "removeImage",
                html: "X",
                onClick: () => {
                    mone.images.removeByValue(base64);
                    image.innerHTML = "";
                    image.style.display = "none";
                }
            }),
            createElement({
                tag: "img",
                className: "img",
                src: base64,
                onClick: () => {
                    popup(`
                        <img id="popup-image"/>    
                    `, () => {
                        let img = document.getElementById("popup-image");
                        img.src = base64;
                    });
                }
            }),
        ],
    });
    dad.appendChild(image);
}
