import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Bold } from "lucide-react";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const loadFont = () => {
    const link = document.createElement("link");
    link.href =
        "https://fonts.googleapis.com/css2?family=Georama:wght@100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
};

const renderText = (text, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            style={{
                fontWeight: baseWeight,
                display: "inline-block",
            }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    letters.forEach((letter) => {
        const width = letter.getBoundingClientRect().width;
        letter.style.width = `${width}px`;
    });

    let mouseX = 0;
    let currentX = 0;
    let raf = null;
    let isHovering = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
        if (!isHovering) return;

        currentX = lerp(currentX, mouseX, 0.08); // smoother

        const containerRect = container.getBoundingClientRect();

        letters.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            const center =
                rect.left - containerRect.left + rect.width / 2;

            const distance = Math.abs(currentX - center);
            const maxDistance = 100;

            const intensity = Math.max(0, 1 - distance / maxDistance);

            const weight = base + (max - base) * intensity;

            // smooth weight change
            letter.style.fontWeight = weight;
        });

        raf = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        mouseX = e.clientX - left;

        if (!isHovering) {
            isHovering = true;

            // smooth ease-in at start
            gsap.to(letters, {
                fontWeight: Bold,
                duration: 0.3,
                ease: "power2.inOut",
                overwrite: "auto",
            });

            animate();
        }
    };

    const handleMouseLeave = () => {
        isHovering = false;
        cancelAnimationFrame(raf);

        // smooth ease-out + FULL RESET
        gsap.to(letters, {
            fontWeight: base,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: () => {
                // 🔥 force exact original (fix bold issue in <p>)
                letters.forEach((letter) => {
                    letter.style.fontWeight = base;
                });
            },
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(raf);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        loadFont();

        const clean1 = setupTextHover(titleRef.current, "title");
        const clean2 = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            clean1 && clean1();
            clean2 && clean2();
        };
    }, []);

    return (
        <section
            id="welcome"
            style={{
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: "Georama, sans-serif",
                textAlign: "center",
            }}
        >
            {/*  P TAG (no bold issue anymore) */}
            <p
                ref={subtitleRef}
                style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                }}
            >
                {renderText(
                    "Hey, I'm Krishna! Welcome to my",
                    100
                )}
            </p>

            {/* H1 (padding removed) */}
            <h1
                ref={titleRef}
                style={{
                    fontSize: "100px",
                    fontStyle: "italic",
                }}
            >
                {renderText("portfolio", 400)}
            </h1>
            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens only</p>
            </div>
        </section>
    );
};

export default Welcome;