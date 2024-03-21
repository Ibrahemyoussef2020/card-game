export const marks = ["♠", "♣", "♥", "♦"];

export const values = ["A","1","2","3","4","5", "6","7","8","9","10","J","Q","K"];

export const valuesIncludesChars = {
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10,
    'A':11,
    'Q':12,
    'K':13,
    'J':14,
};

export function toggleBetweenTwoClasses(element,negativeClass,positiveclass){
    if (element.classList.contains(negativeClass)) {
        element.classList.remove(negativeClass);
        element.classList.add(positiveclass)

    }else if (element.classList.contains(positiveclass)) {
        element.classList.remove(positiveclass);
        element.classList.add(negativeClass)  
    } 

    console.log(element);
}

export function addAnimationForElements(elements) {
    elements.forEch(element => {
        element.classList.add('vibration');
        setTimeout(()=> element.classList.add('vibration'),700)
    });
}

