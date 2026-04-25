// =========================================================================
// CINEMATIC PROMO ENGINE
// Trigger: Tap 3 times on the Dragon Logo or Brand Text
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    let tapCount = 0;
    let tapTimeout;

    const brandArea = document.querySelector('.brand-text');
    if(brandArea) {
        brandArea.addEventListener('click', () => {
            tapCount++;
            clearTimeout(tapTimeout);
            if(tapCount >= 3) {
                tapCount = 0;
                startCinematicPromo();
            } else {
                tapTimeout = setTimeout(() => { tapCount = 0; }, 800);
            }
        });
    }

    function startCinematicPromo() {
        console.log("🎬 CINEMATIC ENGINE INITIATED");
        
        // 1. Setup UI Overlay
        let overlay = document.getElementById('cinematic-overlay');
        if(!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'cinematic-overlay';
            
            const textElement = document.createElement('div');
            textElement.className = 'cinematic-text';
            textElement.id = 'cinematic-text-box';
            
            const bigCta = document.createElement('div');
            bigCta.className = 'cinematic-big-cta';
            bigCta.innerText = t('cine_moving');
            bigCta.id = 'cinematic-cta';

            overlay.appendChild(textElement);
            document.body.appendChild(overlay);
            document.body.appendChild(bigCta);
        }
        
        // Ensure starting at top
        window.scrollTo({top: 0, behavior: 'instant'});
        overlay.classList.add('active');
        
        const textBox = document.getElementById('cinematic-text-box');
        const ctaBox = document.getElementById('cinematic-cta');
        
        // Helper to show text
        const showText = (text, duration, topPos = "50%") => {
            return new Promise(resolve => {
                textBox.classList.remove('visible');
                setTimeout(() => {
                    textBox.innerText = text;
                    textBox.style.top = topPos;
                    textBox.classList.add('visible');
                    setTimeout(() => {
                        resolve();
                    }, duration);
                }, 400); // transition out delay
            });
        };

        // Helper to smooth scroll
        const scrollToTarget = (selector, offset = 100) => {
            const el = document.querySelector(selector);
            if(el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({top: y, behavior: 'smooth'});
                return el;
            }
            return null;
        };

        // Helper to apply glow
        const applyGlow = (el) => {
            if(el) el.classList.add('cinematic-glow');
        };
        const removeGlow = (el) => {
            if(el) el.classList.remove('cinematic-glow');
        };

        // ====== SCRIPT SEQUENCE ======
        const runFlow = async () => {
            // [HOOK]
            await showText(t('cine_hero'), 2500, "30%");
            await showText(t('cine_tagline'), 2500, "30%");

            // [INTRO]
            await showText(t('cine_tactical'), 3000, "20%");
            
            // [SCROLL BENEFITS]
            textBox.classList.remove('visible');
            const metricsCard = scrollToTarget('.stats-grid', 150);
            applyGlow(metricsCard);
            await showText(t('cine_smart'), 2500, "60%");
            removeGlow(metricsCard);

            const toolsCard = scrollToTarget('.tools-section', 150);
            applyGlow(toolsCard);
            await showText(t('cine_demand'), 2500, "40%");
            removeGlow(toolsCard);

            // [SMART UI / POPUPS SECTION]
            textBox.classList.remove('visible');
            await showText(t('cine_city'), 2000, "15%");
            
            // Open a modal to show UI
            const weatherBtn = document.querySelector('.weather-card');
            if(weatherBtn) weatherBtn.click();
            await showText(t('cine_premium'), 3500, "80%");
            
            // Close modal
            const closeBtn = document.querySelector('#weather-modal .close-btn');
            if(closeBtn) closeBtn.click();
            
            // [UX FOCUS]
            window.scrollTo({top: 0, behavior: 'smooth'});
            await showText(t('cine_ux'), 2500, "25%");
            await showText(t('cine_action'), 2500, "25%");

            // [CLOSING]
            await showText(t('cine_ready'), 2500, "40%");
            await showText(t('cine_moving'), 2500, "40%");

            // [BIG CTA]
            textBox.classList.remove('visible');
            overlay.classList.remove('active');
            
            setTimeout(() => {
                ctaBox.classList.add('visible');
                // Keep the CTA visible for a few seconds then cleanup
                setTimeout(() => {
                    ctaBox.classList.remove('visible');
                }, 4000);
            }, 800);
        };

        runFlow();
    }
});
