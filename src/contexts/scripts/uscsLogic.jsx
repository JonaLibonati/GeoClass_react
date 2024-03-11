
export class UscsClass {

    constructor( sieve4, sieve200, d10, d30, d60, liquid, plastic, orgRatio, setGroup, setSoil, langFinder ) {
        this.sieve4 = sieve4;
        this.sieve200 = sieve200;
        this.d10 = d10;
        this.d30 = d30;
        this.d60 = d60;
        this.liquid = liquid;
        this.plastic = plastic;
        this.orgRatio = orgRatio;
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

    isSieveCompleted () {

        const list = [this.sieve4.current, this.sieve200.current];

        const boolean = (list.some((value) => isNaN(value)) || list.some((value) => value == null) || list.some((value) => value == undefined));

        return !boolean;
    };

    isDataCompleted () {

        const list1 = [this.d10.current, this.d30.current, this.d60.current];
        const list2 = [this.d10.current, this.d30.current, this.d60.current, this.liquid.current, this.plastic.current];
        const list3 = [this.liquid.current, this.plastic.current];
        const list4 = [this.liquid.current, this.plastic.current, this.orgRatio.current];

        let boolean;

        if (this.isSieveCompleted()) {
            if (this.fines0to4()) {
                boolean = (list1.some((value) => isNaN(value)) || list1.some((value) => value == null) || list1.some((value) => value == undefined));
            } else if (this.fines5to11()) {
                boolean = (list2.some((value) => isNaN(value)) || list2.some((value) => value == null) || list2.some((value) => value == undefined));
            } else if (this.fines12to50()) {
                boolean = (list3.some((value) => isNaN(value)) || list3.some((value) => value == null) || list3.some((value) => value == undefined));
            } else {
                boolean = (list4.some((value) => isNaN(value)) || list4.some((value) => value == null) || list4.some((value) => value == undefined));
            }
        } else {
            boolean = true
        }
        return !boolean;
    };

    // Gravel quantity
    gravel () {return 100 - this.sieve4.current};

    // Sand quantity
    sand () {return this.sieve4.current - this.sieve200.current};

    // Coefficient of Uniformity
    uniformityCoef () {return this.d60.current / this.d10.current}

    // Coefficient of Curvature
    curvatureCoef () {return (this.d30.current * this.d30.current) / (this.d10.current * this.d60.current)}

    // Determinate if soil is well graded.
    isWellGraded () {

        if (this.isGravel() && this.uniformityCoef() >= 4  && this.curvatureCoef() >= 1 && this.curvatureCoef() <= 3) {
            return true;
        } else if (this.isSand() && this.uniformityCoef() >= 6  && this.curvatureCoef() >= 1 && this.curvatureCoef() <= 3) {
            return true;
        } else {
            return false;
        }
    }

    // Determinate if fines are minor than 5.
    fines0to4 () {return this.sieve200.current < 5};

    // Determinate if fines are mayor than or equal to 5% and minor than 12%.
    fines5to11 () {return (this.sieve200.current <= 12 && this.sieve200.current >= 5)};

    // Determinate if fines are mayor than 12% and minor or equal than 50%.
    fines12to50 () {return (this.sieve200.current < 50 && this.sieve200.current > 12)};

    // Determinate if soil is fines or coarse
    isCoarse () {return (this.sieve200.current < 50)};

    // Determinate if course is mayor than or equal to 15% and minor than 30%.
    Coarse15to29 () {return (this.gravel() + this.sand() >= 15 && this.gravel() + this.sand() < 30)};

    // Determinate if course is mayor than or equal to 30% and minor than 50%.
    Coarse30to49 () {return (this.gravel() + this.sand() >= 30 && this.gravel() + this.sand() < 50)};

    // Determinate if soil is gravel
    isGravel () {return (this.gravel() > this.sand() && this.isCoarse())};

    // Determinate if soil is sand
    isSand () {return (this.gravel() <= this.sand() && this.isCoarse())};

    //Plasticity chart. Determinate if soil is clay
    isclay () {return this.plasticityIndex() > 7 && this.plasticityIndex() > (0.73 * (this.liquid.current - 20));}

    //Plasticity chart. Determinate if soil is silt
    isSilt () {return (this.liquid.current > 20 && this.plasticityIndex() <= (0.73 * (this.liquid.current - 20))) || this.plasticityIndex() < 4;}

    //Plasticity chart. Determinate if soil is silt-clay
    isSiltClay () {return this.plasticityIndex() >= 4 && this.plasticityIndex() <= 7 && this.plasticityIndex() > (0.73 * (this.liquid.current - 20));}

    //Plasticity chart. Determinate if soil is low plasticity
    isLowPlasticity () {return this.liquid.current < 50}

    classify () {

        console.log(this.uniformityCoef())
        console.log(this.curvatureCoef())

        console.log(this.sand())

        console.log(this.isDataCompleted())

        const langDict = this.langFinder();

        let group = "";

        if (this.isDataCompleted()) {
            if (this.isLiquidMinorThanPlastic()) {
                this.setGroup('');
                this.setSoil(langDict.error.text2);
                return
            } else if (this.casagrandeLimit()) {
                this.setGroup('');
                this.setSoil(langDict.error.text3);
                return
            } else if (this.sand() < 0) {
                this.setGroup('');
                this.setSoil(langDict.error.text4);
                return
            } else {
                this.setGroup('');
                this.setSoil('');
            }

            if (this.isGravel()) {
                group = `${group}G`
                if (this.fines0to4()) {
                    if (this.isWellGraded()) {
                        group = `${group}W`
                    } else {
                        group = `${group}P`
                    }
                } else if (this.fines5to11()) {
                    if (this.isWellGraded()) {
                        group = `${group}W`
                    } else {
                        group = `${group}P`
                    }

                    if (this.isclay() || this.isSiltClay()) {
                        group = `${group}-GC`
                    } else if (this.isSilt()) {
                        group = `${group}-GM`
                    }
                } else {
                    if (this.isclay()) {
                        group = `${group}C`
                    } else if (this.isSilt()) {
                        group = `${group}M`
                    } else if (this.isSiltClay()) {
                        group = `${group}C-GM`
                    }
                }

                this.setGroup(group);
                if (this.isGravel() && this.sand() >= 15 ) { group = `${group}_s` }
                if (this.isSand() && this.gravel() >= 15 ) { group = `${group}_g` }
                if (this.isSiltClay() && this.fines5to11() ) { group = `${group}_silty` }

            } else if (this.isSand()) {
                group = `${group}S`;
                if (this.fines0to4()) {
                    if (this.isWellGraded()) {
                        group = `${group}W`
                    } else {
                        group = `${group}P`
                    }
                } else if (this.fines5to11()) {
                    if (this.isWellGraded()) {
                        group = `${group}W`
                    } else {
                        group = `${group}P`
                    }

                    if (this.isclay() || this.isSiltClay()) {
                        group = `${group}-GC`
                    } else if (this.isSilt()) {
                        group = `${group}-GM`
                    }
                } else {
                    if (this.isclay()) {
                        group = `${group}C`
                    } else if (this.isSilt()) {
                        group = `${group}M`
                    } else if (this.isSiltClay()) {
                        group = `${group}C-GM`
                    }
                }

                this.setGroup(group);
                if (this.isGravel() && this.sand() >= 15 ) { group = `${group}_s` }
                if (this.isSand() && this.gravel() >= 15 ) { group = `${group}_g` }
                if (this.isSiltClay() && this.fines5to11() ) { group = `${group}_silty` }

            } else {
                if ( this.orgRatio.current >= 0.75 ) {
                    if (this.isLowPlasticity()) {
                        if (this.isclay()) {
                            group = `CL`
                        } else if (this.isSilt()) {
                            group = `ML`
                        } else if (this.isSiltClay()) {
                            group = `CL-ML`
                        }
                    } else {
                        if (this.isclay()) {
                            group = `CH`
                        } else if (this.isSilt()) {
                            group = `MH`
                        }
                    }

                    this.setGroup(group);
                } else {
                    if (this.isclay() || this.isSiltClay()) {
                        group = 'O_C'
                    } else if (this.isSilt()) {
                        group = 'O_M'
                    }

                    if (this.isLowPlasticity()) {
                        this.setGroup('OL');
                    } else {
                        this.setGroup('OH');
                    }
                }

                if (this.Coarse15to29()) {
                    if (this.sieve200.current >= 15 && this.sand() >= this.gravel() ) { group = `${group}_s` }
                    if (this.sieve200.current >= 15 && this.sand() < this.gravel() ) { group = `${group}_g` }
                } else if (this.Coarse30to49()) {
                    if (this.sand() >= this.gravel() && this.gravel() < 15 ) { group = `${group}_sandy` }
                    if (this.sand() >= this.gravel() && this.gravel() >= 15) { group = `${group}_sandy_g` }
                    if (this.sand() < this.gravel() && this.sand() < 15 ) { group = `${group}_gravelly` }
                    if (this.sand() < this.gravel() && this.sand() >= 15) { group = `${group}_gravelly_s` }
                }
            }

            console.log(group)

            this.setSoil(langDict.uscs.soilname[group.replace('-', '')]);
        } else {
            this.setGroup('');
            this.setSoil('');
        }
    }
}


