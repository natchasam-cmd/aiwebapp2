
const features = [
  {
    number: "01",
    icon: "⌕",
    title: "ตรวจจับบุคคล",
    description:
      "ใช้โมเดล YOLO วิเคราะห์ภาพและค้นหาบุคคลที่ปรากฏ",
  },
  {
    number: "02",
    icon: "◎",
    title: "ระบุตำแหน่ง",
    description:
      "แสดงกรอบตรวจจับและพิกัดของแต่ละบุคคลในภาพ",
  },
  {
    number: "03",
    icon: "{ }",
    title: "ข้อมูลวิเคราะห์",
    description:
      "แสดงจำนวนคน ค่า Confidence และรายละเอียด JSON",
  },
];

export default function Feature() {
  return (
    <section className="features-section" id="features">
      <div className="features-heading">
        <div>
          <span className="section-eyebrow">
            02 / SYSTEM FEATURES
          </span>

          <h2>ออกแบบมาเพื่อการตรวจจับ</h2>
        </div>

        <p>
          เครื่องมือช่วยวิเคราะห์ภาพ
          พร้อมแสดงผลลัพธ์อย่างเป็นระบบ
        </p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.number}>
            <div className="feature-top">
              <span className="feature-number">
                {feature.number}
              </span>
              <span className="feature-icon">
                {feature.icon}
              </span>
            </div>

            <h3>{feature.title}</h3>
            <p>{feature.description}</p>

            <div className="feature-bottom">
              <span>AI VISION</span>
              <span>↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
