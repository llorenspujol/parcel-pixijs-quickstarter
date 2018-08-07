import snake from './images/snake.png';
import santasIdle from './images/santa/idle/*';
import santasWalk from './images/santa/walk/*';

console.log('santas idle', santasIdle);

export const santaFrames = {
    idle: getObjectValuesOrdered(santasIdle),
    walk: getObjectValuesOrdered(santasWalk),
};


function getObjectValuesOrdered(obj) {
    let keys = Object.keys(obj);
    console.log('keys 1', keys);
    keys.sort(compare);
    console.log('keys 2', keys);
    return keys.map((key) => obj[key]);
}

function compare(a, b) {

    const aNumber = parseInt(a.substring(a.indexOf("(")+1,a.indexOf(")")));
    const bNumber = parseInt(b.substring(b.indexOf("(")+1,b.indexOf(")")));
    if (aNumber < bNumber) {
        return -1;
    }
    if (aNumber > bNumber) {
        return 1;
    }
    // a debe ser igual b
    return 0;
}
