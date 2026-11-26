// ==========================================
// 1. PUSAT DATA FIRTAZA
// ==========================================
const FIRTAZA_CONFIG = {
    whatsappNumber: "6287780531185",
    whatsappDisplay: "0877-8053-1185",
    instagram: "https://instagram.com/firtaza.id",
    address: "Makassar, Sulawesi Selatan, Indonesia",
    email: "hello@firtaza.id",
    operationalHours: "Senin - Sabtu (09.00 - 20.00 WITA)",
    flatShipping: 8000,
    shippingNote: "Same Day (Khusus area Makassar, selama jam operasional)"
};

// Daftar Produk Firtaza + Pilihan Varian Warna Soft
const PRODUCTS = [
    {
        id: "ufya-elora",
        name: "Ufya Elora",
        category: "Hijab",
        color: "4 Warna Soft",
        colors: [
            { name: "Espresso", hex: "#4E3831" },
            { name: "Ash Grey", hex: "#9FA4AA" },
            { name: "Dusty Blush", hex: "#D6B1B5" },
            { name: "Soft Sage", hex: "#A8B5A2" }
        ],
        price: 63000,
        badge: "Signature",
        available: true,
        image: "images/Ufya Elora1.jpeg",
        desc: "Koleksi hijab eksklusif dengan tekstur lembut, jatuh sempurna, dan memberikan kesan anggun untuk acara formal maupun kasual."
    },
    {
        id: "niraya-cotton",
        name: "Niraya Cotton",
        category: "Hijab",
        color: "4 Warna Soft",
        colors: [
            { name: "Warm Beige", hex: "#CBB8A3" },
            { name: "Khaki Taupe", hex: "#A39485" },
            { name: "Butter Cream", hex: "#EAE0CA" },
            { name: "Soft Mauve", hex: "#B5A3A6" }
        ],
        price: 37000,
        badge: "Best Seller",
        available: true,
        image: "images/Niraya Cotton1.jpeg",
        desc: "Hijab berbahan katun pilihan yang adem, menyerap keringat, dan mudah dibentuk. Sangat nyaman untuk cuaca tropis Makassar."
    },
    {
        id: "afizah-ciput",
        name: "Afizah Ciput",
        category: "Inner",
        color: "4 Warna Netral",
        colors: [
            { name: "Nude", hex: "#CDBAA2" },
            { name: "Ivory Oat", hex: "#EFE9DF" },
            { name: "Pearl Grey", hex: "#C6C4C2" },
            { name: "Soft Black", hex: "#2D2A29" }
        ],
        price: 23000,
        badge: "Essential",
        available: true,
        image: "images/Afizah Ciput1.jpg",
        desc: "Inner hijab anti-pusing dan tidak mudah melar. Warnanya dirancang netral agar mudah dipadukan dengan seluruh koleksi hijab Firtaza."
    },
    {
        id: "lunara-paris",
        name: "Lunara Paris",
        category: "Hijab",
        color: "Coming Soon",
        colors: [
            { name: "Soft Sand", hex: "#DDD2C3" }
        ],
        price: 44000,
        badge: "Coming Soon",
        available: false,
        image: "images/coming soon.jpeg",
        desc: "Seri Paris premium yang saat ini sedang dalam tahap redesain eksklusif untuk kualitas dan tampilan yang lebih sempurna."
    }
];

// ==========================================
// 2. SMOOTH PAGE TRANSITION (TRANSISI HALAMAN)
// ==========================================
let isNavigating = false;

function initPageTransitions() {
    if (!document.getElementById("firtaza-transition-style")) {
        const style = document.createElement("style");
        style.id = "firtaza-transition-style";
        style.textContent = `
            @view-transition {
                navigation: auto;
            }

            @keyframes firtazaPageIn {
                from {
                    opacity: 0;
                    transform: translateY(12px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            main.firtaza-page-enter {
                animation: firtazaPageIn 0.45s cubic-bezier(0.22, 1, 0.36, 1);
            }

            #firtaza-page-veil {
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: #F4F0EA;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1);
            }

            #firtaza-page-veil.is-leaving {
                opacity: 1;
                pointer-events: all;
            }

            #firtaza-page-veil .veil-brand {
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                letter-spacing: 0.28em;
                color: #4A423D;
                opacity: 0;
                transform: translateY(8px);
                transition: opacity 0.26s ease, transform 0.26s ease;
            }

            #firtaza-page-veil .veil-line {
                width: 36px;
                height: 1.5px;
                background: #D2BBA0;
                margin-top: 10px;
                transform: scaleX(0);
                transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            }

            #firtaza-page-veil.is-leaving .veil-brand {
                opacity: 0.8;
                transform: translateY(0);
            }

            #firtaza-page-veil.is-leaving .veil-line {
                transform: scaleX(1);
            }

            @media (prefers-reduced-motion: reduce) {
                main.firtaza-page-enter {
                    animation: none !important;
                }
                #firtaza-page-veil {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    if (!document.getElementById("firtaza-page-veil")) {
        const veil = document.createElement("div");
        veil.id = "firtaza-page-veil";
        veil.setAttribute("aria-hidden", "true");
        veil.innerHTML = `
            <span class="veil-brand">FIRTAZA</span>
            <span class="veil-line"></span>
        `;
        document.body.appendChild(veil);
    }

    const mainEl = document.querySelector("main");
    if (mainEl) {
        mainEl.classList.add("firtaza-page-enter");
    }

    document.addEventListener("click", (e) => {
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const link = e.target.closest("a[href]");
        if (!link) return;

        const rawHref = link.getAttribute("href");
        if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) {
            return;
        }
        if (link.target === "_blank" || link.hasAttribute("download")) return;

        let targetUrl;
        try {
            targetUrl = new URL(link.href, window.location.href);
        } catch {
            return;
        }

        if (targetUrl.origin !== window.location.origin) return;

        if (targetUrl.pathname === window.location.pathname && !targetUrl.hash) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            const mobileMenu = document.getElementById("mobile-menu");
            if (mobileMenu) mobileMenu.classList.add("hidden");
            return;
        }

        e.preventDefault();
        navigateWithTransition(targetUrl.href);
    });

    window.addEventListener("pageshow", () => {
        isNavigating = false;
        const veil = document.getElementById("firtaza-page-veil");
        if (veil) veil.classList.remove("is-leaving");
    });
}

function navigateWithTransition(url) {
    if (isNavigating) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const veil = document.getElementById("firtaza-page-veil");

    if (prefersReduced || !veil) {
        window.location.href = url;
        return;
    }

    isNavigating = true;
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) mobileMenu.classList.add("hidden");

    veil.classList.add("is-leaving");
    setTimeout(() => {
        window.location.href = url;
    }, 260);
}

// ==========================================
// 3. SISTEM KERANJANG, VARIAN WARNA & VALIDASI CO
// ==========================================
let cart = JSON.parse(localStorage.getItem("firtaza_cart")) || [];
let isCartOpen = false;
let selectedProductId = null;
let selectedColor = "";
let modalQty = 1;

const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
});

function saveCart() {
    localStorage.setItem("firtaza_cart", JSON.stringify(cart));
    updateCartUI();
}

function handleCartCheckout(e) {
    if (e) e.preventDefault();
    if (cart.length === 0) {
        openEmptyCartModal();
        return;
    }
    navigateWithTransition("checkout.html");
}

function openEmptyCartModal() {
    const modal = document.getElementById("empty-cart-modal");
    if (modal) modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeEmptyCartModal() {
    const modal = document.getElementById("empty-cart-modal");
    if (modal) modal.classList.add("hidden");
    if (!isCartOpen) document.body.style.overflow = "";
}

function toggleHowToOrderModal() {
    const modal = document.getElementById("how-to-order-modal");
    if (!modal) return;
    const isHidden = modal.classList.toggle("hidden");
    document.body.style.overflow = isHidden ? "" : "hidden";
}

function addToCart(productId) {
    openProductModal(productId);
}

function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.available) return;

    selectedProductId = productId;
    selectedColor = product.colors[0].name;
    modalQty = 1;

    document.getElementById("pm-img").src = product.image;
    document.getElementById("pm-name").textContent = product.name;
    document.getElementById("pm-desc").textContent = product.desc;
    document.getElementById("pm-price").textContent = formatter.format(product.price);

    renderColorOptions(product.colors);
    updateModalQtyUI();

    document.getElementById("product-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function renderColorOptions(colors) {
    const container = document.getElementById("pm-colors");
    const label = document.getElementById("pm-selected-color");
    if (!container) return;

    if (label) label.textContent = selectedColor;

    container.innerHTML = colors.map(c => {
        const isActive = c.name === selectedColor;
        return `
            <button type="button" onclick="selectProductColor('${c.name}')" class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all ${isActive ? 'border-brand-dark bg-brand-beige text-brand-dark font-semibold shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-brand-rose'}">
                <span class="w-3.5 h-3.5 rounded-full border border-black/15 inline-block flex-shrink-0" style="background-color: ${c.hex}"></span>
                <span>${c.name}</span>
            </button>
        `;
    }).join("");
}

function selectProductColor(colorName) {
    selectedColor = colorName;
    const product = PRODUCTS.find(p => p.id === selectedProductId);
    if (product) renderColorOptions(product.colors);
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "";
}

function changeModalQty(delta) {
    modalQty = Math.max(1, modalQty + delta);
    updateModalQtyUI();
}

function updateModalQtyUI() {
    const product = PRODUCTS.find(p => p.id === selectedProductId);
    if (!product) return;
    document.getElementById("pm-qty").textContent = modalQty;
    document.getElementById("pm-subtotal").textContent = formatter.format(product.price * modalQty);
}

function confirmProductSelection(goToCheckout) {
    const product = PRODUCTS.find(p => p.id === selectedProductId);
    if (!product) return;

    const cartKey = `${product.id}-${selectedColor}`;
    const existing = cart.find(item => (item.cartKey || item.id) === cartKey);

    if (existing) {
        existing.quantity += modalQty;
    } else {
        cart.push({
            id: product.id,
            cartKey: cartKey,
            color: selectedColor,
            name: `${product.name} (${selectedColor})`,
            price: product.price,
            image: product.image,
            quantity: modalQty
        });
    }

    saveCart();
    closeProductModal();

    if (goToCheckout) {
        navigateWithTransition("checkout.html");
    } else {
        if (!isCartOpen) toggleCart();
    }
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    if (typeof renderCheckoutSummary === "function") renderCheckoutSummary();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    if (typeof renderCheckoutSummary === "function") renderCheckoutSummary();
}

function toggleCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-overlay");
    if (!drawer || !overlay) return;

    isCartOpen = !isCartOpen;
    if (isCartOpen) {
        drawer.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    } else {
        drawer.classList.add("translate-x-full");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
    }
}

function updateCartUI() {
    const cartBadge = document.getElementById("cart-badge");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotalEl = document.getElementById("cart-subtotal");

    if (!cartBadge || !cartItemsContainer) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove("hidden");
    } else {
        cartBadge.classList.add("hidden");
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-gray-400 py-14 font-light flex flex-col items-center">
                <i class="fas fa-shopping-bag text-4xl mb-4 opacity-20 text-brand-dark"></i>
                <p class="text-sm">Keranjang belanja Anda masih kosong.</p>
                <a href="katalog.html" class="mt-4 text-xs uppercase tracking-widest text-brand-rose underline">Lihat Katalog</a>
            </div>
        `;
        if (cartSubtotalEl) cartSubtotalEl.textContent = "Rp 0";
    } else {
        let total = 0;
        cartItemsContainer.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="flex items-center justify-between bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
                    <div class="flex-1 pr-3">
                        <h4 class="text-sm font-medium text-brand-dark">${item.name}</h4>
                        <p class="text-xs text-gray-400 mt-0.5">${formatter.format(item.price)}</p>
                        <div class="flex items-center gap-3 mt-2">
                            <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 rounded-full border border-gray-200 text-xs flex items-center justify-center hover:border-brand-rose">-</button>
                            <span class="text-xs font-medium">${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 rounded-full border border-gray-200 text-xs flex items-center justify-center hover:border-brand-rose">+</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm font-semibold text-brand-dark mb-2">${formatter.format(item.price * item.quantity)}</p>
                        <button onclick="removeFromCart(${index})" class="text-[11px] text-gray-400 hover:text-red-500 uppercase tracking-wider">Hapus</button>
                    </div>
                </div>
            `;
        }).join("");

        if (cartSubtotalEl) cartSubtotalEl.textContent = formatter.format(total);
    }
}

// ==========================================
// 4. RENDER NAVBAR, DRAWER, MODAL & FOOTER
// ==========================================
function initSharedLayout(activePage) {
    initPageTransitions();

    const navLinks = [
        { id: "home", label: "Beranda", href: "index.html" },
        { id: "katalog", label: "Katalog", href: "katalog.html" },
        { id: "about", label: "Tentang Firtaza", href: "about.html" },
        { id: "blog", label: "Blog", href: "blog.html" },
        { id: "kontak", label: "Kontak", href: "kontak.html" }
    ];

    const headerEl = document.getElementById("shared-header");
    if (headerEl) {
        headerEl.innerHTML = `
        <header class="bg-white/90 backdrop-blur-md fixed w-full top-0 z-50 border-b border-brand-rose/20 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20 gap-4">
                    <div class="flex items-center lg:hidden">
                        <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="text-brand-dark hover:text-brand-rose p-1" aria-label="Buka Menu">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>

                    <div class="flex-shrink-0">
                        <a href="index.html" class="font-serif text-3xl tracking-wider text-brand-dark font-semibold whitespace-nowrap">FIRTAZA</a>
                    </div>

                    <nav class="hidden lg:flex lg:space-x-6 xl:space-x-8 items-center">
                        ${navLinks.map(link => `
                            <a href="${link.href}" class="text-xs uppercase tracking-[0.18em] whitespace-nowrap transition-colors py-1 ${activePage === link.id ? 'text-brand-rose font-semibold border-b-2 border-brand-rose' : 'text-brand-dark hover:text-brand-rose'}">
                                ${link.label}
                            </a>
                        `).join("")}
                    </nav>

                    <div class="flex items-center space-x-4 sm:space-x-5 flex-shrink-0">
                        <button onclick="toggleHowToOrderModal()" class="text-brand-dark hover:text-brand-rose transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap" title="Cara Pemesanan">
                            <i class="far fa-question-circle text-lg"></i>
                            <span class="hidden sm:inline">Cara Pesan</span>
                        </button>
                        <button onclick="toggleCart()" class="text-brand-dark hover:text-brand-rose transition-colors relative" title="Keranjang Belanja">
                            <i class="fas fa-shopping-bag text-xl"></i>
                            <span id="cart-badge" class="absolute -top-1.5 -right-2 bg-brand-rose text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden border border-white">0</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Menu Mobile & Tablet (di bawah 1024px) -->
            <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border
