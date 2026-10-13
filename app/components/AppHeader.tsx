
export default function AppHeader() {
  return (
    <header className="app-header">
      <a href="#" className="header-brand">
        <span className="brand-logo">AI</span>

        <span className="brand-text">
          <strong>AIE Vision</strong>
          <small>INTELLIGENT DETECTION</small>
        </span>
      </a>

      <nav className="header-nav">
        <a href="#">หน้าแรก</a>
        <a href="#detection">ตรวจจับคน</a>
        <a href="#features">คุณสมบัติ</a>
      </nav>

      <a href="#detection" className="header-cta">
        เริ่มใช้งาน <span>↗</span>
      </a>
    </header>
  );
}
