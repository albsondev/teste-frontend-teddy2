import "./page-container.style.css";

interface PageContainerProps {
  children: React.ReactNode;
  style: React.CSSProperties;
}

export function PageContainer({ children, style }: PageContainerProps) {
  return (
    <div style={style} className="page_container">
      {children}
    </div>
  );
}
