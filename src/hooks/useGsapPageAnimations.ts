import { useEffect, useRef } from "react";
import { useNavigation } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapPageAnimations() {
    const pageRef = useRef<HTMLElement>(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state !== "idle" || !pageRef.current) return;

        const context = gsap.context(() => {
            const entranceVariants = {
                rise: { y: 34 },
                slide: { x: 34 },
                drift: { x: -34 },
                scale: { scale: 0.88 },
                tilt: { y: 26, rotation: 2 },
            } as const;

            gsap.utils.toArray<HTMLElement>("[data-gsap-entrance]").forEach((element, index) => {
                const variants: Array<keyof typeof entranceVariants> = ["rise", "slide", "drift", "scale", "tilt"];
                const variant = element.dataset.gsapVariant as keyof typeof entranceVariants | undefined;
                const from = entranceVariants[variant ?? variants[index % variants.length]];

                gsap.fromTo(element, { autoAlpha: 0, ...from }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 1.15,
                    delay: index * 0.07,
                    ease: "power3.out",
                    clearProps: "transform",
                });
            });

            gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]").forEach((element) => {
                const variant = element.dataset.gsapVariant;
                const from = variant === "slide"
                    ? { x: 44 }
                    : variant === "scale"
                        ? { scale: 0.92 }
                        : { y: 42 };

                gsap.fromTo(
                    element,
                    { autoAlpha: 0, ...from },
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 1.1,
                        ease: "power2.out",
                        clearProps: "transform",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 86%",
                            once: true,
                        },
                    },
                );
            });

            gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]").forEach((group) => {
                const items = group.querySelectorAll<HTMLElement>("[data-gsap-item]");
                const groupVariant = group.dataset.gsapVariant ?? "rise";
                const from = groupVariant === "slide"
                    ? { x: -28 }
                    : groupVariant === "scale"
                        ? { scale: 0.9 }
                        : { y: 28 };

                gsap.fromTo(items, { autoAlpha: 0, ...from }, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.16,
                    clearProps: "transform",
                    scrollTrigger: {
                        trigger: group,
                        start: "top 86%",
                        once: true,
                    },
                });
            });

            gsap.utils.toArray<HTMLElement>("[data-gsap-entrance-stagger]").forEach((group) => {
                const items = group.querySelectorAll<HTMLElement>("[data-gsap-item]");
                gsap.fromTo(items, { autoAlpha: 0, y: 28 }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.05,
                    ease: "power3.out",
                    stagger: 0.12,
                    clearProps: "transform",
                });
            });
        }, pageRef);

        return () => context.revert();
    }, [navigation.state]);

    return pageRef;
}
