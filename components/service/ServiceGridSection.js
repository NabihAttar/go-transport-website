import ServiceCard from "./ServiceCard";

const sectionStyle = { backgroundColor: "rgb(24, 35, 50)" };

const rowStyle = { justifyContent: "center" };

export default function ServiceGridSection({ services = [] }) {
  return (
    <section
      className="service-one service-one--service"
      style={sectionStyle}
    >
      <div className="container" style={sectionStyle}>
        <div className="row flex-wrap" style={rowStyle}>
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}


