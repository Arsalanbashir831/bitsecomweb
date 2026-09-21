import Image from "next/image";
import hgstLogo from "@/assets/logos/hgst.png";
import seagateLogo from "@/assets/logos/Seagate_logo_PNG2.png";
import toshibaLogo from "@/assets/logos/Toshiba_logo_PNG_(2).png";
import westernDigitalLogo from "@/assets/logos/Western_digital_logo_PNG1.png";

const logos = [
    { name: "HGST", src: hgstLogo },
    { name: "Seagate", src: seagateLogo },
    { name: "Toshiba", src: toshibaLogo },
    { name: "Western Digital", src: westernDigitalLogo },
];

const CategoriesMarquee = () => {

    return (
        <div className="group relative mx-auto w-full max-w-7xl select-none overflow-hidden py-8 sm:my-20" aria-label="Brands available at B.I.T.S Pakistan">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-40" />
            <div className="flex w-max animate-[marqueeScroll_14s_linear_infinite] items-center group-hover:[animation-play-state:paused] sm:animate-[marqueeScroll_28s_linear_infinite] motion-reduce:animate-none">
                {[0, 1].map((set) => (
                    <div key={set} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20" aria-hidden={set === 1}>
                        {logos.map((logo) => (
                            <div key={`${set}-${logo.name}`} className="flex h-16 w-36 shrink-0 items-center justify-center sm:h-20 sm:w-48">
                                <Image
                                    src={logo.src}
                                    alt={set === 0 ? `${logo.name} logo` : ""}
                                    className="max-h-12 w-auto max-w-full object-contain sm:max-h-14"
                                    sizes="(min-width: 640px) 192px, 144px"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-40" />
        </div>
    );
};

export default CategoriesMarquee;
