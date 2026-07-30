const Loader = ({ text = 'Loading Book Haven collection...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', width: '100%' }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid #E2E8F0',
          borderTop: '4px solid #4F46E5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      <p style={{ marginTop: '1rem', color: '#64748B', fontWeight: 600 }}>{text}</p>
    </div>
  );
};

export default Loader;
