function CenterLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div>{children}</div>
    </div>
  );
}

export default CenterLayout;