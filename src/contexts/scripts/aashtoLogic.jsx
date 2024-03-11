
export class aashtoClass  {

    constructor (sieve10, sieve40, sieve200, liquid, plastic, setGroup, setSoil, langFinder) {
        this.sieve10 = sieve10;
        this.sieve40 = sieve40;
        this.sieve200 = sieve200;
        this.liquid = liquid;
        this.plastic = plastic;
        this.setGroup = setGroup;
        this.setSoil = setSoil;
        this.langFinder = langFinder;
    }

    plasticityIndex () {return this.liquid.current - this.plastic.current};

    // Validation booleans

    casagrandeLimit () {
        const boolean1 = (this.liquid.current - this.plastic.current) > (0.9 * (this.liquid.current - 8));
        const boolean2 = this.liquid.current >= 8;
        const boolean3 = (this.liquid.current <= 8 && this.liquid.current > 0);

        return ((boolean1 && boolean2) || (boolean3));
    };

    isLiquidMinorThanPlastic () {return this.plastic.current > this.liquid.current};

    isDataCompleted () {

        const list = [this.sieve10.current, this.sieve40.current, this.sieve200.current, this.liquid.current, this.plastic.current];

        const boolean = (list.some((value) => isNaN(value)) || list.some((value) => value == null) || list.some((value) => value == undefined));

        return !boolean;
    };

    // Group booleans

    groupA1a () {return this.sieve10.current <= 50 && this.sieve40.current <= 30 && this.sieve200.current <= 15 && this.plasticityIndex() <= 6};
    groupA1b () {return this.sieve40.current <= 50 && this.sieve200.current <= 25};
    groupA3 () {return this.sieve40.current > 50 && this.sieve200.current <= 10};
    groupA24 () {return this.sieve200.current <= 35 && this.plasticityIndex() <= 10 && this.liquid.current <= 40};
    groupA25 () {return this.sieve200.current <= 35 && this.plasticityIndex() <= 10 && this.liquid.current > 40};
    groupA26 () {return this.sieve200.current <= 35 && this.plasticityIndex() > 10 && this.liquid.current <= 40};
    groupA27 () {return this.sieve200.current <= 35 && this.plasticityIndex() > 10 && this.liquid.current > 40};
    groupA4 () {return this.sieve200.current > 35 && this.plasticityIndex() <= 10 && this.liquid.current <= 40};
    groupA5 () {return this.sieve200.current > 35 && this.plasticityIndex() <= 10 && this.liquid.current > 40};
    groupA6 () {return this.sieve200.current > 35 && this.plasticityIndex() > 10 && this.liquid.current <= 40};
    groupA75 () {return this.sieve200.current > 35 && this.plasticityIndex() > 10 && this.liquid.current > 40 && this.plasticityIndex() <= this.liquid.current - 30};
    groupA76 () {return this.sieve200.current > 35 && this.plasticityIndex() > 10 && this.liquid.current > 40 && this.plasticityIndex() > this.liquid.current - 30};

    indexGroup () {
        let IG = 0;

        if (this.groupA1a() || this.groupA1b() || this.groupA3() || this.groupA24() || this.groupA25()) {
            return " [0]";

        } else if (this.groupA26() || this.groupA27()) {
            IG = Math.round(((this.sieve200.current - 15) * (this.plasticityIndex() - 10) * 0.01));
            return ` [${IG}]`;

        } else if (this.groupA4() || this.groupA5() || this.groupA6() || this.groupA75() || this.groupA76()) {
            IG = Math.round((this.sieve200.current - 35) * (0.2 + 0.005 * (this.liquid.current - 40)) + ((this.sieve200.current - 15) * (this.plasticityIndex() - 10) * 0.01));
            return ` [${IG}]`;
        }
    }

    classify () {

        const langDict = this.langFinder();

        if (this.groupA1a()) {
            this.setGroup(`${langDict.aashto.soilname.group} A1.a${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A1);
        } else if (this.groupA1b()) {
            this.setGroup(`${langDict.aashto.soilname.group} A1.b${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A1);
        } else if (this.groupA3()) {
            this.setGroup(`${langDict.aashto.soilname.group} A3${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A3);
        } else if (this.groupA24()) {
            this.setGroup(`${langDict.aashto.soilname.group} A2.4${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A2_45);
        } else if (this.groupA25()) {
            this.setGroup(`${langDict.aashto.soilname.group} A2.5${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A2_45);
        } else if (this.groupA26()) {
            this.setGroup(`${langDict.aashto.soilname.group} A2.6${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A2_67);
        } else if (this.groupA27()) {
            this.setGroup(`${langDict.aashto.soilname.group} A2.7${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A2_67);
        } else if (this.groupA4()) {
            this.setGroup(`${langDict.aashto.soilname.group} A4${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A4_A5);
        } else if (this.groupA5()) {
            this.setGroup(`${langDict.aashto.soilname.group} A5${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A4_A5);
        } else if (this.groupA6()) {
            this.setGroup(`${langDict.aashto.soilname.group} A6${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A6_A7);
        } else if (this.groupA75()) {
            this.setGroup(`${langDict.aashto.soilname.group} A7.5${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A6_A7);
        } else if (this.groupA76()) {
            this.setGroup(`${langDict.aashto.soilname.group} A7.6${this.indexGroup()}`);
            this.setSoil(langDict.aashto.soilname.A6_A7);
        } else {
            this.setSoil(langDict.error.text1);
        }
    }
}
