const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
        stagger: .2
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function circleSkew(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.8,1.2,xdiff)
        yscale = gsap.utils.clamp(.8,1.2,ydiff)

        xprev = dets.clientX; 
        yprev = dets.clientY; 

        circleMouseFollower(xscale, yscale);

    })
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleSkew();
circleMouseFollower();
firstPageAnim();


// Select all the three elements--> Apply the 'mousemove' event on these elements. --> get the x and y position of the mouse when it moves.
// --> Now replace the positions with the image and move it. And sync the rotation of the image with the mouse movement.

document.querySelectorAll('.elem').forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details){

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;

        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot),
        });
    });
});