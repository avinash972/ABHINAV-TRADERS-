document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. Sticky Header
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.padding = '0';
        }
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Enquiry Form to WhatsApp
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value.trim();
            const message = document.getElementById('message').value.trim();

            // Business WhatsApp Number
            const whatsappNumber = "+919569555234";

            // Construct WhatsApp Message
            let whatsappMsg = `*New Website Enquiry*\n\n`;
            whatsappMsg += `*Name:* ${name}\n`;
            whatsappMsg += `*Phone:* ${phone}\n`;
            whatsappMsg += `*Product:* ${product}\n`;
            if (quantity) {
                whatsappMsg += `*Quantity (Bags):* ${quantity}\n`;
            }
            whatsappMsg += `*Message:* ${message}`;

            // URL Encode the message
            const encodedMsg = encodeURIComponent(whatsappMsg);

            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // 5. Generate QR Code
    const qrcodeContainer = document.getElementById("qrcode");
    if (qrcodeContainer && typeof QRCode !== 'undefined') {
        const websiteURL = "https://abhinavtraders.com"; // Replace with actual domain when live
        new QRCode(qrcodeContainer, {
            text: websiteURL,
            width: 128,
            height: 128,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

});
