
(function() {

    /* ====================
    Preloader
    ======================= */
	window.onload = function () {
		window.setTimeout(fadeout, 300);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}

    // =========== sticky menu 
    window.onscroll = function () {
        var header_navbar = document.querySelector(".hero-section-wrapper-5 .header");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

      // header-6  toggler-icon
      let navbarToggler6 = document.querySelector(".header-6 .navbar-toggler");
      var navbarCollapse6 = document.querySelector(".header-6 .navbar-collapse");

      document.querySelectorAll(".header-6 .page-scroll").forEach(e =>
          e.addEventListener("click", () => {
              navbarToggler6.classList.remove("active");
              navbarCollapse6.classList.remove('show')
          })
      );
      navbarToggler6.addEventListener('click', function() {
          navbarToggler6.classList.toggle("active");
      })


    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    

    // ===== pricing-style-4 slider
    tns({
        container: '.pricing-active',
        autoplay: false,
        mouseDrag: true,
        gutter: 0,
        nav: false,
        controls: true,
        controlsText: [
          '<i class="lni lni-chevron-left prev"></i>',
          '<i class="lni lni-chevron-right prev"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          992: {
            items: 1.2,
          },
          1200: {
            items: 2,
          }
        }
      });

	// WOW active
    new WOW().init();

    // Reactive glow spotlight for the hero glass card ------------------
    const heroGlowCard = document.querySelector(
      '.hero-section.hero-style-5 .hero-content-wrapper[data-glow]'
    );

    if (heroGlowCard) {
      const supportsPointerEvents = 'PointerEvent' in window;
      const isCoarsePointer =
        supportsPointerEvents && window.matchMedia('(pointer: coarse)').matches;

      const updateGlowVariables = (x, y, rect) => {
        // Clamp the pointer to the card bounds and convert to CSS-friendly units
        const clampedX = Math.max(0, Math.min(rect.width, x));
        const clampedY = Math.max(0, Math.min(rect.height, y));
        const xp = (clampedX / rect.width) * 100;
        const yp = (clampedY / rect.height) * 100;

        heroGlowCard.style.setProperty('--x', clampedX.toFixed(2));
        heroGlowCard.style.setProperty('--y', clampedY.toFixed(2));
        heroGlowCard.style.setProperty('--xp', xp.toFixed(2) + '%');
        heroGlowCard.style.setProperty('--yp', yp.toFixed(2) + '%');
        return { clampedX, clampedY };
      };

      const isPointerNearEdge = (x, y, rect) => {
        const minThreshold = 28;
        const thresholdX = Math.max(minThreshold, rect.width * 0.12);
        const thresholdY = Math.max(minThreshold, rect.height * 0.12);

        return (
          x <= thresholdX ||
          y <= thresholdY ||
          rect.width - x <= thresholdX ||
          rect.height - y <= thresholdY
        );
      };

      const updateEdgeGlowState = (x, y, rect) => {
        const nearEdge = isPointerNearEdge(x, y, rect);
        heroGlowCard.classList.toggle('is-glowing', nearEdge);
        heroGlowCard.classList.toggle('edge-active', nearEdge);
      };

      const setGlowPosition = (event) => {
        const rect = heroGlowCard.getBoundingClientRect();
        const pointerX =
          event && typeof event.clientX === 'number'
            ? event.clientX
            : rect.left + rect.width / 2;
        const pointerY =
          event && typeof event.clientY === 'number'
            ? event.clientY
            : rect.top + rect.height / 2;

        const { clampedX, clampedY } = updateGlowVariables(
          pointerX - rect.left,
          pointerY - rect.top,
          rect
        );
        updateEdgeGlowState(clampedX, clampedY, rect);
      };

      const deactivateGlow = () => {
        heroGlowCard.classList.remove('is-glowing');
        heroGlowCard.classList.remove('edge-active');
        heroGlowCard.style.setProperty('--x', '50');
        heroGlowCard.style.setProperty('--y', '50');
        heroGlowCard.style.setProperty('--xp', '50%');
        heroGlowCard.style.setProperty('--yp', '50%');
      };

      const setInitialGlow = () => {
        const rect = heroGlowCard.getBoundingClientRect();
        updateGlowVariables(rect.width / 2, rect.height / 2, rect);
      };

      setInitialGlow();

      if (!isCoarsePointer) {
        heroGlowCard.addEventListener('pointerenter', setGlowPosition);
        heroGlowCard.addEventListener('pointerdown', setGlowPosition);
        heroGlowCard.addEventListener('pointermove', setGlowPosition);
        heroGlowCard.addEventListener('pointerleave', deactivateGlow);
        heroGlowCard.addEventListener('pointerup', deactivateGlow);
        heroGlowCard.addEventListener('pointercancel', deactivateGlow);
      } else if (!supportsPointerEvents) {
        heroGlowCard.addEventListener('mouseenter', setGlowPosition);
        heroGlowCard.addEventListener('mousemove', setGlowPosition);
        heroGlowCard.addEventListener('mouseleave', deactivateGlow);
      } else {
        heroGlowCard.classList.add('is-glowing');
      }

      window.addEventListener('resize', setInitialGlow);
    }

    // Contact form: send email via mailto ------------------------------
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        const nameField = document.getElementById('contact-name');
        const emailField = document.getElementById('contact-email');
        const subjectField = document.getElementById('contact-subject');
        const messageField = document.getElementById('contact-message');

        const name = nameField ? nameField.value.trim() : '';
        const email = emailField ? emailField.value.trim() : '';
        const subjectInput = subjectField ? subjectField.value.trim() : '';
        const message = messageField ? messageField.value.trim() : '';

        const subject = subjectInput || `Nuevo mensaje de ${name || 'Contacto'}`;
        const body = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;

        const mailtoLink = `mailto:lab.atlas.n8n@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
      });
    }

})();
