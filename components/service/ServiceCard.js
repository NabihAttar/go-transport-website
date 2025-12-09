import InteractiveIcon from "./InteractiveIcon";

const contentStyle = {
  backgroundColor: "rgb(15,28,37)",
  padding: "32px 24px",
};

export default function ServiceCard({
  title,
  description,
  imageSrc,
  icon,
  animation = "fadeInLeft",
}) {
  const iconAlt = icon?.alt || `${title || "Service"} icon`;

  return (
    <div
      className={`col-xl-4 col-lg-6 col-md-6 wow ${animation}`}
      data-wow-delay="0ms"
      data-wow-duration="1500ms"
    >
      <div className="service-one__single">
        <div className="service-one__single-inner">
          <div className="service-one__single-img">
            <img src={imageSrc} alt={title || "Service"} />
          </div>

          <div className="service-one__single-content" style={contentStyle}>
            <h2 style={{ color: "#fff" }}>{title}</h2>
            <p style={{ color: "rgb(142,142,142)" }}>{description}</p>
          </div>
        </div>

        <div className="icon">
          {icon?.type === "image" ? (
            icon?.interactive ? (
              <InteractiveIcon
                src={icon.src}
                alt={iconAlt}
                className={icon.className}
                hoverTransform={icon.hoverTransform}
              />
            ) : (
              <img
                src={icon.src}
                alt={iconAlt}
                className={icon.className}
                style={icon.style}
              />
            )
          ) : (
            <span className={icon?.className || ""}></span>
          )}
        </div>
      </div>
    </div>
  );
}


