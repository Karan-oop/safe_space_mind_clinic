//script.js

// TICKER
const ITEMS=['Anxiety & Depression','Schizophrenia','Bipolar Disorder','Addiction Treatment','OCD',
  'Migraine','Epilepsy (Seizures)','Elderly Memory Issues',,
  'Anxiety & Depression','Schizophrenia','Bipolar Disorder','Addiction Treatment','OCD',
  'Migraine','Epilepsy (Seizures)','Elderly Memory Issues',];
const track=document.getElementById('tickerTrack');
if (track) {
  ITEMS.forEach(t=>{
    const s=document.createElement('span');
    s.className='ticker-item';
    s.innerHTML=t+'<span class="ticker-dot">•</span>';
    track.appendChild(s);
  });
}

// NAVBAR
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));

// ACCORDION
document.querySelectorAll('[data-svc]').forEach(item=>{
  item.querySelector('.svc-header').addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('[data-svc]').forEach(i=>i.classList.remove('open'));
    if(!open)item.classList.add('open');
  });
});

// SCROLL REVEAL
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
},{threshold:.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));

// NEWSLETTER
const nlBtn = document.getElementById('nlBtn');
if (nlBtn) {
  nlBtn.addEventListener('click',()=>{
    const inp=document.querySelector('.newsletter-input');
    if(inp && inp.value.trim()){
      inp.value='';inp.placeholder='Thank you!';
      setTimeout(()=>inp.placeholder='Email Address',3000);
    }
  });
}

// ── MOBILE MENU TOGGLE ──
// Mobile menu functionality - delayed initialization to ensure DOM is ready
setTimeout(function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if (!hamburger || !mobileMenu) return;

  function openMobileMenu(e) {
    if (e) e.preventDefault();
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    return false;
  }

  function closeMobileMenu(e) {
    if (e) e.preventDefault();
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    return false;
  }

  // Hamburger button
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
    return false;
  }, false);

  // Close button
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
      return false;
    }, false);
  }

  // Close on overlay click
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === this) {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
      return false;
    }
  }, false);

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu(e);
    }
  }, false);

  // Close on nav link click
  document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      closeMobileMenu();
    }, false);
  });

}, 100);

// REDUCED MOTION
if(matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(e=>e.classList.add('visible'));
}

// TESTIMONIALS SLIDER
const testimonialsTrack = document.getElementById('testimonialsTrack');
const sliderDots = document.querySelectorAll('.slider-dot');
if (testimonialsTrack && sliderDots.length) {
  let currentTestimonialIndex = 0;
  const totalTestimonials = sliderDots.length;

  const getSlideWidth = () => {
    if (window.innerWidth <= 991) {
      return 100; // 100% slide width on mobile
    } else {
      return 34.5; // 34.5% slide width on desktop (31% width + 3.5% margin)
    }
  };

  const updateTestimonialSlider = (index) => {
    currentTestimonialIndex = index;
    const slideWidth = getSlideWidth();
    
    let maxIndex = totalTestimonials - 1;
    if (window.innerWidth > 991) {
      maxIndex = 1; // On desktop, max index is 1 (shows slides 2, 3, 4)
    }
    
    if (currentTestimonialIndex > maxIndex) {
      currentTestimonialIndex = 0;
    }
    
    const offset = -currentTestimonialIndex * slideWidth;
    testimonialsTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    sliderDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentTestimonialIndex);
    });
  };

  // Click dots to slide
  sliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateTestimonialSlider(idx);
      resetSliderAutoPlay();
    });
  });

  // Auto-play sliding every 5.5 seconds
  let sliderAutoPlay = setInterval(() => {
    let maxIndex = window.innerWidth > 991 ? 1 : totalTestimonials - 1;
    let nextIndex = currentTestimonialIndex + 1;
    if (nextIndex > maxIndex) {
      nextIndex = 0;
    }
    updateTestimonialSlider(nextIndex);
  }, 5500);

  const resetSliderAutoPlay = () => {
    clearInterval(sliderAutoPlay);
    sliderAutoPlay = setInterval(() => {
      let maxIndex = window.innerWidth > 991 ? 1 : totalTestimonials - 1;
      let nextIndex = currentTestimonialIndex + 1;
      if (nextIndex > maxIndex) {
        nextIndex = 0;
      }
      updateTestimonialSlider(nextIndex);
    }, 5500);
  };

  // Listen to window resize to adjust widths dynamically
  window.addEventListener('resize', () => updateTestimonialSlider(currentTestimonialIndex));
}

// About us
document.addEventListener("DOMContentLoaded", () => {
  // Count-up animations for rating (4.9) and experience (25)
  const countUpElements = document.querySelectorAll(".count-up-number");
  
  const animateCountUp = (el) => {
    const target = parseFloat(el.getAttribute("data-target"));
    const isDecimal = target % 1 !== 0;
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();
    const startValue = 1.0;

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentValue = startValue + easeProgress * (target - startValue);

      if (isDecimal) {
        el.textContent = currentValue.toFixed(1);
      } else {
        el.textContent = Math.floor(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
      }
    };

    requestAnimationFrame(updateValue);
  };

  // Trigger counters when visible in viewport
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  countUpElements.forEach(el => counterObserver.observe(el));

  // FAQ Accordion interactivity: toggle active class to make the item dark
  const faqItems = document.querySelectorAll("#about-faqs .faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header-click");
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close all items
      faqItems.forEach(i => {
        i.classList.remove("active");
        const icon = i.querySelector(".faq-toggle-icon");
        if (icon) icon.textContent = "+";
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
        const icon = item.querySelector(".faq-toggle-icon");
        if (icon) icon.textContent = "−";
      }
    });
  });
});


/* FAQ accordion */
        document.querySelectorAll('.sd-faq-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.sd-faq-item');
                const isOpen = item.classList.contains('open');

                // close all
                document.querySelectorAll('.sd-faq-item').forEach(el => {
                    el.classList.remove('open');
                    el.querySelector('.sd-faq-trigger').setAttribute('aria-expanded', 'false');
                });

                // open clicked if it was closed
                if (!isOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });