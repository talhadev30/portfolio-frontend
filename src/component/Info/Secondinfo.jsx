import InfoLeft from "./InfoLeft";
import InfoRight from "./InfoRight";

const Secondinfo = () => {
  return (
    <div className="lg:h-screen h-screen md:h-auto md:py-40 w-full gap-20 flex lg:flex-row flex-col items-center lg:justify-between lg:px-20 px-5">
      <InfoLeft/>
      <InfoRight/>
      </div>
  
  );
};

export default Secondinfo;
