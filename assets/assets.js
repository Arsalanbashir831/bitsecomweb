import upload_area from "./upload_area.svg"
import hero_model_img from "./hero_model_img.png"
import hero_product_img1 from "./hero_product_img1.png"
import hero_product_img2 from "./hero_product_img2.png"
import { HeadsetIcon, HeartPulseIcon, ShieldCheckIcon } from "lucide-react"

export const assets = {
    upload_area,
    hero_model_img,
    hero_product_img1,
    hero_product_img2,
}

export const categories = ["HDD", "SSD", "Seagate", "WD", "HGST", "160 GB–14 TB"]

export const ourSpecsData = [
    { title: "1–2 year warranty", description: "Every drive and device is covered by a one- to two-year warranty for complete peace of mind.", icon: ShieldCheckIcon, accent: "#05DF72" },
    { title: "On-site physical and health check", description: "Free on-site physical inspection and drive health check before and after every purchase.", icon: HeartPulseIcon, accent: "#FF8904" },
    { title: "24/7 support", description: "Our team is available around the clock for warranty claims, technical help, and questions.", icon: HeadsetIcon, accent: "#A684FF" },
]
