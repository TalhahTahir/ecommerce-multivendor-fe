import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://i.ibb.co/vxqrSJF3/jarmoluk-store-906722-1920.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-xl border border-white/50`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-slate-900 font-extrabold tracking-tight capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-medium text-slate-800 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br className="hidden md:block" /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br className="hidden md:block" /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-white font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
