// MASK CLIP EFFECT
const container = document.getElementById('mask_container')
const mask = document.getElementById('mask')

const initialMaskSize = .8;
const targetMaskSize = 32;
const easing = 0.16;
let easedScrollProgress = 0;

const getScrollProgressWithEasing = () => {
    const scrollProgress = mask.offsetTop / (container.getBoundingClientRect().height - window.innerHeight)
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return easedScrollProgress
}

const animateMask = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgressWithEasing();
    mask.style.maskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
    requestAnimationFrame(animateMask)
}

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(animateMask)
})


// LAZY LOAD IMAGES 
const allLazyImages = document.querySelectorAll('.lazy_image')

const callback = (entries, self) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const image = entry.target;
        const dataSrc = image.dataset.src;

        if (dataSrc && !image.src) {
            image.src = dataSrc;
            image.style.opacity = 1;
            image.removeAttribute('data-src');
        }
        self.unobserve(image);
    })
}

const parallaxEffect = (image) => {
    const scrollPosition = window.scrollY;
    const imageHeight = image.offsetHeight;
    const windowHeight = window.innerHeight;
    const relativePosition = (scrollPosition - image.offsetTop + windowHeight) / (imageHeight + windowHeight);

    image.style.transform = `translateY(${relativePosition * 200}px)`;
};

const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0,
});

allLazyImages.forEach(image => {
    observer.observe(image);
    window.addEventListener('scroll', () => { parallaxEffect(image) });
});
