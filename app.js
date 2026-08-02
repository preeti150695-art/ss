/* ==========================================================================
   SELF STORAGE INDIA — SECTION 1: HERO SECTION REDESIGN INTERACTIVE LOGIC
   ========================================================================== */

// 1. Navbar Scroll Transition
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Quote Modal Toggle Functions
function openQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.classList.add('open');
}

function closeQuoteModal(event) {
    const modal = document.getElementById('quote-modal');
    if (!event || event.target === modal) {
        modal.classList.remove('open');
    }
}

// 3. Video Modal Toggle Functions
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.add('open');
}

function closeVideoModal(event) {
    const modal = document.getElementById('video-modal');
    if (!event || event.target === modal) {
        modal.classList.remove('open');
    }
}

// 4. Conversion Form Submission Logic
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear fields & close modal
    document.getElementById('user-name').value = '';
    document.getElementById('user-phone').value = '';
    closeQuoteModal();
    
    // Show instant success notification
    showToastNotification();
}

// 5. Toast Success Message
function showToastNotification() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* ==========================================================================
   SELF STORAGE INDIA — SECTION 2: STORAGE CALCULATOR INTERACTIVE LOGIC
   ========================================================================== */

const calcQty = {
    sofa: 0,
    bed: 0,
    table: 0,
    chair: 0,
    wardrobe: 0,
    boxes: 0,
    luggage: 0,
    tv: 0,
    folder: 0,
    appliances: 0,
    bicycle: 0,
    inventory: 0
};

const calcVolumes = {
    sofa: 15,
    bed: 20,
    table: 10,
    chair: 3,
    wardrobe: 15,
    boxes: 2,
    luggage: 3,
    tv: 4,
    folder: 1,
    appliances: 12,
    bicycle: 8,
    inventory: 25
};

function updateItemQty(itemKey, change) {
    // 1. Calculate new quantity
    const newQty = calcQty[itemKey] + change;
    if (newQty < 0) return; // Prevent negative values
    
    // 2. Save state & update display text
    calcQty[itemKey] = newQty;
    document.getElementById(`qty-${itemKey}`).innerText = newQty;
    
    // 3. Calculate total volume needed
    let totalVolumeSqFt = 0;
    let totalItemsCount = 0;
    for (const key in calcQty) {
        totalVolumeSqFt += calcQty[key] * calcVolumes[key];
        totalItemsCount += calcQty[key];
    }
    
    // 4. Update the visual storage unit box
    const maxCapacityVolume = 150; // The threshold where the unit is considered 100% full
    const fillPercent = Math.min(100, Math.round((totalVolumeSqFt / maxCapacityVolume) * 100));
    
    const fillBar = document.getElementById('unit-fill');
    const fillPercentText = document.getElementById('unit-fill-percent');
    
    fillBar.style.height = `${fillPercent}%`;
    fillPercentText.innerText = `${fillPercent}% Full`;
    
    // 5. Visual: Update virtual box items inside the visual grid
    const itemGrid = document.getElementById('unit-items-display');
    itemGrid.innerHTML = ''; // Clear previous items
    
    // Populate miniature icons in the virtual unit based on items added
    for (const key in calcQty) {
        if (calcQty[key] > 0) {
            let materialIconName = 'inventory_2';
            // map keys to icons
            if (key === 'sofa') materialIconName = 'weekend';
            else if (key === 'bed') materialIconName = 'bed';
            else if (key === 'table') materialIconName = 'table_restaurant';
            else if (key === 'chair') materialIconName = 'chair';
            else if (key === 'wardrobe') materialIconName = 'dresser';
            else if (key === 'boxes') materialIconName = 'inventory_2';
            else if (key === 'luggage') materialIconName = 'luggage';
            else if (key === 'tv') materialIconName = 'tv';
            else if (key === 'folder') materialIconName = 'folder';
            else if (key === 'appliances') materialIconName = 'kitchen';
            else if (key === 'bicycle') materialIconName = 'pedal_bike';
            else if (key === 'inventory') materialIconName = 'warehouse';
            
            for (let i = 0; i < Math.min(calcQty[key], 6); i++) {
                const miniIcon = document.createElement('span');
                miniIcon.className = 'material-symbols-rounded mini-item-visual';
                miniIcon.innerText = materialIconName;
                itemGrid.appendChild(miniIcon);
            }
        }
    }
    
    // 6. Update Live Result Card Values
    const resultSize = document.getElementById('calc-result-size');
    const resultDesc = document.getElementById('calc-result-desc');
    const resultPrice = document.getElementById('calc-result-price');
    
    if (totalVolumeSqFt === 0) {
        resultSize.innerText = '0 sq ft';
        resultDesc.innerText = 'Select items to calculate space';
        resultPrice.innerText = 'Estimated Monthly Plan: Starting from ₹1,200';
    } else {
        resultSize.innerText = `${totalVolumeSqFt} sq ft`;
        
        let planDescription = 'Ideal for document storage and luggage';
        let startingPriceVal = 1200 + (totalVolumeSqFt * 75);
        
        if (totalVolumeSqFt <= 15) {
            planDescription = 'Locker (ideal for luggage, documents)';
        } else if (totalVolumeSqFt <= 45) {
            planDescription = 'Small Room (ideal for 1BHK / Studio items)';
        } else if (totalVolumeSqFt <= 90) {
            planDescription = 'Medium Room (ideal for 2BHK furniture)';
        } else {
            planDescription = 'Large Room (ideal for 3BHK+ / Startup inventory)';
        }
        
        resultDesc.innerText = `Ideal for: ${planDescription}`;
        resultPrice.innerText = `Estimated Monthly Plan: Starting from ₹${startingPriceVal.toLocaleString('en-IN')}`;
    }
}

/* ==========================================================================
   SELF STORAGE INDIA — SECTION 3: INTERACTIVE FACILITY MAP LOGIC
   ========================================================================== */

function focusLocCard(locKey) {
    const card = document.getElementById(`loc-card-${locKey}`);
    if (card) {
        card.classList.add('highlighted');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function blurLocCard(locKey) {
    const card = document.getElementById(`loc-card-${locKey}`);
    if (card) {
        card.classList.remove('highlighted');
    }
}

/* ==========================================================================
   SELF STORAGE INDIA — SECTION 4: ACCORDION FAQ LOGIC
   ========================================================================== */

function toggleFaq(trigger) {
    const item = trigger.parentElement;
    const content = trigger.nextElementSibling;
    const arrow = trigger.querySelector('.accordion-arrow');

    // Close other items
    const allItems = document.querySelectorAll('.faq-accordion-item');
    allItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content-box').style.maxHeight = null;
        }
    });

    // Toggle current item
    const isActive = item.classList.contains('active');
    if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
    } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

// 6. Scroll Reveal Observer for Why Self Storage
document.addEventListener('DOMContentLoaded', () => {
    const revealOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    const targetElements = document.querySelectorAll('.reveal-element');
    
    targetElements.forEach(element => {
        revealObserver.observe(element);
    });
});

// 7. Back-To-Top Button Logic
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


