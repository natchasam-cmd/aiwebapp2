
import AppHeader from "./components/AppHeader";
import DetectionPanel from "./components/DetectionPanel";
import Feature from "./components/Feature";
import ApiStatus from "./components/ApiStatus";

export default function HomePage() {
  return (
    <main className="app-shell">
      <AppHeader />

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            ✦ AI-POWERED COMPUTER VISION
          </span>

          <h1>
            ระบบตรวจจับคน
            <br />
            <span>ด้วยปัญญาประดิษฐ์</span>
          </h1>

          <p>
            อัปโหลดภาพเพื่อให้ AI ตรวจจับบุคคล
            แสดงกรอบตำแหน่ง จำนวนคน และผลการวิเคราะห์
            ด้วยโมเดล YOLO
          </p>

          <a href="#detection" className="hero-button">
            เริ่มตรวจจับคน <span>→</span>
          </a>

          <div className="hero-points">
            <span>✓ ตรวจจับบุคคล</span>
            <span>✓ แสดงกรอบตรวจจับ</span>
            <span>✓ แสดงผล JSON</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <div className="scan-card">
            <div className="scan-top">
              <span>AI VISION</span>
              <span className="scan-live">● LIVE</span>
            </div>

            <div className="scan-person">
              <div className="scan-head" />
              <div className="scan-body" />
              <div className="scan-arm scan-arm-left" />
              <div className="scan-arm scan-arm-right" />
              <div className="scan-leg scan-leg-left" />
              <div className="scan-leg scan-leg-right" />

              <span className="scan-corner corner-tl" />
              <span className="scan-corner corner-tr" />
              <span className="scan-corner corner-bl" />
              <span className="scan-corner corner-br" />
            </div>

            <div className="scan-result">
              <span>PERSON DETECTED</span>
              <strong>AI Vision</strong>
            </div>
          </div>

          <div className="floating-chip">
            <span>✦</span> YOLO Detection
          </div>
        </div>
      </section>

      <DetectionPanel />

      <Feature />

      {/* ปุ่มตรวจสอบ API อยู่ล่างสุด */}
      <ApiStatus />

      <footer className="app-footer">
        <div className="footer-brand">
          <span className="footer-logo">AI</span>
          <span>AIE AI Vision</span>
        </div>

        <p>Person Detection System · Powered by YOLO</p>
      </footer>
    </main>
  );
}
