import {
    ferrari,
    ginetta,
    honda,
    lamborghini,
    MINI,
    toyota,
    audi,
    corvette,
    hyundai,
    nissan,
    saleen,
    ford,
    mercedes,
} from "../images/manuf__Logos";
import sro from "../images/SRO.jpg";
import {
    gtwca_pro,
    gtwca_am,
    gtwca_ProAm,
    gt4_proam,
    gt4_am,
    gt4_silver,
    tcx,
    tc,
    tca,
    gtam_gt2,
    gtam_gt3,
    gtam_gt4,
} from "../images/class_logos";
import { gt4a } from "./helperFunc";

const getManufLogo = (vehicle) => {
    const vehicleLogos = {
        Porsche:
            "https://i.pinimg.com/originals/a2/59/80/a259802b31e3db1b4b3b78a3f7a66c49.png",
        BMW: "https://yt3.googleusercontent.com/lwCVsjTlM4Lx1OiOgHj8bpXn9DAgWSv4q4CpB7nGpBWo_NnOLXAzbBJwAF6_n95FcSWSIZuA=s900-c-k-c0x00ffffff-no-rj",
        "Mercedes-AMG": mercedes,
        Acura: "https://1000logos.net/wp-content/uploads/2018/09/acura-emblem-black.jpg",
        Aston: "https://cdn.motor1.com/images/mgl/3WWeox/s1/aston-martin-new-logo.jpg",
        Ferrari: ferrari,
        Ginetta: ginetta,
        Honda: honda,
        Lamborghini: lamborghini,
        MINI: MINI,
        Toyota: toyota,
        Audi: audi,
        Corvette: corvette,
        Hyundai: hyundai,
        Nissan: nissan,
        Saleen: saleen,
        Ford: ford,
        Chevrolet:
            "https://1000logos.net/wp-content/uploads/2019/12/Chevrolet-Logo-2010.png",
    };
    const vehicleName = vehicle.split(" ")[0];

    return vehicleLogos[vehicleName] || sro;
};

const getClassBannerImg = (classif, series) => {
    const logos = {
        TCX: { default: tcx },
        TC: { default: tc },
        TCA: { default: tca },
        SRO3: { default: gtam_gt3 },
        Masters: { default: gtam_gt3 },
        GT4: { default: gtam_gt4 },
        GT2: { default: gtam_gt2 },
        Silver: { default: gt4_silver },
        "Pro-Am": { [gt4a]: gt4_proam, default: gtwca_ProAm },
        Am: { [gt4a]: gt4_am, default: gtwca_am },
    };

    return (
        // check if classif exists, if so pass series value to return gt4a vals
        (logos[classif] && logos[classif][series]) ||
        // if that doesnt exists return the default value. if no classif key exists return pro
        logos[classif]?.default ||
        gtwca_pro
    );
};

export { getClassBannerImg, getManufLogo };
