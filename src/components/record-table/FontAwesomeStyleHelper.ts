import FARegular400TTF from "@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf";
import FARegular400Woff2 from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2';
import FASolid900TTF from "@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf";
import FASolid900Woff2 from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';

const myGlobalCSS = `
@font-face {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url("${FARegular400Woff2}") format("woff2"), url("${FARegular400TTF}") format("truetype");
}

@font-face {
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url("${FASolid900Woff2}") format("woff2"), url("${FASolid900TTF}") format("truetype");
}

@font-face {
    font-family: 'FontAwesome';
    font-display: block;
    src: url("${FARegular400Woff2}") format("woff2"), url("${FARegular400TTF}") format("truetype");
    unicode-range: U+F003,U+F006,U+F014,U+F016-F017,U+F01A-F01B,U+F01D,U+F022,U+F03E,U+F044,U+F046,U+F05C-F05D,U+F06E,U+F070,U+F087-F088,U+F08A,U+F094,U+F096-F097,U+F09D,U+F0A0,U+F0A2,U+F0A4-F0A7,U+F0C5,U+F0C7,U+F0E5-F0E6,U+F0EB,U+F0F6-F0F8,U+F10C,U+F114-F115,U+F118-F11A,U+F11C-F11D,U+F133,U+F147,U+F14E,U+F150-F152,U+F185-F186,U+F18E,U+F190-F192,U+F196,U+F1C1-F1C9,U+F1D9,U+F1DB,U+F1E3,U+F1EA,U+F1F7,U+F1F9,U+F20A,U+F247-F248,U+F24A,U+F24D,U+F255-F25B,U+F25D,U+F271-F274,U+F278,U+F27B,U+F28C,U+F28E,U+F29C,U+F2B5,U+F2B7,U+F2BA,U+F2BC,U+F2BE,U+F2C0-F2C1,U+F2C3,U+F2D0,U+F2D2,U+F2D4,U+F2DC;
}

@font-face {
    font-family: 'FontAwesome';
    font-display: block;
    src: url("${FASolid900Woff2}") format("woff2"), url("${FASolid900TTF}") format("truetype");
}
`;

const styleEle = document.createElement("style");
styleEle.innerHTML = myGlobalCSS;
document.getElementsByTagName("head")[0]?.appendChild(styleEle);