
const getHashOfString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 8) - hash);
    }
    hash = Math.abs(hash);
    return hash;
};

const normalizeHash = (hash, min, max) => {
    return Math.floor((hash % (max - min)) + min);
};

/*  
const hRange = [0, 360];
const sRange = [0, 100];
const lRange = [0, 100]; 
*/
const hRange = [0, 360];//hue
const sRange = [30, 75];//saturation
const lRange = [15, 80];//light


const generateHSLByName = (name) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return `hsl(${h}, ${s}%, ${l}%)`;
};