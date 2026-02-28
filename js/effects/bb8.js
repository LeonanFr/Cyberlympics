function random(min, max) {
    if (max === null) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

function chanceRoll(chance) {
    if (chance === null) {
        chance = 50;
    }
    return chance > 0 && Math.random() * 100 <= chance;
}

(function () {
    var o = {
        isIntro: true,
        isRollingLeft: false,
        currentTl: [],
        currentGravelTl: [],
        gravelProgress: [],
        prevGravelProgress: [],
        slowMoFactor: 1,
        slowMoFactorBody: 1,
        lightsOnOff: [0, 0],
        wiggleFrame: 0,
        allTheTime: 0,
        nowAndThen: 0,
        ranDur: 0,
        ranPos: 0,
        moveAmount: 0,
        headNull: { value: 0 },

        init: function () {
            this.cacheDOM();
            this.setStart();
            this.startTicker();
            this.animate();
        },
        cacheDOM: function () {
            this.svg = document.querySelector("[data-bb8=svg]");
            if (!this.svg) return;
            this.gravelGroup = this.svg.querySelector("[data-bb8=gravelGroup]");
            this.gravel = this.svg.querySelectorAll("[data-bb8=gravel]");
            this.largeMask = this.svg.querySelector("[data-bb8=largeMask]");
            this.animElems = ["bb8", "unit", "bodyShadow", "bodySurface", "rotatingHead", "headShadowBig", "headShadowSmall", "bouncingHead", "antennaLong", "antennaShort", "headSurface", "upperLight", "lowerLight", "littleEye", "bigEye", "eyeHighlight", "pupilGroup", "pupil1", "pupil2", "pupil3", "pupil4"];
            this.bb8 = {};
            for (var i = 0; i < this.animElems.length; i++) {
                this.bb8[this.animElems[i]] = this.svg.querySelector("[data-bb8=" + this.animElems[i] + "]");
            }
        },
        bindEvents: function () {
            this.bb8.bb8.addEventListener("mouseover", function () {
                o.slowMotion(1);
            });
            this.bb8.bb8.addEventListener("mouseout", function () {
                o.slowMotion(0);
            });
        },
        setStart: function () {
            TweenMax.set(this.svg, { autoAlpha: 1 });
            TweenMax.set(this.largeMask, { scale: 0, transformOrigin: "center" });
            TweenMax.set(this.bb8.bb8, { y: 3500, x: 2900, scale: 2.5, transformOrigin: "center bottom" });
            TweenMax.set(this.bb8.rotatingHead, { rotation: 20, transformOrigin: "center" });
            this.spreadGravel();
        },
        startTicker: function () {
            TweenMax.ticker.addEventListener("tick", this.wiggleHead.bind(this));
            TweenMax.ticker.addEventListener("tick", this.blinkLights.bind(this));
            TweenMax.ticker.addEventListener("tick", this.connectHeadToNull.bind(this));
        },
        spreadGravel: function () {
            TweenMax.set(this.gravelGroup, { x: -50 });
            for (var i = 0; i < this.gravel.length; i++) {
                TweenMax.set(this.gravel[i], { x: 0, y: random(100, 800) });
            }
            this.getGravelAnims("right");
        },
        getGravelAnims: function (direction) {
            var tls = [];
            for (var i = 0; i < this.gravel.length; i++) {
                var speed = 0.5;
                var fromX = direction === "left" ? 0 : 2935;
                var toX = direction === "left" ? 2935 : 0;

                if (this.prevGravelProgress.length != this.gravel.length) {
                    this.gravelProgress[i] = random(0, 1);
                    this.prevGravelProgress[i] = this.gravelProgress[i];
                } else {
                    this.gravelProgress[i] = 1 - this.prevGravelProgress[i];
                }

                var tl = new TimelineMax({ repeat: 2000 });
                tl.fromTo(this.gravel[i], speed, { x: fromX }, { x: toX, ease: Linear.easeNone }).progress(this.gravelProgress[i]).paused(true);
                tls[i] = tl;
            }
            return tls;
        },
        getRollAnims: function (direction) {
            var tls = this.getGravelAnims(direction);
            var spinDir = direction === "left" ? "-=360" : "+=360";
            var tl = new TimelineMax({});

            tl.to(this.bb8.bodySurface, 0.5, { rotation: spinDir, transformOrigin: "center", ease: Linear.easeNone, repeat: 1000 }, 0)
                .to(this.bb8.bb8, 2, { x: 500, ease: Back.easeOut }, 0)
                .to(this.bb8.bb8, 1, { y: 500, scale: 1.05, transformOrigin: "center bottom", ease: Power1.easeInOut }, 0)
                .to(this.bb8.bodySurface, 1, { y: -400, ease: Power1.easeInOut }, 0)
                .to(this.bb8.bodySurface, 2, { x: -600, ease: Power1.easeInOut }, 0)
                .to(this.bb8.unit, 0.05, { y: 0, ease: Power1.easeInOut }, 0)
                .to(this.bb8.bouncingHead, 0.05, { y: 0, ease: Power1.easeInOut }, 0)
                .to(this.bb8.bodyShadow, 0.05, { scale: 1, transformOrigin: "center", ease: Power1.easeInOut }, 0)
                .to(this.bb8.bb8, 5, { x: "-=300", ease: Power1.easeInOut, repeat: 500, yoyo: true }, 2)
                .to(this.bb8.bb8, 0.5, { y: "-=100", scale: 1, transformOrigin: "center bottom", ease: Power1.easeInOut, repeat: 1000, yoyo: true }, 1)
                .to(this.bb8.bodySurface, 0.5, { y: "-=250", ease: Power1.easeInOut, repeat: 1000, yoyo: true }, 1)
                .to(this.bb8.bodySurface, 5, { x: "+=200", ease: Power1.easeInOut, repeat: 500, yoyo: true }, 2)
                .to(this.bb8.unit, 0.05, { y: "-=20", ease: Power1.easeInOut, repeat: 20000, yoyo: true }, 0.05)
                .to(this.bb8.bodyShadow, 0.05, { scale: 1.03, transformOrigin: "center", ease: Power1.easeInOut, repeat: 20000, yoyo: true }, 0.05)
                .to(this.bb8.bouncingHead, 0.05, { y: "-=30", ease: Power1.easeInOut, repeat: 20000, yoyo: true }, 0.08)
                .to(this.bb8.rotatingHead, 10, { bezier: [{ rotation: -20 }, { rotation: 10 }, { rotation: 0 }], ease: Linear.easeNone, repeat: 100 }, 0);

            tls[tls.length] = tl;
            return tls;
        },
        getIntroAnim: function () {
            var tl = new TimelineMax();

            tl.to(this.largeMask, 1.5, { scale: 0.95, ease: Back.easeInOut.config(1) })
                .add("bb8-in")
                .to(this.bb8.bb8, 4.5, { x: 2000, y: 4300, scale: 3, ease: Elastic.easeOut.config(10) }, "bb8-in")
                .to(this.bb8.bodySurface, 4.5, { rotation: -30, transformOrigin: "center", ease: Elastic.easeOut.config(10) }, "bb8-in")
                .to(this.bb8.rotatingHead, 0.1, { rotation: -20, transformOrigin: "center" }, "bb8-in =+0.3")
                .to(this.bb8.rotatingHead, 0.1, { rotation: 20, transformOrigin: "center" }, "bb8-in =+1")
                .to(this.bb8.rotatingHead, 3, { rotation: -15, transformOrigin: "center", ease: Elastic.easeOut.config(0.5) }, "bb8-in =+1.5")
                .to(this.bb8.bouncingHead, 0.2, { y: "-=10", ease: Power3.easeInOut, repeat: 2, yoyo: true, repeatDelay: 0.4 }, "bb8-in =+1")
                .to(this.bb8.bouncingHead, 0.35, { y: "+=15", ease: Power1.easeInOut, repeat: 2, yoyo: true, repeatDelay: 0.2 }, "bb8-in =+2.4")
                .to(this.bb8.bouncingHead, 0.275, { y: "-=5", repeat: 1, yoyo: true, repeatDelay: 0.1, ease: Power4.easeInOut }, "bb8-in =+3.85")
                .add("bb8-distress")
                .staggerTo([this.bb8.pupil1, this.bb8.pupil2, this.bb8.pupil3, this.bb8.pupil4], 0.2, { scale: 1.5, transformOrigin: "center", repeat: 3, yoyo: true }, 0.1, "bb8-in =+2.5")
                .add("bb8-out")
                .to(this.bb8.bb8, 1, { x: 4500, ease: Back.easeIn.config(2) }, "bb8-out")
                .to(this.bb8.bodySurface, 1, { rotation: 30, ease: Back.easeIn.config(2) }, "bb8-out")
                .to(this.bb8.rotatingHead, 1.2, { rotation: -30, transformOrigin: "center", ease: Back.easeInOut.config(2) }, "bb8-out")
                .set(this.bb8.bb8, { y: 600, scale: 1, transformOrigin: "center bottom" })
                .set(this.bb8.rotatingHead, { rotation: 0, transformOrigin: "center" })
                .add(this.animate.bind(this));

            return tl;
        },
        animate: function () {
            if (this.isIntro) {
                this.playIntro();
            } else {
                this.stopPlayNext();
            }
        },
        playIntro: function () {
            this.isIntro = false;
            this.currentTl[0] = this.getIntroAnim();
            this.currentTl[0].play();
        },
        stopPlayNext: function () {
            var direction;
            if (this.isRollingLeft) {
                this.isRollingLeft = false;
                direction = "right";
            } else {
                this.isRollingLeft = true;
                direction = "left";
            }

            TweenMax.to(this.currentTl, 0.5 / this.slowMoFactor, { timeScale: 0, onComplete: this.roll.bind(this), onCompleteParams: [direction] });
        },
        roll: function (direction) {
            if (this.currentTl.length === 1) {
                this.bindEvents();
            } else {
                this.recordProgress();
            }

            var tls = this.getRollAnims(direction);

            for (var i = 0; i < this.currentTl.length; i++) {
                this.currentTl[i].kill();
            }

            for (var j = 0; j < tls.length; j++) {
                this.currentTl[j] = tls[j];
                this.currentTl[j].play().timeScale(0);
                TweenMax.to(this.currentTl[j], 1 / this.slowMoFactor, { timeScale: this.slowMoFactorBody });
            }
        },
        recordProgress: function () {
            for (var i = 0; i < this.gravel.length; i++) {
                this.prevGravelProgress[i] = this.currentTl[i].progress();
            }
        },
        slowMotion: function (val) {
            if (val === 1) {
                this.slowMoFactor = 0.1;
                this.slowMoFactorBody = 0.05;
            } else {
                this.wiggleFrame = 0;
                this.allTheTime = 0;
                this.slowMoFactor = 1;
                this.slowMoFactorBody = 1;
            }

            for (var i = 0; i < this.currentTl.length; i++) {
                TweenMax.to(this.currentTl[i], 0.1, { timeScale: this.slowMoFactorBody });
            }
        },
        connectHeadToNull: function () {
            var headSurfaceCenter = -50;
            var bigEyeCenter = 217 + headSurfaceCenter;
            var littleEyeCenter = 385 + headSurfaceCenter;
            var antennaShortCenter = -50;
            var antennaLongCenter = -50;
            var pupilGroupCenter = 20;
            var eyeHighlightCenter = 10;

            var val = this.headNull.value;

            var headSurfacePos = val * 150;
            var bigEyePos = val * 150;
            var pupilGroupPos = val * 20;
            var eyeHighlightPos = val * 10;
            var littleEyePos = val * 150;
            var antennaShortPos = -val * 120;
            var antennaLongPos = -val * 70;

            TweenMax.set(this.bb8.headSurface, { x: headSurfaceCenter + headSurfacePos });
            TweenMax.set(this.bb8.bigEye, { x: bigEyeCenter + bigEyePos });
            TweenMax.set(this.bb8.pupilGroup, { x: pupilGroupCenter + pupilGroupPos });
            TweenMax.set(this.bb8.eyeHighlight, { x: eyeHighlightCenter + eyeHighlightPos });
            TweenMax.set(this.bb8.littleEye, { x: littleEyeCenter + littleEyePos });
            TweenMax.set(this.bb8.antennaShort, { x: antennaShortCenter + antennaShortPos });
            TweenMax.set(this.bb8.antennaLong, { x: antennaLongCenter + antennaLongPos });
        },
        wiggleHead: function () {
            if (this.wiggleFrame === this.allTheTime) {
                this.allTheTime = Math.floor(random(15, 30) / this.slowMoFactor);
                this.ranDur = this.allTheTime / 60;
                this.ranPos = random(0.05, 0.3);
                this.nowAndThen = chanceRoll(50);
                this.moveAmount = random(-1, 1);

                if (this.nowAndThen) {
                    TweenMax.to(this.headNull, this.ranDur, { value: this.moveAmount, ease: Power3.easeInOut });
                } else {
                    TweenMax.to(this.headNull, this.ranDur / 2, { value: "+=" + this.ranPos, ease: Power2.easeInOut, repeat: 1, yoyo: true });
                }

                this.wiggleFrame = 0;
            }

            this.wiggleFrame++;
        },
        blinkLights: function () {
            if (chanceRoll(10 * this.slowMoFactor)) {
                for (var i = 0; i < 2; i++) {
                    if (chanceRoll(50)) {
                        this.lightsOnOff[i] = 1;
                    } else {
                        this.lightsOnOff[i] = 0;
                    }
                }
            }

            TweenMax.set(this.bb8.upperLight, { autoAlpha: this.lightsOnOff[0] });
            TweenMax.set(this.bb8.lowerLight, { autoAlpha: this.lightsOnOff[1] });
        }
    };

    var checkExist = setInterval(function () {
        if (document.querySelector("[data-bb8=svg]")) {
            clearInterval(checkExist);
            o.init();
        }
    }, 100);
})();