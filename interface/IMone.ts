interface IMone{
    id          : string;
    number      : string;
    name        : string;
    address     : string;
    city        : string;
    street      : string;
    streetNumber: number;
    house       : number;
    floor       : number;
    entry       : number;
    phone1      : string;
    phone2      : string;
    read        : boolean;
    gashash     : string;
    type        : "--"| "בניין" | "פרטי"| "רחוב" |  "" ;
    unRead      : IUnRead
    location    : ILocation;
    message     : string;
    images      : any[];
    GPS         : any[];
    date        : any;
}

type PartialIMone = Partial<IMone>;


type ILocation =  
    "--"
    |"לא מוגדר"
    |"לא ידוע"
    |"בפנים"
    |"בחוץ"
    |"בתוך הבית"
    |"ליד הדלת"
    |"ארון רחוב"
    |"מאחורי הבית" 
    |"בצד הבית" 
    |"בחצר" 
    |"בחנייה" 
    |"דלת מיוחדת"
    |"רחוק"
    |"בבית אחר"
    |"פירוט בהודעה"
;

type IUnRead = 
     "--"
    |"מקום סגור" 
    |"מונה הוסר"
    |"אין מפתח לארון"
    |"לא נמצא"
    |"אין מענה"
    |"אין מענה ונשלח הודעה"
    |"התנגדות"
    |"יש כלב שמפריע"
    |"דיווח עצמאי"
    |"פירוט בהודעות"
;