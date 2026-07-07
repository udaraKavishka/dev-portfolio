
export function flashbang() {
    if (typeof document === 'undefined') return;

    const el = document.createElement('div');
    el.style.cssText =
        'position:fixed;inset:0;background:#ffffff;z-index:99999;pointer-events:none;opacity:0;';
    document.body.appendChild(el);

    const anim = el.animate(
        [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.2 }, { opacity: 0 }],
        { duration: 750, easing: 'ease-out' }
    );
    anim.onfinish = () => el.remove();
    anim.oncancel = () => el.remove();
}
