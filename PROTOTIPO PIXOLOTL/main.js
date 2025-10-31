// Pixolot - main.js
// Interactividad mínima: mobile menu toggle, abrir modal de juego

document.addEventListener('DOMContentLoaded', ()=>{
    // Ensure brand image fallback: if image missing or fails, show gradient initials
    const brandImg = document.getElementById('brandImg');
    const brandFallback = document.getElementById('brandFallback');
    if(brandImg){
        // if image already failed to load (onerror in markup hides it), show fallback
        brandImg.addEventListener('error', ()=>{
            if(brandFallback){
                brandFallback.textContent = brandImg.dataset.initials || 'PX';
                brandFallback.style.display = 'inline-flex';
                brandImg.style.display = 'none';
            }
        });
        // if image loads successfully, hide fallback
        brandImg.addEventListener('load', ()=>{
            if(brandFallback) brandFallback.style.display = 'none';
        });

        // If the image element is present but has no src or is empty, trigger fallback immediately
        if(!brandImg.getAttribute('src')){
            brandImg.dispatchEvent(new Event('error'));
        }
    } else if(brandFallback){
        brandFallback.style.display = 'inline-flex';
    }
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.querySelector('.nav');
    if(menuBtn){
        menuBtn.addEventListener('click', ()=>{
            nav.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });
    }

    // Abrir preview modal
    document.querySelectorAll('.card').forEach(card=>{
        card.addEventListener('click', ()=>{
            const modal = document.getElementById('previewModal');
            const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Juego';
            const desc = card.dataset.desc || card.querySelector('p')?.textContent || '';
            modal.querySelector('.panel h3').textContent = title;
            modal.querySelector('.panel p').textContent = desc;
            modal.classList.add('show');
        });
    });

    document.querySelectorAll('.modal .close, .modal').forEach(el=>{
        el.addEventListener('click', (e)=>{
            const modal = document.getElementById('previewModal');
            // cerrar si se clica fuera del panel o en close
            if(e.target.classList.contains('modal') || e.target.classList.contains('close')){
                modal.classList.remove('show');
            }
        })
    })

});