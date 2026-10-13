const features = [
  {
    icon: "👤",
    title: "ตรวจจับคน",
    description: "ค้นหาบุคคลที่ปรากฏในภาพด้วย YOLO",
  },
  {
    icon: "🎯",
    title: "แสดงกรอบตรวจจับ",
    description: "แสดงตำแหน่งของแต่ละคนบนภาพ",
  },
  {
    icon: "📊",
    title: "วิเคราะห์ผลลัพธ์",
    description: "แสดงจำนวนคนและค่า Confidence",
  },
];

export default function Feature() {
  return (
    <section className="feature-section">
      <div className="section-heading">
        <p className="eyebrow">SYSTEM FEATURES</p>
        <h2>ความสามารถของระบบ</h2>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}